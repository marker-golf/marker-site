// Captures the proof set from the isolated Vue app with Playwright Chromium,
// transactionally:
//
//   1. claim the fixture state (refuses stale or already-captured data);
//   2. re-run itself inside the "browser" network sandbox, which can reach
//      only the Hub (4001) and Vue (8090) loopback ports;
//   3. capture every selected recipe into a staging folder outside the repo;
//   4. require: all recipes succeeded, no network/WebSocket/redirect
//      violation, no page error, only allowlisted console noise, every file
//      present with the expected dimensions; then encode WebPs in staging;
//   5. back outside the sandbox, check in the database that only the
//      intended fixtures changed (see lib/state.mjs) and, when F7 was
//      completed, that its stored final results reconcile and match the
//      settlement the capture displayed;
//   6. only then move PNGs and WebPs into the draft folders.
//
// A failed run leaves the existing drafts untouched.
//
// Network policy: see lib/browser-policy.mjs. Chromium's resolver is also
// restricted so no other hostname can resolve. Chromium's own sandbox is
// disabled because it cannot initialise inside the macOS sandbox (nested
// Seatbelt); the OS sandbox around the whole browser is kept instead.
//
// The browser clock is fixed for deterministic rendering only. Server-side
// token validation uses the Hub's real clock and is unaffected.
//
// Usage: node capture.mjs [--only=<recipe>] [--inject-failure=page-error|external-request]
// (--inject-failure exists only for the transactional regression test.)

import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { log, redact } from './lib/proc.mjs'
import { sandboxArgs } from './lib/sandbox.mjs'
import { claimForCapture, verifyFixturesAfterCapture, finalizedEventPositions } from './lib/state.mjs'
import { createReport, installNetworkPolicy } from './lib/browser-policy.mjs'
import { fontFulfillers } from './lib/local-fonts.mjs'
import {
  VUE_URL, AUTH_STATE, FIXTURE_IDS, VIEWPORT, DEVICE_SCALE_FACTOR, BROWSER_LOCALE, BROWSER_TIMEZONE,
  BROWSER_FIXED_TIME, BROWSER_ALLOWED_HOSTS, EXPECTED_BLOCKED_REQUESTS, ALLOWED_CONSOLE_ERRORS,
  SOURCE_DIR, WEB_DIR, DRAFT_PREFIX, DEBUG_DIR, CAPTURE_STAGING_DIR, USGA_DEAD_PORT, LOOPBACK, HUB_PORT
} from './lib/config.mjs'
import shots from './proof-set.mjs'

const only = process.argv.find(arg => arg.startsWith('--only='))?.slice('--only='.length)
const inject = process.argv.find(arg => arg.startsWith('--inject-failure='))?.slice('--inject-failure='.length)
if (inject && !['page-error', 'external-request'].includes(inject)) throw new Error(`Unknown --inject-failure=${inject}`)
const selected = only ? shots.filter(s => s.name === only) : shots
if (!selected.length) throw new Error(`No proof shot named ${only}`)
const firstWriter = shots.findIndex(shot => shot.mayWrite)
if (firstWriter !== -1 && shots.slice(firstWriter).some(shot => !shot.mayWrite)) {
  throw new Error('Refusing: every state-changing recipe (mayWrite) must run after all read-only recipes')
}
// Recipes that lock a fixture run after every recipe that does not, so no
// capture can depend on a fixture that is already locked.
const firstLocker = shots.findIndex(shot => shot.locks?.length)
if (firstLocker !== -1 && shots.slice(firstLocker).some(shot => !shot.locks?.length)) {
  throw new Error('Refusing: every locking recipe must run after all recipes that do not lock')
}
for (const shot of shots) {
  if (shot.mayWrite && typeof shot.writes !== 'function') throw new Error(`Refusing: ${shot.name} may write but declares no writes`)
  if (!shot.mayWrite && (shot.writes || shot.locks)) throw new Error(`Refusing: ${shot.name} declares writes or locks without mayWrite`)
}

