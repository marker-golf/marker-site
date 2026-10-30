# Vue screenshot pipeline

Captures product screenshots from the production Vue app (`marker-golf/app`)
against an isolated Hub and database. Nothing here modifies the `app` or `hub`
repositories, `fourball_dev`, or any existing approved screenshot.

```bash
npm run screens:proof                 # full run from a clean reset; always cleans up
npm run screens:test                  # fast regression tests (no Hub, no database)
npm run screens:test:capture-failure  # integration test: failed captures cannot change published screenshots or drafts
npm run screens:video                 # homepage scoring demo video for review (see "Demo videos")
npm run screens:video:event           # multi-group event demo video for review
npm run screens:video:settlement      # complete-the-event settlement demo video for review
```

## Requirements

**macOS only.** Network isolation uses the macOS Seatbelt sandbox
(`/usr/bin/sandbox-exec`), the Hub and Vue exports clone dependency folders
with APFS copy-on-write (`cp -c`), and process checks use the BSD `ps` and
`/usr/sbin/lsof`. There is no Linux equivalent wired in.

| Tool | Version / location | Used for |
|---|---|---|
| Node 20 | `.nvmrc` (run every `npm run screens:*` with it) | pipeline scripts, Playwright |
| Node 14.18.1 | `~/.nvm/versions/node/v14.18.1` (the app's `.nvmrc`) | the Vue CLI dev server |
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
   players, tees and groups; plus the fictional user records) and a per-row
   snapshot of the users, events, scorecards, players, game_players, games
   and scores tables; marker becomes `fixtures-ready`.
   - F7 (built first): Chambers Bay Cup, a published event with three
     groups of four scored through 18 and three buy-in games (net Skins,
     net Stroke Play paying $60/$40/$20, Team Stroke Play with groups as
     teams), unlocked; the last recipe completes it. Built before the other
     fixtures and dated a week earlier, so it changes no recent-scorecard,
     recent-event or recent-partner list.
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
   `locks` may be locked, i.e. F3 and F7, and those must be fully locked
   and finalized), require that no row changed outside the locked fixtures'
   own scorecard, event and game rows, check that F7's stored final results
   reconcile and equal the settlement the capture displayed, and only then
   publish the drafts.

Cleanup, always (success, failure, timeout, Ctrl-C, SIGTERM, SIGHUP):
`servers.mjs stop`, then `scan.mjs`.

### Fixture state and re-running pieces

Captures change data (End round locks F3, Complete event locks F7; the Wolf
modal may save a Lone Wolf decision), so each capture needs a fresh build. `capture.mjs` refuses unless the marker says
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
come after every read-only one (the Wolf modal, End round on F3, Complete
event on F7). A writing recipe lists every Hub write it may send in `writes`
(method and exact path); any other write rejects the run. Recipes that lock
a fixture (`locks`) must come after every recipe that does not. A rejected run
prints the reasons and leaves the drafts unchanged
(staged files stay in `capture-staging` for inspection; recipe failures also
write `debug/<recipe>.png|txt`).

### Completed-event accounting (F7)

Before the F7 settlement is published, the recipe checks, to the cent and
only with normal taps: each game's buy-ins equal its defined pool, its
payouts equal that pool (Stroke Play pays exactly the defined places, the
team pot is split evenly within one team), its settlement pays each winner
from the pot; Overall - event equals the sum of the games for every player,
Net sums to zero, and the settlement resolves every player's Net exactly
with the pot fully paid out, both with and without "Buy-ins collected".
That checkbox is local display state (toggling it must send no request);
it is left at Vue's default, checked. Outside the sandbox, the results Vue
stored when the event was completed are checked again the same way and
compared with what was displayed.

### Reproducibility

Fixture data is identical on every run. Some Hub queries return players
without `ORDER BY`, so these can change order between builds:

