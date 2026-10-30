// Recipe: "Complete the event and settle up".
//
// F7, Chambers Bay Cup: twelve players in three groups (08:00-08:20), every
// scorecard scored through 18, published and not yet completed; three $10
// buy-in games (net Skins, net Stroke Play paying $60/$40/$20, Team Stroke
// Play with groups as teams, winner takes the pot). The commissioner taps
// Complete event, reads Vue's confirmation, confirms, sees the event locked
// ("This round is complete."), opens the leaderboard, collapses the games
// and finishes on Overall - event. v2 then unticks "Buy-ins collected" (a
// display-only checkbox; any request while toggling fails the run) so the
// final table is the player-to-player settlement: who owes whom.
//
// The only Hub write is the PUT that completes the event. It locks the event
// and its group scorecards and stores each game's final summary; those rows
// are captured before the recording and written back afterwards.

import fs from 'node:fs'
import path from 'node:path'
import { SCRIPTS_DIR, VUE_URL } from '../lib/config.mjs'
import { screensSql } from '../lib/guards.mjs'
import { fixtureDigests, finalizedEventPositions } from '../lib/state.mjs'
import { section, sectionTitle, money, assertEventAccountingReconciles } from '../proof-set.mjs'

const F7 = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'fixtures', 'completed-event-f7.json'), 'utf8'))
const PLAYERS = F7.groups.reduce((n, g) => n + g.players.length, 0)
const BUY_IN = F7.games.reduce((sum, g) => sum + (g.subTotals ? g.subTotals.reduce((s, t) => s + t.amount, 0) : g.amount), 0)
const POT = 100 * BUY_IN * PLAYERS // cents
const VERSION = 'v2' // v1: settlement paid from the pot
const CONFIRMATION = 'Once all the scores are in, you can complete the event. This will lock the scorecards, prevent further edits, and finalize the game results.'

const dollars = cents => `${cents < 0 ? '-' : ''}$${Math.abs(cents / 100)}`
const uuidOnly = id => { if (!/^[0-9a-f-]{36}$/.test(id)) throw new Error(`Invalid id ${id}`); return id }

// The Overall - event settlement as shown: [{ from, to, amount (cents) }].
async function overallSettlement (page) {
  const rows = await section(page, 'Overall - event').locator('table.leaderboard-table')
    .filter({ has: page.locator('th', { hasText: /^\s*From\s*$/ }) }).first().locator('tr')
    .evaluateAll(trs => trs.slice(1).map(tr => [...tr.cells].map(c => c.innerText.trim())))
  return rows.map(([from, to, amount]) => ({ from, to, amount: money(amount) }))
}
// Order-independent form (tied payouts can list in either order).
const asSet = transfers => JSON.stringify([...transfers].map(t => `${t.from}>${t.to}:${t.amount}`).sort())

