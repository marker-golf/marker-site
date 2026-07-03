---
layout: layouts/game-guide.njk
title: Stableford — Golf Game Guide
description: "Stableford golf scoring explained: how points work, net vs gross Stableford, the Quota system, and how Marker handles the point table, handicaps, and settlement automatically."
game:
  name: Stableford
  difficulty: beginner
  difficultyLabel: Beginner
  subtitle: "Earn points on every hole. Birdies score big; a bad hole barely costs you. The format that keeps everyone in the game from the first tee to the last hole."
  heroSubtitleWidth: "520px"
  heroStats:
    - label: Players
      value: "1 or more"
    - label: Format
      value: Points-based
    - label: Best For
      value: Any group size
    - label: Handicap
      value: Supported
    - label: Available In
      value: Marker
  heroCta:
    primary:
      text: Play Stableford in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Stableford?
    body: "Set up in under a minute. Marker applies handicap strokes, calculates points hole by hole, and tracks every player's running total automatically."
    primary:
      text: Start Your Stableford Game
      href: "https://app.marker.golf"
    secondary:
      text: Read the Setup Guide
      href: "/tutorials/getting-started/"
sections:
  - id: overview
    label: Overview
  - id: scoring
    label: Points System
  - id: quota
    label: Quota Scoring
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

{{ SectionHeader("Overview", "What Is Stableford?",
  "A points-based format where you earn points on every hole rather than counting total strokes. Most points wins.") }}

<div class="gg-prose">

In Stroke Play, every stroke counts against you — a triple bogey on hole 2 stays on the card through hole 18. In Stableford, each hole is scored independently as a point award. A good hole earns you 3 points; a bad hole costs you nothing (or nearly nothing). The player with the most points at the end wins.

This single difference changes how golf feels. You can pick up once a hole is beyond useful, you're never out of the round because of one bad stretch, and there's a genuine incentive to go for birdie even when the lie is risky — because in Stroke Play, a missed green leads to a dropped shot, but in Stableford, it often just means 1 point instead of 3.

Stableford works for any group size, scales from solo practice rounds to large outings, handles gross or net scoring, and pairs naturally with the Quota system — a personal target that turns individual performance into a competition across all handicap levels.

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">2</div>
<div class="gg-quick-stat__lbl">Points for a par</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">3</div>
<div class="gg-quick-stat__lbl">Points for a birdie</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">36</div>
<div class="gg-quick-stat__lbl">Points = "par" Stableford round</div>
</div>
</div>

<div class="gg-callout gg-callout--info">
<p><strong>Why does 36 = "par"?</strong> A scratch player who makes par on every hole earns 2 points × 18 holes = 36 points. Beating 36 means you played better than scratch; falling short means the course won. This baseline anchors the Quota system and makes leaderboard comparisons intuitive.</p>
</div>

{{ MarkerImplNote("Marker applies handicap strokes per Stroke Index, calculates Stableford points automatically as scores are entered, and displays each player's running point total on the leaderboard. The Quota system is built in — enable it to give each player a personal target based on their handicap. All point values are customizable.") }}

</div>
</section>

