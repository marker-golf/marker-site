// Records the demo video "Score a round with side games" from the isolated
// Vue app, then restores the fixture data it changed:
//
//   1. claim the fixture state (refuses stale or already-captured data) and
//      make the fictional user premium (fixtures/video-premium.json), so the
//      leaderboard shows no upgrade banner;
//   2. re-run itself inside the "browser" network sandbox (Hub and Vue
//      loopback ports only) with the same network policy, local fonts, fixed
//      browser clock and console/page-error checks as capture.mjs;
//   3. record the story below as lossless PNG frames (Chrome DevTools
//      screencast at 780x1688), with a touch indicator and short callouts
//      drawn in an overlay outside the app's own DOM;
//   4. after recording (not filmed) require that side-game accounting still
//      reconciles and that the Skins result changed exactly as the entered
//      scores imply;
//   5. back outside the sandbox: require that the only data changed is the
//      video subscription and the declared hole-10 score rows on F1, delete
//      them, and require every fixture digest (including premium state) and
//      audited row to match the fixtures-ready snapshot again (lib/state.mjs);
//   6. encode, with ffmpeg in a no-network sandbox: an FFV1 intermediate, an
//      H.264 MP4, a VP9 WebM (no audio, no metadata) and a JPEG poster, into
//      the review folder outside the site, named for VERSION so earlier
//      versions are never overwritten. Nothing is written into the site.
//
// The only Hub writes allowed are the four POST /api/app/scores the story
// makes; any other write fails the run.
//
// Usage: node video.mjs [--encode-only]
// (--encode-only re-encodes the last recording that passed every check,
// without opening the browser or touching data.)

import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { log, redact } from './lib/proc.mjs'
import { sandboxArgs } from './lib/sandbox.mjs'
import { claimForCapture, addVideoPremium, restoreAfterVideo } from './lib/state.mjs'
import { createReport, installNetworkPolicy } from './lib/browser-policy.mjs'
import { fontFulfillers } from './lib/local-fonts.mjs'
import {
  VUE_URL, AUTH_STATE, FIXTURE_IDS, VIEWPORT, DEVICE_SCALE_FACTOR, BROWSER_LOCALE, BROWSER_TIMEZONE,
  BROWSER_FIXED_TIME, BROWSER_ALLOWED_HOSTS, EXPECTED_BLOCKED_REQUESTS, ALLOWED_CONSOLE_ERRORS,
  DEBUG_DIR, USGA_DEAD_PORT, LOOPBACK, HUB_PORT, SCRIPTS_DIR,
  VIDEO_STAGING_DIR, VIDEO_REVIEW_DIR, FFMPEG, FFPROBE, VIDEO_FPS
} from './lib/config.mjs'
import {
  showGameColumn, scrollBelowHeader, section, sectionTitle, holeRow, money, assertSideGamesReconcile
} from './proof-set.mjs'

const NAME = 'score-round-side-games'
// Review output version (v1: first proof of concept; v2: premium user, so no
// upgrade banner, and the final frame framed on the Skins settlement).
const VERSION = 'v2'
const OUTPUT = `${NAME}-${VERSION}`
const PREMIUM = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'fixtures', 'video-premium.json'), 'utf8'))
const F1 = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'fixtures', 'shinnecock-f1.json'), 'utf8'))
// Hole 10 (par 4, stroke index 2; every player but Edward gets a stroke).
// Hole 9 was tied, so its skin carries: Bob's birdie (net 2) beats three
// net 4s and wins two skins. Order is the scorecard's column order.
const HOLE = 10
const ENTRIES = [['allan', 5], ['bert', 5], ['edward', 4], ['bob', 3]]
const SKINS_WINNER = 'Bob Smith'
const SKINS_WON = 2
const SKIN_AMOUNT = F1.games.find(g => g.game === 'Skins').amount
const DURATION_LIMITS = [20, 30] // seconds

const ids = JSON.parse(fs.readFileSync(FIXTURE_IDS, 'utf8'))
const expectedScores = Object.fromEntries(ENTRIES.map(([key, score]) => [ids.f1Players[key], score]))
const declaredWrites = [['POST', '/api/app/scores']]
const resultsFile = path.join(VIDEO_STAGING_DIR, 'results.json')
const framesDir = path.join(VIDEO_STAGING_DIR, 'frames')

