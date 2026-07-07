---
layout: layouts/tutorial-guide.njk
title: Set Up Your Profile
description: Add your name, connect your USGA Handicap ID, and understand how each profile field affects scoring and the Home screen in Marker.
subtitle: "Add your name and, if you have one, your USGA Handicap ID. Marker uses your profile to identify you on scorecards and, when connected, to retrieve your current handicap information."
category: Getting Started
order: 2
tutorialPath: getting-started
tutorialOrder: 2
estimatedTime: "4 min read"
cardDescription: "Add your name, connect your USGA Handicap ID, and understand what each profile field does."
iconSvg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
cta:
  heading: "Ready to play?"
  body: "Open Marker and start a round."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<div class="tutorial-prose">

<h3>Open your profile</h3>

<p>Open the drawer by tapping the menu icon in the top-left corner of the Home screen. Tap <strong>Profile</strong>, then tap <strong>Update profile information</strong>. This opens the profile edit form.</p>

<h3>Your name and contact information</h3>

<p>The form has four identity fields: Phone, Email, USGA Handicap ID, and Name. You can update all of them here.</p>

<p><strong>Name</strong> — Enter your first and last name. This is how you appear on scorecards, in the scorecard header, and when other players are adding people to their group. Use your real name so your playing partners can recognize you easily.</p>

<p><strong>Phone</strong> — Your phone number is your Marker login identity. A helper note in the form reminds you of this: <em>Careful, your phone number is how you access your account. Make sure it's correct!</em> You can update it here if it changes, but be careful — if you change it to a number you no longer control, you won't be able to sign in.</p>

<p><strong>Email</strong> — Email is optional for general Marker use. It is required specifically to connect a USGA Handicap ID: Marker validates the GHIN number against the email address on file with the USGA, so both must match. If you don't plan to connect a USGA Handicap ID, you can leave this blank.</p>

<p>Tap <strong>Save</strong> at the bottom of the screen when you're done.</p>

<div class="tutorial-step__screenshot">
{{ ProductScreenshot("setupProfileEdit", screenshots, frame="phone", caption=true) }}
</div>

<h3>Connect your USGA Handicap ID</h3>

<p>Your USGA Handicap ID — commonly called your GHIN number — connects Marker to your official handicap record. To connect it:</p>

<ol>
<li>Enter the <strong>email address</strong> associated with your USGA/GHIN account.</li>
<li>Enter your <strong>USGA Handicap ID</strong> (GHIN number) in the field below it.</li>
<li>Marker validates the combination automatically — no button to tap. After a moment, a green confirmation line appears showing your name, club, and current Handicap Index: for example, <em>Bob Smith | Club: Shinnecock Hills Golf Club | H.I. 4.7</em>.</li>
<li>Tap <strong>Save</strong> to save the connection to your profile.</li>
</ol>

<p>If the lookup fails, Marker shows an error: <em>Handicap ID not found for [email]. It must match the email on your USGA Handicap ID account (e.g., GHIN).</em> Double-check that the email in the form matches what's on file with the USGA — they must be identical.</p>

<p>When a USGA ID validates successfully, Marker also autofills your first name, last name, and gender from the USGA record. You'll see the Name fields update.</p>

<h3>What connecting your USGA ID enables</h3>

<p>Connecting a USGA Handicap ID is optional, but it adds a few things:</p>

<ul>
<li><strong>Handicap Index on the Home screen</strong> — your current H.I., Low H.I., club name, and GHIN number appear in the green hero area every time you open Marker.</li>
<li><strong>Automatic handicap information</strong> — Marker fetches your current Handicap Index from the USGA so it's up to date each session.</li>
<li><strong>USGA score posting</strong> — after locking a qualifying scorecard, a <strong>Post my score to USGA</strong> button becomes available. This lets you post your score directly through Marker. The button only appears for players with a connected USGA ID.</li>
</ul>

<p>These features require a validated USGA Handicap ID. Manual handicap entry is still available — it just doesn't enable USGA posting.</p>

<h3>If you don't have a USGA Handicap ID</h3>

<p>You don't need a USGA Handicap ID to use Marker. Without one, you can still:</p>

<ul>
<li>create and join scorecards</li>
<li>add players and configure games</li>
<li>enter scores and follow game results</li>
<li>use manually entered handicap indexes for net games</li>
<li>view settlement and profit/loss at the end of a round</li>
</ul>

<p>USGA score posting is the only feature unavailable without a connected ID.</p>

<p>If you want to establish an official handicap, the USGA Handicap ID field includes a link to <strong>getahandicap.usga.org</strong>.</p>

<p><strong>Handicap Settings</strong> — When no validated USGA ID is connected, a <strong>Handicap Settings</strong> selector appears in the profile form with Male and Female options. This setting is used in course-handicap calculations for net games. When you connect a valid USGA ID, this field is hidden — gender comes from the USGA record and is applied automatically.</p>

<h3>Your Home screen after setup</h3>

<p>After saving, the Home screen reflects your profile state. If you connected a USGA Handicap ID, the green hero area shows your name, club name, current Handicap Index, Low H.I., and GHIN number. If you did not connect a USGA ID, the hero shows your name and a <strong>Connect USGA ID</strong> button.</p>

<h3>What's next</h3>

<p>With your profile set up, you're ready to choose how you want to play. The next tutorial in this path — <strong>Choose How You Want to Play</strong> — helps you decide between a standalone New Game and a Marker Event, and routes you into the right learning path.</p>

<p>If you're ready to jump in now, the <a href="/tutorials/create-a-scorecard/">Playing with Your Group</a> path starts with creating your first scorecard.</p>

</div>
