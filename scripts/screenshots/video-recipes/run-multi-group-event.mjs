// Recipe: "Run a multi-group event".
//
// F4, PebblePayday: sixteen players in four groups (tee times 08:00-08:30),
// four pool games. Groups 1-3 have finished; group 4 (08:30) is through 15.
// The commissioner opens the event, opens group 4, views its scorecard with
// the Team Stroke Play column (teams are the groups, best three net balls a
// hole) and enters hole 16. Hole 16 is a par 4; with full course handicaps
// (White stroke index 11, Red 5) Bert (17), Debbie (6) and Kevin (20) get a
// stroke and Ben (7) does not:
//
//   Bert 5 (net 4, par)   Ben 3 (net 3, -1)   Debbie 4 (net 3, -1)   Kevin 4 (net 3, -1)
//
// The best three net balls are -3, so group 4 goes from +9 (4th, through 15)
// to +6 (3rd, through 16), passing group 3 (+8); the leaderboard across the
// event shows it. The Skins hole is a three-way tie, so no skin changes.
//
// The fixture definition is unchanged: these scores exist only during the
// recording and are removed by the restore.

import fs from 'node:fs'
import path from 'node:path'
import { SCRIPTS_DIR, VUE_URL } from '../lib/config.mjs'
import { screensSql } from '../lib/guards.mjs'
import { section, sectionTitle, holeRow, money, assertEventAccountingReconciles } from '../proof-set.mjs'

const F4 = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'fixtures', 'pebblepayday-f4.json'), 'utf8'))
const GROUP = 3 // group 4, tee time 08:30
const TEE_TIME = '08:30 AM'
const HOLE = 16
const PAR = 4
// Scorecard columns are labelled with initials and the course handicap.
const ENTRIES = [
  { first: 'Bert', column: 'BB 17', gross: 5, strokes: 1 },
  { first: 'Ben', column: 'BB 7', gross: 3, strokes: 0 },
  { first: 'Debbie', column: 'DD 6', gross: 4, strokes: 1 },
  { first: 'Kevin', column: 'KK 20', gross: 4, strokes: 1 }
]
const NET_BALLS = F4.games.find(g => g.game === 'Team Stroke Play').netBalls
const TEAM_DELTA = ENTRIES.map(e => e.gross - e.strokes - PAR).sort((a, b) => a - b).slice(0, NET_BALLS).reduce((a, b) => a + b, 0)
const GROUP_MEMBER = 'Bert Bailout' // identifies group 4's team row

// Review output version (v1: first review; v2: the leaderboard callout,
// "Live standings", sits beside the Round in progress badge as the
// leaderboard opens, and the final frame has no callout).
const VERSION = 'v2'
const LEADERBOARD_CALLOUT = 'Live standings'

const toPar = text => text === 'E' ? 0 : Number(text.replace('+', ''))
const signed = n => n === 0 ? 'E' : n > 0 ? `+${n}` : `${n}`

// Team Stroke Play standings: [{ place, team, thru, toPar }] in table order.
async function teamStandings (page) {
  const rows = await section(page, 'Team Stroke Play').locator('table').first().locator('tr')
    .evaluateAll(trs => trs.map(tr => [...tr.cells].map(c => c.innerText.replace(/\s+/g, ' ').trim())))
  const teams = rows.filter(cells => /^\d+$/.test(cells[0] || ''))
    .map(([place, team, thru, , , par]) => ({ place: Number(place), team, thru: Number(thru), toPar: toPar(par) }))
  if (teams.length !== F4.groups.length) throw new Error(`Team Stroke Play lists ${teams.length} teams`)
  return teams
}

// Skins standings: { player: { skins, amount (cents) } }.
async function skinsStandings (page) {
  const rows = await section(page, 'Skins').locator('table').first().locator('tr')
    .evaluateAll(trs => trs.map(tr => [...tr.cells].map(c => c.innerText.trim())))
  return Object.fromEntries(rows.filter(([player, skins]) => /^\d+$/.test(skins || '') && player !== 'Total')
    .map(([player, skins, amount]) => [player, { skins: Number(skins), amount: money(amount) }]))
}

const groupRow = teams => teams.find(t => t.team.includes(GROUP_MEMBER))

