// Fixture-state marker. Ties captures to one specific database rebuild and
// one version of the fixture definitions, so a capture can never run silently
// against stale or already-mutated data (captures change state, for example
// the Wolf partner modal saves a Lone Wolf decision).
//
//   db-reset  -> stage "reset"          (database OID of the new fourball_screens)
//   fixtures  -> stage "fixtures-ready" (same OID, fixture definition hash)
//   capture   -> stage "captured"       (claimed before any recipe runs)
//
// fixtures also records a digest of every fixture (scores, game settings and
// lock state; for events also players, tee assignments and groups) and a
// per-row snapshot of the tables fixtures live in. Before any draft is
// published, capture compares both again: every fixture must be unchanged and
// unlocked, except fixtures a recipe declares it locks (F3, End round; F7,
// Complete event), which must be fully locked and finalized; and the only rows
// that may differ at all are those fixtures' own scorecard, event and game
// rows.

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { screensSql } from './guards.mjs'
import { FIXTURE_STATE, SCRIPTS_DIR, SCREENS_DB } from './config.mjs'

export const screensDbOid = () => screensSql(`select oid from pg_database where datname = '${SCREENS_DB}'`)

export function fixtureDefinitionHash () {
  const files = ['fixtures.mjs', ...fs.readdirSync(path.join(SCRIPTS_DIR, 'fixtures')).sort().map(f => `fixtures/${f}`)]
  const hash = crypto.createHash('sha256')
  for (const file of files) hash.update(file).update(fs.readFileSync(path.join(SCRIPTS_DIR, file)))
  return hash.digest('hex')
}

const read = () => fs.existsSync(FIXTURE_STATE) ? JSON.parse(fs.readFileSync(FIXTURE_STATE, 'utf8')) : null
const write = state => {
  fs.mkdirSync(path.dirname(FIXTURE_STATE), { recursive: true })
  fs.writeFileSync(FIXTURE_STATE, JSON.stringify({ ...state, updatedAt: new Date().toISOString() }, null, 2))
}

function requireStage (stage) {
  const state = read()
  const oid = screensDbOid()
  if (!state || state.stage !== stage || state.dbOid !== oid) {
    throw new Error(`Refusing: fixture state is ${state ? `"${state.stage}"` : 'missing'} for ${state?.dbOid === oid ? 'this' : 'a different'} database build; expected "${stage}". Run the full pipeline (npm run screens:proof) or db-reset + fixtures first.`)
  }
  return { state, oid }
}

export const markReset = () => write({ stage: 'reset', dbOid: screensDbOid() })

const uuid = id => {
  if (!/^[0-9a-f-]{36}$/.test(id)) throw new Error(`Invalid id ${id}`)
  return `'${id}'`
}

function scorecardDigest (id) {
  const [scores, games, locked] = screensSql(`select
    coalesce(md5(string_agg(p.id || ':' || s.hole_number || ':' || s.score, ',' order by p.id, s.hole_number)), '-'),
    (select coalesce(md5(string_agg(g.settings::text, ',' order by g.id)), '-') from games g where g.event_id is null and exists
      (select 1 from game_players gp join players gpp on gpp.id = gp.player_id where gp.game_id = g.id and gpp.scorecard_id = ${uuid(id)})),
    (select locked from scorecards where id = ${uuid(id)})
    from scores s join players p on p.id = s.player_id where p.scorecard_id = ${uuid(id)}`).split('|')
  return { scores, games, locked: locked === 't' }
}

function eventDigest (id) {
  const [scores, games, locked, lockedCards, players, groups, cards, summarized, gameCount] = screensSql(`select
    coalesce(md5(string_agg(p.id || ':' || s.hole_number || ':' || s.score, ',' order by p.id, s.hole_number)), '-'),
    (select coalesce(md5(string_agg(g.settings::text, ',' order by g.id)), '-') from games g where g.event_id = ${uuid(id)}),
    (select locked from events where id = ${uuid(id)}),
    (select count(*) from scorecards where event_id = ${uuid(id)} and locked),
    (select coalesce(md5(string_agg(ep.id || ':' || coalesce(ep.scorecard_id::text, '-') || ':' || coalesce(ep.rating_id::text, '-') || ':' || coalesce(ep.tee_set_rating_v2_id::text, '-'), ',' order by ep.id)), '-')
      from players ep where ep.event_id = ${uuid(id)}),
    (select coalesce(md5(string_agg(sc.id || ':' || coalesce(sc.tee_time::text, '-') || ':' || coalesce(sc.start_hole::text, '-') || ':' || coalesce(sc.published::text, '-'), ',' order by sc.id)), '-')
      from scorecards sc where sc.event_id = ${uuid(id)}),
    (select count(*) from scorecards where event_id = ${uuid(id)}),
    (select count(*) from games where event_id = ${uuid(id)} and summary is not null and summarized_at is not null),
    (select count(*) from games where event_id = ${uuid(id)})
    from scores s join players p on p.id = s.player_id where p.event_id = ${uuid(id)}`).split('|')
  // Players and groups count as the event's "games" for change detection.
  // Complete event locks the event and every group scorecard and stores
  // each game's final summary; "finalized" requires all three.
  return {
    scores,
    games: `${games}/${players}/${groups}`,
    locked: locked === 't' || lockedCards !== '0',
    finalized: locked === 't' && lockedCards === cards && cards !== '0' && summarized === gameCount && gameCount !== '0'
  }
}

