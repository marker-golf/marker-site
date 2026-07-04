---
layout: layouts/game-guide.njk
title: Ryder Cup — Marker Golf Games
description: "Ryder Cup format explained: Foursomes, Four-Ball, and Singles sessions, team points, and how to run your own Ryder Cup-style event. Coming to Marker."
status: coming-soon
category: featured
order: 3
players: "Any (2 teams)"
format: "Team Match Play"
cardDescription: "Multi-session team match play — Foursomes, Four-Ball, and Singles — with a live points table and cumulative standings. Perfect for golf trips and club events."
game:
  name: Ryder Cup
  difficulty: advanced
  difficultyLabel: Advanced
  subtitle: "Three session types, two teams, one trophy. The most storied team format in golf — coming to Marker."
  heroSubtitleWidth: "540px"
  heroStats:
    - label: Players
      value: "Any (2 teams)"
    - label: Format
      value: Team Match Play
    - label: Sessions
      value: Foursomes · Four-Ball · Singles
    - label: Status
      value: Coming Soon
  heroCta:
    primary:
      text: Try Marker Today
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Run Your Own Ryder Cup?
    body: "Dedicated Ryder Cup support is in development. In the meantime, you can run a Ryder Cup-style series in Marker today using Series and Match Play — full standings included."
    primary:
      text: Start Your Series
      href: "https://app.marker.golf"
    secondary:
      text: Learn Match Play
      href: "/games/match-play/"
sections:
  - id: overview
    label: Overview
  - id: format
    label: Session Formats
  - id: points-system
    label: Points System
  - id: running-your-own
    label: Running Your Own
  - id: marker-support
    label: Ryder Cup in Marker
  - id: use-now
    label: Use Marker Now
  - id: strategy
    label: Team Strategy
  - id: variations
    label: Variations
  - id: faq
    label: FAQ
  - id: related
    label: Related Games
---

