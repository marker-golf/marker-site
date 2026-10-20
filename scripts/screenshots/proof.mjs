// Runs the whole proof pipeline from a clean state:
// prepare -> stop servers -> reset DB -> mint token -> start servers ->
// fixtures -> capture (stages, validates and publishes drafts)
// then, always: stop servers -> secret/token scan.
//
// Every step has a time limit. Success, failure, timeout and Ctrl-C/SIGTERM/
// SIGHUP all go through the same cleanup, which must leave both ports free.

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
    step('capture.mjs')
  ],
  cleanup: [
    step('servers.mjs', 'stop'),
    step('scan.mjs')
  ]
})
process.exit(code)
