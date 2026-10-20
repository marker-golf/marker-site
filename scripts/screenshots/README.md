# Vue screenshot pipeline

Captures product screenshots from the production Vue app (`marker-golf/app`)
against an isolated Hub and database. Nothing here modifies the `app` or `hub`
repositories, `fourball_dev`, or any existing approved screenshot.

```bash
npm run screens:proof                 # full run from a clean reset; always cleans up
npm run screens:test                  # fast regression tests (no Hub, no database)
npm run screens:test:capture-failure  # integration test: failed captures cannot change drafts
```

## Requirements

**macOS only.** Network isolation uses the macOS Seatbelt sandbox
(`/usr/bin/sandbox-exec`), the Hub and Vue exports clone dependency folders
with APFS copy-on-write (`cp -c`), and process checks use the BSD `ps` and
`/usr/sbin/lsof`. There is no Linux equivalent wired in.

| Tool | Version / location | Used for |
|---|---|---|
| Node 20 | `.nvmrc` (run every `npm run screens:*` with it) | pipeline scripts, Playwright |
| Node 16.20.2 | `~/.nvm/versions/node/v16.20.2` | the Vue CLI dev server |
| Elixir / Erlang | asdf shims in `~/.asdf/shims` (Elixir 1.19, OTP 27) | the Hub |
| PostgreSQL | local server on `127.0.0.1:5432`, trust auth for your OS user | `fourball_screens`, read-only course dump |
| Homebrew | `/opt/homebrew/bin` (Apple Silicon path) | `psql`, `pg_dump`, `createdb`, `dropdb` |
| Playwright Chromium | already cached in `~/Library/Caches/ms-playwright` | captures |

The npm install skipped the browser download. If Chromium is missing, run
`npx playwright install chromium` once (this contacts Playwright's CDN).

**Repository layout.** marker-site, app and hub must be siblings:

```
Marker/
  marker-site/   (this repo)
  app/           Vue app; read-only
  hub/           Hub;     read-only
  .marker-screens/   work folder, created by the pipeline (outside every repo)
```

The app and hub working trees provide `node_modules`, `deps` and `_build`.
They are copied only when the working tree's `package-lock.json` / `mix.lock`
is byte-identical to the lockfile at the pinned commit; otherwise `prepare`
stops and names the differing lockfile.

**`fourball_dev`.** The first run (and the first run after `HUB_SHA` or the
Hub migrations change) takes a read-only, data-only `pg_dump` of five course
reference tables from `fourball_dev`. Nothing else is read from it, and
nothing is ever written to it.

## What runs where

| Piece | Location | Notes |
|---|---|---|
| Vue app | `../.marker-screens/app` | `git archive` of `APP_SHA`; `127.0.0.1:8090` |
| Hub | `../.marker-screens/hub` | `git archive` of `HUB_SHA`; `127.0.0.1:4001`; never contains `.env` |
| Database | `fourball_screens` on `127.0.0.1:5432` | built by the Hub's own migrations |
| Logs, process records, fixture state | `../.marker-screens/{logs,run}` | outside the repo |
| Auth state | `../.marker-screens/auth` (0700) | the token file is 0600 |
| Course cache | `../.marker-screens/cache` | keyed by Hub commit + migrations hash |
| Capture staging | `../.marker-screens/capture-staging` | published only after every check passes |
| Draft captures | `src/images/screenshots/{source,web}/vue-draft-*` | not referenced by the manifest |

Pinned commits, ports, sandbox ports and time limits live in `lib/config.mjs`.

## Steps (`proof.mjs`)

1. `prepare.mjs`: export the pinned commits (lockfile parity check), compile
   the Hub inside the sandbox.
2. `servers.mjs stop`: make sure nothing holds the screenshot database.
3. `db-reset.mjs`: verify the target, drop/create `fourball_screens`, check
   that the pinned Hub's `Fourball.Repo.config()` resolves to exactly
   `fourball_screens` on `127.0.0.1:5432` as your user, run the migrations,
   load the validated course cache, insert the fictional users, run the
   sanitization assertions and write the `reset` fixture-state marker.
4. `auth.mjs`: mint a JWT for Bob Smith with the Hub's Guardian module (no
   HTTP login, so no Mailchimp, SMS or Slack side effects). The token is valid
   against the real clock and is written only to the 0600 auth-state file.
5. `servers.mjs start`: re-check the Hub Repo target, then start the Hub and
   Vue, each in its own process group and sandbox, with `env -i`.
6. `fixtures.mjs`: build the fixtures through the Hub REST API and record a
   digest of each (scores, game settings, lock state; for events also
   players, tees and groups; plus the fictional user records); marker becomes
   `fixtures-ready`.
   - F1: Shinnecock scorecard through 9 (Nassau, Net Skins, Wolf).
   - F2: Torrey Pines South scorecard through 11 (Scotch, Match Play).
   - F3: Cypress Point scorecard through 18, left unlocked (Nassau, Net
     Skins); the last recipe confirms End round on it.
   - F4: PebblePayday event.
   - F5A: an empty saved event (Poppy Hills); F5B: an event at Spyglass Hill
     with nine unassigned players and one empty group (event-setup screens).
   - F6: a new Pebble Beach scorecard with only Bob on it, as Vue leaves it
     after create + add-self (add-self, partner picker, invite form).
   - The isolated Hub's own responses to the new-event ("sp") and
     new-scorecard ("shinn") course searches are recorded to `run/mocks/`
     (local course data; its USGA lookup fails on the dead loopback port).
