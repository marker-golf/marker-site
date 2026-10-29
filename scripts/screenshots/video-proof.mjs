// Records the demo video from a clean state, like proof.mjs:
// prepare -> stop servers -> reset DB -> mint token -> start servers ->
// fixtures -> video (records, restores the fixture data, encodes for review)
// then, always: stop servers -> secret/token scan.

import path from 'node:path'
import { runPipeline } from './lib/orchestrate.mjs'
import { SCRIPTS_DIR, STEP_TIMEOUTS } from './lib/config.mjs'

const step = (script, ...args) => {
  const label = [script, ...args].join(' ')
  return { label, file: path.join(SCRIPTS_DIR, script), args, timeoutMs: STEP_TIMEOUTS[label] }
}

const code = await runPipeline({
  steps: [
    step('prepare.mjs'),
    step('servers.mjs', 'stop'),
    step('db-reset.mjs'),
    step('auth.mjs'),
    step('servers.mjs', 'start'),
    step('fixtures.mjs'),
    step('video.mjs')
  ],
  cleanup: [
    step('servers.mjs', 'stop'),
    step('scan.mjs')
  ]
})
process.exit(code)
