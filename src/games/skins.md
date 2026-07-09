---
layout: layouts/game-guide.njk
title: Skins — Golf Game Guide
description: "Skins golf rules explained: how to win a skin, carryover rules, gross vs net scoring, and how Marker tracks skins and settlements automatically. The most dramatic format in golf."
status: available
category: classic
order: 6
players: "2 or more"
format: "Hole by Hole"
cardDescription: "Win the hole outright to claim the skin. Ties carry the pot over to the next hole. Marker shows the current skin value and reveals winners the moment the hole is cleared."
game:
  name: Skins
  difficulty: beginner
  difficultyLabel: Beginner
  subtitle: "Win a hole outright to claim the skin. Ties leave the hole unresolved — and in carryover mode, the pot keeps building until someone wins clean."
  heroSubtitleWidth: "540px"
  heroStats:
    - label: Players
      value: "2 or more"
    - label: Format
      value: Hole by Hole
    - label: Best For
      value: Groups of any size
    - label: Handicap
      value: Supported
    - label: Available In
      value: Marker
  heroCta:
    primary:
      text: Play Skins in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Skins?
    body: "Set up your skins game in under 60 seconds. Marker identifies outright winners, tracks carryovers, and calculates the settlement the moment the round ends."
    primary:
      text: Start Your Skins Game
      href: "https://app.marker.golf"
    secondary:
      text: Get Started with Marker
      href: "/tutorials/welcome-to-marker/"
sections:
  - id: overview
    label: Overview
  - id: how-it-works
    label: How It Works
  - id: carryovers
    label: Ties & Carryovers
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
{% from "components/game-guide.njk" import SectionHeader, ConfigCard, TipCard, FaqItem, RelatedCard, MarkerImplNote %}
{% from "components/product-screenshot.njk" import GameGuideScreenshot %}

