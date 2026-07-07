---
layout: layouts/tutorial-guide.njk
title: Review Results & Settle Up
description: Learn how to end a standalone Marker round, lock the scorecard, review final game results, and settle up with Day total, Settlement, and Profit / loss.
subtitle: "End the round to lock in final results, then use Settlement or Profit / loss to pay out."
category: Playing with Your Group
order: 6
tutorialPath: group
tutorialOrder: 6
estimatedTime: "4 min read"
cardDescription: "Tap End round to lock the scorecard, review final game results on the Leaderboard, and use Settlement to pay out."
iconSvg: '<path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
cta:
  heading: "Ready to play?"
  body: "Start a round and let Marker track the competition."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<p>Until you end the round, game results are live and provisional — they update with every score entered. Ending the round locks the scorecard, freezes the game summaries, and makes the results safe to settle.</p>

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Finish entering scores</h3>
<p>Before ending the round, scroll through the scorecard and confirm all scores are entered. Check the OUT, IN, and TOT rows for any blank cells. Marker doesn't require all 18 holes to be complete before you end the round, but it's a good practice to verify the group's scores look right — you're about to attest that they are.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Tap End round</h3>
<p>The <strong>End round</strong> button appears at the bottom of the scorecard once at least 9 holes have been scored across the group. For rounds with 9 to 17 holes scored, the button appears inline at the bottom of the scrollable scorecard. Once all 18 holes are scored, the button moves to a sticky footer that stays visible while you scroll.</p>
<p>Tapping <strong>End round</strong> opens a confirmation panel:</p>
<blockquote><em>By ending this round, you attest that the scores are correct. This will lock the scorecard, but you can unlock it in scorecard settings.</em></blockquote>
<p>Tap <strong>End round</strong> in the panel to confirm.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("reviewResultsEndRound", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>What locking does</h3>
<p>When the scorecard locks:</p>
<ul>
<li>Score entry is disabled — tapping score cells has no effect.</li>
<li>The Add Game button is hidden.</li>
<li>Game summaries are finalized and frozen at this moment. The results you see on the Leaderboard are now the official results for the round.</li>
</ul>
<p><strong>To make a correction:</strong> Tap the <strong>ⓘ</strong> icon in the scorecard header to open the scorecard info screen. A "This round is locked." notice appears with an <strong>Unlock</strong> button. Tap Unlock and confirm — the scorecard reopens, game summaries recalculate from the current scores, and you can make edits. When you're done, tap End round again to re-lock.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Review final game results</h3>
<p>Tap the <strong>trophy icon</strong> to open the Leaderboard. The Round in progress badge is no longer shown — the results you see are final.</p>
<p>Each configured game has its own results card with final standings, hole-by-hole detail, and dollar results if you set accounting. The structure is the same as the in-progress view — the difference is that the numbers are now locked. For a full walkthrough of how to read individual game cards, see <a href="/tutorials/follow-games-and-results/">Follow Games &amp; Results</a>.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Read the Day total</h3>
<p>Scroll past the individual game cards to reach the <strong>Day total</strong> panel. It combines the accounting results from all configured games into a single summary. The panel only appears when at least one game has an accounting amount set.</p>
<p>The Day total shows two views: <strong>Settlement</strong> and <strong>Profit / loss</strong>. Switch between them using the pill tabs at the top of the panel.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">6</div>
<div class="tutorial-step__content">
<h3>Settle up</h3>
<p><strong>Settlement</strong> (the default view) shows the payment transactions needed to square up: who pays whom and how much. Each row lists a <strong>From</strong> player, a <strong>To</strong> player, and an <strong>Amount</strong>. Marker minimizes the number of transactions needed, so you may see fewer rows than you expect.</p>
<p>If any game uses a pool buy-in, a <strong>Buy-ins collected</strong> checkbox appears above the table. Check it if players already put money in the pot before the round — Marker settles from the pot first, then lists any remaining player-to-player payments. Uncheck it to show all settlements as direct payments.</p>
<p><strong>Profit / loss</strong> shows each player's overall financial position: <strong>Gross</strong> winnings from all games combined. When buy-ins are involved, <strong>Buy-in</strong> and <strong>Net</strong> columns also appear — Net is the gross amount minus the player's total buy-in contribution. Green values are positive; red values are negative.</p>
<p>Use Settlement to run the actual payout. Use Profit / loss to see the bigger picture of who came out ahead.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("reviewResultsFinalSettlement", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">7</div>
<div class="tutorial-step__content">
<h3>Share the results</h3>
<p>Tap <strong>Share leaderboard</strong> at the bottom of the Leaderboard screen to share the final results. On mobile, this opens the native share sheet. The shared link is public — no Marker account is required to view it. Because the round is now locked, anyone who opens the link sees the final results.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">8</div>
<div class="tutorial-step__content">
<h3>Post your score to USGA</h3>
<p>After the scorecard locks, a <strong>Post my score to USGA</strong> button may appear in the footer on the scorecard screen. This is a personal posting action — only your own score is posted, not the group's.</p>
<p>The button appears when all of the following are true:</p>
<ul>
<li>The scorecard is locked.</li>
<li>You are a player on the scorecard.</li>
<li>You have at least 9 holes scored.</li>
<li>You haven't already posted this round.</li>
<li>Your tee is a standard rated tee, not a manually-entered one.</li>
<li>Your Marker profile has a USGA ID connected.</li>
</ul>
<p>If the button appears but you haven't connected a USGA ID to your Marker account, tapping it opens a <strong>Connect USGA ID</strong> prompt that takes you to your profile settings.</p>
<p>In the Post Score panel you'll confirm the <strong>date played</strong>, the <strong>score type</strong> (Home, Away, or Competition), and which <strong>holes played</strong> (Front 9, Back 9, All 18, or a partial 10–17 hole round). USGA may flag your submission for review — if that happens, follow the on-screen prompt to accept or cancel the flagged score.</p>
<p>Each player on the scorecard posts their own score independently. Marker does not post on behalf of anyone else.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">9</div>
<div class="tutorial-step__content">
<h3>Round complete</h3>
<p>The round is done. The locked scorecard remains accessible from your Marker home screen for reference. Use the Settlement view to run the final payout, and share the leaderboard link with anyone who wants to see the results.</p>
<p>If you discover a scoring error after the fact, return to the scorecard, unlock it from the info screen, correct the score, and end the round again.</p>
</div>
</div>

</div>
