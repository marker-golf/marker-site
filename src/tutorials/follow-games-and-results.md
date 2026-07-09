---
layout: layouts/tutorial-guide.njk
title: Follow Games & Results
description: Learn how to follow multiple active games in Marker while a round is in progress — switch game views on the scorecard, check standings on the Leaderboard, and read the Day total.
subtitle: "Enter golf scores once. Marker tracks every game you've configured and updates standings in real time."
category: Playing with Your Group
order: 5
tutorialPath: group
tutorialOrder: 5
estimatedTime: "5 min read"
cardDescription: "Switch between game views on the scorecard, check live standings on the Leaderboard, and read the Day total — all from the same entered scores."
iconSvg: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'
cta:
  heading: "Ready to play?"
  body: "Start a round and let Marker track the competition."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<p>Once scores start coming in, Marker calculates every game you've configured from the same shared scorecard. You don't enter separate scores for Skins, Nassau, or any other format — one set of golf scores drives them all, updating in real time as the round progresses.</p>

<p>This tutorial covers how to follow those games during play: on the scorecard itself and on the Leaderboard.</p>

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Switch between games on the scorecard</h3>
<p>The game bar above the scorecard grid shows one tab per configured game. Tap a tab to make it active — the tab turns green and a game column appears on the right side of the grid. The golf scores in the main grid don't change; only the game column changes to reflect the selected game's live data.</p>
<p>Tap the active tab again to deactivate it and return to the plain scorecard view. If you have more games than fit on screen, the tab row scrolls horizontally.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Follow Skins hole by hole on the scorecard</h3>
<p>When the Skins tab is active, the game column shows the current skin result for every hole:</p>
<ul>
<li><strong>Winner pill</strong> — a small label in the top-left corner of the cell shows the skin winner's name. A solid green pill means all scores for that hole are in; a lighter pill means scores are still pending.</li>
<li><strong>Winning score</strong> — the low score for the hole, shown in the center of the cell. For net Skins, the net score is displayed when it differs from gross.</li>
<li><strong>Score count</strong> — the bottom-right corner shows how many scores have been entered out of the total players (for example, "2/4").</li>
<li><strong>Tied holes and carryovers</strong> — if multiple players tie the low score, the cell shows the number of tied players instead of a winner name. A carry indicator (for example, "+2") in the bottom-right shows how many skins have accumulated and are at stake on the next hole.</li>
</ul>
<p>For Skins rules, scoring examples, and strategy, see the <a href="/games/skins/">Skins game guide</a>.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Follow Nassau match status and presses</h3>
<p>Nassau appears as a single tab in the game bar. When it's active, the game column shows two stacked match rows inside each hole's cell: the relevant side match plus the total match. For holes 1–9, the cell shows the front-nine match and the total match. For holes 10–18, it shows the back-nine match and the total match.</p>
<p>Each row displays the current match status — a positive number means the left team is up by that many holes; a negative number means the right team is up. The label in the top-right corner of each row ("front", "back", or "total") identifies which match you're reading.</p>
<p>Press indicators appear in the bottom-right corner of a row:</p>
<ul>
<li><strong>press</strong> pill — a press is available at this hole. Tap the row to add one.</li>
<li><strong>pressed</strong> — a manual press starts here.</li>
<li><strong>auto</strong> — an automatic press triggered here based on your auto-press settings.</li>
</ul>
<p>Tapping a Nassau cell row opens a press action panel where you can add or remove a manual press on that hole.</p>
<p>For Nassau rules and press strategy, see the <a href="/games/nassau/">Nassau game guide</a>.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("followGamesNassauScorecard", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Open the Leaderboard</h3>
<p>Tap the <strong>trophy icon</strong> on the right side of the game bar to open the Leaderboard. The trophy appears once at least one game on the scorecard has standings to show.</p>
<p>An <strong>Round in progress</strong> badge at the top of the Leaderboard confirms the round is still active. Results shown are live and will continue updating as scores are entered.</p>
<p>The Leaderboard gives you a broader picture than the scorecard column: complete standings for every game, accounting summaries, and a way to share results with the group. The scorecard view is best for entering scores and following one game hole by hole; the Leaderboard is best for seeing the full competitive picture and the overall financial position.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Review each game's standings</h3>
<p>Each configured game has its own results card on the Leaderboard, with a header showing the game name.</p>
<p>The <strong>Skins card</strong> shows a ranked table with each player's name, skins won, and dollar result (if accounting is configured). A total row at the bottom shows the aggregate skin count. Tap <strong>Show hole by hole</strong> to expand a hole-by-hole breakdown showing the hole number, how many scores were in when the result was determined, the low score for the hole, and the result — either the winner's name (with a confirmed or pending indicator) or a ties count that expands to show who tied.</p>
<p>The <strong>Nassau card</strong> is organized by match: <strong>Front 9 · Holes 1–9</strong>, <strong>Back 9 · Holes 10–18</strong>, and <strong>Total · Holes 1–18</strong>. Each section shows the left and right teams, the match status for the main match and any active presses, and the current dollar result per team if accounting is set. Press rows appear below the main match row and show their starting hole.</p>
<p>Other game formats present results according to their own structure. The Leaderboard card for each game shows what's relevant to that format.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("followGamesLiveLeaderboard", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">6</div>
<div class="tutorial-step__content">
<h3>Read the Day total</h3>
<p>Below the individual game cards, a <strong>Day total</strong> panel combines the accounting from all games on the scorecard into a single summary. It only appears when at least one game has an accounting amount configured.</p>
<p>Because the round is still in progress, the values in the Day total panel are provisional. They reflect the current state of each game and will continue changing as scores are entered on remaining holes.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">7</div>
<div class="tutorial-step__content">
<h3>Settlement vs. Profit / loss</h3>
<p>The Day total panel offers two views, selectable with the pill tabs at the top.</p>
<p><strong>Settlement</strong> (the default view) answers the question: who pays whom, and how much? It shows a table with <strong>From</strong>, <strong>To</strong>, and <strong>Amount</strong> columns — each row is one payment needed to settle the current results. If any game uses a pool buy-in, a <strong>Buy-ins collected</strong> checkbox appears above the table. Check it if players have already contributed to the pot; Marker will settle from the pot first and only list residual player-to-player payments. Uncheck it to see all settlements as direct payments between players.</p>
<p><strong>Profit / loss</strong> answers a different question: how is each player doing overall? It shows a table with each player's <strong>Gross</strong> earnings from all games combined. When a game has a buy-in, <strong>Buy-in</strong> and <strong>Net</strong> columns also appear — Net is the gross amount minus what the player contributed to the pot. Green values are positive; red values are negative.</p>
<p>Use Settlement when you're ready to pay out. Use Profit / loss to see each player's overall position across all games without worrying about the mechanics of who pays whom.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("followGamesDayTotal", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">8</div>
<div class="tutorial-step__content">
<h3>Share the Leaderboard</h3>
<p>Tap <strong>Share leaderboard</strong> at the bottom of the Leaderboard screen to share the results with your group. On mobile, this opens the native share sheet so you can send via text, AirDrop, or any other app.</p>
<p>The shared link points to the public Marker leaderboard for this scorecard — no Marker account or login is required to view it. The page updates as scores are entered, so anyone you share the link with will see live results.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">9</div>
<div class="tutorial-step__content">
<h3>Keep playing</h3>
<p>Return to the scorecard to continue entering scores. Switch between game tabs, open the Leaderboard to check standings, and share the link as often as you like — all while the round is in progress.</p>
<p>When the last hole is scored and your group is ready to finalize results, the next step is ending the round. See <a href="/tutorials/review-results-and-settle-up/">Review Results &amp; Settle Up</a> to lock the scorecard and run final settlement.</p>
</div>
</div>

</div>
