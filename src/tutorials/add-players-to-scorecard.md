---
layout: layouts/tutorial-guide.njk
title: Add Players
description: Learn how to add and configure the other players in a standalone Marker scorecard — from recent partners to new invites.
subtitle: "Add your group from recent partners, search your playing history, or invite someone new — then confirm tees and handicaps before you play."
category: Playing with Your Group
order: 2
tutorialPath: group
tutorialOrder: 2
estimatedTime: "4 min read"
cardDescription: "Add recent partners, search your playing history, or invite someone new. Set tees and handicaps before the round starts."
iconSvg: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/>'
cta:
  heading: "Ready to play?"
  body: "Build your group and start a round in Marker."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<p>After creating the scorecard and adding yourself, you're on the Scorecard screen. The PLAYERS section shows you already listed. From here, add the rest of your group — up to four more players, five total.</p>

<p>Marker remembers everyone you've played with before, so repeat groups are quick to assemble.</p>

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Tap + next to Players</h3>
<p>On the Scorecard screen, tap <strong>+</strong> in the Players section header. This opens the Add Player screen, which shows your past playing partners.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Add a recent partner</h3>
<p>The screen opens to <strong>Recent partners</strong> — your most recent playing partners in Marker, up to ten. Tap a name to open the player settings form, pre-filled with their stored name, handicap, and gender. Review the settings, select their tee, and tap <strong>Save</strong>. Marker returns you to the Scorecard screen with the player added.</p>
<p>Repeat for each additional player in your group.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Search for someone you've played with before</h3>
<p>If the player you want isn't in your recent list, type in the search field. The search filters by name across your full playing history in Marker — it is not a global user search. Tap a result to open their player settings form.</p>
<p>This is useful when you have a longer playing history and the partner you want has scrolled past the ten most recent results.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("addPlayersPlayerPicker", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Invite a new player</h3>
<p>If the player hasn't played a round with you in Marker before, tap <strong>Invite player</strong> at the top right of the partner list. This opens a blank player settings form.</p>
<p>An optional <strong>mobile number</strong> field appears at the top. If you enter a US phone number, Marker will look up whether that number belongs to an existing Marker account and pre-fill the form if it finds a match. If not, the number is used to share the scorecard by text.</p>
<p>Fill in their name, handicap index, gender, and tee, then tap <strong>Save</strong>.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("addPlayersInvitePlayer", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Review player settings and tees</h3>
<p>Whether adding from your partner list or inviting someone new, every player goes through the same settings form before being added. The key fields are:</p>
<ul>
<li><strong>Name</strong> — required</li>
<li><strong>Handicap index</strong> — required, defaults to 0 if unknown</li>
<li><strong>Handicap Settings</strong> — male or female, used to apply the correct slope and rating for their tee</li>
<li><strong>Tee</strong> — required; Marker suggests a default based on gender and the tees already selected by other players</li>
</ul>
<p>Getting the tee right matters: Marker uses each player's tee, slope, and course rating to calculate their course handicap for net scoring. A player on the wrong tee will have incorrect stroke allocation.</p>
<p>If your Marker account is connected to a USGA® Handicap ID, a <strong>USGA® Handicap Lookup</strong> link appears below the handicap field. This lets you look up and attach a partner's current GHIN-verified handicap directly. Once attached, the handicap field becomes read-only and shows the revision date.</p>
<p>See <a href="/tutorials/handicap-settings/">Using Handicaps in Marker</a> for more on how course handicap is calculated.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">6</div>
<div class="tutorial-step__content">
<h3>Review your group</h3>
<p>After adding all your players, the Scorecard screen shows everyone in the Players list. Before moving on, check that:</p>
<ul>
<li>All intended players are listed</li>
<li>Names are correct</li>
<li>Tees are correct</li>
<li>Handicap information looks right</li>
</ul>
<p>To make a change, tap any player's name to open the Edit Player screen. You can update any setting — name, handicap, gender, or tee — and tap <strong>Save changes</strong>. To remove a player, tap <strong>Remove Player</strong> at the bottom of the edit screen.</p>
<p>Once your group looks right, the next step is adding games.</p>
</div>
</div>

</div>

<div class="tutorial-note">
<p><strong>Maximum group size:</strong> A standalone scorecard supports up to five players. The + button disappears once the limit is reached.</p>
</div>
