---
layout: layouts/game-guide.njk
title: TeamCountX Golf Game — Rules, Strategy & How to Play | Marker
description: "TeamCountX explained: team stroke play where each team selects X scores to count from all player-hole combinations. Strategic, flexible, and ideal for groups of any size."
status: available
category: featured
order: 4
players: "4+"
format: "Team Stroke Play"
cardDescription: "Each team collects every player's score on every hole, then selects exactly X of them to count. Choose which scores to include, discard the rest. Lowest net total wins. Works for any team size."
game:
  name: TeamCountX
  difficulty: intermediate
  difficultyLabel: Intermediate
  subtitle: "Each team collects all of its players' scores on every hole — then selects exactly X of them to count toward the team total. Choose wisely. Discard the rest. Lowest total wins."
  heroSubtitleWidth: "560px"
  heroStats:
    - label: Players
      value: "4+"
    - label: Teams
      value: "2+"
    - label: Format
      value: Team Stroke Play
    - label: Best For
      value: "Groups & outings"
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
    heading: Ready to Play TeamCountX?
    body: "Set up your teams and count target in Marker before you tee off. Score selection, quota tracking, net handicaps, and leaderboard — all handled automatically."
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
  - id: choosing-x
    label: Choosing X
  - id: making-selections
    label: Making Selections
  - id: forced-count
    label: Forced Count
  - id: scoring
    label: Scoring
  - id: configuration
    label: Setup in Marker
  - id: example
    label: Example Holes
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
  TeamCountX game guide — uses the canonical game-guide template.

  Implementation verified against:
    app/src/games/team-count-x/index.js          — scoring engine
    app/src/games/team-count-x/components/
      Form.vue                                   — commissioner settings form
      CountActionModal.vue                       — in-round score selection UI
      HoleSummary.vue                            — scorecard cell per team × hole
      Leaderboard.vue                            — leaderboard columns and ranking
    app/tests/unit/games/team-count-x.spec.js   — unit tests
    app/tests/unit/games/team-count-x-creation.spec.js
    app/src/lib/golf/teams.js                   — team configuration utilities

  Verified implementation details:
    - X (countTotal): total scores each team selects across the ENTIRE round, not per hole
    - Formula: teamSize × holeCount = total possible; X = how many to count
    - Example: 2 players × 18 holes = 36 possible; count 24 means discard 12
    - Teams: 2–5 players per team; min 4 total players (2v2 minimum); uneven groups supported via blind draws
    - Scoring: pure cumulative stroke play; teams ranked by net to-par of selected scores (totalToPar)
    - No per-hole points, no match play, no Nassau/Front-Back-Overall structure
    - Net default; full handicap options (same parameter set as Wolf/High-Low)
    - Forced count: when remaining unselected opportunities ≤ remaining quota, all must be counted
    - Quota guard: CountActionModal blocks selection beyond countTotal with an inline warning
    - Leaderboard columns: Place | Team | Thru | Selected (e.g. 14/24) | To Par | Amount
    - hideLeaderboard: optional commissioner setting; conceals standings until round locked
    - Accounting: pool model — buy-in per player, winner-take-all by default, configurable payouts
    - Blind draws: fill uneven team slots; excluded from scoring and payout
    - Multi-card: teams can span multiple scoring groups/scorecards
    - premium: true
#}

{% from "components/game-guide.njk" import SectionHeader, ConfigCard, ScreenshotPlaceholder, TipCard, RelatedCard, MarkerImplNote %}