// Fictional user records (profiles, handicap settings) and their premium
// state (subscriptions, which only the demo video adds and removes): the
// profile and partner screens read them and must not change them.
function usersDigest () {
  const rows = screensSql(`select coalesce(md5(string_agg(u.id || ':' || coalesce(u.phone, '-') || ':' || coalesce(u.email, '-') || ':' ||
    u.first_name || ':' || u.last_name || ':' || coalesce(u.gender, '-') || ':' || coalesce(u.ghin_number::text, '-') || ':' || coalesce(u.level::text, '-') || ':' ||
    coalesce((select string_agg(s.id || '/' || coalesce(s.status, '-') || '/' || coalesce(s.period_end::text, '-'), ';' order by s.id) from subscriptions s where s.user_id = u.id), 'free'),
    ',' order by u.id)), '-') from users u`)
  return { scores: rows, games: '-', locked: false }
}

export function fixtureDigests (ids) {
  return {
    users: usersDigest(),
    f1: scorecardDigest(ids.f1Scorecard),
    f2: scorecardDigest(ids.f2Scorecard),
    f3: scorecardDigest(ids.f3Scorecard),
    f6: scorecardDigest(ids.f6Scorecard),
    f4: eventDigest(ids.f4Event),
    f5a: eventDigest(ids.f5aEvent),
    f5b: eventDigest(ids.f5bEvent),
    f7: eventDigest(ids.f7Event)
  }
}

// Row-level audit of every table fixtures live in: id -> md5 of the whole row.
const AUDITED_TABLES = ['users', 'subscriptions', 'events', 'scorecards', 'players', 'game_players', 'games', 'scores']

export function recordSnapshot () {
  return Object.fromEntries(AUDITED_TABLES.map(table => {
    const rows = screensSql(`select coalesce(string_agg(t.id || '=' || md5(row_to_json(t)::text), ',' order by t.id), '') from ${table} t`)
    return [table, Object.fromEntries(rows ? rows.split(',').map(entry => entry.split('=')) : [])]
  }))
}

// Rows a locking recipe may change: the fixture's own scorecard / event and
// group scorecards (lock state) and its games (stored final summary).
function lockableRows (key, ids) {
  const list = sql => new Set(screensSql(sql).split('\n').filter(Boolean))
  if (key === 'f3') {
    return {
      scorecards: new Set([ids.f3Scorecard]),
      games: list(`select distinct gp.game_id from game_players gp join players p on p.id = gp.player_id where p.scorecard_id = ${uuid(ids.f3Scorecard)}`)
    }
  }
  if (key === 'f7') {
    return {
      events: new Set([ids.f7Event]),
      scorecards: list(`select id from scorecards where event_id = ${uuid(ids.f7Event)}`),
      games: list(`select id from games where event_id = ${uuid(ids.f7Event)}`)
    }
  }
  throw new Error(`No lockable rows defined for ${key}`)
}

function auditRows (before, ids, locked) {
  const allowed = {}
  for (const key of locked) {
    for (const [table, rows] of Object.entries(lockableRows(key, ids))) allowed[table] = new Set([...(allowed[table] || []), ...rows])
  }
  const now = recordSnapshot()
  const problems = []
  for (const table of AUDITED_TABLES) {
    const was = before[table] || {}
    const is = now[table]
    const added = Object.keys(is).filter(id => !(id in was))
    const removed = Object.keys(was).filter(id => !(id in is))
    const changed = Object.keys(is).filter(id => id in was && is[id] !== was[id])
    if (added.length) problems.push(`${added.length} row(s) added to ${table}`)
    if (removed.length) problems.push(`${removed.length} row(s) removed from ${table}`)
    const unexpected = changed.filter(id => !allowed[table]?.has(id))
    if (unexpected.length) problems.push(`${unexpected.length} unexpected change(s) in ${table}`)
  }
  return problems
}