7. `capture.mjs`: claim the fixtures (marker becomes `captured`), re-run
   inside the browser sandbox, capture into staging, validate and encode
   WebP; then, outside the sandbox, compare the fixture digests (scores and
   game settings unchanged everywhere; only fixtures a recipe declares in
   `locks` may be locked, i.e. F3) and only then publish the drafts.

Cleanup, always (success, failure, timeout, Ctrl-C, SIGTERM, SIGHUP):
`servers.mjs stop`, then `scan.mjs`.

### Fixture state and re-running pieces

Captures change data (the Wolf modal confirms a Lone Wolf decision), so each
capture needs a fresh build. `capture.mjs` refuses unless the marker says
`fixtures-ready` for the current `fourball_screens` (matched by database OID)
and the fixture definitions are unchanged since they were built. To re-run
by hand: `screens:stop`, `screens:db`, `screens:auth`, `screens:start`,
`screens:fixtures`, `screens:capture`, `screens:stop`. Or just run
`screens:proof`.

### Recorded responses and the fixed clock

A recipe can list `mocks`; capture then answers exactly those recorded Hub
GET requests (same path and query, with the Hub's own CORS and content-type
headers) and lets every other request through the normal network policy.
Each replay is logged. The browser clock is fixed per recipe; recipes that
type into debounced inputs call `letDebounceRun`, which moves the fixed time
forward one second at a time until the expected result appears (inputs can
chain two debounces).

### Transactional output

`capture.mjs` publishes nothing unless every selected recipe succeeded, there
was no network, WebSocket or redirect violation, no page error and no console
error outside `ALLOWED_CONSOLE_ERRORS`, and every PNG and WebP exists at
780×1688. Recipes are read-only unless marked `mayWrite: true`: a read-only recipe that
sends any non-GET request to the Hub rejects the run, and writing recipes must
come after every read-only one (today only the Wolf modal). A rejected run
prints the reasons and leaves the drafts unchanged
(staged files stay in `capture-staging` for inspection; recipe failures also
write `debug/<recipe>.png|txt`).

### Reproducibility

Fixture data is identical on every run. Some Hub queries return players
without `ORDER BY`, so these can change order between builds:

- names within an event group
- the Wolf partner buttons
- tied leaderboard rows
- the counting-ball tick on a tied hole

Each variant is a genuine rendering of the production app. Review the
specific files you intend to approve.

## Network isolation and external integrations

- **OS sandbox** (`lib/sandbox.mjs`): every Hub, Vue, `mix` and browser
  process runs under a Seatbelt profile that allows outbound connections only
  to specific loopback ports: Hub and `mix` → 5432 (Postgres) and 9 (the dead
  USGA port); Vue → 8090; browser → 4001 and 8090. Other loopback ports,
  LAN, internet (IPv4 and IPv6) and DNS (the mDNSResponder socket) are denied
  by the kernel.
- **Hub integrations**: the Hub gets no Mailchimp, Mandrill, Slack, Stripe,
  Twilio, OpenAI or Sentry configuration. `USGA_DOMAIN` points at
  `127.0.0.1:9`, which nothing listens on (unset, it crashes scorecard
  creation); the Hub treats the refusal as a USGA outage.
- **Browser** (`lib/browser-policy.mjs`): only `http://127.0.0.1:8090`,
  `http://127.0.0.1:4001` and `ws://` to the same two ports are allowed.
  WebSockets are intercepted before they connect; redirect chains and 3xx
  `Location` headers are checked; Google Fonts are answered from the pinned
  `@fontsource` packages; GTM and webpack-dev-server's `localhost` probe are
  the only expected blocks (`EXPECTED_BLOCKED_REQUESTS`). Anything else fails
  the capture. Chromium's own sandbox is turned off because it cannot start
  inside the Seatbelt profile (nested sandboxing); the OS sandbox around the
  whole browser stays on, and the pages are only our pinned local app.
- **Stripe, Upgrade and Checkout**: the Vue export loads the app's committed
  `.env` (Stripe publishable key, billing-portal and tip URLs; the API and
  WebSocket URLs are overridden). The Upgrade modal, Checkout and Plan screens
  load Stripe.js, which the policy blocks, so those screens currently cannot
  be captured; a recipe that opens them fails the run.

## Secrets

- Fixture API errors print only method, path, status and a redacted first
  line (the Hub's dev error page echoes request headers, including
  Authorization). All pipeline output passes through `redact()`.
- `scan.mjs` (automatic last step) scans every committable tooling file and
  every generated text file for JWTs, Bearer tokens, the active token, the
  Hub's committed config secrets and the Hub working tree's `.env` values. It
  prints file names and pattern labels only, and fails the run on any hit or
  if the auth-state permissions are not 0600/0700.

## Cleanup and recovery

- `npm run screens:stop` stops the Hub and Vue **only if** their process
  records prove ownership (PID, process group, start time, command, working
  folder and port). A record that cannot be proven (for example a PID reused
  after a reboot) is moved to `run/quarantine/` with a warning and nothing is
  signalled. Stop exits nonzero if an owned process or either port remains.
- If stop reports a port still in use by a process it could not prove, check
  it yourself (`lsof -nP -iTCP:4001 -sTCP:LISTEN`) before killing anything.
- `npm run screens:status` shows the ports and whether records exist.
- Everything generated lives in `../.marker-screens`; deleting that folder
  (with the servers stopped) and dropping `fourball_screens` resets the
  pipeline completely. The next run re-exports, re-dumps and rebuilds.
