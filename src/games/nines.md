---
layout: layouts/game-guide.njk
title: Nines Golf Game (5-3-1) — Rules, Strategy & How to Play | Marker
description: "Nines (5-3-1) explained: how nine points are distributed each hole among three players, tie-splitting, scoops, birdies-double, handicap, settlement, and how Marker tracks every point automatically."
status: available
category: classic
order: 4
players: "3 exactly"
format: "Points-based"
cardDescription: "Three players share 9 points per hole based on finish order. Best score takes 5, second takes 3, third takes 1. Ties split the points. Marker totals each player's running score instantly."
game:
  name: Nines
  difficulty: beginner
  difficultyLabel: Beginner
  subtitle: "Three players. Nine points per hole. Low score takes 5, middle takes 3, high takes 1 — and ties split the points automatically. The simplest money game for a group of three."
  heroSubtitleWidth: "580px"
  heroStats:
    - label: Players
      value: "3 exactly"
    - label: Points
      value: "9 per hole"
    - label: Format
      value: Points-based
    - label: Best For
      value: Groups of 3
    - label: Handicap
      value: "On by default"
  heroCta:
    primary:
      text: Play Nines in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Nines?
    body: "Add Nines in Marker before you tee off. Point splits, scoops, birdies-double, and settlement are all handled automatically hole by hole."
    primary:
      text: Play Nines in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
sections:
  - id: overview
    label: Overview
  - id: scoring
    label: Point Table
  - id: scoops
    label: Scoops
  - id: birdies-double
    label: Birdies Double
  - id: configuration
    label: Setup in Marker
  - id: example
    label: Worked Example
  - id: settlement
    label: Settlement
  - id: gross-vs-net
    label: Gross vs. Net
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

{{ SectionHeader("What Is Nines?", "The classic three-player points game") }}

<div class="gg-prose">

Nines — also called **5-3-1** — is a points game designed specifically for three players. Every hole distributes exactly 9 points across the group based on finish order. The player with the lowest net score on a hole earns 5 points. The middle score earns 3 points. The highest score earns 1 point.

The elegant part of Nines is how it handles ties. When two or more players tie on a hole, their points are pooled and split evenly. A tie for low (two players at the same net score) becomes 4–4–1. A tie for high becomes 5–2–2. All three tied becomes 3–3–3. Every hole always distributes exactly 9 points regardless of the outcome.

After 18 holes, each player has accumulated a running total. Settlement is based on **head-to-head point differentials**: each player's total is compared against each opponent's total, and the dollar amount per point is applied to the difference.

Nines requires exactly three players. It does not work for two or four — the format is built around the 5-3-1 structure, which only resolves cleanly with three competitors.

</div>

<div class="gg-quick-rules">
<h3 class="gg-quick-rules__title">Quick Rules</h3>
<ul class="gg-quick-rules__list">
<li>Exactly 3 players per Nines group.</li>
<li>Every hole distributes exactly 9 points based on net score order.</li>
<li>Standard allocation: 5 (low) — 3 (middle) — 1 (high).</li>
<li>Ties split the tied positions' points evenly.</li>
<li>Points are not distributed until all three players have scored the hole.</li>
<li>Settlement is head-to-head: each player's running total is compared against each opponent's.</li>
<li>Handicap is on by default. Scores are net before point allocation.</li>
</ul>
</div>

{{ MarkerImplNote("Marker applies handicap strokes per player per hole, distributes the 9 points as soon as all three scores are entered, handles all tie splits automatically, accumulates running totals, applies optional scoop and birdies-double rules, and calculates the final head-to-head settlement with dollar amounts. No manual math is required at any point.") }}

</div>
</section>

<section class="section" id="scoring">
<div class="container">

{{ SectionHeader("The Point Table", "All possible outcomes — exactly 9 points every hole") }}

<div class="gg-prose">

