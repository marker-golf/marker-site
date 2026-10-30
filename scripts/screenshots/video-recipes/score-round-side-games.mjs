// Recipe: "Score a round with side games" (the homepage scoring demo, v2).
//
// F1, Shinnecock, scored through 9 with hole 9 tied for Net Skins. Hole 10
// (par 4, stroke index 2; every player but Edward gets a stroke) is scored:
// Allan 5, Bert 5, Edward 4, Bob 3. Bob's birdie (net 2) beats three net 4s
// and wins the two carried skins; the scorecard, the Skins standings and the
// Skins settlement update. Order is the scorecard's column order.

import fs from 'node:fs'
import path from 'node:path'
import { SCRIPTS_DIR, VUE_URL } from '../lib/config.mjs'
import {
  showGameColumn, scrollBelowHeader, section, sectionTitle, holeRow, money, assertSideGamesReconcile
} from '../proof-set.mjs'

const F1 = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'fixtures', 'shinnecock-f1.json'), 'utf8'))
const HOLE = 10
const ENTRIES = [['allan', 5], ['bert', 5], ['edward', 4], ['bob', 3]]
const SKINS_WINNER = 'Bob Smith'
const SKINS_WON = 2
const SKIN_AMOUNT = F1.games.find(g => g.game === 'Skins').amount
// Review output version (v1: first proof of concept; v2: premium user, so no
// upgrade banner, and the final frame framed on the Skins settlement).
const VERSION = 'v2'

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

export default {
  name: 'score-round-side-games',
  output: `score-round-side-games-${VERSION}`,
  reviewDir: 'video-poc',
  shotsFile: `score-round-side-games-${VERSION}-shots.json`,
  durationLimits: [20, 30],
  entries: ENTRIES.length,

  restore: ids => ({ hole: HOLE, scores: Object.fromEntries(ENTRIES.map(([key, score]) => [ids.f1Players[key], score])) }),

  // Before (not filmed): the Skins standings as the round stands.
  async baseline (page, { ids, results }) {
    await page.goto(`${VUE_URL}/scorecards/${ids.f1Scorecard}/leaderboard`, { waitUntil: 'networkidle' })
    results.before = await skinsStandings(page)
  },

  // Opening frame: the Skins column, hole 9's tie (carryover) at the top and
  // the empty hole 10 below it.
  async setup (page, { ids }) {
    await page.goto(`${VUE_URL}/scorecards/${ids.f1Scorecard}`, { waitUntil: 'networkidle' })
    await showGameColumn(page, 'Net Skins', 'Skins')
    await scrollBelowHeader(holeRow(page, 9), 0)
    await holeRow(page, 9).getByText('2 Ties').waitFor()
  },

  async record ({ page, results, mark, hold, tap, glideTo, calloutHits }) {
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
    // "Who pays whom." is too low for it). It may not touch any text, control,
    // table cell or the card.
    const card = await whoPays.locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " block ")][1]').boundingBox()
    const heading = await sectionTitle(page, 'Skins').boundingBox()
    const size = await page.evaluate(text => window.__demo.measureCallout(text), 'See who owes whom')
    const place = { left: Math.round(card.x + card.width - size.width), top: Math.round(heading.y + heading.height / 2 - size.height / 2) }
    const rect = { ...place, ...size }
    const covered = await calloutHits(rect, { cells: true })
    if (rect.top + rect.height + 4 > card.y || rect.left + rect.width > card.x + card.width + 1) covered.push('the Skins card')
    if (covered.length) throw new Error(`the final callout ${JSON.stringify(rect)} would cover ${[...new Set(covered)].join(', ')} (card ${JSON.stringify(card)})`)
    results.finalCallout = rect
    await page.evaluate(place => window.__demo.callout('See who owes whom', place), place)
    await hold(3600)
  },

  // After (not filmed): every game's accounting still reconciles.
  async afterwards (page) {
    await page.reload({ waitUntil: 'networkidle' })
    await assertSideGamesReconcile(page)
  },

  // The Skins change must be exactly what the entered scores imply: the
  // winner gains the carried skins, nobody else changes, and every amount is
  // the per-skin stake times (skins x players - total skins).
  verify (results) {
    const problems = []
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
    return problems
  },

  report (results) {
    const fmt = standings => Object.entries(standings).map(([p, s]) => `${p} ${s.skins} (${s.amount < 0 ? '-' : ''}$${Math.abs(s.amount / 100)})`).join(', ')
    return ['side-game accounting reconciles', `Skins before: ${fmt(results.before)}`, `Skins after:  ${fmt(results.after)}`]
  },

  shots: results => ({ version: VERSION, marks: results.marks, end: results.end, finalCallout: results.finalCallout, skins: { before: results.before, after: results.after, settlement: results.settlement, cell: results.skinsCell } })
}