{# ================================================================
   1. OVERVIEW
   ================================================================ #}
<section class="section section--white" id="overview">
<div class="container">

{{ SectionHeader("Overview", "What Is Skins?",
  "Each hole is its own contest. Win it outright — no tied winners — and the skin is yours. Ties leave the pot unresolved.") }}

<div class="gg-prose">

Skins is the most drama-forward game in golf. Instead of counting strokes across 18 holes, each hole is a standalone prize — a "skin" — that belongs to whoever posts the lowest score on that hole outright. The key word is _outright_: if two or more players tie for low score, nobody wins the skin.

What happens to the unresolved skin depends on your group's rules. In carryover mode, it rolls to the next hole, adding to the pot. A tie followed by another tie means the next outright winner collects three skins at once. A string of three consecutive ties hands the fourth-hole winner four skins in a single moment — the most dramatic result in recreational golf.

Without carryovers, ties simply disappear. The hole is lost, not deferred.

Skins works with any number of players. It scales from a 2-person head-to-head to a large group outing, handles gross or net scoring, and settles cleanly at the end — either from a shared pool everyone bought into, or as player-to-player skin payments. No other format generates as many "did you see that?" moments per round.

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">18</div>
<div class="gg-quick-stat__lbl">Skins available (1–18)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">1</div>
<div class="gg-quick-stat__lbl">Outright winner required</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">2+</div>
<div class="gg-quick-stat__lbl">Players (any group size)</div>
</div>
</div>

{{ MarkerImplNote("Marker compares scores hole by hole after each is entered, identifies the outright low scorer, applies handicap strokes when enabled, tracks carryovers, and calculates the settlement at the end. Two accounting modes are available: a shared pool everyone buys into, or a per-skin payment from each non-winner to the winner.") }}

</div>
</section>

{# ================================================================
   2. HOW IT WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

{{ SectionHeader("Mechanics", "How Skins Works",
  "Six steps from the first tee to final settlement.") }}

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Every hole is a separate contest</h3>
<p>Before the round, each player agrees on the hole range (default: 1–18) and a dollar value for the game. Each of those 18 holes has one skin available — up to 18 skins total. Nothing carries over between holes unless carryover is explicitly enabled.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>All players score every hole individually</h3>
<p>Every player plays their own ball on every hole and records their score. There are no teams and no ball selection — each player's score competes against all others independently. Marker supports 2 players through large groups in the same round.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Marker finds the low score for the hole</h3>
<p>Once all scores are entered for a hole, Marker identifies the lowest score. If net scoring is enabled, handicap strokes are subtracted first — the lowest net score is what counts. Marker shows the low score in the hole cell and marks the potential winner.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>One player must have it alone to win the skin</h3>
<p>An outright winner requires exactly one player to hold the low score. If two or more players tie for low — even if they're well ahead of the rest of the field — nobody wins the skin. Marker detects ties automatically and labels the hole accordingly.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>Ties are resolved per your carryover setting</h3>
<p>With carryovers off (the default): a tied hole disappears — that skin is gone, and the next hole starts fresh with one skin at stake. With carryovers on: a tied hole adds its skin to the next hole's pot. The accumulated pot keeps growing until someone wins outright.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">6</div>
<div class="gg-step__body">
<h3>Settlement after hole 18</h3>
<p>Marker tallies each player's skin total and calculates the settlement. In pool mode, winners share the pot proportionally. In per-skin mode, each non-winner pays the winner for each skin won. Any skins still tied at the end of hole 18 are not collected by anyone.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   3. TIES AND CARRYOVERS
   ================================================================ #}
<section class="section section--white" id="carryovers">
<div class="container">

{{ SectionHeader("Ties & Carryovers", "What Happens When Nobody Wins Outright",
  "Marker supports two tie behaviors: skins disappear on a tie (default), or they carry to the next hole and accumulate.") }}

<div class="gg-prose">

How ties are handled is the most important configuration decision in Skins. The two options produce a fundamentally different game.

**No carryover (default).** When two or more players tie for low score on a hole, the skin for that hole is simply lost. Nobody claims it. The next hole begins fresh with one skin at stake. This version is predictable and easy to track — each hole is always worth exactly one skin — but it reduces the drama of consecutive ties.

**Carryover enabled.** When a hole is tied, the skin carries forward and adds to the next hole's pot. Multiple consecutive ties stack up, and the pot can grow large before anyone wins outright. The player who finally breaks the streak collects everything accumulated.

</div>

<div class="gg-callout">
<p><strong>Carryover example:</strong> Holes 1, 2, and 3 all end in ties with carryovers enabled.</p>
<p>Hole 1: Tie → 1 skin carries to hole 2 (pot: 2 skins)<br>
Hole 2: Tie → 1 skin carries to hole 3 (pot: 3 skins)<br>
Hole 3: Player A wins outright → Player A collects all 3 skins at once</p>
</div>

<div class="gg-prose">

**What happens to unresolved carryovers at hole 18.** If carryovers are enabled and hole 18 ends in a tie, the accumulated skins from that final hole (and any prior carries) are not awarded to anyone. Unresolved carryovers at the end of the round are simply lost — Marker does not carry them over to a playoff or distribute them.

**Validation rule (optional, advanced).** Marker includes an optional skin validation rule: a player who wins a skin must also make a net par or better on the following hole to keep it. If the winner scores over par on the next hole, their skin is invalidated — they don't collect it — and it acts as a carryover. This house rule is disabled by default. It's most common in formats designed to discourage lucky one-hole bursts from players who then immediately blunder.

</div>

<div class="gg-table-wrapper" style="margin-top:28px;">
<table class="gg-table">
<thead>
<tr>
<th>Setting</th>
<th>What happens on a tie</th>
<th>What happens to the skin</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>No carryover</strong> (default)</td>
<td>Two or more players tie for low</td>
<td>Skin is lost — nobody collects it</td>
</tr>
<tr>
<td><strong>Carryover on</strong></td>
<td>Two or more players tie for low</td>
<td>Skin rolls to next hole, pot grows</td>
</tr>
<tr>
<td><strong>Carryover + win</strong></td>
<td>One player wins outright after tied holes</td>
<td>Winner collects all accumulated skins</td>
</tr>
<tr>
<td><strong>Unresolved at hole 18</strong></td>
<td>Final hole ends in a tie (carryover on)</td>
<td>Skins are not awarded to anyone</td>
</tr>
</tbody>
</table>
</div>

{{ GameGuideScreenshot("gameSkinsScorecardCarryover", screenshots) }}

</div>
</section>

{# ================================================================
   4. SETUP IN MARKER
   ================================================================ #}
<section class="section" id="configuration">
<div class="container">

{{ SectionHeader("Setup Guide", "Configuring Skins in Marker",
  "All settings are configured in the game creation flow. Takes under 60 seconds.") }}

<div class="gg-config-grid">

{{ ConfigCard(
  "Carryovers",
  "Carry Over Skins on Ties",
  "When enabled, a tied hole adds its skin to the next hole's pot. Skins accumulate until someone wins outright. Disabled by default — ties result in a lost skin rather than a carryover.",
  [
    {label: "Off — tied skins are lost (default)", rec: false},
    {label: "On — tied skins roll to the next hole", rec: true}
  ]
) }}

{{ ConfigCard(
  "Hole Range",
  "Holes in Play",
  "The default range is holes 1–18. You can configure any subset — holes 1–9 for a front-nine skins game, or a custom range for a shorter event. Each hole in the range is a separate skin.",
  [
    {label: "1–18 — full round (default)", rec: true},
    {label: "1–9 — front nine only", rec: false},
    {label: "10–18 — back nine only", rec: false}
  ]
) }}

{{ ConfigCard(
  "Buy-In Mode",
  "Pool Buy-In or Per-Skin",
  "Two accounting modes are available. Pool mode: all players contribute one buy-in amount and winners split the pot by skin count. Per-skin mode: each non-winner pays the winner for each skin won.",
  [
    {label: "Pool buy-in — winners split the shared pot (default)", rec: true},
    {label: "Per-skin — each skin costs other players a set amount", rec: false}
  ]
) }}

{{ ConfigCard(
  "Handicap",
  "Gross or Net Scoring",
  "Net scoring is enabled by default. Marker applies each player's handicap strokes by Stroke Index before comparing scores. Disable handicap for gross skins — raw scores compared as-is.",
  [
    {label: "Net — handicap applied per hole (default)", rec: true},
    {label: "Gross — raw scores, no adjustment", rec: false}
  ]
) }}

{{ ConfigCard(
  "Validation",
  "Require Net Par to Keep Skin",
  "An optional house rule: a skin winner must also make a net par or better on the next hole. If they don't, the skin is invalidated and carries over. Disabled by default.",
  [
    {label: "Off — all skins are valid (default)", rec: false},
    {label: "On — validate with next-hole net par", rec: false}
  ]
) }}

</div>


</div>
</section>

{# ================================================================
   5. EXAMPLE ROUND
   ================================================================ #}
<section class="section section--white" id="example">
<div class="container">

{{ SectionHeader("Worked Example", "Five Holes of Skins",
  "Four players — gross scoring, carryovers enabled, $5 pool buy-in each ($20 total pot).") }}

<div class="gg-prose" style="margin-bottom:28px;">

Players A, B, C, and D each contribute $5 to a shared pool. Carryovers are on — tied holes roll to the next hole. Lowest score wins the hole outright; ties carry. All scores are gross.

</div>

<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Skins example — holes 1–5">
<thead>
<tr>
<th>Hole</th>
<th>Par</th>
<th>A</th>
<th>B</th>
<th>C</th>
<th>D</th>
<th>Low</th>
<th>Result</th>
<th>Carryover</th>
<th>Winner</th>
<th>Skins Won</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1</strong></td>
<td>4</td>
<td>4</td>
<td>4</td>
<td>5</td>
<td>6</td>
<td>4</td>
<td class="gg-tie">Tied (A, B)</td>
<td>→ 1</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td>3</td>
<td>4</td>
<td class="gg-win">3</td>
<td>4</td>
<td>5</td>
<td>3</td>
<td>B wins</td>
<td>0</td>
<td class="gg-win">B</td>
<td class="gg-win">2 (1+carry)</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td>5</td>
<td>5</td>
<td>6</td>
<td>5</td>
<td>5</td>
<td>5</td>
<td class="gg-tie">Tied (A,C,D)</td>
<td>→ 1</td>
<td>—</td>
<td>—</td>
</tr>
<tr>
<td><strong>4</strong></td>
<td>4</td>
<td class="gg-win">3</td>
<td>5</td>
<td>4</td>
<td>5</td>
<td>3</td>
<td>A wins</td>
<td>0</td>
<td class="gg-win">A</td>
<td class="gg-win">2 (1+carry)</td>
</tr>
<tr>
<td><strong>5</strong></td>
<td>4</td>
<td>4</td>
<td>4</td>
<td class="gg-win">3</td>
<td>5</td>
<td>3</td>
<td>C wins</td>
<td>0</td>
<td class="gg-win">C</td>
<td class="gg-win">1</td>
</tr>
</tbody>
</table>
</div>

<div style="margin-top:16px; display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
<span style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--ink-muted);">
<span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:rgba(74,124,89,0.18);border:1px solid rgba(74,124,89,0.35);"></span>
Skin won
</span>
<span style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--ink-muted);">
Arrow (→ 1) = skins carrying to next hole
</span>
</div>

<div class="gg-callout" style="margin-top:32px;">
<p><strong>After five holes:</strong> A = 2 skins, B = 2 skins, C = 1 skin, D = 0 skins. Five skins distributed from five holes. Hole 1 carried because A and B tied; B broke the deadlock on hole 2 and collected both. Hole 3 had a three-way tie; A broke it on hole 4.</p>
</div>

<h3 style="font-size:1.05rem; color:var(--ink); margin:32px 0 16px;">Pool Buy-In Settlement</h3>

<div class="gg-prose" style="margin-bottom:16px;">

$20 total pot (4 × $5). Five skins distributed. Winners divide the pot by skin share.

</div>

<div class="gg-table-wrapper">
<table class="gg-table">
<thead>
<tr>
<th>Player</th>
<th>Skins</th>
<th>Share of Pot</th>
<th>Buy-In</th>
<th>Net</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>A</strong></td>
<td>2</td>
<td>2/5 × $20 = $8</td>
<td>−$5</td>
<td><strong>+$3</strong></td>
</tr>
<tr>
<td><strong>B</strong></td>
<td>2</td>
<td>2/5 × $20 = $8</td>
<td>−$5</td>
<td><strong>+$3</strong></td>
</tr>
<tr>
<td><strong>C</strong></td>
<td>1</td>
<td>1/5 × $20 = $4</td>
<td>−$5</td>
<td><strong>−$1</strong></td>
</tr>
<tr>
<td><strong>D</strong></td>
<td>0</td>
<td>$0</td>
<td>−$5</td>
<td><strong>−$5</strong></td>
</tr>
</tbody>
</table>
</div>

<div class="gg-callout gg-callout--info" style="margin-top:16px;">
<p><strong>Per-skin mode (same $5 amount, different accounting):</strong> Each skin won earns the winner $5 from each other player. B wins 2 skins: B collects $5 × 3 × 2 = +$30, each of the other 3 pays $10 to B. A also wins 2 skins, same math. The total swings are larger — per-skin mode rewards prolific skin winners much more heavily than pool mode. Marker supports both; choose at setup.</p>
</div>

{{ GameGuideScreenshot("gameSkinsLeaderboard", screenshots) }}

</div>
</section>

{# ================================================================
   6. STRATEGY
   ================================================================ #}
<section class="section" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Playing Skins Well",
  "Skins rewards aggression at the right moments — but recklessness when the hole is already lost is just noise.") }}

