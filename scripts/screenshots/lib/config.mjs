// Shared configuration for the isolated Vue screenshot pipeline.
//
// Everything here is a literal on purpose: the database name, hosts and ports
// are never read from the environment, so a stray DATABASE_URL or PG* variable
// cannot redirect a destructive operation.

import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

export const SITE_ROOT = path.resolve(here, '../../..')
export const SCRIPTS_DIR = path.resolve(here, '..')

// Sibling repositories (read-only: only `git archive`, `git show` and
// copy-on-write clones of dependency folders).
export const MARKER_ROOT = path.resolve(SITE_ROOT, '..')
export const APP_REPO = path.join(MARKER_ROOT, 'app')
export const HUB_REPO = path.join(MARKER_ROOT, 'hub')

// Pinned production commits (origin/master of each repo, fetched 2026-10-19).
export const APP_SHA = 'd6225d56e9e86d621cb3b4cc3934d8862e15e7bc'
export const HUB_SHA = 'dd30f45eea267a9827690d4b6f1329a1bcb110cd'

// Lockfiles that must be identical at the pinned SHA and in the working tree
// before that working tree's dependency folders are copied into an export.
export const APP_LOCKFILES = ['package-lock.json']
export const HUB_LOCKFILES = ['mix.lock']

// Work directory: outside every repository. Holds exports, logs, auth state.
export const WORK_DIR = path.join(MARKER_ROOT, '.marker-screens')
export const APP_EXPORT = path.join(WORK_DIR, 'app')
export const HUB_EXPORT = path.join(WORK_DIR, 'hub')
export const LOG_DIR = path.join(WORK_DIR, 'logs')
export const RUN_DIR = path.join(WORK_DIR, 'run')
export const DEBUG_DIR = path.join(WORK_DIR, 'debug')
export const CAPTURE_STAGING_DIR = path.join(WORK_DIR, 'capture-staging')
export const AUTH_STATE = path.join(WORK_DIR, 'auth', 'bob.storage-state.json')
export const FIXTURE_IDS = path.join(RUN_DIR, 'fixture-ids.json')
export const FIXTURE_STATE = path.join(RUN_DIR, 'fixture-state.json')
export const COURSE_CACHE_DIR = path.join(WORK_DIR, 'cache')

// Isolated services. Loopback only.
export const LOOPBACK = '127.0.0.1'
export const HUB_PORT = 4001
export const VUE_PORT = 8090
export const HUB_URL = `http://${LOOPBACK}:${HUB_PORT}`
export const VUE_URL = `http://${LOOPBACK}:${VUE_PORT}`
export const API_BASE = `${HUB_URL}/api/app`
// Loopback port with no listener; USGA calls fail locally with :econnrefused.
export const USGA_DEAD_PORT = 9

// The only database any script may create, drop, migrate or write.
export const SCREENS_DB = 'fourball_screens'
export const PG_HOST = LOOPBACK
export const PG_PORT = 5432
export const PG_USER = os.userInfo().username
export const SCREENS_DATABASE_URL = `postgres://${PG_USER}@${PG_HOST}:${PG_PORT}/${SCREENS_DB}`

// Read-only source of course reference data (pg_dump only, read-only session).
export const COURSE_SOURCE_DB = 'fourball_dev'
export const COURSE_REFERENCE_TABLES = [
  'facilities_v2',
  'courses_v2',
  'tee_set_ratings_v2',
  'holes_v2',
  'tee_set_holes_v2'
]

// Toolchains used inside the sandbox (minimal PATHs, no inherited environment).
const HOME = os.homedir()
export const HUB_PATH = `${HOME}/.asdf/shims:/opt/homebrew/bin:/usr/bin:/bin`
// The Vue CLI server runs on the app's own pinned Node (.nvmrc at APP_SHA),
// which the copied node_modules (node-sass binding) were built for.
export const VUE_NODE_BIN = `${HOME}/.nvm/versions/node/v14.18.1/bin`
export const VUE_PATH = `${VUE_NODE_BIN}:/usr/bin:/bin`

