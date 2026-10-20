// Proof set for the Vue screenshot pipeline (13 images). Each shot names the
// draft output file, the route to open and the steps that produce the state.
// Draft names never collide with existing Expo assets.
//
// Selectors are semantic: game tabs are only clicked when their column is not
// already shown (tabs toggle), sections are only expanded when collapsed, Wolf
// and scorecard rows are found by hole number, and the Lone Wolf option is
// only clicked when it is not already checked.
//
// Recipes are read-only unless marked `mayWrite: true`; capture.mjs fails a
// read-only recipe that sends any non-GET request to the Hub, and requires
// every writing recipe to run after all read-only ones.

import { VIEWPORT } from './lib/config.mjs'

// Shows the scorecard column for one game (tabs toggle, so click only if needed).
async function showGameColumn (page, tabTitle, columnTitle) {
  const column = page.locator('th.game-summary').filter({ hasText: new RegExp(`^\\s*${columnTitle}\\s*$`) })
  const tab = page.locator('.GameButton').filter({ has: page.locator('.title', { hasText: new RegExp(`^\\s*${tabTitle}\\s*$`) }) })
  await tab.first().waitFor()
  if (!(await column.count())) await tab.first().click()
  await column.first().waitFor()
}

// Scrolls the window so `target` sits just below whatever fixed or sticky
// header covers the top of the viewport (a normal user scroll).
async function scrollBelowHeader (target, gap = 12) {
  await target.waitFor()
  await target.evaluate((el, gap) => {
    const covering = [...document.querySelectorAll('*')].filter(e => {
      const style = getComputedStyle(e)
      return ['fixed', 'sticky'].includes(style.position) && parseFloat(style.top) < 300 && e.getBoundingClientRect().height > 0
    }).map(e => parseFloat(getComputedStyle(e).top) + e.getBoundingClientRect().height)
    const headerBottom = Math.max(0, ...covering)
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - headerBottom - gap)
  }, gap)
  await target.page().waitForFunction(el => el.getBoundingClientRect().top > 0, await target.elementHandle())
}

const sectionTitle = (page, name) => page.locator('.title').filter({ hasText: new RegExp(`^\\s*${name}\\s*$`) })
const section = (page, name) => sectionTitle(page, name).locator('xpath=ancestor::section[1]')

// Expands a collapsible section only if its content is not already shown.
async function expandSection (page, name) {
  if (!(await section(page, name).locator('.block').count())) await sectionTitle(page, name).click()
  await section(page, name).locator('.block').first().waitFor()
}

// Collapses a section only if its content is currently shown.
async function collapseSection (page, name) {
  if (await section(page, name).locator('.block').count()) await sectionTitle(page, name).click()
  await section(page, name).locator('.block').first().waitFor({ state: 'detached' })
}

// Side-game accounting must reconcile before any money is captured:
//  - every game's settlement and the consolidated settlement are player to
//    player (no pot, no buy-in);
//  - the consolidated settlement equals the sum of the per-game settlements,
//    player by player, to the cent;
//  - the consolidated profit/loss equals those totals and sums to zero.
// Only normal taps are used (Game accounting / Hide details, Settlement /
// Profit/loss), and every view is restored before the capture.
function money (text) {
  const match = /^(-?)\$([\d,]+(?:\.\d{1,2})?)$/.exec(text.trim())
  if (!match) throw new Error(`Unexpected amount "${text}"`)
  return Math.round(Number(match[2].replace(/,/g, '')) * 100) * (match[1] ? -1 : 1)
}

async function settlementNets (scope) {
  const table = scope.locator('table.leaderboard-table').filter({ has: scope.page().locator('th', { hasText: /^\s*From\s*$/ }) })
  await table.first().waitFor()
  const rows = await table.first().locator('tr').evaluateAll(trs => trs.slice(1).map(tr => [...tr.cells].map(c => c.innerText.trim())))
  const nets = {}
  for (const [from, to, amount] of rows) {
    if (from === 'Pot' || to === 'Pot') throw new Error('Settlement uses a pot; side games must settle player to player')
    nets[from] = (nets[from] || 0) - money(amount)
    nets[to] = (nets[to] || 0) + money(amount)
  }
  return nets
}

const sumOf = nets => Object.values(nets).reduce((a, b) => a + b, 0)

