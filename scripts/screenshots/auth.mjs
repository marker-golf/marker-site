// Mints JWTs for the fictional demo users (Bob Smith, who most captures sign
// in as, and Polly Putter, the GHIN posting captures) and writes one
// Playwright storage state for each.
//
// The tokens are created by the pinned Hub's own Guardian module in a sandboxed
// `mix run --no-start`. No HTTP login request is made, so JWTService (and its
// Mailchimp "login" event), login-code generation and SMS/Slack forwarding never
// run. The tokens are issued against the real clock and are never printed.

import fs from 'node:fs'
import path from 'node:path'
import { runSandboxed, log } from './lib/proc.mjs'
import { HUB_EXPORT, AUTH_STATE, POLLY_AUTH_STATE, VUE_URL, BOB_USER_ID, BOB_PHONE, POLLY_USER_ID, POLLY_PHONE, hubEnv } from './lib/config.mjs'

const accounts = [
  { userId: BOB_USER_ID, phone: BOB_PHONE, file: AUTH_STATE },
  { userId: POLLY_USER_ID, phone: POLLY_PHONE, file: POLLY_AUTH_STATE }
]
for (const { userId } of accounts) if (!/^[0-9a-f-]{36}$/.test(userId)) throw new Error('Invalid demo user id')

const elixir = accounts.map(({ userId }) => [
  `{:ok, token, _claims} = Fourball.Guardian.encode_and_sign(%Fourball.User{id: "${userId}"})`,
  `IO.write("\\n__JWT_${userId}__" <> token <> "__END__\\n")`
].join('; ')).join('; ')

const result = runSandboxed('hub', '/usr/bin/env', ['-i', ...hubEnv(), 'mix', 'run', '--no-start', '--no-compile', '-e', elixir],
  { cwd: HUB_EXPORT, quiet: true, timeout: 3 * 60 * 1000 })

const iso = s => new Date(s * 1000).toISOString()
for (const { userId, phone, file } of accounts) {
  const match = new RegExp(`__JWT_${userId}__([A-Za-z0-9_\\-.]+)__END__`).exec(result.stdout)
  if (!match) throw new Error('Token minting produced no token')
  const token = match[1]

  const claims = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'))
  const now = Math.floor(Date.now() / 1000)
  if (claims.sub !== `User:${userId}`) throw new Error('Token subject mismatch')
  if (!(claims.iat <= now + 5 && claims.exp > now)) throw new Error('Token not valid under the current clock')

  const state = {
    cookies: [],
    origins: [{
      origin: VUE_URL,
      localStorage: [
        { name: 'auth.jwt', value: token },
        { name: 'auth.phone', value: phone }
      ]
    }]
  }
  fs.mkdirSync(path.dirname(file), { recursive: true, mode: 0o700 })
  fs.writeFileSync(file, JSON.stringify(state), { mode: 0o600 })
  fs.chmodSync(file, 0o600)
  log(`token minted for ${claims.sub}: iat ${iso(claims.iat)}, exp ${iso(claims.exp)} (value not shown)`)
}