<div class="gg-tips-grid">

{{ TipCard(
  "Awareness",
  "Know What the Current Hole Is Worth",
  "With carryovers on, a hole after multiple ties is worth 3, 4, or more skins. This changes your risk tolerance dramatically. Chasing a birdie on a hole worth 1 skin is one thing; the same aggressive play on a hole worth 4 skins might be the right call even on a risky line."
) }}

{{ TipCard(
  "Aggression",
  "Go Aggressive When Others Are Already in Trouble",
  "If two players are already making bogeys or worse, a par is likely to win the skin outright. Once you have the hole in hand, you can relax. If you're the one in trouble, you can sometimes take extreme lines — a miraculous birdie might still win, whereas a conservative play has no chance."
) }}

{{ TipCard(
  "Defense",
  "When You Can't Win, Avoid Making Others Rich",
  "If your score can't possibly win the skin (you're already well over par), your goal becomes preventing a single winner. In no-carryover mode, a double can tie a birdie and nullify the hole — but only if the other top scorer also shares low. In carryover mode, this strategy has compounding consequences."
) }}

{{ TipCard(
  "Net Skins",
  "Know Your Stroke Holes Before You Tee Off",
  "In net skins, handicap strokes are allocated by Stroke Index. Knowing you have a stroke on a par 4 rated SI 3 means your net par is a real birdie net — competitive at most ability levels. Identify your stroke holes before the round and plan your approach strategy on those holes first."
) }}

