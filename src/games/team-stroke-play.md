---
layout: layouts/game-guide.njk
title: Team Stroke Play — Golf Game Guide
description: "Team Stroke Play explained: how ball allocation works, gross vs net scoring, handicaps, sub-total bets, and how Marker aggregates team scores across multiple foursomes automatically."
game:
  name: Team Stroke Play
  difficulty: beginner
  difficultyLabel: Beginner
  subtitle: "Teams compete using stroke play. Marker selects the best scores from each team on every hole — automatically — and keeps a live team leaderboard across every group on the course."
  heroSubtitleWidth: "560px"
  heroStats:
    - label: Players
      value: "4+"
    - label: Teams
      value: "2+"
    - label: Format
      value: Team Stroke Play
    - label: Best For
      value: "Events & outings"
    - label: Handicap
      value: Supported
  heroCta:
    primary:
      text: Open Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Team Stroke Play?
    body: "Set up your teams in Marker before the first tee. Marker handles ball selection, handicap adjustments, sub-total settlements, and a live leaderboard across every group on the course."
    primary:
      text: Open Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
sections:
  - id: overview
    label: Overview
  - id: how-it-works
    label: How It Works
  - id: ball-allocation
    label: Ball Allocation
  - id: configuration
    label: Setup in Marker
  - id: example
    label: Worked Example
  - id: gross-vs-net
    label: Gross vs. Net
  - id: vs-team-count-x
    label: vs. TeamCountX
  - id: vs-team-stableford
    label: vs. Team Stableford
  - id: strategy
    label: Strategy
  - id: variations
    label: Variations
  - id: why-marker
    label: Why Marker
  - id: faq
    label: FAQ
  - id: related
    label: Related Games
---

{% from "components/game-guide.njk" import SectionHeader, ConfigCard, TipCard, FaqItem, RelatedCard, MarkerImplNote %}

<section class="section section--white" id="overview">
<div class="container">

{{ SectionHeader("What Is Team Stroke Play?", "Teams competing hole by hole on total strokes") }}

<div class="gg-prose">

Team Stroke Play is a format where players are divided into teams and compete on combined stroke totals. Instead of every player's score contributing to the team result, Marker counts a configurable number of best scores — called **balls** — per hole. The team with the lowest total at the end of the round wins.

The most common configuration is **1 ball per hole**: each hole, the team member who posts the lowest score contributes that score to the team total. The other team members' scores on that hole do not count. This is equivalent to the format sometimes called Best Ball or Four-Ball.

Teams can be any size, and teammates can play in different foursomes. Marker aggregates scores across all groups on the course and maintains a live leaderboard throughout the round.

</div>

<div class="gg-quick-rules">
<h3 class="gg-quick-rules__title">Quick Rules</h3>
<ul class="gg-quick-rules__list">
<li>Players are assigned to teams of two or more before the round.</li>
<li>Each hole, Marker automatically selects the best scoring ball(s) from each team.</li>
<li>The selected scores are summed to produce the team's score for that hole.</li>
<li>Team scores accumulate across 18 holes. Lowest total wins.</li>
<li>Gross (no handicap) and Net (with handicap) play are both supported.</li>
<li>Optional front 9 / back 9 sub-total bets can run alongside the overall result.</li>
<li>Teammates can play in separate foursomes — Marker aggregates all scores.</li>
</ul>
</div>

{{ MarkerImplNote("Marker assigns teams before the round, applies handicap strokes per player per hole when Net scoring is configured, automatically selects the counting ball(s) from each team on every hole, accumulates running team totals, maintains a live leaderboard across all scorecards, and calculates settlement when a buy-in is set. Nothing is tracked manually.") }}

</div>
</section>

<section class="section" id="how-it-works">
<div class="container">

{{ SectionHeader("How Team Stroke Play Works", "From first tee to final settlement") }}

<div class="gg-prose">