The 9 points on every hole are distributed based on how many distinct net scores the three players post. There are four possible outcomes:

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th>Outcome</th>
<th>Low Score</th>
<th>Middle Score</th>
<th>High Score</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>All different</td>
<td><strong>5</strong></td>
<td><strong>3</strong></td>
<td><strong>1</strong></td>
<td>9</td>
</tr>
<tr>
<td>Two tied for low</td>
<td><strong>4</strong></td>
<td><strong>4</strong></td>
<td><strong>1</strong></td>
<td>9</td>
</tr>
<tr>
<td>Two tied for high</td>
<td><strong>5</strong></td>
<td><strong>2</strong></td>
<td><strong>2</strong></td>
<td>9</td>
</tr>
<tr>
<td>All three tied</td>
<td><strong>3</strong></td>
<td><strong>3</strong></td>
<td><strong>3</strong></td>
<td>9</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

**How ties split.** When two players tie, the points for those two positions are combined and divided equally between them. If the two lowest scores are equal, the points for 1st (5) and 2nd (3) are combined into 8, then split to 4 each. If the two highest scores are equal, the points for 2nd (3) and 3rd (1) are combined into 4, then split to 2 each. If all three scores are equal, the points for all three positions (5+3+1=9) are split into 3 each.

**Scores are net.** All comparisons use net scores — gross score minus handicap strokes received on that hole. A player with a higher handicap can receive more strokes on harder holes, changing the effective order and therefore who earns which points.

**All 3 scores required.** Marker does not distribute points for a hole until all three players have submitted their score for that hole. A partial hole shows no points.

</div>

</div>
</section>

<section class="section section--white" id="scoops">
<div class="container">

{{ SectionHeader("Scoops", "Win by 2 or more — take all 9") }}

<div class="gg-prose">

The **Scoop** (also called a Blitz) is an optional rule that adds a high-variance element to Nines. When enabled, a player who beats the next-best net score by **2 or more strokes** takes all 9 points while the other two players receive 0.

Scoops are off by default. A commissioner enables them in the game settings before the round.

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th>Situation</th>
<th>Scoop Condition</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td>All different</td>
<td>1st beats 2nd by 2+ net strokes</td>
<td>9 – 0 – 0</td>
</tr>
<tr>
<td>One low + two tied for high</td>
<td>Low beats tied pair by 2+ net strokes</td>
<td>9 – 0 – 0</td>
</tr>
<tr>
<td>Two tied for low</td>
<td>Not possible (no single winner)</td>
<td>4 – 4 – 1 (normal)</td>
</tr>
<tr>
<td>All three tied</td>
<td>Not possible</td>
<td>3 – 3 – 3 (normal)</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

The Scoop threshold is exactly 2 net strokes. Winning by 1 stroke is standard (5–3–1). Winning by 2 or more triggers the Scoop (9–0–0). A Scoop earns 9 points for the winner — the same total as a normal hole — but the other two players get nothing instead of 3 and 1.

When **Birdies Double** is also active and the winner makes a net birdie, a Scoop becomes 18–0–0.

</div>

</div>
</section>

<section class="section" id="birdies-double">
<div class="container">

{{ SectionHeader("Birdies Double", "Net birdie on top — all points times two") }}

<div class="gg-prose">

The **Birdies Double** rule doubles all points on any hole where the lowest net score is a birdie or better. The doubling applies to whoever earns points on that hole — including tied players.

Birdies Double is off by default. A commissioner enables it in the game settings.

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th>Outcome</th>
<th>Normal</th>
<th>With Birdies Double (net birdie on top)</th>
</tr>
</thead>
<tbody>
<tr>
<td>All different</td>
<td>5 – 3 – 1</td>
<td>10 – 6 – 2</td>
</tr>
<tr>
<td>Two tied for low</td>
<td>4 – 4 – 1</td>
<td>8 – 8 – 2</td>
</tr>
<tr>
<td>Two tied for high</td>
<td>5 – 2 – 2</td>
<td>10 – 4 – 4</td>
</tr>
<tr>
<td>All three tied</td>
<td>3 – 3 – 3</td>
<td>6 – 6 – 6</td>
</tr>
<tr>
<td>Scoop (if enabled)</td>
<td>9 – 0 – 0</td>
<td>18 – 0 – 0</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

The trigger is the **top scorer's net score relative to par** — if the player with the lowest net score on the hole made a net birdie (net score one below par) or better, the doubling applies. The other two players' scores versus par do not affect whether the hole doubles.

A birdie hole that also triggers a Scoop produces 18–0–0: the maximum possible points on a single hole in Nines.

</div>

</div>
</section>

<section class="section section--white" id="configuration">
<div class="container">

