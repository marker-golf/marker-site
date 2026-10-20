// M2: port-restricted sandbox profiles allow only the listed loopback ports.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { spawnSync } from 'node:child_process'
import { sandboxArgs, sandboxProfile } from '../lib/sandbox.mjs'
import { SANDBOX_PORTS } from '../lib/config.mjs'

const ALLOWED = 4794
const OTHER = 4795

function connectInSandbox (target) {
  const script = `const s = require('net').connect(${JSON.stringify(target)}); s.on('connect', () => { console.log('connected'); s.destroy() }); s.on('error', e => console.log(e.code))`
  const [bin, args] = sandboxArgs([ALLOWED], process.execPath, ['-e', script])
  return spawnSync(bin, args, { encoding: 'utf8', timeout: 20000 }).stdout.trim()
}

test('allowed loopback port connects; other loopback ports, external IPv4/IPv6 and DNS are denied', async () => {
  const servers = [ALLOWED, OTHER].map(port => http.createServer().listen(port, '127.0.0.1'))
  await new Promise(resolve => setTimeout(resolve, 200))
  try {
    assert.equal(connectInSandbox({ host: '127.0.0.1', port: ALLOWED }), 'connected')
    assert.equal(connectInSandbox({ host: '127.0.0.1', port: OTHER }), 'EPERM')
    assert.equal(connectInSandbox({ host: '192.0.2.1', port: 80 }), 'EPERM') // TEST-NET-1, never routed
    assert.equal(connectInSandbox({ host: '2001:db8::1', port: 80 }), 'EPERM') // documentation range
    const [bin, args] = sandboxArgs([ALLOWED], process.execPath, ['-e', "require('dns').lookup('example.com', e => console.log(e ? e.code : 'resolved'))"])
    assert.equal(spawnSync(bin, args, { encoding: 'utf8', timeout: 20000 }).stdout.trim(), 'ENOTFOUND')
  } finally { servers.forEach(s => s.close()) }
})

test('sandboxed processes cannot launch apps or URLs (open, osascript)', () => {
  for (const bin of ['/usr/bin/open', '/usr/bin/osascript']) {
    const [sandbox, args] = sandboxArgs([ALLOWED], bin, ['-h'])
    const result = spawnSync(sandbox, args, { encoding: 'utf8', timeout: 20000 })
    assert.match(result.stderr, /execvp\(\) of '.*' failed: Operation not permitted/)
  }
})

test('pipeline profiles are narrow and well-formed', () => {
  assert.deepEqual(SANDBOX_PORTS, { hub: [5432, 9], vue: [8090], browser: [4001, 8090] })
  assert.throws(() => sandboxProfile([]))
  assert.throws(() => sandboxProfile(['5432; (allow default)']))
})
