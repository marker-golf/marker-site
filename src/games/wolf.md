---
layout: layouts/game-guide.njk
title: Wolf Golf Game — Rules, Strategy & How to Play | Marker
description: "Wolf golf explained: player rotation, partner selection, Lone Wolf strategy, Blind Wolf, and how Marker handles every decision automatically. The most strategically demanding golf betting game."
status: available
category: featured
order: 1
players: "4"
format: "Rotating Match"
cardDescription: "One player per hole is the Wolf — pick a partner after each tee shot, go Lone Wolf against all three opponents, or declare Blind Wolf before anyone hits for triple points. Marker tracks every partner choice, applies the right multiplier, and shows live standings after each hole."
game:
  name: Wolf
  difficulty: advanced
  difficultyLabel: Advanced
  premium: true
  subtitle: "One player per hole is the Wolf — pick a partner after each tee shot, or back yourself alone against all three opponents. Every hole is a new decision."
  heroSubtitleWidth: "540px"
  heroStats:
    - label: Players
      value: "4"
    - label: Format
      value: Rotating Match
    - label: Best For
      value: Betting groups
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
    heading: Ready to Play Wolf?
    body: "Set up your Wolf event in Marker in under two minutes. Wolf order, partner selection, Lone Wolf, Blind Wolf — Marker handles all of it automatically."
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
  - id: partner-selection
    label: Partner Selection
  - id: lone-wolf
    label: Lone Wolf
  - id: blind-wolf
    label: Blind Wolf
  - id: scoring
    label: Scoring
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

