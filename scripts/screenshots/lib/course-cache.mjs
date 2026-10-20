// Course reference cache: a read-only, data-only pg_dump of five course
// tables from fourball_dev. The file name is keyed by the pinned Hub commit
// and a hash of its migrations, so a schema change can never reuse an old
// dump. Before it is loaded with psql, the dump must contain nothing but
// pg_dump's session header and COPY data for the approved tables; psql
// meta-commands (such as \connect) and any other SQL are rejected.

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { COURSE_CACHE_DIR, COURSE_REFERENCE_TABLES, HUB_SHA, HUB_EXPORT } from './config.mjs'

export function courseCachePath () {
  const dir = path.join(HUB_EXPORT, 'priv/repo/migrations')
  const hash = crypto.createHash('sha256')
  for (const file of fs.readdirSync(dir).sort()) hash.update(file).update(fs.readFileSync(path.join(dir, file)))
  return path.join(COURSE_CACHE_DIR, `course-reference-${HUB_SHA.slice(0, 12)}-${hash.digest('hex').slice(0, 12)}.sql`)
}

const HEADER_SETTINGS = new Set([
  'statement_timeout', 'lock_timeout', 'idle_in_transaction_session_timeout', 'client_encoding',
  'standard_conforming_strings', 'check_function_bodies', 'xmloption', 'client_min_messages', 'row_security',
  'transaction_timeout'
])
const SET_LINE = /^SET ([a-z_]+) = (?:'[A-Za-z0-9_]*'|[a-z0-9_]+);$/
const SEARCH_PATH_LINE = "SELECT pg_catalog.set_config('search_path', '', false);"
const RESTRICT_LINE = /^\\(restrict|unrestrict) ([A-Za-z0-9]+)$/
const COPY_LINE = /^COPY public\.([a-z0-9_]+) \([a-z0-9_, ]+\) FROM stdin;$/

// Throws on anything unexpected. Returns the tables found.
export function validateCourseDump (text) {
  const lines = text.split('\n')
  const tables = new Set()
  const restrictKeys = []
  let inCopy = false
  lines.forEach((line, index) => {
    const where = `line ${index + 1}`
    if (inCopy) {
      if (line === '\\.') inCopy = false
      return // COPY data rows are data, never commands
    }
    if (line === '' || line.startsWith('--') || line === SEARCH_PATH_LINE) return
    const set = SET_LINE.exec(line)
    if (set) {
      if (!HEADER_SETTINGS.has(set[1])) throw new Error(`Course cache rejected: unexpected setting at ${where}`)
      return
    }
    const restrict = RESTRICT_LINE.exec(line)
    if (restrict) {
      restrictKeys.push(restrict)
      return
    }
    const copy = COPY_LINE.exec(line)
    if (copy) {
      if (!COURSE_REFERENCE_TABLES.includes(copy[1])) throw new Error(`Course cache rejected: COPY into unapproved table at ${where}`)
      if (tables.has(copy[1])) throw new Error(`Course cache rejected: duplicate COPY at ${where}`)
      tables.add(copy[1])
      inCopy = true
      return
    }
    if (line.startsWith('\\')) throw new Error(`Course cache rejected: psql meta-command at ${where}`)
    throw new Error(`Course cache rejected: unexpected SQL at ${where}`)
  })
  if (inCopy) throw new Error('Course cache rejected: unterminated COPY data')
  // pg_dump 14.19+/17.6+ wraps the dump in \restrict KEY ... \unrestrict KEY,
  // which disables every other meta-command in between.
  if (restrictKeys.length) {
    const [open, close] = restrictKeys
    if (restrictKeys.length !== 2 || open[1] !== 'restrict' || close[1] !== 'unrestrict' || open[2] !== close[2]) {
      throw new Error('Course cache rejected: malformed \\restrict/\\unrestrict pair')
    }
  }
  const missing = COURSE_REFERENCE_TABLES.filter(t => !tables.has(t))
  if (missing.length) throw new Error(`Course cache rejected: missing tables ${missing.join(', ')}`)
  return [...tables]
}
