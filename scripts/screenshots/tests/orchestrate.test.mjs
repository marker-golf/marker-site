// H2/M3/M6: one cleanup path for success, failure, timeouts and signals.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { groupMembers } from '../lib/processes.mjs'
import { tempDir, waitForPort } from './helpers/fake.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const HARNESS = path.join(here, 'helpers/pipeline-harness.mjs')
const STEP = path.join(here, 'helpers/step.mjs')
const PORT = 4791
const step = (label, args, timeoutMs = 20000) => ({ label, file: STEP, args, timeoutMs })

function startHarness (pipeline) {
  // Own process group, like a terminal's foreground job.
  const child = spawn(process.execPath, [HARNESS, JSON.stringify(pipeline)], { detached: true, stdio: ['ignore', 'pipe', 'pipe'] })
  let output = ''
  child.stdout.on('data', d => { output += d })
  child.stderr.on('data', d => { output += d })
  const done = new Promise(resolve => child.on('exit', code => resolve({ code, output })))
  return { child, done }
}

const marks = file => fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).length : 0

test('success runs cleanup exactly once and exits 0', async () => {
  const dir = tempDir('orc'); const marker = path.join(dir, 'marks')
  const { done } = startHarness({ steps: [step('ok', ['sleep', '0'])], cleanup: [step('mark', ['mark', marker])] })
  const { code } = await done
  assert.equal(code, 0)
  assert.equal(marks(marker), 1)
})

test('a timed-out step is killed and goes through the same cleanup (exit 1)', async () => {
  const dir = tempDir('orc'); const marker = path.join(dir, 'marks')
  const started = Date.now()
  const { done } = startHarness({ steps: [step('slow', ['sleep', '60'], 1000), step('never', ['mark', path.join(dir, 'never')])], cleanup: [step('mark', ['mark', marker])] })
  const { code, output } = await done
  assert.equal(code, 1)
  assert.match(output, /slow timed out after 1s/)
  assert.equal(marks(marker), 1)
  assert.equal(fs.existsSync(path.join(dir, 'never')), false)
  assert.ok(Date.now() - started < 15000)
})

test('a pipeline failure and a cleanup failure are both reported', async () => {
  const { done } = startHarness({ steps: [step('broken', ['fail'])], cleanup: [step('broken-cleanup', ['fail'])] })
  const { code, output } = await done
  assert.equal(code, 1)
  assert.match(output, /pipeline failed: broken failed \(exit 3\)/)
  assert.match(output, /cleanup failed: broken-cleanup failed \(exit 3\)/)
})

for (const [signal, expected] of [['SIGINT', 130], ['SIGTERM', 143], ['SIGHUP', 129]]) {
  test(`${signal} stops the running step and the started service, frees the port, cleans up once and exits ${expected}`, async () => {
    const dir = tempDir('orc'); const runDir = tempDir('run'); const cwd = tempDir('cwd'); const marker = path.join(dir, 'marks')
    const { child, done } = startHarness({
      steps: [step('launch', ['launch-fake', String(PORT), runDir, cwd]), step('wait', ['sleep', '120'], 180000)],
      cleanup: [step('stop', ['stop-fake', String(PORT), runDir, cwd]), step('mark', ['mark', marker])]
    })
    assert.ok(await waitForPort(PORT), 'service started')
    const record = JSON.parse(fs.readFileSync(path.join(runDir, 'fake.process.json'), 'utf8'))
    await new Promise(resolve => setTimeout(resolve, 500))
    process.kill(-child.pid, signal) // as a terminal would: the whole foreground group
    setTimeout(() => { try { process.kill(-child.pid, signal) } catch (e) { /* done */ } }, 300) // repeated signal
    const { code, output } = await done
    assert.equal(code, expected, output)
    assert.equal(marks(marker), 1, 'cleanup ran once')
    assert.equal(await waitForPort(PORT, false, 2000), true, 'port free')
    assert.deepEqual(groupMembers(record.pgid), [], 'service process group gone')
    assert.equal(fs.existsSync(path.join(runDir, 'fake.process.json')), false, 'record removed')
  })
}
