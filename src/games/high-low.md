---
layout: layouts/game-guide.njk
title: High-Low — Golf Game Guide
description: "High-Low explained: rules, handicaps, strategy, and how to run it in Marker. Every player counts every hole — the best golf team format you're not playing enough."
status: available
category: classic
order: 1
players: "4 (2v2)"
format: "Team Match"
cardDescription: "Each hole, compare the best and worst scores across two teams. Win the \"high\" ball, win the \"low\" ball, or sweep both. Marker calculates team totals and net results hole by hole."
game:
  name: High-Low
  difficulty: intermediate
  difficultyLabel: Intermediate
  subtitle: "Every player counts every hole. Compare the best and worst scores across two teams — win the low ball, win the high ball, or sweep both."
  heroSubtitleWidth: "520px"
  heroStats:
    - label: Players
      value: "4 (2v2)"
    - label: Format
      value: Team Match
    - label: Best For
      value: Weekend groups
    - label: Handicap
      value: Supported
    - label: Available In
      value: Marker
  heroCta:
    primary:
      text: Play High-Low in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play High-Low?
    body: "Set up your event in under 60 seconds. Marker handles the scoring, handicaps, and settlement — you just play golf."
    primary:
      text: Start Your First Event
      href: "https://app.marker.golf"
    secondary:
      text: Get Started with Marker
      href: "/tutorials/welcome-to-marker/"
sections:
  - id: overview
    label: Overview
  - id: how-it-works
    label: How It Works
  - id: three-matches
    label: Three Matches
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
   2. WHAT IS HIGH-LOW?
   ================================================================ #}
<section class="section section--white" id="overview">
<div class="container">

    {{ SectionHeader("Overview", "What Is High-Low?",
      "A team format where both players on a team contribute every single hole — no hiding behind your partner.") }}

<div class="gg-prose">

High-Low (also called Two-Ball or High-Low-Jack) is one of golf's most balanced team betting formats. Unlike Best Ball — where only the lowest score counts — High-Low keeps **every player engaged on every hole**. Two bets are live simultaneously: the "low ball" compares each team's best score, and the "high ball" compares each team's worst score.

The format has been a staple of country club side games since at least the 1960s. Its elegant symmetry means two points are always available on every hole, and even a struggling player's score still matters in the competition. A weak high ball from one side can hand the opponent a point they'd otherwise have to earn.

High-Low suits groups that want meaningful competition without needing to understand complex rules. It's serious enough for golfers who play for real money, accessible enough to explain in five minutes, and balanced enough that handicaps genuinely level the playing field.

<div class="gg-callout">
<p><strong>Why golfers love it:</strong> You can't coast. Even if your partner makes a birdie and locks up the low ball, your bogey or double is still competing for the high ball. Everyone plays every shot like it matters — because it does.</p>
</div>

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">2</div>
        <div class="gg-quick-stat__lbl">Points per hole</div>
</div>
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">36</div>
        <div class="gg-quick-stat__lbl">Total points (18 holes)</div>
</div>
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">4</div>
        <div class="gg-quick-stat__lbl">Players required</div>
</div>
</div>

    {{ MarkerImplNote("This guide describes how High-Low is scored in Marker. Many golf games have regional or club-specific variations. Where appropriate, those common variations are discussed later in the guide, but all scoring examples reflect Marker's implementation.") }}

</div>
</section>