{{ TipCard(
  "Carryovers",
  "Momentum Matters More Than One Good Hole",
  "With carryovers on, a mid-round birdie that breaks a three-hole tie is more valuable than a birdie on hole 1. Save your energy and your focus for when the pot is large. Mentally tracking when carryovers are building gives you better information than just watching your own scorecard."
) }}

{{ TipCard(
  "Validation",
  "If Validation Is On, Birdie Means Nothing Without a Follow-Up",
  "When the validation rule is active, winning a skin on hole 7 means you must make a net par or better on hole 8 to keep it. If you know validation is enabled, factor in the next hole before celebrating — and play hole 8 with the same focus you gave hole 7."
) }}

</div>

</div>
</section>

{# ================================================================
   7. GROSS VS. NET
   ================================================================ #}
<section class="section section--white" id="gross-vs-net">
<div class="container">

{{ SectionHeader("Gross vs. Net", "Choosing Your Scoring Mode",
  "Net skins level the playing field for mixed-handicap groups. Gross skins reward raw performance.") }}

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Gross Skins</div>
<div class="gg-hdcp-option__desc">Scores are compared as recorded — no handicap adjustment. The player with the lowest raw score wins the hole. Best suited for groups with similar ability levels where handicaps would add complexity without improving fairness.</div>
</div>

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">Net Skins (100%) <span class="gg-hdcp-rec-badge">Recommended</span></div>
<div class="gg-hdcp-option__desc">Each player's handicap strokes are applied per hole by Stroke Index before scores are compared. A 20-handicapper receiving a stroke on a difficult par 4 competes directly with a scratch player. Net skins is the default in Marker and the most common format for mixed-handicap outings.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Net Skins (85%)</div>
<div class="gg-hdcp-option__desc">Applies 85% of each player's Course Handicap. Reduces the advantage for higher-handicappers while still applying some adjustment. Used in money games where the group prefers not to fully equalize handicap differences.</div>
</div>

</div>

<div class="gg-prose">

**How net strokes work in Skins.** Marker applies handicap strokes by Stroke Index. Each hole is rated 1 (hardest) to 18 (easiest) based on the course rating. A player with a 10-handicap receives one stroke on the 10 hardest holes — on those holes, their gross score is reduced by 1 to produce the net score used in the skins comparison. A player with an 18-handicap receives a stroke on every hole; a scratch player receives none.

**Why net skins keeps large groups competitive.** In gross skins, a 20-handicapper has almost no chance of winning a skin against scratch players — the raw score gap is too consistent. Net skins change this: the 20-handicapper might net a 2 on a par 3 where a scratch player shoots 3, winning the hole cleanly. Mixed-ability groups should default to net unless there's a specific reason for gross play.

**Half-stroke option.** Marker also supports a half-strokes handicap mode, which divides each player's handicap allocation by two. This is less common but occasionally used when groups feel full handicap gives too large an advantage on specific holes.

<div class="gg-callout gg-callout--info">
<p>For a full explanation of all handicap settings in Marker — including stroke allocation, percentage modes, and per-player overrides — see the <a href="{{ '/tutorials/handicap-settings/' | url }}">Handicap Settings guide</a>.</p>
</div>

</div>

</div>
</section>

{# ================================================================
   8. VARIATIONS
   ================================================================ #}
<section class="section" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Common Skins Formats",
  "Most Skins variations combine different carryover and scoring rules. These are the most widely played.") }}

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
</div>
<div class="gg-variation__body">
<h4>No-Carryover Skins (Straightforward)</h4>
<p>The default in Marker. Each hole is worth exactly one skin. Ties result in the skin being lost — no accumulation, no drama from consecutive ties. Simpler to track and fully predictable in value per hole. Good for groups that want clean settlement without variable skin values.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Carryover Skins (Classic)</h4>
<p>Tied skins roll forward and accumulate until someone wins outright. The most popular format among serious players — a six-hole tie followed by a clean win is a legendary outcome. Enable "Carry over skins on ties" in Marker's settings. This is what most golfers mean when they say "we're playing skins."</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<div class="gg-variation__body">
<h4>Net Skins</h4>
<p>Handicap strokes applied per hole before comparison. The most widely used format for mixed-ability groups, outings, and fundraisers. Enables golfers of very different skill levels to compete genuinely hole by hole. Configured through Marker's handicap settings.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
</div>
<div class="gg-variation__body">
<h4>Gross Skins</h4>
<p>Raw scores compared with no handicap adjustment. Most common in scratch or low-handicap groups. Faster to score — no mental handicap math needed — and rewards pure shot-making rather than handicap allocation. Configure by disabling handicap in Marker's settings.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
</div>
<div class="gg-variation__body">
<h4>Validated Skins</h4>
<p>A skin winner must follow up with a net par or better on the next hole to keep the skin. If they don't, the skin is invalidated and carries over. Enable "Validate skins" in Marker's settings. This variation is less common but used in formats that want to reward sustained good play rather than isolated hot holes.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
</div>
<div class="gg-variation__body">
<h4>Nine-Hole Skins</h4>
<p>Configure the hole range to 1–9 or 10–18 for a half-round skins game. All the same rules apply across the shorter range. Useful for practice rounds or events where time is limited. Full-round skins can also be split into two separate games (front and back) within the same event.</p>
</div>
</div>

