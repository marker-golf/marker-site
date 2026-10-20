// Process helpers. Child processes never inherit the caller's environment
// wholesale: each call passes an explicit, minimal environment. Everything
// printed goes through redact(), so a token cannot reach stdout or logs.

import { spawnSync } from 'node:child_process'
import os from 'node:os'
import { COMMAND_TIMEOUT } from './config.mjs'
import { sandboxArgs } from './sandbox.mjs'

const BASE_ENV = {
  HOME: os.homedir(),
  LANG: 'en_US.UTF-8',
  PATH: '/opt/homebrew/bin:/usr/bin:/bin'
}

// Environment for Postgres client tools. No PG* variables, no DATABASE_URL:
// host, port and database are always passed as explicit arguments.
export function pgEnv (extra = {}) {
  return { ...BASE_ENV, ...extra }
}

const JWT_PATTERN = /eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/g
const BEARER_PATTERN = /\b(Bearer)\s+[A-Za-z0-9._~+/=-]+/gi
const AUTH_HEADER_PATTERN = /^(.*\bauthorization\b\s*[:=]).*$/gim

// Removes Authorization headers, Bearer tokens and JWT-shaped values.
export function redact (text) {
  return String(text)
    .replace(AUTH_HEADER_PATTERN, '$1 [redacted]')
    .replace(BEARER_PATTERN, '$1 [redacted]')
    .replace(JWT_PATTERN, '[redacted-jwt]')
}

// A safe one-line summary of a failed HTTP call: method, path, status and the
// first non-empty line of the response, redacted and truncated. The Hub's dev
// error page echoes request headers (including Authorization) further down.
export function httpErrorSummary (method, url, status, body) {
  const firstLine = String(body ?? '').split('\n').find(line => line.trim()) || ''
  const safe = redact(firstLine).slice(0, 160)
  return `${method} ${url} -> ${status}${safe ? `: ${safe}` : ''}`
}

export class TimeoutError extends Error {}

// `binary: true` returns stdout as a Buffer (for example a tar stream).
export function run (cmd, args, { env = BASE_ENV, cwd, input, quiet = false, allowFail = false, binary = false, timeout = COMMAND_TIMEOUT } = {}) {
  const result = spawnSync(cmd, args, { env, cwd, input, encoding: binary ? 'buffer' : 'utf8', maxBuffer: 1024 * 1024 * 1024, timeout, killSignal: 'SIGKILL' })
  if (result.error?.code === 'ETIMEDOUT') throw new TimeoutError(`${cmd} ${args[0] || ''} timed out after ${timeout / 1000}s`)
  if (result.error) throw result.error
  if (result.status !== 0 && !allowFail) {
    const detail = quiet ? '' : `\n${redact(String(result.stderr || '').trim())}`
    throw new Error(`${cmd} ${args[0] || ''} exited with ${result.status ?? result.signal}${detail}`)
  }
  return result
}

// Run a command inside a loopback-only network sandbox (see sandbox.mjs).
export function runSandboxed (profile, cmd, args, options = {}) {
  const [bin, binArgs] = sandboxArgs(profile, cmd, args)
  return run(bin, binArgs, options)
}

export function log (message) {
  process.stdout.write(`[screens] ${redact(message)}\n`)
}

export function warn (message) {
  process.stderr.write(`[screens] WARNING: ${redact(message)}\n`)
}