{# ================================================================
   2. POINTS SYSTEM
   ================================================================ #}
<section class="section" id="scoring">
<div class="container">

{{ SectionHeader("Points System", "How Stableford Points Work",
  "Every hole awards a point value based on how your score compares to par. Marker's default schedule is close to traditional Stableford with an additional penalty for very bad holes.") }}

<div class="gg-prose">

Stableford scoring converts your score on each hole into a point value by comparing it to par. The comparison uses your net score when handicap is enabled, or your raw gross score when playing gross Stableford.

</div>

<div class="gg-table-wrapper" style="margin-top:24px; margin-bottom:32px;">
<table class="gg-table" aria-label="Marker Stableford point schedule">
<thead>
<tr>
<th>Result</th>
<th>vs. Par</th>
<th style="text-align:right;">Points</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Double Eagle (Albatross)</strong></td>
<td>−3 or better</td>
<td style="text-align:right;" class="gg-win"><strong>+5</strong></td>
</tr>
<tr>
<td><strong>Eagle</strong></td>
<td>−2</td>
<td style="text-align:right;" class="gg-win"><strong>+4</strong></td>
</tr>
<tr>
<td><strong>Birdie</strong></td>
<td>−1</td>
<td style="text-align:right;" class="gg-win"><strong>+3</strong></td>
</tr>
<tr>
<td>Par</td>
<td>E</td>
<td style="text-align:right;"><strong>+2</strong></td>
</tr>
<tr>
<td>Bogey</td>
<td>+1</td>
<td style="text-align:right;">+1</td>
</tr>
<tr>
<td>Double Bogey</td>
<td>+2</td>
<td style="text-align:right;">0</td>
</tr>
<tr>
<td>Triple Bogey or worse</td>
<td>+3 or more</td>
<td style="text-align:right; color:var(--red, #dc2626);">−1</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

**What makes this table feel different from stroke play.** Par earns 2 points — double bogey earns nothing, not a deduction. A bogey still earns 1 point. Only triple bogey or worse actually penalizes you. This means:

- A hole that would wreck a Stroke Play card barely registers here
- Par holes keep the round moving forward
- The real scoring decisions happen around birdie opportunities

**A quick example.** A player makes par, then birdie, then bogey across three holes. Their points: 2 + 3 + 1 = 6 points across 3 holes. In Stroke Play, those same holes would read as +0, −1, +1 = E — a neutral result. In Stableford, the same performance is a positive number you're building on.

**Point values are configurable.** Marker ships with the default schedule above, but all values are editable in the game settings. Common customizations include adding negative points for double bogey (to create more separation) or increasing the eagle reward for groups that want more aggressive incentives.

</div>

<div class="gg-callout gg-callout--info" style="margin-top:24px;">
<p><strong>Net vs. Gross.</strong> When handicap is enabled (the default), Marker applies each player's handicap strokes by Stroke Index before comparing to par. The scorecard shows net Stableford points — the comparison has already happened after your strokes are applied. A 10-handicapper who makes a bogey on a stroke hole nets a par, earning 2 points instead of 1. See <a href="#gross-vs-net">Gross vs. Net Stableford</a> below.</p>
</div>

</div>
</section>

{# ================================================================
   3. QUOTA SCORING
   ================================================================ #}
<section class="section section--white" id="quota">
<div class="container">

{{ SectionHeader("Quota Scoring", "Playing to Your Number",
  "Quota Stableford gives every player a personal points target based on their handicap. Beat your number to win — regardless of handicap level.") }}

<div class="gg-prose">

Standard Stableford gives every player the same scoring system but doesn't directly account for handicap differences in the final standings. A scratch player who shoots 40 points and a 20-handicapper who shoots 40 points tied — but the 20-handicapper far outperformed their expected level while the scratch player barely broke even.

The Quota system solves this by giving each player a personal target: a number they're expected to reach based on their handicap. Beating the number means you played above your ability. The player who beats their quota by the most wins — even if a lower-handicap player posts more raw points.

**How the quota is calculated.** Marker uses the formula:

</div>

<div class="gg-callout" style="margin:24px 0; text-align:center;">
<p style="font-size:1.1rem;"><strong>Personal Quota = 36 − Course Handicap</strong></p>
<p style="margin-top:8px; font-size:0.9rem; color:var(--ink-muted);">A player with a 10 Course Handicap has a personal quota of 26 points.</p>
</div>

<div class="gg-prose">

The formula reflects the baseline expectation: a scratch player (0 handicap) is expected to score 36 points (par on every hole). Each handicap stroke represents one point of adjustment. A 10-handicapper should reach 26 points; they're expected to make bogey on 10 holes and par on the rest. Anything above 26 means they played better than expected.

**How Quota points work.** In Quota mode, Stableford points are calculated using **gross scores** — your raw score compared to par, with no handicap adjustment per hole. The handicap compensation is already built into the personal quota target. This is different from standard net Stableford, where handicap strokes are applied hole by hole.

**The final result.** Marker calculates each player's `resolved` score:

</div>

<div class="gg-callout" style="margin:24px 0; text-align:center;">
<p style="font-size:1.1rem;"><strong>Resolved = Total Gross Points − Personal Quota</strong></p>
<p style="margin-top:8px; font-size:0.9rem; color:var(--ink-muted);">A positive resolved score means you beat your quota. Negative means the course won.</p>
</div>

<div class="gg-prose">

The player with the highest resolved score wins. The leaderboard shows each player's quota and their running `+/−` score throughout the round.

</div>

<h3 style="font-size:1.05rem; color:var(--ink); margin:32px 0 16px;">Quota Worked Example</h3>

<div class="gg-prose" style="margin-bottom:16px;">

Three players — Player A (scratch, 0 handicap), Player B (10 handicap), Player C (20 handicap). All play gross Stableford in Quota mode. Quota points: 36 (default).

</div>

<div class="gg-table-wrapper">
<table class="gg-table">
<thead>
<tr>
<th>Player</th>
<th>Handicap</th>
<th>Personal Quota (36 − HCP)</th>
<th>Gross Points Total</th>
<th>Resolved (Points − Quota)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>A</strong></td>
<td>0</td>
<td>36</td>
<td>38</td>
<td class="gg-win"><strong>+2</strong></td>
</tr>
<tr>
<td><strong>B</strong></td>
<td>10</td>
<td>26</td>
<td>31</td>
<td class="gg-win"><strong>+5</strong></td>
</tr>
<tr>
<td><strong>C</strong></td>
<td>20</td>
<td>16</td>
<td>22</td>
<td class="gg-win"><strong>+6</strong></td>
</tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-top:16px;">
<p><strong>Player C wins.</strong> Despite the lowest raw point total, Player C beat their quota by 6 points — the most of any player. Player A had the highest raw points but only beat their (much higher) scratch-level quota by 2. Quota makes this a genuinely level playing field across all handicap levels.</p>
</div>

<div class="gg-prose" style="margin-top:24px;">

**Why groups love Quota.** The "beat your number" concept is immediately intuitive. Every player has one number to chase, everyone can look at the leaderboard and compare their `+/−` directly, and the format naturally rewards both skill and performance-above-expectation in a single unified ranking.

**Quota and negative points.** If a player ends the round below their quota — which can happen if triple bogeys accumulate — their resolved score will be negative. Marker displays this as a negative `+/−` value in the leaderboard.

**The `quotaPoints` setting.** The quota baseline defaults to 36 but is configurable. Some groups use 36 as a strict traditional value; others adjust up or down based on their group's typical scoring range. Changing `quotaPoints` shifts all personal quotas by the same amount.

</div>

{{ ScreenshotPlaceholder("Stableford Leaderboard — Quota Mode", "Player quota shown under name · +/− column · running resolved score") }}

</div>
</section>

{# ================================================================
   4. SETUP IN MARKER
   ================================================================ #}
<section class="section" id="configuration">
<div class="container">

{{ SectionHeader("Setup Guide", "Configuring Stableford in Marker",
  "All settings are in the game creation flow. Most groups run with the defaults and adjust one or two options.") }}

<div class="gg-config-grid">

{{ ConfigCard(
  "Quota",
  "Standard or Quota Mode",
  "Standard Stableford: highest raw points wins. Quota mode: each player gets a personal target (36 − course handicap) and the player who beats their quota by the most wins.",
  [
    {label: "Standard — highest points wins (default)", rec: true},
    {label: "Quota — beat your personal target", rec: false}
  ]
) }}

{{ ConfigCard(
  "Quota Target",
  "Quota Base Points",
  "When Quota is enabled, the base from which personal quotas are calculated. Default is 36 — the expected score for a scratch player. Each player's quota is: base − course handicap.",
  [
    {label: "36 — standard baseline (default)", rec: true},
    {label: "Custom — adjust for your group's typical scoring", rec: false}
  ]
) }}

{{ ConfigCard(
  "Handicap",
  "Net or Gross Stableford",
  "Net Stableford (default): handicap strokes applied per hole before points are calculated. Gross Stableford: raw scores only. In Quota mode, points always use gross — handicap is embedded in the personal quota instead.",
  [
    {label: "Net — handicap applied per hole (default)", rec: true},
    {label: "Gross — raw scores only", rec: false}
  ]
) }}

{{ ConfigCard(
  "Points",
  "Custom Point Values",
  "All point values are editable: Triple or worse, Double Bogey, Bogey, Par, Birdie, Eagle, Double Eagle. The defaults (-1 / 0 / 1 / 2 / 3 / 4 / 5) reflect traditional Stableford. Customize for modified or group-specific formats.",
  [
    {label: "Default schedule — traditional Stableford (default)", rec: true},
    {label: "Custom — set any value per score category", rec: false}
  ]
) }}

{{ ConfigCard(
  "Buy-In",
  "Pool Payout",
  "Optional pool buy-in for the event. All players contribute to a shared pot; highest Stableford total (or best resolved quota score) wins the payout. Configure the amount and payout positions.",
  [
    {label: "No buy-in (default)", rec: false},
    {label: "Pool buy-in — winner takes pot", rec: true}
  ]
) }}

</div>

<div class="gg-screenshot-row">
{{ ScreenshotPlaceholder("Stableford Settings", "Points · Quota · Handicap · Buy-in") }}
{{ ScreenshotPlaceholder("Live Scorecard", "Per-hole points with running total") }}
{{ ScreenshotPlaceholder("Leaderboard", "Rankings · Quota shown under name · $ if configured") }}
</div>
<p style="font-size:0.78rem; color:var(--ink-light); margin-top:12px; max-width:420px;">
Screenshots from the Marker app will appear here. <a href="https://app.marker.golf" style="color:var(--green-600);">Open Marker</a> to see Stableford in action.
</p>

</div>
</section>

{# ================================================================
   5. WORKED EXAMPLE
   ================================================================ #}
<section class="section section--white" id="example">
<div class="container">

{{ SectionHeader("Worked Example", "Six Holes of Net Stableford",
  "One player, 12-handicap, playing net Stableford. Handicap strokes allocated by Stroke Index.") }}

<div class="gg-prose" style="margin-bottom:24px;">

A 12-handicapper receives one stroke on the 12 hardest holes (Stroke Index 1–12). Below is their first six holes. Net score = Gross minus handicap strokes received on that hole. Points are from the net score vs par.

</div>

<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Stableford net scoring example — holes 1–6">
<thead>
<tr>
<th>Hole</th>
<th>Par</th>
<th>SI</th>
<th>Stroke?</th>
<th>Gross</th>
<th>Net</th>
<th>Net vs Par</th>
<th>Points</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1</strong></td>
<td>4</td>
<td>3</td>
<td>Yes</td>
<td>5</td>
<td>4</td>
<td>E</td>
<td class="">+2</td>
<td>2</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td>3</td>
<td>15</td>
<td>No</td>
<td>2</td>
<td>2</td>
<td>−1</td>
<td class="gg-win">+3</td>
<td>5</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td>5</td>
<td>7</td>
<td>Yes</td>
<td>6</td>
<td>5</td>
<td>E</td>
<td class="">+2</td>
<td>7</td>
</tr>
<tr>
<td><strong>4</strong></td>
<td>4</td>
<td>1</td>
<td>Yes</td>
<td>8</td>
<td>7</td>
<td>+3</td>
<td style="color:var(--red,#dc2626);">−1</td>
<td>6</td>
</tr>
<tr>
<td><strong>5</strong></td>
<td>4</td>
<td>17</td>
<td>No</td>
<td>3</td>
<td>3</td>
<td>−1</td>
<td class="gg-win">+3</td>
<td>9</td>
</tr>
<tr>
<td><strong>6</strong></td>
<td>4</td>
<td>9</td>
<td>Yes</td>
<td>5</td>
<td>4</td>
<td>E</td>
<td class="">+2</td>
<td>11</td>
</tr>
</tbody>
</table>
</div>

<div style="margin-top:16px; display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
<span style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--ink-muted);">
SI = Stroke Index (hole difficulty ranking, 1 = hardest)
</span>
<span style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--ink-muted);">
<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:rgba(74,124,89,0.2);"></span> Birdie or better = highlighted
</span>
</div>

<div class="gg-callout" style="margin-top:24px;">
<p><strong>Hole 4 detail:</strong> A quad-bogey (+4 gross) with a stroke gives net triple bogey (+3 net vs par) → −1 point. In Stroke Play, this hole would be a +4 — catastrophic. In Stableford, it costs only 1 point off the total. The round continues at 6 points instead of 5, not buried under a blowup hole.</p>
</div>

<div class="gg-callout gg-callout--info" style="margin-top:12px;">
<p><strong>Hole 2 detail:</strong> SI 15 means no handicap stroke here. But the player still made a gross birdie (2 on a par 3), earning 3 points outright — no stroke needed. Birdies are always worth 3 points regardless of stroke allocation.</p>
</div>

<h3 style="font-size:1.05rem; color:var(--ink); margin:32px 0 16px;">Handicap Stroke Effect — Single Hole Example</h3>

<div class="gg-prose" style="margin-bottom:16px;">

The same bogey on a SI 3 hole (where the player receives a stroke) vs. a SI 15 hole (where they don't) has completely different Stableford implications.

</div>

<div class="gg-table-wrapper">
<table class="gg-table">
<thead>
<tr>
<th>Scenario</th>
<th>Gross</th>
<th>Stroke?</th>
<th>Net</th>
<th>Net vs Par</th>
<th>Points</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bogey on a stroke hole (SI ≤ 12)</td>
<td>5</td>
<td>−1</td>
<td>4</td>
<td>E (par)</td>
<td><strong>+2</strong></td>
</tr>
<tr>
<td>Bogey on a non-stroke hole (SI > 12)</td>
<td>5</td>
<td>—</td>
<td>5</td>
<td>+1 (bogey)</td>
<td><strong>+1</strong></td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose" style="margin-top:12px;">

Same gross score, 1-point difference, because one hole allocates a stroke and the other doesn't. Knowing where your strokes fall is critical in net Stableford — see the [Strategy](#strategy) section.

</div>

</div>
</section>

{# ================================================================
   6. STRATEGY
   ================================================================ #}
<section class="section" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Playing Stableford Well",
  "Stableford changes the risk/reward calculation on almost every hole. Here is how to use the format to your advantage.") }}

<div class="gg-tips-grid">

{{ TipCard(
  "Aggression",
  "Go for Birdies More Than You Would in Stroke Play",
  "In Stroke Play, an aggressive play that goes wrong can cost you 3+ shots in a hole and ruin a scorecard. In Stableford, the worst reasonable outcome is −1 (triple bogey or worse). When you're 40 yards from the pin in a bad lie, the aggressive recovery that has a 30% chance of birdie and a 30% chance of triple is often worth it. The math favors aggression more than people expect."
) }}

{{ TipCard(
  "Moving On",
  "Pick Up Early — Know When a Hole Is Over",
  "Once you can no longer score better than −1 (triple bogey or worse), there is no Stableford reason to keep playing the hole. In casual rounds and most club formats, you can pick up and move to the next tee. Marker allows for scores to reflect this. Picking up early keeps pace and saves physical energy for holes where points are still available."
) }}

{{ TipCard(
  "Stroke Holes",
  "Know Your Stroke Holes Before the Round",
  "In net Stableford, the holes where you receive handicap strokes are the most valuable holes on the card — a bogey becomes a par (2 points) and a birdie becomes an eagle-level score (4 points net). Identify your stroke holes before you tee off and plan your approach strategy on those holes accordingly. A bogey on a non-stroke hole is 1 point; a bogey on a stroke hole is 2."
) }}

{{ TipCard(
  "Pars Are Points",
  "Never Dismiss a Par as Unimportant",
  "In Stroke Play, a round of 18 pars is a mediocre result. In Stableford, 18 pars = 36 points — a genuine scratch-level round. Don't treat par as a failure. Every 2-point hole adds up, and steady par rounds are competitive at most handicap levels. Birdies are the bonus, not the baseline."
) }}

{{ TipCard(
  "Late Game",
  "Use the Leaderboard as Information",
  "Marker shows the leaderboard during the round. If you are several points ahead, protect your position — a late triple bogey is −1 point and barely matters, but a double bogey is 0 and harmless. If you are behind, the closing holes need aggressive target selection to manufacture birdies and eagles. Know what you need, not just what's par."
) }}

{{ TipCard(
  "Quota",
  "In Quota Mode, Chase Your Number Not Others",
  "In Quota Stableford, focus on your own running total vs your personal quota, not the raw scores of other players. A 20-handicapper with a quota of 16 who is at 20 points through 14 holes is running +4 — a strong position. Track your own +/− throughout the round rather than trying to compare raw totals across different handicap levels."
) }}

</div>

</div>
</section>

{# ================================================================
   7. GROSS VS. NET
   ================================================================ #}
<section class="section section--white" id="gross-vs-net">
<div class="container">

{{ SectionHeader("Gross vs. Net", "Which Scoring Mode to Use",
  "Net Stableford levels the playing field for mixed-handicap groups. Gross rewards raw scoring ability.") }}

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">Net Stableford (100%) <span class="gg-hdcp-rec-badge">Recommended</span></div>
<div class="gg-hdcp-option__desc">Handicap strokes applied per hole by Stroke Index before points are calculated. A bogey on a stroke hole nets par — worth 2 points instead of 1. Net Stableford is the default in Marker and the most widely used format for club play, outings, and mixed-handicap groups. Higher-handicap players can compete genuinely with scratch players.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Gross Stableford</div>
<div class="gg-hdcp-option__desc">Raw scores compared to par with no handicap adjustment. Points are calculated directly from the gross score. Best suited for groups with similar ability levels, or for solo practice rounds where you want to track your actual scoring performance. Marker automatically uses gross Stableford when handicap is disabled in settings.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Quota (Gross + Handicap-Adjusted Target)</div>
<div class="gg-hdcp-option__desc">In Quota mode, Marker always uses gross points per hole — but each player's target (personal quota) is handicap-adjusted using 36 − course handicap. The handicap is incorporated at the target level, not the hole level. This is a fundamentally different approach to handicap equity than standard net Stableford.</div>
</div>

</div>

<div class="gg-prose" style="margin-top:32px;">

**How net strokes work in Stableford.** Marker applies strokes by Stroke Index: each hole is rated 1 (hardest) to 18 (easiest). A 12-handicapper receives one stroke on the 12 hardest holes — on those holes, their gross score is reduced by 1 before the point lookup happens. A 20-handicapper receives one stroke on every hole plus a second stroke on the two hardest holes.

**Partial handicap (85%).** Marker also supports fractional handicap modes. At 85%, each player's Course Handicap is multiplied by 0.85 before stroke allocation. This reduces the edge for high handicappers while still applying some adjustment. Some groups use this when they feel full handicap gives too large an advantage on specific holes.

<div class="gg-callout gg-callout--info">
<p>For a full explanation of all handicap settings in Marker — including percentage modes, half-strokes, and per-player overrides — see the <a href="{{ '/games/handicap-settings/' | url }}">Handicap Settings guide</a>.</p>
</div>

</div>

</div>
</section>

{# ================================================================
   8. VARIATIONS
   ================================================================ #}
<section class="section" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Stableford Formats and Comparisons",
  "How Stableford compares to Stroke Play, and the most common Stableford variations.") }}