{{ SectionHeader("Setup in Marker", "Configuration options for Nines") }}

<div class="gg-cards">

{{ ConfigCard(
  "Players",
  "Exactly 3",
  "Nines requires exactly 3 players. The game will not run with 2 or 4. If your group has more than 3, run separate Nines groups or choose a different format.",
  ["Minimum: 3", "Maximum: 3", "One group per Nines game"]
) }}

{{ ConfigCard(
  "Handicap",
  "Net Scoring",
  "Handicap is on by default. Each player's course handicap strokes are applied hole by hole before points are distributed. Disable for gross scoring. Adjust the percentage to reduce or increase the handicap effect.",
  ["On by default", "Percentage: 0–100% (default 100%)", "Strokes allocated by stroke index", "Disable for gross play"]
) }}

{{ ConfigCard(
  "Scoops",
  "Allow Blitzes / Scoops",
  "Off by default. When enabled, a player who beats the next-best net score by 2 or more strokes takes all 9 points. The other two players receive 0. Adds high-variance moments to the game.",
  ["Off by default", "Threshold: 2+ net strokes", "Result: 9 – 0 – 0", "Also applies with Birdies Double: 18 – 0 – 0"]
) }}

{{ ConfigCard(
  "Birdies Double",
  "Points Double on Birdie Holes",
  "Off by default. When enabled, all points on a hole double if the top scorer's net score is a birdie or better. Applies to all point distributions on that hole, including ties and scoops.",
  ["Off by default", "Trigger: top scorer net birdie or better", "All points × 2", "Works with scoops: 18 – 0 – 0 max"]
) }}

{{ ConfigCard(
  "Amount Per Point",
  "Settlement Rate",
  "Set a dollar amount per point. Settlement is calculated as each player's head-to-head point differential against each opponent, multiplied by the amount per point. Not a pool — each player settles directly against the others.",
  ["Optional", "Per-point rate (e.g. $1/point)", "Head-to-head settlement", "Not pool-based"]
) }}

</div>

</div>
</section>

<section class="section" id="example">
<div class="container">

{{ SectionHeader("Worked Example", "Four holes showing every point scenario") }}

<div class="gg-prose">

**Setup:** Alice (hdcp 12), Bob (hdcp 6), Carol (hdcp 2). Handicap on, Scoops on, Birdies Double off.

Strokes received per hole depend on stroke index. For this example:
- Alice receives 1 stroke on holes with SI ≤ 12 (all four holes below)
- Bob receives 1 stroke on holes with SI ≤ 6 (holes 1 and 2 below)
- Carol receives no strokes on any of these four holes

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th>Hole</th>
<th>Par / SI</th>
<th>Player</th>
<th>Gross</th>
<th>Stroke</th>
<th>Net</th>
<th>Points</th>
<th>Outcome</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="3">1</td>
<td rowspan="3">Par 4 / SI 3</td>
<td>Bob</td>
<td>4</td>
<td>1</td>
<td><strong>3</strong></td>
<td><strong>5</strong></td>
<td rowspan="3">All different<br>5 – 3 – 1</td>
</tr>
<tr>
<td>Alice</td>
<td>5</td>
<td>1</td>
<td>4</td>
<td>3</td>
</tr>
<tr>
<td>Carol</td>
<td>5</td>
<td>0</td>
<td>5</td>
<td>1</td>
</tr>
<tr class="gg-table__divider">
<td rowspan="3">2</td>
<td rowspan="3">Par 4 / SI 5</td>
<td>Alice</td>
<td>5</td>
<td>1</td>
<td><strong>4</strong></td>
<td><strong>4</strong></td>
<td rowspan="3">Two tied for low<br>4 – 4 – 1</td>
</tr>
<tr>
<td>Bob</td>
<td>5</td>
<td>1</td>
<td><strong>4</strong></td>
<td><strong>4</strong></td>
</tr>
<tr>
<td>Carol</td>
<td>7</td>
<td>0</td>
<td>7</td>
<td>1</td>
</tr>
<tr class="gg-table__divider">
<td rowspan="3">3</td>
<td rowspan="3">Par 3 / SI 9</td>
<td>Alice</td>
<td>3</td>
<td>1</td>
<td><strong>2</strong></td>
<td><strong>5</strong></td>
<td rowspan="3">Two tied for high<br>5 – 2 – 2</td>
</tr>
<tr>
<td>Bob</td>
<td>3</td>
<td>0</td>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>Carol</td>
<td>3</td>
<td>0</td>
<td>3</td>
<td>2</td>
</tr>
<tr class="gg-table__divider">
<td rowspan="3">4</td>
<td rowspan="3">Par 5 / SI 7</td>
<td>Alice</td>
<td>4</td>
<td>1</td>
<td><strong>3</strong></td>
<td><strong>9</strong></td>
<td rowspan="3">Scoop!<br>Alice leads by 2 net strokes<br>9 – 0 – 0</td>
</tr>
<tr>
<td>Carol</td>
<td>5</td>
<td>0</td>
<td>5</td>
<td>0</td>
</tr>
<tr>
<td>Bob</td>
<td>6</td>
<td>0</td>
<td>6</td>
<td>0</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