{# ================================================================
   3. HOW IT WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

    {{ SectionHeader("Mechanics", "How High-Low Works",
      "Seven steps from the first tee to the final payout.") }}

<div class="gg-steps">

<div class="gg-step">
        <div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Form two teams of two</h3>
          <p>Agree on partners before the round starts. Teams stay fixed for all 18 holes. Most groups pair players of similar ability together, but mismatched teams can use handicap strokes to level the field.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Record gross (or net) scores on each hole</h3>
          <p>Every player finishes the hole and records their score. In gross play, scores are used as-is. In net play, each player's handicap strokes (allocated by Stroke Index) are subtracted before the comparison. Marker applies net strokes automatically.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Identify each team's high ball and low ball</h3>
          <p>Within each team, identify the <strong>low ball</strong> (the better, lower score) and the <strong>high ball</strong> (the worse, higher score).</p>

<table class="scoring-table" style="max-width:480px;">
<thead>
              <tr><th>Team 1</th><th>Score</th><th>Role</th></tr>
</thead>
<tbody>
              <tr><td>Player A</td><td>4</td><td>Low ball (better)</td></tr>
              <tr><td>Player B</td><td>6</td><td>High ball (worse)</td></tr>
</tbody>
</table>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Compare the low balls between teams</h3>
          <p>Each team's <strong>low ball</strong> competes against the other team's low ball. The lower score wins 1 point. If they tie, no points are awarded for that ball.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>Compare the high balls between teams</h3>
          <p>Each team's <strong>high ball</strong> competes against the other team's high ball. Again, the lower score wins 1 point. If they tie, no point is awarded.</p>
<div class="gg-callout gg-callout--info">
            <p><strong>Remember:</strong> In golf, lower is always better — even for the "high ball." The high ball is called that because it's the highest score on your team, not because a high score wins.</p>
</div>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">6</div>
<div class="gg-step__body">
<h3>Resolve splits and sweeps</h3>
          <p>Each hole has <strong>two available points</strong>: one for the <strong>Low Ball</strong> and one for the <strong>High Ball</strong>.</p>
          <p>Possible outcomes are:</p>
          <p><strong>Sweep (2–0):</strong> One team wins both balls and earns both available points.</p>
          <p><strong>Split (1–1):</strong> Each team wins one ball and earns one point.</p>
          <p><strong>One Ball Won (1–0 or 0–1):</strong> One ball is won while the other is tied. The winning team earns one point, and no point is awarded for the tied ball.</p>
          <p><strong>Halved Hole (0–0):</strong> Both the High Ball and Low Ball are tied, so no points are awarded.</p>
          <p>Marker evaluates the High Ball and Low Ball independently. If either ball is tied, no point is awarded for that ball. This allows hole results of <strong>2–0</strong>, <strong>1–1</strong>, <strong>1–0</strong>, <strong>0–1</strong>, and <strong>0–0</strong>.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">7</div>
<div class="gg-step__body">
<h3>Count up after 18 holes</h3>
          <p>Total the points from all 18 holes. The team with more points wins the match. Settlement is typically <strong>X dollars per point</strong> of the difference, or a flat bet on the match outcome. Marker shows the full settlement at the end of the round — no manual math required.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   3b. THREE MATCHES IN ONE ROUND
   Reusable section pattern for Nassau-style games (Wolf, Ryder Cup, etc.)
   ================================================================ #}
<section class="section section--white" id="three-matches">
<div class="container">

    {{ SectionHeader("Match Structure", "Three Matches in One Round",
      "Marker structures High-Low as three independent matches played simultaneously throughout the round.") }}

<div class="gg-prose">

Unlike many casual High-Low games that are settled over an entire 18-hole round, Marker treats High-Low like a traditional Nassau by creating **three separate matches**:

</div>

<div class="gg-match-grid">
<div class="gg-match-card">
        <div class="gg-match-card__label">Match 1</div>
        <div class="gg-match-card__name">Front Nine</div>
        <div class="gg-match-card__holes">Holes 1–9</div>
</div>
<div class="gg-match-card">
        <div class="gg-match-card__label">Match 2</div>
        <div class="gg-match-card__name">Back Nine</div>
        <div class="gg-match-card__holes">Holes 10–18</div>
</div>
<div class="gg-match-card">
        <div class="gg-match-card__label">Match 3</div>
        <div class="gg-match-card__name">Overall</div>
        <div class="gg-match-card__holes">All 18 Holes</div>
</div>
</div>

<div class="gg-prose">

Each match is scored independently using the same High Ball / Low Ball rules. Points accumulated on holes 1–9 determine the Front Nine result, points on holes 10–18 determine the Back Nine result, and the cumulative 18-hole total determines the Overall result — all resolved separately.

This structure allows teams to:

- Recover after a poor front nine by competing fresh on the back.
- Compete for separate Front, Back, and Overall results in a single round.
- Track three concurrent matches throughout the round.
- Set independent values for each match, just as many golfers do when playing a Nassau.

Marker maintains standings for all three matches simultaneously as scores are entered hole by hole. Standings update in real time, and at the end of the round the settlement for each match is calculated automatically.

</div>

<div class="gg-callout">
      <p><strong>Why this matters:</strong> Most groups playing casual High-Low track only a single 18-hole result. Marker's three-match structure adds strategic depth — a team that falls behind on the front nine can still win the back nine and the overall — while eliminating the bookkeeping that makes this format impractical to run manually.</p>
</div>

</div>
</section>

{# ================================================================
   4. MARKER CONFIGURATION
   ================================================================ #}
<section class="section section--white" id="configuration">
<div class="container">

    {{ SectionHeader("Setup Guide", "Configuring High-Low in Marker",
      "Everything a commissioner needs to start a High-Low event. Takes about 60 seconds.") }}

<div class="gg-config-grid">

      {{ ConfigCard(
        "Game Type",
        "Select High-Low",
        "In the Create Event flow, choose High-Low from the game list. Marker will prompt for all required settings.",
        [],
        ""
      ) }}

      {{ ConfigCard(
        "Teams",
        "2 Teams of 2",
        "Assign players to Team 1 and Team 2. Use player names that match the group — Marker displays them on the scorecard and leaderboard.",
        [],
        ""
      ) }}

      {{ ConfigCard(
        "Scoring Mode",
        "Gross vs Net",
        "Choose whether scores are compared before or after handicap strokes.",
        [
          { label: "Gross — raw scores, no adjustment", rec: false },
          { label: "Net (100%) — full handicap applied", rec: true },
          { label: "Net (85%) — partial handicap", rec: false }
        ],
        "Key Setting"
      ) }}

      {{ ConfigCard(
        "Point Values",
        "Points per Ball",
        "Set the value of each ball. The most common setup is 1 point per ball (2 available per hole), settled at a dollar amount per point.",
        [
          { label: "1 point per ball (default)", rec: true },
          { label: "Custom dollar amount per ball", rec: false }
        ],
        ""
      ) }}

      {{ ConfigCard(
        "Handicap Mode",
        "Stroke Allocation",
        "Determines how handicap strokes are distributed across the 18 holes using the Stroke Index.",
        [
          { label: "USGA Match Play allocation (default)", rec: true },
          { label: "Individual — each player gets their own strokes", rec: false }
        ],
        ""
      ) }}

      {{ ConfigCard(
        "Presses",
        "Optional Side Bets",
        "Enable presses to allow teams to start a new sub-bet mid-round. Marker tracks all active press bets simultaneously.",
        [
          { label: "No presses (simplest)", rec: true },
          { label: "Manual press — any time", rec: false },
          { label: "Auto press — when 2 down", rec: false }
        ],
        ""
      ) }}

</div>

<div class="gg-callout">
      <p><strong>Recommended first-time settings:</strong> Net scoring at 100% handicap, 1 point per ball, $5 per point, no presses. This gives every player a fair shot and keeps the math simple on the first round.</p>
</div>

    {# Expo screenshot placeholders #}
<h3 style="font-size:1rem; font-weight:600; color:var(--ink); margin-bottom:20px; margin-top:40px;">App Screens</h3>
<div class="gg-screenshot-row">
      {{ ScreenshotPlaceholder("Game Setup Screen", "iOS · Android") }}
      {{ ScreenshotPlaceholder("Live Scorecard", "iOS · Android") }}
      {{ ScreenshotPlaceholder("Hole-by-Hole Results", "iOS · Android") }}
</div>
<p style="font-size:0.78rem; color:var(--ink-light); margin-top:12px; max-width:420px;">
      Screenshots from the Marker app will appear here. <a href="https://app.marker.golf" style="color:var(--green-600);">Open Marker</a> to see High-Low in action.
</p>

</div>
</section>

{# ================================================================
   5. EXAMPLE ROUND
   ================================================================ #}
<section class="section" id="example">
<div class="container">

    {{ SectionHeader("Worked Example", "Example Round: 3 Holes",
      "Team 1 (A + B) vs Team 2 (C + D) — gross scoring, 1 point per ball.") }}

<div class="gg-prose" style="margin-bottom:28px;">

**Team 1:** Player A (HCP 8) and Player B (HCP 16) &nbsp;·&nbsp; **Team 2:** Player C (HCP 4) and Player D (HCP 20)

</div>

<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="High-Low example round">
<thead>
<tr>
            <th class="col-left">Hole</th>
            <th>Par</th>
            <th colspan="2">Team 1</th>
            <th colspan="2">Team 2</th>
            <th>High Ball</th>
            <th>Low Ball</th>
            <th>T1 Pts</th>
            <th>T2 Pts</th>
</tr>
<tr class="gg-sub-header">
            <th class="col-left"></th>
            <th></th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
</tr>
</thead>
<tbody>

          {# HOLE 1 #}
<tr>
            <td class="col-left"><strong>1</strong></td>
            <td>4</td>
            <td>4</td>
            <td class="gg-high">6</td>     {# T1 high ball #}
            <td class="gg-high">3</td>     {# T2 low ball (also T2 high is D=7) — wait, both win #}
            <td class="gg-high">7</td>
            <td class="gg-win">T1 (6)</td>  {# T1 high=6 beats T2 high=7 #}
            <td class="gg-win">T2 (3)</td>  {# T2 low=3 beats T1 low=4 #}
            <td>+1</td>
            <td>+1</td>
</tr>

          {# HOLE 2 #}
<tr>
            <td class="col-left"><strong>2</strong></td>
            <td>5</td>
            <td>5</td>
            <td class="gg-high">7</td>
            <td>6</td>
            <td class="gg-high">8</td>
            <td class="gg-sweep">T1 (7)</td>  {# T1 high=7 beats T2 high=8 #}
            <td class="gg-sweep">T1 (5)</td>  {# T1 low=5 beats T2 low=6 #}
            <td class="gg-win">+2</td>
            <td>—</td>
</tr>

          {# HOLE 3 #}
<tr>
            <td class="col-left"><strong>3</strong></td>
            <td>3</td>
            <td>3</td>
            <td class="gg-high">4</td>
            <td class="gg-high">2</td>
            <td class="gg-high">5</td>
            <td class="gg-win">T1 (4)</td>  {# T1 high=4 beats T2 high=5 #}
            <td class="gg-win">T2 (2)</td>  {# T2 low=2 beats T1 low=3 #}
            <td>+1</td>
            <td>+1</td>
</tr>

          {# TOTALS #}
<tr class="gg-totals-row">
            <td class="col-left">Total</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>—</td>
            <td>4 pts</td>
            <td>2 pts</td>
</tr>

</tbody>
</table>
</div>

<div style="margin-top:16px; display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
      <span style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--ink-muted);">
        <span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:rgba(74,124,89,0.18);border:1px solid rgba(74,124,89,0.35);"></span>
        Sweep winner
      </span>
      <span style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--ink-muted);">
        <span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:rgba(74,124,89,0.10);border:1px solid rgba(74,124,89,0.25);"></span>
        Ball winner
      </span>
      <span style="display:flex;align-items:center;gap:6px;font-size:0.8rem;color:var(--ink-muted);">
        <span style="font-weight:600;color:var(--ink);">Bold score</span> = high ball on team
      </span>
</div>

<div class="gg-callout" style="margin-top:32px;">
      <p><strong>Result:</strong> Team 1 wins 4–2. At $5 per point, Team 2 owes Team 1 <strong>$10</strong>. Marker calculates and displays this settlement automatically at the end of the round.</p>
      <p>Note: Hole 2 was a <em>sweep</em> — Team 1 won both balls. Hole 1 and Hole 3 were <em>splits</em> — each team took one ball.</p>
</div>

<div class="gg-callout gg-callout--info" style="margin-top:16px;">
      <p>This example shows scoring within a single match segment. In a full round, Marker simultaneously maintains the same point tracking for the <strong>Front Nine</strong>, <strong>Back Nine</strong>, and <strong>Overall</strong> matches — so three results like this are being calculated at all times.</p>
</div>

</div>
</section>

{# ================================================================
   6. STRATEGY TIPS
   ================================================================ #}
<section class="section section--white" id="strategy">
<div class="container">

    {{ SectionHeader("Strategy", "How to Win at High-Low",
      "The tactical layer that separates casual play from competitive High-Low.") }}

<div class="gg-tips-grid">

      {{ TipCard(
        "Defense",
        "Protect Your High Ball",
        "Your worst score on any hole is competing against the opponent's worst. Even a bogey-hacker can win the high ball if they just avoid the big number. Play conservatively when your partner is already in trouble — a 6 that beats their 7 is worth as much as any birdie."
      ) }}

      {{ TipCard(
        "Mindset",
        "Never Give Up on a Hole",
        "In Best Ball, if one player hits out of bounds, the other just carries the team. In High-Low, the struggling player's score STILL competes for the high ball. Finishing a hole instead of picking up is almost always the right call."
      ) }}

      {{ TipCard(
        "Offense",
        "Go Aggressive When You're Locked",
        "If you and your partner both have solid scores by the time you reach the green, one of you can take an aggressive line. You may already have the low ball — go for the birdie to cement it or put the opponent's low ball under pressure."
      ) }}

      {{ TipCard(
        "Handicap Awareness",
        "Know Your Stroke Holes",
        "With net scoring, identify which holes your team gets strokes on before the round starts. On a Stroke Index 1 hole, your higher-handicap partner might be your low ball maker — and that changes your entire approach strategy on that hole."
      ) }}

      {{ TipCard(
        "Communication",
        "Talk to Your Partner",
        "High-Low rewards teams that communicate. Call your score early so your partner knows whether they're playing for the low ball, covering the high ball, or going for broke. A quick '5, you need a 6 or better' changes how your partner plays the hole."
      ) }}

      {{ TipCard(
        "Common Mistakes",
        "Don't Forget the High Ball",
        "Beginners focus almost entirely on winning the low ball and forget the high ball is also a point. You can win a hole 1–1 (split) or lose 0–2 (get swept) depending entirely on how the high ball resolves. Track both — Marker does this automatically."
      ) }}

</div>

</div>
</section>

{# ================================================================
   7. HANDICAP CONSIDERATIONS
   ================================================================ #}
<section class="section" id="handicaps">
<div class="container">

    {{ SectionHeader("Handicaps", "Handicap Considerations",
      "How to level the playing field in High-Low — from casual groups to competitive clubs.") }}

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option">
        <div class="gg-hdcp-option__name">Gross</div>
        <div class="gg-hdcp-option__desc">Scores compared as recorded. No adjustments. Suits groups of similar ability where handicaps would create more confusion than fairness.</div>
</div>

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">
          Net (100%)
          <span class="gg-hdcp-rec-badge">Recommended</span>
</div>
        <div class="gg-hdcp-option__desc">Full Course Handicap is applied. Strokes allocated by Stroke Index, one per hole until the handicap is exhausted. Best for mixed-ability groups.</div>
</div>

<div class="gg-hdcp-option">
        <div class="gg-hdcp-option__name">Net (85%)</div>
        <div class="gg-hdcp-option__desc">Use 85% of each player's Course Handicap. Common in money games to reduce the advantage for higher-handicappers. Calculate: floor(hdcp × 0.85).</div>
</div>

</div>

<div class="gg-prose">

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:14px; margin-top:8px;">Match Play Stroke Allocation</h3>

In High-Low (net), strokes are typically allocated using the **Match Play method**: find the lowest handicap among all four players, then give each other player the difference. This means the scratch player gives no strokes, while the 20-handicapper might receive 16+ strokes across the round.

Marker uses the USGA Stroke Index allocation by default. Strokes are distributed one per hole, starting with the hardest holes (SI 1, 2, 3…) until each player's stroke allocation is used up.

<div class="gg-callout gg-callout--info">
<p>For a detailed explanation of all handicap modes in Marker — including how to set stroke allowances and choose between individual vs. match play allocation — see the <a href="{{ '/tutorials/handicap-settings/' | url }}">Handicap Settings guide</a>.</p>
</div>

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:14px; margin-top:32px;">Why Net High-Low Is More Competitive</h3>

In gross High-Low, the team with the two best players will almost always win. Net play genuinely changes the dynamic: the higher-handicapper's stroke-adjusted score can become the team's low ball on certain holes, and their worst hole is suddenly much less damaging. This makes the format viable for groups with a wide range of abilities.

</div>

</div>
</section>

{# ================================================================
   8. VARIATIONS
   ================================================================ #}
<section class="section section--white" id="variations">
<div class="container">

    {{ SectionHeader("Variations", "Common High-Low Variations",
      "Regional twists and add-ons that many clubs layer on top of the standard format.") }}

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
</div>
<div class="gg-variation__body">
<h4>Low Ball Only (Two-Ball)</h4>
          <p>Skip the high ball entirely. Only each team's best score competes. Simpler and works with any even number of players. The standard Best Ball format is a version of this.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 6 10.5 15.5 15.5 10.5 23 18"/></svg>
</div>
<div class="gg-variation__body">
<h4>High Ball Only</h4>
          <p>Only the worst scores compete. Unusual but sometimes used as a "penalty round" format where the goal is to avoid blowup holes rather than make birdies.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<div class="gg-variation__body">
<h4>High-Low + Nassau</h4>
          <p>Layer a Nassau bet on top: each nine (and the full 18) has its own running High-Low total. Front, back, and overall are all separate bets. Marker tracks all three simultaneously.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
</div>
<div class="gg-variation__body">
<h4>Manual Press</h4>
          <p>Any team that falls 2+ points behind can call a "press" to start a new sub-bet. The original bet continues in parallel. Press bets typically pay the same as the original bet.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Auto Press</h4>
          <p>A press is automatically triggered when a team falls a specified number of points behind (typically 2). Marker can be configured to detect and record automatic presses as you play.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
</div>
<div class="gg-variation__body">
<h4>Sweep Bonus</h4>
          <p>Award a bonus point (or extra dollar amount) when one team sweeps a hole. Makes sweeps dramatically more valuable and adds an extra strategic dimension for aggressive play.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   9. WHY USE MARKER?
   ================================================================ #}
<section class="section section--dark" id="why-marker">
<div class="container">

    {{ SectionHeader("Marker App", "Why Run High-Low in Marker?",
      "Four players, two balls, 18 holes of running totals. Marker handles all of it automatically.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Handicaps Without the Headache</h4>
        <p>Marker knows the Stroke Index for every course. It allocates handicap strokes hole-by-hole and adjusts each player's score automatically. No spreadsheet, no argument about which holes get strokes.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<h4>Live Scores After Every Hole</h4>
        <p>The moment all four players enter their scores, Marker computes the high ball, low ball, and running point total. Everyone can see exactly where the match stands from their own phone.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
</div>
<h4>Front, Back, and Overall — All at Once</h4>
        <p>Marker automatically tracks Front Nine, Back Nine, and Overall High-Low matches simultaneously. All three standings update in real time after every hole, with no additional setup or manual tallying required.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
</div>
<h4>No Math Errors</h4>
        <p>With four players and two simultaneous bets, it's surprisingly easy to miscalculate high balls, misapply strokes, or lose track of the running total. Marker eliminates all of it. Every calculation is verified and transparent.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Instant Settlement</h4>
        <p>At the end of the round, Marker shows exactly who owes whom — and how much. If you're running presses or a Nassau on top, those are all calculated together. Everyone walks off the 18th with a clean number.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
</div>
<h4>Works on Any Device</h4>
        <p>iPhone, Android, iPad, or web browser — every player uses the device they prefer. Scores sync in real time across the entire group. No one needs to be on the same platform.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<h4>Start in Under 60 Seconds</h4>
        <p>Create an event, add players, pick High-Low, and tee off. Marker handles the rest. The commissioner doesn't need to know the Stroke Index table or remember how to handle a press — it's all built in.</p>
</div>

</div>

<div style="margin-top:40px; text-align:center;">
      <a href="https://app.marker.golf" class="btn btn-primary">Try Marker Free</a>
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
        <summary>Can High-Low be played with handicaps?</summary>
<div class="gg-faq-body">
          <p>Yes — net High-Low is actually the most common version among mixed-ability groups. Marker supports full handicap (100%), partial (85%), and gross play. You choose the mode when setting up the event. See the <a href="{{ '/tutorials/handicap-settings/' | url }}">Handicap Settings guide</a> for more detail.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>What happens when both teams tie on a ball?</summary>
<div class="gg-faq-body">
          <p>If both teams have the same high ball score (or the same low ball score), that specific ball is <strong>halved</strong> — no points awarded for it. A hole can end 1–0, 0–1, 1–1, 2–0, or 0–0. Ties are not carried over to the next hole in standard High-Low.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>What happens if one player picks up and doesn't finish a hole?</summary>
<div class="gg-faq-body">
          <p>The player's score should be recorded as a pickup score — typically the maximum score allowed under your group's rules (e.g., net double bogey by USGA rules, or a negotiated maximum like triple bogey). Marker lets any player record a pickup score from the scorecard, and it uses that score in the High-Low comparison just like any other score.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Can you combine High-Low with Nassau?</summary>
<div class="gg-faq-body">
          <p>Yes — this is a popular combination at many clubs. A Nassau adds three separate bets: front 9, back 9, and the full 18. High-Low runs within each of those bets, and they're all tracked simultaneously. Marker supports layering these games together in a single event. Each nine resolves independently at the turn.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Is High-Low better than Best Ball?</summary>
<div class="gg-faq-body">
          <p>They serve different purposes. <strong>Best Ball</strong> rewards teams with one dominant player who can carry the partner. <strong>High-Low</strong> keeps both players engaged throughout the round — you can't ignore your score just because your partner has a great hole. If you want a format where every player feels accountable, High-Low is the better choice. If you want a more forgiving format where one player can bail out the other, Best Ball is simpler.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>How many points can be won per hole?</summary>
<div class="gg-faq-body">
          <p><strong>2 points maximum per hole</strong> — 1 for the high ball and 1 for the low ball. A sweep (winning both balls on the same hole) earns 2 points. A split earns 1 point to each team. Ties on a ball result in 0 points for that ball.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Do I need exactly 4 players?</summary>
<div class="gg-faq-body">
          <p>Yes — standard High-Low requires exactly 4 players in a 2v2 format. For 3 players, consider <a href="{{ '/games/nines/' | url }}">Nines</a>. For larger groups or rotating partners, consider <a href="{{ '/games/skins/' | url }}">Skins</a> or a Ryder Cup format.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Can High-Low be played in stroke play format?</summary>
<div class="gg-faq-body">
          <p>High-Low is inherently a <strong>hole-by-hole match play format</strong> — you compare scores on each hole separately and accumulate points. For total-stroke competitions across 18 holes, see <a href="{{ '/games/stroke-play/' | url }}">Stroke Play</a> or <a href="{{ '/games/team-stroke-play/' | url }}">Team Stroke Play</a>.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Can High-Low be played with more than 4 players?</summary>
<div class="gg-faq-body">
          <p>Not in the standard 2v2 format. However, some groups adapt it into a 3v3 format using the three-ball variant (comparing best, middle, and worst scores). Marker's standard High-Low implementation covers the 2v2 format. Ask your commissioner about custom configurations for larger groups.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>What's a reasonable bet size for High-Low?</summary>
<div class="gg-faq-body">
          <p>That's entirely up to your group. <strong>$1–5 per point</strong> is common for casual weekend games and makes for a meaningful but not stressful bet — with 36 points possible over 18 holes, a 10-point swing is plausible. Higher-stakes groups often play $10–25 per point with a sweep bonus on top. Start low your first round until everyone's comfortable with the format.</p>
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
      "High-Low pairs well with these formats — or try them standalone.") }}

<div class="gg-related-grid">

      {{ RelatedCard(
        "Nassau",
        "Three bets in one — front, back, and 18. Layers naturally on top of High-Low.",
        '/games/nassau/' | url
      ) }}

      {{ RelatedCard(
        "Match Play",
        "Classic hole-by-hole head-to-head. Simpler than High-Low with a single bet per hole.",
        '/games/match-play/' | url
      ) }}

      {{ RelatedCard(
        "Wolf",
        "Per-hole partner selection adds another layer of strategy to every tee shot.",
        '/games/wolf/' | url
      ) }}

      {{ RelatedCard(
        "Skins",
        "Win a hole outright to claim the pot. Ties carry over — drama builds all round.",
        '/games/skins/' | url
      ) }}

</div>

<div style="margin-top:28px;">
      <a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
