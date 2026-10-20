// H3: the browser can reach only approved host:port pairs, over HTTP and
// WebSockets, including across redirects.
import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import http from 'node:http'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { sandboxArgs } from '../lib/sandbox.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const PROBE = path.join(here, 'helpers/browser-probe.mjs')
const ALLOWED = 4792
const UNAPPROVED = 4793
let approvedServer, unapprovedServer
let unapprovedHits = []

function acceptWebSocket (req, socket) {
  const accept = crypto.createHash('sha1').update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')
  socket.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${accept}\r\n\r\n`)
}

before(async () => {
  approvedServer = http.createServer((req, res) => {
    if (req.url === '/redirect') { res.writeHead(302, { Location: `http://127.0.0.1:${UNAPPROVED}/after-redirect` }); return res.end() }
    if (req.url === '/ok') return res.end('ok')
    res.writeHead(200, { 'content-type': 'text/html' }); res.end('<html><body>approved</body></html>')
  })
  approvedServer.on('upgrade', acceptWebSocket)
  unapprovedServer = http.createServer((req, res) => { unapprovedHits.push(`http ${req.url}`); res.end('reached') })
  unapprovedServer.on('upgrade', (req, socket) => { unapprovedHits.push(`websocket ${req.url}`); acceptWebSocket(req, socket) })
  await new Promise(resolve => approvedServer.listen(ALLOWED, '127.0.0.1', resolve))
  await new Promise(resolve => unapprovedServer.listen(UNAPPROVED, '127.0.0.1', resolve))
})
after(() => { approvedServer.close(); unapprovedServer.close() })

// Asynchronous on purpose: the test servers live in this process.
function probe ({ sandboxed }) {
  unapprovedHits = []
  const node = [process.execPath, [PROBE, String(ALLOWED), String(UNAPPROVED), ...(sandboxed ? ['--no-chromium-sandbox'] : [])]]
  const [bin, args] = sandboxed ? sandboxArgs([ALLOWED], node[0], node[1]) : node
  return new Promise((resolve, reject) => {
    execFile(bin, args, { timeout: 90000, env: { HOME: process.env.HOME, PATH: '/usr/bin:/bin' } }, (error, stdout, stderr) => {
      if (error) return reject(new Error(`probe failed: ${stderr || error.message}`))
      resolve(JSON.parse(stdout.trim().split('\n').pop()))
    })
  })
}

test('Playwright policy: approved traffic works; an IP-literal WebSocket to an unapproved port is blocked before connecting; a redirect off the allowlist is detected', async () => {
  const out = await probe({ sandboxed: false })
  assert.equal(out.approvedFetch, 'ok')
  assert.equal(out.approvedWebSocket, 'open')
  assert.notEqual(out.unapprovedWebSocket, 'open')
  assert.ok(!unapprovedHits.some(h => h.startsWith('websocket')), `unapproved server saw ${unapprovedHits}`)
  assert.ok(out.unexpected.some(u => u.startsWith(`WebSocket ws://127.0.0.1:${UNAPPROVED}`)))
  assert.ok(out.unexpected.some(u => u.includes(`127.0.0.1:${UNAPPROVED}/after-redirect`)), 'redirect recorded as a violation')
})

test('capture configuration (OS sandbox + policy): the redirect and the WebSocket never reach the unapproved port, approved traffic still works', async () => {
  const out = await probe({ sandboxed: true })
  assert.equal(out.approvedFetch, 'ok')
  assert.equal(out.approvedWebSocket, 'open')
  assert.notEqual(out.unapprovedWebSocket, 'open')
  assert.match(out.redirect, /^error/)
  assert.deepEqual(unapprovedHits, [], 'unapproved server must receive nothing')
  assert.ok(out.unexpected.some(u => u.includes('after-redirect')))
  assert.ok(out.unexpected.some(u => u.startsWith('WebSocket')))
})