**Step 1 — Set up teams.** A commissioner assigns players to teams in Marker's game settings before the round. Teams can be any size; the same number of players per team is not required. A minimum of 4 players is needed to form at least two teams.

**Step 2 — Configure ball allocation.** The commissioner sets how many balls count per hole. The default is 1 net ball — the single best (lowest) score from each team counts per hole. Teams of 3 might count 2 balls; large outings with teams of 4 sometimes count 3 balls. The number of counting balls cannot exceed the team size.

**Step 3 — Players score normally.** Every player enters their own score on each hole, just like individual stroke play. Nothing changes about how they play.

**Step 4 — Marker selects the counting balls.** After each hole's scores are entered, Marker automatically identifies the best score(s) from each team according to the ball allocation. Players whose scores count are highlighted on the scorecard. No manual selection is required.

**Step 5 — Team totals accumulate.** The counting score(s) from each hole are added to the team's running total. Marker shows the team total and position-to-par throughout the round.

**Step 6 — Leaderboard updates live.** As holes are completed across all groups, Marker updates the team leaderboard in real time. Teams are ranked by total strokes relative to par (lowest wins). Ties are broken by the number of holes completed — the team that has finished more holes ranks higher.

**Step 7 — Settlement.** If a buy-in amount is set, Marker calculates the payout when the round ends. The winning team's players split the pot equally.

</div>

</div>
</section>

<section class="section section--white" id="ball-allocation">
<div class="container">

{{ SectionHeader("Ball Allocation", "How many scores count per hole — and which ones") }}

<div class="gg-prose">

Ball allocation is the central configuration in Team Stroke Play. It controls how many scores are counted per hole and whether those scores are gross or net.

**Net balls** count handicap-adjusted scores. The N players with the lowest net scores on a hole contribute their net scores to the team total. Net balls are available when handicap scoring is enabled.

**Gross balls** count unadjusted (raw) scores. The N players with the lowest gross scores contribute their gross scores to the team total.

You can configure any combination of net and gross balls, up to the size of the smallest team. A team of 2 can count at most 2 balls per hole. A team of 4 can count up to 4.

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th>Net Balls</th>
<th>Gross Balls</th>
<th>Team Size</th>
<th>What Counts</th>
<th>Common Name</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>0</td>
<td>2+</td>
<td>Best net score</td>
<td>Best Ball / Four-Ball</td>
</tr>
<tr>
<td>2</td>
<td>0</td>
<td>3+</td>
<td>Two best net scores</td>
<td>Two Best Balls</td>
</tr>
<tr>
<td>0</td>
<td>1</td>
<td>2+</td>
<td>Best gross score</td>
<td>Gross Best Ball</td>
</tr>
<tr>
<td>0</td>
<td>2</td>
<td>3+</td>
<td>Two best gross scores</td>
<td>Gross Two Best Balls</td>
</tr>
<tr>
<td>N</td>
<td>0</td>
<td>N (full team)</td>
<td>All net scores summed</td>
<td>Aggregate / Stroke Play</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

**Mixed net and gross.** You can configure both net and gross balls at the same time — for example, 1 net ball and 1 gross ball from a team of 3. When mixing net and gross, Marker uses the **lowest total** selection by default: it finds the combination of players (one contributing their net score, one contributing their gross score) that produces the lowest combined total. An alternate "gross first" mode picks the lowest gross score first, then picks the lowest net score from the remaining players.

**Per-hole-range overrides.** Marker supports multiple ball allocation rules applied to different hole ranges. A commissioner could configure 2 balls on holes 1–9 and 1 ball on holes 10–18. Each range has its own net/gross settings.

**Incomplete holes.** If a team does not have enough scores entered for a hole to satisfy the ball allocation — for example, 1 of 2 players hasn't scored yet — Marker does not count that hole until all required scores are available.

</div>

</div>
</section>

<section class="section" id="configuration">
<div class="container">

