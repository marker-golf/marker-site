---
layout: layouts/game-guide.njk
title: Match Play — Golf Game Guide
description: "Match Play rules explained: hole-by-hole scoring, handicaps, presses, and how Marker tracks the standing automatically. Learn what 3&2 means, how dormie works, and how to run match play with handicaps."
status: available
category: classic
order: 2
players: "2 or 4"
format: "Hole by Hole"
cardDescription: "Hole-by-hole head-to-head competition. Win the hole, halve it, or lose it. Marker tracks the standing (e.g. 2UP, 3DOWN) and closes the match automatically when it's won."
game:
  name: Match Play
  difficulty: beginner
  difficultyLabel: Beginner
  subtitle: "Win holes, not strokes. The oldest format in golf — every hole is its own contest, the standing updates in real time, and the match ends the moment it's decided."
  heroSubtitleWidth: "540px"
  heroStats:
    - label: Players
      value: "2 or 4"
    - label: Format
      value: Hole by Hole
    - label: Best For
      value: Head-to-head play
    - label: Handicap
      value: Supported
    - label: Available In
      value: Marker
  heroCta:
    primary:
      text: Play Match Play in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Match Play?
    body: "Set up your match in under 60 seconds. Marker tracks the standing hole by hole, closes the match automatically when it's won, and settles the wager at the end."
    primary:
      text: Start Your Match
      href: "https://app.marker.golf"
    secondary:
      text: Read the Setup Guide
      href: "/tutorials/getting-started/"
sections:
  - id: overview
    label: Overview
  - id: how-it-works
    label: How It Works
  - id: presses
    label: Presses
  - id: configuration
    label: Setup in Marker
  - id: example
    label: Example Round
  - id: strategy
    label: Strategy
  - id: handicaps
    label: Handicaps
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

{{ SectionHeader("Overview", "What Is Match Play?",
  "The original golf format. Score hole by hole rather than counting total strokes, and the match ends the moment one side can't catch up.") }}

<div class="gg-prose">

Match play is golf stripped to its essential competition: two sides, one hole at a time. Instead of counting every stroke across 18 holes and comparing totals, each hole is a standalone mini-match. The lower score on a hole wins that hole. Tied holes go to neither side. After 18 holes — or sooner, if the match is mathematically over — the side that won more holes wins the match.

This structure fundamentally changes how golf feels. A triple bogey on hole 3 is one lost hole, not a three-stroke catastrophe that haunts the scorecard. You immediately compete fresh on hole 4. Conversely, a player who leads by three holes can afford to lose the next two without damage — they're still ahead. The standing is always relative, never cumulative.

**The language of match play.** Match status is expressed as holes, not strokes:

- **All Square** — tied; each side has won the same number of holes
- **1 Up, 2 Up** — ahead by 1 or 2 holes; displayed as "1 UP" in Marker
- **1 Down, 2 Down** — behind by 1 or 2 holes
- **Dormie** — ahead by exactly as many holes as remain to play; the trailing side can only tie, not win
- **3 & 2** — won 3 Up with 2 holes remaining; the match was closed on hole 16. The first number is the lead, the second is how many holes were left when the match ended.

Match play can end before hole 18 whenever one side's lead exceeds the holes remaining. A side that is 4 Up with only 3 holes left has won — the match is over even though 3 holes were never played. Marker detects this automatically and closes the match.

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">1</div>
<div class="gg-quick-stat__lbl">Match (flexible holes)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">2–4</div>
<div class="gg-quick-stat__lbl">Players (equal sides)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">18</div>
<div class="gg-quick-stat__lbl">Maximum holes</div>
</div>
</div>

{{ MarkerImplNote("Marker tracks the match standing hole by hole, shows dormie status in the scorecard, and automatically closes the match when one side's lead exceeds the remaining holes. A dollar wager can be set on the match; presses — both manual and automatic — add sub-bets that run concurrently with the original.") }}

</div>
</section>

