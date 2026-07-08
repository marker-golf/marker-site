---
layout: layouts/tutorial-guide.njk
title: Create & Organize Scorecards
description: Create scorecards individually or in bulk with tee times or a shotgun start, then assign players to each scorecard.
subtitle: "Create one scorecard or many at once — set start times, choose tee times or shotgun, and assign your players."
category: Getting Started
order: 4
tutorialPath: event
tutorialOrder: 3
estimatedTime: "3 min read"
cardDescription: "Create scorecards individually or in bulk — tee times or shotgun start — then assign players to each scorecard."
iconSvg: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="16" x2="11" y2="16"/>'
relatedTutorials:
  - title: "Add Event Games →"
    url: "/tutorials/add-and-configure-games/"
nextLabel: "Up next"
cta:
  heading: "Ready to try it?"
  body: "Set up your scorecards and get everyone on the course."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Open the Scorecards section</h3>
<p>From the Event dashboard, tap the <strong>+</strong> button next to <strong>Scorecards</strong>. This is where you decide how many scorecards the Event needs and configure how the groups will start — either with spaced tee times or a shotgun start. Players are assigned to scorecards after the scorecards are created.</p>
<p>Each scorecard represents one playing group. If your Event has four groups going out, you'll create four scorecards — one for each group.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Set the start time and number of scorecards</h3>
<p>Enter the start time for the first scorecard. In the <strong>Number of Groups</strong> field, enter the total number of scorecards your Event needs — Marker creates one scorecard per group. Enter 1 for a single-group round, or the full group count for a larger field.</p>
<p>Set the starting hole if your round begins on a hole other than hole 1.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>For multiple scorecards — choose Tee Times or Shotgun Start</h3>
<p>When creating more than one scorecard, choose the start format:</p>
<ul>
<li><strong>Tee Times</strong> — all groups start from the same starting hole, departing at timed intervals. Set the interval in the <strong>Spacing (minutes)</strong> field — options run from 5 to 20 minutes; the default is 10. The first group tees off at your chosen start time; each subsequent group is delayed by that interval.</li>
<li><strong>Shotgun Start</strong> — all groups start at the same time, each from a different hole. Marker assigns consecutive starting holes beginning at the Start hole you set, wrapping from 18 back to 1. A preview line shows the exact hole assignments before you save.</li>
</ul>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventScorecardsTeeTimes", screenshots, frame="phone", caption=true) }}
</div>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventScorecardsShotgun", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Assign players to scorecards</h3>
<p>After scorecards are created, tap any scorecard row on the event dashboard to open the edit form. The Players section shows all unassigned event players plus anyone already in this scorecard — up to 5 per scorecard. Check the players you want in this scorecard and tap <strong>Save</strong>.</p>
<p>Players already assigned to other scorecards are not shown as candidates. To move a player, open their current scorecard, uncheck them, and save — they return to the unassigned pool and can then be added to another scorecard.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventScorecardsPlayerAssignment", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

</div>

<div class="tutorial-note">
<p><strong>Tip:</strong> Create your scorecards before adding games. Event-wide games draw their player list from the full event roster, while scorecard-level games are added from within individual scorecards after players are assigned to scorecards.</p>
</div>
