---
layout: layouts/tutorial-guide.njk
title: Using Handicaps in Marker
description: "A complete guide to handicap configuration in Marker — how course handicap is calculated, how strokes are allocated, and how to adjust settings for your group."
subtitle: "Configure how Marker calculates and applies handicap strokes — from full USGA course handicap to flat allowances and gross play."
category: Getting Started
order: 6
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

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Full Course Handicap</h3>
<p>The default and recommended setting. Marker converts each player's handicap index to a course handicap using the official USGA formula:</p>
<p><em>Course Handicap = Handicap Index × (Slope Rating ÷ 113) + (Course Rating − Par)</em></p>
<p>This is the correct adjustment for a specific set of tees and ensures fair competition when players are on different tees. Marker applies this automatically based on the tee selection set during player setup.</p>
<ul>
<li>Strokes are allocated hole by hole using the course's handicap allocation table</li>
<li>A 10-handicap player receives one stroke on each of the 10 hardest-rated holes</li>
<li>Higher handicaps receive more than one stroke per hole on the hardest holes</li>
</ul>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Percentage of Course Handicap</h3>
<p>Many groups prefer to play at a reduced percentage of the full course handicap to keep the game more competitive and reduce the impact of handicap differentials. Common reductions:</p>
<ul>
<li><strong>3/4 handicap (75%)</strong> — most common reduction for casual group play</li>
<li><strong>1/2 handicap (50%)</strong> — used when groups want a tighter field</li>
<li><strong>Custom percentage</strong> — set any percentage from 1% to 100%</li>
</ul>
<p>Marker lets you set the handicap percentage before the round. The reduced number of strokes is still allocated using the course's hole-by-hole handicap allocation table.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Flat Handicap Allowance</h3>
<p>Instead of using each player's full calculated course handicap, flat handicap locks in a specific number of strokes for each player. You enter the stroke count directly, overriding the automatic calculation.</p>
<p>This is useful when playing against players from other clubs where you prefer to set strokes by mutual agreement rather than relying on official indexes. It's also used in some league formats where committee-assigned handicaps are used.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Playing Handicap (Net Double Bogey Cap)</h3>
<p>The USGA's Equitable Stroke Control (ESC) — sometimes called Net Double Bogey — caps the maximum score on any hole. This option applies the cap automatically when calculating the net score used for handicap purposes.</p>
<p>For each hole, the maximum net score is a net double bogey: par + 2 + any handicap strokes received. Scores above this cap don't count for handicap purposes, though the actual gross score is still recorded on the scorecard.</p>
<p>Marker can apply the cap in two ways:</p>
<ul>
<li><strong>For USGA posting:</strong> the cap is always applied per USGA rules</li>
<li><strong>For game scoring:</strong> choose whether capped or actual scores are used in settlement calculations</li>
</ul>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>No Handicap</h3>
<p>Run the round as a gross scoring competition with no handicap adjustments. All games and leaderboards display gross scores only. Useful for scratch competitions or when your group prefers to play straight up.</p>
<p>Handicap indexes are still stored for each player and can be used for USGA posting at the end of the round even when the in-game handicap is disabled.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">6</div>
<div class="tutorial-step__content">
<h3>USGA Handicap Posting</h3>
<p>Marker is a USGA Handicap Data Affiliate. If you have a GHIN account, you can post scores directly from Marker at the end of a round.</p>
<ul>
<li>Go to your scorecard after the round is complete</li>
<li>Tap <strong>Post Score</strong> and confirm your GHIN number</li>
<li>Marker sends the adjusted gross score (with ESC applied) to GHIN automatically</li>
<li>Your handicap index will update on the normal GHIN revision schedule</li>
</ul>
<p>Only 18-hole rounds or two 9-hole rounds combined can be posted. Marker handles 9-hole combination posting automatically if you play two separate 9-hole rounds in the same day.</p>
</div>
</div>

</div>