// A completed event's stored results must reconcile on their own: for every
// pool game, the payouts in the finalized summary equal its buy-ins (buy-in
// times players, summed over its pots), with no negative payout; for any
// non-pool game, results sum to zero. Returns per-player totals in dollars,
// keyed by the player name Vue displays.
export function finalizedEventPositions (eventId) {
  const rows = screensSql(`select g.settings::text, g.summary::text, (select count(*) from game_players gp where gp.game_id = g.id)
    from games g where g.event_id = ${uuid(eventId)} order by g.id`).split('\n').filter(Boolean)
  const names = Object.fromEntries(screensSql(`select id || '|' || trim(first_name) || ' ' || trim(last_name) from players where event_id = ${uuid(eventId)}`)
    .split('\n').filter(Boolean).map(line => line.split('|')))
  const positions = {}
  const problems = []
  for (const row of rows) {
    const [settingsText, summaryText, players] = row.split('|')
    const settings = JSON.parse(settingsText)
    const summary = JSON.parse(summaryText)
    const pots = [settings.accounting, ...(settings.sub_totals || []).map(s => s.accounting), ...(settings.matches || []).map(m => m.accounting)]
      .filter(a => a?.is_pool && Number(a.amount) > 0)
    const buyIn = pots.reduce((sum, a) => sum + Number(a.amount), 0)
    const results = summary?.player_summaries || []
    if (!results.length) { problems.push(`${settings.game}: no stored player results`); continue }
    const paid = results.reduce((sum, r) => sum + Number(r.amount || 0), 0)
    if (buyIn > 0) {
      if (paid !== buyIn * Number(players)) problems.push(`${settings.game}: payouts ${paid} do not equal the pool ${buyIn * Number(players)}`)
      if (results.some(r => Number(r.amount || 0) < 0)) problems.push(`${settings.game}: negative pool payout`)
    } else if (paid !== 0) {
      problems.push(`${settings.game}: results sum to ${paid}, not zero`)
    }
    for (const r of results) {
      if (!names[r.player_id]) { problems.push(`${settings.game}: result for a player outside the event`); continue }
      const p = positions[names[r.player_id]] ||= { gross: 0, buyIn: 0 }
      p.gross += Number(r.amount || 0)
      p.buyIn += buyIn
    }
  }
  const net = Object.values(positions).reduce((sum, p) => sum + p.gross - p.buyIn, 0)
  if (net !== 0) problems.push(`player positions sum to ${net}, not zero`)
  if (problems.length) throw new Error(`Refusing to publish: finalized event results do not reconcile: ${problems.join('; ')}`)
  return positions
}

export function markFixturesReady (ids) {
  const { oid } = requireStage('reset')
  const digests = fixtureDigests(ids)
  if (Object.values(digests).some(d => d.locked)) throw new Error('Refusing: a fixture is locked straight after building')
  write({ stage: 'fixtures-ready', dbOid: oid, fixtureHash: fixtureDefinitionHash(), digests, rows: recordSnapshot() })
}

// After capture: scores and game settings are unchanged everywhere, a
// fixture is locked only if a selected recipe locks it (End round on F3,
// Complete event on F7), a locked event is fully finalized, and no row
// outside the locked fixtures' own scorecard, event and game rows changed.
export function verifyFixturesAfterCapture (ids, { locked = [] } = {}) {
  const state = read()
  if (!state?.digests || state.dbOid !== screensDbOid()) throw new Error('Refusing to publish: fixture digests are missing for this database build')
  const now = fixtureDigests(ids)
  const problems = []
  for (const key of Object.keys(state.digests)) {
    if (now[key].scores !== state.digests[key].scores) problems.push(`${key} scores changed`)
    if (now[key].games !== state.digests[key].games) problems.push(`${key} game settings changed`)
  }
  for (const key of Object.keys(state.digests)) {
    if (now[key].locked !== locked.includes(key)) problems.push(`${key} is ${now[key].locked ? '' : 'not '}locked`)
    if ('finalized' in now[key] && locked.includes(key) && !now[key].finalized) problems.push(`${key} is not fully finalized (event, every group scorecard and every game summary)`)
  }
  if (!state.rows) problems.push('row snapshot is missing')
  else problems.push(...auditRows(state.rows, ids, locked))
  if (problems.length) throw new Error(`Refusing to publish: ${problems.join('; ')}`)
  return now
}

function requireClaimedBuild (action) {
  const state = read()
  if (state?.stage !== 'captured' || !state.rows || state.dbOid !== screensDbOid()) {
    throw new Error(`Refusing to ${action}: fixture state is not a claimed build of this database`)
  }
  return state
}

const unixSeconds = iso => {
  const ms = Date.parse(iso)
  if (!Number.isFinite(ms)) throw new Error(`Invalid date ${iso}`)
  return Math.floor(ms / 1000)
}
const literal = value => {
  if (!/^[\w .:-]+$/.test(value)) throw new Error(`Unexpected characters in ${value}`)
  return `'${value}'`
}