{# ── Import game-guide macros ──────────────────────────────────────────── #}
{% from "components/game-guide.njk" import SectionHeader, ConfigCard, ScreenshotPlaceholder, TipCard, FaqItem, RelatedCard, MarkerImplNote %}

{# ================================================================
   OVERVIEW
   ================================================================ #}
<section class="section section--white" id="overview">
<div class="container">

{{ SectionHeader("Overview", "What Is the Ryder Cup?",
  "A biennial team match play competition between Europe and the USA — and the format that inspired every golf-trip team battle since.") }}

<div class="gg-prose">

The Ryder Cup is golf's most famous team competition, held every two years between 12-player squads representing Europe and the United States. Unlike stroke play, where the goal is the lowest total score, the Ryder Cup is pure **match play** — each hole is won, lost, or halved, and the team that wins more matches claims the Cup.

What makes the Ryder Cup singular is its structure: matches are played across multiple **sessions**, each using a different format. Foursomes (alternate shot) and Four-Ball (best ball) are played as pairs. Singles sends every player out in a 1v1 match. The combination tests every dimension of team performance — individual nerve, partnership chemistry, and captaincy decisions.

For recreational golfers, the Ryder Cup format translates perfectly to a **golf trip or club event**: two balanced teams, multiple rounds across different formats, and a running points tally that builds suspense over the whole event.

<div class="gg-callout">
<p><strong>Why golfers love it:</strong> A Ryder Cup-style event creates storylines that a standard stroke-play tournament never can. A player who struggled in the Four-Ball session can become a hero in Singles. Comebacks happen. Nerves show. That's the format.</p>
</div>

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">3</div>
<div class="gg-quick-stat__lbl">Session types</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">28</div>
<div class="gg-quick-stat__lbl">Total points (official)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">14½</div>
<div class="gg-quick-stat__lbl">Points needed to win</div>
</div>
</div>

{{ MarkerImplNote("Ryder Cup is Coming Soon in Marker. This guide explains the full format and how to run your own event. It also describes how to use Marker's existing Series and Match Play features as a workaround today.") }}

</div>
</section>

{# ================================================================
   SESSION FORMATS
   ================================================================ #}
<section class="section" id="format">
<div class="container">

{{ SectionHeader("Sessions", "The Three Session Formats",
  "Foursomes, Four-Ball, and Singles each test different skills and partnerships.") }}

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Foursomes (Alternate Shot)</h3>
<p>Two players form a partnership and share one ball, alternating shots from tee to hole. One player tees off on odd-numbered holes, the other on evens — and they alternate from there regardless of who holed the previous putt. The pair with the lower score wins the hole. Foursomes is the most demanding partnership format in golf: a bad shot hands your partner a difficult lie, and there's nowhere to hide. It rewards shot-making consistency over raw power and requires strong course management as a unit.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Four-Ball (Best Ball)</h3>
<p>Two players still form a partnership, but each plays their own ball throughout. The better of the two scores counts as the partnership's score for that hole. Four-Ball is more forgiving: one partner can cover for the other, and aggressors can take risks knowing their partner provides a safety net. It typically produces lower scores than Foursomes and is often played in the morning sessions of major competitions when captains want confidence-building results on the board first.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Singles</h3>
<p>Every player competes in a head-to-head match play game against an opponent from the other team. The captain decides the order before tee times are posted. Singles is where the Ryder Cup is most often decided: with 12 matches running simultaneously across the course, dramatic swings happen fast. A team that trails going into Singles has won from behind; a team that leads can collapse. Captains spend enormous energy on the draw — who they put first to set a tone, who they save for the anchor spot at 12.</p>
</div>
</div>

</div>

<div class="gg-prose">

**Official schedule (professional Ryder Cup)**

The 28-point official format runs across three days:

| Day | Session | Format | Points |
|-----|---------|--------|--------|
| Friday AM | Session 1 | Foursomes | 4 |
| Friday PM | Session 2 | Four-Ball | 4 |
| Saturday AM | Session 3 | Foursomes | 4 |
| Saturday PM | Session 4 | Four-Ball | 4 |
| Sunday | Session 5 | Singles | 12 |
| **Total** | | | **28** |

Not all 12 players on each team participate in every session. The captain decides who plays — and who sits — in each of the four team sessions.

</div>

</div>
</section>

{# ================================================================
   POINTS SYSTEM
   ================================================================ #}
<section class="section section--white" id="points-system">
<div class="container">

{{ SectionHeader("Scoring", "The Points System",
  "Every match adds to the team total. A win is 1 point, a half is ½ point, a loss is 0.") }}

<div class="gg-prose">

The points system is simple: each **match** produces at most one point to be distributed.

| Match result | Winning team | Losing team |
|---|---|---|
| Win (any margin) | 1 point | 0 points |
| Halve (tied after 18) | ½ point | ½ point |
| Conceded | 1 point | 0 points |

**Winning a match** means winning more holes than your opponent — you don't need to play all 18 holes. A player who is 5 up with only 4 holes left has won the match (5&4 notation: 5 up, 4 to play). A player 2 up with 2 to play is "dormie" — they cannot lose, only win or halve.

**The magic number is 14½.** The competition runs until one team reaches 14½ points and cannot be caught, or until all 28 points are decided. If the final score is 14–14, the defending champion retains the Cup (a tie keeps the current holder).

**Recreational adaptation**

When running your own event, you scale the format to fit your group. Fewer players means fewer matches and a lower points total. Common recreational targets:

- **6 per side** → 14 total points available → 7½ to win
- **4 per side** → depends on sessions planned
- **Any size** → just track points per match and set a winning threshold before you start

</div>

{{ TipCard("Always announce the winning threshold before the competition starts. Nothing kills momentum like a dispute at the end about whether 7 or 7½ points is needed to win.", "Clarify the win condition upfront") }}

</div>
</section>

{# ================================================================
   RUNNING YOUR OWN
   ================================================================ #}
<section class="section" id="running-your-own">
<div class="container">

{{ SectionHeader("Setup", "Running Your Own Ryder Cup",
  "Team selection, session planning, and the logistical decisions every captain faces.") }}

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Balance the teams</h3>
<p>Fair teams make the event. Use handicaps as your guide: split the group roughly evenly by combined handicap index. Common approaches are a captain's draft (two captains alternate picks) or a hat draw. For smaller groups (8–12 total), match the highest handicapper on one team with the highest on the other, and so on down the list.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Choose your session schedule</h3>
<p>The professional format requires three days. Recreational groups typically compress this into one or two. A one-day format might run Four-Ball in the morning and Singles in the afternoon. A two-day golf trip can mirror the professional structure more closely — Foursomes and Four-Ball on day one, Singles on day two. Decide how many points are in play and set a winning threshold before the first tee shot.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Assign partnerships for team sessions</h3>
<p>In Foursomes and Four-Ball, players compete in pairs within their team. The captain assigns partnerships before each session. Unlike the professional format, recreational groups often keep the same pairings across sessions for simplicity — just make sure the pairs are reasonable handicap matches.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Decide on handicap strokes</h3>
<p>Recreational Ryder Cups almost always use handicaps to keep matches competitive. In Foursomes, the combined handicap of the partnership is typically halved. In Four-Ball and Singles, standard stroke index allocation applies. Settle the handicap method before play — it avoids arguments on the 18th green.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>Track points in real time</h3>
<p>The Ryder Cup's drama comes from the running score. Keep a visible tally — a whiteboard at the 19th hole, a shared spreadsheet, or a scoring app. Players should know where the competition stands after every session so that the Sunday Singles (or final session) carries real weight.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   RYDER CUP IN MARKER
   ================================================================ #}
<section class="section section--white" id="marker-support">
<div class="container">

{{ SectionHeader("Marker Support", "Ryder Cup in Marker",
  "Dedicated Ryder Cup support is in development. Here's what's coming and what exists today.") }}

<div class="gg-prose">

**Status: Coming Soon**

Ryder Cup is listed as Coming Soon in Marker. A dedicated Ryder Cup game mode is in development. When it launches, the planned support includes:

- **Team assignment** — assign players to two named sides at the series level
- **Multi-session scheduling** — plan Foursomes, Four-Ball, and Singles sessions as events within a competition
- **Automatic session points** — wins, halves, and losses calculated per match, aggregated per session
- **Live standings board** — cumulative team points visible throughout the competition
- **Settling up** — built-in accounting for per-match wagers across all sessions

The underlying infrastructure already exists. Marker's **Series** and **Match Play** features provide the foundation: Match Play computes hole-by-hole results and produces wins/ties/losses per match, and the Series Summary already aggregates "Team Match Wins" across all Match Play games played within a series. Ryder Cup will build on this foundation as a first-class, integrated experience.

</div>

<div class="gg-callout">
<p><strong>What's already live:</strong> The Series framework and Match Play scoring engine are fully functional today. You can run a Ryder Cup-style competition right now — it just requires manual setup rather than a guided flow. See the next section for how.</p>
</div>

</div>
</section>

{# ================================================================
   USE MARKER NOW
   ================================================================ #}
<section class="section" id="use-now">
<div class="container">

{{ SectionHeader("Use Marker Now", "Run a Ryder Cup-Style Event Today",
  "Use Marker's Series and Match Play features to build your own team competition — full standings included.") }}

<div class="gg-prose">

You don't need to wait for dedicated Ryder Cup support. The combination of **Series** and **Match Play** in Marker produces the core Ryder Cup experience: team sides, hole-by-hole match scoring, wins/ties/losses per match, and a cumulative Team Match Wins table across all sessions.

</div>

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Create a Series</h3>
<p>In Marker, a <strong>Series</strong> is the container for your multi-round competition. Give it a name ("2025 Ryder Cup," "The Presidents Cup," whatever you like) and save it. The series will aggregate results across all events you add to it.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Add an Event for each session</h3>
<p>Each session (Foursomes morning, Four-Ball afternoon, Singles) is a separate <strong>Event</strong> within your series. When you create each event, link it to the series you just made. Players don't need to be in the same foursome — Marker's multi-scorecard support lets teammates play in different groups and their scores still roll up to the event.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Set up Match Play games with team sides</h3>
<p>Within each event, create <strong>Match Play</strong> games and assign players to <strong>Left</strong> and <strong>Right</strong> sides — these are your two Ryder Cup teams. For a Four-Ball session, set the ball count to best-of-two (1 net ball per hole) and each side has two players. For Singles, set up individual 1v1 matches. Configure handicap settings to match your group's preference.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Score each session</h3>
<p>Players enter scores hole by hole in Marker as normal. The Match Play game shows the running match state (e.g., "Left 2 up thru 9") in real time. When a session ends and the round is locked, those match results are captured in the series.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>Check the Series Summary for standings</h3>
<p>After each event, open your series and tap the standings icon to see the <strong>Team Match Wins</strong> table. This shows cumulative wins, ties, and losses for each team across all Match Play games in the series — your live Ryder Cup scoreboard. The table breaks down by event (day), so you can see how each session went and the running total.</p>
</div>
</div>

</div>

{{ TipCard("Keep your Left and Right sides consistent across all events in the series. The Team Match Wins table aggregates by side, so if Team A is 'Left' in one event and 'Right' in another, the totals will be split incorrectly.", "Keep sides consistent") }}

</div>
</section>

{# ================================================================
   STRATEGY
   ================================================================ #}
<section class="section section--white" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Team Strategy",
  "Captain's choices that win Ryder Cups — and the principles behind them.") }}

<div class="gg-prose">

**Session order**

The conventional wisdom is to play Four-Ball before Foursomes — Four-Ball's best-ball format is more forgiving and typically gets more points on the board, building team confidence. Foursomes is a higher-variance format where a poor alternate-shot partnership can lose heavily. Captains often pair their most consistent partnership for Foursomes rather than their most talented.

**Pairing for Foursomes**

Alternate shot demands that both players have similar distance profiles — a 280-yard hitter paired with a 220-yard hitter will face awkward tee-to-green combinations. More important than raw ability is temperament: a player who can stay calm after their partner leaves a difficult lie is worth more in Foursomes than a hero shot artist.

**Singles order**

Professional captains have identified two strategic positions:

- **Top of the order** — send a reliable, confident player to set a positive tone early. Boards matter: seeing your team's name in red across the top half generates momentum.
- **Anchor (position 12)** — the singles draw is sealed before tee times, so you don't know who you're matching against. Captains typically put a mentally tough, experienced player at 12 who can handle closing a match under pressure.

**When to sit a struggling player**

In the professional format, captains have the option to sit players for a session. If a player has been struggling and the team is ahead, giving them rest and confidence before Singles is often the right call. In a recreational one-day event, everyone usually plays everything — but for a two-day competition, the same logic applies.

**Momentum management**

The Ryder Cup has seen more famous comebacks than almost any other team competition. A 10–6 deficit going into Singles has been overturned. The implication: don't concede holes carelessly when trailing, and don't play conservatively when ahead. Keep pressure on every match throughout.

</div>

</div>
</section>

{# ================================================================
   VARIATIONS
   ================================================================ #}
<section class="section" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Common Variations",
  "How recreational groups adapt the format — and other competitions that use the same structure.") }}

<div class="gg-prose">

**Scaled-down formats**

The full 28-point Ryder Cup format requires 12 players per side. Most recreational groups play with far fewer. Common adaptations:

- **6 per side:** Run two Foursomes matches, two Four-Ball matches, and six Singles. Total: 10 points. Win target: 5½.
- **4 per side:** Run two Four-Ball matches and four Singles. Total: 6 points. Win target: 3½.
- **One-day format:** Skip one or both of the team-format sessions and go straight to Singles after one Four-Ball round in the morning. Simple, decisive, fast.

**President's Cup**

The President's Cup mirrors the Ryder Cup format but pits the USA against an International team (rest of the world excluding Europe). The structure is nearly identical — Foursomes, Four-Ball, and Singles — but the competitive geography is different.

**Solheim Cup**

The women's equivalent of the Ryder Cup: Europe vs. USA on the LPGA and Ladies European Tour. Same format, same drama.

**Club vs. Club matches**

Many golf clubs run inter-club matches using the Ryder Cup format over a single day: two Foursomes in the morning, two Four-Ball in the afternoon, with eight Singles in the evening. Points accumulate the same way; the winning club claims bragging rights (and usually buys the first round).

**Stableford Ryder Cup**

A popular recreational twist: replace the stroke-by-stroke match play comparison with Stableford points comparison per hole. Each player earns Stableford points on each hole, and the partnership or individual with more Stableford points wins the hole. This speeds up play and removes the "pick up" element that some recreational golfers find deflating.

</div>

</div>
</section>

{# ================================================================
   FAQ
   ================================================================ #}
<section class="section section--white" id="faq">
<div class="container">

{{ SectionHeader("FAQ", "Frequently Asked Questions", "") }}

<div class="gg-faq">

{{ FaqItem(
  "What's the difference between Foursomes and Four-Ball?",
  "Foursomes means two players share one ball and alternate shots. Four-Ball means each player plays their own ball and the team uses the better score per hole. Both are played as two-player partnerships, but Four-Ball is more forgiving because a bad individual hole doesn't cost the partnership the hole outright — their partner's score can still win it."
) }}

{{ FaqItem(
  "How do handicaps work in Foursomes?",
  "In Foursomes, the combined handicap of the partnership is typically halved (i.e., add both handicaps and divide by two). The result is rounded to the nearest whole number and allocated by Stroke Index as normal. In a professional setting, Foursomes is often played scratch; in recreational play, handicaps are almost always applied."
) }}

{{ FaqItem(
  "What happens if the final score is tied?",
  "In the professional Ryder Cup, a 14–14 tie means the defending champion retains the Cup. In a recreational event, you can apply the same rule (the previous year's winner retains) or play off with a sudden-death Singles match. Decide the tie-breaking rule before the competition starts."
) }}

{{ FaqItem(
  "Can you concede holes or putts in Ryder Cup match play?",
  "Yes — concessions are a standard part of match play etiquette. A player can concede an opponent's next shot at any point, and the opponent picks up without playing the stroke. Conceding a gimmie putt is common. A hole can also be conceded (the opponent wins the hole without finishing), as can the entire match. Concessions cannot be withdrawn once made."
) }}

{{ FaqItem(
  "How many players are needed for a Ryder Cup-style event?",
  "The official format uses 12 per side, but you can run it with as few as 2 per side. With fewer players, you simply run fewer matches per session and scale the winning threshold accordingly. The two-team match play structure works at any size — the drama doesn't require a crowd."
) }}

{{ FaqItem(
  "When will Ryder Cup be available in Marker?",
  "Ryder Cup is in development. It's listed as Coming Soon in the app. No specific release date has been announced. In the meantime, Marker's Series and Match Play features can run a Ryder Cup-style competition today — see the Use Marker Now section above."
) }}

</div>

</div>
</section>

{# ================================================================
   RELATED GAMES
   ================================================================ #}
<section class="section" id="related">
<div class="container">

{{ SectionHeader("Related", "Related Games", "Other formats that share DNA with Ryder Cup — or make great sessions within one.") }}

<div class="gg-related-grid">

{{ RelatedCard(
  "Match Play",
  "The core format inside every Ryder Cup session. Hole-by-hole competition — win more holes than your opponent.",
  "/games/match-play/"
) }}

{{ RelatedCard(
  "Nassau",
  "Three-match structure (front 9, back 9, overall) that gives match play its stakes on every side of the course.",
  "/games/nassau/"
) }}

{{ RelatedCard(
  "High-Low",
  "Two-point-per-hole team format where both players on a team contribute every hole. A natural Four-Ball session game.",
  "/games/high-low/"
) }}

{{ RelatedCard(
  "Scotch",
  "The team alternate-shot format at the heart of the Foursomes session — two players, one ball, alternating shots.",
  "/games/scotch/"
) }}

</div>

</div>
</section>