{{ SectionHeader("Setup in Marker", "Configuration options for Team Stroke Play") }}

<div class="gg-cards">

{{ ConfigCard(
  "Teams",
  "Team Roster",
  "Assign each player to a team before the round. Teams can be any size. A commissioner can shuffle or manually assign players. Teammates may play in separate foursomes — Marker aggregates their scores.",
  ["2 or more players per team", "Minimum 4 players total", "Manual assignment", "Multi-scorecard supported"]
) }}

{{ ConfigCard(
  "Ball Allocation",
  "Counting Balls Per Hole",
  "Set how many net and/or gross balls count per hole. The default is 1 net ball. The maximum is the size of the smallest team. Multiple allocation ranges can be added for different hole groups.",
  ["Net balls: 0 to team size", "Gross balls: 0 to team size", "Total balls ≤ team size", "Per-hole-range overrides available"]
) }}

{{ ConfigCard(
  "Handicap",
  "Net vs. Gross Scoring",
  "Handicap is off by default — scores are used as played. Enable it to apply course handicap strokes per player per hole for net scoring. The handicap percentage (default 100%) can be adjusted.",
  ["Off by default (gross play)", "Enable for net scoring", "Percentage: 0–100%", "Stroke-index allocation per player"]
) }}

{{ ConfigCard(
  "Sub-totals",
  "Round Total & Sub-Rounds",
  "The overall 18-hole result is always the primary settlement. Additional sub-rounds (e.g., holes 1–9, holes 10–18) can be added, each with its own independent buy-in and payout.",
  ["18-hole total always included", "Optional front 9 sub-total", "Optional back 9 sub-total", "Each sub-round has its own buy-in"]
) }}

{{ ConfigCard(
  "Buy-in & Settlement",
  "Accounting",
  "Set a buy-in amount per player for the overall result or for each sub-round. The pot equals buy-in × number of players. The winning team splits the pot equally among its members.",
  ["Per-player buy-in per sub-total", "Pool-based payout (winner takes pot)", "Optional split payouts (1st/2nd)", "Settled at end of round"]
) }}

</div>

</div>
</section>

<section class="section section--white" id="example">
<div class="container">

{{ SectionHeader("Worked Example", "2 teams of 2, best 1 net ball, 4 holes") }}

<div class="gg-prose">

**Setup:** 2 teams of 2. Ball allocation: 1 net ball per hole. Handicap enabled.

- **Team A:** Alex (hdcp 10) and Blake (hdcp 4)
- **Team B:** Chris (hdcp 8) and Dana (hdcp 2)

