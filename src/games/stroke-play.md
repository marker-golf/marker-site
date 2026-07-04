---
layout: layouts/game-guide.njk
title: Stroke Play — Golf Game Guide
description: "Stroke Play explained: gross vs net scoring, handicap configuration, pool settlement, and how Marker tracks every score and settles the bet. The foundation of all tournament golf."
game:
  name: Stroke Play
  difficulty: beginner
  difficultyLabel: Beginner
  subtitle: "Count every stroke. Lowest total wins. The universal format of tournament golf — and the cleanest scorecard bet there is."
  heroSubtitleWidth: "520px"
  heroStats:
    - label: Players
      value: "Any number"
    - label: Format
      value: Total strokes
    - label: Best For
      value: Tournaments & events
    - label: Handicap
      value: Supported
    - label: Available In
      value: Marker
  heroCta:
    primary:
      text: Play Stroke Play in Marker
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
  finalCta:
    heading: Ready to Play Stroke Play?
    body: "Set up your event in under 60 seconds. Marker tracks every score, shows the live leaderboard, and settles the prize pool when the round ends."
    primary:
      text: Start Your Event
      href: "https://app.marker.golf"
    secondary:
      text: Read the Setup Guide
      href: "/tutorials/getting-started/"
sections:
  - id: overview
    label: Overview
  - id: how-it-works
    label: How It Works
  - id: gross-vs-net
    label: Gross vs Net
  - id: configuration
    label: Setup in Marker
  - id: example
    label: Example Round
  - id: leaderboard
    label: Leaderboard
  - id: settlement
    label: Settlement
  - id: strategy
    label: Strategy
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

{{ SectionHeader("Overview", "What Is Stroke Play?",
  "Every stroke counts. Add them all up. The player with the fewest strokes wins.") }}

<div class="gg-prose">

Stroke Play — also called **medal play** — is the simplest and most widely used scoring format in golf. Each player counts every stroke on every hole. The player with the lowest total score at the end of the round wins.

It's the format used in The Masters, the U.S. Open, the British Open, and virtually every professional and amateur tournament worldwide. If someone says "we're playing a tournament," they almost certainly mean stroke play.

The appeal is its directness: no holes to win or lose, no partners to rely on, no separate bets for the front nine. One number decides everything. A birdie on 18 is worth exactly as much as a birdie on 1. A double-bogey on any hole cannot be "recovered from" the way a lost hole can in match play — you carry it to the finish.

<div class="gg-callout">
<p><strong>Gross vs net:</strong> Stroke Play is played either gross (raw scores, no handicap adjustment) or net (handicap strokes subtracted). For competitive or mixed-ability groups, net stroke play levels the field. For competitive scratch events, gross is the standard. Both are supported in Marker.</p>
</div>

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">18</div>
<div class="gg-quick-stat__lbl">Holes counted</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">1</div>
<div class="gg-quick-stat__lbl">Minimum players</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">∞</div>
<div class="gg-quick-stat__lbl">Maximum players</div>
</div>
</div>

{{ MarkerImplNote("Marker supports Stroke Play for any number of players. All players in an event can compete in the same Stroke Play game even across different foursomes. Marker shows a live leaderboard ranked by score to par throughout the round.") }}

</div>
</section>