<h3 style="font-size:1.05rem; color:var(--ink); margin:0 0 20px;">Stableford vs. Stroke Play</h3>

<div class="gg-table-wrapper" style="margin-bottom:36px;">
<table class="gg-table">
<thead>
<tr>
<th>Factor</th>
<th>Stableford</th>
<th>Stroke Play</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Objective</strong></td>
<td>Most points wins</td>
<td>Fewest strokes wins</td>
</tr>
<tr>
<td><strong>Disaster hole</strong></td>
<td>−1 point maximum penalty</td>
<td>Every stroke counts; can ruin the card</td>
</tr>
<tr>
<td><strong>Pace of play</strong></td>
<td>Faster — pick up when hole is over</td>
<td>Must hole out on every hole</td>
</tr>
<tr>
<td><strong>Risk/reward</strong></td>
<td>Aggression rewarded; downside limited</td>
<td>Conservative play minimizes risk</td>
</tr>
<tr>
<td><strong>Handicap use</strong></td>
<td>Applied per hole (net) or embedded in quota</td>
<td>Applied as total stroke reduction</td>
</tr>
<tr>
<td><strong>Mental engagement</strong></td>
<td>Every hole is a fresh start</td>
<td>Cumulative pressure builds through round</td>
</tr>
<tr>
<td><strong>Best for</strong></td>
<td>Mixed groups, outings, casual rounds</td>
<td>Competitive stroke events, handicap index</td>
</tr>
</tbody>
</table>
</div>

