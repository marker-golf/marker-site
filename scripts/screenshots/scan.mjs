// Secret/token scan. A required final step of the proof pipeline (it runs
// after the servers are stopped, whether the run succeeded or not).
//
// Scans every committable tooling file in marker-site (modified or untracked,
// not ignored) and every text file the pipeline generates in the work folder
// (logs, run records, debug output, capture staging, review and baseline
// files) for:
//   - JWT-shaped values and Bearer tokens;
//   - the active demo token itself;
//   - the Hub's committed config secrets (from the pinned export);
//   - values from the Hub working tree's .env, if one exists.
// The auth-state file is the one place the active token may live; it must be
// mode 0600 inside a 0700 folder. Only file names and pattern labels are
// printed, never values.

import fs from 'node:fs'
import path from 'node:path'
import { run, log } from './lib/proc.mjs'
import { SITE_ROOT, WORK_DIR, AUTH_STATE, HUB_EXPORT, HUB_REPO } from './lib/config.mjs'

const BINARY = /\.(png|webp|jpe?g|gif|woff2?|ico|pdf)$/i
const GENERATED_DIRS = ['logs', 'run', 'debug', 'capture-staging', 'review', 'baseline', 'auth']

const patterns = [
  { label: 'JWT-shaped value', test: text => /eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/.test(text) },
  { label: 'Bearer token', test: text => /Bearer\s+(?!\[redacted)[A-Za-z0-9._~+/=-]{16,}/.test(text) }
]
const literal = (label, value) => value && value.length >= 12 && patterns.push({ label, test: text => text.includes(value) })

if (fs.existsSync(AUTH_STATE)) {
  const token = JSON.parse(fs.readFileSync(AUTH_STATE, 'utf8')).origins?.[0]?.localStorage?.find(i => i.name === 'auth.jwt')?.value
  literal('active demo token', token)
}
for (const file of ['config.exs', 'dev.exs']) {
  const source = path.join(HUB_EXPORT, 'config', file)
  if (!fs.existsSync(source)) continue
  for (const match of fs.readFileSync(source, 'utf8').matchAll(/(secret_key_base|secret_key|signing_salt):\s*"([^"]{12,})"/g)) {
    literal(`Hub committed ${match[1]}`, match[2])
  }
}
const hubEnvFile = path.join(HUB_REPO, '.env')
if (fs.existsSync(hubEnvFile)) {
  for (const line of fs.readFileSync(hubEnvFile, 'utf8').split('\n')) {
    const value = line.replace(/^export\s+/, '').split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '')
    // Plain URLs without credentials are not secrets (and cause false positives).
    if (!/^https?:\/\/[^@\s]*$/.test(value)) literal('Hub .env value', value)
  }
}

const walk = dir => fs.existsSync(dir)
  ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])
  : []

const committable = run('git', ['-C', SITE_ROOT, 'ls-files', '-m', '-o', '--exclude-standard'], { env: { PATH: '/usr/bin:/bin:/opt/homebrew/bin' } })
  .stdout.split('\n').filter(f => f && !f.startsWith('.claude/')).map(f => path.join(SITE_ROOT, f))
const generated = GENERATED_DIRS.flatMap(d => walk(path.join(WORK_DIR, d)))
const files = [...new Set([...committable, ...generated])].filter(f => !BINARY.test(f) && fs.existsSync(f))

const hits = []
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  for (const pattern of patterns) {
    if (!pattern.test(text)) continue
    if (file === AUTH_STATE && ['JWT-shaped value', 'active demo token'].includes(pattern.label)) continue
    hits.push(`${path.relative(path.dirname(SITE_ROOT), file)}: ${pattern.label}`)
  }
}

const problems = [...hits]
if (fs.existsSync(AUTH_STATE)) {
  const fileMode = fs.statSync(AUTH_STATE).mode & 0o777
  const dirMode = fs.statSync(path.dirname(AUTH_STATE)).mode & 0o777
  if (fileMode !== 0o600) problems.push(`auth state mode is ${fileMode.toString(8)}, expected 600`)
  if (dirMode !== 0o700) problems.push(`auth folder mode is ${dirMode.toString(8)}, expected 700`)
}

log(`secret scan: ${committable.length} committable files, ${generated.length} generated files, ${patterns.length} patterns`)
if (problems.length) {
  process.stderr.write(`[screens] secret scan FAILED:\n${problems.map(p => `  - ${p}`).join('\n')}\n`)
  process.exit(1)
}
log('secret scan passed: no tokens or secrets outside the 0600 auth state')