{# ================================================================
   2. OVERVIEW
   ================================================================ #}
<section class="section section--white" id="overview">
<div class="container">

    {{ SectionHeader("Overview", "What Is TeamCountX?",
      "Select exactly X of your team's Y possible scores as the round progresses — one locked decision per hole.") }}

<div class="gg-prose">

TeamCountX is strategic team stroke play built around a single constraint: each team must choose exactly X scores from Y total possible to form its final team total. Every player scores every hole individually, generating one score per player per hole — a 2-player team accumulates 36 scores over 18 holes; a 3-player team accumulates 54. The commissioner sets X before the round begins. Each team selects exactly X of their scores to count toward their total. The rest are discarded.

The critical rule is _when_ those decisions happen. Teams choose hole by hole, right after scores are entered — not at the end of the round. Once a hole is saved in Marker, that hole's selections are locked. There is no going back to change an earlier hole after seeing what happens on a later one.

This creates a sustained strategic tension across all 18 holes. Count too many scores early and you may be forced to include poor scores later when Forced Count kicks in. Save too many selections and you leave good scores behind as the round ends. Every hole is a live decision: count this score now, or preserve the remaining quota for a better score later.

<div class="gg-callout">
<p><strong>Marker handles the math:</strong> Marker tracks each team's remaining selections throughout the round, displays the live Selected&thinsp;/&thinsp;X count on the leaderboard, and automatically enforces Forced Count when a team no longer has enough remaining opportunities to discard.</p>
</div>

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">X</div>
        <div class="gg-quick-stat__lbl">Scores counted</div>
</div>
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">2–5</div>
        <div class="gg-quick-stat__lbl">Players per team</div>
</div>
<div class="gg-quick-stat">
        <div class="gg-quick-stat__val">0</div>
        <div class="gg-quick-stat__lbl">Per-hole points</div>
</div>
</div>

    {{ MarkerImplNote("TeamCountX is fully supported in Marker. The commissioner sets the count target and teams before the round. During play, each team uses the in-app selection modal to choose which scores to count. Marker tracks the running total, enforces the quota, and updates the leaderboard automatically.") }}

<div class="gg-quick-rules">
      <div class="gg-quick-rules__title">Quick Rules</div>
<ol>
        <li><strong>Set up teams</strong> before the round — 2 to 5 players per team. Every player scores every hole individually.</li>
        <li><strong>Set Count X</strong> — the total number of individual scores each team must select across the full 18 holes. (A 2-player team: 36 possible, count 24 is common.)</li>
        <li><strong>After each hole</strong>, each team decides which of its players' scores to count. Choices lock when the hole is saved — no changing them after later holes are played.</li>
        <li><strong>Quota</strong>: once a team has selected X scores total, counting is complete. Forced Count activates if remaining opportunities equal remaining quota.</li>
        <li><strong>After 18 holes</strong>, the team with the lowest cumulative net-to-par from their selected scores wins.</li>
</ol>
</div>

</div>
</section>

{# ================================================================
   3. HOW IT WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

    {{ SectionHeader("Mechanics", "How TeamCountX Works",
      "Five phases from setup to settlement.") }}

<div class="gg-steps">

<div class="gg-step">
        <div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Commissioner sets the count target and teams</h3>
          <p>Before the round, the commissioner opens Marker, selects TeamCountX, divides players into teams, and enters <strong>Count X</strong> — the number of individual scores each team must select across the entire 18 holes. The count target is calculated relative to the total possible:</p>
<div class="scoring-table-wrap" style="max-width:480px; margin-top:14px;">
<table class="scoring-table" style="margin:0;">
            <thead><tr><th>Team size</th><th>Total possible (18 holes)</th><th>Example X</th><th>Scores discarded</th></tr></thead>
<tbody>
              <tr><td>2 players</td><td>36</td><td>24</td><td>12</td></tr>
              <tr><td>3 players</td><td>54</td><td>36</td><td>18</td></tr>
              <tr><td>4 players</td><td>72</td><td>48</td><td>24</td></tr>
              <tr><td>5 players</td><td>90</td><td>60</td><td>30</td></tr>
</tbody>
</table>
</div>
          <p style="margin-top:10px;">X can be any value from 1 to the total possible. The examples above discard one-third of scores — a common starting point. Groups can adjust X freely to make the format more or less selective.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Every player posts a score on every hole</h3>
          <p>All players play their own ball for the full round. No alternate shot, no scramble. Each player's score on each hole is recorded in Marker individually — the team collects one score per player per hole as raw material for selection.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Teams select which scores to count, hole by hole</h3>
          <p>After scores are posted for a hole, each team taps their hole cell in Marker to open the <strong>selection modal</strong>. They see all their players' scores for that hole and choose which ones to include in their running total. Any combination is valid — count both, count one, count neither — as long as the team stays within their overall quota.</p>
<div class="gg-callout gg-callout--info">
            <p><strong>Selections lock when a hole is saved.</strong> Teams can adjust checkboxes freely before tapping Save — but once the hole is saved, those choices are permanent. There is no rule about how many scores to count on any given hole, but the decision for each hole must be made before moving on. The strategic question is always present-tense: count this score now, or skip it and preserve quota for a better score on a future hole?</p>
</div>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Quota fills toward X as the round progresses</h3>
          <p>Marker tracks each team's running count on the leaderboard, displayed as <strong>Selected / X</strong> (e.g., "14 / 24"). Teams can always see how many selections they've used and how many remain. As the quota nears, teams enter <strong>Forced Count</strong> — a state where every remaining unselected score must be counted to reach X.</p>
</div>
</div>

<div class="gg-step">
        <div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>Lowest net-to-par from selected scores wins</h3>
          <p>When the round ends, each team's selected scores are summed against par. The team with the lowest cumulative net-to-par wins. No per-hole points, no match play, no carryovers — pure stroke play across the scores each team chose to count.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   4. CHOOSING X
   ================================================================ #}
<section class="section section--white" id="choosing-x">
<div class="container">

    {{ SectionHeader("The Count", "Choosing Your Count X",
      "The most important configuration decision — and how to get it right.") }}

<div class="gg-prose">

X is the most consequential number in TeamCountX. Set it too high and the format becomes indistinguishable from straight stroke play — every score counts anyway. Set it too low and the format becomes a scramble-like best-ball where bad holes never matter. The goal is a count that creates meaningful discard opportunities without eliminating the pressure of consistency.

A practical rule of thumb: count **two-thirds of possible scores**. For a 2-player team over 18 holes (36 possible), count 24. For a 3-player team (54 possible), count 36. This lets each team discard roughly one in three scores — enough to rescue a bad hole, not enough to rescue a bad round.

</div>

<div class="scoring-table-wrap" style="max-width:640px; margin-top:8px; margin-bottom:28px;">
<table class="scoring-table" style="margin:0;">
<thead>
<tr>
          <th>If you want…</th>
          <th>Set X at…</th>
          <th>Effect</th>
</tr>
</thead>
<tbody>
<tr>
          <td>Occasional relief valves</td>
          <td>~⅔ of possible</td>
          <td>Discard one-third of scores. Most holes count; disasters can be dropped.</td>
</tr>
<tr>
          <td>High-drama eliminations</td>
          <td>~½ of possible</td>
          <td>Discard half. Teams can strategically build a very low total, but quota pressure hits early.</td>
</tr>
<tr>
          <td>Best ball with depth</td>
          <td>~18 (one per hole)</td>
          <td>Exactly one score per hole, team's choice. Similar to best-ball but cross-hole flexibility remains.</td>
</tr>
<tr>
          <td>Near-stroke play</td>
          <td>Near the total possible</td>
          <td>Almost all scores count. Small discard buffer only. Good for scratch groups.</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-callout">
      <p><strong>First-time groups:</strong> Start with ⅔ of your total possible. You can always adjust X for the next round once the group has a feel for how quota pressure plays out over 18 holes.</p>
</div>

</div>
</section>

{# ================================================================
   5. MAKING SELECTIONS
   ================================================================ #}
<section class="section" id="making-selections">
<div class="container">

    {{ SectionHeader("In-Round Decisions", "Making Selections",
      "How teams choose which scores to count during the round.") }}

<div class="gg-prose">

During the round, score selection in Marker is handled through the **Count modal** — a slide-up panel that appears when a team member taps their hole cell on the scorecard. The modal shows all of the team's players along with their scores for that hole, each with a checkbox.

Checking a player's name adds their score to the team's running total. Unchecking removes it. Teams can revise selections up until the hole is saved — but once saved, the choices are committed.

</div>

<div class="gg-callout gg-callout--info">
      <p><strong>Quota enforcement:</strong> If a team has already reached their count target and attempts to check another score, Marker blocks the selection and flashes a warning: "You've already selected N scores — your team's limit." No accidental overcounting.</p>
</div>

<div class="gg-prose" style="margin-top:28px;">

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:12px;">What to Consider on Each Hole</h3>

- **How good is this score?** A score at or under net par is almost always worth counting. A bogey or worse is a candidate to skip — unless quota pressure forces it.
- **How many selections remain?** If you have 10 selections left but 12 holes remaining with 2 players each (24 opportunities), you can still afford to skip a few. If you have 3 selections left and 6 opportunities remaining, you have to be more selective about what you pass on.
- **How is your opponent tracking?** A team that's well ahead might play it conservative and bank safe scores. A trailing team may skip a mediocre hole and hope for a late birdie run — but once a hole is saved, that skip is final. The comeback has to come from future holes, not from revisiting earlier ones.

</div>

<h3 style="font-size:1rem; font-weight:600; color:var(--ink); margin-bottom:20px; margin-top:36px;">App Screens</h3>
<div class="gg-screenshot-row">
      {{ ScreenshotPlaceholder("Score Selection Modal", "iOS · Android") }}
      {{ ScreenshotPlaceholder("Team Scorecard View", "iOS · Android") }}
      {{ ScreenshotPlaceholder("Live Leaderboard", "iOS · Android") }}
</div>

</div>
</section>

{# ================================================================
   6. FORCED COUNT
   ================================================================ #}
<section class="section section--white" id="forced-count">
<div class="container">

    {{ SectionHeader("Forced Count", "When Every Remaining Score Must Count",
      "The quota pressure that defines the back nine.") }}

<div class="gg-prose">

Forced Count is the moment TeamCountX becomes a race against your own quota. It activates when a team's remaining unselected scoring opportunities equal exactly the number of selections they still need to reach X.

At that point, there is no more choosing. Every remaining player score on every remaining hole **must** be counted — because if you skip any, you'll fall short of X by the time the round ends.

</div>

<div class="gg-callout gg-callout--info">
      <p><strong>Example:</strong> A 2-player team needs 24 of 36 scores (discarding 12). After 15 holes, they've counted 18 scores and skipped 12 — all of their discards are used up. They have 3 holes left × 2 players = 6 opportunities remaining, and they need exactly 6 more counts. Every remaining score must be included, good or bad. Marker recognizes this state and labels the remaining holes with an "all must count" indicator.</p>
</div>

<div class="gg-prose" style="margin-top:24px;">

Forced Count has two strategic implications:

- **Use discards early, not late.** Teams that skip freely in the first few holes often hit Forced Count on the back nine when courses get harder. Save at least a few discards for 16, 17, and 18.
- **Opponent forced count is an opportunity.** If you know an opponent has entered Forced Count and is about to count several bogeys, you can afford to be patient and lock in only your best scores.

</div>

</div>
</section>

{# ================================================================
   7. SCORING
   ================================================================ #}
<section class="section" id="scoring">
<div class="container">

    {{ SectionHeader("Scoring", "How Teams Are Ranked",
      "Pure cumulative stroke play — lowest net-to-par of selected scores wins.") }}

<div class="gg-prose">

TeamCountX is stroke play, not match play. There are no points per hole, no skins, no carryovers. Teams are ranked by the cumulative **net-to-par** of all their selected scores. The team with the lowest total — the most under par — wins the round.

The math works like this: each selected score contributes <code>(net score − par)</code> to the team total. A net birdie on a par 4 is −1. A net bogey on a par 3 is +1. The running total of those values, across all selected entries, is the team's current standing.

</div>

<div class="gg-callout">
      <p><strong>Net vs gross:</strong> If net scoring is enabled (the default), Marker applies each player's handicap allocation before comparing to par. If handicap is disabled, net equals gross and all scores are compared raw. The format and ranking logic are identical in both cases — only the score values change.</p>
</div>

<div class="gg-prose" style="margin-top:28px;">

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:12px;">The Leaderboard</h3>

Marker displays the live TeamCountX leaderboard with these columns:

</div>

<table class="scoring-table" style="max-width:680px; margin-top:8px; margin-bottom:16px;">
<thead>
        <tr><th>Column</th><th>What it shows</th></tr>
</thead>
<tbody>
        <tr><td><strong>Place</strong></td><td>Team rank — sorted by to-par, ascending (lower is better)</td></tr>
        <tr><td><strong>Team</strong></td><td>Player names on the team</td></tr>
        <tr><td><strong>Thru</strong></td><td>Last hole with any played or selected data</td></tr>
        <tr><td><strong>Selected</strong></td><td>Scores counted so far vs. target (e.g., <strong>14 / 24</strong>)</td></tr>
        <tr><td><strong>To Par</strong></td><td>Net-to-par of all selected scores, shown as +N, −N, or E</td></tr>
        <tr><td><strong>Amount</strong></td><td>Dollar settlement (shown only if a buy-in amount is configured)</td></tr>
</tbody>
</table>

<div class="gg-callout gg-callout--info">
      <p><strong>Hidden leaderboard option:</strong> Commissioners can enable "Hide Leaderboard" when creating the event. When active, standings are not visible to players during the round — only revealed once the round is finalized. This prevents teams from gaming their selections based on live opponent scores.</p>
</div>

<div class="gg-prose" style="margin-top:28px;">

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:12px;">Settlement</h3>

If a dollar amount is configured, TeamCountX uses a **pool model**: each player pays a fixed buy-in, all amounts go into a pot, and the pot is distributed to teams by place. By default, the winning team takes the entire pool. For multi-team events the commissioner can configure a dollar amount for each finishing position (e.g., $100 for first, $50 for second). Payout is split equally among non-blind members of each winning team.

</div>

</div>
</section>

{# ================================================================
   8. SETUP IN MARKER
   ================================================================ #}
<section class="section section--white" id="configuration">
<div class="container">

    {{ SectionHeader("Setup Guide", "Configuring TeamCountX in Marker",
      "What a commissioner sets up before the round. Takes about two minutes.") }}

<div class="gg-config-grid">

      {{ ConfigCard(
        "Teams",
        "Divide Players Into Teams",
        "Assign all players to teams of 2–5. Marker can auto-seed teams randomly or the commissioner can assign manually. For uneven group sizes, add a Blind Draw slot — a virtual player excluded from scoring and payout.",
        [
          { label: "2–3 players per team (most common)", rec: true },
          { label: "4–5 players per team (larger outings)", rec: false },
          { label: "Uneven teams — use blind draw slot", rec: false }
        ],
        "Key Setting"
      ) }}

      {{ ConfigCard(
        "Count X",
        "Scores Each Team Must Count",
        "Set the total number of individual player-hole scores each team will count across the full round. Any value from 1 to the total possible (teamSize × 18). Teams can count different scores, but must hit the same X target.",
        [
          { label: "~⅔ of total possible (recommended starting point)", rec: true },
          { label: "~½ of total possible (more strategic)", rec: false },
          { label: "One per hole (best-ball equivalent)", rec: false }
        ],
        "Key Setting"
      ) }}

      {{ ConfigCard(
        "Scoring Mode",
        "Net vs Gross",
        "Whether handicap strokes are applied before scores are compared to par.",
        [
          { label: "Net — handicap applied (default)", rec: true },
          { label: "Gross — raw scores, no adjustment", rec: false }
        ],
        ""
      ) }}

      {{ ConfigCard(
        "Handicap Allowance",
        "Percentage of Handicap",
        "Fraction of each player's Course Handicap to apply. Free-form 0–100. 100% is standard; 85% is common in competitive events.",
        [
          { label: "100% — full handicap (default)", rec: true },
          { label: "85% — partial (common in events)", rec: false },
          { label: "Any value 0–100", rec: false }
        ],
        ""
      ) }}

      {{ ConfigCard(
        "Buy-in",
        "Pool Prize & Payouts",
        "Optional dollar amount per player. All buy-ins pool together. Winner takes all by default — configure payout amounts by place for split prizes.",
        [
          { label: "No amount — track scores only", rec: false },
          { label: "Fixed buy-in, winner takes all", rec: true },
          { label: "Fixed buy-in, split prizes by finishing position", rec: false }
        ],
        ""
      ) }}

      {{ ConfigCard(
        "Leaderboard",
        "Visibility During Round",
        "Control whether teams can see standings while the round is in progress.",
        [
          { label: "Visible — live standings during play (default)", rec: true },
          { label: "Hidden — revealed only after round is finalized", rec: false }
        ],
        ""
      ) }}

</div>

<div class="gg-callout" style="margin-top:8px;">
      <p><strong>Recommended first-time settings:</strong> 2–3 players per team, count X at ⅔ of total possible, net scoring at 100% handicap, visible leaderboard. Play a round before adding buy-ins or hidden leaderboard — the format takes one round to feel intuitive.</p>
</div>

</div>
</section>

{# ================================================================
   9. EXAMPLE HOLES
   ================================================================ #}
<section class="section" id="example">
<div class="container">

    {{ SectionHeader("Worked Example", "Example: 3 Holes",
      "Team Alpha vs Team Bravo — 2v2, Count X = 24, net scoring.") }}

<div class="gg-prose" style="margin-bottom:24px;">

**Setup:** 4 players, 2 teams, Count X = 24 of 36 possible (each team may discard up to 12 scores across the round).

Team Alpha: Alex (HCP 6) and Beth (HCP 14) &nbsp;·&nbsp; Team Bravo: Carlos (HCP 2) and Diana (HCP 18)

Net scores shown. Each team's selection decision appears in the "Team counts" row.

</div>

    {# ── Hole 1 ──────────────────────────────────────── #}
<div style="margin-bottom:36px;">
<h3 style="font-size:1rem; font-weight:700; color:var(--ink); margin-bottom:14px;">Hole 1 — Par 4</h3>
<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="TeamCountX example hole 1">
<thead>
<tr>
              <th class="col-left">Player</th>
              <th>Gross</th>
              <th>Net</th>
              <th>vs Par</th>
              <th>Team counts?</th>
</tr>
</thead>
<tbody>
<tr>
              <td class="col-left"><strong>Alex</strong> (Alpha)</td>
              <td>4</td>
              <td class="gg-win">4</td>
              <td class="gg-win">E</td>
              <td class="gg-win">✓ Count</td>
</tr>
<tr>
              <td class="col-left"><strong>Beth</strong> (Alpha)</td>
              <td>7</td>
              <td>6</td>
              <td class="gg-tie">+2</td>
              <td>Skip</td>
</tr>
<tr>
              <td class="col-left"><strong>Carlos</strong> (Bravo)</td>
              <td>3</td>
              <td class="gg-sweep">3</td>
              <td class="gg-sweep">−1</td>
              <td class="gg-sweep">✓ Count</td>
</tr>
<tr>
              <td class="col-left"><strong>Diana</strong> (Bravo)</td>
              <td>6</td>
              <td>5</td>
              <td class="gg-tie">+1</td>
              <td>Skip</td>
</tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-top:12px; max-width:720px;">
        <p><strong>Alpha:</strong> Counts Alex's par. Skips Beth's double bogey. Running: <strong>E</strong>, selected 1/24.</p>
        <p><strong>Bravo:</strong> Counts Carlos's birdie. Skips Diana's bogey. Running: <strong>−1</strong>, selected 1/24.</p>
        <p style="font-size:0.82rem; color:var(--ink-muted); margin-top:4px;">Both teams used one of their 12 available discards here. Bravo leads by 1 after a birdie.</p>
</div>
</div>

    {# ── Hole 2 ──────────────────────────────────────── #}
<div style="margin-bottom:36px;">
<h3 style="font-size:1rem; font-weight:700; color:var(--ink); margin-bottom:14px;">Hole 2 — Par 5</h3>
<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="TeamCountX example hole 2">
<thead>
<tr>
              <th class="col-left">Player</th>
              <th>Gross</th>
              <th>Net</th>
              <th>vs Par</th>
              <th>Team counts?</th>
</tr>
</thead>
<tbody>
<tr>
              <td class="col-left"><strong>Alex</strong> (Alpha)</td>
              <td>5</td>
              <td class="gg-win">4</td>
              <td class="gg-sweep">−1</td>
              <td class="gg-sweep">✓ Count</td>
</tr>
<tr>
              <td class="col-left"><strong>Beth</strong> (Alpha)</td>
              <td>6</td>
              <td class="gg-win">5</td>
              <td class="gg-win">E</td>
              <td class="gg-win">✓ Count</td>
</tr>
<tr>
              <td class="col-left"><strong>Carlos</strong> (Bravo)</td>
              <td>7</td>
              <td>6</td>
              <td class="gg-tie">+1</td>
              <td>Skip</td>
</tr>
<tr>
              <td class="col-left"><strong>Diana</strong> (Bravo)</td>
              <td>6</td>
              <td class="gg-win">5</td>
              <td class="gg-win">E</td>
              <td class="gg-win">✓ Count</td>
</tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-top:12px; max-width:720px;">
        <p><strong>Alpha:</strong> Both scores are good — counts both (−1 and E). Running: <strong>−1</strong>, selected 3/24. Alpha used no discards this hole.</p>
        <p><strong>Bravo:</strong> Carlos had a rough par 5 (+1). Skips Carlos, counts Diana (E). Running: <strong>−1</strong>, selected 2/24. Bravo used another discard.</p>
        <p style="font-size:0.82rem; color:var(--ink-muted); margin-top:4px;">After 2 holes: tied at −1. But Alpha has counted 3 scores; Bravo has counted only 2. Alpha is "on pace" (needing roughly 1.33 per hole); Bravo is running behind pace and will need to count more aggressively later.</p>
</div>
</div>

    {# ── Hole 3 ──────────────────────────────────────── #}
<div style="margin-bottom:28px;">
<h3 style="font-size:1rem; font-weight:700; color:var(--ink); margin-bottom:14px;">Hole 3 — Par 3</h3>
<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="TeamCountX example hole 3">
<thead>
<tr>
              <th class="col-left">Player</th>
              <th>Gross</th>
              <th>Net</th>
              <th>vs Par</th>
              <th>Team counts?</th>
</tr>
</thead>
<tbody>
<tr>
              <td class="col-left"><strong>Alex</strong> (Alpha)</td>
              <td>4</td>
              <td>4</td>
              <td class="gg-tie">+1</td>
              <td>Skip</td>
</tr>
<tr>
              <td class="col-left"><strong>Beth</strong> (Alpha)</td>
              <td>3</td>
              <td class="gg-sweep">2</td>
              <td class="gg-sweep">−1</td>
              <td class="gg-sweep">✓ Count</td>
</tr>
<tr>
              <td class="col-left"><strong>Carlos</strong> (Bravo)</td>
              <td>2</td>
              <td class="gg-sweep">2</td>
              <td class="gg-sweep">−1</td>
              <td class="gg-sweep">✓ Count</td>
</tr>
<tr>
              <td class="col-left"><strong>Diana</strong> (Bravo)</td>
              <td>3</td>
              <td class="gg-win">3</td>
              <td class="gg-win">E</td>
              <td class="gg-win">✓ Count</td>
</tr>
</tbody>
</table>
</div>
<div class="gg-callout" style="margin-top:12px; max-width:720px;">
        <p><strong>Alpha:</strong> Beth's net birdie (−1) is counted. Alex's bogey (+1) is skipped. Running: <strong>−2</strong>, selected 4/24.</p>
        <p><strong>Bravo:</strong> Both scores are good. Counts both (−1 and E). Running: <strong>−2</strong>, selected 4/24.</p>
        <p style="font-size:0.82rem; color:var(--ink-muted); margin-top:4px;">Tied at −2 after 3 holes. Alpha has used 2 discards; Bravo has used 3. Alpha has slightly more discard flexibility for the remaining 15 holes.</p>
</div>
</div>

    {# ── Pace summary ──────────────────────────────────── #}
<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="TeamCountX 3-hole summary">
<thead>
<tr>
            <th class="col-left">After H3</th>
            <th>To Par</th>
            <th>Selected</th>
            <th>Discards used</th>
            <th>Discards remaining</th>
</tr>
</thead>
<tbody>
<tr>
            <td class="col-left"><strong>Team Alpha</strong></td>
            <td class="gg-win">−2</td>
            <td>4 / 24</td>
            <td>2 of 12</td>
            <td>10 remaining (15 holes left)</td>
</tr>
<tr>
            <td class="col-left"><strong>Team Bravo</strong></td>
            <td class="gg-win">−2</td>
            <td>4 / 24</td>
            <td>3 of 12</td>
            <td>9 remaining (15 holes left)</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-top:16px;">
      <p><strong>After 3 holes:</strong> Tied at −2. Both teams have selected 4 of their 24 target scores. Alpha has used 2 of 12 discards; Bravo has used 3. The difference is subtle now but will compound over 15 remaining holes. Alpha's extra discard gives slightly more flexibility to drop a bad score on the back nine.</p>
</div>

</div>
</section>

{# ================================================================
   10. STRATEGY TIPS
   ================================================================ #}
<section class="section section--white" id="strategy">
<div class="container">

    {{ SectionHeader("Strategy", "How to Win TeamCountX",
      "The decisions that separate disciplined teams from reactive ones.") }}

<div class="gg-tips-grid">

      {{ TipCard(
        "Quota Management",
        "Know Your Pace",
        "Divide your count X by 18 to find your selection pace. For X=24 with 2 players, you need roughly 1.33 selections per hole. Track your cumulative selected vs. your pace. Teams that run ahead of pace early burn discards; teams that fall behind pace risk Forced Count on tough finishing holes."
      ) }}

      {{ TipCard(
        "Discard Strategy",
        "Save Discards for Hard Holes",
        "Most courses get harder in the second half. Save at least 4–5 of your discards for holes 12–18. A team that uses all their discards by hole 10 will be counting bogeys on the toughest holes of the round, while a disciplined opponent skips those same holes."
      ) }}

      {{ TipCard(
        "Birdie Banking",
        "Count Every Red Number",
        "Never skip a net birdie or better. These scores represent positive return on a discard saved. Teams that save discards for bogeys are playing defense; teams that bank birdies and skip bogeys are building a winning total."
      ) }}

      {{ TipCard(
        "Opponent Awareness",
        "Watch the Leaderboard",
        "The Selected column on the leaderboard tells you how aggressively opponents are counting. A team at 18/24 after 12 holes has used almost all their quota — they'll be counting everything from here, including any bad holes. That's your window to play patient and count selectively."
      ) }}

      {{ TipCard(
        "Forced Count Recovery",
        "Don't Panic — Play Solid",
        "If you enter Forced Count with 4 holes left, the only path forward is to play the best golf you can on those holes. The score selection advantage is gone — it's straight stroke play from that point. Teams with solid fundamentals recover better from forced count situations than teams who rely on selection strategy alone."
      ) }}

      {{ TipCard(
        "Handicap Holes",
        "Net Birdies Are Worth More",
        "On high Stroke Index holes where players receive strokes, the expected net score drops significantly for high-handicappers. A player who normally bogeys SI 1 holes may net a par or better — a count-worthy score. Know which players get strokes on which holes and prioritize their selections there."
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
      "How net scoring works in TeamCountX and why handicaps matter more than in stroke play.") }}

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option">
        <div class="gg-hdcp-option__name">Gross</div>
        <div class="gg-hdcp-option__desc">Raw scores compared directly to par. Teams select based on actual strokes taken. Suits groups of similar ability where handicaps are not needed for fairness.</div>
</div>

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">
          Net (100%)
          <span class="gg-hdcp-rec-badge">Recommended</span>
</div>
        <div class="gg-hdcp-option__desc">Full Course Handicap applied. Each player receives strokes on holes by Stroke Index. Net scores are used for comparison and for the team's to-par total. Enables genuinely mixed-ability teams.</div>
</div>

<div class="gg-hdcp-option">
        <div class="gg-hdcp-option__name">Net (85%)</div>
        <div class="gg-hdcp-option__desc">85% of Course Handicap applied. Common in competitive events or money games to moderate the advantage of high-handicap players on their stroke holes.</div>
</div>

</div>

<div class="gg-prose">

<h3 style="font-size:1.05rem; color:var(--ink); margin-bottom:12px; margin-top:8px;">Why Handicaps Matter More in TeamCountX</h3>

In standard stroke play, every score counts and handicap strokes adjust the final total. In TeamCountX, teams choose which scores to include — and handicap strokes directly influence which scores are worth counting.

A high-handicapper who receives a stroke on a par 4 (SI 5, for example) and makes a net par is a valuable count. The same player making a net bogey is a discard candidate. Knowing which players receive strokes on which holes is strategically essential — it tells you in advance which holes are likely to generate count-worthy scores for each player.

Marker applies advanced handicap options for groups that need more control: stroke off low ball (differential allocation), per-player overrides, max strokes cap, half strokes, and suppression of strokes on par 3s.

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

    {{ SectionHeader("Variations", "Common Variations",
      "House rules and formats that groups layer on top of standard TeamCountX.") }}

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
</div>
<div class="gg-variation__body">
<h4>Different X for Front and Back Nine</h4>
          <p>Some groups agree to a higher count on the front nine (more scores required) and a lower count on the back nine (more discards available), or vice versa. Adds a structural shape to the round — conservative front, aggressive back, or the reverse.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
</div>
<div class="gg-variation__body">
<h4>One-Per-Hole Minimum</h4>
          <p>Require that at least one score per hole is always counted, regardless of how poorly the team played. Prevents the degenerate strategy of skipping an entire hole. Set X to be at least 18 in this variation.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<div class="gg-variation__body">
<h4>Skins on Top</h4>
          <p>Run a skins game simultaneously using each team's best net score per hole. TeamCountX determines the main prize; skins add per-hole excitement and provide a separate payout layer for teams who win individual holes even if they lose the overall.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<div class="gg-variation__body">
<h4>Hidden Leaderboard</h4>
          <p>Enable Marker's built-in hidden leaderboard option so teams cannot see opponents' running totals during the round. Prevents sandbagging — teams must play their own strategy without reacting to opponent scores.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<div class="gg-variation__body">
<h4>Stableford Scoring</h4>
          <p>Rather than summing net-to-par, assign Stableford points to each score (birdie = 3, par = 2, bogey = 1, double = 0). Teams count X Stableford points instead of stroke totals. Highest Stableford total wins rather than lowest stroke total.</p>
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

    {{ SectionHeader("Marker App", "Why Run TeamCountX in Marker?",
      "TeamCountX creates more data per hole than almost any other format. Marker keeps it organized.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
</div>
<h4>Real-Time Quota Tracking</h4>
        <p>Every team can see their Selected / X count at a glance on the leaderboard. No mental math, no paper tracking. Marker updates the count every time a selection is saved — and alerts teams when they've hit their limit or entered Forced Count.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
</div>
<h4>Per-Hole Selection Made Simple</h4>
        <p>The Count modal on each hole cell shows exactly who to count. Tap the player, tap Save. Marker handles all the arithmetic — net scores, to-par, running totals — without anyone needing a calculator or a spreadsheet.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
</div>
<h4>Live Leaderboard With Context</h4>
        <p>The TeamCountX leaderboard shows To Par and Selected side by side. Not just who's winning — but how many selections each team has left. That context changes everything about how you read a standing midway through the round.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
</div>
<h4>Any Group Size</h4>
        <p>Marker handles uneven teams with blind draw slots, automatically excluded from scoring and payout. Teams of 2, 3, 4, or 5 — all with the same interface and the same automatic count tracking.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Net Scoring Per Player</h4>
        <p>Marker calculates each player's net score on each hole individually, by Stroke Index, before teams make their selection. Players see their own net score in the Count modal — they're always selecting with full information about whether a score is worth counting.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Pool Payouts, Automatically Split</h4>
        <p>Set a buy-in per player and Marker calculates the total pot and distributes it to winning teams by place, split evenly among team members. No manual division at the end — Marker shows each player exactly what they won.</p>
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
        <summary>What does "Count X" actually mean?</summary>
<div class="gg-faq-body">
          <p>X is the total number of individual player-hole scores each team must select across the entire round. It is <em>not</em> scores per hole — it's a total quota for all 18 holes combined. A 2-player team generates 36 scores over 18 holes (2 per hole × 18 holes). If X = 24, each team selects exactly 24 of those 36 scores to count toward their total. The 12 that aren't selected are discarded and ignored.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Do both players on a team have to count the same number of scores?</summary>
<div class="gg-faq-body">
          <p>No — the X count is a total across all players and all holes. A team could theoretically count all of Player A's scores and none of Player B's, or distribute the counts however they like, as long as the total selected equals X. In practice, most teams distribute counts across both players to avoid Forced Count situations later.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Can a team skip counting a score on a hole entirely?</summary>
<div class="gg-faq-body">
          <p>Yes — a team can choose to count zero player scores on any given hole. Neither player's result for that hole is included in the team total. That decision is made and locked when the hole is saved — you cannot go back and count a skipped hole after later holes have been played. Every skipped hole reduces the team's discard budget; skip too aggressively and you'll hit Forced Count before the round ends.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>What is Forced Count?</summary>
<div class="gg-faq-body">
          <p>Forced Count activates when a team's remaining unselected scoring opportunities equal exactly the number of selections they still need to reach X. At that point, every remaining player score on every remaining hole must be counted — there are no more discards available. Marker recognizes this state and labels the affected holes accordingly. The best defense against Forced Count is managing your discard budget carefully throughout the round.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>How do I pick the right count X for my group?</summary>
<div class="gg-faq-body">
          <p>A common starting point is <strong>two-thirds of the total possible scores</strong>. For a 2-player team over 18 holes (36 total), count 24. For a 3-player team (54 total), count 36. This lets each team discard roughly one in three scores — enough to rescue a bad hole without eliminating all pressure. After playing the format once, most groups adjust X slightly based on how early or late Forced Count typically kicks in.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>How many players can play TeamCountX?</summary>
<div class="gg-faq-body">
          <p>Minimum 4 players (two teams of two). Each team can have up to 5 players. There's no stated maximum for the number of teams. For groups with an odd number of players, Marker supports a Blind Draw slot on a team — a virtual player position excluded from scoring and payout that balances uneven group sizes.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Do teams need to be the same size?</summary>
<div class="gg-faq-body">
          <p>No, but note that different team sizes mean different total possible scores and different effective discard budgets. A 2-player team counting 24 of 36 has the same one-third discard ratio as a 3-player team counting 36 of 54 — the commissioner should set X consistently relative to each team's size for fairness. If teams are the same size, any X is fair across all teams.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Is TeamCountX match play or stroke play?</summary>
<div class="gg-faq-body">
          <p>Stroke play — pure cumulative scores. There are no per-hole points, no skins, no match play standing. Teams are ranked by their cumulative net-to-par from selected scores at the end of 18 holes. The team with the lowest total wins. There is no Front/Back/Overall Nassau structure — it's one match across all 18 holes.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>Can we see the other team's selections and score during the round?</summary>
<div class="gg-faq-body">
          <p>By default, yes — the Marker leaderboard shows all teams' To Par and Selected counts live during the round. The commissioner can enable a Hidden Leaderboard option before the round, which conceals all standings until the round is finalized. This is a popular option for competitive events where sandbagging is a concern.</p>
</div>
</details>

<details class="gg-faq-item">
        <summary>How is the winner paid out?</summary>
<div class="gg-faq-body">
          <p>TeamCountX uses a pool model. Each player pays a buy-in before the round; all buy-ins are pooled. The winning team receives the full pot by default (winner-take-all). For multi-team events, the commissioner can configure a payout amount for each finishing position — e.g., $100 to first, $50 to second. Payout is divided equally among non-blind members of each placing team. Marker calculates and displays each player's share.</p>
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
      "TeamCountX fits naturally alongside these formats.") }}

<div class="gg-related-grid">

      {{ RelatedCard(
        "Wolf",
        "Rotating Wolf picks a partner per hole. Strategic decisions on every tee, with Lone Wolf and Blind Wolf options.",
        '/games/wolf/' | url
      ) }}

      {{ RelatedCard(
        "High-Low",
        "Fixed 2v2 teams compare best and worst scores each hole. Immediate per-hole results rather than a cumulative count.",
        '/games/high-low/' | url
      ) }}

      {{ RelatedCard(
        "Stableford",
        "Points by score vs. par for each player individually. Good pairing as a secondary scoring format on the same round.",
        '/games/stableford/' | url
      ) }}

      {{ RelatedCard(
        "Skins",
        "Win a hole outright to claim the skin. Runs well as a side game on top of TeamCountX for per-hole excitement.",
        '/games/skins/' | url
      ) }}

</div>

<div style="margin-top:28px;">
      <a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