// Outer process: claim the fixture state, then re-run inside the sandbox.
if (process.env.SCREENS_SANDBOX !== 'browser') {
  claimForCapture()
  const [bin, args] = sandboxArgs('browser', process.execPath, process.argv.slice(1))
  const result = spawnSync(bin, args, {
    stdio: 'inherit',
    env: { HOME: process.env.HOME, PATH: '/usr/bin:/bin', LANG: 'en_US.UTF-8', SCREENS_SANDBOX: 'browser' }
  })
  if (result.status !== 0) process.exit(result.status ?? 1)

  // The sandboxed run staged and validated everything. Before publishing,
  // confirm in the database that only the intended fixtures changed.
  const ids = JSON.parse(fs.readFileSync(FIXTURE_IDS, 'utf8'))
  const locked = [...new Set(selected.flatMap(shot => shot.locks || []))]
  verifyFixturesAfterCapture(ids, { locked })
  log(`fixture check passed: only the intended fixtures changed${locked.length ? ` (locked and finalized: ${locked.join(', ')})` : ''}`)
  const manifestFile = path.join(CAPTURE_STAGING_DIR, 'publish.json')
  const { runId, files, results } = JSON.parse(fs.readFileSync(manifestFile, 'utf8'))
  if (locked.includes('f7')) {
    // The stored final results must reconcile on their own and equal what
    // the capture showed in Overall - event, player by player.
    const stored = finalizedEventPositions(ids.f7Event)
    const shown = results?.eventSettlement?.overall
    if (!shown) throw new Error('Refusing to publish: the F7 capture recorded no settlement')
    const names = new Set([...Object.keys(stored), ...Object.keys(shown)])
    for (const name of names) {
      const s = stored[name]
      const d = shown[name]
      if (!s || !d || Math.round(s.gross * 100) !== d.gross || Math.round(s.buyIn * 100) !== d.buyIn) {
        throw new Error(`Refusing to publish: finalized results for ${name} differ from the displayed settlement`)
      }
    }
    const dollars = cents => `${cents < 0 ? '-' : ''}$${Math.abs(cents / 100)}`
    log(`F7 finalized results match the displayed settlement for ${names.size} players`)
    for (const [game, g] of Object.entries(results.eventSettlement.games)) {
      log(`  ${game}: pool ${dollars(g.pool)} (${dollars(g.buyIn)} x ${g.pool / g.buyIn}); paid ${Object.entries(g.payouts).map(([p, c]) => `${p} ${dollars(c)}`).join(', ')}`)
    }
    log(`  overall (gross / buy-in / net): ${Object.entries(shown).map(([p, v]) => `${p} ${dollars(v.gross)}/${dollars(v.buyIn)}/${dollars(v.net)}`).join('; ')}`)
    log(`  settlement, buy-ins collected: ${results.eventSettlement.settlement.map(t => `${t.from} -> ${t.to} ${dollars(t.amount)}`).join('; ')}`)
    log(`  settlement, buy-ins not collected: ${results.eventSettlement.settlementWithoutBuyIns.map(t => `${t.from} -> ${t.to} ${dollars(t.amount)}`).join('; ')}`)
  }
  for (const [, dest] of files) {
    if (!path.basename(dest).startsWith(DRAFT_PREFIX) || ![SOURCE_DIR, WEB_DIR].includes(path.dirname(dest))) {
      throw new Error(`Refusing to publish ${dest}`)
    }
  }
  for (const [from, dest] of files) {
    const temp = `${dest}.tmp-${runId}`
    fs.copyFileSync(from, temp)
    fs.renameSync(temp, dest)
  }
  fs.rmSync(CAPTURE_STAGING_DIR, { recursive: true, force: true })
  log(`published ${files.length} draft files (${files.length / 2} PNG + ${files.length / 2} WebP)`)
  process.exit(0)
}

// Inner process: prove the sandbox is really in force (an unapproved
// loopback port must be denied by the kernel, not merely refused).
await new Promise((resolve, reject) => {
  const socket = net.connect({ host: LOOPBACK, port: USGA_DEAD_PORT })
  socket.once('connect', () => { socket.destroy(); reject(new Error('Refusing: capture is not network-sandboxed')) })
  socket.once('error', error => error.code === 'EPERM' ? resolve() : reject(new Error(`Refusing: capture is not network-sandboxed (${error.code})`)))
})

