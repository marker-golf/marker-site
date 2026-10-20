// Test-only step: runs capture.mjs with an injected failure and passes only if
// the capture is rejected and all draft PNG/WebP files are byte-for-byte
// unchanged. Usage: node expect-capture-rejected.mjs page-error|external-request
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { SCRIPTS_DIR, SOURCE_DIR, WEB_DIR, DRAFT_PREFIX } from '../../lib/config.mjs'

const failure = process.argv[2]
const drafts = () => [SOURCE_DIR, WEB_DIR].flatMap(dir => fs.readdirSync(dir).filter(f => f.startsWith(DRAFT_PREFIX)).map(f => path.join(dir, f))).sort()
const fingerprint = () => drafts().map(f => `${path.basename(f)} ${crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')}`).join('\n')

const before = fingerprint()
const result = spawnSync(process.execPath, [path.join(SCRIPTS_DIR, 'capture.mjs'), `--inject-failure=${failure}`], { encoding: 'utf8', timeout: 15 * 60 * 1000 })
process.stdout.write(result.stdout)
process.stderr.write(result.stderr)
const after = fingerprint()

const checks = [
  [result.status === 1, `capture exited ${result.status}, expected 1`],
  [/capture rejected; drafts left unchanged/.test(result.stderr), 'capture did not report a rejection'],
  // In the dev build, uncaught errors can be reported through console.error
  // instead of (or as well as) a page error; both reject the capture.
  [failure !== 'page-error' || /(page errors|console errors outside the allowlist):[\s\S]*injected page error/.test(result.stderr), 'page error was not the reported cause'],
  [failure !== 'external-request' || /unexpected network activity:[\s\S]*injected-unapproved-request/.test(result.stderr), 'unapproved request was not the reported cause'],
  [drafts().length >= 12 && drafts().length === before.split('\n').length, `draft file count changed or too low (${drafts().length})`],
  [before === after, 'draft files changed']
]
const failed = checks.filter(([ok]) => !ok).map(([, message]) => message)
if (failed.length) {
  process.stderr.write(`[test] FAILED (${failure}): ${failed.join('; ')}\n`)
  process.exit(1)
}
console.log(`[test] ${failure}: capture rejected, all ${drafts().length} draft files byte-identical`)