Each hole, Marker selects the player with the lowest net score from each team. That net score counts as the team's hole score.

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th>Hole</th>
<th>Par</th>
<th>Player</th>
<th>Gross</th>
<th>Hdcp Stroke</th>
<th>Net</th>
<th>Counts?</th>
<th>Team Hole</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="2">1</td>
<td rowspan="2">4</td>
<td>Alex</td>
<td>5</td>
<td>+1</td>
<td>4</td>
<td>—</td>
<td rowspan="2"><strong>3 (−1)</strong></td>
</tr>
<tr>
<td>Blake</td>
<td>4</td>
<td>+1</td>
<td><strong>3</strong></td>
<td>✓</td>
</tr>
<tr>
<td rowspan="2"></td>
<td rowspan="2"></td>
<td>Chris</td>
<td>5</td>
<td>+1</td>
<td>4</td>
<td>—</td>
<td rowspan="2"><strong>3 (−1)</strong></td>
</tr>
<tr>
<td>Dana</td>
<td>4</td>
<td>+1</td>
<td><strong>3</strong></td>
<td>✓</td>
</tr>
<tr class="gg-table__divider">
<td rowspan="2">2</td>
<td rowspan="2">4</td>
<td>Alex</td>
<td>4</td>
<td>+1</td>
<td><strong>3</strong></td>
<td>✓</td>
<td rowspan="2"><strong>3 (−1)</strong></td>
</tr>
<tr>
<td>Blake</td>
<td>5</td>
<td>0</td>
<td>5</td>
<td>—</td>
</tr>
<tr>
<td rowspan="2"></td>
<td rowspan="2"></td>
<td>Chris</td>
<td>5</td>
<td>+1</td>
<td>4</td>
<td>—</td>
<td rowspan="2"><strong>4 (E)</strong></td>
</tr>
<tr>
<td>Dana</td>
<td>4</td>
<td>0</td>
<td><strong>4</strong></td>
<td>✓</td>
</tr>
<tr class="gg-table__divider">
<td rowspan="2">3</td>
<td rowspan="2">3</td>
<td>Alex</td>
<td>3</td>
<td>0</td>
<td><strong>3</strong></td>
<td>✓</td>
<td rowspan="2"><strong>3 (E)</strong></td>
</tr>
<tr>
<td>Blake</td>
<td>4</td>
<td>0</td>
<td>4</td>
<td>—</td>
</tr>
<tr>
<td rowspan="2"></td>
<td rowspan="2"></td>
<td>Chris</td>
<td>3</td>
<td>0</td>
<td><strong>3</strong></td>
<td>✓</td>
<td rowspan="2"><strong>3 (E)</strong></td>
</tr>
<tr>
<td>Dana</td>
<td>4</td>
<td>+1</td>
<td>3</td>
<td>—</td>
</tr>
<tr class="gg-table__divider">
<td rowspan="2">4</td>
<td rowspan="2">5</td>
<td>Alex</td>
<td>6</td>
<td>+1</td>
<td>5</td>
<td>—</td>
<td rowspan="2"><strong>4 (−1)</strong></td>
</tr>
<tr>
<td>Blake</td>
<td>5</td>
<td>+1</td>
<td><strong>4</strong></td>
<td>✓</td>
</tr>
<tr>
<td rowspan="2"></td>
<td rowspan="2"></td>
<td>Chris</td>
<td>6</td>
<td>+1</td>
<td><strong>5</strong></td>
<td>✓</td>
<td rowspan="2"><strong>5 (E)</strong></td>
</tr>
<tr>
<td>Dana</td>
<td>7</td>
<td>0</td>
<td>7</td>
<td>—</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

**Running leaderboard after 4 holes** (par = 16):

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th>Position</th>
<th>Team</th>
<th>H1</th>
<th>H2</th>
<th>H3</th>
<th>H4</th>
<th>Total</th>
<th>To Par</th>
</tr>
</thead>
<tbody>
<tr>
<td>1st</td>
<td><strong>Team A</strong></td>
<td>3</td>
<td>3</td>
<td>3</td>
<td>4</td>
<td><strong>13</strong></td>
<td><strong>−3</strong></td>
</tr>
<tr>
<td>2nd</td>
<td>Team B</td>
<td>3</td>
<td>4</td>
<td>3</td>
<td>5</td>
<td>15</td>
<td>−1</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

**Key observations from this example:**

- On Hole 1, both teams posted the same score (net 3). The leaderboard is level.
- On Hole 2, Alex's handicap stroke turned his gross 4 into a net 3, which beats Dana's gross 4 with no stroke. The handicap changed which team scored better on this hole.
- On Hole 3, Dana also holds a net 3 (gross 4 with a stroke), but since Chris already posted a gross 3 on the same hole, Chris's score is selected first. Dana's stroke doesn't help here.
- On Hole 4, Blake's stroke turns a gross 5 into a net 4, giving Team A a significant edge over Team B.

</div>

</div>
</section>

<section class="section" id="gross-vs-net">
<div class="container">

{{ SectionHeader("Gross vs. Net", "How handicap adjustments change which scores count") }}

<div class="gg-prose">

