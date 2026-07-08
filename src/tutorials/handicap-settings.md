---
layout: layouts/tutorial-guide.njk
title: Using Handicaps in Marker
description: "A complete guide to handicap configuration in Marker — how course handicap is calculated, how strokes are allocated, and how to adjust settings for your group."
subtitle: "Configure how Marker calculates and applies handicap strokes — from full USGA course handicap to flat allowances and gross play."
category: Running Events
order: 2
tutorialPath: reference
tutorialOrder: 2
estimatedTime: "5 min read"
cardDescription: "Configure course handicap calculation, stroke allocation, percentage modes, and USGA score posting."
iconSvg: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>'
relatedTutorials:
  - title: "Event Scoring →"
    url: "/tutorials/event-scoring/"
nextLabel: "See also"
cta:
  heading: "Ready to configure your round?"
  body: "Handicap calculations, stroke allocation, and USGA posting — all automatic in Marker."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Course Handicap</h3>
<p>Marker converts each player's handicap index to a course handicap using the official USGA formula:</p>
<p><em>Course Handicap = Handicap Index × (Slope Rating ÷ 113) + (Course Rating − Par)</em></p>
<p>Tee selection determines the slope, rating, and par used in the calculation. When adding or editing a player, the tee picker shows the calculated course handicap for each available tee set alongside the rating and slope — so you can confirm the right number before saving.</p>
<p>Strokes are allocated hole by hole using the course's handicap stroke index:</p>
<ul>
<li>A 12-handicap player receives one stroke on each of the 12 hardest-rated holes</li>
<li>A 20-handicap player receives one stroke on all 18 holes plus a second stroke on the 2 hardest holes</li>
</ul>
<p>On the scorecard, a bullet dot (<strong>•</strong>) appears in the corner of a score cell for each stroke a player receives on that hole. Two dots means two strokes on that hole; three dots is the visual maximum shown, though more may apply. A player with a plus course handicap gives strokes back rather than receiving them — a plus sign (<strong>+</strong>) appears on the holes where they owe a stroke in net scoring.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Net and Gross</h3>
<p>Every game in Marker has a primary handicap toggle at the top of the game configuration form: <strong>Net</strong> or <strong>Gross</strong>.</p>
<ul>
<li><strong>Net</strong> — each player's course handicap is applied hole by hole. Game scoring and leaderboards reflect the handicap-adjusted result.</li>
<li><strong>Gross</strong> — no handicap adjustments. All scoring uses raw scores. No stroke indicators appear on the scorecard. Handicap indexes are still stored for every player and remain available for USGA score posting at the end of the round.</li>
</ul>
<p>Under Net, a <strong>Stroke off the low ball</strong> checkbox is available. When enabled, all players' stroke allocations are re-based relative to the lowest-handicap player in the game rather than relative to par. The lowest-handicap player receives zero strokes; every other player receives the difference between their handicap and the low player's. Any player whose adjusted count becomes negative — because their handicap is lower than one of their opponents when the groups are mixed — gives strokes back and will see plus (<strong>+</strong>) indicators on those holes.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Handicap Allowance</h3>
<p>Under Net mode, tap <strong>show advanced</strong> to open the advanced handicap options. The first is <strong>Handicap Allowance</strong> — a percentage applied to the full course handicap before strokes are allocated. Common values:</p>
<ul>
<li><strong>75% (3/4 handicap)</strong> — the most common reduction for casual group play</li>
<li><strong>50% (1/2 handicap)</strong> — used when groups want a tighter field</li>
<li><strong>100%</strong> — full course handicap (the default)</li>
</ul>
<p>Set any value from 0 to 100. Stroke allocation still happens hole by hole after the percentage is applied; only the total stroke count changes. The result — course handicap × allowance %, rounded — is the <strong>Playing Handicap</strong> and appears as <strong>P.H.</strong> in each player's row on the game configuration screen when Net mode is selected.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Advanced Options</h3>
<p>The remaining options under <strong>show advanced</strong> in Net mode:</p>
<ul>
<li><strong>Limit Playing Handicap</strong> — caps the maximum strokes any player can receive. Enable the checkbox and enter a number. Players whose playing handicap exceeds the cap receive the capped amount instead.</li>
<li><strong>Use half strokes</strong> — allocates fractional strokes rather than rounding to whole strokes. Half strokes are shown as <strong>½</strong> alongside the dot or plus indicator in the score cell.</li>
<li><strong>No strokes on par 3's</strong> — excludes par-3 holes from stroke allocation. Players' total stroke count is unchanged but strokes are distributed only across par-4 and par-5 holes.</li>
<li><strong>Override player handicaps</strong> — manually enter stroke values for individual players, bypassing the automatic course handicap calculation. Use this for committee-assigned handicaps, mutual-agreement matches, or any situation where the USGA formula should not apply.</li>
</ul>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("handicapsGameSettings", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Stroke Indicators on the Scorecard</h3>
<p>Marker shows stroke allocation directly in each score cell so players can read the hole-by-hole advantage at a glance. Indicators appear in the top corner of the cell:</p>
<ul>
<li><strong>Dot (•)</strong> — the player receives one handicap stroke on this hole. Two dots means two strokes. Three dots is the most shown, even if the player receives more than three strokes on a single hole.</li>
<li><strong>Plus (+)</strong> — the player gives a stroke back on this hole. This appears when the player has a plus course handicap for the selected tees, or when Stroke off the low ball is enabled and this player's adjusted count is negative.</li>
<li><strong>Half (½)</strong> — appears alongside a dot or plus when Use half strokes is enabled and a fractional stroke applies to this hole.</li>
</ul>
<p>Indicators are informational and do not affect how scores are entered. Gross scores are always entered on the scorecard; Marker applies stroke adjustments when computing net results and game standings.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("handicapsScorecardIndicators", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">6</div>
<div class="tutorial-step__content">
<h3>USGA Score Posting</h3>
<p>Marker is a USGA Handicap Data Affiliate. If you have a GHIN number on your Marker profile, a <strong>Post Score</strong> button appears at the bottom of your scorecard once the scorecard is locked.</p>
<p>Tap Post Score and select:</p>
<ul>
<li><strong>Score type</strong> — Home, Away, or Competition</li>
<li><strong>Side</strong> — Front 9, Back 9, or All 18. Only sides where you have a complete set of entered scores are available for selection.</li>
<li><strong>Date</strong> — pre-filled from the scorecard; adjust if needed.</li>
</ul>
<p>Tap <strong>Post Score</strong> to submit. Equitable Stroke Control (the net double bogey maximum per hole) is applied automatically before the score is sent to GHIN. Marker shows your estimated pending handicap index immediately after a successful post. Your official handicap index updates on the normal GHIN revision schedule.</p>
<p>USGA posting requires a USGA-approved tee set. If a tee rating was entered manually rather than pulled from the USGA course database, the Post Score button will not appear for that player.</p>
<p>To look up a partner's GHIN-linked handicap index when adding players, tap <strong>USGA® Handicap Lookup</strong> below the handicap index field in the player form. This option is available when your own GHIN number is connected to your Marker profile.</p>
</div>
</div>

</div>