<h3 style="font-size:1.05rem; color:var(--ink); margin:0 0 20px;">Common Stableford Formats</h3>

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
</div>
<div class="gg-variation__body">
<h4>Traditional Stableford (Marker Default)</h4>
<p>Marker's default point schedule (5/4/3/2/1/0/−1) is close to traditional Stableford with the addition of a −1 penalty for triple bogey or worse. Traditional Stableford awards 0 for double bogey and anything worse; Marker's schedule adds a mild penalty to prevent very bad holes from being completely cost-free.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<div class="gg-variation__body">
<h4>Net Stableford (Most Common)</h4>
<p>The standard form for club play and mixed-handicap groups. Handicap strokes applied per hole by Stroke Index. Marker enables this by default. Each player's net score on every hole is compared to par to determine points.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
</div>
<div class="gg-variation__body">
<h4>Quota Stableford</h4>
<p>Adds a personal target for each player. Beat your quota (36 − course handicap) to win. Marker's built-in Quota mode calculates each player's personal target automatically and tracks the +/− resolved score throughout the round. The most equitable format for groups with wide handicap ranges.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
</div>
<div class="gg-variation__body">
<h4>Custom Points (Configurable in Marker)</h4>
<p>Marker's settings form lets you edit every point value: Triple or worse, Double Bogey, Bogey, Par, Birdie, Eagle, Double Eagle. Common customizations: change double bogey to −1 for more penalty-heavy play, increase the Eagle value to 6 or 8 to create bigger incentives for aggressive play.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
</div>
<div class="gg-variation__body">
<h4>Team Stableford</h4>
<p>A separate game in Marker (premium feature). Four or more players split into teams; each team takes the best ball Stableford score per hole. Supports the same Quota system and accounting options as individual Stableford. Team total points win.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Modified Stableford (International Format)</h4>
<p>A different point schedule used in PGA Tour's International tournament: Eagle = +5, Birdie = +2, Par = 0, Bogey = −1, Double or worse = −3. This is a substantially different system than Marker's default. It can be replicated by customizing Marker's point values to match.</p>
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

