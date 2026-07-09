---
layout: layouts/game-guide.njk
title: Nassau — Golf Game Guide
description: "Nassau explained: rules, presses, handicaps, and how to run it in Marker. Three simultaneous match play bets — front nine, back nine, and overall. The classic money game."
status: available
category: classic
order: 3
players: "2 or 4"
format: "Match Play"
cardDescription: "Three bets in one — front 9, back 9, and overall 18. The classic money game with optional presses. Marker runs all three simultaneously and handles automatic or manual press rules."
game:
  name: Nassau
  difficulty: intermediate
  difficultyLabel: Intermediate
  subtitle: "Three simultaneous match play bets — front nine, back nine, and overall. The original money game, built for side-by-side competition."
  heroSubtitleWidth: "540px"
  heroStats:
    - label: Players
      value: "2 or 4"
    - label: Format
      value: Match Play
    - label: Best For
      value: Betting groups
    - label: Handicap
      value: Supported
    - label: Available In
      value: Marker
  heroCta:
    primary:
      text: Play Nassau in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Nassau?
    body: "Set up all three bets in under 60 seconds. Marker tracks presses automatically and settles everything when the round ends."
    primary:
      text: Start Your First Nassau
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
{% from "components/game-guide.njk" import SectionHeader, ConfigCard, TipCard, FaqItem, RelatedCard, MarkerImplNote %}
{% from "components/product-screenshot.njk" import GameGuideScreenshot %}