// Outer process --------------------------------------------------------------
if (process.argv.includes('--encode-only')) {
  if (!fs.existsSync(resultsFile)) throw new Error('No verified recording to encode; run node video.mjs first')
  await encode(JSON.parse(fs.readFileSync(resultsFile, 'utf8')))
  process.exit(0)
}
if (process.env.SCREENS_SANDBOX !== 'browser') {
  claimForCapture()
  fs.rmSync(VIDEO_STAGING_DIR, { recursive: true, force: true })
  let result = { status: 1 }
  try {
    addVideoPremium(PREMIUM, ids.bobUserId)
    log('fictional user is premium for the recording (one active video subscription)')
    const [bin, args] = sandboxArgs('browser', process.execPath, process.argv.slice(1))
    result = spawnSync(bin, args, {
      stdio: 'inherit',
      env: { HOME: process.env.HOME, PATH: '/usr/bin:/bin', LANG: 'en_US.UTF-8', SCREENS_SANDBOX: 'browser' }
    })
  } finally {
    // Restore the fixture data whether or not the recording succeeded; a
    // recording that changed anything else is refused here.
    const removed = restoreAfterVideo(ids, { hole: HOLE, scores: expectedScores, premium: PREMIUM })
    log(`fixture data restored: video subscription and ${removed} hole-${HOLE} score row(s) removed; every fixture digest (including premium state) and audited row matches the fixtures-ready snapshot`)
  }
  if (result.status !== 0) process.exit(result.status ?? 1)
  await encode(JSON.parse(fs.readFileSync(resultsFile, 'utf8')))
  process.exit(0)
}

// Inner process: prove the sandbox is really in force.
await new Promise((resolve, reject) => {
  const socket = net.connect({ host: LOOPBACK, port: USGA_DEAD_PORT })
  socket.once('connect', () => { socket.destroy(); reject(new Error('Refusing: recording is not network-sandboxed')) })
  socket.once('error', error => error.code === 'EPERM' ? resolve() : reject(new Error(`Refusing: recording is not network-sandboxed (${error.code})`)))
})

const require = createRequire(import.meta.url)
const sharp = require('sharp')
const { chromium } = require('playwright')

// Same stabilization as the screenshots (no app transitions, no progress
// bar, no caret). The demo overlay is attached to <html>, outside <body>,
// and animates with the Web Animations API, which this CSS does not affect.
const STABILIZE_CSS = `
  *, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; }
  #nprogress { display: none !important; }
`

// Touch indicator and callouts. pointer-events: none, so the overlay can
// never receive a tap meant for the app; the root has no size, so it is not
// mistaken for a fixed header (scrollBelowHeader).
function installDemoOverlay () {
  const root = document.createElement('div')
  root.setAttribute('aria-hidden', 'true')
  root.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;pointer-events:none;z-index:2147483647;font-family:"Source Sans Pro",sans-serif'
  let callout = null
  const pill = text => {
    const el = document.createElement('div')
    el.textContent = text
    el.style.cssText = 'position:fixed;white-space:nowrap;padding:10px 20px;border-radius:999px;background:#1e2e24;color:#fff;font-size:19px;font-weight:600;letter-spacing:.2px;box-shadow:0 6px 18px rgba(0,0,0,.18)'
    return el
  }
  window.__demo = {
    tap (x, y) {
      const dot = document.createElement('div')
      dot.style.cssText = `position:fixed;left:${x - 22}px;top:${y - 22}px;width:44px;height:44px;border-radius:50%;background:rgba(32,48,38,.22);box-shadow:0 0 0 2px rgba(255,255,255,.85)`
      root.appendChild(dot)
      dot.animate([{ transform: 'scale(.55)', opacity: 0.95 }, { transform: 'scale(1)', opacity: 0.9, offset: 0.35 }, { transform: 'scale(1.25)', opacity: 0 }], { duration: 650, easing: 'ease-out', fill: 'forwards' })
        .finished.then(() => dot.remove())
    },
    // Centred `bottom` px above the viewport bottom, or at a viewport point
    // ({ left, top }) next to the content it refers to.
    callout (text, place) {
      window.__demo.hideCallout()
      callout = pill(text)
      const centred = 'bottom' in place
      callout.style.left = centred ? '50%' : `${place.left}px`
      if (centred) callout.style.bottom = `${place.bottom}px`
      else callout.style.top = `${place.top}px`
      root.appendChild(callout)
      const x = centred ? '-50%' : '0'
      callout.animate([{ opacity: 0, transform: `translate(${x}, 8px)` }, { opacity: 1, transform: `translate(${x}, 0)` }], { duration: 280, easing: 'ease-out', fill: 'forwards' })
    },
    measureCallout (text) {
      const probe = pill(text)
      probe.style.visibility = 'hidden'
      root.appendChild(probe)
      const { width, height } = probe.getBoundingClientRect()
      probe.remove()
      return { width, height }
    },
    hideCallout () {
      if (!callout) return
      const old = callout
      callout = null
      old.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: 'forwards' }).finished.then(() => old.remove())
    }
  }
  const attach = () => document.documentElement.appendChild(root)
  if (document.documentElement) attach()
  else document.addEventListener('DOMContentLoaded', attach)
}

