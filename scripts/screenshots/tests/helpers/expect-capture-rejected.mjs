// Test-only step: runs capture.mjs with an injected failure and passes only if
// the capture is rejected and nothing in the screenshot folders changed:
//   - every published screenshot the site manifest references (each approved
//     slot's WebP `src` and PNG `fallback`, at least the 35 published Vue
//     pairs) exists before the run and is byte-for-byte unchanged after it;
//   - the complete contents of both folders (source PNGs and web WebPs,
//     including any vue-draft-* files) are byte-for-byte unchanged, so a
//     rejected capture cannot overwrite, add (partially publish) or remove a
//     single file.
// Usage: node expect-capture-rejected.mjs page-error|external-request
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { SCRIPTS_DIR, SITE_ROOT, SOURCE_DIR, WEB_DIR } from '../../lib/config.mjs'

// The Vue screenshot set PR #4 published (35 PNG + WebP pairs); the manifest
// may reference more over time, never fewer.
const MIN_PUBLISHED_PAIRS = 35

const failure = process.argv[2]
const manifest = JSON.parse(fs.readFileSync(path.join(SITE_ROOT, 'src/_data/screenshots.json'), 'utf8'))
const sitePath = url => path.join(SITE_ROOT, 'src', url.replace(/^\//, ''))
const pairs = new Map()
for (const [key, slot] of Object.entries(manifest)) {
  if (key.startsWith('_') || slot.status !== 'approved') continue
  const webp = sitePath(slot.src)
  const png = sitePath(slot.fallback)
  if (path.dirname(webp) !== WEB_DIR || path.dirname(png) !== SOURCE_DIR || !webp.endsWith('.webp') || !png.endsWith('.png')) {
    throw new Error(`Manifest slot ${key} does not point at a WebP in ${WEB_DIR} and a PNG in ${SOURCE_DIR}`)
  }
  pairs.set(webp, png)
}
const published = [...pairs].flat().sort()

const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
const folderFiles = () => [SOURCE_DIR, WEB_DIR].flatMap(dir => fs.readdirSync(dir).map(f => path.join(dir, f))).sort()
const fingerprint = files => files.map(f => `${path.relative(SITE_ROOT, f)} ${fs.existsSync(f) ? hash(f) : 'missing'}`).join('\n')

const missingBefore = published.filter(f => !fs.existsSync(f))
const publishedBefore = fingerprint(published)
const foldersBefore = fingerprint(folderFiles())
const result = spawnSync(process.execPath, [path.join(SCRIPTS_DIR, 'capture.mjs'), `--inject-failure=${failure}`], { encoding: 'utf8', timeout: 15 * 60 * 1000 })
process.stdout.write(result.stdout)
process.stderr.write(result.stderr)
const publishedAfter = fingerprint(published)
const foldersAfter = fingerprint(folderFiles())

const checks = [
  [pairs.size >= MIN_PUBLISHED_PAIRS, `the manifest references ${pairs.size} published screenshot pairs, expected at least ${MIN_PUBLISHED_PAIRS}`],
  [!missingBefore.length, `published screenshots missing before the run: ${missingBefore.map(f => path.basename(f)).join(', ')}`],
  [result.status === 1, `capture exited ${result.status}, expected 1`],
  [/capture rejected; drafts left unchanged/.test(result.stderr), 'capture did not report a rejection'],
  // In the dev build, uncaught errors can be reported through console.error
  // instead of (or as well as) a page error; both reject the capture.
  [failure !== 'page-error' || /(page errors|console errors outside the allowlist):[\s\S]*injected page error/.test(result.stderr), 'page error was not the reported cause'],
  [failure !== 'external-request' || /unexpected network activity:[\s\S]*injected-unapproved-request/.test(result.stderr), 'unapproved request was not the reported cause'],
  [publishedBefore === publishedAfter, 'published screenshots changed'],
  [foldersBefore === foldersAfter, 'screenshot folders changed (a file was added, removed or modified)']
]
const failed = checks.filter(([ok]) => !ok).map(([, message]) => message)
if (failed.length) {
  process.stderr.write(`[test] FAILED (${failure}): ${failed.join('; ')}\n`)
  process.exit(1)
}
console.log(`[test] ${failure}: capture rejected; all ${pairs.size} published screenshot pairs and all ${foldersBefore.split('\n').length} files in the screenshot folders byte-identical`)