{{ SectionHeader("Marker App", "Why Run Stableford in Marker?",
  "Stableford requires converting every score to a point value, applying handicap strokes per hole, and tracking running totals. Marker handles all of it automatically.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
</div>
<h4>Points Calculated as You Play</h4>
<p>The moment a score is entered for a hole, Marker looks up the point value, displays it in the hole cell, and adds it to the running total. No manual lookup required — the scorecard shows points live as the round progresses.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Handicap Strokes Applied Per Hole</h4>
<p>Marker distributes each player's course handicap across holes by Stroke Index automatically. The scorecard shows net Stableford points — the handicap math is already done before you see the number.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<h4>Live Leaderboard</h4>
<p>The leaderboard shows each player's current point total and ranking throughout the round. The footer displays the point reference (Eagle 4 · Birdie 3 · Par 2 · Bogey 1) so no one has to remember the table mid-round.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
</div>
<h4>Quota Tracking Built In</h4>
<p>Enable Quota mode and Marker calculates each player's personal target automatically from their handicap. The leaderboard shows the quota under each player's name and their current +/− resolved score. No spreadsheet, no manual subtraction.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
</div>
<h4>Custom Points</h4>
<p>Every point value in the scoring table is configurable. Set a different table for Modified Stableford, increase the Eagle reward, or add a penalty for double bogey — all without leaving the Marker setup screen.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Pool Settlement</h4>
<p>Add a buy-in to the game setup and Marker calculates the payout at the end. The highest total (or best quota result) wins the pot. No need to figure it out at the 19th hole.</p>
</div>

</div>

<div style="margin-top:40px; text-align:center;">
<a href="https://app.marker.golf" class="btn btn-primary">Play Stableford in Marker</a>
<p style="margin-top:14px; font-size:0.8rem; color:rgba(255,255,255,0.38);">Available on iOS, Android, and Web · Solo or Group</p>
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
<summary>What is Stableford scoring?</summary>
<div class="gg-faq-body">
<p>Stableford is a points-based golf format where each hole is scored independently. You earn points based on how your score compares to par — birdie earns more than par, which earns more than bogey. The player with the most points at the end wins. Unlike stroke play, a single bad hole can cost you at most 1 point rather than ruining the card.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How many points is a birdie worth in Marker?</summary>
<div class="gg-faq-body">
<p>3 points. The default Marker Stableford schedule is: Double Eagle = 5, Eagle = 4, Birdie = 3, Par = 2, Bogey = 1, Double Bogey = 0, Triple Bogey or worse = −1. All point values are customizable in Marker's game settings.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Does the highest or lowest score win in Stableford?</summary>
<div class="gg-faq-body">
<p>The highest score wins — the player with the most points wins the game. This is opposite to stroke play, where the lowest total wins. In Quota mode, the player who beats their personal quota by the most points wins.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What happens after a very bad hole?</summary>
<div class="gg-faq-body">
<p>The maximum penalty in Marker's default schedule is −1 point, which applies to triple bogey or worse. A double bogey is 0 points — no gain, no loss. Once a hole is beyond triple bogey, there are no more Stableford points to lose, and in casual rounds you can pick up and move to the next tee. The round continues with the total essentially unchanged.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can Stableford be played with handicaps?</summary>
<div class="gg-faq-body">
<p>Yes — net Stableford is the most common format. Marker applies handicap strokes per hole by Stroke Index before calculating points. Handicap is enabled by default at 100%. You can also play gross Stableford (no handicap) by disabling it in settings, or use partial handicap (e.g. 85%).</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is Net Stableford?</summary>
<div class="gg-faq-body">
<p>Net Stableford applies handicap strokes hole by hole before comparing your score to par. A 12-handicapper who makes a bogey on a stroke-index hole of 3 (where they receive a stroke) nets par — and earns 2 points instead of 1. Net Stableford levels the playing field for mixed-handicap groups and is the default mode in Marker.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is Modified Stableford?</summary>
<div class="gg-faq-body">
<p>Modified Stableford typically refers to the PGA Tour format (used in their former International tournament) with a different point schedule: Eagle = +5, Birdie = +2, Par = 0, Bogey = −1, Double or worse = −3. This is NOT Marker's default schedule, which is closer to traditional Stableford. The Modified schedule can be replicated in Marker by customizing the point values in game settings.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is a Stableford Quota?</summary>
<div class="gg-faq-body">
<p>A Quota is a personal target each player must beat. Marker calculates it as: 36 minus the player's course handicap. A 10-handicapper has a quota of 26. The player who exceeds their quota by the most points wins. Quota mode always uses gross Stableford points — the handicap is incorporated into the target, not applied per hole.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How does Marker calculate a player's Quota?</summary>
<div class="gg-faq-body">
<p>Marker sets each player's quota as: <strong>quotaPoints (default 36) − player's course handicap</strong>. The course handicap is derived from the player's handicap index and their tee selection. During the round, Marker tracks their gross Stableford point total and displays their running +/− against the quota. The final resolved score = total gross points − personal quota.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can Stableford be played as a team game?</summary>
<div class="gg-faq-body">
<p>Team Stableford is available in Marker as a separate game (premium feature). It requires 4 or more players split into teams. Each team takes the best ball net Stableford score per hole. Team Quota is also supported. Individual Stableford has no team format — all players compete independently.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How does Marker display Stableford points on the scorecard?</summary>
<div class="gg-faq-body">
<p>Each hole cell shows the Stableford points earned: "+3" for a birdie, "+2" for par, "+1" for bogey, "0" for double bogey, "−1" for triple or worse. Birdie or better is highlighted. The running point total is shown in the leaderboard. In quota mode, the leaderboard shows each player's quota and their current +/− resolved score.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can I play Stableford solo in Marker?</summary>
<div class="gg-faq-body">
<p>Yes. Stableford supports a minimum of 1 player — it's a useful format for solo practice rounds where you want to track performance by hole rather than total strokes. Quota mode works for solo play too, giving you a personal target to chase even without other competitors.</p>
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
  "Stableford pairs well with these formats or serves as an alternative for groups wanting more variety.") }}

<div class="gg-related-grid">

{{ RelatedCard(
  "TeamCountX",
  "Team format where each hole counts a set number of scores per team. The points-based cousin of Stableford for group play.",
  '/games/team-count-x/' | url
) }}

{{ RelatedCard(
  "Skins",
  "Each hole is its own contest. Win it outright — no Stableford math, just the lowest score on that hole takes the skin.",
  '/games/skins/' | url
) }}

{{ RelatedCard(
  "Nassau",
  "Three simultaneous match play bets — front nine, back nine, and overall. Simple head-to-head scoring that pairs well with a Stableford side game.",
  '/games/nassau/' | url
) }}

{{ RelatedCard(
  "Handicap Settings",
  "Full explanation of how Marker applies handicap strokes, percentage modes, and per-player configurations across all games.",
  '/games/handicap-settings/' | url
) }}

</div>

<div style="margin-top:28px;">
<a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