const report = createReport()
const consoleErrors = []
const pageErrors = []
const hubWrites = []
const scorePosts = []
fs.mkdirSync(framesDir, { recursive: true })

// The screencast delivers frames at the compositor's scale, which the
// emulated device scale factor alone leaves at CSS pixels (390x844); forcing
// the same factor gives device-pixel frames (780x1688) with the same layout.
const browser = await chromium.launch({
  chromiumSandbox: false,
  args: ['--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1', `--force-device-scale-factor=${DEVICE_SCALE_FACTOR}`]
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
await context.addInitScript(installDemoOverlay)

function watch (page, label) {
  page.on('console', msg => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    if (!ALLOWED_CONSOLE_ERRORS.some(pattern => pattern.test(text))) consoleErrors.push(`${label}: ${redact(text).slice(0, 200)}`)
  })
  page.on('pageerror', err => pageErrors.push(`${label}: ${redact(err.message).slice(0, 200)}`))
  page.on('request', request => {
    const url = new URL(request.url())
    if (url.host !== `${LOOPBACK}:${HUB_PORT}` || ['GET', 'HEAD', 'OPTIONS'].includes(request.method())) return
    if (declaredWrites.some(([method, pathname]) => method === request.method() && pathname === url.pathname)) scorePosts.push(url.pathname)
    else hubWrites.push(`${label}: ${request.method()} ${url.pathname}`)
  })
}

// The Skins standings table: { player: { skins, amount (cents) } }.
async function skinsStandings (page) {
  const rows = await section(page, 'Skins').locator('table').first().locator('tr')
    .evaluateAll(trs => trs.map(tr => [...tr.cells].map(c => c.innerText.trim())))
  const standings = {}
  for (const [player, skins, amount] of rows) {
    if (!/^\d+$/.test(skins || '') || player === 'Total') continue
    standings[player] = { skins: Number(skins), amount: money(amount) }
  }
  if (Object.keys(standings).length !== F1.players.length) throw new Error(`Skins table lists ${Object.keys(standings).length} players`)
  return standings
}

const results = { frames: [], marks: [] }
let failure = null
try {
  // Before (not filmed): the Skins standings as the round stands.
  const before = await context.newPage()
  watch(before, 'baseline')
  await before.goto(`${VUE_URL}/scorecards/${ids.f1Scorecard}/leaderboard`, { waitUntil: 'networkidle' })
  results.before = await skinsStandings(before)
  await before.close()

  const page = await context.newPage()
  watch(page, 'recording')
  await page.goto(`${VUE_URL}/scorecards/${ids.f1Scorecard}`, { waitUntil: 'networkidle' })
  if (new URL(page.url()).pathname.startsWith('/login')) throw new Error('redirected to login')
  // Opening frame: the Skins column, hole 9's tie (carryover) at the top and
  // the empty hole 10 below it.
  await showGameColumn(page, 'Net Skins', 'Skins')
  await scrollBelowHeader(holeRow(page, 9), 0)
  await holeRow(page, 9).getByText('2 Ties').waitFor()
  await page.evaluate(() => document.fonts.ready)

  // Lossless frames from the compositor at the device pixel size.
  const cdp = await context.newCDPSession(page)
  let started = null
  const writes = []
  cdp.on('Page.screencastFrame', frame => {
    const t = Date.now()
    started ??= t
    const file = `frame-${String(results.frames.length).padStart(5, '0')}.png`
    results.frames.push({ file, t: t - started })
    writes.push(fs.promises.writeFile(path.join(framesDir, file), Buffer.from(frame.data, 'base64')))
    cdp.send('Page.screencastFrameAck', { sessionId: frame.sessionId }).catch(() => {})
  })
  const mark = label => results.marks.push({ label, t: Date.now() - (started ?? Date.now()) })
  const hold = ms => page.waitForTimeout(ms)
  const tap = async (target, pause = 160) => {
    const box = await target.boundingBox()
    if (!box || box.y < 0 || box.y + box.height > VIEWPORT.height) throw new Error(`tap target is outside the viewport (${JSON.stringify(box)}, scrollY ${await page.evaluate(() => window.scrollY)})`)
    await page.evaluate(([x, y]) => window.__demo.tap(x, y), [box.x + box.width / 2, box.y + box.height / 2])
    await hold(pause) // the indicator shows before the app reacts
    await target.click()
  }
  // A short, eased scroll (never a jump), driven from here because the page
  // clock is fixed.
  // A short, eased scroll to window.scrollY `to` (never a jump), driven from
  // here because the page clock is fixed.
  const glideTo = async (to, ms = 600) => {
    const from = await page.evaluate(() => window.scrollY)
    const steps = Math.round(ms / 33)
    for (let i = 1; i <= steps; i++) {
      const p = i / steps
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      await page.evaluate(y => window.scrollTo(0, y), Math.round(from + (to - from) * eased))
      await hold(33)
    }
    if (Math.abs(await page.evaluate(() => window.scrollY) - to) > 1) throw new Error(`could not scroll to ${to}`)
  }

  await cdp.send('Page.startScreencast', { format: 'png', maxWidth: VIEWPORT.width * DEVICE_SCALE_FACTOR, maxHeight: VIEWPORT.height * DEVICE_SCALE_FACTOR, everyNthFrame: 1 })
  await page.evaluate(() => window.scrollBy(0, 0)) // first frame
  mark('Scorecard in progress (Net Skins, hole 9 tied)')
  await hold(900)
  await page.evaluate(() => window.__demo.callout('Enter scores', { bottom: 36 }))
  await hold(1900)
  await page.evaluate(() => window.__demo.hideCallout())
  await hold(300)

  mark(`Enter hole ${HOLE} scores`)
  const row = holeRow(page, HOLE)
  for (const [i, [key, score]] of ENTRIES.entries()) {
    await tap(row.locator('td.scorecard-score').nth(i))
    await page.getByText('Enter score', { exact: true }).waitFor()
    await page.locator('.picker-player', { hasText: new RegExp(`^${key}\\b`, 'i') }).waitFor()
    await hold(650)
    const saved = page.waitForResponse(r => new URL(r.url()).pathname === '/api/app/scores' && r.request().method() === 'POST')
    await tap(page.locator('.btn_numberpad', { hasText: new RegExp(`^\\s*${score}\\s*$`) }))
    if ((await saved).status() >= 300) throw new Error(`saving ${key}'s score failed`)
    await page.getByText('Enter score', { exact: true }).waitFor({ state: 'detached' })
    await hold(i === ENTRIES.length - 1 ? 250 : 550)
  }

  // Marker recalculates immediately: the hole 10 Skins cell and the totals.
  const skinsCell = row.locator('td').last()
  await skinsCell.getByText(/Smith/i).waitFor()
  const winnerText = (await skinsCell.innerText()).replace(/\s+/g, ' ').trim()
  if (!new RegExp(`Smith, B \\(${SKINS_WON}\\)`, 'i').test(winnerText)) throw new Error(`hole ${HOLE} Skins cell shows "${winnerText}"`)
  results.skinsCell = winnerText
  mark('Skins recalculated on the scorecard')
  await hold(500)
  await page.evaluate(() => window.__demo.callout('Side games update automatically', { bottom: 36 }))
  await hold(2600)
  await page.evaluate(() => window.__demo.hideCallout())
  await hold(300)

  mark('Open the leaderboard')
  await tap(page.locator('.right > .leaderboard'))
  await page.waitForURL(/\/leaderboard$/)
  await sectionTitle(page, 'Skins').waitFor()
  await page.evaluate(() => document.fonts.ready)
  // The fictional user is premium for the video, so Vue shows no banner.
  if (await page.getByText('Upgrade to Premium!').count()) throw new Error('the leaderboard shows the upgrade banner')
  await hold(1300)
  mark('Collapse Nassau to bring Skins up')
  await tap(sectionTitle(page, 'Nassau'))
  await section(page, 'Nassau').locator('.block').first().waitFor({ state: 'detached' })
  results.after = await skinsStandings(page)
  await hold(2700)
  mark('Skins game accounting: who pays whom')
  const skins = section(page, 'Skins')
  await tap(skins.getByText('Game accounting', { exact: true }))
  const whoPays = skins.getByText('Who pays whom.')
  await whoPays.waitFor()
  const settlement = await skins.locator('table.leaderboard-table')
    .filter({ has: page.locator('th', { hasText: /^\s*From\s*$/ }) }).first().locator('tr')
    .evaluateAll(trs => trs.slice(1).map(tr => [...tr.cells].map(c => c.innerText.trim())))
  results.settlement = settlement.map(([from, to, amount]) => ({ from, to, amount: money(amount) }))
  await hold(400)
  // Final framing: the whole Skins section (title, standings, settlement) sits
  // just above the sticky footer, which leaves the Wolf section below the
  // fold; the Skins title must stay below the header.
  const frame = await skins.evaluate((el, gap) => {
    const fixed = [...document.body.querySelectorAll('*')].filter(e => ['fixed', 'sticky'].includes(getComputedStyle(e).position))
      .map(e => e.getBoundingClientRect()).filter(r => r.height > 0)
    const footerTop = Math.min(innerHeight, ...fixed.filter(r => r.top > innerHeight / 2).map(r => r.top))
    const headerBottom = Math.max(0, ...fixed.filter(r => r.bottom < innerHeight / 2).map(r => r.bottom))
    const box = el.getBoundingClientRect()
    return { to: Math.round(scrollY + box.bottom - (footerTop - gap)), titleTop: box.top, shift: box.bottom - (footerTop - gap), headerBottom }
  }, 16)
  if (frame.titleTop - frame.shift < frame.headerBottom + 4) throw new Error('the Skins section does not fit between the header and the footer')
  await glideTo(frame.to)
  const hidden = await section(page, 'Wolf').evaluate(el => {
    const footer = [...document.body.querySelectorAll('*')].filter(e => ['fixed', 'sticky'].includes(getComputedStyle(e).position))
      .map(e => e.getBoundingClientRect()).filter(r => r.height > 0 && r.top > innerHeight / 2)
    return el.getBoundingClientRect().top >= Math.min(innerHeight, ...footer.map(r => r.top))
  })
  if (!hidden) throw new Error('the Wolf section is visible in the final frame')
  await hold(400)
  // The callout sits on the empty right of the Skins heading, directly above
  // the card it refers to and aligned with its right edge (the gap beside
  // "Who pays whom." is too low for it). It may not touch any text, control
  // or the card.
  const card = await whoPays.locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " block ")][1]').boundingBox()
  const heading = await sectionTitle(page, 'Skins').boundingBox()
  const size = await page.evaluate(text => window.__demo.measureCallout(text), 'See who owes whom')
  const place = { left: Math.round(card.x + card.width - size.width), top: Math.round(heading.y + heading.height / 2 - size.height / 2) }
  const covered = await page.evaluate(({ rect, card }) => {
    const pad = 4
    const r = { left: rect.left - pad, top: rect.top - pad, right: rect.left + rect.width + pad, bottom: rect.top + rect.height + pad }
    const meets = b => b.width > 0 && b.height > 0 && b.left < r.right && b.right > r.left && b.top < r.bottom && b.bottom > r.top
    const hits = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim()) continue
      const range = document.createRange()
      range.selectNodeContents(node)
      if ([...range.getClientRects()].some(meets)) hits.push(`"${node.textContent.trim().slice(0, 30)}"`)
    }
    for (const el of document.body.querySelectorAll('button, a, input, select, label, [role="button"], .clickable, th, td')) {
      if (meets(el.getBoundingClientRect())) hits.push(`<${el.tagName.toLowerCase()}>`)
    }
    if (r.bottom > card.y || rect.left + rect.width > card.x + card.width + 1) hits.push('the Skins card')
    return hits
  }, { rect: { ...place, ...size }, card })
  if (covered.length) throw new Error(`the final callout ${JSON.stringify({ ...place, ...size })} would cover ${[...new Set(covered)].join(', ')} (card ${JSON.stringify(card)})`)
  results.finalCallout = { ...place, ...size }
  await page.evaluate(place => window.__demo.callout('See who owes whom', place), place)
  await hold(3600)
  mark('End')
  await cdp.send('Page.stopScreencast')
  results.end = Date.now() - started
  await Promise.all(writes)

  // After (not filmed): every game's accounting still reconciles.
  await page.reload({ waitUntil: 'networkidle' })
  await assertSideGamesReconcile(page)
  await page.close()
} catch (error) {
  failure = error
  const pages = context.pages()
  if (pages.length) {
    fs.mkdirSync(DEBUG_DIR, { recursive: true })
    await pages[0].screenshot({ path: path.join(DEBUG_DIR, `${NAME}.png`) }).catch(() => {})
    fs.writeFileSync(path.join(DEBUG_DIR, `${NAME}.txt`), await pages[0].locator('body').innerText().catch(() => ''))
  }
} finally {
  await context.close()
  await browser.close()
}

