// Integration test (M4): a capture with an unexpected request or a page error
// cannot change the approved drafts. Uses the real isolated Hub, Vue and
// fourball_screens (rebuilt for each case), with the same cleanup path as
// the proof pipeline. Usage: npm run screens:test:capture-failure
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { runPipeline } from '../lib/orchestrate.mjs'
import { SCRIPTS_DIR, STEP_TIMEOUTS } from '../lib/config.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const step = (script, ...args) => {
  const label = [script, ...args].join(' ')
  return { label, file: path.join(SCRIPTS_DIR, script), args, timeoutMs: STEP_TIMEOUTS[label] }
}
const expectRejected = failure => ({
  label: `expect capture rejected (${failure})`,
  file: path.join(here, 'helpers/expect-capture-rejected.mjs'),
  args: [failure],
  timeoutMs: STEP_TIMEOUTS['capture.mjs']
})
const freshFixtures = [step('servers.mjs', 'stop'), step('db-reset.mjs'), step('auth.mjs'), step('servers.mjs', 'start'), step('fixtures.mjs')]

process.exit(await runPipeline({
  steps: [step('prepare.mjs'), ...freshFixtures, expectRejected('page-error'), ...freshFixtures, expectRejected('external-request')],
  cleanup: [step('servers.mjs', 'stop'), step('scan.mjs')]
}))