{#
  Wolf game guide — uses the canonical game-guide template.

  Implementation verified against:
    expo/lib/golf/games/wolf/index.ts      — scoring engine
    app/src/games/wolf/index.js            — Vue app (identical logic)
    app/tests/unit/games/wolf.spec.js      — unit tests
    expo/lib/golf/games/wolf/components/   — SettingsForm, WolfActionModal, Leaderboard
    expo/lib/golf/games/types.ts           — WolfSettings type
    expo/lib/golf/games/defaults.ts        — default settings

  Verified implementation details:
    - Wolf tees off LAST on their hole; non-Wolf players tee off in rotation order
    - wolfOrder[]: 4-element array, repeats every 4 holes (holes 1-16 by rotation)
    - Holes 17 & 18: Wolf is selected manually (any player); UI prompts "Who is Wolf?"
    - Partner selection: in-app WolfActionModal; tap hole cell to open; choose partner, Lone Wolf, or Blind Wolf
    - 2v2 win: Wolf & partner each +2; opponents each -2
    - Lone Wolf (no blind): multiplier=1 → Wolf +3 (one from each opponent), each -1
    - Blind Wolf: multiplier=3 → Wolf +9, each opponent -3
    - Tie (all scenarios): all players 0 points, no carryover
    - Front/Back/Overall: NOT supported — single layer across 18 holes
    - Players: exactly 4; 5-player NOT supported
    - Handicap: Net default; free-form % (0–100, default 100); full advanced options
    - Settlement: net points × dollar-per-point (configured as $ per point, optional)
    - Leaderboard: Rank · Player · Holes · Gross pts · Net pts · $ amount
#}

{% from "components/game-guide.njk" import SectionHeader, ConfigCard, ScreenshotPlaceholder, TipCard, RelatedCard, MarkerImplNote %}

{# ================================================================
   2. OVERVIEW
   ================================================================ #}
<section class="section section--white" id="overview">
<div class="container">

    {{ SectionHeader("Overview", "What Is Wolf?",
      "A rotating per-hole betting game where the Wolf must decide, in real time, whether to choose a partner or compete alone against all three opponents.") }}

<div class="gg-prose">

Wolf is one of the most strategically rich golf betting games ever devised. Unlike fixed-team formats where partnerships are locked in before the first hole, Wolf creates a completely new competitive situation on every tee box — with a rotating "Wolf" who watches each tee shot and decides, one at a time, whether to claim that player as their partner or pass and wait for something better.

The decision can't be deferred. Once the next player tees off, the previous shot is off the table. Wait too long and the Wolf has nobody — going it alone against all three opponents. The risk and reward are immediate and personal.

The format has been popular in American country clubs for decades. Its enduring appeal is that everyone is equally exposed: the Wolf role rotates, so every player will be in the hot seat throughout the round. There's nowhere to hide, and no fixed partner to bail you out.

<div class="gg-callout">
<p><strong>Why golfers love it:</strong> Every tee shot by every player has immediate strategic weight. A great drive might make you an attractive partner. A poor one might send you to the opposing side. Wolf turns the tee box into a negotiation — silent, fast, and consequential.</p>
</div>

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">1</div>
        <div class="gg-quick-stat__lbl">Wolf per hole</div>
</div>
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">18</div>
        <div class="gg-quick-stat__lbl">Holes per round</div>
</div>
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">4</div>
        <div class="gg-quick-stat__lbl">Players required</div>
</div>
</div>

    {{ MarkerImplNote("Wolf is fully supported in Marker. Marker automatically rotates the Wolf through holes 1–16 based on the order set before the round. Holes 17 and 18 are intentionally left unassigned — the group selects the Wolf before play begins on each of those holes. This lets every group follow its own tradition: many award the final Wolf opportunities to the player with the fewest points to create late-round comeback chances, while others use their own house rules. Partner selection, multipliers, and settlement are all calculated automatically.") }}

</div>
</section>

{# ================================================================
   3. HOW WOLF WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

    {{ SectionHeader("Mechanics", "How Wolf Works",
      "Six steps that repeat on every hole throughout the round.") }}

<div class="gg-steps">

<div class="gg-step">
        <div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Establish the Wolf rotation before the round</h3>
          <p>Before teeing off, the commissioner assigns a <strong>rotation order</strong> in Marker — four players mapped to four starting positions. Marker automatically rotates the Wolf through <strong>holes 1–16</strong> based on this order:</p>
<table class="scoring-table" style="max-width:400px; margin-top:14px;">
            <thead><tr><th>Holes</th><th>Wolf</th></tr></thead>
<tbody>
              <tr><td>1, 5, 9, 13</td><td>Player 1</td></tr>
              <tr><td>2, 6, 10, 14</td><td>Player 2</td></tr>
              <tr><td>3, 7, 11, 15</td><td>Player 3</td></tr>
              <tr><td>4, 8, 12, 16</td><td>Player 4</td></tr>
              <tr><td>17 &amp; 18</td><td>Group selects</td></tr>
</tbody>
</table>
          <p style="margin-top:10px;"><strong>Holes 17 and 18 are intentionally left unassigned.</strong> Before play begins on each of those holes, the group selects the Wolf. Many groups award these final Wolf opportunities to the player with the fewest points — a built-in comeback mechanism. Others follow their own house rules. Marker supports any approach by leaving the choice open.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Non-Wolf players tee off first, in order</h3>
          <p>On each hole, the three non-Wolf players tee off before the Wolf. The Wolf watches every tee shot from the tee box before making any decisions — and hits last.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Wolf decides after each tee shot — immediately</h3>
          <p>After each non-Wolf player hits their tee shot, the Wolf must make a decision <strong>before the next player tees off</strong>: claim this player as their partner, or pass. The decision is final — a passed player cannot be chosen later in that hole's selection.</p>
<div class="gg-callout gg-callout--info">
            <p><strong>The pressure:</strong> Claiming early locks in a good partner but means potentially missing someone better. Waiting means risking it all — you might end up as Lone Wolf whether you wanted to be or not.</p>
</div>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Partner claimed → 2v2 hole</h3>
          <p>If the Wolf claims a partner, that player immediately becomes their teammate for the hole. The remaining two players form the opposing team. The hole is played as a <strong>2v2 match</strong> — each side competes with their best individual net score.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>No partner claimed → Lone Wolf (1v3)</h3>
          <p>If the Wolf passes on all three players, the Wolf goes it alone: <strong>1 against 3</strong>. Win the hole and the Wolf earns one point from each opponent (net +3). Lose and the Wolf pays one point to each opponent (net −3). The Wolf can also declare <strong>Blind Wolf</strong> before anyone tees off, tripling all points in play.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">6</div>
<div class="gg-step__body">
<h3>Record the result in Marker, then rotate</h3>
          <p>Tap the hole on the Marker scorecard, enter scores, and select the Wolf's partner (or Lone Wolf / Blind Wolf). Marker evaluates the best net ball per side, awards points at the applicable multiplier, updates the live leaderboard, and advances to the next hole.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   4. CHOOSING A PARTNER
   ================================================================ #}
<section class="section section--white" id="partner-selection">
<div class="container">

    {{ SectionHeader("Partner Selection", "Choosing a Partner",
      "The real-time decision at the center of every Wolf hole.") }}

<div class="gg-prose">

Partner selection happens in the moment, shot by shot. The Wolf watches Player 2 tee off. Good drive into the fairway — worth picking? Probably not, not yet. Player 3 hits it into the rough. Easy pass. Player 4 sticks it 12 feet from the flag on a par 3. That's your partner.

The key constraint: you must decide **before the next player tees off**. There are no take-backs. This creates a genuine dilemma — especially when the first player hits a solid shot and you have to decide whether to grab them before seeing what the next two players do.

In Marker, the Wolf's partner choice is recorded by tapping the hole cell on the scorecard. A modal opens with the three options: choose any non-Wolf player as partner, declare Lone Wolf, or declare Blind Wolf. The choice is saved immediately and reflected in the live standing.

</div>

<div class="gg-callout">
      <p><strong>A passed player cannot be claimed.</strong> If Player 2 hits a great drive and you pass, hoping for something even better, Player 2 goes to the opposing team. If Players 3 and 4 also hit well, you may find yourself as Lone Wolf against a formidable group.</p>
</div>

<div class="gg-prose" style="margin-top:28px;">

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:12px;">The Decision Framework</h3>

Experienced Wolf players think through a few factors before each shot:

- **Position, not result.** A tee shot into a great position is worth more than a result you can't evaluate yet. A player at 150 yards center fairway has a known advantage.
- **Hole difficulty.** On a tough par 4 with water, a safe tee shot is worth claiming quickly. On an easy par 5 where everyone is likely to score well, it may pay to wait.
- **Opponent quality.** If the remaining players are notoriously reliable, claiming early secures a known quantity. If they're unpredictable, the gamble of waiting may be worthwhile.
- **Your own game.** If you're playing well today, going Lone Wolf is more tempting. If you're struggling, a reliable partner is priceless.

</div>

</div>
</section>

{# ================================================================
   5. LONE WOLF
   ================================================================ #}
<section class="section" id="lone-wolf">
<div class="container">

    {{ SectionHeader("Lone Wolf", "Going Solo",
      "When the Wolf passes on all three players, they compete 1 against 3.") }}

<div class="gg-prose">

Lone Wolf is the highest-risk, highest-reward outcome in Wolf. If the Wolf passes on all three tee shots, they automatically play the hole alone against all three opponents.

The point structure is asymmetric. If the Wolf wins, they collect **one point from each opponent** — netting +3 for the hole while each opponent is −1. If the Wolf loses, they pay one point to each opponent — netting −3 while each opponent gains +1. The swing between a Lone Wolf win and a Lone Wolf loss is 6 total points for the Wolf (from +3 to −3).

At a $5 per point stake: a Lone Wolf win means the Wolf earns $5 from each of the three opponents (+$15 total). A Lone Wolf loss means the Wolf pays $5 to each opponent (−$15 total). A single Lone Wolf hole represents a $30 point-swing for the Wolf.

</div>

<div class="gg-callout">
      <p><strong>When to go Lone Wolf:</strong> Lone Wolf works best when all three opponents hit poor tee shots, when you're playing the best golf of your round, or when the hole setup heavily favors your game. Going Lone Wolf by accident — by being too selective with partners — is the most expensive mistake in Wolf.</p>
</div>

</div>
</section>

{# ================================================================
   6. BLIND WOLF
   ================================================================ #}
<section class="section section--white" id="blind-wolf">
<div class="container">

    {{ SectionHeader("Blind Wolf", "The Ultimate Gamble",
      "Declaring Lone Wolf before any tee shots have been hit — at triple points.") }}

<div class="gg-prose">

Blind Wolf is the boldest play in the game. Before any player on the hole has taken their tee shot, the Wolf declares: **"Blind Wolf."** The Wolf commits to playing alone against all three opponents — without seeing a single tee shot — at a **3× multiplier** on all points.

A Blind Wolf win: the Wolf earns **3 points from each opponent** (+9 total). A Blind Wolf loss: the Wolf pays 3 points to each opponent (−9 total). At $5 per point, a Blind Wolf hole is worth ±$45 for the Wolf and ±$15 for each opponent.

Blind Wolf is most often declared when a player has had an exceptional run on recent holes and wants to press their advantage — or when course conditions, wind, or hole layout give the Wolf a known edge (for example, a short par 3 that fits a player's wedge game perfectly).

In Marker, Blind Wolf is declared in the hole's action modal before any scores are entered. Selecting Blind Wolf clears any partner selection and locks the hole as a 1v3 triple-multiplier result.

</div>

<div class="gg-callout gg-callout--info">
      <p><strong>Mutual exclusivity:</strong> Choosing a partner clears Blind Wolf; toggling Blind Wolf clears the partner. Blind Wolf is always a 1-against-3 play — there is no "Blind Wolf with a partner."</p>
</div>

</div>
</section>

{# ================================================================
   7. SCORING
   ================================================================ #}
<section class="section" id="scoring">
<div class="container">

    {{ SectionHeader("Scoring", "Points and Multipliers",
      "How points are awarded on each type of Wolf hole.") }}

<div class="gg-prose">

Wolf uses a **per-player, zero-sum** point system. Every point won by one player is paid by another — the total across all four players after any hole is always 0. Before the round, the group agrees on a dollar-per-point amount (optional in Marker; leave blank to track points only).

</div>

<table class="scoring-table" style="max-width:780px; margin-top:24px; margin-bottom:28px;">
<thead>
<tr>
          <th>Hole Type</th>
          <th>Teams</th>
          <th>Wolf wins</th>
          <th>Wolf's side loses</th>
          <th>Tie</th>
</tr>
</thead>
<tbody>
<tr>
          <td><strong>Partner chosen (2v2)</strong></td>
          <td>2v2</td>
          <td>Wolf +2, partner +2; each opponent −2</td>
          <td>Wolf −2, partner −2; each opponent +2</td>
          <td>All 0</td>
</tr>
<tr>
          <td><strong>Lone Wolf (1v3)</strong></td>
          <td>1v3</td>
          <td>Wolf +3; each opponent −1</td>
          <td>Wolf −3; each opponent +1</td>
          <td>All 0</td>
</tr>
<tr>
          <td><strong>Blind Wolf (1v3, 3×)</strong></td>
          <td>1v3</td>
          <td>Wolf +9; each opponent −3</td>
          <td>Wolf −9; each opponent +3</td>
          <td>All 0</td>
</tr>
</tbody>
</table>

<div class="gg-callout gg-callout--info">
      <p><strong>Tie handling:</strong> When both sides' best net ball scores are equal, every player receives 0 points for that hole. Tied points do not carry over to the next hole — there is no carryover mechanism in Wolf.</p>
</div>

<div class="gg-prose" style="margin-top:28px;">

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:12px;">Determining the Hole Winner</h3>

After all four players complete the hole, each side contributes their **best individual net score**. The side with the lower best net score wins the hole. Marker computes this automatically — scores entered, result awarded.

</div>

<div class="gg-callout" style="margin-top:20px;">
      <p><strong>Settlement:</strong> Net points × dollar-per-point = settlement amount. Marker displays each player's running dollar total on the leaderboard throughout the round. No separate settlement screen needed — when the 18th hole is recorded, the final amounts are shown.</p>
</div>

</div>
</section>

{# ================================================================
   8. MARKER CONFIGURATION
   ================================================================ #}
<section class="section section--white" id="configuration">
<div class="container">

    {{ SectionHeader("Setup Guide", "Configuring Wolf in Marker",
      "What a commissioner needs to set up a Wolf event. Takes about 90 seconds.") }}

<div class="gg-config-grid">

      {{ ConfigCard(
        "Players",
        "4 Required",
        "Wolf requires exactly four players. Marker enforces this — the game cannot be started with three or five players.",
        [],
        ""
      ) }}

      {{ ConfigCard(
        "Wolf Rotation",
        "Hole 1–4 Wolf Order",
        "Set which player is Wolf on holes 1, 2, 3, and 4. Marker repeats the pattern automatically through hole 16. Holes 17 and 18 are intentionally unassigned — the group selects the Wolf on-site before each of those holes.",
        [
          { label: "Auto-seed from participant order (default)", rec: true },
          { label: "Shuffle button — randomizes the order", rec: false },
          { label: "Manual — commissioner assigns each slot", rec: false }
        ],
        "Key Setting"
      ) }}

      {{ ConfigCard(
        "Points & Wager",
        "$ Per Point",
        "Set an optional dollar value per point. Leave blank to track points only with no dollar display. Accepts any decimal (e.g. $2.50).",
        [
          { label: "Blank — points only, no dollar display", rec: false },
          { label: "$1–$5 per point — standard casual stakes", rec: true },
          { label: "Any decimal amount", rec: false }
        ],
        ""
      ) }}

      {{ ConfigCard(
        "Scoring Mode",
        "Net vs Gross",
        "Choose whether scores are compared before or after handicap strokes are applied. Net is the default and recommended for mixed-ability groups.",
        [
          { label: "Net — handicap applied (default)", rec: true },
          { label: "Gross — raw scores, no adjustment", rec: false }
        ],
        "Key Setting"
      ) }}

      {{ ConfigCard(
        "Handicap Allowance",
        "Percentage of Handicap",
        "What fraction of each player's Course Handicap to apply. 100% is standard; 85% is common in money games to reduce high-handicapper advantage. Free-form 0–100.",
        [
          { label: "100% — full handicap (default)", rec: true },
          { label: "85% — partial, common in betting games", rec: false },
          { label: "Any value 0–100", rec: false }
        ],
        ""
      ) }}

      {{ ConfigCard(
        "Advanced Handicap",
        "Additional Options",
        "Available in the handicap settings panel for groups that want more control.",
        [
          { label: "Stroke off low ball — differential vs. lowest", rec: false },
          { label: "Max strokes — cap on strokes received", rec: false },
          { label: "Half strokes — .5 rounding option", rec: false },
          { label: "Per-player overrides — manual handicap entry", rec: false },
          { label: "Suppress strokes on par 3s", rec: false }
        ],
        ""
      ) }}

</div>

<div class="gg-callout" style="margin-top:8px;">
      <p><strong>Recommended first-time settings:</strong> Net scoring at 100% handicap, auto-seeded rotation order, $1–2 per point. Keep it simple until everyone understands the Lone Wolf and Blind Wolf mechanics.</p>
</div>

<h3 style="font-size:1rem; font-weight:600; color:var(--ink); margin-bottom:20px; margin-top:40px;">App Screens</h3>
<div class="gg-screenshot-row">
      {{ ScreenshotPlaceholder("Wolf Setup Screen", "iOS · Android") }}
      {{ ScreenshotPlaceholder("Partner Selection Modal", "iOS · Android") }}
      {{ ScreenshotPlaceholder("Live Leaderboard", "iOS · Android") }}
</div>

</div>
</section>

{# ================================================================
   9. EXAMPLE ROUND
   ================================================================ #}
<section class="section" id="example">
<div class="container">

    {{ SectionHeader("Worked Example", "Example Round: 3 Holes",
      "Anna, Brian, Carlos, Diana — net scoring, $5 per point.") }}

<div class="gg-prose" style="margin-bottom:24px;">

**Wolf rotation:** Anna (holes 1, 5…) → Brian (holes 2, 6…) → Carlos (holes 3, 7…) → Diana (holes 4, 8…)

**Handicaps:** Anna 8 · Brian 16 · Carlos 4 · Diana 20. Net scores shown (stroke allocation per Stroke Index).

</div>

    {# ── Hole 1 ──────────────────────────────────────── #}
<div style="margin-bottom:36px;">
<h3 style="font-size:1rem; font-weight:700; color:var(--ink); margin-bottom:4px;">Hole 1 — Par 4 &nbsp;·&nbsp; Wolf: <strong>Anna</strong></h3>
      <p style="font-size:0.875rem; color:var(--ink-muted); margin-bottom:14px; line-height:1.6;">Brian, Carlos, and Diana tee off in order. Anna (Wolf) watches and decides after each shot.</p>
<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Wolf example hole 1">
<thead>
<tr>
              <th class="col-left">Player</th>
              <th>Tee shot</th>
              <th>Anna's call</th>
              <th>Gross</th>
              <th>Net</th>
              <th>Side</th>
</tr>
</thead>
<tbody>
<tr>
              <td class="col-left">Brian</td>
              <td>Fairway, 150 yds</td>
              <td>Pass — waiting for better</td>
              <td>5</td>
              <td>5</td>
              <td class="gg-tie">Opponent</td>
</tr>
<tr>
              <td class="col-left">Carlos</td>
              <td>Great drive, just off fringe</td>
              <td class="gg-win"><strong>Claim Carlos</strong></td>
              <td>4</td>
              <td class="gg-win">3</td>
              <td class="gg-win">Anna's partner</td>
</tr>
<tr>
              <td class="col-left">Diana</td>
              <td>Topped shot, 80 yds</td>
              <td>Already decided</td>
              <td>7</td>
              <td>6</td>
              <td class="gg-tie">Opponent</td>
</tr>
<tr>
              <td class="col-left"><strong>Anna (Wolf)</strong></td>
              <td>Fairway</td>
              <td>—</td>
              <td>5</td>
              <td>4</td>
              <td>—</td>
</tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-top:12px; max-width:720px;">
        <p><strong>2v2 result:</strong> Anna+Carlos best net = 3 (Carlos) vs Brian+Diana best net = 5 (Brian). Anna+Carlos win. Each winner +2, each loser −2.</p>
        <p><strong>Points:</strong> Anna +2 · Carlos +2 · Brian −2 · Diana −2 &nbsp;|&nbsp; <strong>Running: A +2 · B −2 · C +2 · D −2</strong></p>
        <p style="margin-top:4px; font-size:0.82rem; color:var(--ink-muted);">At $5/pt: Anna and Carlos each earn $10; Brian and Diana each owe $10.</p>
</div>
</div>

    {# ── Hole 2 ──────────────────────────────────────── #}
<div style="margin-bottom:36px;">
<h3 style="font-size:1rem; font-weight:700; color:var(--ink); margin-bottom:4px;">Hole 2 — Par 5 &nbsp;·&nbsp; Wolf: <strong>Brian</strong></h3>
      <p style="font-size:0.875rem; color:var(--ink-muted); margin-bottom:14px; line-height:1.6;">Carlos, Diana, and Anna tee off in order. Brian (Wolf) watches and decides.</p>
<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Wolf example hole 2">
<thead>
<tr>
              <th class="col-left">Player</th>
              <th>Tee shot</th>
              <th>Brian's call</th>
              <th>Gross</th>
              <th>Net</th>
              <th>Side</th>
</tr>
</thead>
<tbody>
<tr>
              <td class="col-left">Carlos</td>
              <td>In the rough</td>
              <td>Pass — poor position</td>
              <td>6</td>
              <td>5</td>
              <td class="gg-tie">Opponent</td>
</tr>
<tr>
              <td class="col-left">Diana</td>
              <td>Fairway bunker</td>
              <td>Pass — difficult lie</td>
              <td>8</td>
              <td>6</td>
              <td class="gg-tie">Opponent</td>
</tr>
<tr>
              <td class="col-left">Anna</td>
              <td>Center fairway, 200 yds</td>
              <td>Pass — Brian backs himself</td>
              <td>6</td>
              <td>5</td>
              <td class="gg-tie">Opponent</td>
</tr>
<tr>
              <td class="col-left"><strong>Brian (Wolf)</strong></td>
              <td>Pure drive, 240 yds center</td>
              <td><strong>Lone Wolf</strong></td>
              <td>5</td>
              <td class="gg-win">4</td>
              <td>Lone Wolf</td>
</tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-top:12px; max-width:720px;">
        <p><strong>Lone Wolf result:</strong> Brian best net = 4 vs opponents best net = 5 (Anna &amp; Carlos tied). Brian wins. Wolf +3, each opponent −1.</p>
        <p><strong>Points:</strong> Brian +3 · Anna −1 · Carlos −1 · Diana −1 &nbsp;|&nbsp; <strong>Running: A +1 · B +1 · C +1 · D −3</strong></p>
        <p style="margin-top:4px; font-size:0.82rem; color:var(--ink-muted);">At $5/pt: Brian earns $15 total ($5 from each opponent); Anna, Carlos, Diana each owe $5. This is the Lone Wolf asymmetry — the Wolf's gain is spread across three players.</p>
</div>
</div>

    {# ── Hole 3 ──────────────────────────────────────── #}
<div style="margin-bottom:28px;">
<h3 style="font-size:1rem; font-weight:700; color:var(--ink); margin-bottom:4px;">Hole 3 — Par 3 &nbsp;·&nbsp; Wolf: <strong>Carlos</strong></h3>
      <p style="font-size:0.875rem; color:var(--ink-muted); margin-bottom:14px; line-height:1.6;">Diana, Anna, and Brian tee off in order. Carlos (Wolf) watches and decides.</p>
<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Wolf example hole 3">
<thead>
<tr>
              <th class="col-left">Player</th>
              <th>Tee shot</th>
              <th>Carlos's call</th>
              <th>Gross</th>
              <th>Net</th>
              <th>Side</th>
</tr>
</thead>
<tbody>
<tr>
              <td class="col-left">Diana</td>
              <td>Over the green, rough</td>
              <td>Pass — poor position</td>
              <td>5</td>
              <td>4</td>
              <td class="gg-tie">Opponent</td>
</tr>
<tr>
              <td class="col-left">Anna</td>
              <td>6 feet from the flag</td>
              <td class="gg-win"><strong>Claim Anna</strong></td>
              <td>3</td>
              <td class="gg-win">2</td>
              <td class="gg-win">Carlos's partner</td>
</tr>
<tr>
              <td class="col-left">Brian</td>
              <td>On green, 20 feet</td>
              <td>Already decided</td>
              <td>3</td>
              <td>3</td>
              <td class="gg-tie">Opponent</td>
</tr>
<tr>
              <td class="col-left"><strong>Carlos (Wolf)</strong></td>
              <td>On green, 12 feet</td>
              <td>—</td>
              <td>3</td>
              <td>3</td>
              <td>—</td>
</tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-top:12px; max-width:720px;">
        <p><strong>2v2 result:</strong> Carlos+Anna best net = 2 (Anna) vs Diana+Brian best net = 3 (Brian). Carlos+Anna win. Each winner +2, each loser −2.</p>
        <p><strong>Points:</strong> Carlos +2 · Anna +2 · Diana −2 · Brian −2 &nbsp;|&nbsp; <strong>Running: A +3 · B −1 · C +3 · D −5</strong></p>
        <p style="margin-top:4px; font-size:0.82rem; color:var(--ink-muted);">Sum check: 3 − 1 + 3 − 5 = 0 ✓</p>
</div>
</div>

    {# ── Summary ──────────────────────────────────────── #}
<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Wolf 3-hole running totals">
<thead>
<tr>
            <th class="col-left">After hole</th>
            <th>Wolf</th>
            <th>Outcome</th>
            <th>Anna</th>
            <th>Brian</th>
            <th>Carlos</th>
            <th>Diana</th>
</tr>
</thead>
<tbody>
<tr>
            <td class="col-left"><strong>1</strong></td>
            <td>Anna</td>
            <td>A+C win (2v2)</td>
            <td class="gg-win">+2</td>
            <td class="gg-tie">−2</td>
            <td class="gg-win">+2</td>
            <td class="gg-tie">−2</td>
</tr>
<tr>
            <td class="col-left"><strong>2</strong></td>
            <td>Brian</td>
            <td>Lone Wolf wins</td>
            <td class="gg-tie">−1</td>
            <td class="gg-sweep">+3</td>
            <td class="gg-tie">−1</td>
            <td class="gg-tie">−1</td>
</tr>
<tr>
            <td class="col-left"><strong>3</strong></td>
            <td>Carlos</td>
            <td>C+A win (2v2)</td>
            <td class="gg-win">+2</td>
            <td class="gg-tie">−2</td>
            <td class="gg-win">+2</td>
            <td class="gg-tie">−2</td>
</tr>
<tr class="gg-totals-row">
            <td class="col-left">Total</td>
            <td>—</td>
            <td>—</td>
            <td>+3</td>
            <td>−1</td>
            <td>+3</td>
            <td>−5</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-top:16px;">
      <p><strong>Final standing:</strong> Anna +3 · Brian −1 · Carlos +3 · Diana −5. Sum: 0 ✓</p>
      <p><strong>At $5 per point:</strong> Anna earns $15, Carlos earns $15, Brian owes $5, Diana owes $25. Marker displays this settlement live on the leaderboard — no end-of-round math required.</p>
      <p><strong>The decisive hole:</strong> Brian's Lone Wolf win on Hole 2 only netted +3 points — but that single hole's outcome (+3 for Brian, −1 for each opponent) illustrates the format's core asymmetry. A well-timed Lone Wolf win is efficient: the Wolf gains from three people simultaneously while each opponent absorbs only a small individual loss.</p>
</div>

</div>
</section>

{# ================================================================
   10. STRATEGY TIPS
   ================================================================ #}
<section class="section section--white" id="strategy">
<div class="container">

    {{ SectionHeader("Strategy", "How to Win at Wolf",
      "The tactical decisions that separate experienced Wolf players from first-timers.") }}

<div class="gg-tips-grid">

      {{ TipCard(
        "Partner Selection",
        "Claim Position, Not Hope",
        "A tee shot in the fairway with a clear approach is worth more than a shot that might be good. Claiming a player whose ball is in a difficult position is usually a mistake, even if their drive looked impressive off the club. Evaluate where the ball ended up, not how it sounded at impact."
      ) }}

      {{ TipCard(
        "Timing",
        "Don't Wait for Perfect",
        "The biggest mistake new Wolf players make is passing on a good partner hoping for a great one. On most holes, 'solid and in play' is the right standard for claiming. Great tee shots are rare — passing on good ones leaves you exposed."
      ) }}

      {{ TipCard(
        "Lone Wolf",
        "Go Solo With a Plan",
        "The best Lone Wolf decisions are made before the hole starts, not by accident after passing on everyone. If a hole suits your game — a short par 3 with your favorite yardage, or a risk-reward par 5 where you know you can reach in two — consider going Blind Wolf before anyone hits."
      ) }}

      {{ TipCard(
        "Risk Management",
        "Track the Standings",
        "If you're well ahead, a Lone Wolf loss is painful but not terminal. If you're behind, a Lone Wolf win (+3 pts) is the fastest way to claw back. The Wolf role gives you an asymmetric tool — use it based on where you stand in the standings, not just how you feel about the hole."
      ) }}

      {{ TipCard(
        "Handicap Awareness",
        "Know Who Gets Strokes on This Hole",
        "In net Wolf, a high-handicapper receiving a stroke on a difficult hole becomes a far more attractive partner than their handicap alone suggests. Check the Stroke Index before each hole — a player getting a stroke on SI 3 is worth claiming even if their raw score wouldn't normally tempt you."
      ) }}

      {{ TipCard(
        "Reading Opponents",
        "Observe Tendencies Over the Round",
        "Experienced Wolf players watch not just the tee shots but the patterns. If one player consistently hits reliable drives while another is erratic, you can price that into your claiming decisions by the back nine. The early holes are information-gathering as much as competition."
      ) }}

</div>

</div>
</section>

{# ================================================================
   11. HANDICAP CONSIDERATIONS
   ================================================================ #}
<section class="section" id="handicaps">
<div class="container">

    {{ SectionHeader("Handicaps", "Handicap Considerations",
      "How net Wolf works — and why handicaps change partner selection strategy.") }}

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option">
        <div class="gg-hdcp-option__name">Gross</div>
        <div class="gg-hdcp-option__desc">Raw scores compared with no adjustments. Suits groups of similar ability. Partner selection is based entirely on shot quality without handicap consideration.</div>
</div>

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">
          Net (100%)
          <span class="gg-hdcp-rec-badge">Recommended</span>
</div>
        <div class="gg-hdcp-option__desc">Full Course Handicap applied. Strokes allocated by Stroke Index, one per hole. Makes Wolf genuinely competitive for groups with mixed ability — and makes claiming decisions more interesting.</div>
</div>

<div class="gg-hdcp-option">
        <div class="gg-hdcp-option__name">Net (85%)</div>
        <div class="gg-hdcp-option__desc">Use 85% of each player's Course Handicap. Common in money Wolf games to moderate the advantage for high-handicappers on their stroke holes.</div>
</div>

</div>

<div class="gg-prose">

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:12px; margin-top:8px;">How Handicaps Change Wolf Strategy</h3>

In net Wolf, the value of a partner fluctuates hole by hole based on the Stroke Index. A 20-handicapper receiving a stroke on a par 4 rated SI 2 suddenly becomes a much more attractive partner than their handicap alone suggests — their net score gets a full stroke deduction, giving the Wolf's team a significant advantage on that hole.

Conversely, on a Lone Wolf attempt, the Wolf's own strokes matter. If the Wolf is the high-handicapper and receives strokes on several holes, Lone Wolf can become a stronger play than it would be for a scratch player who gets no deductions.

Marker offers advanced options including stroke off low ball (differential-based allocation), per-player handicap overrides, max strokes, half strokes, and suppression of strokes on par 3s. These are available in the Handicap Settings panel when creating the event.

<div class="gg-callout gg-callout--info">
<p>For a full explanation of how Marker allocates handicap strokes, see the <a href="{{ '/tutorials/handicap-settings/' | url }}">Handicap Settings guide</a>.</p>
</div>

</div>

</div>
</section>

{# ================================================================
   12. VARIATIONS
   ================================================================ #}
<section class="section section--white" id="variations">
<div class="container">

    {{ SectionHeader("Variations", "Common Wolf Variations",
      "Regional rules and add-ons used at clubs and in regular groups.") }}

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<div class="gg-variation__body">
<h4>Last Hole Wolf Choice</h4>
          <p>On hole 18, the player in last place gets to choose to be Wolf regardless of the rotation (complementing Marker's built-in flexibility on holes 17–18). A rule that gives the trailing player a chance to mount a late comeback.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
</div>
<div class="gg-variation__body">
<h4>Wolf Nassau</h4>
          <p>Track Wolf standings separately for the front nine, back nine, and overall 18 — similar to how Nassau structures match play. Each nine is settled independently, which creates natural comeback opportunities at the turn.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
</div>
<div class="gg-variation__body">
<h4>Automatic Partner (Last Player)</h4>
          <p>If the Wolf doesn't claim anyone, the last non-Wolf player to tee off is automatically assigned as the Wolf's partner. Removes the Lone Wolf option entirely — simpler for groups new to the format.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Carryover Ties</h4>
          <p>When a hole is tied (best scores equal), the hole value carries over to the next hole. Stakes accumulate until someone wins outright. Creates high-drama moments as carryovers stack mid-round. Agree on this before the round — Marker's default is no carryover.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Escalating Lone Wolf</h4>
          <p>A Wolf who wins as Lone Wolf can voluntarily play the next Wolf hole as Lone Wolf again at the same stakes. If they win again, they may press to a third consecutive Lone Wolf hole. Rarely used but creates spectacular swings in individual rounds.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<div class="gg-variation__body">
<h4>Side Bets on the Wolf Tally</h4>
          <p>In some groups, a separate prop bet tracks who is Wolf the most holes over 18 (or who wins/loses the most as Wolf). Adds a meta-game layer on top of the standard Wolf competition.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   13. WHY USE MARKER?
   ================================================================ #}
<section class="section section--dark" id="why-marker">
<div class="container">

    {{ SectionHeader("Marker App", "Why Run Wolf in Marker?",
      "Wolf creates more real-time decisions per hole than almost any other format. Marker keeps up with all of them.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>
</div>
<h4>Partner Choices Tracked Automatically</h4>
        <p>Marker records the Wolf's decision on every hole. The app shows the current teams, the hole type (2v2, Lone Wolf, Blind Wolf), and applies the right multiplier — so nothing gets argued about or forgotten mid-round.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<h4>Live Points After Every Hole</h4>
        <p>Wolf standing math is complex — especially when Lone Wolf and Blind Wolf multipliers are involved across different holes. Marker updates individual standings immediately after each hole is recorded, showing gross points won, net points, and dollar totals.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
</div>
<h4>Correct Multipliers Every Time</h4>
        <p>A 2v2 hole, a Lone Wolf hole, and a Blind Wolf hole each have completely different point outcomes. Marker applies the right calculation based on the Wolf's declared choice — no mental arithmetic, no debates.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Handicaps Applied Per Hole</h4>
        <p>Marker allocates net strokes by Stroke Index on every hole. Players see their net score without checking a handicap card — and the Wolf can see exactly how attractive each potential partner is on the current hole before deciding.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Instant Settlement</h4>
        <p>At the end of 18 holes, Marker shows each player's net point total and the exact dollar amounts owed. The settlement is calculated continuously — by hole 18, everyone already knows the final numbers before the scorecard is signed.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
</div>
<h4>Works on Any Device</h4>
        <p>iPhone, Android, iPad, or web browser — the Wolf uses their phone to declare their choice, scores sync to every other player instantly. No shared paper scorecard, no disputes about what was recorded when.</p>
</div>

</div>

<div style="margin-top:40px; text-align:center;">
      <a href="https://app.marker.golf" class="btn btn-primary">Open Marker</a>
</div>

</div>
</section>

{# ================================================================
   14. FAQ
   ================================================================ #}
<section class="section section--white" id="faq">
<div class="container">

    {{ SectionHeader("FAQ", "Frequently Asked Questions") }}

<div class="gg-faq">

<details class="gg-faq-item">
        <summary>How many players are required to play Wolf?</summary>
<div class="gg-faq-body">
          <p>Exactly <strong>four players</strong> — no more, no less. Marker enforces this requirement when creating a Wolf event. The rotation math requires precisely four players, and the validation will prevent starting the game with any other number.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Is 5-player Wolf ("Wolf with a Pig") supported in Marker?</summary>
<div class="gg-faq-body">
          <p>No. Marker's Wolf implementation is limited to exactly four players. The 5-player "Wolf Pig" variant is not currently supported.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Does the Wolf tee off first or last on their hole?</summary>
<div class="gg-faq-body">
          <p>The Wolf tees off <strong>last</strong>. The three non-Wolf players hit their tee shots in rotation order — the Wolf watches each one and decides whether to claim that player as partner before the next player tees off. The Wolf then plays their own tee shot after all three partner decisions have been made.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>What happens if the Wolf doesn't choose a partner?</summary>
<div class="gg-faq-body">
          <p>If the Wolf passes on all three players, they automatically play as <strong>Lone Wolf</strong> — 1 against 3. Win the hole: Wolf +3 points (one from each opponent). Lose the hole: Wolf −3 points (one to each opponent). Lone Wolf is what happens by default when no partner is chosen.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>How does Blind Wolf work, and what's the multiplier?</summary>
<div class="gg-faq-body">
          <p>Blind Wolf is declared <strong>before any tee shots on the hole</strong> — the Wolf announces it in Marker before scores are recorded. The multiplier is <strong>3×</strong>: all points are tripled relative to normal. Win as Blind Wolf: Wolf +9, each opponent −3. Lose: Wolf −9, each opponent +3. Selecting a partner clears Blind Wolf, and declaring Blind Wolf clears any partner selection — Blind Wolf is always 1v3.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>What happens when a hole is tied?</summary>
<div class="gg-faq-body">
          <p>When both sides' best net scores are equal, all four players receive <strong>0 points</strong> for that hole. There is no carryover — the tied hole's value does not roll into the next hole. This applies to 2v2 ties, Lone Wolf ties, and Blind Wolf ties.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>What's special about holes 17 and 18?</summary>
<div class="gg-faq-body">
          <p>Holes 17 and 18 are intentionally left unassigned in Marker. Before play begins on each of those holes, the group selects who is Wolf — any player, including someone who has already been Wolf on their scheduled holes. This is a feature, not a gap: many groups award these final Wolf opportunities to the player with the fewest points, creating a structured comeback mechanism for the closing holes. Others follow their own house rules. Marker leaves the choice open so every group can follow its preferred tradition.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Can Wolf be played with handicaps?</summary>
<div class="gg-faq-body">
          <p>Yes — net Wolf is the default in Marker. Full Course Handicap (100%) is applied by default, with strokes allocated hole by hole using the Stroke Index. You can adjust the allowance percentage (any value 0–100), use partial handicap (e.g. 85%), or configure advanced options like stroke off low ball, max strokes, or per-player overrides. Net scoring significantly changes partner selection strategy — see the Handicaps section above.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>How does Marker calculate and display Wolf settlement?</summary>
<div class="gg-faq-body">
          <p>Marker tracks each player's net point total as the round progresses. The leaderboard shows: rank, player name, holes played, gross points (positive deltas only), net points, and dollar amount (net points × dollar-per-point). The dollar column is the settlement figure — when hole 18 is recorded, the amounts shown are what each player owes or is owed. Settlement is always live.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Is Wolf better than Skins or Nassau?</summary>
<div class="gg-faq-body">
          <p>They serve very different purposes. <a href="{{ '/games/skins/' | url }}">Skins</a> is simpler and creates drama with carryover pots — but has no partner mechanic and no real-time strategy. <a href="{{ '/games/nassau/' | url }}">Nassau</a> rewards consistent play over structured nine-hole segments. Wolf does something neither format does: it makes every tee shot by every player immediately consequential as a partnership decision. If your group enjoys real-time strategy and wants a format where every drive matters, Wolf has no equal.</p>
</div>
</details>

</div>

</div>
</section>

{# ================================================================
   15. RELATED GAMES
   ================================================================ #}
<section class="section" id="related">
<div class="container">

    {{ SectionHeader("Also Try", "Related Games",
      "Wolf pairs well with these formats — or try them as standalone games.") }}

<div class="gg-related-grid">

      {{ RelatedCard(
        "High-Low",
        "Fixed 2v2 teams compare best and worst scores each hole. Drama without the rotating Wolf role.",
        '/games/high-low/' | url
      ) }}

      {{ RelatedCard(
        "Nassau",
        "Three concurrent bets on front, back, and overall 18. Natural companion to Wolf.",
        '/games/nassau/' | url
      ) }}

      {{ RelatedCard(
        "Match Play",
        "Hole-by-hole head-to-head in fixed pairs. Simpler partner format without the Wolf mechanic.",
        '/games/match-play/' | url
      ) }}

      {{ RelatedCard(
        "Skins",
        "Win the hole outright to claim the skin. Simpler format — no partner decisions required.",
        '/games/skins/' | url
      ) }}

</div>

<div style="margin-top:28px;">
      <a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
