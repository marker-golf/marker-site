// Records a demo video from a clean state, like proof.mjs:
// prepare -> stop servers -> reset DB -> mint token -> start servers ->
// fixtures -> video (records, restores the fixture data, encodes for review)
// then, always: stop servers -> secret/token scan.
//
// Usage: node video-proof.mjs [--recipe=<name>] [--replace]
// (both are passed to video.mjs; the default recipe is the scoring demo).

import path from 'node:path'
import { runPipeline } from './lib/orchestrate.mjs'
import { SCRIPTS_DIR, STEP_TIMEOUTS } from './lib/config.mjs'

const step = (script, ...args) => {
  const label = [script, ...args].join(' ')
  return { label, file: path.join(SCRIPTS_DIR, script), args, timeoutMs: STEP_TIMEOUTS[label] }
}
const videoArgs = process.argv.slice(2).filter(arg => /^--recipe=[\w-]+$/.test(arg) || arg === '--replace')
if (videoArgs.length !== process.argv.length - 2) throw new Error(`Unknown arguments: ${process.argv.slice(2).join(' ')}`)

const code = await runPipeline({
  steps: [
    step('prepare.mjs'),
    step('servers.mjs', 'stop'),
    step('db-reset.mjs'),
    step('auth.mjs'),
    step('servers.mjs', 'start'),
    step('fixtures.mjs'),
    { ...step('video.mjs', ...videoArgs), timeoutMs: STEP_TIMEOUTS['video.mjs'] }
  ],
  cleanup: [
    step('servers.mjs', 'stop'),
    step('scan.mjs')
  ]
})
process.exit(code)