**Gross Team Stroke Play** uses raw scores exactly as played. No adjustments are made. The default Marker Team Stroke Play game is effectively gross play because handicap is off by default and the "net ball" and "gross ball" counts are equivalent when no strokes are applied.

**Net Team Stroke Play** applies individual course handicap strokes to each player before selecting counting balls. This means ball selection happens on adjusted scores — which can change which player's score counts for the team.

</div>

<div class="gg-hdcp-grid">
<div class="gg-hdcp-card">
<div class="gg-hdcp-card__head">Net Play</div>
<ul class="gg-hdcp-card__list">
<li>Handicap strokes are applied per player per hole</li>
<li>Ball selection uses net (adjusted) scores</li>
<li>A high-handicapper's stroke can beat a low-handicapper's gross score</li>
<li>Configured via: enable handicap, set net ball count</li>
<li>Common for mixed-skill group events</li>
</ul>
</div>
<div class="gg-hdcp-card">
<div class="gg-hdcp-card__head">Gross Play</div>
<ul class="gg-hdcp-card__list">
<li>Scores are used exactly as played</li>
<li>Ball selection uses gross scores only</li>
<li>Lower handicappers contribute more frequently</li>
<li>Configured via: leave handicap off, use gross ball count</li>
<li>Common for competitive same-skill groups</li>
</ul>
</div>
</div>

<div class="gg-prose">

**How strokes are allocated.** When handicap is enabled, Marker distributes each player's course handicap across the 18 holes according to stroke index — the hardest holes (lowest stroke index) receive strokes first. A player with a 4-stroke handicap receives one stroke on each of the 4 hardest holes.

**Handicap percentage.** The percentage setting (default 100%) scales handicaps before application. Setting it to 80% reduces each player's effective strokes by 20%, which is common in competitive formats to prevent heavy handicappers from dominating.

For more on how Marker handles handicap allocation, see the [Handicap Settings guide](/games/handicap-settings/).

</div>

</div>
</section>

<section class="section section--white" id="vs-team-count-x">
<div class="container">

{{ SectionHeader("Team Stroke Play vs. TeamCountX", "Two team formats that can seem similar but work differently") }}

<div class="gg-prose">

Team Stroke Play and TeamCountX are both team stroke formats where not every player's score counts. The difference is in when and how counting decisions are made.

**In Team Stroke Play**, ball selection is automatic and happens hole by hole. Marker compares the team's scores on each hole and automatically takes the best N. There is no strategy involved in score selection — you simply play and Marker handles the rest.

**In TeamCountX**, a commissioner sets a target count X — for example, "count 30 scores from 4 players × 18 holes = 72 possible scores." Teams choose which X scores to count as play progresses, and locked-in selections cannot be changed. A team might choose to count a weak score early in the round to preserve the option to discard a catastrophic late score. Score selection in TeamCountX is an active strategic decision made under uncertainty throughout the round.

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th></th>
<th>Team Stroke Play</th>
<th>TeamCountX</th>
</tr>
</thead>
<tbody>
<tr>
<td>Score selection</td>
<td>Automatic, per hole</td>
<td>Manual, locked as you play</td>
</tr>
<tr>
<td>When are decisions made?</td>
<td>Continuously (no player input)</td>
<td>During play, under uncertainty</td>
</tr>
<tr>
<td>Can selections be undone?</td>
<td>N/A (automatic)</td>
<td>No — locked when submitted</td>
</tr>
<tr>
<td>X is applied per…</td>
<td>Per hole (N balls per hole)</td>
<td>Per round (X total from all holes)</td>
</tr>
<tr>
<td>Strategic complexity</td>
<td>Low (set up and play)</td>
<td>High (active in-round decisions)</td>
</tr>
<tr>
<td>Best for</td>
<td>Events, outings, casual groups</td>
<td>Competitive groups who want strategy</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

