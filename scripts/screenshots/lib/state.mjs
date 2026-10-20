// Fixture-state marker. Ties captures to one specific database rebuild and
// one version of the fixture definitions, so a capture can never run silently
// against stale or already-mutated data (captures change state, for example
// the Wolf partner modal saves a Lone Wolf decision).
//
//   db-reset  -> stage "reset"          (database OID of the new fourball_screens)
//   fixtures  -> stage "fixtures-ready" (same OID, fixture definition hash)
//   capture   -> stage "captured"       (claimed before any recipe runs)

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

export function markFixturesReady () {
  const { oid } = requireStage('reset')
  write({ stage: 'fixtures-ready', dbOid: oid, fixtureHash: fixtureDefinitionHash() })
}

export function claimForCapture () {
  const { state, oid } = requireStage('fixtures-ready')
  if (state.fixtureHash !== fixtureDefinitionHash()) {
    throw new Error('Refusing: fixture definitions changed since the fixtures were built; rebuild them first')
  }
  write({ ...state, stage: 'captured', dbOid: oid })
}

export const requireFreshReset = () => requireStage('reset')