async function assertSideGamesReconcile (page) {
  const games = (await page.locator('.games-group .title').allInnerTexts()).map(t => t.trim())
  const expected = {}
  for (const game of games) {
    const block = section(page, game)
    await block.getByText('Game accounting', { exact: true }).click()
    const nets = await settlementNets(block)
    if (sumOf(nets) !== 0) throw new Error(`${game} settlement does not sum to zero`)
    for (const [player, cents] of Object.entries(nets)) expected[player] = (expected[player] || 0) + cents
    await block.getByText('Hide details', { exact: true }).click()
    await block.getByText('Game accounting', { exact: true }).waitFor()
  }
  const overallWasOpen = await section(page, 'Overall - side games').locator('.block').count()
  await expandSection(page, 'Overall - side games')
  const overall = section(page, 'Overall - side games')
  if (await overall.getByText(/buy-in/i).count()) throw new Error('Consolidated accounting shows a buy-in')
  const consolidated = await settlementNets(overall)
  const players = new Set([...Object.keys(expected), ...Object.keys(consolidated)])
  for (const player of players) {
    if ((consolidated[player] || 0) !== (expected[player] || 0)) {
      throw new Error(`Consolidated settlement for ${player} (${consolidated[player] || 0}c) does not match the games (${expected[player] || 0}c)`)
    }
  }
  if (sumOf(consolidated) !== 0) throw new Error('Consolidated settlement does not sum to zero')
  await overall.getByText('Profit/loss', { exact: true }).click()
  const profit = await overall.locator('table.leaderboard-table').filter({ has: page.locator('th', { hasText: /^\s*Gross\s*$/ }) }).first()
    .locator('tr').evaluateAll(trs => trs.slice(1).map(tr => [...tr.cells].map(c => c.innerText.trim())))
  if (profit.some(row => row.length !== 2)) throw new Error('Profit/loss shows more than Player and Gross (buy-in columns?)')
  let total = 0
  for (const [player, gross] of profit) {
    total += money(gross)
    if (money(gross) !== (expected[player] || 0)) throw new Error(`Profit/loss for ${player} does not match the games`)
  }
  if (total !== 0 || profit.length !== players.size) throw new Error('Consolidated profit/loss does not sum to zero over every player')
  await overall.getByText('Settlement', { exact: true }).click()
  await overall.getByText('Who pays whom.').waitFor()
  if (!overallWasOpen) await collapseSection(page, 'Overall - side games')
}

const holeRow = (page, hole) => page.locator('tbody tr').filter({ has: page.locator('td.scorecard-hole', { hasText: new RegExp(`^\\s*${hole}\\s*$`) }) })