// The complete environment of every Hub process (mix compile, migrations,
// token minting, Repo checks and the server). Nothing is inherited.
export function hubEnv () {
  return [
    `HOME=${HOME}`, `PATH=${HUB_PATH}`, 'LANG=en_US.UTF-8', 'MIX_ENV=dev',
    `DATABASE_URL=${SCREENS_DATABASE_URL}`,
    // An unset USGA_DOMAIN produces a host-less URL that crashes hackney and
    // fails scorecard/event creation (Usga.Drift). A loopback port with no
    // listener instead yields :econnrefused, which the Hub already treats as
    // a USGA outage. Nothing is contacted.
    `USGA_DOMAIN=http://${LOOPBACK}:${USGA_DEAD_PORT}`
  ]
}

// Loopback ports each sandboxed process may connect to. Everything else,
// including other loopback ports and all DNS, is denied by the kernel.
export const SANDBOX_PORTS = {
  hub: [PG_PORT, USGA_DEAD_PORT],
  vue: [VUE_PORT],
  browser: [HUB_PORT, VUE_PORT]
}

// Overall time limits. A step that exceeds its limit is killed and the run
// goes through the same cleanup path as a failure or Ctrl-C.
const MINUTE = 60 * 1000
export const STEP_TIMEOUTS = {
  'prepare.mjs': 20 * MINUTE,
  'servers.mjs stop': 2 * MINUTE,
  'db-reset.mjs': 10 * MINUTE,
  'auth.mjs': 3 * MINUTE,
  'servers.mjs start': 10 * MINUTE,
  'fixtures.mjs': 10 * MINUTE,
  'capture.mjs': 15 * MINUTE,
  'video.mjs': 15 * MINUTE,
  'scan.mjs': 3 * MINUTE
}
export const COMMAND_TIMEOUT = 15 * MINUTE
export const API_TIMEOUT = 30 * 1000

// Capture settings.
export const VIEWPORT = { width: 390, height: 844 }
export const DEVICE_SCALE_FACTOR = 2
export const BROWSER_LOCALE = 'en-US'
export const BROWSER_TIMEZONE = 'America/Los_Angeles'
// Browser-only clock for deterministic rendering; never applied server-side.
export const BROWSER_FIXED_TIME = '2026-07-10T10:30:00-07:00'

// Origins (scheme + host + port) the browser may reach, for HTTP and WebSocket.
export const BROWSER_ALLOWED_HOSTS = [`${LOOPBACK}:${VUE_PORT}`, `${LOOPBACK}:${HUB_PORT}`]

// Browser requests that are expected and blocked, matched on origin + path
// prefix. Anything else outside the allowed loopback origins fails the run.
export const EXPECTED_BLOCKED_REQUESTS = [
  // Google Tag Manager script, loaded unconditionally by src/gtm.js.
  { origin: 'https://www.googletagmanager.com', pathPrefix: '/gtm.js' },
  // webpack-dev-server's own live-reload client probes our Vue server by the
  // name "localhost" (in addition to the configured 127.0.0.1 client). Local
  // dev tooling only; blocked so no reload can happen mid-capture.
  { origin: 'http://localhost:8090', pathPrefix: '/sockjs-node/' }
]

// Console errors that are expected side effects of the blocks above. Any
// other console error fails the capture.
export const ALLOWED_CONSOLE_ERRORS = [
  /^Failed to load resource: net::ERR_BLOCKED_BY_CLIENT/,
  /^\[WDS\] Disconnected!$/
]

// Fictional demo user the captures sign in as.
export const BOB_USER_ID = '5c2ee000-0000-4000-8000-000000000001'
export const BOB_PHONE = '0005550001'

// Proof-set output (distinct draft filenames; never overwrites existing assets).
export const SOURCE_DIR = path.join(SITE_ROOT, 'src/images/screenshots/source')
export const WEB_DIR = path.join(SITE_ROOT, 'src/images/screenshots/web')
export const DRAFT_PREFIX = 'vue-draft-'

// Demo video (video.mjs). Review output only: nothing is written into the
// site. ffmpeg/ffprobe are static builds installed into the work folder
// (see README), never on the repository's dependency list.
export const VIDEO_STAGING_DIR = path.join(WORK_DIR, 'video-staging')
export const VIDEO_REVIEW_DIR = path.join(WORK_DIR, 'review', 'video-poc')
export const FFMPEG = path.join(WORK_DIR, 'tools/node_modules/ffmpeg-static/ffmpeg')
export const FFPROBE = path.join(WORK_DIR, 'tools/node_modules/ffprobe-static/bin/darwin/arm64/ffprobe')
export const VIDEO_FPS = 30
