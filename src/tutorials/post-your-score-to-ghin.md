---
layout: layouts/tutorial-guide.njk
title: Post Your Score to GHIN
description: Learn how to post your hole-by-hole score from a locked Marker scorecard to your USGA Handicap ID (GHIN), what Marker sends, and how to correct a score before posting.
subtitle: "End the round, then post your own hole-by-hole score to your USGA Handicap ID — your GHIN number — right from the scorecard."
category: Playing with Your Group
order: 7
tutorialPath: group
tutorialOrder: 7
indexGroup: finish-settle-and-post
indexOrder: 3
estimatedTime: "4 min read"
cardDescription: "Lock your scorecard, tap POST MY SCORE TO USGA, and send your hole-by-hole score to your GHIN record."
iconSvg: '<path d="M12 15V3"/><path d="M7 8l5-5 5 5"/><path d="M5 21h14"/>'
cta:
  heading: "Ready to post your next round?"
  body: "Score it in Marker, end the round and post it from the scorecard."
---

{% from "components/product-screenshot.njk" import ProductScreenshot %}

<p>Marker is an Official USGA Handicap Data Affiliate, so you can post a round to your handicap record without re-entering it. In Marker the action is labeled <strong>USGA</strong>: you connect a <strong>USGA Handicap ID</strong> — your GHIN number — and post with <strong>POST MY SCORE TO USGA</strong>. Each player posts their own score; nobody posts for the group.</p>

<div class="tutorial-note">
<p><strong>Check your score before you post.</strong> Marker sends your hole-by-hole scores exactly as they appear on the scorecard, and it can't edit or remove a score once it's posted.</p>
</div>

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>Connect your USGA Handicap ID</h3>
<p>Posting needs a validated USGA Handicap ID on your Marker profile. Open your profile, enter the <strong>email</strong> on your USGA/GHIN account and your <strong>USGA Handicap ID</strong>, and save. <a href="{{ '/tutorials/set-up-your-profile/' | url }}">Set Up Your Profile</a> walks through it.</p>
<p>Your tee also matters. Posting uses the course and tee ratings from Marker's USGA course data, so if a tee rating was entered by hand for you, the post button won't appear.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>Finish your round</h3>
<p>Enter a score on every hole you played. To post you need at least one complete nine:</p>
<ul>
<li><strong>9 holes</strong> — the full front nine (1–9) or back nine (10–18).</li>
<li><strong>18 holes</strong> — all 18, or between 10 and 17 holes that include a complete nine. Holes you didn't play are sent as not played.</li>
</ul>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>End the round and attest</h3>
<p>Tap <strong>End round</strong> at the bottom of the scorecard. Ending the round is your signature: the sheet reads <em>By ending this round, you attest that the scores are correct.</em> Tap <strong>End round</strong> to confirm and lock the scorecard. Any player on the scorecard can end the round.</p>
<p>In an event, the commissioner's <strong>Complete event</strong> locks every group's scorecard at once — see <a href="{{ '/tutorials/complete-event-and-settle-up/' | url }}">Complete the Event &amp; Settle Up</a>.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("postScoreEndRound", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Tap POST MY SCORE TO USGA</h3>
<p>Once the scorecard is locked, open it from your own phone. A red <strong>POST MY SCORE TO USGA</strong> button appears at the bottom, with <em>Only you, not the group</em> underneath. You'll see it when:</p>
<ul>
<li>you're a player on this scorecard,</li>
<li>the scorecard is locked,</li>
<li>you have scores on at least 9 holes,</li>
<li>your tee wasn't entered by hand, and</li>
<li>you haven't already posted from this scorecard.</li>
</ul>
<p><strong>No USGA Handicap ID connected?</strong> Tapping the button opens a <strong>Post Score</strong> sheet that says <em>You must connect your USGA ID to your profile in order to post scores.</em> Tap <strong>Connect USGA ID</strong>, connect it on your profile, then come back to the scorecard to post.</p>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("postScoreReady", screenshots, frame="phone", caption=true) }}
</div>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Review and post</h3>
<p>The <strong>Post Score</strong> sheet shows the course and your tees. Check them, then set:</p>
<ul>
<li><strong>Date played</strong> — filled in from the scorecard or event date.</li>
<li><strong>Score Type</strong> — <strong>Home</strong> (the default), <strong>Away</strong> or <strong>Competition</strong>.</li>
<li><strong>Holes played</strong> — the options you qualify for, each with your gross total: <strong>Front 9</strong>, <strong>Back 9</strong>, <strong>All 18</strong>, or <strong>10-17</strong> for a partial round. The longest option is selected for you.</li>
</ul>
<div class="tutorial-step__screenshot">
{{ ProductScreenshot("postScoreSheet", screenshots, frame="phone", caption=true) }}
</div>
<p>Tap <strong>Post Score</strong>. After USGA accepts the submission, Marker confirms that your score has been posted.</p>
<p>If the USGA rejects something, such as the date or holes played, the message appears in the sheet; fix it and tap <strong>Post Score</strong> again. If the USGA holds the score for review, the sheet changes to <strong>Review</strong> with the USGA's message: tap <strong>Post Score</strong> to confirm the score, or <strong>Cancel</strong>.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">6</div>
<div class="tutorial-step__content">
<h3>What Marker posts</h3>
<p>Marker sends your <strong>hole-by-hole gross scores</strong> for the holes you chose, with the course, your tee, the date and the score type. The USGA applies its own adjustments, such as net double bogey, when it calculates your score differential and Handicap Index.</p>
<p>Marker doesn't post:</p>
<ul>
<li>anyone else's score — each player posts their own;</li>
<li>statistics such as fairways hit, greens in regulation or putts — add those in GHIN if you track them;</li>
<li>game results, net scores, handicap allowances or course handicap overrides from your games.</li>
</ul>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">7</div>
<div class="tutorial-step__content">
<h3>Fix a score before you post</h3>
<p>Spotted a mistake after ending the round? Tap the <strong>ⓘ</strong> icon in the scorecard header. The info screen says <em>This round is locked.</em> — tap <strong>Unlock</strong> and confirm. Correct the score, then tap <strong>End round</strong> again and post. Unlocking also recalculates the scorecard's game results. For a completed event, the commissioner can unlock it from the event dashboard.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">8</div>
<div class="tutorial-step__content">
<h3>After you post</h3>
<p>Marker posts each player's score once per scorecard. After you post, the button no longer appears for you on that scorecard, and Marker refuses a second post from it. If you cancel a score the USGA held for review, Marker won't offer to post it again from that scorecard.</p>
<p>Unlocking and editing the scorecard later changes it in Marker only — it doesn't update or remove the score you posted. To change or remove a posted score, use GHIN or contact your club.</p>
</div>
</div>

</div>
