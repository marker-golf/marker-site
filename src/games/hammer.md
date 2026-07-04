---
layout: layouts/game-guide.njk
title: Hammer — Golf Game Guide
description: "Hammer explained: how to drop a Hammer, when to accept or double back, worked examples, and strategy. The pressure game that makes every shot feel different."
status: coming-soon
category: featured
order: 2
players: "2 or 4"
format: "Match Play overlay"
cardDescription: "Double the bet on any hole by dropping a Hammer. The other side can accept or double back. Marker tracks all active multipliers and calculates the final payout."
game:
  name: Hammer
  difficulty: intermediate
  difficultyLabel: Intermediate
  subtitle: "Drop a Hammer to double the hole. The other side accepts and plays on — or concedes and walks away. Simple premise. Maximum pressure."
  heroSubtitleWidth: "540px"
  heroStats:
    - label: Players
      value: "2 or 4"
    - label: Format
      value: Match Play overlay
    - label: Best For
      value: Pressure games
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
    heading: Ready to Play Hammer?
    body: "Hammer support is in development for Marker — automatic multiplier tracking and payout calculation, built into your round. Try Marker's other formats while you wait."
    primary:
      text: Try Marker Today
      href: "https://app.marker.golf"
    secondary:
      text: Browse All Games
      href: "/games/"
sections:
  - id: overview
    label: Overview
  - id: how-it-works
    label: How It Works
  - id: timing
    label: When to Throw
  - id: example
    label: Worked Example
  - id: hammer-vs-press
    label: Hammer vs. Press
  - id: marker-support
    label: Hammer in Marker
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

{{ SectionHeader("Overview", "What Is Hammer?",
  "A match play overlay where either side can double the current hole's value at any moment — and the opponent must accept or walk away.") }}

<div class="gg-prose">

Hammer is one of golf's purest pressure games. It doesn't replace the underlying format — it sits on top of Match Play, Nassau, Skins, or any other game and adds a layer of strategic doubling to every hole. At any point during a hole, one side can "drop" or "throw" the Hammer. The other side must make an immediate decision: **accept** (play the hole at twice the value) or **concede** (hand the hole to the throwing side at the original value).

That's it. The rules are simple. The psychology is anything but.

A well-timed Hammer forces your opponent to make a high-stakes decision under pressure, often before their next shot. A poorly-timed one hands a confident opponent even more money at favorable odds. And if the receiving side takes the Hammer and immediately fires it back — re-doubling — the hole can escalate quickly.

<div class="gg-callout">
<p><strong>Why golfers love it:</strong> Hammer changes the feel of every shot. A routine approach becomes a decision point. A made putt triggers a throw. A shot into the rough invites an immediate Hammer from the other side. The game rewards nerve as much as ball-striking.</p>
</div>

</div>

<div class="gg-quick-stats">
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">2×</div>
<div class="gg-quick-stat__lbl">Value per Hammer thrown</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">∞</div>
<div class="gg-quick-stat__lbl">Re-hammers (no limit by default)</div>
</div>
<div class="gg-quick-stat">
<div class="gg-quick-stat__val">0</div>
<div class="gg-quick-stat__lbl">Holes left unaffected</div>
</div>
</div>

{{ MarkerImplNote("Hammer is Coming Soon in Marker. This guide explains the format and strategy. Marker will track active multipliers and calculate payouts automatically when Hammer launches.") }}

</div>
</section>

