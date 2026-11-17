import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { POLLY_USER_ID, POLLY_PHONE } from '../lib/config.mjs'
import shots from '../proof-set.mjs'

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixture = name => JSON.parse(fs.readFileSync(path.join(dir, 'fixtures', name), 'utf8'))
const { users } = fixture('users.json')
const f8 = fixture('post-score-f8.json')

test('only the posting user has a fixture USGA Handicap ID, and it cannot be a real one', () => {
  const holders = users.filter(u => 'fixtureUsgaHandicapId' in u)
  assert.deepEqual(holders.map(u => u.key), ['polly'])
  const [polly] = holders
  assert.ok(Number.isInteger(polly.fixtureUsgaHandicapId) && polly.fixtureUsgaHandicapId < 0)
  assert.equal(polly.id, POLLY_USER_ID)
  assert.equal(polly.phone, POLLY_PHONE)
  assert.match(polly.phone, /^000555\d{4}$/)
  assert.equal(polly.email, undefined)
})

test('F8 is Polly\'s own fully scored card, without Bob, with distinct initials', () => {
  const keys = f8.players.map(p => p.user)
  assert.equal(keys[0], 'polly')
  assert.ok(!keys.includes('bob'))
  assert.ok(keys.every(k => users.some(u => u.key === k)))
  assert.ok(!f8.games)
  assert.deepEqual(Object.keys(f8.scores).sort(), [...keys].sort())
  assert.ok(Object.values(f8.scores).every(s => s.length === 18))
  const sum = (from, to) => f8.scores.polly.slice(from, to).reduce((a, b) => a + b, 0)
  assert.deepEqual([sum(0, 9), sum(9, 18), sum(0, 18)], [46, 48, 94])
  // Vue's column headers: first + last initial, sorted by last name.
  const initials = keys.map(k => users.find(u => u.key === k)).sort((a, b) => a.lastName.localeCompare(b.lastName))
    .map(u => u.firstName[0] + u.lastName[0])
  assert.deepEqual(initials, ['DD', 'KK', 'MM', 'PP'])
})

test('the posting captures are read-only, signed in as Polly, and run before every writing recipe', () => {
  const posting = shots.filter(s => s.name.startsWith('post-score-'))
  assert.deepEqual(posting.map(s => s.name), ['post-score-ready', 'post-score-sheet'])
  for (const shot of posting) {
    assert.equal(shot.signIn, 'polly')
    assert.ok(!shot.mayWrite && !shot.writes && !shot.locks)
  }
  const firstWriter = shots.findIndex(s => s.mayWrite)
  assert.ok(posting.every(s => shots.indexOf(s) < firstWriter))
  assert.ok(shots.filter(s => !s.name.startsWith('post-score-')).every(s => !s.signIn))
})
