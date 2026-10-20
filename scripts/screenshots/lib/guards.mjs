// Safety guards that run before any database or server operation.

import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { run, runSandboxed, pgEnv } from './proc.mjs'
import {
  SCREENS_DB, SCREENS_DATABASE_URL, PG_HOST, PG_PORT, PG_USER, LOOPBACK, HUB_EXPORT, hubEnv
} from './config.mjs'

const FORBIDDEN_DB_PATTERN = /(dev|stag|prod|integ|test|live|postgres|template)/i

// Verifies, before any create/drop/migrate/write, that:
//  - PostgreSQL resolves to local loopback only;
//  - the target database name is exactly `fourball_screens`;
//  - DATABASE_URL contains exactly that database and nothing else;
//  - the name cannot be fourball_dev, a staging/production database or a default;
//  - no unresolved variable, wildcard or default database name is used.
export function assertSafeDatabaseTarget () {
  if (SCREENS_DB !== 'fourball_screens') {
    throw new Error('Refusing: screenshot database name is not exactly fourball_screens')
  }
  if (/[\s$*?{}%`'"\\]/.test(SCREENS_DB) || SCREENS_DB === '') {
    throw new Error('Refusing: database name contains a variable, wildcard or quote')
  }
  if (FORBIDDEN_DB_PATTERN.test(SCREENS_DB)) {
    throw new Error('Refusing: database name matches a forbidden pattern')
  }

  const url = new URL(SCREENS_DATABASE_URL)
  const checks = [
    [url.protocol === 'postgres:', 'protocol is postgres:'],
    [url.hostname === LOOPBACK, `host is ${LOOPBACK}`],
    [url.port === String(PG_PORT), `port is ${PG_PORT}`],
    [url.pathname === `/${SCREENS_DB}`, `path is exactly /${SCREENS_DB}`],
    [url.password === '', 'no password embedded'],
    [url.username === PG_USER, 'local OS user'],
    [url.search === '' && url.hash === '', 'no query or fragment'],
    [!/[$*?{}%]/.test(SCREENS_DATABASE_URL), 'no unresolved variables or wildcards']
  ]
  for (const [ok, label] of checks) {
    if (!ok) throw new Error(`Refusing: DATABASE_URL check failed (${label})`)
  }

  // Ask the server itself where it is. A loopback client connection must land
  // on a loopback server address; anything else means a proxy or remote host.
  const probe = run('psql', [
    '-h', PG_HOST, '-p', String(PG_PORT), '-U', PG_USER, '-d', 'postgres',
    '-X', '-A', '-t', '-c', 'select inet_server_addr(), inet_server_port(), inet_client_addr()'
  ], { env: pgEnv(), quiet: true }).stdout.trim()
  const [serverAddr, serverPort, clientAddr] = probe.split('|')
  if (serverAddr !== LOOPBACK || clientAddr !== LOOPBACK || serverPort !== String(PG_PORT)) {
    throw new Error('Refusing: PostgreSQL does not resolve to local loopback')
  }

  return { database: SCREENS_DB, host: serverAddr, port: Number(serverPort) }
}

// Runs SQL against fourball_screens only, after confirming the connection.
export function screensSql (sql) {
  assertConnectedToScreensDb()
  return run('psql', ['-h', PG_HOST, '-p', String(PG_PORT), '-U', PG_USER, '-d', SCREENS_DB,
    '-X', '-A', '-t', '-v', 'ON_ERROR_STOP=1', '-c', sql], { env: pgEnv() }).stdout.trim()
}

// Confirms a connection to fourball_screens really is fourball_screens.
export function assertConnectedToScreensDb () {
  const name = run('psql', [
    '-h', PG_HOST, '-p', String(PG_PORT), '-U', PG_USER, '-d', SCREENS_DB,
    '-X', '-A', '-t', '-c', 'select current_database()'
  ], { env: pgEnv(), quiet: true }).stdout.trim()
  if (name !== SCREENS_DB) throw new Error(`Refusing: connected to ${name}, expected ${SCREENS_DB}`)
}

// Asks the pinned Hub code itself which database its Repo resolves to, using
// the exact environment every Hub process gets. Run before migrations and
// before the Hub server starts; any mismatch stops the pipeline.
export function assertHubRepoTarget () {
  const keys = ['hostname', 'port', 'database', 'username', 'socket', 'socket_dir']
  const elixir = `c = Fourball.Repo.config(); IO.write("\\n__REPO__" <> Enum.map_join([${keys.map(k => ':' + k).join(', ')}], "|", fn k -> to_string(c[k]) end) <> "__END__\\n")`
  const result = runSandboxed('hub', '/usr/bin/env', ['-i', ...hubEnv(), 'mix', 'run', '--no-start', '--no-compile', '-e', elixir],
    { cwd: HUB_EXPORT, quiet: true, timeout: 3 * 60 * 1000 })
  const match = /__REPO__(.*)__END__/.exec(result.stdout)
  if (!match) throw new Error('Refusing: could not read Fourball.Repo.config() from the pinned Hub')
  const actual = Object.fromEntries(match[1].split('|').map((value, i) => [keys[i], value]))
  const expected = { hostname: LOOPBACK, port: String(PG_PORT), database: SCREENS_DB, username: PG_USER, socket: '', socket_dir: '' }
  const mismatches = keys.filter(k => actual[k] !== expected[k])
  if (mismatches.length) {
    throw new Error(`Refusing: Hub Repo resolves to ${mismatches.map(k => `${k}=${JSON.stringify(actual[k])}`).join(', ')}; expected ${SCREENS_DB} on ${LOOPBACK}:${PG_PORT} as ${PG_USER}`)
  }
  return actual
}

export function portInUse (port) {
  return new Promise(resolve => {
    const socket = net.connect({ host: LOOPBACK, port })
    socket.once('connect', () => { socket.destroy(); resolve(true) })
    socket.once('error', () => resolve(false))
  })
}

export function listenerPids (port) {
  const result = run('/usr/sbin/lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-t'], { allowFail: true })
  return result.stdout.split('\n').map(s => s.trim()).filter(Boolean).map(Number)
}

// Dependency folders are copied from a working tree, so its lockfiles must be
// byte-identical to the lockfiles at the pinned SHA. Read-only: `git show`.
export function assertLockfileParity (repo, sha, lockfiles) {
  const differing = lockfiles.filter(file => {
    const pinned = run('git', ['-C', repo, 'show', `${sha}:${file}`], { env: { PATH: '/usr/bin:/bin:/opt/homebrew/bin' } }).stdout
    const workingTree = path.join(repo, file)
    return !fs.existsSync(workingTree) || fs.readFileSync(workingTree, 'utf8') !== pinned
  })
  if (differing.length) {
    throw new Error(`Refusing to copy dependencies from ${repo}: ${differing.join(', ')} in the working tree differs from ${sha.slice(0, 12)}. Nothing was copied or changed.`)
  }
}
