// Records a demo video from the isolated Vue app with a named recipe
// (video-recipes/<name>.mjs), then restores the fixture data it changed:
//
//   1. claim the fixture state (refuses stale or already-captured data) and
//      make the fictional user premium (fixtures/video-premium.json), so no
//      screen shows the upgrade banner;
//   2. re-run itself inside the "browser" network sandbox (Hub and Vue
//      loopback ports only) with the same network policy, local fonts, fixed
//      browser clock and console/page-error checks as capture.mjs;
//   3. record the recipe's story as lossless PNG frames (Chrome DevTools
//      screencast at 780x1688), with a touch indicator and short callouts
//      drawn in an overlay outside the app's own DOM;
//   4. after recording (not filmed) run the recipe's checks: accounting
//      reconciles and the result changed exactly as the entered scores imply;
//   5. back outside the sandbox: require that the only data changed is the
//      video subscription and the recipe's declared score rows, delete them,
//      and require every fixture digest (including premium state) and
//      audited row to match the fixtures-ready snapshot again (lib/state.mjs);
//   6. encode, with ffmpeg in a no-network sandbox: an FFV1 intermediate, an
//      H.264 MP4, a VP9 WebM (no audio, no metadata) and a JPEG poster, into
//      the recipe's review folder outside the site. Existing review files are
//      never overwritten (a rerun-<id> subfolder is used instead) unless
//      --replace is given. Nothing is written into the site.
//
// The only Hub writes allowed are the recipe's POST /api/app/scores; any
// other write fails the run.
//
// Usage: node video.mjs [--recipe=<name>] [--replace] [--encode-only]
// The default recipe is the homepage scoring demo (score-round-side-games).
// (--encode-only re-encodes the last recording that passed every check,
// without opening the browser or touching data.)

import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { log, redact } from './lib/proc.mjs'
import { sandboxArgs } from './lib/sandbox.mjs'
import { claimForCapture, addVideoPremium, captureRows, restoreAfterVideo } from './lib/state.mjs'
import { createReport, installNetworkPolicy } from './lib/browser-policy.mjs'
import { fontFulfillers } from './lib/local-fonts.mjs'
import { reviewOutputDir } from './lib/video-output.mjs'
import {
  VUE_URL, AUTH_STATE, FIXTURE_IDS, VIEWPORT, DEVICE_SCALE_FACTOR, BROWSER_LOCALE, BROWSER_TIMEZONE,
  BROWSER_FIXED_TIME, BROWSER_ALLOWED_HOSTS, EXPECTED_BLOCKED_REQUESTS, ALLOWED_CONSOLE_ERRORS,
  DEBUG_DIR, USGA_DEAD_PORT, LOOPBACK, HUB_PORT, SCRIPTS_DIR,
  VIDEO_STAGING_DIR, VIDEO_REVIEW_ROOT, FFMPEG, FFPROBE, VIDEO_FPS
} from './lib/config.mjs'

const RECIPES = ['score-round-side-games', 'run-multi-group-event', 'complete-event-settle-up']
const option = name => process.argv.find(arg => arg.startsWith(`--${name}=`))?.slice(name.length + 3)
const recipeName = option('recipe') ?? RECIPES[0]
if (!RECIPES.includes(recipeName)) throw new Error(`Unknown recipe ${recipeName} (known: ${RECIPES.join(', ')})`)
const recipe = (await import(`./video-recipes/${recipeName}.mjs`)).default

const PREMIUM = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'fixtures', 'video-premium.json'), 'utf8'))
const ids = JSON.parse(fs.readFileSync(FIXTURE_IDS, 'utf8'))
// The Hub writes a recipe may send (each counted against recipe.entries);
// by default, score entries.
const declaredWrites = recipe.writes ? recipe.writes(ids) : [['POST', '/api/app/scores']]
const resultsFile = path.join(VIDEO_STAGING_DIR, 'results.json')
const framesDir = path.join(VIDEO_STAGING_DIR, 'frames')

