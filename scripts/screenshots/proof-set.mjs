// Six-image proof set for the Vue screenshot pipeline. Each shot names the
// draft output file, the route to open and the steps that produce the state.
// Draft names never collide with existing Expo assets.
//
// Selectors are semantic: game tabs are only clicked when their column is not
// already shown (tabs toggle), Wolf holes are found by hole number, and the
// Lone Wolf option is only clicked when it is not already checked.

import { VIEWPORT } from './lib/config.mjs'

// Shows the scorecard column for one game (tabs toggle, so click only if needed).
async function showGameColumn (page, tabTitle, columnTitle) {
  const column = page.locator('th.game-summary').filter({ hasText: new RegExp(`^\\s*${columnTitle}\\s*$`) })
  const tab = page.locator('.GameButton').filter({ has: page.locator('.title', { hasText: new RegExp(`^\\s*${tabTitle}\\s*$`) }) })
  await tab.first().waitFor()
  if (!(await column.count())) await tab.first().click()
  await column.first().waitFor()
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
    // Must stay last: confirming Lone Wolf saves the hole 6 decision.
    name: 'game-wolf-partner-modal',
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