// Demo video only: makes the fictional user premium with one active
// subscription row (fixtures/video-premium.json), after the fixtures were
// claimed. restoreAfterVideo removes it again.
export function addVideoPremium (premium, userId) {
  requireClaimedBuild('add the video subscription')
  if (screensSql('select count(*) from subscriptions') !== '0') throw new Error('Refusing: subscriptions already exist')
  screensSql(`insert into subscriptions (id, user_id, stripe_subscription_id, stripe_customer_id, stripe_checkout_session_id, status,
    period_start, period_end, plan_data, cancel_at_period_end, cancel_at, inserted_at, updated_at) values (${uuid(premium.id)}, ${uuid(userId)},
    ${literal(premium.stripeSubscriptionId)}, ${literal(premium.stripeCustomerId)}, ${literal(premium.stripeCheckoutSessionId)}, ${literal(premium.status)},
    ${unixSeconds(premium.periodStart)}, ${unixSeconds(premium.periodEnd)}, null, false, null, ${literal(premium.insertedAt)}, ${literal(premium.insertedAt)})`)
  // The Hub's SubscriptionService.get: the user's row with status "active".
  if (screensSql(`select count(*) from subscriptions where user_id = ${uuid(userId)} and status = 'active'`) !== '1') {
    throw new Error('The video subscription is not the single active subscription')
  }
}

// After the demo video, which enters one hole's scores on one standalone
// scorecard: the only differences from the fixtures-ready snapshot must be
// the video's subscription row (addVideoPremium) and those score rows (at
// most one per expected player, on that hole, with the expected gross score;
// a failed recording may have saved fewer). Both are deleted again, and then
// every fixture digest (including the users' premium state) and every
// audited row must equal the snapshot exactly.
// `scores` maps player id -> gross score. Returns the number of score rows removed.
export function restoreAfterVideo (ids, { hole, scores, premium }) {
  const state = requireClaimedBuild('restore')
  const now = recordSnapshot()
  const problems = []
  for (const table of AUDITED_TABLES) {
    const was = state.rows[table] || {}
    const is = now[table]
    const added = Object.keys(is).filter(id => !(id in was))
    const removed = Object.keys(was).filter(id => !(id in is))
    const changed = Object.keys(is).filter(id => id in was && is[id] !== was[id])
    if (table === 'subscriptions') {
      if (added.join() !== premium.id) problems.push(`subscriptions added: ${added.length}, expected only the video subscription`)
    } else if (table !== 'scores' && added.length) problems.push(`${added.length} row(s) added to ${table}`)
    if (removed.length) problems.push(`${removed.length} row(s) removed from ${table}`)
    if (changed.length) problems.push(`${changed.length} row(s) changed in ${table}`)
  }
  const added = Object.keys(now.scores).filter(id => !(id in state.rows.scores))
  const rows = added.length
    ? screensSql(`select id || '|' || player_id || '|' || hole_number || '|' || score from scores where id in (${added.map(uuid).join(', ')}) order by id`)
      .split('\n').filter(Boolean).map(line => line.split('|'))
    : []
  const seen = new Set()
  for (const [, playerId, holeNumber, score] of rows) {
    if (!(playerId in scores) || seen.has(playerId)) problems.push(`unexpected score row for player ${playerId}`)
    else if (Number(holeNumber) !== hole || Number(score) !== scores[playerId]) problems.push(`score row for ${playerId} is hole ${holeNumber}, ${score}`)
    seen.add(playerId)
  }
  if (rows.length !== added.length) problems.push('added score rows could not be read back')
  if (problems.length) throw new Error(`Refusing to restore: the recording changed more than the declared scores: ${problems.join('; ')}`)

  // A failed recording may have saved only some of the scores (or none).
  const deleted = !added.length ? '0' : screensSql(`with d as (delete from scores where id in (${added.map(uuid).join(', ')}) and hole_number = ${Number(hole)}
    and player_id in (${Object.keys(scores).map(uuid).join(', ')}) returning 1) select count(*) from d`)
  if (Number(deleted) !== rows.length) throw new Error(`Restore deleted ${deleted} score rows, expected ${rows.length}`)
  const unsubscribed = screensSql(`with d as (delete from subscriptions where id = ${uuid(premium.id)} returning 1) select count(*) from d`)
  if (unsubscribed !== '1' || screensSql('select count(*) from subscriptions') !== '0') throw new Error('Restore did not remove the video subscription')
  verifyFixturesAfterCapture(ids, { locked: [] })
  return rows.length
}

export function claimForCapture () {
  const { state, oid } = requireStage('fixtures-ready')
  if (state.fixtureHash !== fixtureDefinitionHash()) {
    throw new Error('Refusing: fixture definitions changed since the fixtures were built; rebuild them first')
  }
  write({ ...state, stage: 'captured', dbOid: oid })
}

export const requireFreshReset = () => requireStage('reset')
