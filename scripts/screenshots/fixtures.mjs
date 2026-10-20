// Builds the proof-set fixtures through the isolated Hub's REST API, signed in
// as the fictional demo user. Requires a freshly reset fourball_screens (the
// "reset" fixture-state marker for this exact database build, and no events or
// scorecards), which makes every run produce identical data.

import fs from 'node:fs'
import path from 'node:path'
import { log, httpErrorSummary } from './lib/proc.mjs'
import { assertSafeDatabaseTarget, screensSql } from './lib/guards.mjs'
import { requireFreshReset, markFixturesReady } from './lib/state.mjs'
import { API_BASE, API_TIMEOUT, AUTH_STATE, FIXTURE_IDS, SCRIPTS_DIR } from './lib/config.mjs'

const readFixture = name => JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'fixtures', name), 'utf8'))
const { users } = readFixture('users.json')
const f1 = readFixture('shinnecock-f1.json')
const f4 = readFixture('pebblepayday-f4.json')
const userByKey = Object.fromEntries(users.map(u => [u.key, u]))

const token = JSON.parse(fs.readFileSync(AUTH_STATE, 'utf8')).origins[0].localStorage
  .find(i => i.name === 'auth.jwt').value

// Errors carry only the method, path, status and a redacted first line of
// the response (see httpErrorSummary); request bodies are never included.
async function api (method, url, body) {
  let res
  try {
    res = await fetch(`${API_BASE}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.fourball.v2+json',
        Authorization: `Bearer ${token}`
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(API_TIMEOUT)
    })
  } catch (error) {
    throw new Error(`${method} ${url} -> ${error.name === 'TimeoutError' ? `no response within ${API_TIMEOUT / 1000}s` : 'request failed'}`)
  }
  const text = await res.text()
  if (res.status >= 300) throw new Error(httpErrorSummary(method, url, res.status, text))
  return text ? JSON.parse(text) : null
}

function idOf (response, key) {
  const id = response?.[key]?.id ?? response?.data?.id ?? response?.id
  if (!id) throw new Error(`No id in ${key} response: ${JSON.stringify(response).slice(0, 300)}`)
  return id
}

function teeId (courseId, { name, gender }) {
  const id = screensSql(`select id from tee_set_ratings_v2 where course_v2_id = '${courseId}' and name = '${name}' and gender = '${gender}' and holes_number = 18`)
  if (!/^[0-9a-f-]{36}$/.test(id)) throw new Error(`Tee ${name}/${gender} not found for ${courseId}`)
  return id
}

const holeCache = new Map()
function holes (courseId, tee) {
  const cacheKey = `${courseId}/${tee.name}/${tee.gender}`
  if (!holeCache.has(cacheKey)) holeCache.set(cacheKey, loadHoles(courseId, tee))
  return holeCache.get(cacheKey)
}

function loadHoles (courseId, tee) {
  return screensSql(`select n.number || ':' || h.par || ':' || n.handicap from tee_set_holes_v2 n join holes_v2 h on h.id = n.hole_v2_id where n.tee_set_rating_v2_id = '${teeId(courseId, tee)}' order by n.number`)
    .split('\n').map(line => { const [number, par, handicap] = line.split(':').map(Number); return { number, par, handicap } })
}

function playerParams (key, ratingId, extra) {
  const u = userByKey[key]
  return {
    user_id: u.id, rating_id: ratingId, handicap_index: u.handicapIndex,
    first_name: u.firstName, last_name: u.lastName, gender: u.gender, deleted: false, ...extra
  }
}

const HANDICAP_DEFAULTS = {
  max_strokes: null, half_strokes: false, use_handicap: true, base_rating_id: null,
  handicap_overrides: [], percent_of_handicap: 100, use_handicap_overrides: false,
  suppress_strokes_on_par3: false
}

// Deterministic PRNG (mulberry32) for generated event scores.
function prng (seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Gross score = par + every stroke the player receives on the hole (or gives
// back, for plus handicaps) + a net-of-par variation averaging about +0.3, so
// every player lands a few strokes over their handicap like a typical round.
function generatedGross (random, par, handicapIndex, holeHandicap) {
  const courseHandicap = Math.round(handicapIndex * 1.15)
  const strokes = Math.abs(courseHandicap)
  let received = Math.floor(strokes / 18) + (holeHandicap <= strokes % 18 ? 1 : 0)
  if (courseHandicap < 0) received = holeHandicap > 18 - strokes ? -1 : 0
  const r = random()
  const delta = r < 0.10 ? -1 : r < 0.62 ? 0 : r < 0.90 ? 1 : 2
  return Math.max(2, par + received + delta)
}

async function postScore (playerId, holeNumber, score, timestamp) {
  await api('POST', 'scores', { score: { player_id: playerId, hole_number: holeNumber, score, timestamp } })
}

// --------------------------------------------------------------------------
assertSafeDatabaseTarget()
requireFreshReset()
if (screensSql('select (select count(*) from events) + (select count(*) from scorecards)') !== '0') {
  throw new Error('Refusing: fourball_screens is not freshly reset (run db-reset first)')
}

// F1: Shinnecock standalone scorecard -------------------------------------
const f1Card = idOf(await api('POST', 'scorecards', {
  scorecard: { course_id: f1.course.courseId, date: f1.date, start_hole: f1.startHole }
}), 'scorecard')

const f1Players = {}
for (const p of f1.players) {
  const params = playerParams(p.user, teeId(f1.course.courseId, p.tee), { scorecard_id: f1Card })
  f1Players[p.user] = idOf(await api('POST', 'players', { player: params }), 'player')
}
const ids = keys => keys.map(k => f1Players[k])

for (const g of f1.games) {
  let settings
  if (g.game === 'Nassau') {
    settings = {
      // Per-match accounting, as Vue's Nassau form creates it (Vue offers no
      // pool option for Nassau; a pool here would turn match results into
      // pot payouts and invent buy-ins).
      game: 'Nassau', balls: [{ start: 1, end: 18, net: 1, gross: 0 }], stroke_off_low_ball: true, ...HANDICAP_DEFAULTS,
      accounting: { amount: null, is_pool: false },
      matches: g.matches.map(m => ({
        sides: { left: ids(g.sides.left), right: ids(g.sides.right) },
        accounting: { amount: m.amount, is_pool: false },
        press_settings: { auto: { down: m.autoPressDown, enabled: m.autoPressDown > 0 }, manual: {}, close_out: false, hole_presses: {} },
        stipulated_round: { start: m.start, end: m.end }
      }))
    }
  } else if (g.game === 'Skins') {
    settings = {
      game: 'Skins', accounting: { amount: g.amount, is_pool: false }, carry_ties: g.carryTies,
      use_validations: false, stipulated_round: { start: 1, end: 18 }, stroke_off_low_ball: false, ...HANDICAP_DEFAULTS
    }
  } else if (g.game === 'Wolf') {
    settings = {
      game: 'Wolf', accounting: { amount: g.amount }, wolf_order: ids(g.order), stroke_off_low_ball: true, ...HANDICAP_DEFAULTS,
      wolf_holes: Object.fromEntries(Object.entries(g.picks).map(([hole, pick]) => [hole, { blind: false, partner_id: f1Players[pick.partner] }]))
    }
  }
  await api('POST', 'games', { game: { settings, game_players: ids(g.players).map(id => ({ player_id: id })) } })
}

const f1HolesScored = f1.scores.bob.length
let clock = Date.parse(`${f1.date}T08:00:00-04:00`)
for (let hole = 1; hole <= f1HolesScored; hole++) {
  for (const [key, scores] of Object.entries(f1.scores)) {
    await postScore(f1Players[key], hole, scores[hole - 1], clock)
    clock += 15000
  }
  clock += 12 * 60000
}
log(`F1 scorecard ready: 4 players, ${f1.games.length} games, holes 1-${f1HolesScored} scored`)

// F4: PebblePayday event ---------------------------------------------------
const eventId = idOf(await api('POST', 'events', {
  event: { name: f4.name, date: f4.date, course_id: f4.course.courseId }
}), 'event')

const tees = {
  male: teeId(f4.course.courseId, f4.tees.male),
  female: teeId(f4.course.courseId, f4.tees.female)
}
const eventPlayers = {}
for (const group of f4.groups) {
  for (const key of group.players) {
    const params = playerParams(key, tees[userByKey[key].gender], { event_id: eventId })
    eventPlayers[key] = idOf(await api('POST', 'players', { player: params }), 'player')
  }
}

const groupCards = []
for (const group of f4.groups) {
  const card = idOf(await api('POST', 'scorecards', {
    scorecard: { event_id: eventId, course_id: f4.course.courseId, date: f4.date, tee_time: group.teeTime, start_hole: group.startHole },
    player_ids: group.players.map(k => eventPlayers[k])
  }), 'scorecard')
  groupCards.push(card)
}

const allEventPlayerIds = f4.groups.flatMap(g => g.players.map(k => eventPlayers[k]))
const teams = f4.groups.map(g => ({ members: g.players.map(k => ({ player_id: eventPlayers[k] })) }))
for (const g of f4.games) {
  let settings
  if (g.game === 'Skins') {
    settings = { game: 'Skins', accounting: { amount: g.amount, is_pool: g.isPool }, carry_ties: g.carryTies, use_validations: false, stipulated_round: { start: 1, end: 18 }, stroke_off_low_ball: false, ...HANDICAP_DEFAULTS }
  } else if (g.game === 'Stroke Play') {
    settings = { game: 'Stroke Play', accounting: { amount: g.amount, is_pool: g.isPool, payouts: [] }, stroke_off_low_ball: false, ...HANDICAP_DEFAULTS }
  } else if (g.game === 'Team Stroke Play') {
    settings = {
      game: 'Team Stroke Play', balls: [{ start: 1, end: 18, net: g.netBalls, gross: 0 }], teams, stroke_off_low_ball: false, ...HANDICAP_DEFAULTS,
      sub_totals: [
        { start: 1, end: 18, primary: true, accounting: { amount: g.amount, is_pool: true, payouts: [] } },
        { start: 1, end: 9, primary: false, accounting: { amount: g.amount / 2, is_pool: true, payouts: [] } },
        { start: 10, end: 18, primary: false, accounting: { amount: g.amount / 2, is_pool: true, payouts: [] } }
      ]
    }
  } else if (g.game === 'Team Stableford') {
    settings = {
      game: 'Team Stableford', balls: [{ start: 1, end: 18, net: g.netBalls, gross: 0 }], teams, quota: false, quota_points: 36,
      points: { double_eagle: 5, eagle: 4, birdie: 3, par: 2, bogey: 1, double_bogey: 0, triple_bogey: 0 },
      stroke_off_low_ball: false, ...HANDICAP_DEFAULTS,
      sub_totals: [{ start: 1, end: 18, primary: true, accounting: { amount: g.amount, is_pool: true, payouts: [] } }]
    }
  }
  await api('POST', 'games', { game: { event_id: eventId, settings, game_players: allEventPlayerIds.map(id => ({ player_id: id })) } })
}

await api('PUT', `events/${eventId}/publish`)

const random = prng(f4.scoreSeed)
for (const [index, group] of f4.groups.entries()) {
  let t = Date.parse(`${f4.date}T${group.teeTime}:00-07:00`)
  for (let hole = 1; hole <= group.holesPlayed; hole++) {
    for (const key of group.players) {
      const tee = userByKey[key].gender === 'female' ? f4.tees.female : f4.tees.male
      const layout = holes(f4.course.courseId, tee)[hole - 1]
      await postScore(eventPlayers[key], hole, generatedGross(random, layout.par, userByKey[key].handicapIndex, layout.handicap), t)
      t += 10000
    }
    t += 13 * 60000
  }
  log(`F4 group ${index + 1} (${group.teeTime}) scored through ${group.holesPlayed}`)
}
log(`F4 event ready: ${allEventPlayerIds.length} players, ${groupCards.length} groups, ${f4.games.length} games`)

// Hygiene: publishing and sharing issue login codes to fixture users. Clear
// them so the isolated database holds no usable login codes.
screensSql('update users set code = null where code is not null')

// Known limitation: some Hub queries return players without ORDER BY (for
// example the array_agg behind group player names, and game player lists), so
// the order of names, Wolf partner buttons, tied leaderboard rows and the
// counting-ball tick on tied holes can differ between builds. Every variant is
// a genuine rendering of the production app.

fs.mkdirSync(path.dirname(FIXTURE_IDS), { recursive: true })
fs.writeFileSync(FIXTURE_IDS, JSON.stringify({ f1Scorecard: f1Card, f1Players, f4Event: eventId, f4Scorecards: groupCards }, null, 2))
log(`fixture ids written to ${FIXTURE_IDS}`)
markFixturesReady()