{# ================================================================
   1. OVERVIEW
   ================================================================ #}
<section class="section section--white" id="overview">
<div class="container">

{{ SectionHeader("Overview", "What Is Nassau?",
  "Three independent match play bets on the same round. Win the front nine, win the back nine, or win overall.") }}

<div class="gg-prose">

Nassau is the most widely played money game in golf. A standard round becomes three overlapping matches — one covering holes 1–9, one covering holes 10–18, and one spanning all 18. Each match runs on its own track, won by whichever side wins more holes in that stretch. A team can collapse on the front, recover on the back, and still take the overall.

The structure solves a real problem with single-bet golf: once a match is effectively decided, both sides stop caring. Nassau keeps every nine fresh. Even a team down four holes on the front starts the back nine at All Square, with a full nine holes to play for a separate bet.

Presses extend this further. A side that falls behind on any match can press — triggering a new sub-bet that starts from the current hole. Presses give the trailing team a live path back into the money without waiting for the original match to resolve.

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">3</div>
<div class="gg-quick-stat__lbl">Simultaneous bets</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">2–4</div>
<div class="gg-quick-stat__lbl">Players (equal sides)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">18</div>
<div class="gg-quick-stat__lbl">Holes (all three matches)</div>
</div>
</div>

{{ MarkerImplNote("Marker runs all three matches simultaneously, tracking hole-by-hole standings for Front, Back, and Total. Presses are configured per match and can trigger automatically when a side falls behind by a set number of holes, or be called manually from the hole scorecard.") }}

</div>
</section>

{# ================================================================
   2. HOW IT WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

{{ SectionHeader("Mechanics", "How Nassau Works",
  "Six steps from the first tee to the final payout.") }}

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Form two equal sides</h3>
<p>Nassau requires exactly two competing sides of equal size. In a 2-player round, that's one player against another. In a 4-player round, it's two players against two — and on each hole Marker uses the best score from each side. Team size must be equal; Marker enforces this at setup.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Set dollar amounts for each match</h3>
<p>Before the round, agree on a dollar amount for each of the three matches — Front, Back, and Total. Amounts can differ (e.g., $5 on each nine, $10 on the overall). In Marker, entering a value in one match field fills the other blank fields automatically.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Play hole-by-hole match play</h3>
<p>Each hole is a mini-contest. The side with the lower score wins the hole; ties are halved — neither side gains. Net scores (after handicap strokes) determine winners unless you configure gross scoring. Standing is expressed as "N UP," "N DOWN," or "All Square."</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Three matches run simultaneously</h3>
<p>The Front match tracks holes 1–9. The Back match tracks holes 10–18, starting fresh at All Square on hole 10 regardless of how the front went. The Total match tracks all 18 holes from start to finish. Every hole you play advances two or three of these matches at once.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>Press when you're trailing (optional)</h3>
<p>Any time a side falls behind on a match, they can call a press — a new side bet starting from the current hole and running to the end of that match. Presses can be automatic (fires at a configurable hole deficit) or manual (called from the scorecard). A press can itself be pressed, creating cascading sub-bets.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">6</div>
<div class="gg-step__body">
<h3>Settle after hole 18</h3>
<p>Each match settles independently: the side that won more holes wins that bet. The Front match is decided after hole 9; the Back and Total settle at hole 18. With presses, there may be more than three bets to settle — Marker tallies everything and shows each player's net payout.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   3. THREE MATCHES
   ================================================================ #}
<section class="section section--white" id="three-matches">
<div class="container">

{{ SectionHeader("Match Structure", "Front · Back · Total",
  "Each match is scored independently. What happens on the front has no effect on the back nine bet — or on the Total.") }}

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
<div class="gg-match-card__name">Total</div>
<div class="gg-match-card__holes">All 18 Holes</div>
</div>
</div>

<div class="gg-prose">

**Front Nine (holes 1–9).** Both sides start at All Square on hole 1 and play nine holes of match play. Whoever wins more of those nine holes wins the Front bet. The Front match is decided at the end of hole 9. The result of the back nine has no bearing on it.

**Back Nine (holes 10–18).** Starts fresh at All Square on hole 10, completely independent of the Front. A side that was 4-down on the front has a clean slate here. Nine holes of match play, settled at hole 18.

**Total (holes 1–18).** Runs from hole 1 through hole 18 simultaneously alongside the Front and Back matches. The Total match is the only place where early-round holes still matter late in the round. A side can be losing both nines but win the Total if they've won more individual holes across all 18.

**Match play standing.** Standing is expressed as a number of holes, not strokes. If Side A wins three holes and Side B wins two, Side A is "1 UP" (net +1 hole). If they've each won the same number, the match is "All Square." Marker displays all three match standings separately in the scorecard and leaderboard — updated after every hole.

**Dormie.** A side is dormie when they lead a match by as many holes as remain in it. If you're 3 UP with 3 holes left on the Front, you cannot lose that match — the trailing side can only tie. Marker displays dormie status in the scorecard when it applies.

**Tied matches.** If a match ends with the same total holes won by each side, that match is halved — no money changes hands on that bet.

</div>

{{ GameGuideScreenshot("gameNassauScorecard", screenshots) }}

</div>
</section>

{# ================================================================
   4. PRESSES
   ================================================================ #}
<section class="section" id="presses">
<div class="container">

{{ SectionHeader("Presses", "Press When You're Down",
  "A press is a new side bet starting from the current hole. It runs alongside the original — not instead of it.") }}

<div class="gg-prose">

A press is the mechanism that keeps Nassau from going stale when one side goes ahead early. When a side falls behind on any match, they can call a press — a fresh sub-bet that begins immediately and runs to the end of that match's holes. The original bet continues unchanged. Both bets settle independently.

**How it works.** Say Side B is 2-down through three holes of the Front match. Side B presses. A new Front bet starts at All Square from hole 4, running through hole 9. Two Front bets are now live: the original (which Side A leads 2-down) and the press (All Square from hole 4). Side B can win the press while still losing the original.

**Cascade presses.** If Side B also falls behind on the press bet, they can press again — creating a second sub-bet (a press of a press). Each press starts from the hole it's called and runs to the end of the same hole range. Marker tracks all cascading presses per match automatically.

**Settlement.** After the round, Marker lists every bet — original matches plus all presses — and shows a net dollar amount. Each bet is a flat win/lose/tie; no per-hole amounts.

</div>

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Auto Press</div>
<div class="gg-hdcp-option__desc">Marker triggers a press automatically when a side falls behind by a configurable number of holes (1–10). No action required from either player. Configure the threshold and enable it per match in the game setup screen. Disabled by default.</div>
</div>

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">Manual Press <span class="gg-hdcp-rec-badge">Most Common</span></div>
<div class="gg-hdcp-option__desc">Either side calls a press by tapping the press button in the hole scorecard. The press takes effect from the current hole. Manual presses give both sides control over when sub-bets start, making them well-suited for groups that prefer to negotiate presses on the course.</div>
</div>

</div>

</div>
</section>

{# ================================================================
   5. SETUP IN MARKER
   ================================================================ #}
<section class="section section--white" id="configuration">
<div class="container">

{{ SectionHeader("Setup Guide", "Configuring Nassau in Marker",
  "All three bets are configured in the same game creation flow. Takes under 60 seconds.") }}

<div class="gg-config-grid">

{{ ConfigCard(
  "Teams",
  "Equal Sides Required",
  "Nassau requires exactly two sides of equal size. In a 2-player round, that's one player per side. In a 4-player round, two players per side. Unequal team sizes are not permitted — Marker enforces this at setup.",
  [
    {label: "1v1 — 2 players total", rec: false},
    {label: "2v2 — 4 players total", rec: true}
  ]
) }}

{{ ConfigCard(
  "Dollar Amounts",
  "Per-Match Bet Size",
  "Set a dollar amount for each of the three matches. Amounts can differ. Typing a value in one match field fills the other blank fields automatically — adjust any individually before confirming.",
  [
    {label: "$5 / $5 / $5 — equal across all three", rec: false},
    {label: "$5 / $5 / $10 — double on the Total", rec: true},
    {label: "$5 / $5 / $15 — triple on the Total", rec: false}
  ]
) }}

{{ ConfigCard(
  "Ball Allocation",
  "Net Balls per Team per Hole",
  "On each hole, Marker compares the best score from each side. Ball allocation controls whether that comparison uses net (handicap-adjusted) scores, gross scores, or both — and how many balls each side contributes per hole.",
  [
    {label: "1 net ball — best net score per side (default)", rec: true},
    {label: "1 gross ball — best gross score per side", rec: false},
    {label: "2 net balls — both players' net scores count", rec: false}
  ]
) }}

{{ ConfigCard(
  "Auto Press",
  "Automatic Press Trigger",
  "When enabled, Marker automatically starts a new press on a match whenever a side falls behind by N holes. Set N from 1 to 10. Configured per match — Front, Back, and Total can have different settings.",
  [
    {label: "Off — manual presses only (default)", rec: false},
    {label: "2-down — most common threshold", rec: true},
    {label: "1-down — maximum action", rec: false}
  ]
) }}

</div>

</div>
</section>

{# ================================================================
   6. EXAMPLE ROUND
   ================================================================ #}
<section class="section" id="example">
<div class="container">

{{ SectionHeader("Worked Example", "Example Round: Holes 1–3",
  "Team 1 (A + B) vs. Team 2 (C + D) — $5 per match, net scoring, 1 net ball per side.") }}

<div class="gg-prose" style="margin-bottom:28px;">

Both teams have two players. On each hole, Marker takes the best net score from each side and compares them to determine which side wins the hole. All three matches — Front, Back, and Total — are live from hole 1.

</div>

<div class="gg-example-wrap">
<table class="gg-example-table" aria-label="Nassau example round — holes 1–3">
<thead>
<tr>
<th>Hole</th>
<th>Par</th>
<th>T1 Best Net</th>
<th>T2 Best Net</th>
<th>Hole Result</th>
<th>Front</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>1</strong></td>
<td>4</td>
<td>4 (par)</td>
<td class="gg-win">3 (birdie)</td>
<td>T2 wins</td>
<td>T2 1UP</td>
<td>T2 1UP</td>
</tr>
<tr>
<td><strong>2</strong></td>
<td>3</td>
<td>3 (par)</td>
<td>3 (par)</td>
<td class="gg-tie">Halved</td>
<td>T2 1UP</td>
<td>T2 1UP</td>
</tr>
<tr>
<td><strong>3</strong></td>
<td>5</td>
<td class="gg-win">4 (eagle)</td>
<td>5 (birdie)</td>
<td>T1 wins</td>
<td>All Square</td>
<td>All Square</td>
</tr>
</tbody>
</table>
</div>

<div class="gg-callout" style="margin-top:32px;">
<p><strong>After three holes:</strong> Both the Front and Total matches are All Square — one hole each, one halved. Team 1 trailed after hole 1 but recovered with an eagle on hole 3. The Back match hasn't started; it opens at All Square on hole 10.</p>
<p>With six holes remaining in the Front and 15 in the Total, both matches are wide open. If Team 2 goes 2-down at any point with auto press enabled, Marker would automatically start a Front press from that hole.</p>
</div>

<div class="gg-callout gg-callout--info" style="margin-top:16px;">
<p><strong>Leaderboard view:</strong> In Marker, the leaderboard shows Front 9, Back 9, and Total as three separate match sections, each with the current standing and dollar amount. The per-hole scorecard shows the live standing for the two matches covering that hole — Front + Total on holes 1–9, Back + Total on holes 10–18.</p>
</div>

{{ GameGuideScreenshot("gameNassauLeaderboard", screenshots) }}

</div>
</section>

{# ================================================================
   7. STRATEGY
   ================================================================ #}
<section class="section section--white" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Playing Nassau Well",
  "Three simultaneous matches means three separate tracks of decisions. The best Nassau players manage all of them at once.") }}

<div class="gg-tips-grid">

{{ TipCard(
  "Mindset",
  "Reset at the Turn",
  "The Back nine starts at All Square no matter how the Front went. A 4-down collapse on the front is a $5 loss — not a reason to press further or play recklessly. Walk to the 10th tee as if the round just started, because for the Back bet, it did."
) }}

{{ TipCard(
  "Presses",
  "Press Early, Not Desperately",
  "The most valuable press is called at 2-down, not 4-down. The deeper the deficit, the fewer holes the press has to work with. If you're running manual presses, watch the standing after every hole and call the press before the hole count shrinks too far."
) }}

{{ TipCard(
  "Total Match",
  "Never Concede the Total",
  "The Total runs all 18 holes. Even if you're losing both nines, the Total match can still be won by consistently winning individual holes. Track the Total standing separately from the nines — winning the Total while splitting the nines is a net-positive result."
) }}

{{ TipCard(
  "Team Play",
  "Lean on Your Better Net Player",
  "In 2v2, only the best net score from each side counts per hole. On harder holes (high Stroke Index), your higher-handicap partner may receive a stroke and become the side's scoring threat. Know which holes your team gets strokes on before the round — that changes how aggressively each player should approach those holes."
) }}

{{ TipCard(
  "Defense",
  "Dormie Is a Gift — Don't Coast",
  "Going dormie means you can't lose the match, but you can still halve it. A halved bet pays nothing. Stay aggressive enough to close the match with holes to spare rather than coasting to a tie."
) }}

{{ TipCard(
  "Presses",
  "Understand What You're Agreeing To",
  "When the other side calls a manual press, both sides are entering a new bet. A press called with only 3 holes remaining gives the pressing side a short runway that often favors the team already behind. Know the math before accepting — and when auto press is on, know when it's going to fire."
) }}

</div>

</div>
</section>

{# ================================================================
   8. HANDICAPS
   ================================================================ #}
<section class="section" id="handicaps">
<div class="container">

{{ SectionHeader("Handicaps", "Net vs. Gross Scoring",
  "Marker applies handicaps using ball allocation — controlling which scores count and whether they're adjusted for handicap.") }}

<div class="gg-hdcp-grid">

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">Gross</div>
<div class="gg-hdcp-option__desc">Scores compared as recorded, with no handicap adjustment. Suits groups of similar ability where handicaps would add more complexity than fairness. In 2v2, the best raw score from each side wins the hole.</div>
</div>

<div class="gg-hdcp-option gg-hdcp-option--rec">
<div class="gg-hdcp-option__name">1 Net Ball (per side) <span class="gg-hdcp-rec-badge">Recommended</span></div>
<div class="gg-hdcp-option__desc">Each side's best net score per hole is used. Net scores subtract handicap strokes assigned by Stroke Index. The player with the lowest handicap in the group sets the baseline — others receive the difference. Marker calculates this automatically.</div>
</div>

<div class="gg-hdcp-option">
<div class="gg-hdcp-option__name">2 Net Balls (per side)</div>
<div class="gg-hdcp-option__desc">Both players' net scores from each side count — each side presents two scores per hole. Every player's result matters on every hole, making 2-ball Nassau feel closer to individual match play. Most common in 2v2 rounds where both players want their score to directly affect the outcome.</div>
</div>

</div>

<div class="gg-prose">

**How net strokes work.** Handicap strokes are allocated by Stroke Index — the hardest hole gets the first stroke, the second-hardest gets the second, and so on. A player with a 10-handicap receives one net stroke on the 10 hardest holes; their gross score on those holes is reduced by 1 when determining the net result. Marker applies this automatically from the course's Stroke Index.

**1v1 handicap.** In a head-to-head Nassau, the player with the lower Course Handicap plays at full gross and the higher-handicapper receives the difference. If A plays to a 6 and B plays to a 14, B receives 8 strokes on the 8 hardest holes. No manual calculation needed — Marker handles it.

<div class="gg-callout gg-callout--info">
<p>For a full explanation of handicap modes and stroke allocation in Marker — including how to set stroke allowances — see the <a href="{{ '/tutorials/handicap-settings/' | url }}">Handicap Settings guide</a>.</p>
</div>

</div>

</div>
</section>

{# ================================================================
   9. VARIATIONS
   ================================================================ #}
<section class="section section--white" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Common Nassau Formats",
  "The core structure is consistent everywhere. These variations are widely played and all run cleanly in Marker.") }}

<div class="gg-variations">

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<div class="gg-variation__body">
<h4>5-5-5 (Equal Bets)</h4>
<p>Equal dollar amounts on all three matches. Simple, no weighting toward any one match. Good for groups new to Nassau or casual rounds where you want the format without extra math.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>
</div>
<div class="gg-variation__body">
<h4>5-5-10 (Double on Total)</h4>
<p>Front and Back are $5 each; Total is $10. The full-round performance matters more than any single nine. Common in recreational play and puts extra weight on coming from behind over 18 holes.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
</div>
<div class="gg-variation__body">
<h4>5-5-15 (Triple on Total)</h4>
<p>The full Nassau. Front and Back are $5 each; Total is $15. The Total becomes the dominant bet — overall 18-hole performance matters most. Suits groups comfortable with Nassau and wanting bigger total swings.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
</div>
<div class="gg-variation__body">
<h4>Automatic Presses</h4>
<p>Set the auto-press threshold in Marker (1–10 holes down). 2-down is the standard. Once enabled, presses fire without any player action. Good for groups that want consistent press rules across all three matches without relying on anyone to call them.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<div class="gg-variation__body">
<h4>No Presses</h4>
<p>Three bets, no sub-bets. A clean Nassau where the only outcomes are Front, Back, and Total. Best for first-timers or groups that want the three-match structure without the complexity of tracking cascading presses.</p>
</div>
</div>

<div class="gg-variation">
<div class="gg-variation__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
</div>
<div class="gg-variation__body">
<h4>Press-Any-Time</h4>
<p>Some groups allow presses at any point — not just when trailing. This is a house rule. Marker's manual press supports this if both sides agree either player can call a press on any hole, regardless of standing.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   10. WHY MARKER
   ================================================================ #}
<section class="section section--dark" id="why-marker">
<div class="container">

{{ SectionHeader("Marker App", "Why Run Nassau in Marker?",
  "Three concurrent matches across 18 holes is complex to track manually. Marker handles it automatically.") }}

<div class="gg-benefit-grid">

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
</div>
<h4>Three Matches, Always Live</h4>
<p>Marker tracks Front, Back, and Total standings simultaneously after every hole. No manual tallying mid-round, no disagreements about who's up on which match. Everyone sees all three standings from their own phone.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
</div>
<h4>Press Tracking Built In</h4>
<p>Manual and auto presses are tracked per match without any extra bookkeeping. Marker labels each press bet, shows when it started, and includes every sub-bet in the final settlement breakdown.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
</div>
<h4>Per-Hole Match Display</h4>
<p>The hole scorecard shows the current standing for the two matches covering that hole — Front + Total on holes 1–9, Back + Total on holes 10–18. You always see the live context: not just the score, but what it means for each match.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
</div>
<h4>Handicaps Applied Automatically</h4>
<p>Marker applies handicap strokes by Stroke Index across all three matches simultaneously. Net scores are calculated per hole based on each player's index — nothing to compute on the course.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h4>Instant Settlement</h4>
<p>After hole 18, Marker calculates the result of every bet — original matches and all presses — and shows each player's net payout. No spreadsheet, no debate about who owes what.</p>
</div>

<div class="gg-benefit">
<div class="gg-benefit__icon">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
</div>
<h4>Start in Under 60 Seconds</h4>
<p>Create an event, add players, pick Nassau, set amounts, and tee off. Marker configures Front, Back, and Total automatically. No scorekeeping setup, no press-tracking spreadsheet needed.</p>
</div>

</div>

<div style="margin-top:40px; text-align:center;">
<a href="https://app.marker.golf" class="btn btn-primary">Play Nassau in Marker</a>
<p style="margin-top:14px; font-size:0.8rem; color:rgba(255,255,255,0.38);">Available on iOS, Android, and Web · No credit card required</p>
</div>

</div>
</section>

{# ================================================================
   11. FAQ
   ================================================================ #}
<section class="section section--white" id="faq">
<div class="container">

{{ SectionHeader("FAQ", "Frequently Asked Questions") }}

<div class="gg-faq">

<details class="gg-faq-item">
<summary>What does "2 UP" mean?</summary>
<div class="gg-faq-body">
<p>In match play, "2 UP" means a side has won two more holes than the other in that match — not that they're ahead by two strokes. If they win one more hole, they go 3 UP. If the other side wins one, they drop back to 1 UP. Marker displays the standing for each of the three matches separately.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What happens if a match ends tied?</summary>
<div class="gg-faq-body">
<p>A tied match — where both sides won the same number of holes — is halved. No money changes hands on that particular bet. In traditional match play this would extend to a playoff, but in Nassau betting rounds, a halved match is typically a push. Marker records it as a tie for settlement purposes.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is a press, exactly?</summary>
<div class="gg-faq-body">
<p>A press is a new, separate side bet that starts from the current hole and runs to the end of that match's holes. It doesn't replace or cancel the original match — both bets continue in parallel. The pressing side typically calls a press when they're trailing and want a fresh opportunity to recover some money, independent of the original match's outcome.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can you press the Total match as well as the nines?</summary>
<div class="gg-faq-body">
<p>Yes. Presses can be called on any of the three matches independently. A press on the Total match starts from the current hole and runs through hole 18. Press settings (auto threshold, manual enable) can be configured separately per match in Marker's setup screen.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Do both sides have to agree on a press?</summary>
<div class="gg-faq-body">
<p>With auto press, the threshold is set before the round and presses fire automatically — no agreement needed hole by hole. With manual presses, a press is typically called by the trailing side. Many groups treat a press as irrefusable when called at a standard deficit (e.g., 2-down); others require both sides to agree. The house rule is up to your group — Marker records the press whenever one is called in the app.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>How does handicap determine which holes I get strokes on?</summary>
<div class="gg-faq-body">
<p>Handicap strokes are distributed by Stroke Index — each hole on the course is rated from 1 (hardest) to 18 (easiest). A player with a 10-handicap receives one stroke on the 10 hardest holes (SI 1 through SI 10). In a 2v2 round, Marker compares each player's net score (gross minus strokes) and uses the best net from each side to determine the hole winner. Everything is calculated automatically.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What's the difference between 1 net ball and 2 net balls?</summary>
<div class="gg-faq-body">
<p>With 1 net ball per side, only the best net score from a team counts each hole — one player carries the side. With 2 net balls, both players' net scores count — the team presents two numbers and both compete. 2-ball Nassau plays closer to individual match play since every player's result directly affects the outcome every hole.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>What is dormie?</summary>
<div class="gg-faq-body">
<p>A side is dormie when they lead a match by as many holes as remain to be played. For example, 3 UP with 3 holes left on the Front match. At dormie, the trailing side can only tie that match — they cannot win it. Marker displays dormie status in the scorecard so both sides know exactly what's at stake on the remaining holes.</p>
</div>
</details>

<details class="gg-faq-item">
<summary>Can Nassau be played with more than 4 players?</summary>
<div class="gg-faq-body">
<p>Nassau requires equal-sized sides — two players, four players, or any even split — and Marker enforces this at setup. Groups larger than four are less common for Nassau; many prefer formats like <a href="{{ '/games/skins/' | url }}">Skins</a> or <a href="{{ '/games/stableford/' | url }}">Stableford</a> for larger outings, or split into multiple independent Nassau matches.</p>
</div>
</details>

</div>

</div>
</section>

{# ================================================================
   12. RELATED GAMES
   ================================================================ #}
<section class="section" id="related">
<div class="container">

{{ SectionHeader("Also Try", "Related Games",
  "Nassau works well as a standalone game or layered alongside these formats.") }}

<div class="gg-related-grid">

{{ RelatedCard(
  "High-Low",
  "Two-team match play using both the best and worst scores per hole. Nassau structure, different scoring.",
  '/games/high-low/' | url
) }}

{{ RelatedCard(
  "Skins",
  "Every hole is its own individual pot. Tied holes carry over — drama builds across the round.",
  '/games/skins/' | url
) }}

{{ RelatedCard(
  "Wolf",
  "Rotating partner selection on every hole. One player picks their partner after seeing tee shots.",
  '/games/wolf/' | url
) }}

{{ RelatedCard(
  "Match Play",
  "Head-to-head match play on all 18 holes, no sub-bets. The simplest version of what Nassau is built on.",
  '/games/match-play/' | url
) }}

</div>

<div style="margin-top:28px;">
<a href="{{ '/games/' | url }}" class="btn btn-ghost btn-sm" style="background:transparent;color:var(--green-700);border-color:rgba(74,124,89,0.4);">See All Games →</a>
</div>

</div>
</section>
