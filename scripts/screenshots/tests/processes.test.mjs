// H1/M6: process records prove ownership before any signal is sent.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { launchService, stopAll, stopService, processInfo, recordPath, groupMembers } from '../lib/processes.mjs'
import { fakeService, tempDir, waitForPort, alive } from './helpers/fake.mjs'

const PORT = 4790

function unrelatedSleep () {
  const child = spawn('/bin/sleep', ['300'], { detached: true, stdio: 'ignore' })
  child.unref()
  return child.pid
}

function forgeRecord (service, runDir, pid, overrides = {}) {
  const info = processInfo(pid)
  const record = { version: 1, service: service.name, pid, pgid: info.pgid, startTime: info.startTime, command: info.command, cwd: service.cwd, port: service.port, sandbox: service.sandbox, recordedAt: new Date().toISOString(), ...overrides }
  fs.mkdirSync(runDir, { recursive: true })
  fs.writeFileSync(recordPath(service, runDir), JSON.stringify(record))
}

const quarantined = runDir => fs.existsSync(path.join(runDir, 'quarantine')) ? fs.readdirSync(path.join(runDir, 'quarantine')) : []

test('normal stop: an owned service is stopped, its record removed and its port freed', async () => {
  const runDir = tempDir('run'); const cwd = tempDir('cwd')
  const service = fakeService(PORT, cwd)
  const record = launchService(service, runDir, path.join(runDir, 'fake.log'))
  assert.ok(await waitForPort(PORT), 'fake service listening')
  assert.equal(await stopAll([service], runDir), true)
  assert.equal(fs.existsSync(recordPath(service, runDir)), false)
  assert.deepEqual(groupMembers(record.pgid), [])
  assert.equal(await waitForPort(PORT, false), true)
})

test('a forged record with the real PID, group and start time of an unrelated process cannot kill it', async () => {
  const runDir = tempDir('run'); const cwd = tempDir('cwd')
  const service = fakeService(PORT, cwd)
  const pid = unrelatedSleep()
  try {
    forgeRecord(service, runDir, pid)
    const outcome = await stopService(service, runDir, { graceMs: 1000 })
    assert.equal(outcome.status, 'quarantined')
    assert.match(outcome.detail, /not this pipeline's fake command/)
    assert.equal(alive(pid), true, 'unrelated process must survive')
    assert.equal(fs.existsSync(recordPath(service, runDir)), false)
    assert.equal(quarantined(runDir).length, 1)
  } finally { process.kill(pid, 'SIGKILL') }
})

test('a stale record whose PID was reused (start time differs) is quarantined, not signalled', async () => {
  const runDir = tempDir('run'); const cwd = tempDir('cwd')
  const service = fakeService(PORT, cwd)
  const pid = unrelatedSleep()
  try {
    forgeRecord(service, runDir, pid, { startTime: 'Mon Jan  1 00:00:00 2024' })
    const outcome = await stopService(service, runDir, { graceMs: 1000 })
    assert.equal(outcome.status, 'quarantined')
    assert.match(outcome.detail, /reused/)
    assert.equal(alive(pid), true)
  } finally { process.kill(pid, 'SIGKILL') }
})

test('a legacy bare PID file is quarantined and never signalled', async () => {
  const runDir = tempDir('run'); const cwd = tempDir('cwd')
  const service = fakeService(PORT, cwd)
  const pid = unrelatedSleep()
  try {
    fs.writeFileSync(path.join(runDir, 'fake.pid'), String(pid))
    const outcome = await stopService(service, runDir, { graceMs: 1000 })
    assert.equal(outcome.status, 'absent')
    assert.equal(alive(pid), true)
    assert.equal(fs.existsSync(path.join(runDir, 'fake.pid')), false)
    assert.equal(quarantined(runDir).length, 1)
  } finally { process.kill(pid, 'SIGKILL') }
})

test('a genuine service process with a record pointing at another export path is not signalled', async () => {
  const runDir = tempDir('run'); const realCwd = tempDir('cwd'); const otherCwd = tempDir('other')
  const real = fakeService(PORT, realCwd)
  const record = launchService(real, runDir, path.join(runDir, 'fake.log'))
  try {
    assert.ok(await waitForPort(PORT))
    // Same command and PID, but the service definition expects another folder.
    const outcome = await stopService(fakeService(PORT, otherCwd), runDir, { graceMs: 1000 })
    assert.equal(outcome.status, 'quarantined')
    assert.equal(alive(record.pid), true)
  } finally { process.kill(-record.pgid, 'SIGKILL'); await waitForPort(PORT, false) }
})

test('a record for a process that has exited is removed without signalling', async () => {
  const runDir = tempDir('run'); const cwd = tempDir('cwd')
  const service = fakeService(PORT, cwd)
  const pid = unrelatedSleep()
  forgeRecord(service, runDir, pid)
  process.kill(pid, 'SIGKILL')
  while (alive(pid)) await new Promise(resolve => setTimeout(resolve, 50))
  const outcome = await stopService(service, runDir, { graceMs: 1000 })
  assert.equal(outcome.status, 'already-stopped')
  assert.equal(fs.existsSync(recordPath(service, runDir)), false)
})

test('stop fails (and signals nothing) when an unowned process holds the service port', async () => {
  const runDir = tempDir('run'); const cwd = tempDir('cwd')
  const service = fakeService(PORT, cwd)
  const squatter = spawn(process.execPath, ['-e', `require('http').createServer(() => {}).listen(${PORT}, '127.0.0.1')`], { stdio: 'ignore' })
  try {
    assert.ok(await waitForPort(PORT))
    assert.equal(await stopAll([service], runDir), false)
    assert.equal(alive(squatter.pid), true)
  } finally { squatter.kill('SIGKILL'); await waitForPort(PORT, false) }
})
