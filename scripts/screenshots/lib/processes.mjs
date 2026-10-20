// Process records for the long-running sandboxed services (Hub, Vue).
//
// A record is written the moment a service is spawned and holds enough to
// prove later that a PID still belongs to this pipeline: PID, process group,
// start time (stable across exec), command, working directory and port. A
// signal is only ever sent after every check passes. Anything that cannot be
// proven is left alone, its record is quarantined and a warning is printed.

import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { run, log, warn } from './proc.mjs'
import { sandboxArgs } from './sandbox.mjs'
import { portInUse, listenerPids } from './guards.mjs'

const RECORD_VERSION = 1
// The launch wrappers a service passes through before exec'ing its server.
const LAUNCH_IDENTITY = [/^\/usr\/bin\/sandbox-exec -p /, /^\/usr\/bin\/env -i /]

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export function processInfo (pid) {
  const result = run('/bin/ps', ['-o', 'pid=,pgid=,lstart=,command=', '-p', String(pid)], { allowFail: true })
  const match = /^\s*(\d+)\s+(\d+)\s+(\w{3} \w{3}\s+\d+ \d\d:\d\d:\d\d \d{4})\s+(.*)$/.exec(result.stdout.trim())
  if (result.status !== 0 || !match) return null
  return { pid: Number(match[1]), pgid: Number(match[2]), startTime: match[3], command: match[4] }
}

export function processCwd (pid) {
  const result = run('/usr/sbin/lsof', ['-a', '-p', String(pid), '-d', 'cwd', '-Fn'], { allowFail: true })
  const line = result.stdout.split('\n').find(l => l.startsWith('n'))
  return line ? line.slice(1) : null
}

export function groupMembers (pgid) {
  const result = run('/bin/ps', ['-axo', 'pid=,pgid='], { allowFail: true })
  return result.stdout.split('\n').map(l => l.trim().split(/\s+/).map(Number))
    .filter(([pid, group]) => group === pgid && pid > 0).map(([pid]) => pid)
}

const pgidOf = pid => processInfo(pid)?.pgid ?? null

export const recordPath = (service, runDir) => path.join(runDir, `${service.name}.process.json`)

function quarantine (file, runDir, reason) {
  const dir = path.join(runDir, 'quarantine')
  fs.mkdirSync(dir, { recursive: true })
  const dest = path.join(dir, `${path.basename(file)}.${new Date().toISOString().replace(/[:.]/g, '-')}`)
  fs.renameSync(file, dest)
  warn(`${reason}; nothing was signalled. Record moved to ${dest}`)
}

// Spawns `service` detached (own process group) inside its sandbox profile
// with an empty inherited environment, and records it before returning.
export function launchService (service, runDir, logFile) {
  if (fs.existsSync(recordPath(service, runDir))) {
    throw new Error(`Refusing: a ${service.name} process record already exists (run screens:stop first)`)
  }
  fs.mkdirSync(runDir, { recursive: true })
  const out = fs.openSync(logFile, 'w', 0o600)
  const [bin, args] = sandboxArgs(service.sandbox, '/usr/bin/env', ['-i', ...service.env, ...service.cmd])
  const child = spawn(bin, args, { cwd: service.cwd, detached: true, stdio: ['ignore', out, out], env: {} })
  fs.closeSync(out)
  if (!child.pid) throw new Error(`${service.name} failed to spawn`)
  child.unref()
  const info = processInfo(child.pid)
  if (!info || info.pgid !== child.pid) {
    try { process.kill(child.pid, 'SIGKILL') } catch (e) { /* already gone */ }
    throw new Error(`${service.name} did not start as its own process group`)
  }
  const record = {
    version: RECORD_VERSION,
    service: service.name,
    pid: child.pid,
    pgid: info.pgid,
    startTime: info.startTime,
    command: info.command.slice(0, 200),
    cwd: service.cwd,
    port: service.port,
    sandbox: service.sandbox,
    recordedAt: new Date().toISOString()
  }
  fs.writeFileSync(recordPath(service, runDir), JSON.stringify(record, null, 2), { mode: 0o600 })
  return record
}