The key distinction: in Team Stroke Play you always count your best hole-by-hole scores automatically. In TeamCountX, you have a finite budget of counting scores across the entire round and must spend that budget wisely — the timing of your selections is part of the game.

</div>

</div>
</section>

<section class="section" id="vs-team-stableford">
<div class="container">

{{ SectionHeader("Team Stroke Play vs. Team Stableford", "Same team format, different scoring unit") }}

<div class="gg-prose">

Both Team Stroke Play and Team Stableford collect individual scores, select a counting ball per hole, and accumulate a running team total. The difference is what unit is accumulated.

**Team Stroke Play** accumulates strokes. The team's best net (or gross) score on each hole is added to the team total. Low total wins. One disastrous hole for a counting player can damage the team's position.

**Team Stableford** accumulates Stableford points. The team member with the best net score on each hole contributes their Stableford point value to the team total. High points total wins. A blow-up hole earns zero (or −1) points instead of adding damage proportional to how bad the score was — which limits the impact of bad holes.

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th></th>
<th>Team Stroke Play</th>
<th>Team Stableford</th>
</tr>
</thead>
<tbody>
<tr>
<td>Unit</td>
<td>Strokes</td>
<td>Stableford points</td>
</tr>
<tr>
<td>Better score is…</td>
<td>Lower</td>
<td>Higher</td>
</tr>
<tr>
<td>Bad hole impact</td>
<td>Full damage (all strokes count)</td>
<td>Capped at −1 point</td>
</tr>
<tr>
<td>Birdie impact</td>
<td>−1 stroke relative to par</td>
<td>+3 points</td>
</tr>
<tr>
<td>Formats feel like</td>
<td>Traditional stroke play</td>
<td>More forgiving; encourages attacking</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

Choose Team Stroke Play when your group prefers traditional stroke scoring and wants a direct total to compare against par. Choose [Team Stableford](/games/team-stableford/) when you want to limit the damage from blow-up holes and keep players engaged late in the round regardless of how their individual round is going.

</div>

</div>
</section>

<section class="section section--white" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Getting the most out of Team Stroke Play") }}

<div class="gg-cards gg-cards--tips">

{{ TipCard(
  "Team Composition",
  "Balance your teams",
  "Evenly matched teams make for a better competition. When using handicaps, mixing high- and low-handicappers within each team distributes the stroke advantage. In gross play, stacking the best players on one team produces a predictable outcome."
) }}

{{ TipCard(
  "Ball Allocation",
  "Match balls to team size",
  "Counting 1 ball from a team of 2 is tight — one bad hole from each player leaves the team with nothing. Counting 2 balls from a team of 3 gives each player more chances to contribute. Larger events often use 2 or 3 counting balls to keep more players engaged."
) }}

{{ TipCard(
  "Playing Your Role",
  "Understand your position on the team",
  "If your partner is already on the green in good shape, take more risk — you might beat their score or you might not matter, but the team is covered. If your partner has already made a mess of a hole, a safe par or bogey secures the team a counting score rather than forcing them to use a bad number."
) }}

{{ TipCard(
  "Late Round",
  "Know the leaderboard",
  "Marker shows live standings throughout the round. If your team is behind late, both players need to push for birdies since only one score counts anyway — conservative play rarely helps a team that needs to make up ground."
) }}

{{ TipCard(
  "Sub-round Bets",
  "Front vs. back 9 dynamics",
  "If a separate front 9 bet is running, treat it as its own mini-competition. A slow start on the back 9 bet might still be recoverable, while the overall 18-hole result remains in play separately."
) }}

{{ TipCard(
  "Net Play",
  "Know when your stroke kicks in",
  "In net play, your handicap stroke on a given hole can push your net score below your partner's — meaning you might contribute the counting ball on a hole where you played worse gross. Marker handles this automatically, but knowing which holes you receive strokes on helps you manage risk."
) }}

</div>

</div>
</section>

<section class="section" id="variations">
<div class="container">