</div>

<div class="gg-callout gg-callout--info" style="margin-top:32px;">
<p><strong>Team Skins is not supported in Marker.</strong> Skins is an individual format in Marker — each player competes with their own score. For team-based hole-by-hole formats, see <a href="{{ '/games/high-low/' | url }}">High-Low</a> or <a href="{{ '/games/nassau/' | url }}">Nassau</a>.</p>
</div>

</div>
</section>

{# ================================================================
   9. WHY MARKER
   ================================================================ #}
<section class="section section--dark" id="why-marker">
<div class="container">

{{ SectionHeader("Marker App", "Why Run Skins in Marker?",
  "Comparing four players on 18 holes, tracking ties and carryovers, and calculating pool settlements manually is error-prone. Marker handles all of it.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
</div>
<h4>Outright Winners Identified Instantly</h4>
<p>The moment all scores are entered for a hole, Marker identifies whether there's an outright winner or a tie. No manual comparison across players — the result appears in the scorecard immediately.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<h4>Carryovers Tracked Automatically</h4>
<p>When carryovers are enabled, Marker tracks the accumulated skin count through every tied hole and displays the current carryover in the hole cell. When someone finally wins outright, the correct skin count is awarded immediately.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Handicaps Applied Per Hole</h4>
<p>Marker applies net strokes by Stroke Index hole by hole. No manual math — each player's handicap-adjusted score is computed and the correct net winner (or tie) is identified automatically.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<h4>Live Skin Totals</h4>
<p>The leaderboard keeps each player's running skin count and accounting together throughout the round. Expand the hole-by-hole view to see wins, ties, and carryover results at any point — no scorecard math required.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Two Settlement Modes</h4>
<p>Pool buy-in distributes a shared pot proportionally by skin count. Per-skin mode calculates direct player-to-player payments. Marker computes either at the end of the round — no spreadsheet needed.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
</div>
<h4>Hole-by-Hole Breakdown</h4>
<p>The leaderboard's expandable detail view shows every hole: how many scores came in, the low score, and the result — winner name, "N ties," or "invalidated." A complete audit trail of every skin decision is one tap away.</p>
</div>

</div>

<div style="margin-top:40px; text-align:center;">
<a href="https://app.marker.golf" class="btn btn-primary">Play Skins in Marker</a>
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
<summary>What is a skin in golf?</summary>
<div class="gg-faq-body">
<p>A skin is a prize associated with a single hole. The player who posts the lowest score on that hole — with no one else tying them — wins the skin. A round of 18 holes has up to 18 skins available. With carryovers enabled, multiple skins can be combined into a single prize when consecutive holes end in ties.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How do you win a skin?</summary>
<div class="gg-faq-body">
<p>You win a skin by posting the lowest score on a hole with no one else matching it. Tying for low is not enough — you must win the hole outright, with a score no other player achieved on that hole. In net skins, your handicap-adjusted (net) score is used for this comparison.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What happens when two or more players tie?</summary>
<div class="gg-faq-body">
<p>It depends on the carryover setting. With carryovers off (the default in Marker): nobody wins the skin, and it's simply lost — the next hole starts fresh with one skin at stake. With carryovers on: the tied skin carries to the next hole, adding to its value. A string of consecutive ties builds up a larger prize that goes to the next outright winner.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is a carryover?</summary>
<div class="gg-faq-body">
<p>A carryover is what happens to a skin when no one wins it outright. With carryovers enabled, tied skins roll to the next hole and accumulate. If holes 1, 2, and 3 all tie, hole 4 is worth 4 skins — the original plus three carried. The next outright winner collects all accumulated skins at once. Carryovers are off by default in Marker and must be enabled in the game settings.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What happens to unresolved skins at the end of hole 18?</summary>
<div class="gg-faq-body">
<p>If hole 18 ends in a tie with carryovers enabled, the accumulated skins from that hole (and any prior tied holes carrying into it) are not awarded to anyone. Unresolved carryovers at the end of the round are lost — Marker does not carry them to a playoff or distribute them to the closest finisher.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can Skins be played with handicaps?</summary>
<div class="gg-faq-body">
<p>Yes. Net skins is the most common format for mixed-ability groups. Marker applies handicap strokes by Stroke Index — the player's handicap-adjusted net score is used for the skin comparison. Handicap is enabled by default at 100% of each player's Course Handicap. You can also configure partial handicap (85%) or disable it entirely for gross skins.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is the difference between gross and net skins?</summary>
<div class="gg-faq-body">
<p>Gross skins compare raw scores — no handicap adjustment. Net skins subtract each player's handicap strokes (distributed by Stroke Index) before comparing scores. Net skins are recommended for mixed-skill groups because they let higher-handicap players compete on a level footing hole by hole. Gross skins reward pure performance and are most appropriate when all players have similar handicaps.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can teams play Skins in Marker?</summary>
<div class="gg-faq-body">
<p>No. Skins in Marker is an individual format — each player competes with their own score. There is no team Skins mode. For team-based hole-by-hole formats, see <a href="{{ '/games/high-low/' | url }}">High-Low</a> (team match play using best and worst scores) or <a href="{{ '/games/nassau/' | url }}">Nassau</a> (three simultaneous team match play bets).</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How much is each skin worth?</summary>
<div class="gg-faq-body">
<p>It depends on the accounting mode. In <strong>pool mode</strong>, all players buy in for the same amount, creating a shared pot; the pot is divided proportionally by skin count at the end. In <strong>per-skin mode</strong>, each skin is worth a fixed dollar amount that each non-winner pays to the winner per skin. With carryovers enabled, a single hole can be worth multiple skins — multiplying the dollar value accordingly.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How does Marker calculate the Skins payout?</summary>
<div class="gg-faq-body">
<p>In pool mode: Marker totals all players' buy-ins into a pot, counts each player's skins, and divides the pot proportionally. If four players each put in $5 ($20 pot) and Player A wins 3 of 10 total skins, A gets 30% of $20 = $6. In per-skin mode: each skin won earns the winner the per-skin amount from every other player. Marker calculates the net gain or loss for each player and shows the full settlement after the final hole.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is the validation rule and when should I use it?</summary>
<div class="gg-faq-body">
<p>Validation requires a skin winner to make a net par or better on the next hole to keep their skin. If they don't, the skin is invalidated — it acts as a carryover and no one collects it from that hole. It's an optional house rule designed to reward sustained good play rather than a single lucky hole. It's disabled by default. Enable it in Marker's settings if your group uses this rule — most casual groups do not.</p>
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
  "Skins pairs well with these formats — or use them as standalone alternatives.") }}

<div class="gg-related-grid">

{{ RelatedCard(
  "Nassau",
  "Three simultaneous match play bets — front nine, back nine, and overall. The classic money game.",
  '/games/nassau/' | url
) }}

{{ RelatedCard(
  "High-Low",
  "Two-team match play using both the best and worst scores per hole. Every player counts every hole.",
  '/games/high-low/' | url
) }}

{{ RelatedCard(
  "Wolf",
  "Per-hole partner selection. One player picks their team after seeing tee shots — then plays match play on that hole.",
  '/games/wolf/' | url
) }}

{{ RelatedCard(
  "Match Play",
  "Head-to-head hole-by-hole competition. Win holes, not strokes. The simplest match format.",
  '/games/match-play/' | url
) }}

</div>

<div style="margin-top:28px;">
<a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