{# ================================================================
   2. HOW IT WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

{{ SectionHeader("Mechanics", "How Match Play Works",
  "Seven steps from the first tee to the final result.") }}

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Form two equal sides</h3>
<p>Match play requires exactly two sides of equal size. Standard match play is 1v1 — one player against another. Marker also supports 2v2 team match play, where each side puts its best score forward on each hole. Team size must be equal; Marker enforces this at setup.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Set the hole range (default: 1–18)</h3>
<p>A standard match play round covers holes 1–18. Marker lets you configure the hole range — you can set up a front-nine match (holes 1–9), a back-nine match, or any custom range. Both sides agree on this before the round begins.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Play each hole — lower score wins</h3>
<p>On each hole, each side records its score. The side with the lower score wins the hole and goes 1 Up (or extends their lead). If both sides score the same, the hole is halved — no change in standing. Net scores (after handicap strokes) are used by default.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Marker updates the standing immediately</h3>
<p>After each hole is saved in Marker, the match standing updates. The scorecard shows the current standing — whether All Square, N Up, or N Down — and highlights dormie status when the match reaches that point. No manual calculation is needed.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>The match closes when it's mathematically over</h3>
<p>A match is over when one side's lead exceeds the number of holes remaining. If Side A is 4 Up with 3 holes left, the match is won — Side A wins "4 & 3" even though those last 3 holes are never played. Marker closes the match automatically and displays the final result in green.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">6</div>
<div class="gg-step__body">
<h3>Press when trailing (optional)</h3>
<p>If one side falls behind and presses, a new sub-bet starts from the current hole and runs concurrently with the original match. The original match continues unchanged. Presses can be called manually from the scorecard or triggered automatically when a side falls behind by a configurable number of holes.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">7</div>
<div class="gg-step__body">
<h3>Settle at the end</h3>
<p>The side that won more holes wins the match and collects the agreed wager. If presses were active, each press settles independently as a separate flat bet. Marker calculates and displays the final settlement for all active bets.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   3. PRESSES
   ================================================================ #}
<section class="section section--white" id="presses">
<div class="container">

{{ SectionHeader("Presses", "Press When You're Down",
  "A press is a new bet within the match, starting from the current hole. The original match keeps running — both settle independently.") }}

<div class="gg-prose">

A press adds a secondary bet without stopping or canceling the original match. When a side is behind and calls a press, a fresh sub-match starts from the next hole and runs to the end of the match range. The original match keeps accumulating its own result in parallel. At the end, the two bets settle separately.

**Why press?** Because the original match standing is already in deficit — the trailing side wants a live bet on remaining play without waiting for the original to resolve unfavorably. A press gives them a reset: the press starts All Square, giving them a fresh chance to come out ahead on a portion of the remaining holes.

**Example with a press.** Suppose Side A and Side B are playing an 18-hole match for $10, and Side B is 2 Down after hole 6. An auto press fires at hole 7 — a new sub-bet starts All Square from hole 7 running to hole 18. Two bets are now active:
- Original match (holes 1–18): Side B is 2 Down
- Press (holes 7–18): All Square

Both bets track independently from hole 7 forward. Side B can win the press even if they eventually lose the original. At the end, each bet pays the agreed amount to its winner.

**Cascading presses.** If Side B also falls 2 Down within the press, a second press can start — a press of a press. Marker supports cascading presses, tracking each as an independent bet. The scorecard shows all concurrent match and press standings for each hole.

</div>

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Auto Press</div>
<div class="gg-hdcp-option__desc">Marker fires a press automatically when a side falls behind by N holes (configurable 1–10 down). Disabled by default. Once enabled, the press triggers silently without either player taking action — it just appears in the scorecard on the next hole.</div>
</div>

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">Manual Press <span class="gg-hdcp-rec-badge">Most Common</span></div>
<div class="gg-hdcp-option__desc">Either side taps the press button in the hole scorecard to call a manual press. The press takes effect from the current hole. Manual presses give both sides direct control over when sub-bets start. The press pill appears on any scoreable hole where a manual press could be called.</div>
</div>

</div>

<div class="gg-prose">

**Press labels in Marker.** The scorecard labels each press origin clearly:

- **"press"** — a manual press is available on this hole (shown as a faded pill you can tap)
- **"pressed"** — a manual press was called starting from this hole
- **"auto"** — an automatic press fired starting from this hole
- **"start"** / **"end"** — marks the first and last hole of a match or press range

The scorecard shows all concurrent match and press standings stacked in the hole cell, separated by a slash (e.g., `+1 / -1` means ahead in the original, behind in the press).

</div>

{{ ScreenshotPlaceholder("Match Play — Presses", "Auto press toggle · Manual press pill · Concurrent standings") }}

</div>
</section>

{# ================================================================
   4. SETUP IN MARKER
   ================================================================ #}
<section class="section" id="configuration">
<div class="container">

{{ SectionHeader("Setup Guide", "Configuring Match Play in Marker",
  "Everything configured in the game creation flow. Takes under 60 seconds.") }}

<div class="gg-config-grid">

{{ ConfigCard(
  "Teams",
  "Two Equal Sides",
  "Match play requires two sides of equal size. Standard match play is 1v1. Marker also supports 2v2 team match play, where each side uses the best score from its players per hole.",
  [
    {label: "1v1 — standard singles match play", rec: true},
    {label: "2v2 — team match play, best ball per side", rec: false}
  ]
) }}

{{ ConfigCard(
  "Hole Range",
  "Match Length",
  "The default hole range is 1–18, covering a full round. You can configure any range — a front-nine match (1–9), a back-nine match (10–18), or any custom start/end holes.",
  [
    {label: "1–18 — full round (default)", rec: true},
    {label: "1–9 — front nine only", rec: false},
    {label: "10–18 — back nine only", rec: false}
  ]
) }}

{{ ConfigCard(
  "Ball Allocation",
  "Net Balls per Side per Hole",
  "Controls whether net (handicap-adjusted) or gross scores are compared, and how many balls each side contributes. Default is 1 net ball — the single player's net score in 1v1, or the best net score from either player in 2v2.",
  [
    {label: "1 net ball — net scoring (default)", rec: true},
    {label: "1 gross ball — gross scoring, no handicap", rec: false},
    {label: "2 net balls — both players' scores count (2v2 only)", rec: false}
  ]
) }}

{{ ConfigCard(
  "Auto Press",
  "Automatic Press Trigger",
  "When enabled, Marker fires a press automatically when a side falls behind by N holes. Set N from 1 to 10. Disabled by default — presses are manual unless you enable this.",
  [
    {label: "Off — manual presses only (default)", rec: false},
    {label: "2-down — standard threshold", rec: true},
    {label: "1-down — aggressive, more sub-bets", rec: false}
  ]
) }}

{{ ConfigCard(
  "Match Wager",
  "Dollar Amount",
  "Set a flat dollar amount for the match. If presses are active, each press pays the same flat amount independently. Leave blank to track standings without a financial settlement.",
  [
    {label: "Enter any amount (optional)", rec: false}
  ]
) }}

</div>

<div class="gg-screenshot-row">
{{ ScreenshotPlaceholder("Match Play Setup", "Teams · Hole range · Wager") }}
{{ ScreenshotPlaceholder("Handicap Settings", "Net scoring · Percentage") }}
{{ ScreenshotPlaceholder("Live Scorecard", "Standing · Dormie · Press") }}
</div>
<p style="font-size:0.78rem; color:var(--ink-light); margin-top:12px; max-width:420px;">
Screenshots from the Marker app will appear here. <a href="https://app.marker.golf" style="color:var(--green-600);">Open Marker</a> to see Match Play in action.
</p>

</div>
</section>

{# ================================================================
   5. EXAMPLE ROUND
   ================================================================ #}
<section class="section" id="example">
<div class="container">

{{ SectionHeader("Worked Example", "Six Holes of Match Play",
  "Player A (HCP 12) vs. Player B (HCP 6) — net scoring, 6-stroke difference. Handicap strokes go to A on SI 1–6.") }}

<div class="gg-prose" style="margin-bottom:28px;">

In net match play, A receives 6 strokes — one each on the 6 hardest holes by Stroke Index. On those holes, A's gross score is reduced by 1 to produce the net score used in the comparison.

</div>

<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Match Play example — holes 1–6">
<thead>
<tr>
<th>Hole</th>
<th>Par</th>
<th>SI</th>
<th>A Gross</th>
<th>A Net</th>
<th>B Gross</th>
<th>B Net</th>
<th>Winner</th>
<th>Standing</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1</strong></td>
<td>4</td>
<td>5</td>
<td>5</td>
<td class="gg-win">4 (−1)</td>
<td>4</td>
<td>4</td>
<td class="gg-tie">Halved</td>
<td>All Square</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td>4</td>
<td>1</td>
<td>4</td>
<td class="gg-win">3 (−1)</td>
<td>4</td>
<td>4</td>
<td class="gg-win">A</td>
<td>A 1UP</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td>3</td>
<td>17</td>
<td>4</td>
<td>4</td>
<td>3</td>
<td class="gg-win">3</td>
<td>B</td>
<td>All Square</td>
</tr>
<tr>
<td><strong>4</strong></td>
<td>5</td>
<td>3</td>
<td>6</td>
<td class="gg-win">5 (−1)</td>
<td>5</td>
<td>5</td>
<td class="gg-tie">Halved</td>
<td>All Square</td>
</tr>
<tr>
<td><strong>5</strong></td>
<td>4</td>
<td>11</td>
<td>6</td>
<td>6</td>
<td>4</td>
<td class="gg-win">4</td>
<td>B</td>
<td>B 1UP</td>
</tr>
<tr>
<td><strong>6</strong></td>
<td>4</td>
<td>7</td>
<td>5</td>
<td>5</td>
<td>3</td>
<td class="gg-win">3</td>
<td>B</td>
<td><strong>B 2UP ⚡</strong></td>
</tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-top:32px;">
<p><strong>After six holes:</strong> B is 2 Up. Holes won: B = 2, A = 1, Halved = 3. With 12 holes remaining, there's plenty of match left — but A is under pressure.</p>
<p>A's handicap strokes came into play on holes 1, 2, and 4 (SI 5, 1, 3 are all in the top 6 by Stroke Index). On hole 2, A's gross 4 became a net 3 — an effective birdie — and won the hole. Without the stroke, that hole would have been halved.</p>
</div>

<div class="gg-callout gg-callout--info" style="margin-top:16px;">
<p><strong>With auto press at 2-down:</strong> Marker would fire a press starting from hole 7. From that point, the original match (B 2 Up, holes 1–18) and the press (All Square, holes 7–18) run simultaneously. A can win the press even while losing the original — both settle independently as flat bets.</p>
</div>

<h3 style="font-size:1.05rem; color:var(--ink); margin:32px 0 16px;">Press Example: Holes 7–9</h3>

<div class="gg-prose" style="margin-bottom:16px;">

Press fires at hole 7 (after B goes 2 Up at hole 6). Both the original match and press are now live.

</div>

<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Press example — holes 7–9">
<thead>
<tr>
<th>Hole</th>
<th>A Net</th>
<th>B Net</th>
<th>Winner</th>
<th>Original (1–18)</th>
<th>Press (7–18)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>7</strong></td>
<td class="gg-win">4</td>
<td>5</td>
<td>A</td>
<td>B 1UP</td>
<td>A 1UP</td>
</tr>
<tr>
<td><strong>8</strong></td>
<td>3</td>
<td>3</td>
<td class="gg-tie">Halved</td>
<td>B 1UP</td>
<td>A 1UP</td>
</tr>
<tr>
<td><strong>9</strong></td>
<td>5</td>
<td class="gg-win">4</td>
<td>B</td>
<td>B 2UP</td>
<td>All Square</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-top:20px;">
<p>Through hole 9: B is still winning the original match (B 2 Up), but the press is All Square — a much better position for A. The two bets remain completely independent. A wins the press by winning more holes from hole 7 onward, regardless of what the original match does.</p>
</div>

</div>
</section>

{# ================================================================
   6. STRATEGY
   ================================================================ #}
<section class="section section--white" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Playing Match Play Well",
  "Match play rewards a different mindset than stroke play. The opponent's score matters as much as your own.") }}

<div class="gg-tips-grid">

{{ TipCard(
  "Mindset",
  "Play the Opponent, Not the Course",
  "In stroke play, you compete against par. In match play, you compete against the person across from you. A bogey that beats their double is a won hole. A birdie that ties their birdie is nothing. Watch their ball, not just yours."
) }}

{{ TipCard(
  "Aggression",
  "Go for It When They're Already in Trouble",
  "Once your opponent is in a hazard or clearly making a big number, you can play more conservatively — a par almost certainly wins the hole. Conversely, when you're in trouble and they're clean, take the aggressive line. A halved hole is better than losing outright."
) }}

{{ TipCard(
  "Concessions",
  "Give the Short Putts — Carefully",
  "In match play, you can concede a putt (give your opponent the hole, rather than make them hole out). This is standard practice for tap-ins. But be careful: conceding a 3-footer keeps the match moving but means you'll never know if they would have missed. In close matches, make them putt."
) }}

{{ TipCard(
  "Standing Awareness",
  "Always Know the Number",
  "Track the standing constantly. Being 2 Up with 4 to play is very different from 2 Up with 14 to play. The most valuable holes in match play are the ones where the standing is tight and the match is close to being decided. Marker shows the standing after every hole — check it."
) }}

{{ TipCard(
  "Late Holes",
  "When You're Dormie, Stay Aggressive",
  "Dormie means you can't lose the match outright — but you can still halve it. A halved match pays nothing if you've got a wager on it. When you're dormie, keep winning holes and try to close the match before the final hole. Don't let the other side limp to a tie."
) }}

{{ TipCard(
  "Presses",
  "Call the Press Before the Hole Count Shrinks",
  "A press called at 2-down with 12 holes remaining gives you far more runway than a press called at 4-down with 6 remaining. If you're playing manual presses, watch the standing and call early. Every hole you lose before pressing is a hole you can't use to win the press."
) }}

</div>

</div>
</section>

{# ================================================================
   7. HANDICAPS
   ================================================================ #}
<section class="section" id="handicaps">
<div class="container">

{{ SectionHeader("Handicaps", "Net vs. Gross Match Play",
  "Marker applies handicap strokes hole by hole using Stroke Index — the standard method for match play handicapping.") }}

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Gross Match Play</div>
<div class="gg-hdcp-option__desc">Scores compared as recorded, no handicap adjustment. Each hole is won by the lower gross score. Suited for groups of similar ability or where handicaps would complicate rather than improve fairness.</div>
</div>

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">Net Match Play (100%) <span class="gg-hdcp-rec-badge">Recommended</span></div>
<div class="gg-hdcp-option__desc">Full handicap applied. Each player's handicap strokes are allocated by Stroke Index across the holes and subtracted from their gross score before comparison. The standard method for recreational and competitive match play.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Net Match Play (85%)</div>
<div class="gg-hdcp-option__desc">85% of each player's Course Handicap is applied. Reduces the advantage for higher-handicap players. Common in money games to keep the match more competitive across the full range of handicaps.</div>
</div>

</div>

<div class="gg-prose">

**How Stroke Index works.** Every hole on every golf course is rated by difficulty on a scale of 1 to 18 — Stroke Index 1 is the hardest, Stroke Index 18 is the easiest. Handicap strokes are distributed one at a time, starting from SI 1. A player with a 6-stroke difference receives one stroke on the 6 hardest holes (SI 1 through SI 6). On those holes, their gross score is reduced by 1 when Marker computes the net comparison.

**Standard match play allocation.** In a 1v1 match, Marker compares each player's net score against their own handicap — not relative to each other. A player with a 12-handicap gets strokes on SI 1–12. A player with a 4-handicap gets strokes on SI 1–4. The full handicap is applied to each player independently, and the net scores are compared hole by hole.

This differs from the traditional "difference method" (where the lower handicapper plays scratch and the other gets the difference) but produces equivalent results when using ball allocation — Marker computes the comparison from each player's own full net score.

**Why match play handicap isn't just total stroke adjustment.** In stroke play, you compare final totals and subtract handicaps at the end — the stroke distribution across holes doesn't matter. In match play, it matters a great deal which specific holes you receive strokes on. Getting a stroke on SI 1 (the hardest hole) means you're most likely to use it and convert a potential loss into a win. Getting strokes on easier holes is less impactful. This is why Stroke Index allocation is central to fair net match play.

<div class="gg-callout gg-callout--info">
<p>For a full explanation of all handicap settings in Marker — including how to override individual player handicaps, set stroke allowances, and choose between percentage modes — see the <a href="{{ '/tutorials/handicap-settings/' | url }}">Handicap Settings guide</a>.</p>
</div>

</div>

</div>
</section>

{# ================================================================
   8. VARIATIONS
   ================================================================ #}
<section class="section section--white" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Common Match Play Formats",
  "Match play's structure is consistent everywhere. These variations change who plays, what's at stake, or how the match is structured.") }}

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
</div>
<div class="gg-variation__body">
<h4>Singles Match Play</h4>
<p>One player against another, 1v1. The standard form of match play. Each player's own score determines every hole result. This is the default in Marker and the format used in the Ryder Cup singles, Walker Cup, and most club championships.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 1-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
</div>
<div class="gg-variation__body">
<h4>Four-Ball Match Play (2v2)</h4>
<p>Two players on each side, both playing their own ball. The best score from each side wins the hole. This is what Marker calls "team match play" — configure 2v2 with 1 net ball per side. The Ryder Cup and Presidents Cup feature this format prominently.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<div class="gg-variation__body">
<h4>Nassau-Style (Three Matches)</h4>
<p>Run three simultaneous match play bets: front nine, back nine, and total. This is what Nassau does — it's essentially three concurrent match play rounds on the same holes. Use Marker's Nassau game for this structure rather than configuring Match Play manually.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
</div>
<div class="gg-variation__body">
<h4>Nine-Hole Match</h4>
<p>Set the hole range in Marker to 1–9 or 10–18 for a front-nine or back-nine match. Full match play rules apply across the shorter range — the match can still close early if the deficit exceeds remaining holes.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Match Play with Presses</h4>
<p>Layer press bets on top of a standard match play round. Presses can be automatic (at a configurable hole deficit) or manual (called from the scorecard). Multiple presses can be active simultaneously, each settling as a flat bet at the end of its range.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
</div>
<div class="gg-variation__body">
<h4>Strokesford / Mixed Formats</h4>
<p>Some groups combine match play with stroke play elements — for example, tracking gross stroke play simultaneously to settle a separate bet. Marker runs each game format independently, so you can add a separate Stroke Play or Skins side game alongside a Match Play round in the same event.</p>
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

