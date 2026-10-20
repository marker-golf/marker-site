// Test-only service definition and helpers shared by the process tests.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
export const FAKE_SERVICE_SCRIPT = path.join(here, 'fake-service.mjs')
const escape = s => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')

export function fakeService (port, cwd) {
  return {
    name: 'fake',
    port,
    cwd,
    sandbox: [port],
    env: [`HOME=${os.homedir()}`, 'PATH=/usr/bin:/bin'],
    cmd: [process.execPath, FAKE_SERVICE_SCRIPT, String(port)],
    identity: [new RegExp(`^${escape(process.execPath)} ${escape(FAKE_SERVICE_SCRIPT)} ${port}$`)]
  }
}

export function tempDir (label) {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), `screens-${label}-`)))
}

export async function waitForPort (port, open = true, ms = 10000) {
  const { portInUse } = await import('../../lib/guards.mjs')
  const deadline = Date.now() + ms
  while (Date.now() < deadline) {
    if ((await portInUse(port)) === open) return true
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  return false
}

export function alive (pid) {
  try { process.kill(pid, 0); return true } catch (e) { return e.code === 'EPERM' }
}
