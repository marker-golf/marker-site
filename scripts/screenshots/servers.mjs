// Starts, stops and reports the isolated Hub (127.0.0.1:4001) and Vue dev
// server (127.0.0.1:8090). Each runs in its own process group inside a
// port-restricted network sandbox with an explicit minimal environment, and is
// tracked by a process record (lib/processes.mjs) that proves ownership before
// any signal is sent.
//
// Usage: node servers.mjs start|stop|status
// Exit status is nonzero if a service fails to start, or if after `stop` an
// owned process or either port remains.

import fs from 'node:fs'
import path from 'node:path'
import { log } from './lib/proc.mjs'
import { assertSafeDatabaseTarget, assertHubRepoTarget, portInUse, listenerPids } from './lib/guards.mjs'
import { launchService, stopAll, recordPath } from './lib/processes.mjs'
import {
  HUB_EXPORT, APP_EXPORT, VUE_PATH, LOG_DIR, RUN_DIR, HUB_PORT, VUE_PORT, HUB_URL, VUE_URL,
  API_BASE, AUTH_STATE, VUE_NODE_BIN, USGA_DEAD_PORT, hubEnv
} from './lib/config.mjs'

// The Hub's dev config hardcodes port 4000, so the endpoint is reconfigured at
// launch with Application.put_env before the application starts. No Hub file
// is changed.
// Socket connect params include the JWT; filter it from the Hub's logs.
const HUB_LAUNCH = [
  'Application.put_env(:phoenix, :filter_parameters, ["password", "jwt", "code"], persistent: true)',
  'cfg = Application.get_env(:fourball, Fourball.Endpoint, [])',
  `cfg = Keyword.merge(cfg, http: [ip: {127, 0, 0, 1}, port: ${HUB_PORT}], url: [host: "127.0.0.1", port: ${HUB_PORT}], server: true)`,
  'Application.put_env(:fourball, Fourball.Endpoint, cfg, persistent: true)',
  '{:ok, _} = Application.ensure_all_started(:fourball)'
].join('; ')

const escape = s => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')

const SERVICES = {
  hub: {
    name: 'hub',
    port: HUB_PORT,
    cwd: HUB_EXPORT,
    sandbox: 'hub',
    env: hubEnv(),
    cmd: ['mix', 'run', '--no-start', '--no-halt', '-e', HUB_LAUNCH],
    // mix -> elixir -> erl wrappers, then the BEAM running `mix run --no-halt`.
    identity: [/^\S*(sh|bash) \S*\/(elixir|erl|mix)\b/, /\/beam\.smp .* -extra \S*\/mix run --no-start --no-halt\b/],
    ready: hubReady,
    readyTimeout: 180000
  },
  vue: {
    name: 'vue',
    port: VUE_PORT,
    cwd: APP_EXPORT,
    sandbox: 'vue',
    env: [
      `HOME=${process.env.HOME}`, `PATH=${VUE_PATH}`, 'LANG=en_US.UTF-8',
      'NODE_ENV=development',
      `VUE_APP_API=${HUB_URL}/api`,
      `VUE_APP_WS=ws://127.0.0.1:${HUB_PORT}/socket`,
      'BROWSERSLIST_IGNORE_OLD_DATA=1'
    ],
    // --public keeps the dev-server client on 127.0.0.1 (it defaults to localhost).
    cmd: [`${VUE_NODE_BIN}/node`, 'node_modules/@vue/cli-service/bin/vue-cli-service.js', 'serve', '--host', '127.0.0.1', '--port', String(VUE_PORT), '--public', `127.0.0.1:${VUE_PORT}`],
    identity: [new RegExp(`^${escape(VUE_NODE_BIN)}/node node_modules/@vue/cli-service/bin/vue-cli-service\\.js serve --host 127\\.0\\.0\\.1 --port ${VUE_PORT}\\b`)],
    ready: vueReady,
    readyTimeout: 240000
  }
}
const ORDER = [SERVICES.hub, SERVICES.vue]

async function hubReady () {
  const { origins } = JSON.parse(fs.readFileSync(AUTH_STATE, 'utf8'))
  const token = origins[0].localStorage.find(i => i.name === 'auth.jwt').value
  const res = await fetch(`${API_BASE}/me`, {
    headers: { Accept: 'application/vnd.fourball.v2+json', Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(5000)
  })
  return res.status === 200
}

async function vueReady () {
  const res = await fetch(`${VUE_URL}/`, { signal: AbortSignal.timeout(5000) })
  return res.status === 200 && (await res.text()).includes('<div id="app"')
}

async function waitFor (check, label, timeoutMs) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try { if (await check()) return } catch (e) { /* not up yet */ }
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  throw new Error(`${label} did not become ready within ${timeoutMs / 1000}s`)
}

async function start (service) {
  if (await portInUse(service.port)) throw new Error(`Refusing: port ${service.port} is already in use`)
  if (service.name === 'hub') {
    assertSafeDatabaseTarget()
    if (await portInUse(USGA_DEAD_PORT)) throw new Error(`Refusing: port ${USGA_DEAD_PORT} must have no listener`)
    if (fs.readdirSync(HUB_EXPORT).some(f => f.startsWith('.env'))) throw new Error('Refusing: Hub export contains a .env file')
    assertHubRepoTarget()
  }
  fs.mkdirSync(LOG_DIR, { recursive: true })
  const record = launchService(service, RUN_DIR, path.join(LOG_DIR, `${service.name}.log`))
  log(`${service.name} starting (process group ${record.pgid}, sandboxed) on 127.0.0.1:${service.port}`)
  await waitFor(service.ready, service.name, service.readyTimeout)
  log(`${service.name} ready`)
}

const stop = () => stopAll([SERVICES.vue, SERVICES.hub], RUN_DIR)

function status () {
  for (const service of ORDER) {
    const pids = listenerPids(service.port)
    const recorded = fs.existsSync(recordPath(service, RUN_DIR)) ? 'record present' : 'no record'
    log(`${service.name} port ${service.port}: ${pids.length ? `listening (pid ${pids.join(', ')})` : 'free'}; ${recorded}`)
  }
}

// Standalone use: Ctrl-C (or a terminating signal) during `start` stops
// whatever was started before exiting with the conventional signal status.
const SIGNAL_CODES = { SIGINT: 130, SIGTERM: 143, SIGHUP: 129 }
let stopping = null
function handleSignal (signal) {
  if (stopping) return
  log(`${signal} received; stopping services`)
  stopping = stop().finally(() => process.exit(SIGNAL_CODES[signal]))
}

const action = process.argv[2]
try {
  if (action === 'start') {
    for (const signal of Object.keys(SIGNAL_CODES)) process.on(signal, handleSignal)
    for (const service of ORDER) await start(service)
  } else if (action === 'stop') {
    if (!(await stop())) process.exit(1)
  } else if (action === 'status') {
    status()
  } else {
    throw new Error('Usage: node servers.mjs start|stop|status')
  }
} catch (error) {
  process.stderr.write(`[screens] ${error.message}\n`)
  if (action === 'start' && !stopping) await stop()
  process.exit(1)
}
