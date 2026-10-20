// Runs pipeline steps as child processes with per-step time limits, and
// guarantees one cleanup pass after success, failure, timeout or a
// terminating signal (SIGINT, SIGTERM, SIGHUP).
//
// - Steps run asynchronously, so signal handlers fire immediately.
// - A signal or timeout terminates the running step's process group.
// - Cleanup runs exactly once even if several signals arrive.
// - Pipeline and cleanup failures are both reported; neither hides the other.
// - Exit status: 128 + signal number after a signal, 1 after any failure.

import { spawn } from 'node:child_process'
import { log } from './proc.mjs'

export const SIGNAL_CODES = { SIGINT: 130, SIGTERM: 143, SIGHUP: 129 }

export class StepError extends Error {}

export function runStep ({ label, file, args = [], timeoutMs }, state) {
  return new Promise((resolve, reject) => {
    // Own process group so a timeout or signal can stop the step and anything
    // it spawned (except deliberately detached services, which have records).
    const child = spawn(process.execPath, [file, ...args], { stdio: 'inherit', detached: true })
    state.current = child
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      terminate(child)
    }, timeoutMs)
    child.on('error', error => { clearTimeout(timer); state.current = null; reject(error) })
    child.on('exit', (code, signal) => {
      clearTimeout(timer)
      state.current = null
      if (timedOut) return reject(new StepError(`${label} timed out after ${Math.round(timeoutMs / 1000)}s`))
      if (state.signal) return reject(new StepError(`${label} interrupted by ${state.signal}`))
      if (code !== 0) return reject(new StepError(`${label} failed (${signal ?? `exit ${code}`})`))
      resolve()
    })
  })
}

function terminate (child) {
  try { process.kill(-child.pid, 'SIGTERM') } catch (e) { /* gone */ }
  setTimeout(() => { try { process.kill(-child.pid, 'SIGKILL') } catch (e) { /* gone */ } }, 10000).unref()
}

// steps: [{ label, file, args, timeoutMs }]
// cleanup: [{ ... }] steps run (each once, in order) after the main steps,
// whatever happened. Resolves to the process exit code.
export async function runPipeline ({ steps, cleanup }) {
  const state = { current: null, signal: null }
  const handlers = {}
  for (const signal of Object.keys(SIGNAL_CODES)) {
    handlers[signal] = () => {
      if (state.signal) return log(`${signal} received; cleanup already in progress`)
      state.signal = signal
      log(`${signal} received; stopping the current step and cleaning up`)
      if (state.current) terminate(state.current)
    }
    process.on(signal, handlers[signal])
  }

  let failure = null
  try {
    for (const step of steps) {
      if (state.signal) throw new StepError(`interrupted by ${state.signal} before ${step.label}`)
      await runStep(step, state)
    }
  } catch (error) {
    failure = error
  }

  const cleanupFailures = []
  for (const step of cleanup) {
    try {
      await runStep(step, { current: null, signal: null })
    } catch (error) {
      cleanupFailures.push(error)
    }
  }

  for (const signal of Object.keys(SIGNAL_CODES)) process.off(signal, handlers[signal])
  if (failure) process.stderr.write(`[screens] pipeline failed: ${failure.message}\n`)
  for (const error of cleanupFailures) process.stderr.write(`[screens] cleanup failed: ${error.message}\n`)
  if (state.signal) return SIGNAL_CODES[state.signal]
  return failure || cleanupFailures.length ? 1 : 0
}
