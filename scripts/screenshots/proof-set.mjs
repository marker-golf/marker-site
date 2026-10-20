// Proof set for the Vue screenshot pipeline (34 images). The event game
// picker reuses game-picker: Vue's event route shows the same picker. Each shot names the
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

// The capture fixes the browser clock, which freezes Date.now(); debounced
// inputs (lodash debounce measures elapsed time with Date.now) would never
// fire. Moving the fixed time forward lets pending debounces run; inputs that
// chain two debounces need more than one step, so step until `expected`
// appears (at most five one-second steps).
async function letDebounceRun (page, expected) {
  for (let step = 0; step < 5; step++) {
    const now = await page.evaluate(() => Date.now())
    await page.clock.setFixedTime(new Date(now + 1000))
    try {
      await expected.waitFor({ timeout: 2000 })
      return
    } catch (error) { /* another debounce is still pending */ }
  }
  await expected.waitFor({ timeout: 1000 })
}

// Players added in the event-setup captures (F5B): recent partners who are
// not yet in the event, including one woman so both tee pickers appear.
const EVENT_NEW_PLAYERS = ['Debbie Dogleg', 'Larry Lateral', 'Mike Mulligan']
const EVENT_GROUP_PLAYERS = ['Allan Albatross', 'Ben Birdie', 'Bert Bailout', 'Dave Divot']

async function selectRecentPlayers (page, names) {
  const recent = section(page, 'Recent Players')
  for (const name of names) {
    const [first, last] = name.split(' ')
    const item = recent.locator('.BlockItem').filter({ hasText: new RegExp(`^\\s*${first}\\s+${last}\\s*$`) })
    if (!(await item.locator('.checkedSquare').count())) await item.click()
    await item.locator('.checkedSquare').waitFor()
  }
}

// A <select> identified by its visible label text.
const labelledSelect = (page, label) => page.locator('label', { hasText: new RegExp(`^\\s*${label.replace(/[()]/g, '\\$&')}\\s*$`) }).locator('xpath=..').locator('select')

