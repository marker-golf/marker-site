// Browser network policy for Playwright captures.
//
// - HTTP(S): every request goes through context.route. Only http:// requests
//   to an allowed host:port continue; registered fulfillers (local fonts) may
//   answer others; documented expected requests are aborted; anything else
//   is aborted and recorded as a violation.
// - WebSockets: context.routeWebSocket intercepts every socket before it
//   connects. Only ws:// to an allowed host:port is connected to the server;
//   anything else is closed in the page and recorded. The server is never
//   contacted.
// - Redirects: Playwright does not route redirect targets, so every request's
//   redirect chain and every 3xx Location is checked, and any hop outside the
//   allowed hosts is recorded. (Actual connections to such hops are refused
//   by the OS sandbox the capture runs in.)
//
// Malformed URLs are treated as violations. Callers fail the run if
// report.unexpected is not empty.

export function createReport () {
  return { unexpected: [], expectedBlocked: [], fulfilled: 0 }
}

function parse (raw) {
  try { return new URL(raw) } catch (e) { return null }
}

export async function installNetworkPolicy (context, { allowedHosts, expectedBlocked = [], fulfillers = [], report }) {
  const allowed = new Set(allowedHosts)
  const isAllowedHttp = url => url?.protocol === 'http:' && allowed.has(url.host)
  const isLocalScheme = url => url?.protocol === 'data:' || url?.protocol === 'blob:'
  const describe = (raw, url) => url ? `${url.protocol}//${url.host}${url.pathname}` : `malformed URL ${String(raw).slice(0, 80)}`

  await context.route('**/*', async route => {
    const raw = route.request().url()
    const url = parse(raw)
    try {
      if (isAllowedHttp(url) || isLocalScheme(url)) return await route.continue()
      const fulfiller = url && fulfillers.find(f => f.match(url))
      if (fulfiller) {
        report.fulfilled++
        return await route.fulfill(fulfiller.respond(url))
      }
      if (url && expectedBlocked.some(e => url.origin === e.origin && url.pathname.startsWith(e.pathPrefix))) {
        report.expectedBlocked.push(`${url.origin}${url.pathname}`)
      } else {
        report.unexpected.push(`${route.request().method()} ${describe(raw, url)}`)
      }
      return await route.abort('blockedbyclient')
    } catch (error) {
      report.unexpected.push(`route handler error for ${describe(raw, url)}: ${error.message.split('\n')[0]}`)
      return route.abort('blockedbyclient').catch(() => {})
    }
  })

  await context.routeWebSocket(/.*/, ws => {
    const raw = ws.url()
    const url = parse(raw)
    if (url?.protocol === 'ws:' && allowed.has(url.host)) {
      ws.connectToServer()
      return
    }
    report.unexpected.push(`WebSocket ${describe(raw, url)}`)
    ws.close({ code: 1008, reason: 'blocked by screenshot network policy' })
  })

  context.on('request', request => {
    for (let hop = request.redirectedFrom() ? request : null; hop; hop = hop.redirectedFrom()) {
      const url = parse(hop.url())
      if (!isAllowedHttp(url) && !isLocalScheme(url)) report.unexpected.push(`redirect to ${describe(hop.url(), url)}`)
    }
  })

  context.on('response', async response => {
    if (response.status() < 300 || response.status() >= 400) return
    const location = await response.headerValue('location').catch(() => null)
    if (!location) return
    const url = parse(new URL(location, response.url()).href)
    if (!isAllowedHttp(url)) report.unexpected.push(`redirect response from ${response.url()} to ${describe(location, url)}`)
  })
}
