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
// lock state). Before any draft is published, capture compares it again: F1,
// F2 and F4 must be unchanged and unlocked; F3 must be unchanged except that
// it is now locked (End round).

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
  const [scores, games, locked, lockedCards] = screensSql(`select
    coalesce(md5(string_agg(p.id || ':' || s.hole_number || ':' || s.score, ',' order by p.id, s.hole_number)), '-'),
    (select coalesce(md5(string_agg(g.settings::text, ',' order by g.id)), '-') from games g where g.event_id = ${uuid(id)}),
    (select locked from events where id = ${uuid(id)}),
    (select count(*) from scorecards where event_id = ${uuid(id)} and locked)
    from scores s join players p on p.id = s.player_id where p.event_id = ${uuid(id)}`).split('|')
  return { scores, games, locked: locked === 't' || lockedCards !== '0' }
}

export function fixtureDigests (ids) {
  return {
    f1: scorecardDigest(ids.f1Scorecard),
    f2: scorecardDigest(ids.f2Scorecard),
    f3: scorecardDigest(ids.f3Scorecard),
    f4: eventDigest(ids.f4Event)
  }
}

export function markFixturesReady (ids) {
  const { oid } = requireStage('reset')
  const digests = fixtureDigests(ids)
  if (Object.values(digests).some(d => d.locked)) throw new Error('Refusing: a fixture is locked straight after building')
  write({ stage: 'fixtures-ready', dbOid: oid, fixtureHash: fixtureDefinitionHash(), digests })
}

// After capture: scores and game settings are unchanged everywhere, and a
// fixture is locked only if a selected recipe locks it (End round on F3).
export function verifyFixturesAfterCapture (ids, { locked = [] } = {}) {
  const state = read()
  if (!state?.digests || state.dbOid !== screensDbOid()) throw new Error('Refusing to publish: fixture digests are missing for this database build')
  const now = fixtureDigests(ids)
  const problems = []
  for (const key of ['f1', 'f2', 'f3', 'f4']) {
    if (now[key].scores !== state.digests[key].scores) problems.push(`${key} scores changed`)
    if (now[key].games !== state.digests[key].games) problems.push(`${key} game settings changed`)
  }
  for (const key of ['f1', 'f2', 'f3', 'f4']) {
    if (now[key].locked !== locked.includes(key)) problems.push(`${key} is ${now[key].locked ? '' : 'not '}locked`)
  }
  if (problems.length) throw new Error(`Refusing to publish: ${problems.join('; ')}`)
  return now
}

export function claimForCapture () {
  const { state, oid } = requireStage('fixtures-ready')
  if (state.fixtureHash !== fixtureDefinitionHash()) {
    throw new Error('Refusing: fixture definitions changed since the fixtures were built; rebuild them first')
  }
  write({ ...state, stage: 'captured', dbOid: oid })
}

export const requireFreshReset = () => requireStage('reset')