{{ SectionHeader("Common Variations", "Different team stroke-play formats in broader use") }}

<div class="gg-prose">

**Best Ball (Four-Ball).** The most common team format: each hole, the single lowest score from the team counts. In match play it is called Four-Ball; in stroke play it is commonly called Best Ball. In Marker, this corresponds to `1 net ball` or `1 gross ball` allocation.

**Two Best Balls of Four.** Four players per team, two lowest scores per hole count. This format is common in larger corporate or charity outings where more players need to contribute to keep everyone engaged. In Marker: `2 net balls` on a team of 4.

**Aggregate Team Stroke Play.** Every player's score counts on every hole — no scores are discarded. The team total is the sum of all players' scores. In Marker: set the ball count equal to the team size. This format amplifies the effect of any individual bad hole.

**Shamble.** Players drive from a single selected tee shot, then play their own ball from there through the green. This is a set-up format affecting where play begins; it is not a scoring variant implemented within Marker's ball-allocation system.

**Scramble.** All players play from the best team shot on every stroke. Scramble is not a Team Stroke Play variant — it is a fundamentally different format where teams share a single ball through the hole rather than playing individual balls. Marker does not implement Scramble.

**Gross vs. Net.** All of the above can be played gross (no handicap) or net (with handicap). The choice significantly affects which players contribute counting scores and how competitive mixed-handicap groups play.

</div>

</div>
</section>

<section class="section section--white" id="why-marker">
<div class="container">

{{ SectionHeader("Why Use Marker?", "What Marker automates in Team Stroke Play") }}

<div class="gg-cards">

{{ TipCard(
  "Automatic",
  "No manual ball selection",
  "Marker automatically identifies the best scoring ball(s) from each team after every hole. Commissioners and players never need to compare scores, pick counting numbers, or track which holes count manually."
) }}

{{ TipCard(
  "Multi-Group",
  "All groups in one leaderboard",
  "When an event has 4 groups of 4 playing simultaneously, Marker aggregates all scores into a single team leaderboard updated in real time. No waiting until everyone finishes to find out who won."
) }}

{{ TipCard(
  "Handicap Handling",
  "Per-player, per-hole stroke allocation",
  "Marker distributes each player's handicap across the 18 holes by stroke index automatically. Net scores are calculated without any manual math."
) }}

{{ TipCard(
  "Sub-round Bets",
  "Front and back 9 tracked simultaneously",
  "If you're running a separate front 9 or back 9 bet alongside the overall, Marker tracks all sub-totals and calculates each settlement independently at the end of the round."
) }}

{{ TipCard(
  "Live Standings",
  "Teams know their position mid-round",
  "Every player on the scorecard can see live team standings from their phone. No need to calculate relative positions in your head while also trying to play golf."
) }}

{{ TipCard(
  "Instant Settlement",
  "Payouts calculated automatically",
  "When the round ends, Marker calculates the pool payout and divides it among the winning team's members. No one needs to manually calculate who owes what."
) }}

</div>

</div>
</section>

<section class="section" id="faq">
<div class="container">

{{ SectionHeader("FAQ", "Common questions about Team Stroke Play in Marker") }}

<div class="gg-faq">

{{ FaqItem(
  "What is Team Stroke Play?",
  "Team Stroke Play is a format where players compete in teams using stroke play scoring. Each hole, Marker automatically selects the best score(s) from each team according to the ball allocation. The team with the lowest total across the round wins."
) }}

{{ FaqItem(
  "How many players can be on a team?",
  "Teams can be any size. A minimum of 4 players total (at least two teams of two) is required to start the game in Marker. There is no maximum team size, though the number of counting balls cannot exceed the size of the smallest team."
) }}

{{ FaqItem(
  "Do all players' scores count every hole?",
  "Only the configured number of best balls count per hole. With 1 net ball, only one player's score contributes to the team's hole total. The other players' scores on that hole are entered but not counted. With the full team counting (all balls), every player's score is included."
) }}