export default {
  name: 'complete-event-settle-up',
  output: `complete-event-settle-up-${VERSION}`,
  reviewDir: 'video-settlement',
  shotsFile: `complete-event-settle-up-${VERSION}-timing.json`,
  durationLimits: [20, 32],
  entries: 1,
  writes: ids => [['PUT', `/api/app/events/${uuidOnly(ids.f7Event)}`]],

  // Outer process only: completing the event changes the event row, its
  // group scorecards (locked) and its games (final summary) in place.
  restore (ids) {
    const event = uuidOnly(ids.f7Event)
    const list = sql => screensSql(sql).split('\n').filter(Boolean)
    return {
      rows: {
        events: [event],
        scorecards: list(`select id from scorecards where event_id = '${event}' order by id`),
        games: list(`select distinct g.id from games g left join game_players gp on gp.game_id = g.id left join players p on p.id = gp.player_id
          where g.event_id = '${event}' or p.event_id = '${event}' order by g.id`)
      }
    }
  },

  // Before (not filmed): the settlement the leaderboard already shows while
  // the event is open; completing it must not change a cent.
  async baseline (page, { ids, results }) {
    await page.goto(`${VUE_URL}/events/${ids.f7Event}/leaderboard`, { waitUntil: 'networkidle' })
    await sectionTitle(page, 'Overall - event').waitFor()
    if (!(await section(page, 'Overall - event').locator('.block').count())) await sectionTitle(page, 'Overall - event').click()
    await section(page, 'Overall - event').getByText('Who pays whom.').waitFor()
    results.before = await overallSettlement(page)
  },

  // Opening frame: the event dashboard with Players and Games collapsed
  // (normal taps), so the three groups and Complete event are in view.
  async setup (page, { ids }) {
    await page.goto(`${VUE_URL}/events/${ids.f7Event}`, { waitUntil: 'networkidle' })
    await page.getByText(F7.name, { exact: true }).first().waitFor()
    await page.locator('.title', { hasText: /^Players \(\d+\)$/ }).first().click()
    await sectionTitle(page, 'Games').click()
    await section(page, 'Games').locator('.block').first().waitFor({ state: 'detached' })
    if (await section(page, 'Scorecards').locator('.BlockItem').filter({ hasText: /@ \d\d:\d\d [AP]M/ }).count() !== F7.groups.length) {
      throw new Error('the dashboard does not list every group')
    }
    await page.locator('.sticky-footer').getByText('Complete event', { exact: true }).waitFor()
  },

  async record ({ page, ids, results, mark, hold, tap, glideTo, findCalloutSpot, calloutClear, callout, hideCallout, fixedBounds }) {
    const box = locator => locator.boundingBox()
    const show = async (text, rect, avoid, label) => {
      const hits = await calloutClear(rect, avoid, { cells: true })
      if (hits.length) throw new Error(`"${text}" at ${JSON.stringify(rect)} would touch ${hits.join(', ')}`)
      results.callouts[label] = { text, ...rect }
      await callout(text, rect)
    }
    results.callouts = {}
    await page.evaluate(() => window.scrollBy(0, 0)) // first frame
    mark('Event dashboard: three groups scored, ready to complete')
    await hold(1000)

    // "Complete the event" in the free band above the sticky footer.
    const games = await box(sectionTitle(page, 'Games'))
    const scorecards = await box(section(page, 'Scorecards').locator('.block').first())
    const completeButton = page.locator('.sticky-footer').getByText('Complete event', { exact: true })
    let bounds = await fixedBounds()
    const first = await findCalloutSpot('Complete the event', [{ top: games.y + games.height + 8, bottom: bounds.footerTop - 8, left: 8, right: 382 }], { align: 'center', cells: true })
    await show('Complete the event', first, [['the Games heading', games], ['the Scorecards list', scorecards], ['the Complete event button', await box(completeButton)]], 'completeTheEvent')
    await hold(2200)
    await hideCallout()
    await hold(300)

    mark('Complete event: Vue asks for confirmation')
    await tap(completeButton)
    await page.getByText('Complete this event', { exact: true }).waitFor()
    await page.getByText(CONFIRMATION, { exact: true }).waitFor()
    await hold(2700)

    mark('Confirm: Yes')
    const completed = page.waitForResponse(r => new URL(r.url()).pathname === `/api/app/events/${ids.f7Event}` && r.request().method() === 'PUT')
    await tap(page.getByRole('button', { name: 'Yes', exact: true }))
    if ((await completed).status() !== 200) throw new Error('Complete event did not succeed')
    // Vue's own completed state: the lock notice replaces the footer.
    const notice = page.getByText('This round is complete.')
    await notice.waitFor()
    if (await page.locator('.sticky-footer').getByText('Complete event', { exact: true }).count()) throw new Error('Complete event is still offered')
    await page.getByText('Complete this event', { exact: true }).waitFor({ state: 'hidden' }) // Vue hides the dialog
    await hold(600)

    mark('Event complete: scorecards locked, results final')
    // "Final results, automatically" below the lock notice (or above it).
    const noticeRow = notice.locator('xpath=..')
    const noticeBox = await box(noticeRow)
    const unlock = await box(page.getByText('Unlock', { exact: true }))
    bounds = await fixedBounds()
    const gamesNow = await box(sectionTitle(page, 'Games'))
    const second = await findCalloutSpot('Final results, automatically', [
      { top: noticeBox.y + noticeBox.height + 8, bottom: Math.min(bounds.footerTop, 844) - 8, left: 8, right: 382 },
      { top: gamesNow.y + gamesNow.height + 8, bottom: noticeBox.y - 8, left: 8, right: 382 }
    ], { align: 'center', cells: true })
    await show('Final results, automatically', second, [['the lock notice', noticeBox], ['the Unlock link', unlock], ['the Games heading', gamesNow]], 'finalResults')
    await hold(2400)
    await hideCallout()
    await hold(300)

    mark('Open the final leaderboard')
    await tap(page.locator('.event-details .icon-button'))
    await page.waitForURL(/\/leaderboard$/)
    await sectionTitle(page, 'Overall - event').waitFor()
    await page.evaluate(() => document.fonts.ready)
    if (await page.getByText('Event in progress').count()) throw new Error('the leaderboard still shows the event in progress')
    if (await page.getByText('Upgrade to Premium!').count()) throw new Error('the leaderboard shows the upgrade banner')
    await hold(1400)

    mark('Collapse the games')
    const gameNames = (await page.locator('.games-group .title').allInnerTexts()).map(t => t.trim()).filter(t => t !== 'Overall - event')
    if ([...gameNames].sort().join('|') !== F7.games.map(g => g.game).sort().join('|')) throw new Error(`event games are ${gameNames.join(', ')}`)
    for (const name of gameNames) {
      if (!(await section(page, name).locator('.block').count())) continue
      await tap(sectionTitle(page, name))
      await section(page, name).locator('.block').first().waitFor({ state: 'detached' })
      await hold(450)
    }
    const overall = section(page, 'Overall - event')
    if (!(await overall.locator('.block').count())) {
      await tap(sectionTitle(page, 'Overall - event'))
      await hold(450)
    }
    await overall.getByText('Who pays whom.').waitFor()
    await overall.getByLabel('Buy-ins collected').waitFor()
    results.after = await overallSettlement(page)
    // Every settlement row above the sticky footer, the heading below the header.
    const table = overall.locator('table.leaderboard-table').filter({ has: page.locator('th', { hasText: /^\s*From\s*$/ }) }).first()
    const frameTable = async () => {
      bounds = await fixedBounds()
      let tableBox = await box(table)
      const shift = Math.round(tableBox.y + tableBox.height - (bounds.footerTop - 10))
      if (shift > 0) await glideTo(await page.evaluate(() => window.scrollY) + shift, 600)
      tableBox = await box(table)
      const heading = await box(sectionTitle(page, 'Overall - event'))
      if (heading.y < bounds.headerBottom || tableBox.y + tableBox.height > bounds.footerTop) throw new Error(`the settlement is not fully in view (heading ${JSON.stringify(heading)}, table ${JSON.stringify(tableBox)})`)
      return { heading, tableBox }
    }
    await frameTable()
    await hold(900)

    // Untick "Buy-ins collected": Vue settles between the players instead of
    // from the pot. Display state only; any request at all fails the run.
    mark('Buy-ins collected off: settle between players')
    const checkbox = overall.getByLabel('Buy-ins collected')
    if (!(await checkbox.isChecked())) throw new Error('Buy-ins collected is not Vue\'s default (checked)')
    const requests = []
    const onRequest = request => requests.push(`${request.method()} ${new URL(request.url()).pathname}`)
    page.on('request', onRequest)
    await tap(checkbox)
    await overall.getByText('Settle between players when buy-ins were not collected.').waitFor()
    if (await checkbox.isChecked()) throw new Error('Buy-ins collected is still checked')
    results.playerToPlayer = await overallSettlement(page)
    await hold(600)
    page.off('request', onRequest)
    results.toggleRequests = requests
    if (requests.length) throw new Error(`STOP: toggling Buy-ins collected sent requests: ${requests.join(', ')}`)
    const { heading, tableBox } = await frameTable()
    await hold(500)

    mark('Who owes whom')
    // Beside the Overall - event heading: clear of the heading, every game
    // heading and chevron, the Settlement / Profit/loss tabs, "Who pays
    // whom.", Buy-ins collected and every settlement row.
    const headingText = await sectionTitle(page, 'Overall - event').evaluate(el => {
      const range = document.createRange()
      range.selectNodeContents(el)
      return range.getBoundingClientRect().right
    })
    const third = await findCalloutSpot('Who owes whom', [{ top: heading.y + heading.height / 2 - 21, bottom: heading.y + heading.height / 2 + 21, left: headingText + 8, right: 382 }], { align: 'center', cells: true })
    const avoid = [
      ['the Overall - event heading', heading],
      ...(await page.locator('.games-group .title').evaluateAll(els => els.flatMap(el => [el, el.parentElement, ...el.parentElement.querySelectorAll('svg, i, img')])
        .map(e => { const b = e.getBoundingClientRect(); return ['a game heading or chevron', { x: b.left, y: b.top, width: b.width, height: b.height }] }))),
      ['the Settlement tab', await box(overall.getByText('Settlement', { exact: true }))],
      ['the Profit/loss tab', await box(overall.getByText('Profit/loss', { exact: true }))],
      ...(await overall.getByText('Who pays whom.').count() ? [['"Who pays whom."', await box(overall.getByText('Who pays whom.'))]] : []),
      ['the settlement note', await box(overall.getByText('Settle between players when buy-ins were not collected.'))],
      ['Buy-ins collected', await box(overall.getByLabel('Buy-ins collected'))],
      ['the Buy-ins collected label', await box(overall.getByText('Buy-ins collected', { exact: true }))],
      ['the settlement rows', tableBox]
    ]
    await show('Who owes whom', third, avoid, 'whoOwesWhom')
    await hold(2400)
    await hideCallout()
    await hold(500)

    // The clean, static player-to-player settlement (and poster).
    mark('Final player-to-player settlement, no callout')
    if (await page.evaluate(() => document.documentElement.querySelectorAll(':scope > div[aria-hidden] > div').length)) throw new Error('a callout or tap ripple is still showing on the final frame')
    if (asSet(await overallSettlement(page)) !== asSet(results.playerToPlayer) || await checkbox.isChecked()) throw new Error('the final table is not the player-to-player settlement')
    await hold(4500)
  },

  // After (not filmed): every game's and the event's accounting reconciles,
  // to the cent, with and without "Buy-ins collected" (restored after).
  async afterwards (page, { ids, results }) {
    await page.goto(`${VUE_URL}/events/${ids.f7Event}/leaderboard`, { waitUntil: 'networkidle' })
    await section(page, 'Overall - event').getByText('Who pays whom.').waitFor()
    results.eventSettlement = await assertEventAccountingReconciles(page)
  },

  // The pot settlement is what the open event already showed, is paid
  // entirely from the pot (12 players x $30 = $360) and matches the
  // reconciled one; the final player-to-player table equals the reconciled
  // one, has no pot rows and leaves every player at their Net.
  verify (results) {
    const problems = []
    if (results.toggleRequests.length) problems.push(`the checkbox sent requests: ${results.toggleRequests.join(', ')}`)
    if (asSet(results.playerToPlayer) !== asSet(results.eventSettlement.settlementWithoutBuyIns)) problems.push('the player-to-player table differs from the reconciled one')
    if (results.playerToPlayer.some(t => t.from === 'Pot' || t.to === 'Pot')) problems.push('the player-to-player table involves the pot')
    const position = {}
    for (const { from, to, amount } of results.playerToPlayer) {
      position[from] = (position[from] || 0) - amount
      position[to] = (position[to] || 0) + amount
    }
    for (const [player, v] of Object.entries(results.eventSettlement.overall)) {
      if ((position[player] || 0) !== v.net) problems.push(`${player} ends at ${dollars(position[player] || 0)}, Net is ${dollars(v.net)}`)
    }
    if (asSet(results.after) !== asSet(results.before)) problems.push('completing the event changed the settlement')
    if (asSet(results.after) !== asSet(results.eventSettlement.settlement)) problems.push('the settlement shown differs from the reconciled settlement')
    if (results.after.some(t => t.from !== 'Pot')) problems.push('the settlement is not paid entirely from the pot')
    const paid = results.after.reduce((sum, t) => sum + t.amount, 0)
    if (paid !== POT) problems.push(`the pot pays out ${dollars(paid)}, expected ${dollars(POT)}`)
    return problems
  },

  // Outer process, before the restore: the event, every group scorecard and
  // every game summary were finalized, and the stored results reconcile and
  // equal the displayed settlement player by player.
  verifyStored (ids, results) {
    const digest = fixtureDigests(ids).f7
    if (!digest.locked || !digest.finalized) throw new Error('Refusing: the event was not fully locked and finalized')
    const stored = finalizedEventPositions(ids.f7Event)
    const shown = results.eventSettlement.overall
    const names = new Set([...Object.keys(stored), ...Object.keys(shown)])
    for (const name of names) {
      const s = stored[name]
      const d = shown[name]
      if (!s || !d || Math.round(s.gross * 100) !== d.gross || Math.round(s.buyIn * 100) !== d.buyIn) throw new Error(`Refusing: stored final results for ${name} differ from the displayed settlement`)
    }
    return [`F7 locked and finalized; stored final results match the displayed settlement for ${names.size} players`]
  },

  report (results) {
    const games = Object.entries(results.eventSettlement.games)
      .map(([game, g]) => `${game}: pool ${dollars(g.pool)}, paid ${Object.entries(g.payouts).map(([p, c]) => `${p} ${dollars(c)}`).join(', ')}`)
    return ['every game and the event reconcile to the cent',
      ...games,
      `settlement (buy-ins collected): ${results.after.map(t => `${t.from} -> ${t.to} ${dollars(t.amount)}`).join('; ')}`,
      `Net: ${Object.entries(results.eventSettlement.overall).map(([p, v]) => `${p} ${dollars(v.net)}`).join(', ')}`,
      `requests while toggling Buy-ins collected: ${results.toggleRequests.length}`,
      `final player-to-player settlement: ${results.playerToPlayer.map(t => `${t.from} -> ${t.to} ${dollars(t.amount)}`).join('; ')}`]
  },

  shots: results => ({
    recipe: 'complete-event-settle-up',
    version: VERSION,
    event: { name: F7.name, players: PLAYERS, groups: F7.groups.map(g => g.teeTime), games: F7.games.map(g => g.game), buyInPerPlayer: BUY_IN, pot: POT / 100 },
    confirmation: CONFIRMATION,
    settlement: { before: results.before, after: results.after, playerToPlayer: results.playerToPlayer, toggleRequests: results.toggleRequests, games: results.eventSettlement.games, overall: results.eventSettlement.overall },
    marks: results.marks,
    end: results.end,
    callouts: results.callouts
  })
}