- names within an event group
- the Wolf partner buttons and the Scotch closest-to-pin options
- tied leaderboard rows
- the counting-ball tick on a tied hole
- recent partners whose latest player rows were inserted in the same second
  (the Hub's `inserted_at` has one-second resolution)

Each variant is a genuine rendering of the production app. Review the
specific files you intend to approve.

## Demo videos (`video.mjs`, `video-recipes/`)

The video commands run the same steps as `screens:proof` but end with
`video.mjs`, a runner that records one named recipe from
`video-recipes/<name>.mjs` (`--recipe=<name>`; the default is the scoring
demo) and writes review files only (never into the site) to
`../.marker-screens/review/<recipe folder>/`: an FFV1 intermediate (`.mkv`),
an H.264 MP4, a VP9 WebM, a JPEG poster (final frame) and a JSON file with
the shot timings, callout positions and the results shown.

| Command | Recipe | Review folder and files |
|---|---|---|
| `npm run screens:video` | `score-round-side-games`: "Score a round with side games" (F1) | `video-poc/score-round-side-games-v2.*`, `-shots.json` |
| `npm run screens:video:event` | `run-multi-group-event`: "Run a multi-group event" (F4) | `video-event/run-multi-group-event-v2.*`, `-v2-timing.json` (v1 files have no suffix) |
| `npm run screens:video:settlement` | `complete-event-settle-up`: "Complete the event and settle up" (F7) | `video-settlement/complete-event-settle-up-v2.*`, `-v2-timing.json` |

Review files are never overwritten: if any output name already exists, the
run writes into a `rerun-<timestamp>/` subfolder instead
(`lib/video-output.mjs`), unless `--replace` is passed
(`npm run screens:video:event -- --replace`). A recipe provides its baseline
(not filmed), setup, the filmed timeline, the checks after recording and
its declared writes and the rows it changes; the runner owns everything
else below. Rows a recipe changes in place (completing an event locks the
event and its group scorecards and stores each game's summary) are captured
in full before the recording and written back afterwards (`captureRows`,
`restoreAfterVideo`); a recipe may also check the database as the recording
left it before the restore (`verifyStored`).

### Score a round with side games (`score-round-side-games`)

- **Story**: hole 10 is scored (Allan 5, Bert 5, Edward 4, Bob 3). Hole 9 was
  tied, so Bob's net 2 wins two Net Skins; the scorecard, the Skins
  standings and the Skins settlement update. A touch indicator and three
  callouts are drawn in an overlay outside the app's DOM tree under `<body>`.
- **Premium user**: Vue shows an Upgrade to Premium banner on the leaderboard
  when the profile has no active subscription. For the recording only,
  `video.mjs` inserts one fictional active subscription for Bob
  (`fixtures/video-premium.json`) after claiming the fixtures; the restore
  removes it. The screenshot fixtures stay subscription-free (db-reset
  asserts this), so the approved screenshots are unaffected. Bob's premium
  state is part of the users digest and `subscriptions` is an audited table.
- **Final frame**: after Game accounting opens, a short scroll places the
  whole Skins section just above the sticky footer; the run fails unless the
  Skins title stays below the header and the Wolf section is out of view.
  The last callout sits beside the Skins heading, aligned with the card, and
  the run fails if it would touch any text, control or the card.
- **Same guards as captures**: fixture claim, browser sandbox and network
  policy, page/console error checks. The only Hub writes allowed are the four
  `POST /api/app/scores`; anything else fails the run.
- **Checks**: the Skins change must follow exactly from the entered scores
  (winner gains the carried skins, amounts are stake x (skins x players -
  total), the settlement matches), and every game's accounting must
  reconcile (`assertSideGamesReconcile`, after recording).
- **Restore**: afterwards, even on failure, the only data changes allowed are
  the video subscription and those score rows; they are deleted and every
  fixture digest and audited row must match the fixtures-ready snapshot
  again.
- **Encoding** runs in a no-network sandbox. Outputs are checked for
  780x1688, codec, no audio track, 20-30 s duration, a full decode, and no
  metadata tags (MP4 brand fields and WebM's mandatory bare `Lavf` muxer name
  excepted). `node video.mjs --encode-only` re-encodes the last verified
  recording.
- **Tools**: static ffmpeg/ffprobe builds in the work folder, not repository
  dependencies:
  `npm --prefix ../.marker-screens/tools install ffmpeg-static@5.2.0 ffprobe-static@3.1.0`
  (downloads binaries once). The recording browser runs with
  `--force-device-scale-factor=2` so screencast frames are device pixels.

The premium user, guards, restore, encoding and tools above apply to every
recipe.

### Run a multi-group event (`run-multi-group-event`)

- **Story**: F4 (PebblePayday, 16 players in four groups; group 4 is through
  15). The event dashboard (players collapsed) shows the four groups; group
  4's settings ("Manage every group"); its scorecard with the Team Stroke
  Play column (groups are teams, best three net balls); hole 16 is scored
  (Bert 5, Ben 3, Debbie 4, Kevin 4, so three net birdies count, -3); the
  team column goes from +9 to +6 ("Scores update across the event"); the
  event leaderboard from that scorecard opens ("Live standings" beside the
  Round in progress badge for about 2.3 s), then Skins, Stroke Play and Team
  Stableford collapse and the complete Team Stroke Play table, with group 4
  moved from 4th to 3rd, holds for over 4 s with no callout. The F4 fixture
  definition is unchanged: the four scores exist only during the
  recording.
- **Checks**: the scorecard columns are matched by label (two players are
  "BB") and their stroke dots must match the arithmetic; group 4's to-par
  must change by exactly the best three net balls, no other team may
  change, places must follow the totals with no tie, the event's own
  leaderboard must show the same standings, no skin may change hands, and
  every game's and the event's accounting must reconcile
  (`assertEventAccountingReconciles` with F4).
- **Callouts**: placed in the first spot that touches no text or control;
  the scorecard callout may cover only the team column's "-" for holes not
  yet played. "Live standings" must also keep an 8 px margin from the
  badge, the fixed event header, the Event Games heading, every game heading
  and chevron, the footer and the viewport edges, or the run fails; the
  timing file records its gaps. The final frame must have no callout.

### Complete the event and settle up (`complete-event-settle-up`)

- **Story**: F7 (Chambers Bay Cup, 12 players in three groups, scored through
  18, three $10 buy-in games). The event dashboard with Players and Games
  collapsed ("Complete the event"); Complete event and Vue's confirmation;
  Yes; the lock notice "This round is complete." ("Final results,
  automatically"); the leaderboard with the games collapsed and Overall -
  event's settlement paid from the pot; "Buy-ins collected" unticked, so the
  table becomes the player-to-player settlement ("Who owes whom" beside its
  heading), then at least 4.5 s of that clean table with no callout (the
  poster). v1 ended on the pot settlement.
- **Write and restore**: the single declared write is the PUT that completes
  the event. Before the restore, F7 must be locked and finalized and its
  stored results must reconcile and equal the displayed settlement; then the
  event, scorecard and game rows are written back exactly.
- **Checks**: the settlement equals the one the open event showed, is paid
  entirely from the $360 pot (12 players x $30) and matches the reconciled
  accounting (`assertEventAccountingReconciles`). Unticking "Buy-ins
  collected" must send no request at all; the player-to-player table must
  equal the reconciled one, involve no pot and leave every player at their
  Net. Every callout keeps 8 px
  from the header, the footer, the viewport edges and the named Vue elements
  (headings, chevrons, tabs, Buy-ins collected, settlement rows, the lock
  notice) and covers no text, control or table cell.

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
