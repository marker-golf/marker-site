// M5: dependency folders are copied only when lockfiles match the pinned SHA.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { assertLockfileParity } from '../lib/guards.mjs'
import { tempDir } from './helpers/fake.mjs'

const git = (repo, ...args) => execFileSync('git', ['-C', repo, '-c', 'user.name=t', '-c', 'user.email=t@example.com', ...args], { encoding: 'utf8' }).trim()

test('parity passes for identical lockfiles and refuses (naming the file) when the working tree differs', () => {
  const repo = tempDir('repo')
  git(repo, 'init', '-q')
  fs.writeFileSync(path.join(repo, 'package-lock.json'), '{"lockfileVersion":3}\n')
  fs.writeFileSync(path.join(repo, 'mix.lock'), '%{}\n')
  git(repo, 'add', '.')
  git(repo, 'commit', '-qm', 'pin')
  const sha = git(repo, 'rev-parse', 'HEAD')
  assert.doesNotThrow(() => assertLockfileParity(repo, sha, ['package-lock.json', 'mix.lock']))

  fs.writeFileSync(path.join(repo, 'mix.lock'), '%{changed: true}\n')
  const before = git(repo, 'status', '--porcelain')
  assert.throws(() => assertLockfileParity(repo, sha, ['package-lock.json', 'mix.lock']), /mix\.lock in the working tree differs/)
  assert.equal(git(repo, 'status', '--porcelain'), before, 'the check changes nothing')
})
