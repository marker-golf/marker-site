// Rebuilds the isolated `fourball_screens` database from scratch:
//
//   1. safety guards (loopback server, exact database name and URL)
//   2. drop + create fourball_screens
//   3. confirm the pinned Hub's Repo resolves to fourball_screens, then build
//      the schema with the Hub's own migrations (no schema dumps)
//   4. course reference data only, read from fourball_dev in a read-only
//      session and validated before loading (lib/course-cache.mjs)
//   5. fictional demo users
//   6. sanitization assertions, then the "reset" fixture-state marker
//
// Nothing in this script can address a database other than fourball_screens
// for writing; fourball_dev is only ever read by pg_dump.

import fs from 'node:fs'
import path from 'node:path'
import { run, runSandboxed, pgEnv, log, redact } from './lib/proc.mjs'
import {
  assertSafeDatabaseTarget, assertConnectedToScreensDb, assertHubRepoTarget, portInUse, screensSql
} from './lib/guards.mjs'
import { courseCachePath, validateCourseDump } from './lib/course-cache.mjs'
import { markReset } from './lib/state.mjs'
import {
  HUB_PORT, SCREENS_DB, PG_HOST, PG_PORT, PG_USER, HUB_EXPORT, FIXTURE_STATE,
  COURSE_SOURCE_DB, COURSE_REFERENCE_TABLES, SCRIPTS_DIR, hubEnv
} from './lib/config.mjs'

const conn = ['-h', PG_HOST, '-p', String(PG_PORT), '-U', PG_USER]

function sqlLiteral (value) {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number') return String(value)
  return `'${String(value).replace(/'/g, "''")}'`
}

// 1. Guards ----------------------------------------------------------------
if (await portInUse(HUB_PORT)) throw new Error('Refusing: stop the isolated Hub before resetting its database')
const target = assertSafeDatabaseTarget()
log(`target verified: ${target.database} on ${target.host}:${target.port}`)
if (fs.readdirSync(HUB_EXPORT).some(name => name.startsWith('.env'))) {
  throw new Error('Refusing: Hub export contains a .env file')
}

// 2. Drop and create ---------------------------------------------------------
// Invalidate any previous fixture state first: a failure below leaves no
// marker, so nothing can capture from a half-built database.
fs.rmSync(FIXTURE_STATE, { force: true })
run('dropdb', [...conn, '--maintenance-db=postgres', '--if-exists', SCREENS_DB], { env: pgEnv() })
run('createdb', [...conn, '--maintenance-db=postgres', SCREENS_DB], { env: pgEnv() })
assertConnectedToScreensDb()
log(`created ${SCREENS_DB}`)

// 3. Schema from Hub migrations ---------------------------------------------
const repo = assertHubRepoTarget()
log(`Hub Repo resolves to ${repo.database} on ${repo.hostname}:${repo.port} as ${repo.username}`)
const migrate = runSandboxed('hub', '/usr/bin/env', ['-i', ...hubEnv(), 'mix', 'ecto.migrate'], { cwd: HUB_EXPORT, allowFail: true })
if (migrate.status !== 0) {
  process.stderr.write(redact(migrate.stdout + migrate.stderr))
  throw new Error('Hub migrations failed to build a clean database; stopping')
}
const migrationCount = screensSql('select count(*) from schema_migrations')
const migrationFiles = fs.readdirSync(path.join(HUB_EXPORT, 'priv/repo/migrations')).filter(f => f.endsWith('.exs')).length
if (Number(migrationCount) !== migrationFiles) {
  throw new Error(`Migrations incomplete: ${migrationCount} applied, ${migrationFiles} files`)
}
log(`schema built by ${migrationCount} Hub migrations`)

// 4. Course reference data (read-only dump of five course tables) -----------
const cacheFile = courseCachePath()
if (!fs.existsSync(cacheFile)) {
  fs.mkdirSync(path.dirname(cacheFile), { recursive: true, mode: 0o700 })
  const dump = run('pg_dump', [
    ...conn, '-d', COURSE_SOURCE_DB, '--data-only', '--no-owner', '--no-privileges',
    ...COURSE_REFERENCE_TABLES.flatMap(t => ['-t', `public.${t}`])
  ], { env: pgEnv({ PGOPTIONS: '-c default_transaction_read_only=on' }) })
  validateCourseDump(dump.stdout)
  fs.writeFileSync(cacheFile, dump.stdout, { mode: 0o600 })
  log(`cached course reference data (read-only dump) as ${path.basename(cacheFile)}`)
}
validateCourseDump(fs.readFileSync(cacheFile, 'utf8'))
assertConnectedToScreensDb()
run('psql', [...conn, '-d', SCREENS_DB, '-X', '-q', '-v', 'ON_ERROR_STOP=1', '-f', cacheFile], { env: pgEnv() })
log(`loaded course reference data: ${screensSql('select count(*) from courses_v2')} courses`)

// 5. Fictional users ---------------------------------------------------------
const { users } = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'fixtures/users.json'), 'utf8'))
const bob = users.find(u => u.key === 'bob')
const rows = users.map(u => `(${[
  u.id, u.phone, u.firstName, u.lastName, u.gender, u.email || null, u.level,
  u.key === 'bob' ? null : bob.id
].map(sqlLiteral).join(', ')}, ${u.email ? 'true' : 'false'}, now(), now())`)
screensSql(`insert into users (id, phone, first_name, last_name, gender, email, level, invited_by_id, email_verified, inserted_at, updated_at) values ${rows.join(', ')}`)
log(`inserted ${users.length} fictional users`)

// 6. Sanitization assertions -------------------------------------------------
const fixtureIds = users.map(u => sqlLiteral(u.id)).join(', ')
const assertions = [
  ['exactly the fixture users', `select count(*) = ${users.length} and count(*) filter (where id in (${fixtureIds})) = ${users.length} from users`],
  ['all phones in 000-555 range', `select bool_and(phone ~ '^000555[0-9]{4}$') from users`],
  ['no GHIN numbers', 'select count(*) = 0 from users where ghin_number is not null'],
  ['no login or email codes', 'select count(*) = 0 from users where code is not null or email_code is not null'],
  ['emails reserved domain only', `select count(*) = 0 from users where email is not null and email !~ '@example\\.com$'`],
  ['no player GHIN or posting data', 'select count(*) = 0 from players where handicap_id is not null or posting_id is not null or posting_details is not null'],
  ['no subscriptions', 'select count(*) = 0 from subscriptions'],
  ['no generated AI games', 'select count(*) = 0 from generated_games'],
  ['no foreign-owned events/scorecards/games/series', `select (select count(*) from events where user_id not in (${fixtureIds})) + (select count(*) from scorecards where user_id not in (${fixtureIds})) + (select count(*) from games where user_id not in (${fixtureIds})) + (select count(*) from series where user_id not in (${fixtureIds})) = 0`]
]
for (const [label, sql] of assertions) {
  if (screensSql(sql) !== 't') throw new Error(`Sanitization assertion failed: ${label}`)
}
log(`sanitization assertions passed (${assertions.length})`)
markReset()
