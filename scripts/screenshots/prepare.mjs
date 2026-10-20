// Exports the pinned Vue and Hub commits into the work directory and compiles
// the Hub inside the network sandbox.
//
// The source repositories are only read: `git archive` and `git show` of a
// pinned SHA, and copy-on-write (APFS clonefile) copies of node_modules, deps
// and _build. Those dependency folders come from the working tree, so they are
// copied only when the working tree's lockfiles are byte-identical to the
// lockfiles at the pinned SHA.

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { run, runSandboxed, log } from './lib/proc.mjs'
import { assertLockfileParity } from './lib/guards.mjs'
import {
  WORK_DIR, APP_REPO, HUB_REPO, APP_SHA, HUB_SHA, APP_EXPORT, HUB_EXPORT, APP_LOCKFILES, HUB_LOCKFILES, hubEnv
} from './lib/config.mjs'

const GIT_ENV = { PATH: '/usr/bin:/bin:/opt/homebrew/bin' }

// Every file tracked at the pinned SHA must exist in the export with exactly
// the committed content (git blob hash). Catches truncated or corrupted
// extractions and later edits to the export.
function assertCompleteExport (repo, sha, dest) {
  const entries = run('git', ['-C', repo, 'ls-tree', '-r', '-z', sha], { env: GIT_ENV }).stdout.split('\0').filter(Boolean)
  const problems = []
  for (const entry of entries) {
    const [meta, file] = entry.split('\t')
    const [mode, type, blob] = meta.split(' ')
    if (type !== 'blob' || !['100644', '100755'].includes(mode)) { problems.push(`${file} (unsupported ${mode} ${type})`); continue }
    const target = path.join(dest, file)
    if (!fs.existsSync(target)) { problems.push(`${file} (missing)`); continue }
    const content = fs.readFileSync(target)
    const hash = crypto.createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex')
    if (hash !== blob) problems.push(`${file} (content differs)`)
  }
  if (!entries.length || problems.length) {
    throw new Error(`Export of ${path.basename(repo)} ${sha.slice(0, 12)} does not match the pinned commit: ${problems.length} of ${entries.length} files (first: ${problems[0]})`)
  }
}

function exportRepo (repo, sha, dest, clones, lockfiles) {
  const marker = path.join(dest, '.export-sha')
  if (fs.existsSync(marker) && fs.readFileSync(marker, 'utf8').trim() === sha) {
    assertCompleteExport(repo, sha, dest)
    log(`${path.basename(dest)} export already at ${sha.slice(0, 12)} (complete)`)
    return
  }
  assertLockfileParity(repo, sha, lockfiles)
  fs.rmSync(dest, { recursive: true, force: true })
  fs.mkdirSync(dest, { recursive: true })
  const archive = run('git', ['-C', repo, 'archive', '--format=tar', sha], { env: GIT_ENV, binary: true })
  run('tar', ['-x', '-C', dest], { input: archive.stdout })
  assertCompleteExport(repo, sha, dest)
  for (const dir of clones) {
    run('cp', ['-cR', path.join(repo, dir), path.join(dest, dir)])
  }
  fs.writeFileSync(marker, `${sha}\n`)
  log(`exported ${path.basename(repo)} ${sha.slice(0, 12)} (lockfiles match: ${lockfiles.join(', ')})`)
}

fs.mkdirSync(WORK_DIR, { recursive: true, mode: 0o700 })

exportRepo(APP_REPO, APP_SHA, APP_EXPORT, ['node_modules'], APP_LOCKFILES)
exportRepo(HUB_REPO, HUB_SHA, HUB_EXPORT, ['deps', '_build'], HUB_LOCKFILES)

// The Hub's runtime config loads ../.env into the process environment,
// overriding anything we pass. The export must never contain one.
for (const name of fs.readdirSync(HUB_EXPORT)) {
  if (name.startsWith('.env')) throw new Error(`Refusing: Hub export contains ${name}`)
}

runSandboxed('hub', '/usr/bin/env', ['-i', ...hubEnv(), 'mix', 'compile'], { cwd: HUB_EXPORT, quiet: true })
log('hub compiled inside sandbox')
