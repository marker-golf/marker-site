---
layout: layouts/tutorial-guide.njk
title: Create a Scorecard
description: Learn how to start a standalone scorecard for a single group or foursome — select a course and Marker creates it instantly.
subtitle: "Tap New Game, pick your course, and Marker creates the scorecard instantly. No setup, no confirmation screen."
category: Playing with Your Group
order: 1
tutorialPath: group
tutorialOrder: 1
estimatedTime: "2 min read"
cardDescription: "Tap New Game, pick your course, and Marker creates the scorecard. You're set up in seconds."
iconSvg: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>'
cta:
  heading: "Ready to play?"
  body: "Create your first scorecard in Marker right now."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<p>A standalone scorecard is the fastest way to play in Marker — pick a course and you're in. Use it for a single group or foursome. If you need a shared leaderboard across multiple groups, use an Event instead.</p>

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Tap New Game</h3>
<p>From the Marker home screen, tap <strong>New Game</strong>. There's no event name, no date picker, and no options screen — you go straight to course selection.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("createScorecardNewGame", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Select a course</h3>
<p>Search for your course by name or browse nearby. Tap the correct course from the results. Marker creates the scorecard immediately — today's date and hole 1 are set automatically.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("createScorecardSelectCourse", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Review your player settings</h3>
<p>Marker takes you into player setup, starting with yourself. Review your handicap, gender, and tee selection. Change your tee here if needed before continuing.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("createScorecardSetup", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Add other players</h3>
<p>Add the rest of your group. Recent playing partners appear for quick selection. You can also search for someone you've played with before or invite a new player by name. The next tutorial covers player setup in detail.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Add games</h3>
<p>Once your group is set, add the games you want to play. Games can be scorecard-wide or scoped to specific players. You can add or adjust games after the round starts.</p>
</div>
</div>

</div>

<div class="tutorial-note">
<p><strong>Standalone scorecards vs. Events:</strong> A standalone scorecard is for one group — no field management, no multi-group leaderboard. If you're organizing multiple groups, create an Event instead.</p>
</div>
