---
layout: layouts/game-guide.njk
title: Team Stableford — Golf Game Guide
description: "Team Stableford rules explained: how teams earn Stableford points, ball allocation, handicap handling, Quota mode, and how Marker tracks team totals and settlement automatically."
game:
  name: Team Stableford
  difficulty: intermediate
  difficultyLabel: Intermediate
  subtitle: "Teams earn Stableford points hole by hole. On each hole, the team member with the best net score contributes their points to the team total. Most points wins."
  heroSubtitleWidth: "540px"
  heroStats:
    - label: Players
      value: "4 or more"
    - label: Teams
      value: "2+"
    - label: Format
      value: Team Points
    - label: Handicap
      value: Supported
    - label: Available In
      value: Marker
  heroCta:
    primary:
      text: Play Team Stableford in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Team Stableford?
    body: "Set up your teams and Marker handles ball selection, handicap strokes, Stableford points, and team totals automatically — hole by hole."
    primary:
      text: Start Your Team Stableford Game
      href: "https://app.marker.golf"
    secondary:
      text: Read the Setup Guide
      href: "/tutorials/getting-started/"
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
    label: Example Round
  - id: strategy
    label: Strategy
  - id: gross-vs-net
    label: Gross vs. Net
  - id: variations
    label: Variations
  - id: why-marker
    label: Why Marker
  - id: faq
    label: FAQ
  - id: related
    label: Related Games
---