// Verdict ------------------------------------------------------------------
log(`fonts served locally: ${report.fulfilled}; expected blocked: ${[...new Set(report.expectedBlocked)].join(', ') || 'none'}`)
const problems = []
if (failure) problems.push(`recording failed: ${redact(failure.message.split('\n')[0])} (debug output in ${DEBUG_DIR})`)
if (report.unexpected.length) problems.push(`unexpected network activity:\n  ${[...new Set(report.unexpected)].join('\n  ')}`)
if (pageErrors.length) problems.push(`page errors:\n  ${pageErrors.join('\n  ')}`)
if (hubWrites.length) problems.push(`Hub writes outside the declared score entries:\n  ${hubWrites.join('\n  ')}`)
if (consoleErrors.length) problems.push(`console errors outside the allowlist:\n  ${consoleErrors.join('\n  ')}`)
if (!failure && scorePosts.length !== ENTRIES.length) problems.push(`${scorePosts.length} score writes, expected ${ENTRIES.length}`)

if (!problems.length) {
  // The Skins change must be exactly what the entered scores imply: the
  // winner gains the carried skins, nobody else changes, and every amount is
  // the per-skin stake times (skins x players - total skins).
  const players = Object.keys(results.before)
  const total = standings => Object.values(standings).reduce((sum, s) => sum + s.skins, 0)
  for (const player of players) {
    const gained = results.after[player].skins - results.before[player].skins
    if (gained !== (player === SKINS_WINNER ? SKINS_WON : 0)) problems.push(`${player} gained ${gained} skins`)
  }
  for (const standings of [results.before, results.after]) {
    const sum = Object.values(standings).reduce((s, v) => s + v.amount, 0)
    if (sum !== 0) problems.push(`Skins amounts sum to ${sum}c`)
    for (const [player, s] of Object.entries(standings)) {
      if (s.amount !== SKIN_AMOUNT * 100 * (s.skins * players.length - total(standings))) problems.push(`${player}'s Skins amount ${s.amount}c does not follow from the skins`)
    }
  }
  const nets = {}
  for (const { from, to, amount } of results.settlement) {
    nets[from] = (nets[from] || 0) - amount
    nets[to] = (nets[to] || 0) + amount
  }
  for (const player of players) if ((nets[player] || 0) !== results.after[player].amount) problems.push(`Skins settlement for ${player} does not match the standings`)

  const dims = await sharp(path.join(framesDir, results.frames[0].file)).metadata()
  if (dims.width !== VIEWPORT.width * DEVICE_SCALE_FACTOR || dims.height !== VIEWPORT.height * DEVICE_SCALE_FACTOR) problems.push(`frames are ${dims.width}x${dims.height}`)
  if (results.end / 1000 < DURATION_LIMITS[0] || results.end / 1000 > DURATION_LIMITS[1]) problems.push(`recording is ${results.end / 1000}s`)
}
if (problems.length) {
  process.stderr.write(`[screens] video rejected:\n${problems.map(p => `  - ${p}`).join('\n')}\n`)
  process.exit(1)
}
fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2))
const fmt = standings => Object.entries(standings).map(([p, s]) => `${p} ${s.skins} (${s.amount < 0 ? '-' : ''}$${Math.abs(s.amount / 100)})`).join(', ')
log(`network policy held; ${ENTRIES.length} declared score writes only; side-game accounting reconciles`)
log(`Skins before: ${fmt(results.before)}`)
log(`Skins after:  ${fmt(results.after)}`)
log(`recorded ${results.frames.length} frames over ${(results.end / 1000).toFixed(2)}s`)
process.exit(0)

