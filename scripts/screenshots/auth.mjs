// Mints a JWT for the fictional demo user (Bob Smith) and writes a Playwright
// storage state.
//
// The token is created by the pinned Hub's own Guardian module in a sandboxed
// `mix run --no-start`. No HTTP login request is made, so JWTService (and its
// Mailchimp "login" event), login-code generation and SMS/Slack forwarding never
// run. The token is issued against the real clock and is never printed.

import fs from 'node:fs'
import path from 'node:path'
import { runSandboxed, log } from './lib/proc.mjs'
import { HUB_EXPORT, AUTH_STATE, VUE_URL, BOB_USER_ID, BOB_PHONE, hubEnv } from './lib/config.mjs'

if (!/^[0-9a-f-]{36}$/.test(BOB_USER_ID)) throw new Error('Invalid demo user id')

const elixir = [
  `{:ok, token, _claims} = Fourball.Guardian.encode_and_sign(%Fourball.User{id: "${BOB_USER_ID}"})`,
  'IO.write("\\n__JWT__" <> token <> "__END__\\n")'
].join('; ')

const result = runSandboxed('hub', '/usr/bin/env', ['-i', ...hubEnv(), 'mix', 'run', '--no-start', '--no-compile', '-e', elixir],
  { cwd: HUB_EXPORT, quiet: true, timeout: 3 * 60 * 1000 })

const match = /__JWT__([A-Za-z0-9_\-.]+)__END__/.exec(result.stdout)
if (!match) throw new Error('Token minting produced no token')
const token = match[1]

const claims = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'))
const now = Math.floor(Date.now() / 1000)
if (claims.sub !== `User:${BOB_USER_ID}`) throw new Error('Token subject mismatch')
if (!(claims.iat <= now + 5 && claims.exp > now)) throw new Error('Token not valid under the current clock')

const state = {
  cookies: [],
  origins: [{
    origin: VUE_URL,
    localStorage: [
      { name: 'auth.jwt', value: token },
      { name: 'auth.phone', value: BOB_PHONE }
    ]
  }]
}
fs.mkdirSync(path.dirname(AUTH_STATE), { recursive: true, mode: 0o700 })
fs.writeFileSync(AUTH_STATE, JSON.stringify(state), { mode: 0o600 })
fs.chmodSync(AUTH_STATE, 0o600)

const iso = s => new Date(s * 1000).toISOString()
log(`token minted for ${claims.sub}: iat ${iso(claims.iat)}, exp ${iso(claims.exp)} (value not shown)`)
