// L8: only pg_dump's header and COPY data for the five course tables load.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateCourseDump } from '../lib/course-cache.mjs'
import { COURSE_REFERENCE_TABLES } from '../lib/config.mjs'

const copy = (table, rows = ['a\tb']) => [`COPY public.${table} (id, name) FROM stdin;`, ...rows, '\\.']
const dump = (extra = [], { restrict = true, tables = COURSE_REFERENCE_TABLES } = {}) => [
  '--', '-- PostgreSQL database dump', '--', '',
  ...(restrict ? ['\\restrict AbC123'] : []),
  'SET statement_timeout = 0;', "SET client_encoding = 'UTF8';", 'SET standard_conforming_strings = on;',
  "SELECT pg_catalog.set_config('search_path', '', false);", '',
  ...tables.flatMap(t => copy(t)),
  ...extra,
  ...(restrict ? ['\\unrestrict AbC123'] : []), ''
].join('\n')

test('a well-formed data-only dump is accepted', () => {
  assert.deepEqual(validateCourseDump(dump()).sort(), [...COURSE_REFERENCE_TABLES].sort())
  assert.ok(validateCourseDump(dump([], { restrict: false })))
})

test('COPY rows are data, even when they look like commands', () => {
  const text = dump().replace('a\tb', '\\connect fourball_dev\tDROP TABLE users;')
  assert.ok(validateCourseDump(text))
})

for (const [label, extra] of [
  ['\\connect', ['\\connect fourball_dev']],
  ['\\! shell escape', ['\\! touch /tmp/x']],
  ['DROP', ['DROP TABLE users;']],
  ['INSERT', ["INSERT INTO users VALUES ('x');"]],
  ['unexpected SET', ['SET session_authorization = postgres;']],
  ['COPY into an unapproved table', copy('users')]
]) {
  test(`rejects ${label}`, () => assert.throws(() => validateCourseDump(dump(extra)), /Course cache rejected/))
}

test('rejects mismatched restrict keys, unterminated COPY and missing tables', () => {
  assert.throws(() => validateCourseDump(dump().replace('\\unrestrict AbC123', '\\unrestrict Other1')), /restrict/)
  assert.throws(() => validateCourseDump(dump().replace(/\\\.\n(?![\s\S]*\\\.)/, '')), /unterminated|unexpected/)
  assert.throws(() => validateCourseDump(dump([], { tables: COURSE_REFERENCE_TABLES.slice(1) })), /missing tables/)
})