**Hole 1 — All different (5-3-1):** Bob gross 4 − 1 stroke = net 3 (low, 5 pts). Alice gross 5 − 1 stroke = net 4 (middle, 3 pts). Carol gross 5 − 0 = net 5 (high, 1 pt). Three distinct net scores.

**Hole 2 — Two tied for low (4-4-1):** Alice and Bob each post gross 5 − 1 stroke = net 4. Carol gross 7 − 0 = net 7. Alice and Bob tie for low — the 5 + 3 = 8 points for 1st and 2nd are split evenly: 4 each. Carol earns 1.

**Hole 3 — Two tied for high (5-2-2):** Alice posts gross 3 − 1 stroke = net 2 (a net birdie). Bob and Carol each post gross 3 − 0 = net 3. Bob and Carol tie for high — the 3 + 1 = 4 points for 2nd and 3rd are split evenly: 2 each. Alice earns 5. The margin between Alice (net 2) and the tied pair (net 3) is only 1 stroke — no Scoop despite scoops being enabled.

**Hole 4 — Scoop (9-0-0):** Alice posts gross 4 − 1 stroke = net 3. Carol posts gross 5 − 0 = net 5. Bob posts gross 6 − 0 = net 6. Alice leads next-best Carol by 2 net strokes (5 − 3 = 2). Scoop threshold is exactly 2 or more, so Alice takes all 9 points. Bob and Carol receive 0.

</div>

<div class="gg-table-wrap">
<table class="gg-table">
<thead>
<tr>
<th>After hole</th>
<th>Alice</th>
<th>Bob</th>
<th>Carol</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>3</td>
<td>5</td>
<td>1</td>
<td>9</td>
</tr>
<tr>
<td>2</td>
<td>7</td>
<td>9</td>
<td>2</td>
<td>18</td>
</tr>
<tr>
<td>3</td>
<td>12</td>
<td>11</td>
<td>4</td>
<td>27</td>
</tr>
<tr>
<td>4 (final)</td>
<td><strong>21</strong></td>
<td><strong>11</strong></td>
<td><strong>4</strong></td>
<td><strong>36</strong></td>
</tr>
</tbody>
</table>
</div>

<div class="gg-prose">

Alice's Scoop on Hole 4 reshapes the leaderboard. Before Hole 4, Bob led Alice by 1 point. The Scoop gives Alice 9 uncontested points and leaves Bob and Carol with nothing, swinging the lead by 10 points in one hole.