// Outer process --------------------------------------------------------------
if (process.argv.includes('--encode-only')) {
  if (!fs.existsSync(resultsFile)) throw new Error('No verified recording to encode; run node video.mjs first')
  const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'))
  if (results.recipe !== recipe.name) throw new Error(`The last recording is ${results.recipe}; pass --recipe=${results.recipe}`)
  await encode(results)
  process.exit(0)
}
if (process.env.SCREENS_SANDBOX !== 'browser') {
  claimForCapture()
  fs.rmSync(VIDEO_STAGING_DIR, { recursive: true, force: true })
  // The recipe's declared score rows and the rows it may change in place;
  // the latter are captured in full now so the restore can put them back.
  const restore = recipe.restore(ids)
  const captured = captureRows(restore.rows)
  let result = { status: 1 }
  try {
    addVideoPremium(PREMIUM, ids.bobUserId)
    log('fictional user is premium for the recording (one active video subscription)')
    const [bin, args] = sandboxArgs('browser', process.execPath, process.argv.slice(1))
    result = spawnSync(bin, args, {
      stdio: 'inherit',
      env: { HOME: process.env.HOME, PATH: '/usr/bin:/bin', LANG: 'en_US.UTF-8', SCREENS_SANDBOX: 'browser' }
    })
    // Checks that need the database as the recording left it (for example a
    // completed event's stored results), before the restore undoes it.
    if (result.status === 0 && recipe.verifyStored) {
      for (const line of recipe.verifyStored(ids, JSON.parse(fs.readFileSync(resultsFile, 'utf8')))) log(line)
    }
  } finally {
    // Restore the fixture data whether or not the recording succeeded; a
    // recording that changed anything else is refused here.
    const restored = restoreAfterVideo(ids, { ...restore, rows: captured, premium: PREMIUM })
    log(`fixture data restored: video subscription removed, ${restored.scores} score row(s) removed, ${restored.rows} changed row(s) written back; every fixture digest (including premium state) and audited row matches the fixtures-ready snapshot`)
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

// Helpers recipes use while recording. All movement is driven from here,
// because the page clock is fixed.
function stageFor (page, results, frameClock) {
  const mark = label => results.marks.push({ label, t: Date.now() - (frameClock.started ?? Date.now()) })
  const hold = ms => page.waitForTimeout(ms)
  const tap = async (target, pause = 160) => {
    const box = await target.boundingBox()
    if (!box || box.y < 0 || box.y + box.height > VIEWPORT.height) throw new Error(`tap target is outside the viewport (${JSON.stringify(box)}, scrollY ${await page.evaluate(() => window.scrollY)})`)
    await page.evaluate(([x, y]) => window.__demo.tap(x, y), [box.x + box.width / 2, box.y + box.height / 2])
    await hold(pause) // the indicator shows before the app reacts
    await target.click()
  }
  const ease = p => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
  // A short, eased scroll to window.scrollY `to` (never a jump).
  const glideTo = async (to, ms = 600) => {
    const from = await page.evaluate(() => window.scrollY)
    const steps = Math.round(ms / 33)
    for (let i = 1; i <= steps; i++) {
      await page.evaluate(y => window.scrollTo(0, y), Math.round(from + (to - from) * ease(i / steps)))
      await hold(33)
    }
    if (Math.abs(await page.evaluate(() => window.scrollY) - to) > 1) throw new Error(`could not scroll to ${to}`)
  }
  // The window.scrollY that puts `target` just below the fixed or sticky
  // header (the same rule as scrollBelowHeader, without jumping there).
  const scrollTargetBelowHeader = (target, gap = 12) => target.evaluate((el, gap) => {
    const covering = [...document.querySelectorAll('*')].filter(e => {
      const style = getComputedStyle(e)
      return ['fixed', 'sticky'].includes(style.position) && parseFloat(style.top) < 300 && e.getBoundingClientRect().height > 0
    }).map(e => parseFloat(getComputedStyle(e).top) + e.getBoundingClientRect().height)
    return Math.round(el.getBoundingClientRect().top + window.scrollY - Math.max(0, ...covering) - gap)
  }, gap)
  // An eased horizontal scroll of the nearest scrollable ancestor (a tab bar)
  // until `target` is fully in view.
  const revealHorizontally = async (target, ms = 500) => {
    const shift = await target.evaluate(el => {
      let box = el.parentElement
      while (box && !(box.scrollWidth > box.clientWidth + 1 && ['auto', 'scroll'].includes(getComputedStyle(box).overflowX))) box = box.parentElement
      if (!box) return null
      const r = el.getBoundingClientRect()
      const b = box.getBoundingClientRect()
      const by = r.right > b.right - 8 ? r.right - (b.right - 8) : r.left < b.left + 8 ? r.left - (b.left + 8) : 0
      return { from: box.scrollLeft, to: Math.round(box.scrollLeft + by) }
    })
    if (!shift || shift.from === shift.to) return
    const steps = Math.round(ms / 33)
    for (let i = 1; i <= steps; i++) {
      await target.evaluate((el, x) => {
        let box = el.parentElement
        while (box && !(box.scrollWidth > box.clientWidth + 1 && ['auto', 'scroll'].includes(getComputedStyle(box).overflowX))) box = box.parentElement
        box.scrollLeft = x
      }, Math.round(shift.from + (shift.to - shift.from) * ease(i / steps)))
      await hold(33)
    }
  }
  // Top of the sticky footer and bottom of the fixed header, in the viewport.
  const fixedBounds = () => page.evaluate(() => {
    const fixed = [...document.body.querySelectorAll('*')].filter(e => ['fixed', 'sticky'].includes(getComputedStyle(e).position))
      .map(e => e.getBoundingClientRect()).filter(r => r.height > 0)
    return {
      footerTop: Math.min(innerHeight, ...fixed.filter(r => r.top > innerHeight / 2).map(r => r.top)),
      headerBottom: Math.max(0, ...fixed.filter(r => r.bottom < innerHeight / 2).map(r => r.bottom))
    }
  })
  // Everything a callout at `rect` would cover: text and controls (and table
  // cells when `cells`), with a 4 px margin. `ignore` lists exact texts a
  // recipe may cover (an empty-hole placeholder, never a value).
  const calloutHits = (rect, { cells = false, ignore = [] } = {}) => page.evaluate(({ rect, cells, ignore }) => {
    const pad = 4
    const r = { left: rect.left - pad, top: rect.top - pad, right: rect.left + rect.width + pad, bottom: rect.top + rect.height + pad }
    const meets = b => b.width > 0 && b.height > 0 && b.left < r.right && b.right > r.left && b.top < r.bottom && b.bottom > r.top
    const hits = []
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent.trim() || ignore.includes(node.textContent.trim())) continue
      const range = document.createRange()
      range.selectNodeContents(node)
      if ([...range.getClientRects()].some(meets)) hits.push(`"${node.textContent.trim().slice(0, 30)}"`)
    }
    for (const el of document.body.querySelectorAll(`button, a, input, select, label, [role="button"], .clickable${cells ? ', th, td' : ''}`)) {
      if (meets(el.getBoundingClientRect())) hits.push(`<${el.tagName.toLowerCase()}>`)
    }
    return hits
  }, { rect, cells, ignore })
  // The first place inside the regions (viewport rectangles, in order of
  // preference) where the callout touches no text or control, scanning down
  // in 2 px steps with the given horizontal alignment.
  const findCalloutSpot = async (text, regions, { align = 'center', cells = false, ignore = [] } = {}) => {
    const size = await page.evaluate(text => window.__demo.measureCallout(text), text)
    for (const region of regions) {
      if (region.right - region.left < size.width) continue
      const left = Math.round(align === 'right' ? region.right - size.width : align === 'left' ? region.left : (region.left + region.right - size.width) / 2)
      for (let top = Math.round(region.top); top + size.height <= region.bottom; top += 2) {
        const rect = { left, top, ...size }
        if (!(await calloutHits(rect, { cells, ignore })).length) return rect
      }
    }
    throw new Error(`no free place for the "${text}" callout (${size.width.toFixed(0)}x${size.height.toFixed(0)}) in ${JSON.stringify(regions)}`)
  }
  // The named boxes (viewport rectangles), the fixed header and footer and
  // the viewport edges a callout at `rect` would come within `margin` px of,
  // plus any text or control it would cover (table cells too when `cells`).
  const calloutClear = async (rect, avoid = [], { margin = 8, cells = false } = {}) => {
    const { headerBottom, footerTop } = await fixedBounds()
    const touches = box => box.width > 0 && box.height > 0 && rect.left - margin < box.x + box.width && rect.left + rect.width + margin > box.x &&
      rect.top - margin < box.y + box.height && rect.top + rect.height + margin > box.y
    const hits = avoid.filter(([, box]) => box && touches(box)).map(([name]) => name)
    if (rect.top < headerBottom + margin) hits.push('the fixed header')
    if (rect.top + rect.height > footerTop - margin) hits.push('the footer')
    if (rect.left < margin || rect.left + rect.width > VIEWPORT.width - margin || rect.top + rect.height > VIEWPORT.height - margin) hits.push('the viewport edges')
    hits.push(...await calloutHits(rect, { cells }))
    return [...new Set(hits)]
  }
  const callout = (text, place) => page.evaluate(([text, place]) => window.__demo.callout(text, place), [text, place])
  const hideCallout = () => page.evaluate(() => window.__demo.hideCallout())
  return { page, ids, results, mark, hold, tap, glideTo, scrollTargetBelowHeader, revealHorizontally, fixedBounds, calloutHits, calloutClear, findCalloutSpot, callout, hideCallout }
}