const require = createRequire(import.meta.url)
const sharp = require('sharp')
const { chromium } = require('playwright')

const STABILIZE_CSS = `
  *, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
  #nprogress { display: none !important; }
`

const report = createReport()
const consoleErrors = []
const pageErrors = []
const hubWrites = []
const results = {}
const ids = JSON.parse(fs.readFileSync(FIXTURE_IDS, 'utf8'))
const runId = new Date().toISOString().replace(/[:.]/g, '-')
const staging = path.join(CAPTURE_STAGING_DIR, runId)
fs.rmSync(CAPTURE_STAGING_DIR, { recursive: true, force: true })
fs.mkdirSync(staging, { recursive: true })
const outputName = shot => `${DRAFT_PREFIX}${shot.name}-mobile-demo`

const browser = await chromium.launch({
  chromiumSandbox: false,
  args: ['--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1']
})
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: DEVICE_SCALE_FACTOR,
  isMobile: true,
  hasTouch: true,
  locale: BROWSER_LOCALE,
  timezoneId: BROWSER_TIMEZONE,
  reducedMotion: 'reduce',
  serviceWorkers: 'block',
  storageState: AUTH_STATE
})
await installNetworkPolicy(context, { allowedHosts: BROWSER_ALLOWED_HOSTS, expectedBlocked: EXPECTED_BLOCKED_REQUESTS, fulfillers: fontFulfillers, report })
await context.clock.setFixedTime(new Date(BROWSER_FIXED_TIME))
await context.addInitScript(css => {
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  })
}, STABILIZE_CSS)
if (inject === 'page-error') {
  await context.addInitScript(() => setTimeout(() => { throw new Error('injected page error (regression test)') }, 0))
}

let failure = null
try {
  for (const shot of selected) {
    // Every recipe starts at the same fixed browser time (a recipe may move
    // it forward, see letDebounceRun in proof-set.mjs).
    await context.clock.setFixedTime(new Date(BROWSER_FIXED_TIME))
    const page = await context.newPage()
    page.on('console', msg => {
      if (msg.type() !== 'error') return
      const text = msg.text()
      if (!ALLOWED_CONSOLE_ERRORS.some(pattern => pattern.test(text))) consoleErrors.push(`${shot.name}: ${redact(text).slice(0, 200)}`)
    })
    page.on('pageerror', err => pageErrors.push(`${shot.name}: ${redact(err.message).slice(0, 200)}`))
    // Read-only recipes must not change Hub data (any non-GET API request);
    // writing recipes may send only the writes they declare.
    const declared = shot.mayWrite ? shot.writes(ids) : []
    page.on('request', request => {
      const url = new URL(request.url())
      if (url.host !== `${LOOPBACK}:${HUB_PORT}` || ['GET', 'HEAD', 'OPTIONS'].includes(request.method())) return
      if (!declared.some(([method, pathname]) => method === request.method() && pathname === url.pathname)) {
        hubWrites.push(`${shot.name}: ${shot.mayWrite ? 'undeclared ' : ''}${request.method()} ${url.pathname}`)
      }
    })

    // Recorded Hub responses a recipe replays (for example the course search
    // the new-event form performs). Only GET requests to the allowed Hub host
    // and the exact recorded path and query are answered; everything else
    // falls through to the network policy.
    for (const name of shot.mocks || []) {
      const mock = JSON.parse(fs.readFileSync(path.join(path.dirname(FIXTURE_IDS), 'mocks', `${name}.json`), 'utf8'))
      await page.route('**/*', route => {
        const request = route.request()
        const url = new URL(request.url())
        const matches = request.method() === 'GET' && url.host === `${LOOPBACK}:${HUB_PORT}` &&
          url.pathname === mock.path && url.searchParams.toString() === new URLSearchParams(mock.params).toString()
        if (!matches) return route.fallback()
        report.mocked.push(`${shot.name}: GET ${url.pathname}?${url.searchParams}`)
        return route.fulfill({ status: 200, headers: mock.headers, body: JSON.stringify(mock.body) })
      })
    }
    await page.goto(`${VUE_URL}${shot.path(ids)}`, { waitUntil: 'networkidle' })
    if (new URL(page.url()).pathname.startsWith('/login')) throw new Error(`${shot.name}: redirected to login`)
    if (inject === 'external-request') {
      await page.evaluate(port => fetch(`http://127.0.0.1:${port}/injected-unapproved-request`).catch(() => null), 4799)
    }
    try {
      await shot.prepare(page, ids, results)
    } catch (error) {
      fs.mkdirSync(DEBUG_DIR, { recursive: true })
      await page.screenshot({ path: path.join(DEBUG_DIR, `${shot.name}.png`) })
      fs.writeFileSync(path.join(DEBUG_DIR, `${shot.name}.txt`), await page.locator('body').innerText())
      throw new Error(`${shot.name}: ${error.message.split('\n')[0]} (debug output in ${DEBUG_DIR})`)
    }
    await page.waitForLoadState('networkidle')
    await page.evaluate(() => document.fonts.ready)
    // Two animation frames: the last layout and paint have been committed.
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))

    const file = path.join(staging, `${outputName(shot)}.png`)
    await page.screenshot({ path: file, clip: { x: 0, y: 0, ...VIEWPORT } })
    log(`captured ${path.basename(file)} (staged)`)
    await page.close()
  }
} catch (error) {
  failure = error
} finally {
  await context.close()
  await browser.close()
}