export default [
  {
    name: 'homepage-hero-scorecard',
    path: ids => `/scorecards/${ids.f1Scorecard}`,
    async prepare (page) {
      await showGameColumn(page, 'Net Skins', 'Skins')
      await page.getByText('Ties').first().waitFor()
    }
  },
  {
    name: 'event-dashboard',
    path: ids => `/events/${ids.f4Event}`,
    async prepare (page) {
      await page.getByText('PebblePayday').first().waitFor()
      // Collapse the 16-player list so groups (tee times) and games are in view.
      const players = page.locator('.title', { hasText: /^Players \(\d+\)$/ }).first()
      await players.click()
      await page.locator('.title', { hasText: 'Scorecards' }).first().waitFor()
      await page.locator('.title', { hasText: 'Games' }).first().waitFor()
    }
  },
  {
    name: 'event-live-leaderboard',
    path: ids => `/events/${ids.f4Event}/leaderboard`,
    async prepare (page) {
      await page.getByText('Event in progress').first().waitFor()
      const sectionTitle = name => page.locator('.games-group .title').filter({ hasText: new RegExp(`^\\s*${name}\\s*$`) })
      // Read (never change) the Stroke Play table before collapsing it: the
      // top three places must be untied so places and payouts read cleanly.
      const strokeRows = await sectionTitle('Stroke Play').locator('xpath=ancestor::section[1]')
        .locator('.leaderboardTable tbody tr').evaluateAll(rows => rows.map(r => [...r.cells].map(c => c.innerText.trim())))
      const top = strokeRows.filter(cells => /^\d+$/.test(cells[0])).slice(0, 4)
      const toPar = cells => cells[3] === 'E' ? 0 : Number(cells[3])
      if (top.length < 4 || top.slice(0, 3).some((cells, i) => cells[0] !== String(i + 1) || !(toPar(cells) < toPar(top[i + 1])))) {
        throw new Error(`Stroke Play top three are tied or out of order: ${JSON.stringify(top.map(c => [c[0], c[3]]))}`)
      }
      // Collapse Skins and the 16-row Stroke Play table with their section
      // chevrons (a normal tap) so Team Stroke Play is in view.
      for (const name of ['Skins', 'Stroke Play']) {
        const block = sectionTitle(name).locator('xpath=ancestor::section[1]').locator('.block')
        if (await block.count()) await sectionTitle(name).click()
        await block.waitFor({ state: 'detached' })
      }
      const box = await sectionTitle('Team Stroke Play').boundingBox()
      if (!box || box.y + box.height > VIEWPORT.height / 2) throw new Error('Team Stroke Play is not near the top of the viewport')
    }
  },
  {
    name: 'game-picker',
    path: ids => `/scorecards/${ids.f1Scorecard}/games/new`,
    async prepare (page) {
      await page.getByText('Team Count X').first().waitFor()
    }
  },
  {
    name: 'game-nassau-scorecard',
    path: ids => `/scorecards/${ids.f1Scorecard}`,
    async prepare (page) {
      await showGameColumn(page, 'Nassau', 'Nassau')
    }
  },
  {
    name: 'game-nassau-leaderboard',
    path: ids => `/scorecards/${ids.f1Scorecard}/leaderboard`,
    async prepare (page) {
      await assertSideGamesReconcile(page)
      await expandSection(page, 'Nassau')
      await section(page, 'Nassau').getByText('Holes 1 - 9').waitFor()
      await scrollBelowHeader(sectionTitle(page, 'Nassau'))
    }
  },
  {
    name: 'game-skins-scorecard-carryover',
    path: ids => `/scorecards/${ids.f1Scorecard}`,
    async prepare (page) {
      await showGameColumn(page, 'Net Skins', 'Skins')
      await page.getByText('3 Ties').first().waitFor()
      // Holes 3-10: outright skins, the hole 5 and 6 ties, Bob's three-skin
      // carryover win on 7, Bert on 8 and the new tie on 9.
      await scrollBelowHeader(holeRow(page, 3), 0)
    }
  },
  {
    name: 'game-skins-leaderboard-hole-by-hole',
    path: ids => `/scorecards/${ids.f1Scorecard}/leaderboard`,
    async prepare (page) {
      await assertSideGamesReconcile(page)
      await expandSection(page, 'Skins')
      const skins = section(page, 'Skins')
      const show = skins.getByText('Show hole-by-hole', { exact: true })
      if (await show.count()) await show.click()
      await skins.getByText('hide summary', { exact: true }).waitFor()
      await scrollBelowHeader(sectionTitle(page, 'Skins'))
    }
  },
  {
    name: 'overall-side-games-accounting',
    path: ids => `/scorecards/${ids.f1Scorecard}/leaderboard`,
    async prepare (page) {
      await assertSideGamesReconcile(page)
      // Provisional totals: the round is still in progress.
      await page.getByText('Round in progress', { exact: true }).first().waitFor()
      // Collapse the three game sections (normal chevron taps) so the
      // consolidated block appears with the games it combines listed above.
      const games = (await page.locator('.games-group .title').allInnerTexts()).map(t => t.trim())
      for (const game of games) await collapseSection(page, game)
      await expandSection(page, 'Overall - side games')
      await section(page, 'Overall - side games').getByText('Who pays whom.').waitFor()
      await scrollBelowHeader(page.getByText('Round in progress', { exact: true }).first())
    }
  },
  {
    name: 'handicaps-scorecard-indicators',
    path: ids => `/scorecards/${ids.f1Scorecard}`,
    async prepare (page) {
      // Net Skins uses full handicaps, so Edward's +1 shows as a "+" on the
      // easiest hole (17); the Nassau and Wolf tabs play off the low ball.
      await showGameColumn(page, 'Net Skins', 'Skins')
      await scrollBelowHeader(holeRow(page, 11), 0)
      await holeRow(page, 17).locator('td.scorecard-score', { hasText: '+' }).first().waitFor()
    }
  },
  {
    name: 'event-games-skins-settings',
    path: ids => `/events/${ids.f4Event}`,
    async prepare (page) {
      // Opens the event's Skins game for editing; nothing is saved.
      const skinsGame = section(page, 'Games').locator('.BlockItem.clickable').filter({ has: page.locator('.tile.skins') })
      await skinsGame.evaluate(el => el.scrollIntoView({ block: 'center' }))
      await skinsGame.click()
      await page.waitForURL(/\/events\/[^/]+\/games\/[^/]+\/edit$/)
      await page.getByText('Players (16)').waitFor()
      // The Players block cannot be collapsed in Vue, so scroll to the Skins
      // Settings block; the fixed "Skins" title band stays in view.
      const settings = sectionTitle(page, 'Settings')
      await scrollBelowHeader(settings)
      const settingsBlock = section(page, 'Settings')
      await settingsBlock.getByText('Winners split the pot by number of skins won').waitFor()
      const footerTop = await page.locator('.sticky-footer').last().evaluate(el => el.getBoundingClientRect().top)
      const blockBottom = await settingsBlock.evaluate(el => el.getBoundingClientRect().bottom)
      if (blockBottom > footerTop) throw new Error('Skins Settings block is hidden behind the Save footer')
    }
  },
  {
    name: 'event-complete-confirm',
    path: ids => `/events/${ids.f4Event}`,
    async prepare (page) {
      // Opens the confirmation only; "Yes" is never pressed.
      await page.getByText('PebblePayday').first().waitFor()
      const prompt = page.getByText('Complete this event', { exact: true })
      if (!(await prompt.count())) await page.locator('.sticky-footer').getByText('Complete event', { exact: true }).click()
      await prompt.waitFor()
    }
  },
  {
    // Must stay last: confirming Lone Wolf saves the hole 6 decision.
    name: 'game-wolf-partner-modal',
    mayWrite: true,
    path: ids => `/scorecards/${ids.f1Scorecard}`,
    async prepare (page) {
      await showGameColumn(page, 'Wolf', 'Wolf')
      await holeRow(page, 6).locator('.wolf-content.clickable').click()
      await page.getByText('Wolf: Hole #6').waitFor()
      const loneWolf = page.locator('.player-option').filter({ hasText: /^\s*Lone Wolf\s*$/ })
      if (!(await loneWolf.locator('.checkbox.checked').count())) await loneWolf.click()
      await loneWolf.locator('.checkbox.checked').waitFor()
    }
  }
]