{{ FaqItem(
  "How does Marker pick which score counts?",
  "Automatically. After each hole's scores are entered, Marker sorts the team's scores and selects the lowest N net (or gross) scores as specified by the ball allocation. No commissioner input is required — the selection is made and displayed on the scorecard immediately."
) }}

{{ FaqItem(
  "Can I change which ball is selected on a hole?",
  "No. Ball selection in Team Stroke Play is automatic and determined by the scores. It is not a manual selection. If you want a format where teams actively choose which scores to count, see TeamCountX."
) }}

{{ FaqItem(
  "Can Team Stroke Play use handicaps?",
  "Yes. Enable handicap in the game settings and configure net balls in the ball allocation. Marker will apply course handicap strokes per player per hole, and ball selection will use net scores. Handicap is off by default."
) }}

{{ FaqItem(
  "What is the difference between Gross and Net Team Stroke Play?",
  "In Gross play, scores are used as played with no adjustments. In Net play, each player's course handicap is applied before ball selection. Net play allows high-handicappers to contribute counting scores on their stroke holes even when their gross scores are not the best on the team."
) }}

{{ FaqItem(
  "Can teammates play in different groups?",
  "Yes. Team Stroke Play supports multiple scorecards. Teammates in different foursomes each enter their own scores, and Marker aggregates all scores across groups into a single team leaderboard. This is the standard setup for larger outings."
) }}

{{ FaqItem(
  "How does the leaderboard rank teams?",
  "Teams are ranked by total strokes relative to par (lowest wins). If two teams are tied on total strokes to par, the team that has completed more holes ranks higher."
) }}

{{ FaqItem(
  "How does settlement work?",
  "If a buy-in amount is configured, the pot equals the buy-in amount × total number of players. The winning team's non-blind members split the pot equally. Optional sub-round bets (front 9, back 9) are settled independently under the same formula."
) }}

{{ FaqItem(
  "How is Team Stroke Play different from TeamCountX?",
  "In Team Stroke Play, ball selection is automatic on every hole — you always count the best N scores per hole with no decisions required. In TeamCountX, teams have a total count budget for the round and actively choose which individual scores to lock in as play progresses. TeamCountX decisions are strategic and cannot be undone. See the TeamCountX guide for a full comparison."
) }}

{{ FaqItem(
  "How is Team Stroke Play different from Team Stableford?",
  "Team Stroke Play accumulates strokes (lower is better). Team Stableford accumulates Stableford points (higher is better). Stableford caps the damage from a blow-up hole at −1 point; stroke play passes the full cost through. See the Team Stableford guide for a full comparison."
) }}

</div>

</div>
</section>

<section class="section section--white" id="related">
<div class="container">

{{ SectionHeader("Related Games", "Other formats you might enjoy") }}

<div class="gg-related">

{{ RelatedCard(
  "TeamCountX",
  "Teams collect all scores and choose exactly X to count across the round. Active selection strategy, decisions locked as you play.",
  "/games/team-count-x/"
) }}

{{ RelatedCard(
  "Team Stableford",
  "Teams accumulate Stableford points from the best scoring player on each hole. More forgiving of bad holes.",
  "/games/team-stableford/"
) }}

{{ RelatedCard(
  "Stableford",
  "Individual points-based scoring where blow-up holes cost less. The foundation of Team Stableford.",
  "/games/stableford/"
) }}

{{ RelatedCard(
  "Match Play",
  "Hole-by-hole competition between two players or teams. Win, lose, or halve each hole — total strokes don't matter.",
  "/games/match-play/"
) }}

{{ RelatedCard(
  "Handicap Settings",
  "How Marker allocates handicap strokes across 18 holes, percentage settings, and override options.",
  "/games/handicap-settings/"
) }}

</div>

</div>
</section>
