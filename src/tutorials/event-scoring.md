---
layout: layouts/tutorial-guide.njk
title: Publish & Follow Event Scoring
description: Publish scorecards to distribute links to players, then follow Event Game standings as the round progresses.
subtitle: "Publish scorecards to players, follow Event Game standings as the round progresses, and share the live leaderboard."
category: Running Events
order: 3
tutorialPath: event
tutorialOrder: 5
estimatedTime: "3 min read"
cardDescription: "Publish scorecards to players, follow live Event standings, and share the leaderboard as the round progresses."
iconSvg: '<polyline points="18 20 18 10"/><polyline points="12 20 12 4"/><polyline points="6 20 6 14"/>'
relatedTutorials:
  - title: "Side Games →"
    url: "/tutorials/side-games/"
nextLabel: "Up next"
cta:
  heading: "Ready to run the round?"
  body: "Open Marker and publish your scorecards to get everyone started."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Publish scorecards</h3>
<p>From the event dashboard, tap <strong>Publish scorecards</strong> in the sticky footer. Marker sends each player a text message with a link to their individual scorecard. Players can open the link on any phone — no Marker account required to enter scores or view the leaderboard.</p>
<p>There is no separate "Start Event" action. Publishing is the step that distributes scorecards and opens the event for scoring. After publishing, the footer button changes to <strong>Complete event</strong>, and a <strong>Republish scorecards</strong> option appears inside the Scorecards section for resending links if needed.</p>
<p>Event Games remain editable and scorecard assignments can still be adjusted while the event is unlocked. Publishing does not lock the event.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Follow the Event leaderboard</h3>
<p>Tap the <strong>trophy icon</strong> in the event dashboard header to open the Event leaderboard. The trophy icon appears whenever at least one Event Game is configured. The Event leaderboard shows one standings card per Event Game — sorted by net score, points, or game-specific ranking depending on the format.</p>
<p>An <strong>Event in progress</strong> badge appears at the top of the leaderboard while the event is unlocked. This marks all results as provisional until the event is completed.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Track scoring across the field</h3>
<p>The Event leaderboard brings together scoring and standings from across the field as the round progresses. You can see where every player stands even if groups are on different holes. For multi-game events, a separate standings card appears for each active Event Game.</p>
<p>Any player with a scorecard link can also open the Event leaderboard — the event organizer and players see the same standings.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventScoringLiveLeaderboard", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Check provisional Event totals</h3>
<p>Scroll below the game standings cards to see the <strong>Event total</strong> section. This combines the accounting impact across all Event Games — who owes whom and how much — based on scores entered so far. Values here are provisional while the event is in progress and become final when the event is completed.</p>
<p>The <strong>Settlement</strong> tab (the default) shows player-to-player payment amounts. The <strong>Profit / loss</strong> tab shows each player's gross winnings and net result. Both tabs are available during the round and update as scoring progresses.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Share the leaderboard</h3>
<p>Tap <strong>Share leaderboard</strong> at the bottom of the Event leaderboard screen to copy and send the leaderboard link. Anyone with the link can view the standings in their browser — no Marker account needed. Useful for club members or spectators following along who aren't part of any scorecard group.</p>
</div>
</div>

</div>

<div class="tutorial-note">
<p><strong>When scores are final:</strong> Once all groups have finished and scores are correct, complete the event to lock scorecards, freeze results, and run final settlement. The next tutorial walks through that process.</p>
</div>
