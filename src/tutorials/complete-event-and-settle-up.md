---
layout: layouts/tutorial-guide.njk
title: Complete the Event & Settle Up
description: Complete the Event to lock scorecards and freeze results, then review final standings and settle every game.
subtitle: "Complete the Event to lock scorecards and freeze results, then review final standings and settle up across all Event Games."
category: Running Events
order: 4
tutorialPath: event
tutorialOrder: 6
estimatedTime: "3 min read"
cardDescription: "Complete the Event, review final standings, and settle every Event Game — all from the Event leaderboard."
iconSvg: '<polyline points="20 6 9 17 4 12"/>'
relatedTutorials:
  - title: "Side Games →"
    url: "/tutorials/side-games/"
nextLabel: "Up next"
cta:
  heading: "Ready to wrap up?"
  body: "Complete your event and settle every game from the Marker leaderboard."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Complete the event</h3>
<p>Once scoring is done, players can end their individual scorecard from the scorecard view. Tapping <strong>End round</strong> locks just that scorecard and asks for confirmation. Individual scorecards do not need to be separately ended before the event organizer completes the event — but players may do so when their group finishes.</p>
<p>When all groups are done and scores are correct, the event organizer taps <strong>Complete event</strong> in the event dashboard sticky footer. A confirmation appears: <em>"Complete this event. Once all the scores are in, you can complete the event. This will lock the scorecards, prevent further edits, and finalize the game results."</em> Tap <strong>Yes</strong> to confirm.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventCompleteConfirm", screenshots, frame="phone", caption=true) }}
</div>
<p>After completion, the event dashboard shows <strong>This round is complete.</strong> If you need to correct a score, tap <strong>Unlock</strong> there and confirm — scorecards become editable again and game summaries recalculate.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Review final results</h3>
<p>Tap the <strong>trophy icon</strong> to open the Event leaderboard. The <strong>Event in progress</strong> badge is gone — standings are now final. Each Event Game section shows its final result, and <strong>Overall - event</strong> below reflects the final accounting across all Event Games. It opens expanded once the event is complete.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Settle up</h3>
<p>The <strong>Settlement</strong> view in <strong>Overall - event</strong> shows exactly who pays whom and how much — one row per payment needed. If any Event Game has a pool buy-in, a <strong>Buy-ins collected</strong> checkbox appears, checked by default. Checked, Marker settles from the pot for buy-in games, then between players for the rest; unchecked, it settles everything directly between players, as if buy-ins were never collected. The checkbox only changes how the settlement is displayed — it isn't saved and doesn't change anyone's results.</p>
<p>In the example below, every game had a $10 buy-in, so with <strong>Buy-ins collected</strong> checked each row is a payment from the pot to a winner, and the payouts add up to exactly the buy-ins collected.</p>
<p>Marker calculates and displays these amounts; it doesn't process payments. Settle up however your group usually does.</p>
<p>Overall - event covers Event Games only. If any scorecard has Side Games, those settle separately on that scorecard's own leaderboard (under <strong>Overall - side games</strong>) and are not rolled into the event total.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventCompleteFinalSettlement", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Check profit and loss</h3>
<p>Tap <strong>Profit/loss</strong> in Overall - event to see a per-player summary: gross winnings across all Event Games and, when games have buy-ins, each player's buy-in and net result (gross minus buy-in).</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Series standings</h3>
<p>If this event is part of a series, its results feed into the series standings automatically when the event is completed — no separate save step is needed. Tap the series name in the Event leaderboard header to navigate to the series and view cumulative standings across all events in the group.</p>
</div>
</div>

</div>

<div class="tutorial-note">
<p><strong>Sharing final results:</strong> Tap <strong>Share leaderboard</strong> at the bottom of the Event leaderboard to copy and send the leaderboard link. Anyone with the link can view the final standings in their browser — no Marker account needed.</p>
</div>
