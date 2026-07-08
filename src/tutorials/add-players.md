---
layout: layouts/tutorial-guide.njk
title: Add Players
description: Add players to your event — from recent playing partners, searching previous partners, or inviting someone new — then set tees for the group.
subtitle: "Add players from your recent partners, search for someone you've played with before, or invite a new player — then set tees."
category: Getting Started
order: 3
tutorialPath: event
tutorialOrder: 2
estimatedTime: "3 min read"
cardDescription: "Add recent playing partners, search for previous playing partners, or invite new players — then set tees for the group."
iconSvg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
relatedTutorials:
  - title: "Create & Organize Scorecards →"
    url: "/tutorials/create-scorecards/"
nextLabel: "Up next"
cta:
  heading: "Ready to try it?"
  body: "Build your group and start a round in Marker."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Open the Players section</h3>
<p>From the event dashboard, tap the <strong>+</strong> button next to <strong>Players</strong>. You can add players at any point before the round starts and select multiple players at once before continuing.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Method 1 — Add from recent playing partners</h3>
<p>Your most recent playing partners appear at the top of the player list for quick one-tap selection. Tap a name to check them off. This is the fastest way to add your regular group — Marker remembers everyone you've played with.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Method 2 — Search for a previous playing partner</h3>
<p>Type in the search field to filter by name. The search covers players you've previously played with in Marker — it doesn't search every Marker user, only your playing history. Tap a result to select them.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventAddPlayersPicker", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Method 3 — Invite a new player</h3>
<p>Tap <strong>Invite new player</strong> to add someone who isn't in your playing history. The form opens with an optional mobile number field first — enter their US phone number to send them a scorecard link; if the number matches an existing Marker account, the form pre-fills automatically. Fill in their name, handicap index, gender, and tee, then tap <strong>Save</strong>.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Set tees for the group</h3>
<p>After selecting players via Methods 1 or 2 and tapping <strong>Continue</strong>, Marker shows a tee assignment screen. Choose the default tee for each gender present in your selection — the tee you pick applies to all newly added players of that gender at once.</p>
<p>Individual tee adjustments can be made at any time by tapping a player's name on the event dashboard.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("eventAddPlayersTees", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

</div>

<div class="tutorial-note">
<p><strong>Tip:</strong> You can add or remove players at any point before the round starts. Come back to the Players section to fill out the roster as your group confirms.</p>
</div>