const results = { recipe: recipe.name, frames: [], marks: [] }
const ctx = { ids, results }
let failure = null
try {
  // Before (not filmed).
  const before = await context.newPage()
  watch(before, 'baseline')
  await recipe.baseline(before, ctx)
  await before.close()

  const page = await context.newPage()
  watch(page, 'recording')
  await recipe.setup(page, ctx)
  if (new URL(page.url()).pathname.startsWith('/login')) throw new Error('redirected to login')
  await page.evaluate(() => document.fonts.ready)

  // Lossless frames from the compositor at the device pixel size.
  const cdp = await context.newCDPSession(page)
  const frameClock = { started: null }
  const writes = []
  cdp.on('Page.screencastFrame', frame => {
    const t = Date.now()
    frameClock.started ??= t
    const file = `frame-${String(results.frames.length).padStart(5, '0')}.png`
    results.frames.push({ file, t: t - frameClock.started })
    writes.push(fs.promises.writeFile(path.join(framesDir, file), Buffer.from(frame.data, 'base64')))
    cdp.send('Page.screencastFrameAck', { sessionId: frame.sessionId }).catch(() => {})
  })
  const stage = stageFor(page, results, frameClock)
  await cdp.send('Page.startScreencast', { format: 'png', maxWidth: VIEWPORT.width * DEVICE_SCALE_FACTOR, maxHeight: VIEWPORT.height * DEVICE_SCALE_FACTOR, everyNthFrame: 1 })
  await recipe.record(stage)
  stage.mark('End')
  await cdp.send('Page.stopScreencast')
  results.end = Date.now() - frameClock.started
  await Promise.all(writes)

  // After (not filmed).
  await recipe.afterwards(page, ctx)
  await page.close()
} catch (error) {
  failure = error
  const pages = context.pages()
  if (pages.length) {
    fs.mkdirSync(DEBUG_DIR, { recursive: true })
    await pages[0].screenshot({ path: path.join(DEBUG_DIR, `${recipe.name}.png`) }).catch(() => {})
    fs.writeFileSync(path.join(DEBUG_DIR, `${recipe.name}.txt`), await pages[0].locator('body').innerText().catch(() => ''))
    fs.writeFileSync(path.join(DEBUG_DIR, `${recipe.name}.error.txt`), redact(String(error.stack || error.message)))
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
if (hubWrites.length) problems.push(`Hub writes outside the declared writes:\n  ${hubWrites.join('\n  ')}`)
if (consoleErrors.length) problems.push(`console errors outside the allowlist:\n  ${consoleErrors.join('\n  ')}`)
if (!failure && scorePosts.length !== recipe.entries) problems.push(`${scorePosts.length} declared writes, expected ${recipe.entries}`)

if (!problems.length) {
  problems.push(...recipe.verify(results))
  const dims = await sharp(path.join(framesDir, results.frames[0].file)).metadata()
  if (dims.width !== VIEWPORT.width * DEVICE_SCALE_FACTOR || dims.height !== VIEWPORT.height * DEVICE_SCALE_FACTOR) problems.push(`frames are ${dims.width}x${dims.height}`)
  const [min, max] = recipe.durationLimits
  if (results.end / 1000 < min || results.end / 1000 > max) problems.push(`recording is ${results.end / 1000}s`)
}
if (problems.length) {
  process.stderr.write(`[screens] video rejected:\n${problems.map(p => `  - ${p}`).join('\n')}\n`)
  process.exit(1)
}
fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2))
const [summary, ...details] = recipe.report(results)
log(`network policy held; ${recipe.entries} declared write(s) only (${declaredWrites.map(([m, p]) => `${m} ${p}`).join(', ')}); ${summary}`)
for (const line of details) log(line)
log(`recorded ${results.frames.length} frames over ${(results.end / 1000).toFixed(2)}s`)
process.exit(0)

// Encoding (outer process, after the restore) --------------------------------
async function encode (results) {
  const sharp = createRequire(import.meta.url)('sharp')
  const OUTPUT = recipe.output
  const outputs = [`${OUTPUT}.mp4`, `${OUTPUT}.webm`, `${OUTPUT}-poster.jpg`, `${OUTPUT}-intermediate.mkv`, recipe.shotsFile]
  const runId = new Date().toISOString().replace(/[:.]/g, '-')
  const reviewDir = reviewOutputDir(path.join(VIDEO_REVIEW_ROOT, recipe.reviewDir), outputs, { replace: process.argv.includes('--replace'), runId })
  fs.mkdirSync(reviewDir, { recursive: true })
  const out = name => path.join(reviewDir, name)
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
  // Poster: the final frame, metadata-free JPEG.
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
    const [min, max] = recipe.durationLimits
    if (!(duration >= min && duration <= max)) problems.push(`duration ${duration}s`)
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
  fs.writeFileSync(out(recipe.shotsFile), JSON.stringify(recipe.shots(results), null, 2))
  for (const line of summary) log(line)
  log(`review files written to ${reviewDir}`)
}