{# ================================================================
   HOW IT WORKS
   ================================================================ #}
<section class="section" id="how-it-works">
<div class="container">

{{ SectionHeader("Mechanics", "How Hammer Works",
  "A simple four-step loop that can repeat as many times as the hole allows.") }}

<div class="gg-steps">

<div class="gg-step">
<div class="gg-step__num">1</div>
<div class="gg-step__body">
<h3>Set the base value</h3>
<p>Before the round, both sides agree on a base bet — typically a dollar amount per hole (e.g., $1/hole, $2/hole). This is the value of each hole before any Hammers are thrown. All other side games (Nassau, Skins) continue alongside Hammer at their own values. Hammer only doubles the Hammer-specific hole value.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">2</div>
<div class="gg-step__body">
<h3>Throw the Hammer</h3>
<p>At any point during the hole — after a tee shot, before an approach, after a chip — either side can call "Hammer." This signals their intent to double the current hole value. The throw must be declared before the next shot is struck by the other side (exact timing rules are set before the round). Both players on the throwing side must agree if it's a team game.</p>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">3</div>
<div class="gg-step__body">
<h3>Accept or concede</h3>
<p>The receiving side must respond immediately. There are exactly two choices:</p>
<ul>
<li><strong>Accept:</strong> The hole value doubles. Play continues. The receiving side now has the option to re-throw the Hammer themselves at any later point on the same hole.</li>
<li><strong>Concede (lay down):</strong> The throwing side wins the hole — but only at the <em>pre-Hammer</em> value. They do not collect the doubled amount; they collect what the hole was worth before they threw.</li>
</ul>
</div>
</div>

<div class="gg-step">
<div class="gg-step__num">4</div>
<div class="gg-step__body">
<h3>Re-throw and settle</h3>
<p>Once a Hammer is accepted, the receiving side can throw it back at any point, doubling the value again. This can repeat: 1× → 2× → 4× → 8× → … There's no built-in limit, though most groups set one before the round. The hole settles at the end: the winner collects the final multiplied value, the loser pays it.</p>
</div>
</div>

</div>

<div class="gg-prose">

**The concession math**

Conceding is not always the losing move. If Side A throws the Hammer when their opponent is in a terrible lie and Side B concedes, Side A wins the hole at 1×. But if Side B had accepted and made a miraculous recovery, Side A would have been at risk of losing at 2×. The value of conceding is knowing you've capped your loss.

Similarly, the value of throwing the Hammer is not always getting the double — it's often forcing the concession when you're in a strong position and making your opponent give up the hole cheaply.

</div>

</div>
</section>

{# ================================================================
   TIMING
   ================================================================ #}
<section class="section section--white" id="timing">
<div class="container">

{{ SectionHeader("Timing", "When Can You Throw the Hammer?",
  "The most important house rule you need to agree on before teeing off.") }}

<div class="gg-prose">

Hammer doesn't have a single universal ruleset — the timing of when a Hammer can be thrown is the most variable aspect of the game, and groups handle it differently. You must agree on the timing rule before the first tee.

**Common timing rules:**

| Rule | When you can throw | Notes |
|---|---|---|
| **Before any shot** | At any time before the next shot is struck | Most common and fast-moving; lots of pressure |
| **Tee shot only** | Only off the tee, before anyone tees off | Simplest; limits doubling to once per hole |
| **Before second shot** | After tee shots are complete, before second shots | Balances information (you've seen drives) with pressure |
| **Any time until putt** | At any point until the first putt is made | Very aggressive; can double mid-putt decision |

**"Before the next shot" is the standard rule for experienced groups.** It means: once someone announces "Hammer," the other side must respond before anyone touches their ball. This keeps the game moving and prevents strategic delays.

**Team rules:** In a 4-player game (2v2), a Hammer typically requires both players on one side to agree before it's thrown. Some groups allow either player to throw unilaterally. Settle this before you start.

</div>

{{ TipCard("Write the timing rule on the scorecard or announce it clearly on the first tee. Nothing ruins a Hammer game faster than a disputed throw mid-round.", "Settle the timing rule before hole 1") }}

</div>
</section>

{# ================================================================
   WORKED EXAMPLE
   ================================================================ #}
<section class="section" id="example">
<div class="container">

{{ SectionHeader("Example", "A Hammer Hole Step by Step",
  "Side A vs. Side B, $2 base value per hole. Watch how the multiplier escalates.") }}

<div class="gg-prose">

**Setup:** 2v2 match. Base Hammer value: $2/hole. Timing rule: before any shot. Hole 7, par 4.

---

**Tee shots:**

- Side A: one in the fairway, one in the rough
- Side B: both in the fairway, one close to the ideal approach angle

Side B holds a clear positional advantage.

---

**Before Side A's second shots:**

Side B throws the **Hammer**. The hole is worth $2 — throw it now and force Side A to decide before they even play from the rough.

Side A's choice:

- **Concede:** Side B wins the hole. Side B collects $2. Done.
- **Accept:** The hole is now worth $4. Play continues.

Side A accepts. They're confident their fairway ball can recover the advantage.

---

**Side A's approach:**

The fairway player hits a crisp 8-iron to 12 feet. The rough player makes a decent chip but is 30 feet out.

Side A has momentum. Before Side B hits their approach, Side A throws the **Hammer back**. The hole is now worth $4 if accepted — they're throwing from a position of strength.

Side B's choice:

- **Concede:** Side A wins the hole. Side A collects $4. Done.
- **Accept:** The hole is now worth $8. Play continues.

Side B has a good approach shot lined up. They accept.

---

**Side B's approach:**

One player hits to 8 feet. The other misses the green. Side B now has an 8-footer with their partner 20 feet out.

No more Hammers are thrown. Both sides play out the hole.

**Results:**

| Player | Score |
|---|---|
| Side A best ball | Birdie (hole value: 8 feet birdie putt — made) |
| Side B best ball | 8-foot birdie putt — missed. Par. |

Side A wins the hole with a birdie.

**Payout:** Side A collects $8 (base $2, doubled twice: ×4 total).

---

**Key takeaways from this hole:**
- Side B threw the first Hammer from a position of strength (better tee shots) — a classic use.
- Side A accepted and immediately threw it back when the situation reversed — smart counter-play.
- Side B accepted the re-throw and lost. Aggressive back-and-forth escalated a $2 hole to $8.

</div>

</div>
</section>

{# ================================================================
   HAMMER VS. PRESS
   ================================================================ #}
<section class="section section--white" id="hammer-vs-press">
<div class="container">

{{ SectionHeader("Comparison", "Hammer vs. Nassau Press",
  "Two doubling mechanics in golf — but they work very differently.") }}

<div class="gg-prose">

Players new to Hammer often confuse it with the Press in Nassau. They're both "doubling" mechanics, but the scope is completely different:

| | Hammer | Nassau Press |
|---|---|---|
| **Scope** | Doubles one hole's value | Starts a new side bet on remaining holes |
| **Who can trigger** | Either side, any time | Usually only the trailing side |
| **Effect** | Multiplies the current hole | Creates a parallel bet alongside the original |
| **Reversible** | Partially (by conceding) | No — once pressed, the bet runs |
| **Re-double** | Yes — throw it back | Yes — press the press |
| **Settled** | End of the hole | End of the 9 or 18 |

**The key difference in feel:** A Hammer resolves on a single hole. A press compounds across multiple holes. Hammer is a hole-level decision; a press is a momentum play.

**Can you run both together?** Yes, and many groups do. A Nassau provides the main match structure (three separate front/back/total bets), and Hammer sits on top, escalating individual hole values within that structure. The Nassau press handles bigger momentum swings; Hammer handles individual high-value holes.

</div>

</div>
</section>

{# ================================================================
   HAMMER IN MARKER
   ================================================================ #}
<section class="section" id="marker-support">
<div class="container">

{{ SectionHeader("Marker Support", "Hammer in Marker",
  "Full Hammer support is in development. Here's what's coming.") }}

<div class="gg-prose">

**Status: Coming Soon**

Hammer is listed as Coming Soon in Marker. When it launches, the planned support includes:

- **In-round Hammer throws** — either side can trigger a Hammer directly in the app, from the scorecard view
- **Accept / concede prompt** — the other side gets an immediate notification and responds in-app
- **Multiplier tracking** — Marker tracks the current hole's multiplier in real time, so there's no mental math mid-round
- **Re-throw support** — the receiving side can throw the Hammer back, and Marker handles the escalating value automatically
- **Payout calculation** — when the round ends, Marker calculates what each side owes across all holes, factoring in every multiplier

No more pencil-and-paper tracking of who threw when and at what value. Marker handles it.

</div>

<div class="gg-callout">
<p><strong>While you wait:</strong> Marker's Nassau format already supports automatic press tracking within a three-bet structure. If you want a pressure game with real-time doubling today, Nassau with presses is the closest available format.</p>
</div>

</div>
</section>

{# ================================================================
   STRATEGY
   ================================================================ #}
<section class="section section--white" id="strategy">
<div class="container">

{{ SectionHeader("Strategy", "When to Throw — and When Not To",
  "The Hammer is a weapon. Like any weapon, timing is everything.") }}

<div class="gg-prose">

**Throw from strength, not desperation**

The most common Hammer mistake is throwing from a position of weakness in hopes of a concession. Your opponent is already in a strong position — why would they concede? A well-positioned opponent will almost always accept, and now you're on the hook for 2×. Throw when you've just gained a clear advantage: a ball close to the pin, opponent in trouble, or a critical putt holed.

**Use the threat of a re-hammer**

When deciding whether to accept or concede, factor in whether you can throw it back. If you accept and immediately re-throw — before you play your next shot — you force your opponent to respond. Sometimes the value of accepting is not surviving the hole, but getting to throw a surprise counter-Hammer when the other side is committed.

**Know your opponent's risk tolerance**

Some players always lay down when Hammered. Against them, a Hammer from any reasonable position forces a free concession. Others always accept regardless. Against those players, only Hammer when you're genuinely in the stronger position, because they'll never give you the hole cheaply.

**The concession walk is not weakness**

Laying down a hole at 1× when you're about to face a 2× risk on a vulnerable shot is correct play. Over 18 holes, protecting yourself from 4× and 8× holes is worth more than the pride of never conceding. The best Hammer players concede judiciously and throw precisely.

**Multiplier caps**

If your group plays with a multiplier cap (e.g., max 8× per hole), this shapes strategy significantly. At 4× with a cap of 8×, you have exactly one more throw available. Both sides know this. Play accordingly.

</div>

{{ TipCard("Keep a mental tab of the holes where you've been outmatched all day. Those are the holes where a well-timed Hammer from your side — forcing a concession — can recover value you'd otherwise just lose anyway.", "Use the Hammer as damage control too") }}

</div>
</section>

{# ================================================================
   VARIATIONS
   ================================================================ #}
<section class="section" id="variations">
<div class="container">

{{ SectionHeader("Variations", "Common Rule Variations",
  "How different groups modify the format — agree on your rules before teeing off.") }}

<div class="gg-prose">

**Tee shot Hammer only**

The simplest version: the Hammer can only be thrown before anyone tees off. Once tee shots are in the air, the hole value is locked. This eliminates mid-hole pressure but is easier to manage in casual groups.

**Max multiplier**

Most groups set a cap — 4× and 8× are common — to prevent a single hole from becoming financially ruinous. Without a cap, a hole that starts at $1 could theoretically reach $64 or more. A cap keeps the game fun without removing the escalation dynamic.

**Mandatory acceptance**

Some ultra-aggressive versions eliminate the concession option: you must accept every Hammer. This turns the game into a pure multiplier game rather than a pressure game — it removes the concession strategy, so only throw it when you have a genuine advantage.

**Solo Hammer (2-player)**

With two players, either player can throw the Hammer at any time before the other player's next shot. The dynamics are the same, but without the partnership consultation. 2-player Hammer can be played on top of any head-to-head format.

**Hammer plus Nassau**

The most popular combination. Nassau provides three structured bets (front, back, total) with optional presses; Hammer adds hole-level doubling across all three simultaneously. A Hammer on hole 7 doubles the value of that hole in the context of whichever Nassau bets are active on that hole. This is the format most commonly called "Nassau with Hammers."

**Hammer plus Skins**

Hammer can overlay Skins, where each hole has a pot value that carries over on ties. Throwing and accepting a Hammer before holing out for Skins means the skin is worth 2× (or 4×, etc.) if it's won on that hole. High-variance but popular for groups that want maximum stakes on the par 5s.

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
  "Can you throw a Hammer after seeing your opponent's shot?",
  "It depends on your timing rule. Under the 'before any shot' rule, you can throw after your opponent's last shot but before they play again — which means you can react to information. Under the 'tee shot only' rule, you never get to react to approach shots. Agree on your timing rule before the round."
) }}

{{ FaqItem(
  "What happens if you concede — does the thrower collect double?",
  "No. When the receiving side concedes, the throwing side wins the hole at the value it was before the Hammer was thrown. If the base is $2 and Side A throws the Hammer, Side B concedes, Side A collects $2 — not $4. The double only applies if the Hammer is accepted."
) }}

{{ FaqItem(
  "Is there a limit to how many times you can re-throw the Hammer on one hole?",
  "There's no built-in limit in the standard format. Most groups set one before the round (e.g., max 8× per hole). Without a cap, a hole could theoretically escalate without bound — 1×, 2×, 4×, 8×, 16×, and so on. Decide your cap before the first tee."
) }}

{{ FaqItem(
  "Does Hammer work with handicaps?",
  "Yes. Hammer is an overlay on whatever underlying format you're playing. If the base game uses net scores (with handicap strokes applied), then the Hammer operates on the net result. Handicap strokes don't directly affect Hammer throws — you're still doubling the hole value, not the strokes."
) }}

{{ FaqItem(
  "What's the difference between Hammer and Doubling in backgammon?",
  "They share the same psychological core — offer a double, force a concession-or-accept decision — but golf's Hammer applies per hole and can be thrown by either side at any time, not just when you're favored statistically. The concession analogy holds: lay down when the risk outweighs the reward."
) }}

{{ FaqItem(
  "When will Hammer be available in Marker?",
  "Hammer is in development and listed as Coming Soon in the Marker app. No specific release date has been announced. Marker's Nassau format with presses is available today and provides a related pressure-betting experience."
) }}

</div>

</div>
</section>

{# ================================================================
   RELATED GAMES
   ================================================================ #}
<section class="section" id="related">
<div class="container">

{{ SectionHeader("Related", "Related Games", "Games that pair naturally with Hammer — or scratch the same itch.") }}

<div class="gg-related-grid">

{{ RelatedCard(
  "Nassau",
  "Three simultaneous match play bets with automatic press tracking. The most popular companion game for Hammer.",
  "/games/nassau/"
) }}

{{ RelatedCard(
  "Match Play",
  "The foundation under Hammer — hole-by-hole competition with real-time standings. Hammer sits on top of it.",
  "/games/match-play/"
) }}

{{ RelatedCard(
  "Skins",
  "Hole-by-hole pot game where ties carry the skin forward. Hammer can overlay Skins to multiply individual skin values.",
  "/games/skins/"
) }}

{{ RelatedCard(
  "Wolf",
  "Per-hole team selection where the Wolf faces the other three. High per-hole stakes that Hammer complements naturally.",
  "/games/wolf/"
) }}

</div>

</div>
</section>