// Presses a ButtonGroup option only if it is not already active.
async function chooseButton (page, text) {
  const option = page.locator('.button-group > div').filter({ hasText: new RegExp(`^\\s*${text}\\s*$`) })
  if (!(await option.evaluate(el => el.classList.contains('active')))) await option.click()
  await page.locator('.button-group > div.active').filter({ hasText: new RegExp(`^\\s*${text}\\s*$`) }).waitFor()
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
    name: 'game-scotch-action-modal',
    path: ids => `/scorecards/${ids.f2Scorecard}`,
    async prepare (page) {
      await showGameColumn(page, 'Scotch: 1 - 18', 'Scotch')
      // Hole 8: Harry's KP and Harry and Kevin's match press are stored in the
      // fixture; opening the modal only reads them (no write).
      const gameCell = holeRow(page, 8).locator('td').last()
      await gameCell.getByText('2x').first().waitFor()
      await gameCell.click()
      await page.getByText('Scotch: Hole #8', { exact: true }).waitFor()
      await page.getByText('Closest to Pin (KP)', { exact: true }).waitFor()
      const option = name => page.locator('.player-option').filter({ hasText: name })
      await option('Harry Hazard').locator('.checkbox.checked').waitFor()
      await option('Match Press').locator('.checkbox.checked').waitFor()
    }
  },
  {
    name: 'game-scotch-scorecard',
    path: ids => `/scorecards/${ids.f2Scorecard}/leaderboard`,
    async prepare (page, ids) {
      // F2 accounting must reconcile before its scorecards are captured.
      await assertSideGamesReconcile(page)
      await page.goto(`${new URL(page.url()).origin}/scorecards/${ids.f2Scorecard}`, { waitUntil: 'networkidle' })
      await showGameColumn(page, 'Scotch: 1 - 18', 'Scotch')
      // Holes 2-8: Bob's birdie KP on 3, the running points and the match
      // press from 8 (2x).
      await scrollBelowHeader(holeRow(page, 2), 0)
      await holeRow(page, 8).getByText('(match)').waitFor()
    }
  },
  {
    name: 'game-match-play-scorecard',
    path: ids => `/scorecards/${ids.f2Scorecard}`,
    async prepare (page) {
      await showGameColumn(page, 'Matchplay: 1 - 18', 'Match Play')
      // Holes 3-9: Bob and Greg go 2 up, the first automatic press starts on
      // 4 ("auto"), a second on 8, so three bets run at once.
      await scrollBelowHeader(holeRow(page, 3), 0)
      await holeRow(page, 4).getByText('auto').waitFor()
    }
  },
  {
    name: 'end-round-confirm',
    path: ids => `/scorecards/${ids.f3Scorecard}`,
    async prepare (page) {
      // Opens Vue's End round sheet only; it is never confirmed here.
      const attest = page.getByText('By ending this round, you attest that the scores are correct.')
      if (!(await attest.count())) await page.getByRole('button', { name: 'End round', exact: true }).first().click()
      await attest.waitFor()
    }
  },
  {
    name: 'event-course-search',
    path: () => '/events/new',
    mocks: ['course-search'],
    async prepare (page) {
      // New event, step 1: search for the course. The search response is the
      // isolated Hub's recorded answer (see fixtures/event-setup-f5.json).
      await page.getByText('Select course', { exact: true }).waitFor()
      await page.getByPlaceholder('Search courses').fill('sp')
      await letDebounceRun(page, page.getByText('2 matching courses', { exact: true }))
      await page.locator('.BlockItem.clickable').filter({ hasText: 'Spyglass Hill GC' }).waitFor()
    }
  },
  {
    name: 'event-form-filled',
    path: () => '/events/new',
    mocks: ['course-search'],
    async prepare (page) {
      // Course chosen, name and date filled; Save is never pressed.
      await page.getByPlaceholder('Search courses').fill('sp')
      await letDebounceRun(page, page.getByText('2 matching courses', { exact: true }))
      await page.locator('.BlockItem.clickable').filter({ hasText: 'Spyglass Hill GC' }).click()
      await page.locator('input[name="name"]').fill('Monterey Summer Shootout')
      await page.locator('input[name="date"]').fill('2026-07-25')
      await page.getByRole('button', { name: 'Save', exact: true }).waitFor()
      if (await page.locator('input[name="date"]').inputValue() !== '2026-07-25') throw new Error('Event date was not set')
      await page.locator('input[name="date"]').blur() // no focus ring in the capture
    }
  },
  {
    name: 'event-empty-dashboard',
    path: ids => `/events/${ids.f5aEvent}`,
    async prepare (page) {
      await page.getByText('Poppy Hills Spring Classic').first().waitFor()
      await sectionTitle(page, 'Players \\(0\\)').waitFor()
      await sectionTitle(page, 'Scorecards').waitFor()
      await sectionTitle(page, 'Games').waitFor()
    }
  },
  {
    name: 'event-add-players-picker',
    path: ids => `/events/${ids.f5bEvent}/players/select`,
    async prepare (page) {
      // Select three recent players (local selection only; Continue is not pressed).
      await page.getByText('Recent Players', { exact: true }).waitFor()
      await selectRecentPlayers(page, EVENT_NEW_PLAYERS)
      await page.getByText(`${EVENT_NEW_PLAYERS.length} selected players`, { exact: true }).waitFor()
    }
  },
  {
    name: 'event-add-players-tees',
    path: ids => `/events/${ids.f5bEvent}/players/select`,
    async prepare (page) {
      // Continue moves to Vue's Set Player Tees step without saving; Save is
      // never pressed.
      await page.getByText('Recent Players', { exact: true }).waitFor()
      await selectRecentPlayers(page, EVENT_NEW_PLAYERS)
      await page.getByRole('button', { name: 'Continue', exact: true }).click()
      await page.getByText('Set Player Tees', { exact: true }).waitFor()
      await page.getByRole('button', { name: 'Save', exact: true }).waitFor()
    }
  },
  {
    name: 'event-groups-tee-times',
    path: ids => `/events/${ids.f5bEvent}/groups/new`,
    async prepare (page) {
      // Four groups from 8:30 at 10-minute intervals; Save is never pressed.
      await page.getByText('Adjust group settings', { exact: true }).waitFor()
      await page.locator('input[name="teeTime"]').fill('08:30')
      await labelledSelect(page, 'Start hole').selectOption('1')
      await labelledSelect(page, 'Number of groups').selectOption('4')
      await chooseButton(page, 'Tee Times')
      await labelledSelect(page, 'Spacing (minutes)').selectOption('10')
      await page.locator('input[name="teeTime"]').blur()
      await page.getByRole('button', { name: 'Save (4)', exact: true }).waitFor()
    }
  },
  {
    name: 'event-groups-shotgun',
    path: ids => `/events/${ids.f5bEvent}/groups/new`,
    async prepare (page) {
      // Shotgun start at 8:00 across holes 1-6; Save is never pressed. (Start
      // hole 1 keeps Vue's preview accurate: the preview text does not wrap
      // past hole 18, although the groups it creates do.)
      await page.getByText('Adjust group settings', { exact: true }).waitFor()
      await page.locator('input[name="teeTime"]').fill('08:00')
      await labelledSelect(page, 'Start hole').selectOption('1')
      await labelledSelect(page, 'Number of groups').selectOption('6')
      await chooseButton(page, 'Shotgun Start')
      await page.locator('input[name="teeTime"]').blur()
      await page.getByText('This will add groups starting at 08:00 AM on holes: 1, 2, 3, 4, 5, 6', { exact: true }).waitFor()
    }
  },
  {
    name: 'event-group-assign-players',
    path: ids => `/events/${ids.f5bEvent}/groups/${ids.f5bGroups[0]}/edit`,
    async prepare (page) {
      // Tick four of the nine unassigned players. In Vue this only changes the
      // screen until Save, which is never pressed.
      await page.getByText('Edit Event Scorecard', { exact: true }).waitFor()
      const players = section(page, 'Players')
      for (const name of EVENT_GROUP_PLAYERS) {
        const row = players.locator('.BlockItem').filter({ hasText: name })
        if (!(await row.locator('.checkedSquare').count())) await row.click()
        await row.locator('.checkedSquare').waitFor()
      }
      await scrollBelowHeader(sectionTitle(page, 'Players'))
    }
  },
  {
    // Serves both Home slots (createScorecardNewGame, welcomeMarkerHome).
    name: 'home-recent-games',
    path: () => '/',
    async prepare (page) {
      await page.getByText('Bob Smith', { exact: true }).first().waitFor()
      await page.getByText('New Game', { exact: true }).waitFor()
      await page.getByText('Recent scorecards', { exact: true }).waitFor()
      await page.getByText('Recent events', { exact: true }).waitFor()
    }
  },
  {
    name: 'scorecard-course-search',
    path: () => '/scorecards/new',
    mocks: ['scorecard-course-search'],
    async prepare (page) {
      // New game, step 1: search for the course (recorded Hub response).
      await page.getByText('Select course', { exact: true }).waitFor()
      await page.getByPlaceholder('Search courses').fill('shinn')
      await letDebounceRun(page, sectionTitle(page, '1 matching course'))
      await page.locator('.BlockItem.clickable').filter({ hasText: 'Shinnecock Hills Golf Club' }).waitFor()
      await page.getByPlaceholder('Search courses').blur()
    }
  },
  {
    name: 'scorecard-add-self',
    path: ids => `/scorecards/${ids.f6Scorecard}/players/new?userId=${ids.bobUserId}`,
    async prepare (page) {
      // Where Vue lands after creating a scorecard: Add Player prefilled with
      // the signed-in golfer. Save is never pressed.
      await page.getByText('Adjust player settings', { exact: true }).waitFor()
      await page.waitForFunction(() => document.querySelector('input[placeholder="First"]')?.value === 'Bob')
      await page.getByText('Handicap Settings', { exact: true }).waitFor()
    }
  },
  {
    name: 'scorecard-partner-picker',
    path: ids => `/scorecards/${ids.f6Scorecard}/players/select`,
    async prepare (page) {
      // Recent partners, most recent first; Bob is already on the card.
      await page.getByText('Recent partners', { exact: true }).waitFor()
      if (await section(page, 'Recent partners').getByText('Bob Smith', { exact: true }).count()) {
        throw new Error('Recent partners lists a player who is already on the scorecard')
      }
    }
  },
  {
    name: 'scorecard-invite-player',
    path: ids => `/scorecards/${ids.f6Scorecard}/players/new`,
    async prepare (page) {
      // Blank Add Player form; nothing is entered or saved.
      await page.getByText('Add / find by mobile number (optional)').first().waitFor()
      const phone = page.getByPlaceholder('enter US phone number')
      if (await phone.inputValue() !== '' || await page.getByPlaceholder('First').inputValue() !== '') throw new Error('Invite form is not blank')
      await phone.blur() // no focus ring in the capture
    }
  },
  {
    name: 'nassau-configuration',
    path: ids => `/scorecards/${ids.f1Scorecard}/games/${ids.f1Games.Nassau}/edit`,
    async prepare (page) {
      // F1's Nassau: per-match automatic presses and stakes. Save is never pressed.
      await sectionTitle(page, 'Match: 1 - 9').waitFor()
      await scrollBelowHeader(sectionTitle(page, 'Match: 1 - 9'))
      await section(page, 'Match: 1 - 18').getByText('Enter the amount per match.').waitFor()
    }
  },
  {
    name: 'handicap-advanced-settings',
    path: ids => `/scorecards/${ids.f1Scorecard}/games/${ids.f1Games.Nassau}/edit`,
    async prepare (page) {
      // Opens the advanced handicap controls (a display toggle; Save is never pressed).
      if (await page.getByText('show advanced', { exact: true }).count()) await page.getByText('show advanced', { exact: true }).click()
      await page.getByText('Handicap Allowance', { exact: true }).waitFor()
      await page.getByText('Stroke off of low ball').waitFor()
    }
  },
  {
    name: 'profile-edit',
    path: () => '/profile/edit',
    async prepare (page) {
      // Fictional Bob only: 000-555 phone, example.com email, no USGA ID.
      await page.getByText('Update profile information', { exact: true }).waitFor()
      await page.waitForFunction(() => [...document.querySelectorAll('input')].some(i => i.value.includes('example.com')))
      const values = await page.locator('input').evaluateAll(inputs => inputs.map(i => i.value))
      if (!values.some(v => /\(000\) 555-0001/.test(v))) throw new Error('Profile phone is not the fictional 000-555 number')
      if (values.some(v => /@/.test(v) && !/@example\.com$/.test(v))) throw new Error('Profile shows a non-example.com email')
      if (await page.getByPlaceholder('e.g. GHIN #').inputValue() !== '') throw new Error('Profile shows a USGA Handicap ID')
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
  },
  {
    // Must stay last: confirms End round on F3, which locks that scorecard.
    name: 'final-settlement-completed-round',
    path: ids => `/scorecards/${ids.f3Scorecard}`,
    mayWrite: true,
    locks: ['f3'],
    async prepare (page) {
      await page.getByRole('button', { name: 'End round', exact: true }).first().click()
      const sheet = page.getByText('By ending this round, you attest that the scores are correct.').locator('xpath=ancestor::*[.//button][1]')
      await sheet.waitFor()
      const locked = page.waitForResponse(response => /\/api\/app\/scorecards\/[^/]+$/.test(new URL(response.url()).pathname) && response.request().method() === 'PUT')
      await sheet.getByRole('button', { name: 'End round', exact: true }).click()
      if ((await locked).status() !== 200) throw new Error('End round did not lock the scorecard')
      await page.locator('.right > .leaderboard').click() // the trophy button beside the game tabs
      await page.waitForURL(/\/leaderboard$/)
      await section(page, 'Overall - side games').getByText('Who pays whom.').waitFor()
      if (await page.getByText('Round in progress', { exact: true }).count()) throw new Error('Leaderboard still shows the round in progress')
      // Final transfers must reconcile with every game, to the cent.
      await assertSideGamesReconcile(page)
      // Collapse the game sections so the final settlement is in view under
      // the games it combines.
      const games = (await page.locator('.games-group .title').allInnerTexts()).map(t => t.trim())
      for (const game of games) await collapseSection(page, game)
      await expandSection(page, 'Overall - side games')
    }
  }
]
