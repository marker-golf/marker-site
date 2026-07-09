---
layout: layouts/game-guide.njk
title: Scotch Golf Game — Rules, Points & Strategy | Marker
description: "Scotch golf game rules explained: how Low Ball, Low Team, Birdie, and KP points work, the Blitz rule, handicap application, and how Marker tracks all four scoring components automatically."
status: available
category: classic
order: 5
players: "4 (2 v 2)"
format: "Points per hole"
cardDescription: "2v2 points format with four scoring components per hole — Low Ball, Low Team, Birdie, and Closest to Pin. Sweep all four and trigger a Blitz for double points. Marker tracks every component and settles at point differential automatically."
game:
  name: Scotch
  difficulty: intermediate
  difficultyLabel: Intermediate
  subtitle: "Four scoring components compete on every hole. Low ball, low team, birdie, and closest to pin — earn all four and trigger the Blitz for double points."
  heroSubtitleWidth: "520px"
  heroStats:
    - label: Players
      value: "4 (2 v 2)"
    - label: Teams
      value: "2 fixed"
    - label: Format
      value: Points per hole
    - label: Handicap
      value: Supported
    - label: Available In
      value: Marker
  heroCta:
    primary:
      text: Play Scotch in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Scotch?
    body: "Set up your teams and point values in Marker before you tee off. Low Ball, Low Team, Birdie, KP, and Blitz are all tracked automatically — hole by hole."
    primary:
      text: Start Your Scotch Game
      href: "https://app.marker.golf"
    secondary:
      text: Get Started with Marker
      href: "/tutorials/welcome-to-marker/"
sections:
  - id: overview
    label: Overview
  - id: scoring-components
    label: Scoring Components
  - id: blitz
    label: The Blitz
  - id: configuration
    label: Setup in Marker
  - id: example
    label: Example Holes
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
{% from "components/game-guide.njk" import SectionHeader, ConfigCard, TipCard, FaqItem, RelatedCard, MarkerImplNote %}
{% from "components/product-screenshot.njk" import GameGuideScreenshot %}