At $1 per point (see [Settlement](#settlement) below): Alice wins $27, Bob owes $3, Carol owes $24.

</div>

</div>
</section>

<section class="section section--white" id="settlement">
<div class="container">

{{ SectionHeader("Settlement", "Head-to-head differential, not a pool") }}

<div class="gg-prose">

Settlement in Nines is calculated on a **head-to-head basis**. Each player's final point total is compared directly against each other player's total. The difference is multiplied by the amount per point.

With three players, each player has two head-to-head comparisons:

</div>

<div class="gg-callout gg-callout--info">
<p><strong>Net points formula (3 players):</strong> Player A's net = (A − B) + (A − C). This equals twice A's total minus the sum of the other two totals.</p>
</div>

<div class="gg-prose">

**Example:** After 18 holes, Alice has 65 points, Bob has 56 points, Carol has 41 points. Total = 162 (9 × 18).

Alice net = (65 − 56) + (65 − 41) = 9 + 24 = **+33**
Bob net = (56 − 65) + (56 − 41) = −9 + 15 = **+6**
Carol net = (41 − 65) + (41 − 56) = −24 + (−15) = **−39**

Cross-check: 33 + 6 − 39 = 0 ✓ (net points always sum to zero)

At $1 per point:
- Alice wins **$33**
- Bob wins **$6**
- Carol owes **$39** (pays Alice $33, pays Bob $6)

This is direct settlement between players — **not a pool**. There is no pot that the winner takes. Each player pays or collects based on their differential with each opponent.

Marker calculates these amounts automatically and shows each player what they owe or are owed at the end of the round.

</div>

</div>
</section>

<section class="section" id="gross-vs-net">
<div class="container">

{{ SectionHeader("Gross vs. Net", "How handicap changes who earns what") }}

<div class="gg-prose">

Nines defaults to **net scoring** with handicaps on. Each player's course handicap strokes are allocated across the 18 holes by stroke index before point comparisons are made. On a handicap stroke hole, a player with a stroke subtracts 1 from their gross score before the comparison.

This means a high-handicapper can win the low-score position on a hole where their gross score is worse than an opponent's — their handicap stroke makes the difference.

**Gross Nines** turns handicap off. All comparisons use raw scores. Gross play suits groups of similar ability or competitive contexts where handicaps would distort the result.

**Handicap percentage** scales how many strokes are applied. At 100% (the default), a player's full course handicap is used. At 80%, the effective handicap is reduced by 20%. This is common in money games to partially offset the advantage of high handicappers.

For full details on stroke allocation by stroke index, see the [Handicap Settings guide](/tutorials/handicap-settings/).

</div>

<div class="gg-hdcp-grid">
<div class="gg-hdcp-card">
<div class="gg-hdcp-card__head">Net Play (default)</div>
<ul class="gg-hdcp-card__list">
<li>Handicap strokes applied per hole by stroke index</li>
<li>High-handicappers can compete on an even footing</li>
<li>Best for mixed-ability groups</li>
<li>Percentage adjustable (default 100%)</li>
</ul>
</div>
<div class="gg-hdcp-card">
<div class="gg-hdcp-card__head">Gross Play</div>
<ul class="gg-hdcp-card__list">
<li>Scores used exactly as played</li>
<li>Lower handicappers earn more points consistently</li>
<li>Best for similar-ability groups</li>
<li>Disable handicap in game settings</li>
</ul>
</div>
</div>

</div>
</section>

<section class="section section--white" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Getting the most from Nines") }}

<div class="gg-cards gg-cards--tips">

{{ TipCard(
  "Avoid the 1",
  "Protect yourself from last place",
  "Earning 1 point is nearly as harmful as earning 0 — you fall behind both opponents by 4 and 2 points respectively. Scrambling for a bogey when your opponents are at par means you get 1 instead of 0, but the damage is still severe. Focus on not being the worst score on a hole, not just on winning it."
) }}

{{ TipCard(
  "Know When to Attack",
  "The low score is worth double the middle",
  "Winning a hole outright (5 pts) pays 2 more than finishing second (3 pts). On a par 5 where you're likely to make birdie, attacking aggressively is justified — the upside of getting 5 instead of 3 outweighs the risk of dropping to 1. On a hole where everyone is likely to make bogey, conservative play to avoid last is more valuable."
) }}

{{ TipCard(
  "Ties Are Safer Than They Look",
  "4-4-1 beats 5-3-1 for the middle player",
  "If you're dueling for second place with an opponent, tying for second (giving you both 2 pts) is worse than winning second outright (3 pts). But if you think you might beat the leader, tying for low at 4-4-1 is better than a 5-3-1 where you're in the middle. Assess your relative position on each hole and decide whether to play for the tie or go for the win."
) }}

{{ TipCard(
  "Scoops Change Risk Calculus",
  "When scoops are on, go birdie-hunting",
  "If Scoops are enabled, a net birdie that beats the field by 2+ strokes produces 9 points instead of 5. The expected value of attacking par 5s and short par 4s increases significantly. Your opponents' bad holes also become your opportunity — if one opponent is blowing up, the remaining two may be within 1 stroke of each other, making a scoop possible."
) }}

{{ TipCard(
  "Birdies Double Stakes",
  "Track who is making birdies",
  "When Birdies Double is active, a hole where you make a net birdie and win is worth 10 points instead of 5. A hole where an opponent makes a net birdie and beats you costs 2 points instead of 1. This dramatically raises the stakes on birdie holes. Know when you have a stroke — a stroke on a par 3 turns a gross 2 into a net birdie, potentially triggering the double."
) }}

{{ TipCard(
  "Manage the Deficit",
  "Track the head-to-head standings",
  "Because settlement is head-to-head, your position against each opponent matters independently. You might be +15 against Carol but −8 against Bob. In that case, on a hole where Bob is likely to score well, focus on limiting the damage rather than going for broke. Marker shows live standings so you always know your position."
) }}

</div>

</div>
</section>

<section class="section" id="variations">
<div class="container">

{{ SectionHeader("Common Variations", "Regional and house-rule differences") }}

<div class="gg-prose">

**Nines with Scoops.** The most common house rule adds the Scoop (win by 2+ net strokes → 9–0–0). This is supported directly in Marker via the "Allow blitzes / scoops" setting.

**Nines with Birdies Double.** Doubling all points on birdie holes significantly raises the stakes on aggressive play. Supported in Marker via the "Birdies double" setting.

**Scoops + Birdies Double.** Both options can be combined. A net birdie Scoop yields 18–0–0 — the most extreme single-hole swing possible in Nines (18 points to winner, 0 to both opponents).

**Gross Nines.** Played without handicap, comparing raw scores. Common among similar-ability groups or when the group prefers to skip the handicap overhead.

**Nines as a side game.** Many groups run Nines as a side game alongside Nassau or Match Play. Each format operates independently — Nines distributes points while the other game tracks its own result. Marker supports multiple simultaneous games on the same scorecard.

**Variations Marker does not implement.** Some groups play Nines with 4 players using different point splits (e.g., 5-3-2-1 or 4-3-2-0). Marker's Nines is fixed at 3 players with the 5-3-1 point structure. For groups of 4, formats like Wolf, Skins, or Match Play are better fits.

</div>

</div>
</section>

<section class="section section--white" id="why-marker">
<div class="container">

{{ SectionHeader("Why Use Marker?", "What Marker handles automatically in Nines") }}

<div class="gg-cards">

{{ TipCard(
  "Instant Points",
  "No tie math mid-round",
  "The moment all three scores are entered on a hole, Marker distributes the points. Split fractions, scoop checks, and birdie-double multipliers are all resolved automatically. Nobody has to mentally compute 4-4-1 at the 16th hole."
) }}

{{ TipCard(
  "Live Standings",
  "Know your position hole by hole",
  "Marker shows each player's running point total and head-to-head differential throughout the round. You always know who is up, who is down, and by how much — without pausing to do math."
) }}

{{ TipCard(
  "Scoops Tracked Automatically",
  "Never miss a 9-pointer",
  "When Scoops are enabled, Marker checks the net margin on every hole and assigns 9–0–0 automatically when the threshold is met. No arguments about whether the margin was 1 or 2 strokes."
) }}

{{ TipCard(
  "Birdies Double Applied Immediately",
  "Points update the moment a birdie is confirmed",
  "When Birdies Double is active, Marker applies the multiplier the moment the top scorer's net is confirmed as a birdie. The doubled points show up on the scorecard immediately."
) }}

{{ TipCard(
  "Settlement Calculated",
  "Head-to-head math done automatically",
  "Marker computes each player's net point differential against each opponent and converts it to a dollar amount. The settlement summary shows exactly who owes what to whom at the end of the round."
) }}

{{ TipCard(
  "Handicap Applied Per Hole",
  "No pre-game stroke math needed",
  "Marker allocates each player's handicap strokes across the 18 holes by stroke index and applies them automatically before point comparisons. Players just enter their gross scores."
) }}

</div>

</div>
</section>

<section class="section" id="faq">
<div class="container">

{{ SectionHeader("FAQ", "Common questions about Nines in Marker") }}

<div class="gg-faq">

{{ FaqItem(
  "What is Nines?",
  "Nines (also called 5-3-1) is a three-player points game where exactly 9 points are distributed each hole based on net score order. Low score earns 5, middle earns 3, high earns 1. Ties split the relevant points evenly. The player with the most points after 18 holes wins."
) }}

{{ FaqItem(
  "Why does Nines require exactly 3 players?",
  "The 5-3-1 point structure is designed for three competitors. The math only resolves cleanly (always totaling 9, with sensible tie splits) for exactly three players. If your group has 2 or 4 players, other formats like Match Play, Skins, or Wolf are better fits."
) }}

{{ FaqItem(
  "What happens when two players tie for low?",
  "The points for 1st place (5) and 2nd place (3) are pooled and split equally: 4 each. The third player still earns 1 point. Total is still 9."
) }}

{{ FaqItem(
  "What happens when two players tie for high?",
  "The points for 2nd place (3) and 3rd place (1) are pooled and split equally: 2 each. The winning player still earns 5 points. Total is still 9."
) }}

{{ FaqItem(
  "What happens when all three players tie?",
  "All 9 points are split equally: 3 each. Total is still 9."
) }}

{{ FaqItem(
  "What is a Scoop?",
  "A Scoop (also called a Blitz) occurs when one player beats the next-best net score by 2 or more strokes. When Scoops are enabled, that player takes all 9 points and the other two receive 0. Scoops are off by default and must be enabled in the game settings."
) }}

{{ FaqItem(
  "When can a Scoop NOT happen?",
  "A Scoop requires a single outright winner. If two players tie for low, there is no single winner to award 9 points to, so the Scoop cannot trigger — the result is 4-4-1 regardless of the margin over the third player. Scoops also cannot occur when all three tie."
) }}

{{ FaqItem(
  "What does Birdies Double mean?",
  "When Birdies Double is enabled, all points on a hole are multiplied by 2 if the top scorer's net score is a birdie or better. A normal 5-3-1 hole becomes 10-6-2. A tie-for-low hole becomes 8-8-2. A Scoop hole becomes 18-0-0."
) }}

{{ FaqItem(
  "Are points distributed before all three players finish the hole?",
  "No. Marker waits until all three players have submitted a score for the hole before distributing any points. A hole with only two scores entered shows no points for any player yet."
) }}

{{ FaqItem(
  "How does settlement work?",
  "Settlement is head-to-head. Each player's final point total is compared against each opponent's. The difference is their net points against that opponent. With three players, each player has two comparisons. Net points across all comparisons, multiplied by the amount per point, gives the dollar settlement. Marker calculates and displays this automatically."
) }}

{{ FaqItem(
  "Is Nines a pool game?",
  "No. There is no shared pot. Each player pays or collects directly based on their point differential against each opponent. The amount per point (e.g. $1) is the rate, not a fixed buy-in."
) }}

{{ FaqItem(
  "Can I use handicaps in Nines?",
  "Yes — handicap is on by default. Each player's handicap strokes are applied hole by hole using stroke index. Disable handicap in the game settings for gross play. The handicap percentage can be adjusted (default 100%)."
) }}

{{ FaqItem(
  "Can Nines run as a side game alongside Nassau or Skins?",
  "Yes. Marker supports multiple simultaneous games. Nines tracks its own points independently from any other game running on the same scorecard."
) }}

</div>

</div>
</section>

<section class="section section--white" id="related">
<div class="container">

{{ SectionHeader("Related Games", "Other formats to consider") }}

<div class="gg-related">

{{ RelatedCard(
  "Wolf",
  "Another three- or four-player format with rotating partnerships and per-hole decisions. More complex, higher variance.",
  "/games/wolf/"
) }}

{{ RelatedCard(
  "Skins",
  "Hole-by-hole format where the outright winner claims the skin. Works for any number of players. Ties carry the pot forward.",
  "/games/skins/"
) }}

{{ RelatedCard(
  "Match Play",
  "Head-to-head hole-by-hole competition. Win the hole, halve it, or lose it. Works for two players or two teams.",
  "/games/match-play/"
) }}

{{ RelatedCard(
  "Nassau",
  "Three bets in one — front 9, back 9, and overall 18. The classic format for side-game wagering.",
  "/games/nassau/"
) }}

{{ RelatedCard(
  "Handicap Settings",
  "How Marker allocates handicap strokes across holes by stroke index, with percentage and override options.",
  "/tutorials/handicap-settings/"
) }}

</div>

</div>
</section>