// Encoding (outer process, after the restore) --------------------------------
async function encode (results) {
  const sharp = createRequire(import.meta.url)('sharp')
  fs.mkdirSync(VIDEO_REVIEW_DIR, { recursive: true })
  const out = name => path.join(VIDEO_REVIEW_DIR, name)
  // ffmpeg and ffprobe run in a sandbox that permits no network at all
  // (the only allowed port is the dead USGA port).
  const tool = (bin, args) => {
    const [cmd, argv] = sandboxArgs([USGA_DEAD_PORT], bin, args)
    const result = spawnSync(cmd, argv, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: { PATH: '/usr/bin:/bin' } })
    if (result.status !== 0) throw new Error(`${path.basename(bin)} failed: ${(result.stderr || '').split('\n').filter(Boolean).slice(-3).join(' | ')}`)
    return result.stdout
  }

  // Variable-rate screencast frames -> constant 30 fps lossless intermediate.
  const list = ['ffconcat version 1.0']
  results.frames.forEach((frame, i) => {
    const next = i + 1 < results.frames.length ? results.frames[i + 1].t : results.end
    list.push(`file '${path.join(framesDir, frame.file)}'`, `duration ${((next - frame.t) / 1000).toFixed(4)}`)
  })
  list.push(`file '${path.join(framesDir, results.frames.at(-1).file)}'`)
  const concat = path.join(VIDEO_STAGING_DIR, 'frames.ffconcat')
  fs.writeFileSync(concat, list.join('\n') + '\n')
  const intermediate = out(`${OUTPUT}-intermediate.mkv`)
  const clean = ['-map_metadata', '-1', '-map_metadata:s:v', '-1', '-fflags', '+bitexact', '-flags:v', '+bitexact', '-an', '-sn', '-dn']
  tool(FFMPEG, ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', concat,
    '-vf', `fps=${VIDEO_FPS}`, '-c:v', 'ffv1', '-level', '3', '-pix_fmt', 'bgr0', ...clean, intermediate])

  const color = ['-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv']
  const gop = ['-g', String(VIDEO_FPS * 2)]
  // SEI units (x264's settings banner) are removed with the other metadata.
  // Encoding stamps an "encoder" tag on the stream; a stream-copy remux with
  // all metadata dropped writes the final files without it.
  const encoded = name => path.join(VIDEO_STAGING_DIR, `encoded-${name}`)
  tool(FFMPEG, ['-y', '-v', 'error', '-i', intermediate, ...color, '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '21', '-profile:v', 'high', '-level:v', '4.0',
    ...gop, '-bsf:v', 'filter_units=remove_types=6', ...clean, encoded(`${OUTPUT}.mp4`)])
  tool(FFMPEG, ['-y', '-v', 'error', '-i', intermediate, ...color, '-c:v', 'libvpx-vp9', '-crf', '33', '-b:v', '0', '-deadline', 'good', '-cpu-used', '1', '-row-mt', '1',
    ...gop, ...clean, encoded(`${OUTPUT}.webm`)])
  tool(FFMPEG, ['-y', '-v', 'error', '-i', encoded(`${OUTPUT}.mp4`), '-c', 'copy', '-movflags', '+faststart', ...clean, out(`${OUTPUT}.mp4`)])
  tool(FFMPEG, ['-y', '-v', 'error', '-i', encoded(`${OUTPUT}.webm`), '-c', 'copy', ...clean, out(`${OUTPUT}.webm`)])
  // Poster: the final frame (updated Skins settlement), metadata-free JPEG.
  await sharp(path.join(framesDir, results.frames.at(-1).file)).jpeg({ quality: 84, mozjpeg: true }).toFile(out(`${OUTPUT}-poster.jpg`))

  // Verify every output: dimensions, codec, no audio, duration, decodes to
  // the end with the expected frame count, no container metadata tags.
  const expected = [VIEWPORT.width * DEVICE_SCALE_FACTOR, VIEWPORT.height * DEVICE_SCALE_FACTOR]
  const summary = []
  for (const [file, codec] of [[`${OUTPUT}.mp4`, 'h264'], [`${OUTPUT}.webm`, 'vp9']]) {
    const probe = JSON.parse(tool(FFPROBE, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', out(file)]))
    const video = probe.streams.filter(s => s.codec_type === 'video')
    const problems = []
    if (probe.streams.length !== 1 || video.length !== 1) problems.push(`${probe.streams.length} streams (audio or extra tracks?)`)
    const [v] = video
    if (v.codec_name !== codec) problems.push(`codec ${v.codec_name}`)
    if (v.width !== expected[0] || v.height !== expected[1]) problems.push(`${v.width}x${v.height}`)
    if (v.pix_fmt !== 'yuv420p') problems.push(`pixel format ${v.pix_fmt}`)
    const duration = Number(probe.format.duration)
    if (!(duration >= DURATION_LIMITS[0] && duration <= DURATION_LIMITS[1])) problems.push(`duration ${duration}s`)
    // Allowed: MP4 brand fields, and WebM's mandatory muxing/writing app,
    // which bitexact reduces to the bare "Lavf" (no version).
    const tags = Object.entries(probe.format.tags || {})
      .filter(([t, value]) => !['major_brand', 'minor_version', 'compatible_brands'].includes(t) && !(codec === 'vp9' && t === 'encoder' && value === 'Lavf'))
      .map(([t]) => t)
    const streamTags = Object.keys(v.tags || {}).filter(t => !['language', 'handler_name', 'vendor_id', 'DURATION'].includes(t))
    if (tags.length || streamTags.length) problems.push(`metadata tags: ${[...tags, ...streamTags].join(', ')}`)
    const decoded = tool(FFPROBE, ['-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', out(file)]).trim()
    tool(FFMPEG, ['-v', 'error', '-xerror', '-i', out(file), '-f', 'null', '-'])
    if (Math.abs(Number(decoded) - Math.round(duration * VIDEO_FPS)) > 1) problems.push(`decoded ${decoded} frames for ${duration}s`)
    if (problems.length) throw new Error(`${file} rejected: ${problems.join('; ')}`)
    summary.push(`${file}: ${v.codec_name} ${v.profile || ''} ${v.width}x${v.height} ${v.r_frame_rate} fps, ${duration.toFixed(2)}s, ${decoded} frames, no audio, ${(fs.statSync(out(file)).size / 1024).toFixed(0)} KB`)
  }
  const poster = await sharp(out(`${OUTPUT}-poster.jpg`)).metadata()
  if (poster.width !== expected[0] || poster.height !== expected[1] || poster.exif || poster.icc || poster.xmp || poster.iptc) throw new Error('poster has unexpected dimensions or metadata')
  summary.push(`${OUTPUT}-poster.jpg: JPEG ${poster.width}x${poster.height}, no EXIF/ICC/XMP, ${(fs.statSync(out(`${OUTPUT}-poster.jpg`)).size / 1024).toFixed(0)} KB`)
  fs.writeFileSync(out(`${OUTPUT}-shots.json`), JSON.stringify({ version: VERSION, marks: results.marks, end: results.end, finalCallout: results.finalCallout, skins: { before: results.before, after: results.after, settlement: results.settlement, cell: results.skinsCell } }, null, 2))
  for (const line of summary) log(line)
  log(`review files written to ${VIDEO_REVIEW_DIR}`)
}