export default {
  name: 'run-multi-group-event',
  output: `run-multi-group-event-${VERSION}`,
  reviewDir: 'video-event',
  shotsFile: `run-multi-group-event-${VERSION}-timing.json`,
  durationLimits: [25, 35],
  entries: ENTRIES.length,

  // Outer process only (the browser sandbox cannot reach the database).
  restore (ids) {
    const card = ids.f4Scorecards[GROUP]
    if (!/^[0-9a-f-]{36}$/.test(card)) throw new Error('Invalid group scorecard id')
    const players = Object.fromEntries(screensSql(`select trim(first_name) || '|' || id from players where scorecard_id = '${card}'`)
      .split('\n').filter(Boolean).map(line => line.split('|')))
    const scores = {}
    for (const { first, gross } of ENTRIES) {
      if (!players[first]) throw new Error(`${first} is not in group 4`)
      scores[players[first]] = gross
    }
    return { hole: HOLE, scores }
  },

  // Before (not filmed): the standings the group 4 scorecard leaderboard shows.
  async baseline (page, { ids, results }) {
    await page.goto(`${VUE_URL}/scorecards/${ids.f4Scorecards[GROUP]}/leaderboard`, { waitUntil: 'networkidle' })
    await sectionTitle(page, 'Team Stroke Play').waitFor()
    results.before = await teamStandings(page)
    results.skinsBefore = await skinsStandings(page)
  },

  // Opening frame: the event dashboard with the player list collapsed (a
  // normal tap), so the four groups (scorecards) and the games are in view.
  async setup (page, { ids }) {
    await page.goto(`${VUE_URL}/events/${ids.f4Event}`, { waitUntil: 'networkidle' })
    await page.getByText(F4.name, { exact: true }).first().waitFor()
    await page.locator('.title', { hasText: /^Players \(\d+\)$/ }).first().click()
    await sectionTitle(page, 'Scorecards').waitFor()
    await section(page, 'Scorecards').locator('.BlockItem').filter({ hasText: TEE_TIME }).waitFor()
    if (await section(page, 'Scorecards').locator('.BlockItem').filter({ hasText: /@ \d\d:\d\d [AP]M/ }).count() !== F4.groups.length) {
      throw new Error('the dashboard does not list every group')
    }
  },

  async record ({ page, results, mark, hold, tap, glideTo, scrollTargetBelowHeader, revealHorizontally, findCalloutSpot, calloutHits, callout, hideCallout, fixedBounds }) {
    await page.evaluate(() => window.scrollBy(0, 0)) // first frame
    mark('Event dashboard: four groups (scorecards) and four games')
    await hold(3400)

    mark('Open group 4 (08:30)')
    await tap(section(page, 'Scorecards').locator('.BlockItem').filter({ hasText: TEE_TIME }))
    await page.waitForURL(/\/groups\/[^/]+\/edit$/)
    await page.getByText('Adjust group settings', { exact: true }).waitFor()
    await sectionTitle(page, 'Players').waitFor()
    await page.evaluate(() => document.fonts.ready)
    await hold(500)
    // Beside the group's Players heading, above its four players. Save is
    // never pressed.
    const playersTitle = await sectionTitle(page, 'Players').evaluate(el => {
      const range = document.createRange()
      range.selectNodeContents(el)
      const text = range.getBoundingClientRect()
      return { top: el.getBoundingClientRect().top, textRight: text.right }
    })
    const playersCard = await section(page, 'Players').locator('.block').first().boundingBox()
    results.groupCallout = await findCalloutSpot('Manage every group', [
      { top: playersTitle.top - 6, bottom: playersCard.y - 2, left: playersTitle.textRight + 12, right: playersCard.x + playersCard.width }
    ], { align: 'right' })
    await callout('Manage every group', results.groupCallout)
    await hold(2500)
    await hideCallout()
    await hold(300)

    mark('View its scorecard')
    await tap(page.getByText('view scorecard', { exact: true }))
    await page.waitForURL(/\/scorecards\/[^/]+\/?$/)
    const tab = page.locator('.GameButton').filter({ hasText: /^\s*Team Stroke Play/ })
    await tab.waitFor()
    await page.evaluate(() => document.fonts.ready)
    await hold(900)

    mark('Show the Team Stroke Play column')
    await revealHorizontally(tab)
    await hold(250)
    await tap(tab)
    await page.locator('th.game-summary').filter({ hasText: 'Team Stroke Play' }).waitFor()
    await hold(600)
    // Hole 15 (with its running +9) under the header, or as near as the end
    // of the scorecard allows.
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
    await glideTo(Math.min(await scrollTargetBelowHeader(holeRow(page, HOLE - 1), 0), maxScroll), 900)
    const row = holeRow(page, HOLE)
    const teamCell = row.locator('td').last()
    results.teamCellBefore = (await holeRow(page, HOLE - 1).locator('td').last().innerText()).replace(/\s+/g, ' ').trim()
    // Columns by label (two players are "BB"); stroke dots must match the
    // strokes the arithmetic above assumes.
    const labels = await page.locator('thead tr').filter({ hasText: 'Hole' }).last().locator('th')
      .evaluateAll(ths => ths.map(t => t.innerText.replace(/\s+/g, ' ').trim()))
    const playerColumns = labels.slice(2, 2 + ENTRIES.length)
    const order = playerColumns.map(label => {
      const entry = ENTRIES.find(e => e.column === label)
      if (!entry) throw new Error(`unexpected scorecard column ${label} (columns: ${labels.join(', ')})`)
      return entry
    })
    for (const [i, entry] of order.entries()) {
      const dots = (await row.locator('td.scorecard-score').nth(i).locator('.strokeCount-upperRight').innerText()).trim()
      if ([...dots].filter(c => c === '•').length !== entry.strokes) throw new Error(`${entry.first} has "${dots}" strokes on hole ${HOLE}, expected ${entry.strokes}`)
    }
    await hold(900)

    mark(`Enter hole ${HOLE} for group 4`)
    for (const [i, entry] of order.entries()) {
      await tap(row.locator('td.scorecard-score').nth(i))
      await page.getByText('Enter score', { exact: true }).waitFor()
      await page.locator('.picker-player', { hasText: new RegExp(`^${entry.first}\\b`) }).waitFor()
      await hold(650)
      const saved = page.waitForResponse(r => new URL(r.url()).pathname === '/api/app/scores' && r.request().method() === 'POST')
      await tap(page.locator('.btn_numberpad', { hasText: new RegExp(`^\\s*${entry.gross}\\s*$`) }))
      if ((await saved).status() >= 300) throw new Error(`saving ${entry.first}'s score failed`)
      await page.getByText('Enter score', { exact: true }).waitFor({ state: 'detached' })
      await hold(i === order.length - 1 ? 250 : 550)
    }

    // The team column updates at once: running to-par after hole 16.
    const expected = signed(groupRow(results.before).toPar + TEAM_DELTA)
    await teamCell.getByText(expected, { exact: true }).waitFor()
    results.teamCellAfter = (await teamCell.innerText()).replace(/\s+/g, ' ').trim()
    mark('Team Stroke Play updates on the scorecard')
    await hold(400)
    // Over the empty hole 17 and 18 rows, across the score and team columns
    // (clear of the hole and par columns and of the stroke dots). The only
    // text it may cover is the team column's "-" for holes not yet played.
    const rowBox = await row.boundingBox()
    const parRight = await row.locator('td.scorecard-par').evaluate(el => el.getBoundingClientRect().right)
    const { footerTop } = await fixedBounds()
    results.scoreCallout = await findCalloutSpot('Scores update across the event', [
      { top: rowBox.y + rowBox.height + 2, bottom: footerTop - 4, left: parRight + 2, right: 386 }
    ], { align: 'center', ignore: ['-'] })
    await callout('Scores update across the event', results.scoreCallout)
    await hold(2600)
    await hideCallout()
    await hold(300)

    mark('Open the event leaderboard')
    await tap(page.locator('.right > .leaderboard'))
    await page.waitForURL(/\/leaderboard$/)
    await sectionTitle(page, 'Team Stroke Play').waitFor()
    await page.evaluate(() => document.fonts.ready)
    // The fictional user is premium for the video, so Vue shows no banner.
    if (await page.getByText('Upgrade to Premium!').count()) throw new Error('the leaderboard shows the upgrade banner')
    await hold(300)

    // "Live standings" beside the Round in progress badge, above the grey
    // Event Games heading, while the leaderboard first opens (at the top of
    // the page). It must keep clear of the badge, the fixed event header,
    // the Event Games heading, every game heading and its expand/collapse
    // control, the footer, the viewport edges and any other text or control.
    mark('Live standings beside the Round in progress badge')
    const arrival = await fixedBounds()
    const badgeBox = await page.locator('.in-progress').first().boundingBox()
    const bandBox = await page.getByText('Event Games', { exact: true }).boundingBox()
    // Each game heading, its row and its chevron (the expand/collapse control).
    const gameControls = await page.locator('.games-group .title').evaluateAll(els => els.flatMap(el =>
      [el, el.parentElement, ...el.parentElement.querySelectorAll('svg, i, img')].map(e => e.getBoundingClientRect())
        .map(b => ({ x: b.left, y: b.top, width: b.width, height: b.height }))))
    const margin = 8
    const size = await page.evaluate(text => window.__demo.measureCallout(text), LEADERBOARD_CALLOUT)
    const left = badgeBox.x + badgeBox.width + margin
    const right = 390 - margin
    if (right - left < size.width) throw new Error(`"${LEADERBOARD_CALLOUT}" (${size.width.toFixed(1)} px) does not fit beside the badge (${(right - left).toFixed(1)} px)`)
    const rect = {
      left: Math.round((left + right - size.width) / 2),
      top: Math.round(badgeBox.y + badgeBox.height / 2 - size.height / 2),
      ...size
    }
    const avoid = [
      ['the Round in progress badge', badgeBox],
      ['the Event Games heading', bandBox],
      ['the event header', { x: 0, y: 0, width: 390, height: arrival.headerBottom }],
      ['the footer', { x: 0, y: arrival.footerTop, width: 390, height: 844 - arrival.footerTop }],
      ...gameControls.map(box => ['a game heading or control', box])
    ]
    const touches = (a, b) => a.left - margin < b.x + b.width && a.left + a.width + margin > b.x && a.top - margin < b.y + b.height && a.top + a.height + margin > b.y
    const collisions = [
      ...avoid.filter(([, box]) => box.width > 0 && box.height > 0 && touches(rect, box)).map(([name]) => name),
      ...(await calloutHits(rect))
    ]
    if (rect.left < margin || rect.left + rect.width > 390 - margin || rect.top < arrival.headerBottom + margin || rect.top + rect.height > arrival.footerTop - margin) collisions.push('the viewport edges')
    if (collisions.length) throw new Error(`"${LEADERBOARD_CALLOUT}" at ${JSON.stringify(rect)} would touch ${[...new Set(collisions)].join(', ')}`)
    const gap = (a, b) => +Math.max(b - a, 0).toFixed(1)
    results.leaderboardCallout = {
      text: LEADERBOARD_CALLOUT, ...rect,
      gaps: {
        badge: gap(badgeBox.x + badgeBox.width, rect.left),
        rightEdge: gap(rect.left + rect.width, 390),
        eventGamesHeading: gap(rect.top + rect.height, bandBox.y),
        eventHeader: gap(arrival.headerBottom, rect.top)
      }
    }
    await callout(LEADERBOARD_CALLOUT, rect)
    await hold(2300)
    await hideCallout()
    await hold(300)

    mark('Collapse the other games')
    for (const name of ['Skins', 'Stroke Play', 'Team Stableford']) {
      await tap(sectionTitle(page, name))
      await section(page, name).locator('.block').first().waitFor({ state: 'detached' })
      await hold(450)
    }
    results.after = await teamStandings(page)
    await hold(400)
    // Final framing: all four team rows above the sticky footer (the card's
    // trailing Game accounting link may sit under it), with the "Event Games"
    // band that heads these standings still below the header.
    const bounds = await fixedBounds()
    const lastRow = await section(page, 'Team Stroke Play').locator('table').first().locator('tr').last().boundingBox()
    let shift = Math.round(lastRow.y + lastRow.height - (bounds.footerTop - 10))
    // Never leave a sliver of the "Round in progress" badge under the header:
    // scroll it fully out of view if the Event Games band stays visible.
    const badge = await page.getByText('Round in progress', { exact: true }).first().locator('xpath=..').boundingBox()
    const bandTop = (await page.getByText('Event Games', { exact: true }).boundingBox()).y
    const badgeBottom = badge.y + badge.height - shift
    if (badgeBottom > bounds.headerBottom && badge.y - shift < bounds.headerBottom && bandTop - (badgeBottom - bounds.headerBottom + 2) - shift >= bounds.headerBottom) {
      shift += Math.ceil(badgeBottom - bounds.headerBottom + 2)
    }
    if (shift > 0) await glideTo(await page.evaluate(() => window.scrollY) + shift, 700)
    const table = await section(page, 'Team Stroke Play').locator('table').first().boundingBox()
    if (table.y < bounds.headerBottom || table.y + table.height > bounds.footerTop) throw new Error(`the Team Stroke Play standings are not fully in view (${JSON.stringify(table)})`)
    const framedBandTop = (await page.getByText('Event Games', { exact: true }).boundingBox()).y
    if (framedBandTop < bounds.headerBottom) throw new Error('the Event Games band is under the header')

    // The complete standings, held with no callout.
    mark('Live leaderboard across the event (no callout)')
    // (The overlay root is the aria-hidden div on <html>; the callout's fade
    // and the last tap's ripple finished during the framing scroll.)
    if (await page.evaluate(() => document.documentElement.querySelectorAll(':scope > div[aria-hidden] > div').length)) throw new Error('a callout is still showing on the final frame')
    await hold(4300)
  },

  // After (not filmed): the event leaderboard itself shows the same team
  // standings, and every game's and the event's accounting reconciles.
  async afterwards (page, { ids, results }) {
    await page.goto(`${VUE_URL}/events/${ids.f4Event}/leaderboard`, { waitUntil: 'networkidle' })
    await sectionTitle(page, 'Team Stroke Play').waitFor()
    results.eventLeaderboard = await teamStandings(page)
    results.skinsAfter = await skinsStandings(page)
    results.accounting = await assertEventAccountingReconciles(page, F4)
  },

  // Group 4 moves exactly as the entered scores imply, nobody else's team
  // result changes, the places follow the totals, and the event leaderboard
  // agrees with what the recording showed. No skin changes hands.
  verify (results) {
    const problems = []
    const before = groupRow(results.before)
    const after = groupRow(results.after)
    if (!before || !after) return ['group 4 is missing from Team Stroke Play']
    if (before.thru !== HOLE - 1 || after.thru !== HOLE) problems.push(`group 4 thru ${before.thru} -> ${after.thru}`)
    if (after.toPar !== before.toPar + TEAM_DELTA) problems.push(`group 4 ${signed(before.toPar)} -> ${signed(after.toPar)}, expected ${signed(before.toPar + TEAM_DELTA)}`)
    for (const team of results.after.filter(t => t !== after)) {
      const was = results.before.find(t => t.team === team.team)
      if (!was || was.thru !== team.thru || was.toPar !== team.toPar) problems.push(`${team.team} changed`)
    }
    for (const standings of [results.before, results.after]) {
      const sorted = [...standings].sort((a, b) => a.toPar - b.toPar)
      sorted.forEach((team, i) => { if (team.place !== i + 1) problems.push(`${team.team} is placed ${team.place}, totals put it ${i + 1}`) })
      if (new Set(standings.map(t => t.toPar)).size !== standings.length) problems.push('Team Stroke Play has a tie')
    }
    if (after.place >= before.place) problems.push(`group 4 place ${before.place} -> ${after.place} (expected to move up)`)
    if (JSON.stringify(results.eventLeaderboard) !== JSON.stringify(results.after)) problems.push('the event leaderboard differs from the standings the recording showed')
    if (!new RegExp(`(^|\\s)${signed(after.toPar).replace('+', '\\+')}(\\s|$)`).test(results.teamCellAfter)) problems.push(`hole ${HOLE} team cell shows "${results.teamCellAfter}"`)
    const skinPlayers = new Set([...Object.keys(results.skinsBefore), ...Object.keys(results.skinsAfter)])
    for (const player of skinPlayers) {
      if (JSON.stringify(results.skinsBefore[player]) !== JSON.stringify(results.skinsAfter[player])) problems.push(`Skins changed for ${player}`)
    }
    return problems
  },

  report (results) {
    const fmt = teams => teams.map(t => `${t.place}. ${t.team.split(',')[0]}… ${signed(t.toPar)} (thru ${t.thru})`).join('; ')
    return ['event and game accounting reconciles', `Team Stroke Play before: ${fmt(results.before)}`, `Team Stroke Play after:  ${fmt(results.after)}`]
  },

  shots: results => ({
    recipe: 'run-multi-group-event',
    event: { name: F4.name, players: F4.groups.reduce((n, g) => n + g.players.length, 0), groups: F4.groups.map(g => ({ teeTime: g.teeTime, holesPlayed: g.holesPlayed })), games: F4.games.map(g => g.game) },
    action: { group: 4, hole: HOLE, par: PAR, entries: ENTRIES.map(({ first, gross, strokes }) => ({ player: first, gross, strokes, netToPar: gross - strokes - PAR })), netBallsCounted: NET_BALLS, teamDelta: TEAM_DELTA },
    teamStrokePlay: { before: results.before, after: results.after, scorecardCell: { holeBefore: results.teamCellBefore, hole16After: results.teamCellAfter } },
    skins: { before: results.skinsBefore, after: results.skinsAfter },
    marks: results.marks,
    end: results.end,
    version: VERSION,
    callouts: { manageGroups: results.groupCallout, scores: results.scoreCallout, leaderboard: results.leaderboardCallout }
  })
}