// Returns { owned, gone, reason }. `owned` is true only when every check passes.
export function verifyOwnership (record, service) {
  const fail = reason => ({ owned: false, gone: false, reason })
  if (record?.version !== RECORD_VERSION || record.service !== service.name) return fail('record is not a valid process record for this service')
  if (!Number.isInteger(record.pid) || record.pid <= 1 || record.pgid !== record.pid) return fail('record PID/process group is invalid')
  if (record.cwd !== service.cwd || record.port !== service.port) return fail('record does not point at this service\'s export path and port')
  const info = processInfo(record.pid)
  if (!info) return { owned: false, gone: true, reason: 'process no longer exists' }
  if (info.startTime !== record.startTime) return fail(`PID ${record.pid} was reused (start time differs)`)
  if (info.pgid !== record.pgid) return fail(`PID ${record.pid} is no longer leading process group ${record.pgid}`)
  if (![...service.identity, ...LAUNCH_IDENTITY].some(pattern => pattern.test(info.command))) {
    return fail(`PID ${record.pid} is not this pipeline's ${service.name} command`)
  }
  if (!fs.existsSync(service.cwd) || processCwd(record.pid) !== service.cwd) {
    return fail(`PID ${record.pid} is not running in ${service.cwd}`)
  }
  const listeners = listenerPids(service.port)
  if (listeners.length && !listeners.some(pid => pgidOf(pid) === record.pgid)) {
    return fail(`port ${service.port} is held by a process outside group ${record.pgid}`)
  }
  return { owned: true, gone: false, reason: 'verified' }
}

async function waitForGroupExit (pgid, ms) {
  const deadline = Date.now() + ms
  while (Date.now() < deadline) {
    if (!groupMembers(pgid).length) return true
    await sleep(250)
  }
  return !groupMembers(pgid).length
}

// Stops one recorded service. Returns { name, ok, status, detail }.
export async function stopService (service, runDir, { graceMs = 15000 } = {}) {
  const result = (ok, status, detail = '') => ({ name: service.name, ok, status, detail })

  // Bare PID files from older versions of this tooling prove nothing.
  const legacy = path.join(runDir, `${service.name}.pid`)
  if (fs.existsSync(legacy)) quarantine(legacy, runDir, `legacy ${service.name}.pid file cannot prove ownership`)

  const file = recordPath(service, runDir)
  if (!fs.existsSync(file)) return result(true, 'absent')
  let record
  try { record = JSON.parse(fs.readFileSync(file, 'utf8')) } catch (e) { record = null }

  const check = verifyOwnership(record, service)
  if (check.gone) {
    const leftovers = groupMembers(record.pgid)
    if (leftovers.length) {
      quarantine(file, runDir, `${service.name} leader is gone but group ${record.pgid} still has PIDs ${leftovers.join(', ')} whose ownership cannot be proven`)
      return result(false, 'unproven', `group ${record.pgid}: ${leftovers.join(', ')}`)
    }
    fs.rmSync(file)
    return result(true, 'already-stopped')
  }
  if (!check.owned) {
    quarantine(file, runDir, `${service.name}: ${check.reason}`)
    return result(true, 'quarantined', check.reason)
  }

  // Ownership proven. A process group ID cannot be reused while any member
  // is alive, so the group stays ours for as long as it has members.
  try { process.kill(-record.pgid, 'SIGTERM') } catch (e) { /* already gone */ }
  if (!(await waitForGroupExit(record.pgid, graceMs))) {
    try { process.kill(-record.pgid, 'SIGKILL') } catch (e) { /* already gone */ }
    if (!(await waitForGroupExit(record.pgid, 5000))) {
      return result(false, 'still-running', `group ${record.pgid}: ${groupMembers(record.pgid).join(', ')}`)
    }
  }
  fs.rmSync(file)
  log(`${service.name} stopped (process group ${record.pgid})`)
  return result(true, 'stopped')
}

// Stops every service, then requires each service port to be free. Returns
// true only if nothing owned remains and every port is free.
export async function stopAll (services, runDir, options) {
  let ok = true
  for (const service of services) {
    const outcome = await stopService(service, runDir, options)
    if (!outcome.ok) {
      ok = false
      warn(`${service.name} could not be stopped (${outcome.status}: ${outcome.detail})`)
    }
  }
  for (const service of services) {
    if (await portInUse(service.port)) {
      ok = false
      warn(`port ${service.port} (${service.name}) is still in use by PID ${listenerPids(service.port).join(', ') || 'unknown'}; not signalled`)
    } else {
      log(`${service.name} port ${service.port}: free`)
    }
  }
  return ok
}
