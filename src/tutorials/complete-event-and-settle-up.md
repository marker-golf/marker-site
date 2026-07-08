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
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventCompleteConfirm", screenshots, frame="phone", caption=true) }}
</div>
<p>When all groups are done and scores are correct, the event organizer taps <strong>Complete event</strong> in the event dashboard sticky footer. A confirmation sheet appears: <em>"By completing this event, you attest that the scores are correct. Scorecards lock and per-game results freeze. You can unlock later if you need to make changes."</em> Tap <strong>Complete event</strong> to confirm.</p>
<p>After completion, the event dashboard shows <strong>This event is complete.</strong> If you need to correct a score, tap <strong>Unlock</strong> from that banner — scorecards become editable again and game summaries recalculate live.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Review final results</h3>
<p>Tap the <strong>trophy icon</strong> to open the Event leaderboard. The <strong>Event in progress</strong> badge is gone — standings are now final. Each Event Game card shows its frozen result, and the <strong>Event total</strong> section below reflects the final accounting across all Event Games.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Settle up</h3>
<p>The <strong>Settlement</strong> tab in the Event total section shows exactly who pays whom and how much — one row per payment needed. If any Event Game uses a pool buy-in, a <strong>Buy-ins collected</strong> checkbox appears: check it to settle from the collected pot first and show only residual payments between players; uncheck it to show all settlements as direct player-to-player amounts.</p>
<p>Event total covers Event Games only. If any scorecard has Side Games, those settle separately on that scorecard's own leaderboard and are not rolled into the Event total.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventCompleteFinalSettlement", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Check profit and loss</h3>
<p>Tap the <strong>Profit / loss</strong> tab in the Event total section to see a per-player summary: gross winnings across all Event Games, buy-in cost (when applicable), and net result. Positive net values are shown in green; negative in red.</p>
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