// Verdict ------------------------------------------------------------------
log(`fonts served locally: ${report.fulfilled}; expected blocked: ${[...new Set(report.expectedBlocked)].join(', ') || 'none'}`)
if (report.mocked.length) log(`replayed recorded Hub responses: ${[...new Set(report.mocked)].join('; ')}`)
const problems = []
if (failure) problems.push(`recipe failed: ${redact(failure.message)}`)
if (report.unexpected.length) problems.push(`unexpected network activity:\n  ${[...new Set(report.unexpected)].join('\n  ')}`)
if (pageErrors.length) problems.push(`page errors:\n  ${pageErrors.join('\n  ')}`)
if (hubWrites.length) problems.push(`Hub writes outside the declared ones:\n  ${hubWrites.join('\n  ')}`)
if (consoleErrors.length) problems.push(`console errors outside the allowlist:\n  ${consoleErrors.join('\n  ')}`)

const expected = [VIEWPORT.width * DEVICE_SCALE_FACTOR, VIEWPORT.height * DEVICE_SCALE_FACTOR]
if (!problems.length) {
  for (const shot of selected) {
    const png = path.join(staging, `${outputName(shot)}.png`)
    if (!fs.existsSync(png)) { problems.push(`missing ${path.basename(png)}`); continue }
    const { width, height } = await sharp(png).metadata()
    if (width !== expected[0] || height !== expected[1]) problems.push(`${path.basename(png)} is ${width}x${height}, expected ${expected.join('x')}`)
  }
}
if (problems.length) {
  process.stderr.write(`[screens] capture rejected; drafts left unchanged:\n${problems.map(p => `  - ${p}`).join('\n')}\n`)
  process.exit(1)
}
log(`network policy held: no unexpected requests, WebSockets or redirects (${selected.length} captures)`)

// Encode WebPs in staging and hand the list to the outer process, which
// publishes only after the fixture check. Only draft-prefixed names are written.
const publish = []
for (const shot of selected) {
  const base = outputName(shot)
  const webp = path.join(staging, `${base}.webp`)
  await sharp(path.join(staging, `${base}.png`)).webp({ quality: 85 }).toFile(webp)
  const { width, height } = await sharp(webp).metadata()
  if (width !== expected[0] || height !== expected[1]) throw new Error(`${base}.webp has unexpected dimensions ${width}x${height}`)
  publish.push([path.join(staging, `${base}.png`), path.join(SOURCE_DIR, `${base}.png`)], [webp, path.join(WEB_DIR, `${base}.webp`)])
}
fs.writeFileSync(path.join(CAPTURE_STAGING_DIR, 'publish.json'), JSON.stringify({ runId, files: publish, results }))
log(`staged and validated ${publish.length} draft files (${expected.join('x')}); publishing after the fixture check`)