{# ================================================================
   1. OVERVIEW
   ================================================================ #}
<section class="section section--white" id="overview">
<div class="container">

{{ SectionHeader("Overview", "What Is Scotch?",
  "Scotch is a 2v2 team betting game where four scoring components compete simultaneously on every hole. All four players play their own ball. Points — not strokes — determine the winner.") }}

<div class="gg-prose">

Scotch (also known as Umbriago) is a four-player betting game that divides the group into two fixed teams of two. On each hole, four independent point categories are decided: which team has the best individual score (Low Ball), which team has the better combined score (Low Team), which team made a birdie that the other didn't match (Birdie), and which team's player was closest to the pin (KP — Closest to Pin). Points are earned hole by hole, and the team that accumulates more total points wins.

The format rewards complete hole-by-hole performance. A team that wins Low Ball but gives up Low Team and Birdie still comes away with 2 points; a team that sweeps all four components — and triggers the Blitz — earns double points for that hole.

</div>

<div class="gg-callout gg-callout--info">
<p><strong>A note on the name.</strong> "Scotch" means different things at different clubs and in different regions. Some groups use the name for alternate-shot Foursomes (partners share one ball). Marker's Scotch is the 2v2 points format described on this page — four scoring components per hole, all players playing their own ball. If your group plays "Scotch" differently, the rules here describe the specific version in Marker.</p>
</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">4</div>
<div class="gg-quick-stat__lbl">Scoring components per hole</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">6</div>
<div class="gg-quick-stat__lbl">Max points per hole (default)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">12</div>
<div class="gg-quick-stat__lbl">Max points with a Blitz</div>
</div>
</div>

{{ MarkerImplNote("Marker applies handicap strokes per player, evaluates all four scoring components after each hole's scores are entered, identifies the winner of each component, and tallies team points automatically. Blitz doubling is applied automatically when triggered. The KP winner must be designated by a commissioner. Settlement calculates at point differential × amount per point.") }}

</div>
</section>

{# ================================================================
   2. SCORING COMPONENTS
   ================================================================ #}
<section class="section" id="scoring-components">
<div class="container">

{{ SectionHeader("Scoring Components", "Four Ways to Win Each Hole",
  "Every hole offers four independent point categories. Each is decided separately. Ties on any component award zero points to either team.") }}

<div class="gg-prose" style="margin-bottom:28px;">

Each scoring component is evaluated independently. Winning two components and tying two is a 4–0 hole. Tying all four components is a 0–0 hole. A team can never fall below 0 on any single component — ties simply produce nothing for either side.

</div>

<div class="gg-table-wrapper" style="margin-bottom:36px;">
<table class="gg-table" aria-label="Scotch scoring components">
<thead>
<tr>
<th>Component</th>
<th>What Is Compared</th>
<th style="text-align:right;">Points (default)</th>
<th>Tie Behavior</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Low Ball</strong></td>
<td>Best individual net score from each team</td>
<td style="text-align:right;"><strong>2</strong></td>
<td>No points to either team</td>
</tr>
<tr>
<td><strong>Low Team</strong></td>
<td>Sum of both team members' net scores</td>
<td style="text-align:right;"><strong>2</strong></td>
<td>No points to either team</td>
</tr>
<tr>
<td><strong>Birdie</strong></td>
<td>One team makes a birdie; the other doesn't</td>
<td style="text-align:right;"><strong>1</strong></td>
<td>Both birdie = no points; neither birdie = no points</td>
</tr>
<tr>
<td><strong>KP (Proximity)</strong></td>
<td>Closest to pin — designated by commissioner</td>
<td style="text-align:right;"><strong>1</strong></td>
<td>Not applicable — one player is designated KP winner</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

**Low Ball (2 points).** Each team's best (lowest) net score is compared. If Team A's best net score beats Team B's best net score, Team A wins 2 points. If both teams have the same low ball, neither wins. Only the single best net score from each team counts — the other player's score doesn't affect this component.

**Low Team (2 points).** The sum of both team members' net scores is compared. The team with the lower combined total wins 2 points. If the combined totals are equal, no points are awarded. Every player contributes to this component — one player's bad hole can cost the team Low Team even when their partner has a great score.

**Birdie (1 point).** If one team makes a birdie and the other doesn't, the birdie team earns 1 point. If both teams make a birdie on the hole, the birdies cancel and neither team earns the point. If neither team has a birdie, no points are awarded.

Marker's default behavior requires a **natural (gross) birdie**: the player's raw score must be below par. A net birdie from a handicap stroke does not count by default. This can be turned off in settings to allow net birdies.

**KP — Closest to Pin (1 point).** A commissioner designates which player was closest to the pin in regulation on a given hole. That player's team earns 1 point. KP is manually entered — it is not calculated automatically. By convention, KP is played on par 3 holes, though the setting allows it on any hole.

All point values (Low Ball, Low Team, Birdie, KP) are configurable in the Marker game settings.

</div>

{{ GameGuideScreenshot("gameScotchActionModal", screenshots) }}

</div>
</section>

{# ================================================================
   3. THE BLITZ
   ================================================================ #}
<section class="section section--white" id="blitz">
<div class="container">

{{ SectionHeader("The Blitz", "Sweep Every Component, Double the Points",
  "If one team wins all four scoring components on a hole, the entire hole value is doubled. Default: enabled.") }}

<div class="gg-prose">

A Blitz occurs when a single team wins every available scoring component on a hole — Low Ball, Low Team, Birdie, and KP — without any ties. Because all four components go to one team, the total points for that hole are doubled automatically.

With default point values (LowBall=2, LowTeam=2, Birdie=1, KP=1), the maximum hole value before a Blitz is 6 points. A Blitz earns the sweeping team **12 points** for that hole instead of 6.

</div>

<div class="gg-callout" style="margin:24px 0;">
<p><strong>Blitz example:</strong> Team A wins Low Ball (2), Low Team (2), Birdie (1), and KP (1) on the same hole.<br>
Normal total: 6 points to Team A.<br>
<strong>With Blitz: 12 points to Team A.</strong></p>
</div>

<div class="gg-prose">

**When a Blitz can and cannot occur.** A Blitz requires a team to win ALL four components — with no ties. If any component is tied (neither team earns those points), the total can never reach the maximum possible, and no Blitz is triggered. For a Blitz to be possible on a given hole, a KP winner must also be designated (otherwise the KP points are 0 for both teams, making a full sweep impossible).

**Blitz strategy.** Knowing you're on a par 3 with a KP and someone has made a birdie puts the Blitz in play. Teams that are already losing Low Ball and Low Team on a hole sometimes play aggressively on birdie attempts specifically to prevent the opponent from triggering a Blitz.

**Disabling the Blitz.** The Blitz is on by default. It can be turned off in Marker's game settings if your group prefers a flat maximum of 6 points per hole with no doubling.

</div>

</div>
</section>

{# ================================================================
   4. SETUP IN MARKER
   ================================================================ #}
<section class="section" id="configuration">
<div class="container">

{{ SectionHeader("Setup Guide", "Configuring Scotch in Marker",
  "Set teams, point values, and match amount before the round. All scoring runs automatically from that point.") }}

<div class="gg-config-grid">

{{ ConfigCard(
  "Teams",
  "Team Assignment (Sides)",
  "Split all four players into two teams of two using Marker's Sides selector. Teams are called Left and Right internally. Teams stay fixed for the entire round.",
  [
    {label: "2v2 — one team on each side (required)", rec: true}
  ]
) }}

{{ ConfigCard(
  "Low Ball",
  "Low Ball Point Value",
  "Points awarded when one team's best individual net score beats the other team's best. Default is 2 points. Set to 0 to remove Low Ball from the game entirely.",
  [
    {label: "2 points (default)", rec: true},
    {label: "Custom — any value ≥ 0", rec: false}
  ]
) }}

{{ ConfigCard(
  "Low Team",
  "Low Team Point Value",
  "Points awarded when one team's combined net score total is lower than the other's. Default is 2 points. Both players' scores always contribute to Low Team.",
  [
    {label: "2 points (default)", rec: true},
    {label: "Custom — any value ≥ 0", rec: false}
  ]
) }}

{{ ConfigCard(
  "Birdie",
  "Birdie Point Value and Type",
  "Points awarded when one team makes a birdie and the other doesn't. Default: 1 point, natural (gross) birdie required. Toggle off natural birdie to allow net birdies to count.",
  [
    {label: "1 point, gross birdie only (default)", rec: true},
    {label: "1 point, net birdie allowed", rec: false}
  ]
) }}

{{ ConfigCard(
  "KP",
  "Proximity / Closest to Pin",
  "Points awarded to the team of the player designated closest to the pin. Default: 1 point. A commissioner must designate the KP winner — Marker does not calculate it automatically. Typically applied on par 3s.",
  [
    {label: "1 point — commissioner designates (default)", rec: true},
    {label: "Custom value or 0 to disable KP", rec: false}
  ]
) }}

{{ ConfigCard(
  "Blitz",
  "Allow Blitzes",
  "When enabled, a team that wins all four components on a hole earns double points for that hole. Default: enabled. Disable if your group prefers a flat maximum per hole.",
  [
    {label: "Enabled — sweep doubles hole value (default)", rec: true},
    {label: "Disabled — flat maximum per hole", rec: false}
  ]
) }}

{{ ConfigCard(
  "Amount",
  "Match Amount Per Point",
  "Set a dollar amount per point. Settlement is calculated as the point differential multiplied by this amount. If Team A wins by 8 points at $1/point, Team B owes $8.",
  [
    {label: "No amount — points only (default)", rec: false},
    {label: "$1 per point — common stake", rec: true}
  ]
) }}

</div>


</div>
</section>

{# ================================================================
   5. EXAMPLE HOLES
   ================================================================ #}
<section class="section section--white" id="example">
<div class="container">

{{ SectionHeader("Example Holes", "Scotch Scoring in Action",
  "Four holes. Two teams. Default point values (LowBall=2, LowTeam=2, Birdie=1, KP=1). Net scoring, natural birdie required.") }}

<div class="gg-prose" style="margin-bottom:24px;">

**Teams:**
- Team A: A1 (12-handicap) and A2 (8-handicap)
- Team B: B1 (4-handicap) and B2 (16-handicap)

Each player plays their own ball. Handicap strokes applied by Stroke Index. Net scores used for Low Ball and Low Team. Birdie check uses gross score (natural birdie required).

</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 16px;">Hole 1 — Par 4, SI 5</h3>

<div class="gg-example-wrap" style="margin-bottom:12px;">
<table class="gg-example-table">
<thead>
<tr><th>Player</th><th>Team</th><th>HCP</th><th>Stroke?</th><th>Gross</th><th>Net</th><th>Gross Birdie?</th></tr>
</thead>
<tbody>
<tr><td>A1</td><td>A</td><td>12</td><td>Yes (SI 5 ≤ 12)</td><td>5</td><td>4</td><td>No (gross=par)</td></tr>
<tr><td>A2</td><td>A</td><td>8</td><td>Yes (SI 5 ≤ 8)</td><td>5</td><td>4</td><td>No</td></tr>
<tr><td>B1</td><td>B</td><td>4</td><td>No (SI 5 > 4)</td><td>4</td><td>4</td><td>No</td></tr>
<tr><td>B2</td><td>B</td><td>16</td><td>Yes (SI 5 ≤ 16)</td><td>4</td><td>3</td><td>No (gross=par)</td></tr>
</tbody>
</table>
</div>

<div class="gg-table-wrapper" style="margin-bottom:24px;">
<table class="gg-table">
<thead><tr><th>Component</th><th>Team A</th><th>Team B</th><th>Winner</th><th>A Pts</th><th>B Pts</th></tr></thead>
<tbody>
<tr><td>Low Ball</td><td>Best net = 4</td><td>Best net = 3</td><td class="gg-win">Team B</td><td>0</td><td class="gg-win">2</td></tr>
<tr><td>Low Team</td><td>4 + 4 = 8</td><td>4 + 3 = 7</td><td class="gg-win">Team B</td><td>0</td><td class="gg-win">2</td></tr>
<tr><td>Birdie</td><td>No gross birdie</td><td>No gross birdie</td><td>—</td><td>0</td><td>0</td></tr>
<tr><td>KP</td><td colspan="2">Not a par 3</td><td>—</td><td>0</td><td>0</td></tr>
<tr class="gg-totals-row"><td><strong>Hole total</strong></td><td colspan="3"></td><td><strong>0</strong></td><td><strong>4</strong></td></tr>
</tbody>
</table>
</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 16px;">Hole 2 — Par 3, SI 15 (KP hole)</h3>

<div class="gg-example-wrap" style="margin-bottom:12px;">
<table class="gg-example-table">
<thead>
<tr><th>Player</th><th>Team</th><th>HCP</th><th>Stroke?</th><th>Gross</th><th>Net</th><th>Gross Birdie?</th></tr>
</thead>
<tbody>
<tr><td>A1</td><td>A</td><td>12</td><td>No (SI 15 > 12)</td><td>3</td><td>3</td><td>No (gross=par)</td></tr>
<tr><td>A2</td><td>A</td><td>8</td><td>No (SI 15 > 8)</td><td>2</td><td>2</td><td class="gg-win">Yes! (gross 2 &lt; par 3)</td></tr>
<tr><td>B1</td><td>B</td><td>4</td><td>No (SI 15 > 4)</td><td>4</td><td>4</td><td>No</td></tr>
<tr><td>B2</td><td>B</td><td>16</td><td>Yes (SI 15 ≤ 16)</td><td>3</td><td>2</td><td>No (gross=par)</td></tr>
</tbody>
</table>
</div>

<div class="gg-callout gg-callout--info" style="margin-bottom:12px;">
<p>KP designated: <strong>A2</strong> (closest to pin on this par 3). Team A earns KP points.</p>
</div>

<div class="gg-table-wrapper" style="margin-bottom:24px;">
<table class="gg-table">
<thead><tr><th>Component</th><th>Team A</th><th>Team B</th><th>Winner</th><th>A Pts</th><th>B Pts</th></tr></thead>
<tbody>
<tr><td>Low Ball</td><td>Best net = 2</td><td>Best net = 2</td><td>Tie</td><td>0</td><td>0</td></tr>
<tr><td>Low Team</td><td>3 + 2 = 5</td><td>4 + 2 = 6</td><td class="gg-win">Team A</td><td class="gg-win">2</td><td>0</td></tr>
<tr><td>Birdie</td><td>A2 gross birdie</td><td>No gross birdie</td><td class="gg-win">Team A</td><td class="gg-win">1</td><td>0</td></tr>
<tr><td>KP</td><td>A2 closest</td><td>—</td><td class="gg-win">Team A</td><td class="gg-win">1</td><td>0</td></tr>
<tr class="gg-totals-row"><td><strong>Hole total</strong></td><td colspan="3"></td><td><strong>4</strong></td><td><strong>0</strong></td></tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-bottom:24px;">
<p><strong>Note on Low Ball tie:</strong> A2's net 2 ties B2's net 2, so Low Ball is halved — 0 points to either team. Despite A2's birdie, the Low Ball tie costs Team A those 2 points. Still, Team A sweeps Low Team, Birdie, and KP for 4 points on the hole.</p>
</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 16px;">Hole 3 — Par 5, SI 3</h3>

<div class="gg-example-wrap" style="margin-bottom:12px;">
<table class="gg-example-table">
<thead>
<tr><th>Player</th><th>Team</th><th>HCP</th><th>Stroke?</th><th>Gross</th><th>Net</th><th>Gross Birdie?</th></tr>
</thead>
<tbody>
<tr><td>A1</td><td>A</td><td>12</td><td>Yes (SI 3 ≤ 12)</td><td>6</td><td>5</td><td>No</td></tr>
<tr><td>A2</td><td>A</td><td>8</td><td>Yes (SI 3 ≤ 8)</td><td>4</td><td>3</td><td class="gg-win">Yes! (gross 4 &lt; par 5)</td></tr>
<tr><td>B1</td><td>B</td><td>4</td><td>Yes (SI 3 ≤ 4)</td><td>5</td><td>4</td><td>No (gross=par)</td></tr>
<tr><td>B2</td><td>B</td><td>16</td><td>Yes (SI 3 ≤ 16)</td><td>7</td><td>6</td><td>No</td></tr>
</tbody>
</table>
</div>

<div class="gg-table-wrapper" style="margin-bottom:24px;">
<table class="gg-table">
<thead><tr><th>Component</th><th>Team A</th><th>Team B</th><th>Winner</th><th>A Pts</th><th>B Pts</th></tr></thead>
<tbody>
<tr><td>Low Ball</td><td>Best net = 3</td><td>Best net = 4</td><td class="gg-win">Team A</td><td class="gg-win">2</td><td>0</td></tr>
<tr><td>Low Team</td><td>5 + 3 = 8</td><td>4 + 6 = 10</td><td class="gg-win">Team A</td><td class="gg-win">2</td><td>0</td></tr>
<tr><td>Birdie</td><td>A2 gross birdie</td><td>No gross birdie</td><td class="gg-win">Team A</td><td class="gg-win">1</td><td>0</td></tr>
<tr><td>KP</td><td colspan="2">Not a par 3</td><td>—</td><td>0</td><td>0</td></tr>
<tr class="gg-totals-row"><td><strong>Hole total</strong></td><td colspan="3"></td><td><strong>5</strong></td><td><strong>0</strong></td></tr>
</tbody>
</table>
</div>

<div class="gg-callout gg-callout--info" style="margin-bottom:24px;">
<p>No Blitz on hole 3: Team A wins three components but KP is unavailable (par 5 with no KP designated). Team A's total is 5, which doesn't equal the maximum possible 6 — Blitz not triggered. B2's double bogey hurts Team B on both Low Ball and Low Team.</p>
</div>

<h3 style="font-size:1rem; color:var(--ink); margin:0 0 16px;">Hole 4 — Par 3, SI 9 (KP hole) — <span style="color:var(--red,#dc2626);">BLITZ</span></h3>

<div class="gg-example-wrap" style="margin-bottom:12px;">
<table class="gg-example-table">
<thead>
<tr><th>Player</th><th>Team</th><th>HCP</th><th>Stroke?</th><th>Gross</th><th>Net</th><th>Gross Birdie?</th></tr>
</thead>
<tbody>
<tr><td>A1</td><td>A</td><td>12</td><td>Yes (SI 9 ≤ 12)</td><td>2</td><td>1</td><td class="gg-win">Yes! (gross 2 &lt; par 3)</td></tr>
<tr><td>A2</td><td>A</td><td>8</td><td>Yes (SI 9 ≤ 8)</td><td>3</td><td>2</td><td>No (gross=par)</td></tr>
<tr><td>B1</td><td>B</td><td>4</td><td>No (SI 9 > 4)</td><td>4</td><td>4</td><td>No</td></tr>
<tr><td>B2</td><td>B</td><td>16</td><td>Yes (SI 9 ≤ 16)</td><td>4</td><td>3</td><td>No (gross=par)</td></tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-bottom:12px;">
<p>KP designated: <strong>A1</strong> (struck to 3 feet from 175 yards). Team A earns KP.</p>
</div>

<div class="gg-table-wrapper" style="margin-bottom:12px;">
<table class="gg-table">
<thead><tr><th>Component</th><th>Team A</th><th>Team B</th><th>Winner</th><th>A Pts</th><th>B Pts</th></tr></thead>
<tbody>
<tr><td>Low Ball</td><td>Best net = 1</td><td>Best net = 3</td><td class="gg-win">Team A</td><td class="gg-win">2</td><td>0</td></tr>
<tr><td>Low Team</td><td>1 + 2 = 3</td><td>4 + 3 = 7</td><td class="gg-win">Team A</td><td class="gg-win">2</td><td>0</td></tr>
<tr><td>Birdie</td><td>A1 gross birdie</td><td>No gross birdie</td><td class="gg-win">Team A</td><td class="gg-win">1</td><td>0</td></tr>
<tr><td>KP</td><td>A1 closest</td><td>—</td><td class="gg-win">Team A</td><td class="gg-win">1</td><td>0</td></tr>
<tr class="gg-totals-row"><td><strong>Pre-Blitz</strong></td><td colspan="3">Team A wins all 4 components</td><td><strong>6</strong></td><td><strong>0</strong></td></tr>
<tr class="gg-totals-row" style="background:rgba(220,38,38,0.06);"><td><strong>⚡ Blitz! (×2)</strong></td><td colspan="3">Team A swept everything — points doubled</td><td><strong>12</strong></td><td><strong>0</strong></td></tr>
</tbody>
</table>
</div>

<h3 style="font-size:1rem; color:var(--ink); margin:32px 0 16px;">Running Match Total After 4 Holes</h3>

<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Running match totals — 4 holes">
<thead>
<tr><th>Hole</th><th>Team A</th><th>Team B</th><th>A Running</th><th>B Running</th><th>Differential</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>0</td><td class="gg-win">4</td><td>0</td><td>4</td><td>B +4</td></tr>
<tr><td>2</td><td class="gg-win">4</td><td>0</td><td>4</td><td>4</td><td>Tied</td></tr>
<tr><td>3</td><td class="gg-win">5</td><td>0</td><td>9</td><td>4</td><td>A +5</td></tr>
<tr><td>4</td><td class="gg-win">12 (Blitz)</td><td>0</td><td>21</td><td>4</td><td>A +17</td></tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-top:16px;">
<p><strong>Settlement at $1/point:</strong> After 4 holes, Team A leads 21–4, a differential of +17. At $1 per point: Team A wins $17, Team B pays $17. The Blitz on hole 4 (12 points) accounts for 7 more points than a normal sweep — one hole reshapes the entire match.</p>
</div>

{{ GameGuideScreenshot("gameScotchScorecard", screenshots) }}

</div>
</section>

{# ================================================================
   6. STRATEGY
   ================================================================ #}
<section class="section" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Playing Scotch Well",
  "Scotch rewards teams that think about all four components simultaneously. Good strategy requires knowing which ones are still alive on each hole.") }}

<div class="gg-tips-grid">

{{ TipCard(
  "Coverage",
  "Know Which Components Are Still in Play",
  "Before hitting your approach, assess where the hole stands. If your partner has already secured Low Ball with an excellent net score, your role may shift to Low Team and Birdie — go for the pin aggressively instead of playing safe. If your partner is out of contention, you may need to bail out the team on Low Team even if Birdie is off the table."
) }}

{{ TipCard(
  "Birdie",
  "Natural Birdie Is Its Own Currency",
  "A gross birdie (with natural birdie rules on) earns 1 point even when the other team is winning Low Ball and Low Team. On holes where your opponent's net scores make Low Ball or Low Team unlikely, birdie is the only thing you can fight for. Don't give it up by playing too conservatively when par is already likely to lose both main components."
) }}

{{ TipCard(
  "Blitz Prevention",
  "Concede Strategically to Prevent Blitzes",
  "If your opponent is ahead on Low Ball, Low Team, and Birdie, and it's a par 3 with a KP competition, they need only your opponent to hold the KP to Blitz. Your priority becomes disrupting the KP or making a birdie to cancel the birdie component. A 4–0 hole is painful; a 12–0 Blitz is devastating."
) }}

{{ TipCard(
  "Partner Balance",
  "Split Roles Before Each Hole",
  "Before the tee shot, decide: who is chasing the aggressive line and who is playing for security? The player in the better position after drives should take the conservative approach to guarantee points. The player in trouble can attempt riskier recoveries — a miraculous outcome from a bad position is Scotch's version of a press."
) }}

{{ TipCard(
  "KP Strategy",
  "Par 3 Tee Shots Are Not Equal",
  "KP is 1 point — the same as Birdie. On a par 3, you're competing for both simultaneously. The optimal tee shot is aggressive enough to threaten KP and birdie, but not so aggressive that a miss leads to a bogey, giving away Low Team. If the other team's player already has a great tee shot, recalibrate — make par and take Low Team."
) }}

{{ TipCard(
  "Match State",
  "Press When the Match Is Slipping",
  "If you're down significantly mid-round, Scotch supports manual match presses that double the value of subsequent holes. A press when you're losing 10–2 after 6 holes creates a parallel track where the remaining holes matter more. Winning the back half of the press — even at a loss on the main match — can recover a portion of the deficit."
) }}

</div>

</div>
</section>

{# ================================================================
   7. GROSS VS. NET
   ================================================================ #}
<section class="section section--white" id="gross-vs-net">
<div class="container">

{{ SectionHeader("Gross vs. Net", "How Handicap Applies in Scotch",
  "Net scoring is the default. Handicap strokes are applied to each player's score individually before Low Ball and Low Team are evaluated.") }}

<div class="gg-prose">

Net Scotch is the standard form: each player's Course Handicap is applied by Stroke Index before their score is compared. The player with a 12-handicap who makes a gross bogey on a stroke hole nets par — and that par net score enters the Low Ball and Low Team calculations. Without net scoring, higher-handicap players have a structural disadvantage on every hole.

**How strokes affect each component:**

- **Low Ball**: Handicap strokes can change who holds the best ball. A 16-handicap player receiving a stroke on a difficult hole can net birdie from a gross par, winning Low Ball outright against partners who didn't receive a stroke.
- **Low Team**: Both net scores count. Teams with two higher-handicap players tend to score well on Low Team when strokes fall favorably.
- **Birdie (natural birdie mode)**: The birdie check uses the GROSS score regardless of handicap. A net birdie from a handicap stroke does not count. The player must actually shoot below par on that hole in raw strokes.
- **Birdie (net birdie mode)**: If natural birdie is turned off, the net score is used. A gross bogey on a stroke hole (net par) does not count as a birdie. A gross par on a stroke hole (net birdie) does count.
- **KP**: Closest to pin in terms of physical proximity to the hole. Handicap does not apply to KP — it's a distance judgment.

</div>

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">Net Scotch (100%) <span class="gg-hdcp-rec-badge">Recommended</span></div>
<div class="gg-hdcp-option__desc">Handicap strokes applied per player per hole. Net scores used for Low Ball and Low Team. Natural birdie setting determines whether birdie check uses gross or net. Default in Marker and appropriate for mixed-handicap groups.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Gross Scotch</div>
<div class="gg-hdcp-option__desc">Raw scores used for all components. Birdie is always a gross birdie. Best suited for groups with similar handicap levels where net adjustments would be minimal. Disable handicap in Marker's handicap settings.</div>
</div>

</div>

<div class="gg-callout gg-callout--info" style="margin-top:24px;">
<p>For the full explanation of handicap settings in Marker — stroke allocation by Stroke Index, percentage modes, and per-player overrides — see the <a href="{{ '/tutorials/handicap-settings/' | url }}">Handicap Settings guide</a>.</p>
</div>

</div>
</section>

{# ================================================================
   8. VARIATIONS
   ================================================================ #}
<section class="section" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Scotch Formats and Regional Names",
  "Scotch and Umbriago describe this same points format at most clubs. Other variations are common but use the name differently.") }}

<div class="gg-prose" style="margin-bottom:24px;">

"Scotch" is used to name several different golf games across different clubs and regions. The version in Marker — four scoring components, 2v2 format, all players play their own ball — is also widely known as **Umbriago**. Before agreeing to play Scotch with a new group, confirm which format they mean.

</div>

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Scotch / Umbriago (Marker's Format)</h4>
<p>2v2, four players play their own ball. Four scoring components: Low Ball, Low Team, Birdie, KP. Points awarded per component. Blitz doubles a hole when one team sweeps all components. All point values configurable. This is the format described and supported in Marker.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
</div>
<div class="gg-variation__body">
<h4>Alternate-Shot Scotch / Foursomes</h4>
<p>Some groups call alternate-shot golf "Scotch." Partners share one ball and take turns hitting — one player tees off on odd holes, the other on even holes. This is formally called Foursomes and is a different format entirely from Marker's Scotch. Marker does not implement this format under the Scotch name.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
</div>
<div class="gg-variation__body">
<h4>Custom Point Values</h4>
<p>Marker allows all four point values to be changed independently. Common customizations: Low Ball = 3, Low Team = 1, Birdie = 2, KP = 1. Some groups increase Birdie to 2 to reward aggressive play more. Some reduce KP to 0 to eliminate the closest-to-pin element entirely. Set any values in Marker's game setup.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Press Mechanics</h4>
<p>Scotch in Marker supports manual match presses and hole presses. A match press starts a new sub-match for the remaining holes, with points worth double (or more if stacked). A hole press doubles the value of a single hole. Presses are recorded by the commissioner and apply as multipliers in Marker's scoring engine.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<div class="gg-variation__body">
<h4>Net Birdie Mode</h4>
<p>By default, Marker requires a natural (gross) birdie to win the Birdie component. Disabling "Require natural birdie" allows a net birdie to count — a player who makes a gross par on a stroke hole nets birdie and earns the Birdie component for their team. This variation is common in groups with higher handicaps where gross birdies are rare.</p>
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

{{ SectionHeader("Marker App", "Why Track Scotch in Marker?",
  "Four simultaneous point categories, Blitz detection, handicap strokes per player, and a per-point settlement — Scotch is difficult to track manually. Marker handles all of it automatically.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
</div>
<h4>Four Components Scored Simultaneously</h4>
<p>The moment all four players' scores are entered for a hole, Marker evaluates Low Ball, Low Team, and Birdie simultaneously. No manual comparison required — each component is identified and points are allocated automatically.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<h4>Automatic Blitz Detection</h4>
<p>When a team sweeps all components on a hole, Marker detects the Blitz condition automatically and applies the doubling. No mental tracking of whether "we got all of them" — it's in the scorecard immediately.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Per-Player Handicap Application</h4>
<p>Each player's strokes are applied by Stroke Index independently. Net scores for all four players are computed before Low Ball and Low Team are evaluated. No manual subtraction required on any hole.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<h4>Running Point Totals</h4>
<p>The leaderboard shows each team's total points, point differential, and dollar amount after every hole. The header shows the score in "Left–Right" format so the match state is always visible. No mental arithmetic required mid-round.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Per-Point Settlement</h4>
<p>Set a dollar amount per point at game setup. Marker calculates the final settlement as point differential × amount per point. The leaderboard shows the dollar result in real time throughout the round. No post-round math at the 19th hole.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
</div>
<h4>Press Multipliers Tracked</h4>
<p>Scotch supports match presses and hole presses. Marker tracks active press multipliers and applies them to the correct holes automatically. Stacked presses compound correctly without the group needing to remember press timing.</p>
</div>

</div>

<div style="margin-top:40px; text-align:center;">
<a href="https://app.marker.golf" class="btn btn-primary">Play Scotch in Marker</a>
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
<summary>What is Scotch in golf?</summary>
<div class="gg-faq-body">
<p>Scotch (also called Umbriago) is a 2v2 team betting game where four players — split into two teams of two — compete across four independent scoring components on every hole: Low Ball, Low Team, Birdie, and Closest to Pin (KP). Each component is decided separately and awards its own points. The team with more total points at the end of the round wins. All four players play their own ball on every hole.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How many players are needed for Scotch?</summary>
<div class="gg-faq-body">
<p>Exactly 4 players — two per team. Scotch requires a 2v2 format. The teams ("sides") are assigned before the round and remain fixed throughout. You cannot play Scotch with 3 or 5 players in Marker.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How many points are available on each hole?</summary>
<div class="gg-faq-body">
<p>With default values (Low Ball=2, Low Team=2, Birdie=1, KP=1), the maximum is 6 points — if one team wins every component with no ties. A Blitz doubles this to 12. In practice, many holes produce fewer than 6 points because one or more components are tied. Ties on any component result in 0 points to either team for that component.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What happens when a scoring component is tied?</summary>
<div class="gg-faq-body">
<p>No points are awarded to either team for that component. If both teams have the same low ball net score, Low Ball is halved — 0 to each. If both teams have the same combined net total, Low Team is halved. If both teams make a natural birdie, Birdie is halved. A tied component can never trigger a Blitz, as the team's total will be less than the maximum possible.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is a Blitz?</summary>
<div class="gg-faq-body">
<p>A Blitz occurs when one team wins every available scoring component on a hole without any ties. The total hole value is doubled. Under default values, a Blitz earns 12 points (6 × 2) instead of 6. For a Blitz to occur, a KP winner must also be designated — without a KP, the maximum possible is 5 points (not 6), and the Blitz threshold cannot be met. Blitzes are on by default but can be disabled in settings.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is a natural birdie and why does it matter?</summary>
<div class="gg-faq-body">
<p>A natural birdie is a gross birdie — a raw score below par with no handicap adjustment. Marker requires natural birdies by default: a player must shoot an actual score below par (e.g., 3 on a par 4) to earn the Birdie component for their team. A net birdie from a handicap stroke does not count under this setting. You can disable "Require natural birdie" in Marker's settings to allow net birdies instead.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is KP (Closest to Pin)?</summary>
<div class="gg-faq-body">
<p>KP stands for Closest to Pin (or "King Pin" in some groups). The player who lands closest to the hole on a given shot earns 1 point for their team. In Marker, the KP winner must be designated manually by a commissioner — the app does not calculate physical proximity automatically. KP is traditionally played on par 3 holes, though Marker allows it to be set on any hole.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can Scotch use handicaps?</summary>
<div class="gg-faq-body">
<p>Yes. Net Scotch is the default. Marker applies each player's handicap strokes by Stroke Index. Net scores are used for Low Ball and Low Team comparisons. The Birdie component uses gross scores by default (natural birdie required) regardless of handicap. Gross Scotch (no handicap) is also available by disabling handicap in settings.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How is the winner determined and how is settlement calculated?</summary>
<div class="gg-faq-body">
<p>The team with more total points after 18 holes wins. Settlement is calculated as the point differential multiplied by the amount per point. If Team A finishes with 21 points and Team B with 8 points (differential = 13), at $1 per point, Team A wins $13 and Team B pays $13. Marker displays the running dollar amount on the leaderboard throughout the round.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Is Scotch the same as Foursomes (alternate shot)?</summary>
<div class="gg-faq-body">
<p>No — not in Marker. Scotch in Marker is the 2v2 points format where all four players play their own ball every hole. Some groups use "Scotch" to mean alternate-shot Foursomes, where partners share one ball and take turns hitting. These are entirely different formats. Marker's Scotch is sometimes also called Umbriago. If you're playing with a new group, confirm which format they mean.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Is Scotch a premium feature?</summary>
<div class="gg-faq-body">
<p>Yes. Scotch is a premium game in Marker. See <a href="https://app.marker.golf">Marker's pricing page</a> for details on premium game access.</p>
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
  "High-Low",
  "Best and worst scores from each team compared on every hole — two separate match-play bets per hole. Similar 2v2 structure to Scotch but without Birdie or KP components.",
  '/games/high-low/' | url
) }}

{{ RelatedCard(
  "Nassau",
  "Three match-play bets in one round — front nine, back nine, and overall 18. The most common money game alongside Scotch.",
  '/games/nassau/' | url
) }}

{{ RelatedCard(
  "Match Play",
  "Head-to-head hole-by-hole competition. Win the hole, halve it, or lose it. The simplest 1v1 format — or 2v2 when teams compete.",
  '/games/match-play/' | url
) }}

{{ RelatedCard(
  "Skins",
  "Win a hole outright to claim the skin. Works well as a side game alongside Scotch — competing for skins while tracking Scotch points.",
  '/games/skins/' | url
) }}

</div>

<div style="margin-top:28px;">
<a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
