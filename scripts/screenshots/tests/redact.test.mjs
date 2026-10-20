// M1: printed errors never carry Authorization headers, Bearer tokens or JWTs.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { redact, httpErrorSummary } from '../lib/proc.mjs'

// Built at runtime so this file itself never contains a JWT-shaped literal.
const fakeJwt = ['eyJ' + 'h'.repeat(24), 'eyJ' + 'p'.repeat(40), 's'.repeat(43)].join('.')

test('redact removes Bearer tokens, JWT-shaped values and Authorization header values', () => {
  const text = `authorization: Bearer ${fakeJwt}\nnote ${fakeJwt}\nAuthorization=${fakeJwt}`
  const out = redact(text)
  assert.ok(!out.includes(fakeJwt))
  assert.ok(!/eyJ/.test(out))
})

test('httpErrorSummary keeps only a redacted first line of a Plug.Debugger page', () => {
  const debuggerPage = [
    `# RuntimeError at POST /api/app/scores ${fakeJwt}`, '', 'Exception:', '', '    ** (RuntimeError) boom',
    '## Connection details', '### Params', '', `    %{"jwt" => "${fakeJwt}"}`,
    '### Headers', `  * authorization: Bearer ${fakeJwt}`, '  * accept: application/vnd.fourball.v2+json'
  ].join('\n')
  const summary = httpErrorSummary('POST', 'scores', 500, debuggerPage)
  assert.equal(summary, 'POST scores -> 500: # RuntimeError at POST /api/app/scores [redacted-jwt]')
  assert.ok(!summary.includes('eyJ') && !/authorization/i.test(summary))
})

test('httpErrorSummary handles empty bodies and truncates long lines', () => {
  assert.equal(httpErrorSummary('GET', 'me', 401, ''), 'GET me -> 401')
  assert.ok(httpErrorSummary('GET', 'me', 500, 'x'.repeat(1000)).length < 200)
})