{# ================================================================
   HOW IT WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

{{ SectionHeader("Mechanics", "How Stroke Play Works",
  "Five steps from the first tee to the final leaderboard.") }}

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Set up the game</h3>
<p>Add all players to the Stroke Play game in Marker before the round starts. Players don't need to be in the same foursome — Marker's multi-card support lets players across different groups compete in the same event. Choose gross or net scoring and configure the optional prize pool.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Record a score on every hole</h3>
<p>Each player records their gross score on every hole — the total number of strokes taken, including penalty strokes. In net play, Marker automatically applies handicap strokes based on each hole's Stroke Index and the player's course handicap. No manual math required.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Marker tracks the running total</h3>
<p>The live leaderboard shows each player's score to par, updated after every hole. A player at −2 after 9 holes is 2 under par through 9. Players are ranked by their cumulative score to par, with more holes played as the tiebreaker for players at the same score mid-round.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Finish all 18 holes</h3>
<p>The winner is determined after all players complete the round. Unlike match play, the result cannot be decided before the 18th hole — every shot from hole 1 to hole 18 is in play. If two players finish tied on total score, they tie for that position.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">5</div>
<div class="gg-step__body">
<h3>Settle the prize pool</h3>
<p>If a prize pool is configured, Marker calculates the payouts automatically when the round is locked. The default is winner-take-all. Multiple payout positions (1st, 2nd, 3rd) can be configured before the round. Tied players at a paid position split the combined payout equally.</p>
</div>
</div>

</div>

</div>
</section>

{# ================================================================
   GROSS VS NET
   ================================================================ #}
<section class="section section--white" id="gross-vs-net">
<div class="container">

{{ SectionHeader("Handicaps", "Gross vs Net Stroke Play",
  "Whether to apply handicap strokes is the most important setup decision in stroke play.") }}

<div class="gg-prose">

**Gross stroke play**

Players record their raw scores with no adjustments. A 5 is a 5. The player with the best ball-striking wins. Gross play is the standard for scratch or low-handicap competitive events where ability differences are small enough that handicaps would distort results.

**Net stroke play**

Each player's course handicap is used to allocate "free strokes" across the 18 holes by Stroke Index. A player with a 12-handicap receives one stroke on each of the 12 highest-difficulty holes (SI 1–12). On those holes, their gross score is reduced by 1 before being counted. The player with the lowest net total wins.

Net stroke play is the right choice for:
- Groups with a wide range of handicaps
- Charity scrambles or corporate events where the goal is a fair competition
- Club events with official handicap indexes in play

**Percent of handicap**

Marker lets you play at a percentage of full handicap — 100%, 90%, 75%, or any custom value. Many competitive events use 75% or 80% to compress the spread between high and low handicappers without eliminating the adjustment entirely. The setting applies uniformly to all players.

| Setting | Effect |
|---|---|
| 100% (full) | Each player receives their full course handicap in strokes |
| 75% | Handicap strokes are reduced by a quarter — lower handicappers are relatively helped |
| 0% (gross) | No handicap adjustment — raw scores only |

**Half strokes**

When enabled, Marker applies fractional handicap strokes (0.5 per hole where applicable) rather than rounding to whole numbers. This is rarely used in casual events but can reduce distortion in close competitions.

</div>

{{ TipCard("For groups with a 10+ stroke spread in handicaps, net play almost always produces fairer results and keeps more players competitive through the back nine.", "Use net play for mixed-ability groups") }}

</div>
</section>

{# ================================================================
   CONFIGURATION
   ================================================================ #}
<section class="section" id="configuration">
<div class="container">

{{ SectionHeader("Setup", "Setup in Marker",
  "The key settings for a Stroke Play event — and what each one does.") }}

<div class="gg-prose">

When you create a Stroke Play game in Marker, the settings form has three sections: handicap, accounting, and player list.

</div>

<div class="gg-config-grid">

{{ ConfigCard(
  "Gross / Net",
  "useHandicap",
  "Off by default",
  "Toggle on for net play. Marker will allocate handicap strokes per hole based on each player's course handicap and the hole's Stroke Index."
) }}

{{ ConfigCard(
  "Percent of Handicap",
  "percentOfHandicap",
  "100%",
  "Play at a fraction of full handicap for competitive events. 75% is common for club championships. 100% is standard for recreational rounds."
) }}

{{ ConfigCard(
  "Entry Amount",
  "accounting.amount",
  "None",
  "Set a dollar amount per player to create a prize pool. Total pot = amount × number of players. Leave blank to track scores without a wager."
) }}

{{ ConfigCard(
  "Payout Positions",
  "accounting.payouts",
  "Winner takes all",
  "Configure how the pot is split. Add dollar amounts for 1st, 2nd, 3rd, etc. Tied players at a paid position split the combined payout. Unused pot goes to the winner if no split is configured."
) }}

</div>

<div class="gg-prose">

**Advanced handicap options**

Additional settings are available for competitive setups:

- **Max strokes** — cap the maximum handicap strokes any one player can receive (useful for preventing very high handicappers from dominating net events)
- **Half strokes** — apply fractional handicap strokes instead of whole numbers
- **Handicap overrides** — manually set a handicap index for specific players, bypassing their official index

**Multi-group events**

All players added to a single Stroke Play game compete on the same leaderboard regardless of which foursome they're in. You can run an event with 40 players across 10 groups and every player's score rolls up to the same competition.

</div>

</div>
</section>

{# ================================================================
   EXAMPLE
   ================================================================ #}
<section class="section section--white" id="example">
<div class="container">

{{ SectionHeader("Example", "A Four-Player Round",
  "The same round shows completely different winners on gross and net leaderboards.") }}

<div class="gg-prose">

**Setup:** 4 players, par 72, 18 holes. Entry: $20 each → $80 prize pool.

| Player | Handicap | Gross | Gross to Par | Net | Net to Par |
|---|---|---|---|---|---|
| Alice | 0 | 74 | +2 | 74 | +2 |
| Bob | 8 | 86 | +14 | 78 | +6 |
| Carol | 18 | 92 | +20 | 74 | +2 |
| Dave | 24 | 97 | +25 | 73 | +1 |

**Dave's net calculation:** Dave receives 18 handicap strokes — one stroke on each SI 1–18 hole. His 97 gross − 24 strokes = 73 net. A 24-handicapper shooting 97 wins the net competition with a net 73.

---

**Gross leaderboard (winner-take-all):**

| # | Player | Thru | To Par | Gross |
|---|---|---|---|---|
| 1 | Alice | 18 | +2 | 74 |
| 2 | Bob | 18 | +14 | 86 |
| 3 | Carol | 18 | +20 | 92 |
| 4 | Dave | 18 | +25 | 97 |

Alice wins $80.

---

**Net leaderboard (tiered: 1st = $48, 2nd = $32):**

| # | Player | Thru | To Par (net) | Net |
|---|---|---|---|---|
| 1 | Dave | 18 | +1 | 73 |
| T-2 | Alice | 18 | +2 | 74 |
| T-2 | Carol | 18 | +2 | 74 |
| 4 | Bob | 18 | +6 | 78 |

Dave wins 1st place: $48. Alice and Carol tie for 2nd — they split the $32 second-place prize, receiving $16 each. Bob receives nothing.

---

This example illustrates why format selection matters. Gross play rewards the best ball-striker; net play opens the competition to players at all ability levels.

</div>

</div>
</section>

{# ================================================================
   LEADERBOARD
   ================================================================ #}
<section class="section" id="leaderboard">
<div class="container">

{{ SectionHeader("Leaderboard", "The Marker Leaderboard",
  "What Marker tracks and displays throughout the round.") }}

<div class="gg-prose">

Marker's Stroke Play leaderboard is a live, updating view of the competition. It shows:

**Columns:**
- **#** — current rank
- **Player** — last name, first name
- **Thru** — holes completed
- **To Par** — cumulative score vs par (E for even, −2 for two under, +3 for three over); shown in red for under par
- **Total** — final gross or net total (shown after 18 holes are complete)
- **$** — payout amount, if a prize pool is configured

**Ranking logic:**
- Players are ranked by score to par, lowest first
- Mid-round ties (same score, same holes played) are shown as tied
- Mid-round, a player who has played more holes ranks above a player at the same score — the player with more data completed is treated as having the better result so far

**Mini scorecard:**
Tapping a player's row expands a hole-by-hole scorecard showing their score on each hole and a running par differential. Players on different tees see their own tee's par values, not a combined view.

**Header display:**
The leaderboard caption shows "Gross" or "Net X% handicap" so it's always clear which scoring mode is active.

</div>

</div>
</section>

{# ================================================================
   SETTLEMENT
   ================================================================ #}
<section class="section section--white" id="settlement">
<div class="container">

{{ SectionHeader("Settlement", "Prize Pool and Settlement",
  "How Marker calculates and displays payouts when the round ends.") }}

<div class="gg-prose">

**How the pool works**

Stroke Play uses a **pool structure**: all players contribute the same entry amount, and the total pot is distributed to the top finishers according to the configured payouts.

```
Pot = entry amount × number of players
```

**Default: winner takes all**

If no payout positions are configured, the entire pot goes to the 1st-place finisher.

**Splitting the pot**

You can configure dollar amounts for multiple finishing positions before the round. The amounts should sum to the expected pot size. For example, with 4 players at $20 each ($80 pot):

| Payout position | Amount |
|---|---|
| 1st | $48 |
| 2nd | $20 |
| 3rd | $12 |

**Ties at a paid position**

When two players tie for a paid position, Marker combines the prize money for that position and the next position, then splits it equally.

**Example:** If 1st and 2nd pay $48 and $20 respectively, and two players tie for 1st, each receives ($48 + $20) ÷ 2 = $34.

**Locking the round**

Payouts are calculated when the event is locked at the end of the round. Marker displays the final amounts owed in the game summary.

</div>

</div>
</section>

{# ================================================================
   STRATEGY
   ================================================================ #}
<section class="section" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "Stroke Play Strategy",
  "How stroke play changes the way you think about risk on the course.") }}

<div class="gg-prose">

**Protect against blow-up holes**

In match play, a triple bogey on hole 3 only costs you one hole. In stroke play, it goes on your permanent record and must be overcome with birdies elsewhere. Good stroke play demands **conservative course management** on high-risk holes — especially early in the round before you know how the field is scoring.

**Score to par, not score against the field**

You often can't see what your competitors are doing mid-round. Focus on your own card. Making par on every hole produces a respectable 72. Making bogey on 15 holes and birdie on 3 produces a 78 that looks worse than it felt. Consistent, mistake-free golf beats speculative hero shots.

**When to attack**

Stroke play does reward birdies. If you're at even par through 12 holes, a course with reachable par 5s on 13 and 16 rewards going for it. The calculus shifts: the downside of a blown par 5 (bogey or double) is more manageable than missing a short birdie chance you created by laying up.

**Handicap holes in net play**

In net stroke play, your handicap strokes are most valuable on the highest-difficulty holes (SI 1, 2, 3…). These are typically long, tight, or technically demanding. A net par on a SI-1 hole where you receive a stroke is a gross bogey — acceptable. Don't chase net birdies at the cost of a net double.

**Watch the "thru" column**

On the Marker leaderboard, players are listed with their "thru" count. A player showing −4 through 12 holes is not the same as a player at −4 through 18. Use the live leaderboard to understand where the competition actually stands.

</div>

</div>
</section>

{# ================================================================
   VARIATIONS
   ================================================================ #}
<section class="section section--white" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Common Variations",
  "How stroke play adapts for different event formats.") }}

<div class="gg-prose">

**Low gross / low net in the same round**

Many club events run both competitions simultaneously. Players compete for the low gross prize (best raw score) and a separate low net prize (best handicap-adjusted score). It's common for the same round to have two different winners. Marker tracks both automatically when net scoring is enabled — the leaderboard can be viewed in either mode.

**Stableford**

Stableford is stroke play's close cousin — players still count strokes on every hole, but the scoring converts to points (birdie = 3, par = 2, bogey = 1, double bogey or worse = 0). One bad hole costs you less than in stroke play. Marker's [Stableford](/games/stableford/) game handles this natively.

**Partial rounds (9-hole stroke play)**

Stroke Play in Marker is configured by the event's hole count. A 9-hole event scores only those holes. Par and handicap allocations adjust automatically to the holes in play.

**Playing to a quota**

Some stroke play formats use a "quota" where each player sets a target based on their handicap (typically 36 minus their handicap index) and tries to beat it. This is handled by [Stableford](/games/stableford/) in Quota mode, not Stroke Play directly.

**Scramble**

A scramble is not stroke play — the team selects the best shot after each swing, meaning individual accountability disappears. Scramble is a separate format. Marker's Team Stroke Play supports best-ball variants, but a full scramble requires players to coordinate shot selection manually before entering a single team score.

</div>

</div>
</section>

{# ================================================================
   FAQ
   ================================================================ #}
<section class="section" id="faq">
<div class="container">

{{ SectionHeader("FAQ", "Frequently Asked Questions", "") }}

<div class="gg-faq">

{{ FaqItem(
  "Does Stroke Play support more than 18 holes?",
  "Marker's Stroke Play tracks scores for the holes played in an event. Most events are 18 holes, but the format works for any number of holes the event is configured for. All players in the same game compete on the same leaderboard regardless of how many holes the round covers."
) }}

{{ FaqItem(
  "How are handicap strokes allocated per hole?",
  "Marker uses each hole's Stroke Index (SI) and the player's course handicap. A player with a course handicap of 10 receives one stroke on the 10 holes with the lowest SI numbers (SI 1–10). On those holes, their gross score is reduced by 1 to produce their net score. Marker calculates this automatically for every player."
) }}

{{ FaqItem(
  "What happens if a player doesn't finish all 18 holes?",
  "Marker tracks how many holes each player has completed (the 'thru' column). During the round, unfinished players are ranked below players who have played more holes at the same score. The final prize pool is calculated after all players lock their cards — players who haven't finished all holes may still be ranked, but they won't reflect a complete round."
) }}

{{ FaqItem(
  "Can I run Stroke Play alongside another game in the same round?",
  "Yes. Multiple games can run simultaneously in the same Marker event. A common setup is Stroke Play (for the overall competition or prize pool) alongside Nassau or Skins (for per-hole side bets). Each game is scored and settled independently."
) }}

{{ FaqItem(
  "How does Marker handle ties in the final standings?",
  "Tied players receive equal rank in the final standings. For prize pool purposes, Marker splits the combined payout for the tied positions equally. If 1st place pays $48 and 2nd pays $20, two players tied for 1st each receive ($48 + $20) ÷ 2 = $34."
) }}

{{ FaqItem(
  "Is there a maximum number of players?",
  "There's no hard cap. Stroke Play in Marker works for events of any size. Large events with players across many foursomes can all compete in the same game — Marker's multi-card support means a player's scorecard updates the competition leaderboard in real time regardless of which group they're playing in."
) }}

</div>

</div>
</section>

{# ================================================================
   RELATED GAMES
   ================================================================ #}
<section class="section section--white" id="related">
<div class="container">

{{ SectionHeader("Related", "Related Games", "Games that pair naturally with Stroke Play — or offer a different take on the same round.") }}

<div class="gg-related-grid">

{{ RelatedCard(
  "Stableford",
  "Points-based scoring where one bad hole doesn't torpedo your round. Birdie earns 3, par earns 2, bogey earns 1.",
  "/games/stableford/"
) }}

{{ RelatedCard(
  "Skins",
  "Win individual holes outright — ties carry the pot forward. Runs as a natural side game alongside stroke play.",
  "/games/skins/"
) }}

{{ RelatedCard(
  "Nassau",
  "Three separate match play bets on the front, back, and overall 18. The classic money game alongside a stroke play event.",
  "/games/nassau/"
) }}

{{ RelatedCard(
  "Team Stroke Play",
  "Combine individual stroke scores into team totals. Best-ball or aggregate — perfect for team competitions.",
  "/games/team-stroke-play/"
) }}

</div>

</div>
</section>
