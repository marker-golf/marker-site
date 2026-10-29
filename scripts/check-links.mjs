// Internal-link check for both deployment paths.
//
//   1. Source: no hard-coded root-relative internal links in Markdown or
//      Nunjucks (href/src/poster/srcset/action="/...", Markdown "](/...)", or
//      a RelatedCard href given as a plain "/..." string) and no literal
//      /marker-site/ path. Internal links must go through the url filter:
//      {{ '/games/' | url }}.
//   2. Builds the site twice into temporary folders: PATHPREFIX=/ (a root
//      domain such as marker.golf) and PATHPREFIX=/marker-site/ (GitHub
//      Pages). In every page, each internal href, src, poster, srcset and
//      action, and each url() in the CSS, must start with the prefix exactly
//      once and resolve to a built file. External, protocol-relative,
//      mailto:, tel:, data: and fragment-only URLs are not checked.
//
// Exits non-zero and lists every offending file and URL.
// Usage: npm run check:links

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'src')
const PREFIXES = ['/', '/marker-site/']
const problems = []

const walk = dir => fs.readdirSync(dir, { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])
const rel = file => path.relative(ROOT, file)

// 1. Source scan ---------------------------------------------------------------
const ignored = new Set(fs.readFileSync(path.join(ROOT, '.eleventyignore'), 'utf8')
  .split('\n').map(line => line.trim()).filter(Boolean).map(line => path.join(ROOT, line)))
const SOURCE_PATTERNS = [
  { label: 'hard-coded root-relative attribute', re: /\b(?:href|src|poster|srcset|action)="(\/(?!\/)[^"{]*)"/g },
  { label: 'hard-coded root-relative Markdown link', re: /\]\((\/(?!\/)[^)\s]*)\)/g },
  { label: 'RelatedCard href without the url filter', re: /RelatedCard\(\s*"[^"]*",\s*"[^"]*",\s*["'](\/[^"']*)["']\s*\)/g },
  { label: 'literal /marker-site/ path', re: /(\/marker-site\/[^\s"')]*)/g }
]
for (const file of walk(SRC).filter(f => /\.(md|njk|html)$/.test(f) && !ignored.has(f))) {
  const text = fs.readFileSync(file, 'utf8')
  for (const { label, re } of SOURCE_PATTERNS) {
    for (const match of text.matchAll(re)) {
      const line = text.slice(0, match.index).split('\n').length
      problems.push(`${rel(file)}:${line}: ${label}: ${match[1]}`)
    }
  }
}

// 2. Both builds ------------------------------------------------------------------
const SKIP = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i // any scheme, protocol-relative, fragment-only
const ATTRIBUTE = /\b(href|src|poster|srcset|action)="([^"]*)"/g

function urlsIn (file, text) {
  if (file.endsWith('.css')) return [...text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)].map(m => m[1])
  return [...text.matchAll(ATTRIBUTE)].flatMap(([, name, value]) => name === 'srcset'
    ? value.split(',').map(candidate => candidate.trim().split(/\s+/)[0])
    : [value])
}

function checkBuild (prefix) {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'marker-site-links-'))
  try {
    const build = spawnSync(path.join(ROOT, 'node_modules/.bin/eleventy'), [`--output=${out}`, '--quiet'], {
      cwd: ROOT, encoding: 'utf8', env: { ...process.env, PATHPREFIX: prefix }
    })
    if (build.status !== 0) {
      problems.push(`build with PATHPREFIX=${prefix} failed:\n${build.stderr || build.stdout}`)
      return null
    }
    const files = walk(out).filter(f => /\.(html|css)$/.test(f))
    let checked = 0
    for (const file of files) {
      const page = '/' + path.relative(out, file).split(path.sep).join('/')
      for (const raw of urlsIn(file, fs.readFileSync(file, 'utf8'))) {
        const url = raw.replace(/&amp;/g, '&').split(/[?#]/)[0]
        if (!url || SKIP.test(raw)) continue
        checked++
        const where = `[${prefix}] ${path.relative(out, file)} -> ${raw}`
        if (prefix !== '/' && url.startsWith(prefix + prefix.slice(1))) { problems.push(`${where}: duplicated path prefix`); continue }
        // Relative URLs resolve against the page; root-relative ones must sit under the prefix.
        const resolved = url.startsWith('/') ? url : path.posix.join(path.posix.dirname(page.replace(/^\//, prefix)), url)
        if (!resolved.startsWith(prefix)) { problems.push(`${where}: not under ${prefix}`); continue }
        const target = path.join(out, decodeURIComponent(resolved.slice(prefix.length)))
        const found = [target, path.join(target, 'index.html'), `${target}.html`].some(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
        if (!found) problems.push(`${where}: missing target`)
      }
    }
    return { pages: files.filter(f => f.endsWith('.html')).length, checked }
  } finally {
    fs.rmSync(out, { recursive: true, force: true })
  }
}

const results = PREFIXES.map(prefix => [prefix, checkBuild(prefix)])
for (const [prefix, result] of results) {
  if (result) console.log(`[links] PATHPREFIX=${prefix}: ${result.pages} pages, ${result.checked} internal references checked`)
}
if (problems.length) {
  console.error(`[links] ${problems.length} problem(s):\n${problems.map(p => `  - ${p}`).join('\n')}`)
  process.exit(1)
}
console.log('[links] source uses the url filter for every internal link; all internal references resolve under both prefixes')