{{ SectionHeader("Marker App", "Why Run Match Play in Marker?",
  "The standing, dormie, press tracking, and settlement — all automatic. You just play golf.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<h4>Live Standing After Every Hole</h4>
<p>Marker updates the match standing the moment all scores are entered. All Square, 2 Up, dormie — everyone can see it from their phone. No one has to ask "what's the score?" mid-round.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
</div>
<h4>Automatic Match Closure</h4>
<p>When one side's lead exceeds the holes remaining, Marker closes the match and shows the final result (e.g., "3 & 2"). No debate about whether the match is truly over — the math is clear and the result is final.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<h4>Dormie Tracking</h4>
<p>Marker detects dormie states automatically and highlights them in the scorecard. When you're dormie, you know — and so does your opponent. The match result and settlement are clear without any mental math.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
</div>
<h4>Full Press Support</h4>
<p>Manual presses (tap from the scorecard) and auto presses (configurable N-down threshold) are both supported. Cascading presses are tracked automatically. Every press settles as a separate flat bet at the end of its hole range.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Handicaps Applied Automatically</h4>
<p>Marker applies net strokes hole by hole based on each player's Course Handicap and the course Stroke Index. The net comparison is computed automatically — no one has to remember which holes get strokes.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Instant Settlement</h4>
<p>After the final hole, Marker shows the result of every bet — original match and all presses — and calculates who owes whom. No end-of-round argument about who's owed what from which press.</p>
</div>

</div>

<div style="margin-top:40px; text-align:center;">
<a href="https://app.marker.golf" class="btn btn-primary">Play Match Play in Marker</a>
<p style="margin-top:14px; font-size:0.8rem; color:rgba(255,255,255,0.38);">Available on iOS, Android, and Web · No credit card required</p>
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
<summary>How is match play different from stroke play?</summary>
<div class="gg-faq-body">
<p>In stroke play, you count every stroke across all 18 holes and compare total scores at the end. One bad hole can hurt you for the entire round. In match play, each hole is its own contest — you win, halve, or lose each hole independently. A triple bogey costs you one hole, not a stroke-count disaster. The match tracks accumulated hole wins and losses, not accumulated strokes.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What happens when a hole is tied?</summary>
<div class="gg-faq-body">
<p>The hole is halved — neither side gains or loses. The match standing doesn't change. Halved holes are common in closely contested matches and don't carry over any advantage to the next hole. The standing simply remains what it was after the previous hole.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What does "3 and 2" mean?</summary>
<div class="gg-faq-body">
<p>"3 and 2" (written as "3 & 2") means one side won 3 Up with 2 holes remaining — their lead exceeded the holes left, so the match was over after hole 16. The first number is the winning lead, the second is how many holes were unplayed. "2 & 1" means 2 Up with 1 to play — the match ended on hole 17. "1 Up" with no second number means the match went to hole 18 and was decided on the last hole.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is dormie?</summary>
<div class="gg-faq-body">
<p>A side is dormie when they lead by as many holes as remain to be played. If you're 3 Up with 3 holes left, you're dormie — the trailing side can tie the match but cannot win it. A dormie match produces no outright winner if the trailing side wins all remaining holes (the match is halved). Marker displays dormie status in the scorecard in amber so both sides know the exact situation.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can match play end before hole 18?</summary>
<div class="gg-faq-body">
<p>Yes — this is one of match play's defining features. The match ends the moment one side's lead exceeds the holes remaining. If you're 5 Up with 4 holes left, the match is over on that hole — you've won "5 & 4" even though 4 holes remain unplayed. Marker detects this automatically and closes the match. The remaining holes are never scored.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can match play use handicaps?</summary>
<div class="gg-faq-body">
<p>Yes. Net match play is the standard for recreational and most competitive rounds. Marker applies handicap strokes using Stroke Index — strokes are distributed to the hardest holes first. Each player's individual handicap is used to compute their net score per hole, and those net scores are compared to determine the hole winner. See the <a href="{{ '/tutorials/handicap-settings/' | url }}">Handicap Settings guide</a> for all configuration options.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How are handicap strokes allocated in match play?</summary>
<div class="gg-faq-body">
<p>Strokes are allocated by Stroke Index — each hole on the course is rated 1 (hardest) to 18 (easiest). A player with a 10-handicap receives one stroke on the 10 hardest holes (SI 1 through SI 10). On those holes, their gross score is reduced by 1 before the net comparison. This means handicap advantage is concentrated on the hardest holes, which is where it matters most. Marker applies this automatically based on the course's Stroke Index.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is a press in match play?</summary>
<div class="gg-faq-body">
<p>A press is a new side bet that starts from the current hole and runs to the end of the match range. It doesn't cancel the original match — both run concurrently and settle independently. When the trailing side calls a press at 2-down, they're effectively saying: "Let's also have a fresh bet starting from right now." Winning the press while losing the original is a common and valid outcome.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Does a press replace the original match?</summary>
<div class="gg-faq-body">
<p>No. The original match continues unchanged after a press is called. Both the original match and the press track their own standings from their respective starting holes. A press starting on hole 7 doesn't affect the original match's standings from holes 1–6. Each bet settles as a flat result at the end of its hole range.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can multiple presses run at the same time?</summary>
<div class="gg-faq-body">
<p>Yes. Cascading presses are supported in Marker. If you're losing the original match and press, and then fall behind in the press, you can press again — creating a press of a press. Each level runs as an independent bet. The scorecard shows all concurrent standings stacked in the hole cell. Multiple presses can each pay out independently at the end of the round.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How does Marker calculate the match play settlement?</summary>
<div class="gg-faq-body">
<p>Each bet — the original match and any presses — settles as a flat win/lose/halve. The side that won more holes in each bet's range wins that flat dollar amount. Marker tallies all bets after the final hole and shows each player's net payout. If the original match is halved but the press is won, the press amount is paid out and no money changes hands on the original.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Does Marker support team match play (2v2)?</summary>
<div class="gg-faq-body">
<p>Yes. Set up the match with 2 players per side. Marker uses ball allocation to determine how each side's score is computed per hole — the default is 1 net ball, meaning the best net score from either player on a side wins the hole for that side. This is the four-ball format. For 2v2 with both players' scores counting, configure 2 net balls per side.</p>
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

{{ SectionHeader("Also Try", "Related Games",
  "Match play is the foundation of several other formats. These all build on the same hole-by-hole structure.") }}

<div class="gg-related-grid">

{{ RelatedCard(
  "Nassau",
  "Three simultaneous match play bets on the same round — front nine, back nine, and overall.",
  '/games/nassau/' | url
) }}

{{ RelatedCard(
  "High-Low",
  "Two-team match play using both the best and worst scores per hole. Built on the same hole-by-hole structure.",
  '/games/high-low/' | url
) }}

{{ RelatedCard(
  "Wolf",
  "Rotating partner selection every hole. Each hole is its own match play contest with a live team choice.",
  '/games/wolf/' | url
) }}

{{ RelatedCard(
  "Handicap Settings",
  "Full reference for all handicap modes in Marker — percentage, stroke allocation, and overrides.",
  '/tutorials/handicap-settings/' | url
) }}

</div>

<div style="margin-top:28px;">
<a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
