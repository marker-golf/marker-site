import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { reviewOutputDir } from '../lib/video-output.mjs'
import { tempDir } from './helpers/fake.mjs'

const names = ['demo.mp4', 'demo.webm', 'demo-poster.jpg']

test('an empty review folder is written directly', () => {
  const dir = tempDir()
  assert.equal(reviewOutputDir(dir, names, { runId: 'r1' }), dir)
})

test('existing review outputs are never overwritten by default', () => {
  const dir = tempDir()
  fs.writeFileSync(path.join(dir, 'demo-poster.jpg'), 'approved')
  assert.equal(reviewOutputDir(dir, names, { runId: '2026-10-29T12-00-00-000Z' }), path.join(dir, 'rerun-2026-10-29T12-00-00-000Z'))
  assert.equal(fs.readFileSync(path.join(dir, 'demo-poster.jpg'), 'utf8'), 'approved')
})

test('replace writes over existing outputs only when asked', () => {
  const dir = tempDir()
  fs.writeFileSync(path.join(dir, 'demo.mp4'), 'old')
  assert.equal(reviewOutputDir(dir, names, { replace: true, runId: 'r1' }), dir)
})

test('run ids cannot escape the review folder', () => {
  const dir = tempDir()
  fs.writeFileSync(path.join(dir, 'demo.mp4'), 'old')
  assert.throws(() => reviewOutputDir(dir, names, { runId: '../elsewhere' }), /Invalid run id/)
})
