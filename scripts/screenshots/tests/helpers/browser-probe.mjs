// Test-only: drives Chromium with the capture network policy against local
// test servers and prints what happened as JSON.
// Usage: node browser-probe.mjs <allowedPort> <unapprovedPort> [--no-chromium-sandbox]
import { chromium } from 'playwright'
import { createReport, installNetworkPolicy } from '../../lib/browser-policy.mjs'

const [allowedPort, unapprovedPort] = process.argv.slice(2, 4).map(Number)
const browser = await chromium.launch({
  chromiumSandbox: !process.argv.includes('--no-chromium-sandbox'),
  args: ['--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1']
})
const context = await browser.newContext()
const report = createReport()
await installNetworkPolicy(context, { allowedHosts: [`127.0.0.1:${allowedPort}`], report })
const page = await context.newPage()
await page.goto(`http://127.0.0.1:${allowedPort}/`)
const result = await page.evaluate(async ({ allowedPort, unapprovedPort }) => {
  const socket = url => new Promise(resolve => {
    const ws = new WebSocket(url)
    ws.onopen = () => { resolve('open'); ws.close() }
    ws.onerror = () => resolve('error')
    ws.onclose = () => resolve('closed')
    setTimeout(() => resolve('timeout'), 3000)
  })
  return {
    approvedFetch: await fetch('/ok').then(r => r.text()).catch(e => `error ${e.message}`),
    approvedWebSocket: await socket(`ws://127.0.0.1:${allowedPort}/socket`),
    unapprovedWebSocket: await socket(`ws://127.0.0.1:${unapprovedPort}/socket`),
    redirect: await fetch('/redirect').then(r => `status ${r.status}`).catch(e => `error ${e.message}`)
  }
}, { allowedPort, unapprovedPort })
await new Promise(resolve => setTimeout(resolve, 500))
await browser.close()
console.log(JSON.stringify({ ...result, unexpected: report.unexpected }))