{# ── Import game-guide macros ──────────────────────────────────────────── #}
{% from "components/game-guide.njk" import SectionHeader, ConfigCard, ScreenshotPlaceholder, TipCard, FaqItem, RelatedCard, MarkerImplNote %}

{# ================================================================
   1. OVERVIEW
   ================================================================ #}
<section class="section section--white" id="overview">
<div class="container">

{{ SectionHeader("Overview", "What Is Team Stableford?",
  "Individual Stableford scoring, organized into teams. Each hole, the team's best performer contributes their Stableford points. Most total team points wins.") }}

<div class="gg-prose">

Team Stableford combines the Stableford points system with team competition. Each player plays their own ball, earns their own Stableford points, and the team's score for each hole comes from one (or more) of those individual performances — typically the player with the best net score on that hole.

This creates a format that is at once familiar and strategic: individual players still feel the pressure of their personal score, but the team has a built-in safety net. A team member who makes a triple bogey doesn't hurt the team if anyone else on the team scored par or better.

Team Stableford is a separate, distinct game in Marker from individual Stableford. It requires teams, minimum four players, and is a premium feature. It supports all the same configuration options as individual Stableford — customizable point values, Quota mode, net or gross scoring — applied at the team level.

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">4+</div>
<div class="gg-quick-stat__lbl">Minimum players (2 teams)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">1</div>
<div class="gg-quick-stat__lbl">Score counts per hole (default)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">2+</div>
<div class="gg-quick-stat__lbl">Teams supported</div>
</div>
</div>

<div class="gg-callout gg-callout--info">
<p><strong>Team Stableford vs. individual Stableford.</strong> In individual Stableford, every player's points count on every hole and all players compete in one ranking. In Team Stableford, players compete within teams — only the best player's points count per hole, and team totals determine the winner. See the <a href="{{ '/games/stableford/' | url }}">Stableford guide</a> for the individual format.</p>
</div>

{{ MarkerImplNote("Marker applies handicap strokes per player, calculates each player's Stableford points for each hole, selects the best-performing team member's points automatically, and maintains a live team leaderboard. Teams are configured in the game setup. All point values are customizable. Quota mode is supported at the team level.") }}

</div>
</section>

{# ================================================================
   2. HOW IT WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

{{ SectionHeader("Mechanics", "How Team Stableford Works",
  "Five steps from team setup to final standings.") }}

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Teams are set up before the round</h3>
<p>A commissioner splits players into teams using Marker's team roster. Teams can be any size, though most groups play 2-player or 4-player teams. All team members play in the same round; their scores are attributed to their team for the duration of the event.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Every player plays every hole individually</h3>
<p>Each player plays their own ball on every hole, recording their gross score. Handicap strokes are applied by Stroke Index to produce each player's net score. Every player has a net score and a gross score for every hole they play.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Each player earns Stableford points for the hole</h3>
<p>Marker compares each player's net score to par and looks up the Stableford point value. A net birdie earns 3 points, a net par earns 2 points, a net bogey earns 1 point, a double bogey earns 0, and a triple bogey or worse costs 1 point. These are the same points used in individual Stableford.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>The team's best score counts for the hole</h3>
<p>Marker identifies which team member had the best net score on the hole (the lowest raw net strokes, which corresponds to the highest Stableford points). By default, only that one player's Stableford points count toward the team total for the hole. Other team members' scores are not included — but they may count on future holes.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>Team point totals accumulate over 18 holes</h3>
<p>The team's score for each hole is summed across the round. The team with the most total Stableford points wins. In Quota mode, each team has a combined personal target and the team that beats their quota by the most wins instead.</p>
</div>
</div>

</div>

<div class="gg-callout gg-callout--info" style="margin-top:24px;">
<p><strong>Key difference from TeamCountX.</strong> TeamCountX selects the best raw stroke scores from all team members and counts a configured number (X). Team Stableford selects the best Stableford points scores — not raw strokes — and the result is a point total, not a stroke total. The lowest-stroke player on a hole will also be the highest-Stableford-points player (points and strokes are inversely correlated), so the selection mechanism is equivalent.</p>
</div>

</div>
</section>

{# ================================================================
   3. BALL ALLOCATION
   ================================================================ #}
<section class="section section--white" id="ball-allocation">
<div class="container">

{{ SectionHeader("Ball Allocation", "Configuring How Many Scores Count",
  "The ball allocation setting controls how many team members' Stableford points count per hole.") }}

<div class="gg-prose">

The default configuration counts **1 net ball per hole**: the team takes only the best-performing team member's net Stableford points. Other members' scores are set aside for that hole — though they contribute on holes where they perform best.

The ball allocation setting is flexible. You can configure it to count more scores per hole, mix net and gross balls, or average points across the team.

</div>

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">1 Net Ball (Default) <span class="gg-hdcp-rec-badge">Default</span></div>
<div class="gg-hdcp-option__desc">The best net score from any one team member counts per hole. One player's net Stableford points become the team's hole total. The team member who performs best on each hole automatically contributes — no selection required.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">2 Net Balls</div>
<div class="gg-hdcp-option__desc">The two best net scores from team members count per hole. The team's hole total is the sum of those two players' net Stableford points. Common with larger teams — more players contribute to each hole, reducing the impact of one bad performance.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">1 Gross + 1 Net</div>
<div class="gg-hdcp-option__desc">One gross ball (best raw score) and one net ball (best handicap-adjusted score) per hole. The team's points come from two players — one selected on gross performance, one on net. Common when the group wants to reward both raw ability and handicap performance.</div>
</div>

</div>

<div class="gg-prose" style="margin-top:28px;">

**How ball selection works.** When the ball count is 1 net ball, Marker ranks all team members who have a score for the hole by their raw net stroke count (lowest first) and takes the top one. That player's net Stableford points become the team's contribution for that hole. There is nothing to manually select — Marker identifies the best player automatically.

**What happens if fewer players score than required.** If a team has only 2 players and the ball count is 2 net balls, but one player did not complete the hole, Marker cannot fill the required count — no points are awarded to the team for that hole. Players should complete every hole for the team to score optimally.

**Average mode.** Team Stableford supports an average mode in Marker where team points per hole are divided by the number of team members before accumulating. This normalizes scores when teams have different sizes. Average mode is not enabled by default.

</div>

{{ ScreenshotPlaceholder("Ball Allocation Settings", "Net balls · Gross balls · Configure per hole range") }}

</div>
</section>

{# ================================================================
   4. SETUP IN MARKER
   ================================================================ #}
<section class="section" id="configuration">
<div class="container">

{{ SectionHeader("Setup Guide", "Configuring Team Stableford in Marker",
  "Set up teams, ball allocation, point values, and optional quota before the round starts.") }}

<div class="gg-config-grid">

{{ ConfigCard(
  "Teams",
  "Team Roster",
  "Split players into teams using Marker's team roster. Add all participants first, then assign each player to a team. Teams can have any number of members. Blind player slots are supported for events with uneven groups.",
  [
    {label: "2 teams of 2 — classic four-ball format", rec: true},
    {label: "2 teams of 3 or more — larger group", rec: false},
    {label: "3+ teams — multi-team event", rec: false}
  ]
) }}

{{ ConfigCard(
  "Ball Count",
  "Scores Per Hole",
  "How many team members' Stableford scores count each hole. Default is 1 net ball — the team takes only the best net performer's points. Increase to count more scores from each hole.",
  [
    {label: "1 net ball — best net score counts (default)", rec: true},
    {label: "2 net balls — best two net scores count", rec: false},
    {label: "1 gross + 1 net — best gross and best net each count", rec: false}
  ]
) }}

{{ ConfigCard(
  "Stableford Points",
  "Point Schedule",
  "The same point schedule as individual Stableford, applied per hole. All values are configurable. Default: Triple/worse=−1, Double=0, Bogey=1, Par=2, Birdie=3, Eagle=4, Double Eagle=5.",
  [
    {label: "Default schedule — traditional Stableford values", rec: true},
    {label: "Custom — edit any point value", rec: false}
  ]
) }}

{{ ConfigCard(
  "Quota",
  "Standard or Quota Mode",
  "In Quota mode, each team receives a combined quota (sum of all team members' individual quotas: 36 minus each player's course handicap). The team that beats their combined quota by the most wins.",
  [
    {label: "Standard — highest team points wins (default)", rec: true},
    {label: "Quota — beat your combined team target", rec: false}
  ]
) }}

{{ ConfigCard(
  "Handicap",
  "Net or Gross",
  "Net Team Stableford (default): handicap strokes applied per hole before points are calculated. Each player's net score vs par determines their Stableford points. Gross: raw scores only.",
  [
    {label: "Net — handicap applied per hole (default)", rec: true},
    {label: "Gross — raw scores only", rec: false}
  ]
) }}

{{ ConfigCard(
  "Buy-In",
  "Settlement",
  "Optional pool buy-in per team. All teams contribute to a shared pot; the team with the most points (or best quota result) wins the payout. Configure the amount and payout positions.",
  [
    {label: "No buy-in (default)", rec: false},
    {label: "Pool buy-in — winning team takes pot", rec: true}
  ]
) }}

</div>

<div class="gg-screenshot-row">
{{ ScreenshotPlaceholder("Team Setup Screen", "Team roster · Ball allocation · Points · Quota") }}
{{ ScreenshotPlaceholder("Team Scorecard", "Per-hole team points with running total") }}
{{ ScreenshotPlaceholder("Team Leaderboard", "Team rankings · Pts or +/- quota") }}
</div>
<p style="font-size:0.78rem; color:var(--ink-light); margin-top:12px; max-width:420px;">
Screenshots from the Marker app will appear here. <a href="https://app.marker.golf" style="color:var(--green-600);">Open Marker</a> to see Team Stableford in action.
</p>

</div>
</section>

{# ================================================================
   5. WORKED EXAMPLE
   ================================================================ #}
<section class="section section--white" id="example">
<div class="container">

{{ SectionHeader("Worked Example", "Four Holes of Team Stableford",
  "Two teams, 2 players each. Net scoring, 1 net ball (default). Point schedule: Birdie=3, Par=2, Bogey=1, Double=0, Triple/worse=−1.") }}

<div class="gg-prose" style="margin-bottom:24px;">

**Teams:**
- Team A: A1 (10-handicap) and A2 (20-handicap)
- Team B: B1 (5-handicap) and B2 (15-handicap)

Each player receives one handicap stroke on holes where their course handicap is ≥ that hole's Stroke Index (SI). The player with the best net stroke score counts for their team.

</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 12px;">Hole 1 — Par 4, SI 3</h3>

<div class="gg-example-wrap" style="margin-bottom:8px;">
<table class="gg-example-table">
<thead>
<tr><th>Player</th><th>Team</th><th>HCP</th><th>Stroke?</th><th>Gross</th><th>Net</th><th>Net vs Par</th><th>Points</th><th>Counts?</th></tr>
</thead>
<tbody>
<tr><td>A1</td><td>A</td><td>10</td><td>Yes (SI 3 ≤ 10)</td><td>5</td><td>4</td><td>E</td><td>2</td><td class="gg-win">✓ selected</td></tr>
<tr><td>A2</td><td>A</td><td>20</td><td>Yes (SI 3 ≤ 20)</td><td>6</td><td>5</td><td>+1</td><td>1</td><td style="color:var(--ink-muted);">discarded</td></tr>
<tr><td>B1</td><td>B</td><td>5</td><td>Yes (SI 3 ≤ 5)</td><td>5</td><td>4</td><td>E</td><td>2</td><td style="color:var(--ink-muted);">discarded</td></tr>
<tr><td>B2</td><td>B</td><td>15</td><td>Yes (SI 3 ≤ 15)</td><td>4</td><td>3</td><td>−1</td><td class="gg-win">3</td><td class="gg-win">✓ selected</td></tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-bottom:24px;">
<p><strong>After hole 1:</strong> Team A = 2 pts (A1 wins ball, net par). Team B = 3 pts (B2 wins ball, net birdie). B2's net birdie gives Team B an early lead.</p>
</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 12px;">Hole 2 — Par 5, SI 11</h3>

<div class="gg-example-wrap" style="margin-bottom:8px;">
<table class="gg-example-table">
<thead>
<tr><th>Player</th><th>Team</th><th>HCP</th><th>Stroke?</th><th>Gross</th><th>Net</th><th>Net vs Par</th><th>Points</th><th>Counts?</th></tr>
</thead>
<tbody>
<tr><td>A1</td><td>A</td><td>10</td><td>No (SI 11 > 10)</td><td>5</td><td>5</td><td>E</td><td>2</td><td style="color:var(--ink-muted);">discarded</td></tr>
<tr><td>A2</td><td>A</td><td>20</td><td>Yes (SI 11 ≤ 20)</td><td>5</td><td>4</td><td>−1</td><td class="gg-win">3</td><td class="gg-win">✓ selected</td></tr>
<tr><td>B1</td><td>B</td><td>5</td><td>No (SI 11 > 5)</td><td>5</td><td>5</td><td>E</td><td>2</td><td class="gg-win">✓ selected (tie)</td></tr>
<tr><td>B2</td><td>B</td><td>15</td><td>Yes (SI 11 ≤ 15)</td><td>6</td><td>5</td><td>E</td><td>2</td><td style="color:var(--ink-muted);">discarded (tie)</td></tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-bottom:24px;">
<p><strong>After hole 2:</strong> Team A = 5 pts (A2 wins ball — handicap stroke converts A2's par gross into a net birdie on a SI 11 hole). Team B = 5 pts tied (B1 and B2 both net par; B1 selected). Even at 5–5.</p>
</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 12px;">Hole 3 — Par 3, SI 15</h3>

<div class="gg-example-wrap" style="margin-bottom:8px;">
<table class="gg-example-table">
<thead>
<tr><th>Player</th><th>Team</th><th>HCP</th><th>Stroke?</th><th>Gross</th><th>Net</th><th>Net vs Par</th><th>Points</th><th>Counts?</th></tr>
</thead>
<tbody>
<tr><td>A1</td><td>A</td><td>10</td><td>No (SI 15 > 10)</td><td>4</td><td>4</td><td>+1</td><td>1</td><td style="color:var(--ink-muted);">discarded</td></tr>
<tr><td>A2</td><td>A</td><td>20</td><td>Yes (SI 15 ≤ 20)</td><td>4</td><td>3</td><td>E</td><td class="">2</td><td class="gg-win">✓ selected</td></tr>
<tr><td>B1</td><td>B</td><td>5</td><td>No (SI 15 > 5)</td><td>3</td><td>3</td><td>E</td><td>2</td><td class="gg-win">✓ selected (tie)</td></tr>
<tr><td>B2</td><td>B</td><td>15</td><td>Yes (SI 15 ≤ 15)</td><td>4</td><td>3</td><td>E</td><td>2</td><td style="color:var(--ink-muted);">discarded (tie)</td></tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-bottom:24px;">
<p><strong>After hole 3:</strong> Team A = 7 pts (A2 benefits from handicap stroke on SI 15, netting par despite a bogey gross). Team B = 7 pts (B1 makes a gross par — his handicap gives him an advantage only on harder holes; here it was a gross par either way). Still tied at 7–7.</p>
</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 12px;">Hole 4 — Par 4, SI 5</h3>

<div class="gg-example-wrap" style="margin-bottom:8px;">
<table class="gg-example-table">
<thead>
<tr><th>Player</th><th>Team</th><th>HCP</th><th>Stroke?</th><th>Gross</th><th>Net</th><th>Net vs Par</th><th>Points</th><th>Counts?</th></tr>
</thead>
<tbody>
<tr><td>A1</td><td>A</td><td>10</td><td>Yes (SI 5 ≤ 10)</td><td>4</td><td>3</td><td>−1</td><td class="gg-win">3</td><td class="gg-win">✓ selected</td></tr>
<tr><td>A2</td><td>A</td><td>20</td><td>Yes (SI 5 ≤ 20)</td><td>7</td><td>6</td><td>+2</td><td>0</td><td style="color:var(--ink-muted);">discarded</td></tr>
<tr><td>B1</td><td>B</td><td>5</td><td>Yes (SI 5 ≤ 5)</td><td>5</td><td>4</td><td>E</td><td>2</td><td class="gg-win">✓ selected</td></tr>
<tr><td>B2</td><td>B</td><td>15</td><td>Yes (SI 5 ≤ 15)</td><td>6</td><td>5</td><td>+1</td><td>1</td><td style="color:var(--ink-muted);">discarded</td></tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-bottom:24px;">
<p><strong>After hole 4:</strong> Team A = 10 pts (A1 makes a birdie net — gross par plus a handicap stroke = net birdie = 3 pts). Team B = 9 pts (B1 net par = 2 pts). Team A leads 10–9.</p>
</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 12px;">Running Totals</h3>

<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Running team totals after 4 holes">
<thead>
<tr><th>Hole</th><th>Team A — Winner</th><th>Team A Pts</th><th>Team A Total</th><th>Team B — Winner</th><th>Team B Pts</th><th>Team B Total</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>A1 (net par)</td><td>2</td><td>2</td><td class="gg-win">B2 (net birdie)</td><td class="gg-win">3</td><td class="gg-win">3</td></tr>
<tr><td>2</td><td class="gg-win">A2 (net birdie)</td><td class="gg-win">3</td><td class="gg-win">5</td><td>B1 (net par)</td><td>2</td><td>5</td></tr>
<tr><td>3</td><td>A2 (net par)</td><td>2</td><td>7</td><td>B1 (net par)</td><td>2</td><td>7</td></tr>
<tr><td>4</td><td class="gg-win">A1 (net birdie)</td><td class="gg-win">3</td><td class="gg-win">10</td><td>B1 (net par)</td><td>2</td><td>9</td></tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-top:16px;">
<p><strong>Team A leads 10–9 after 4 holes.</strong> A2's handicap stroke on hole 2 (SI 11) and A1's birdie net on hole 4 (SI 5) both came from well-timed handicap strokes on hard holes. Note that A2's blowup on hole 4 (gross triple) costs Team A nothing — A1's net birdie is what counts.</p>
</div>

</div>
</section>

{# ================================================================
   6. STRATEGY
   ================================================================ #}
<section class="section" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Playing Team Stableford Well",
  "Team Stableford rewards the same Stableford instincts as individual — plus team coordination.") }}

<div class="gg-tips-grid">

{{ TipCard(
  "Coverage",
  "Every Hole Needs at Least One Good Score",
  "In Team Stableford, one player's bad hole costs the team nothing — as long as the other player has a usable score. On any given hole, identify who is in the best position to score and let the other player take the necessary risks. If one player is already in trouble, the second should play conservatively to guarantee a par (2 points) for the team."
) }}

{{ TipCard(
  "Aggression",
  "The Out-of-Contention Player Can Go for It",
  "When one team member has already secured a net par or birdie, the second player on the same hole is essentially playing with no downside. Take the aggressive line — go for birdie or eagle. A triple bogey costs the team nothing if the partner already has 2 or 3 points in hand. Team Stableford amplifies the Stableford principle: the floor is always covered by the partner."
) }}

{{ TipCard(
  "Stroke Holes",
  "Know Your Handicap Allocation as a Team",
  "The most valuable holes for each team member are the ones where they receive a handicap stroke. On those holes, a bogey nets par (2 pts), and a par nets birdie (3 pts). Map out which team members receive strokes on which holes before the round. On overlapping stroke holes, the team has double coverage for high-value points."
) }}

{{ TipCard(
  "Communication",
  "Talk to Your Partner Before Each Hole",
  "At the tee, compare: who's on a stroke hole, who's in better position, who is chasing points vs playing for coverage. A quick 10-second conversation at each tee is the most effective team strategy. Knowing your partner is aggressive on a given hole frees you to play conservatively — and vice versa."
) }}

{{ TipCard(
  "Quota",
  "In Quota Mode, Track Your Team's Running Target",
  "Marker shows the team's combined running total against the combined quota throughout the round. Track your team's +/− from hole 1. If you're running positive, your team is on pace. If you're behind quota mid-round, you need someone to produce birdies or eagles — that's when the aggressive play on covered holes becomes critical."
) }}

{{ TipCard(
  "Late Round",
  "Identify Who the Team's Hot Player Is",
  "In a competitive Team Stableford, the team's best performer may shift hole to hole. By hole 12 or 13, you typically know who's been scoring most of the team's points. In the closing holes, route your decision-making around protecting the player who is hot. Let the cold player take the risks on covered holes."
) }}

</div>

</div>
</section>

{# ================================================================
   7. GROSS vs. NET
   ================================================================ #}
<section class="section section--white" id="gross-vs-net">
<div class="container">

{{ SectionHeader("Gross vs. Net", "Choosing Your Scoring Mode",
  "The net vs. gross setting determines whether handicap strokes are applied before Stableford points are calculated for each player.") }}

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">Net Team Stableford (Default) <span class="gg-hdcp-rec-badge">Recommended</span></div>
<div class="gg-hdcp-option__desc">Handicap strokes applied per hole by Stroke Index before Stableford points are calculated. Each player's net score vs par determines their point contribution. The default in Marker and the most common format. Mixed-handicap groups compete fairly when handicap strokes are applied correctly.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Gross Team Stableford</div>
<div class="gg-hdcp-option__desc">Raw scores compared to par with no handicap adjustment. The best gross Stableford score from each team counts per hole. Best for groups with similar handicap levels where the gross scores are already close, or for tournaments that explicitly require gross scoring.</div>
</div>

</div>

<div class="gg-prose" style="margin-top:28px;">

**How handicap strokes affect team ball selection.** When net scoring is enabled, a higher-handicap player can legitimately "win" the ball on a given hole even if their gross score is higher than a lower-handicap teammate. This happens when the stroke allocation gives the higher-handicap player a stroke that the lower-handicap player does not receive on that hole — making their net score lower. The example on this page (Hole 2) illustrates exactly this: A2 (20-handicap) beats A1 (10-handicap) for the ball because A2 receives a stroke on SI 11 while A1 does not.

**Mixed gross/net ball allocation.** The settings form allows counting 1 gross ball and 1 net ball per hole from the same team — selecting one player based on best gross performance and another based on best net performance. This is unusual but supported. Both selected players' Stableford points (gross and net respectively) contribute to the team total for that hole.

<div class="gg-callout gg-callout--info">
<p>For the full explanation of Marker's handicap settings — percentage modes, stroke allocation, half-strokes — see the <a href="{{ '/games/handicap-settings/' | url }}">Handicap Settings guide</a>.</p>
</div>

</div>

</div>
</section>

{# ================================================================
   8. VARIATIONS
   ================================================================ #}
<section class="section" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Common Team Stableford Formats",
  "Most variations differ in ball count or point schedule. All are configurable in Marker.") }}

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
</div>
<div class="gg-variation__body">
<h4>Best Ball Team Stableford (1 Net Ball) — Default</h4>
<p>Each team counts only the best net Stableford score per hole. The default Marker configuration. One player carries the team on each hole. Most common for 2-person teams. Each teammate is equally valuable — the format naturally rotates whose score contributes hole by hole.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
</div>
<div class="gg-variation__body">
<h4>Aggregate Team Stableford (2+ Net Balls)</h4>
<p>Multiple net scores count per hole. With 4-person teams counting 2 net balls, every team hole total is the sum of two players' net Stableford points. This format counts more of the round for each player, makes bad holes more damaging (since they can no longer be completely covered), and suits larger groups where "best of four" would produce too many birdies.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
</div>
<div class="gg-variation__body">
<h4>Team Quota Stableford</h4>
<p>Each team receives a combined quota: the sum of all team members' individual quotas (36 − course handicap per player). Teams must beat their combined target. A team of a 5-handicapper (quota 31) and a 15-handicapper (quota 21) has a combined quota of 52. This is the most equitable Team Stableford format for mixed-ability events.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
</div>
<div class="gg-variation__body">
<h4>Front/Back Nine Sub-Totals</h4>
<p>Marker supports adding sub-total ranges (e.g., holes 1–9 and 10–18) alongside the full 18-hole total. Teams compete for all three sub-totals simultaneously — front nine, back nine, and overall. Similar to Nassau but using Stableford points. Configure sub-totals in the game setup.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   9. WHY MARKER
   ================================================================ #}
<section class="section section--dark" id="why-marker">
<div class="container">

{{ SectionHeader("Marker App", "Why Run Team Stableford in Marker?",
  "Managing ball selection, handicap strokes per player, Stableford point lookups, and team totals hole by hole requires serious bookkeeping. Marker does it automatically.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
</div>
<h4>Automatic Ball Selection</h4>
<p>After all team members' scores are entered for a hole, Marker selects the best-performing player's score automatically. No manual decision or discussion required — Marker identifies the contributing player and adds their Stableford points to the team total.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Per-Player Handicap Strokes</h4>
<p>Each player's handicap is applied by Stroke Index independently. Marker tracks which player receives a stroke on which hole, applies the adjustment before comparing to par, and uses the resulting net Stableford points in the team selection. Four players, four handicaps, zero manual math.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<h4>Live Team Leaderboard</h4>
<p>The leaderboard shows each team's current Stableford point total and ranking throughout the round. In Quota mode, it shows each team's combined quota and their running +/− resolved score. All teams visible in one view at all times.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
</div>
<h4>Team Quota Built In</h4>
<p>Enable Quota mode and Marker sums each team's individual player quotas automatically. The team leaderboard shows each team's combined quota and their running +/− score. No manual target calculations required.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Team Settlement</h4>
<p>Configure a per-team buy-in for automatic settlement. The team with the most points (or best quota result) wins the pot. Marker calculates the distribution at the end of the round — no 19th-hole math required.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
</div>
<h4>Multi-Scorecard Events</h4>
<p>Team Stableford supports event-wide scoring across multiple scorecards. A corporate outing with eight foursomes can run one Team Stableford game with each group scoring their own card — Marker aggregates team totals across all cards automatically.</p>
</div>

</div>

<div style="margin-top:40px; text-align:center;">
<a href="https://app.marker.golf" class="btn btn-primary">Play Team Stableford in Marker</a>
<p style="margin-top:14px; font-size:0.8rem; color:rgba(255,255,255,0.38);">Premium feature · Available on iOS, Android, and Web</p>
</div>

</div>
</section>

{# ================================================================
   10. FAQ
   ================================================================ #}
<section class="section section--white" id="faq">
<div class="container">

{{ SectionHeader("FAQ", "Frequently Asked Questions") }}

<div class="gg-faq">

<details class="gg-faq-item">
<summary>What is Team Stableford?</summary>
<div class="gg-faq-body">
<p>Team Stableford is a team format where groups of players earn Stableford points individually on each hole and those points are combined into a team total. By default, only the best-performing team member's net Stableford points count per hole. The team with the most points after 18 holes wins. It is a separate, premium game in Marker distinct from individual Stableford.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How is the team score calculated on each hole?</summary>
<div class="gg-faq-body">
<p>Every team member scores the hole individually. Marker identifies the team member with the best net stroke score (lowest raw net strokes) and takes their net Stableford points as the team's score for that hole. By default, one score counts per hole — the other team members' scores are not included for that hole but may be selected on others.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Which player's score gets selected for the team?</summary>
<div class="gg-faq-body">
<p>The team member with the lowest net stroke score on a hole (after handicap strokes are applied) is automatically selected. Since Stableford points are a monotone function of net strokes (lower strokes = higher points), selecting the player with the best net strokes is always identical to selecting the player with the most net Stableford points. Marker handles this automatically — no manual selection is required.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can teams count more than one score per hole?</summary>
<div class="gg-faq-body">
<p>Yes. The ball allocation setting controls how many scores count per hole. The default is 1 net ball, but you can configure 2 net balls (the two best net scores count), 1 gross + 1 net (one player selected on raw score, another on handicap-adjusted score), or other combinations. Configure the ball allocation in the Marker game setup screen.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What are the Stableford point values in Team Stableford?</summary>
<div class="gg-faq-body">
<p>The same default schedule as individual Stableford: Double Eagle = 5, Eagle = 4, Birdie = 3, Par = 2, Bogey = 1, Double Bogey = 0, Triple Bogey or worse = −1. All values are customizable in Marker's settings. The point schedule applies to each player individually — the team's total for a hole is the point value of the selected player's score.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Does Team Stableford support handicaps?</summary>
<div class="gg-faq-body">
<p>Yes. Net scoring is the default — Marker applies each player's course handicap by Stroke Index before comparing to par. This means that on a hole where a higher-handicap player receives a stroke, their net score may be better than a lower-handicap teammate's, making them the contributing player for the team on that hole. Gross scoring (no handicap) is also available.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is the difference between Team Stableford and individual Stableford?</summary>
<div class="gg-faq-body">
<p>Individual Stableford: every player's points count on every hole, all players compete in one ranking. Team Stableford: players form teams, only the best team member's points count per hole (by default), and team totals determine the winner. Team Stableford requires a minimum of 4 players and is a premium Marker feature. Individual Stableford requires only 1 player and is available to all.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is the difference between Team Stableford and TeamCountX?</summary>
<div class="gg-faq-body">
<p>TeamCountX is a stroke play format: teams count the best X raw stroke scores per hole, totaling strokes across the round — lowest strokes wins. Team Stableford is a points format: teams count the best Stableford points per hole, totaling points — highest points wins. The ball selection mechanism is similar (best scores selected per hole), but the underlying currency is points, not strokes, and the winner has the most points rather than the fewest strokes.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Does Team Stableford support Quota mode?</summary>
<div class="gg-faq-body">
<p>Yes. In Team Quota mode, each team receives a combined quota equal to the sum of all team members' individual quotas (36 − each player's course handicap). The team that accumulates the most gross Stableford points relative to their combined quota wins. Marker calculates the combined quota automatically from each player's handicap. Quota mode in Team Stableford uses gross scoring — handicap is incorporated in the quota target rather than applied hole-by-hole.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Is Team Stableford a premium feature?</summary>
<div class="gg-faq-body">
<p>Yes. Team Stableford is a premium game in Marker, requiring a premium event configuration. Individual Stableford is available on all plans. See <a href="https://app.marker.golf">Marker's pricing page</a> for details on premium game access.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How many players are required for Team Stableford?</summary>
<div class="gg-faq-body">
<p>A minimum of 4 players is required to form at least 2 teams. Teams can have any number of members. The most common format is 2 teams of 2 (like traditional four-ball), but teams of 3, 4, or more are supported. For larger groups, increase the ball count (2+ net balls) so more team members' scores contribute each hole.</p>
</div>
</details>

</div>

</div>
</section>

{# ================================================================
   11. RELATED GAMES
   ================================================================ #}
<section class="section" id="related">
<div class="container">

{{ SectionHeader("Also Try", "Related Games") }}

<div class="gg-related-grid">

{{ RelatedCard(
  "Stableford",
  "The individual format. Every player's points count on every hole. No teams, no ball selection — just your running Stableford total.",
  '/games/stableford/' | url
) }}

{{ RelatedCard(
  "TeamCountX",
  "Team stroke play where each team selects X scores per hole. Similar ball-selection concept but using strokes instead of Stableford points.",
  '/games/team-count-x/' | url
) }}

{{ RelatedCard(
  "Skins",
  "Individual hole-by-hole competition. Outright winner per hole takes the skin. Works well as a side game alongside a Team Stableford main event.",
  '/games/skins/' | url
) }}

{{ RelatedCard(
  "Nassau",
  "Three simultaneous match play bets — front nine, back nine, and overall. Team-friendly and can be run alongside Team Stableford.",
  '/games/nassau/' | url
) }}

</div>

<div style="margin-top:28px;">
<a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
