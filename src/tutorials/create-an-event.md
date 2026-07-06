---
layout: layouts/tutorial-guide.njk
title: Create an Event
description: Learn how to set up a new Marker event — select a course, optionally attach it to a series, name it, pick a date, and save.
subtitle: "Select a course, name your event, set a date, and save — the whole setup takes less than a minute."
category: Getting Started
order: 2
estimatedTime: "3 min read"
cardDescription: "Select a course, name your event, pick a date, and save — it takes less than a minute."
iconSvg: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/>'
relatedTutorials:
  - title: "Add Players →"
    url: "/tutorials/add-players/"
nextLabel: "Up next"
cta:
  heading: "Ready to try it?"
  body: "Create your first event in Marker right now."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Open the Create Event form</h3>
<p>From the Marker app, start the event creation flow. The Create Event form guides you through selecting a course, naming the event, and setting a date.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Select your course</h3>
<p>Search for your course by name or browse nearby courses. Marker has a large database of courses with tee and hole data pre-loaded. Select the correct course from the results — this sets the par values and yardages for your scorecards.</p>
<p>If your course isn't listed, you can add it manually with a custom name and hole-by-hole par configuration.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("tutorialCreateEventStep1", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Choose a series (optional)</h3>
<p>If this event is part of a series — a league season, a club trip, or any group of related events — select the series here. Series track cumulative standings and results across all connected events.</p>
<p>If this is a standalone round, leave this blank. You can attach an event to a series from event settings after it's created.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Name your event</h3>
<p>Give the event a name — something your group will recognize. It appears on scorecards, the leaderboard, and settlement screens.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Set the date</h3>
<p>Pick the date of the round. It defaults to today but can be adjusted for future or past events.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("tutorialCreateEventStep2", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">6</div>
<div class="tutorial-step__content">
<h3>Save the event</h3>
<p>Tap <strong>Save</strong>. Your event is created and you'll land on the event dashboard. From here you can add players, create scorecards, and configure games — in any order.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("tutorialCreateEventStep3", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

</div>

<div class="tutorial-note">
<p><strong>Multi-group events:</strong> Add all your players to the event before creating scorecards. Every group shares the same event dashboard and live leaderboard regardless of how many scorecards you create.</p>
</div>
