---
layout: layouts/tutorial-guide.njk
title: Create a Custom Game with AI
description: "Use Marker's AI game generation to create a custom scoring format from a plain-English description — then review and run it with your group."
subtitle: "Describe your format in plain English. Marker generates the scoring rules — you review, adjust if needed, and run it with your group."
category: Running Events
order: 4
tutorialPath: reference
tutorialOrder: 4
estimatedTime: "4 min read"
cardDescription: "Describe a custom game in plain English and let Marker generate the scoring rules — then review and run it with your group."
iconSvg: '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>'
relatedTutorials:
  - title: "Side Games →"
    url: "/tutorials/side-games/"
nextLabel: "See also"
cta:
  heading: "Ready to try it?"
  body: "Open Marker as commissioner and try AI game generation on your next round."
---

<div class="tutorial-steps">

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">1</div>
<div class="tutorial-step__content">
<h3>What AI game generation does</h3>
<p>AI game generation lets you describe a custom scoring format in plain English and receive back a configured game. Marker interprets your description and generates the scoring logic, hole-by-hole rules, and settlement calculation. You review the result before the game is activated.</p>
<p>This is useful when no built-in format fits your group's game exactly, or when you want to create something specific for a one-off event. It works best for formats that are clearly defined — the more precisely you describe the rules, the closer the result will be to what you have in mind.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">2</div>
<div class="tutorial-step__content">
<h3>When to use it (and when to use built-in games)</h3>
<p>AI game generation is the right choice when your format doesn't match any of Marker's built-in games. Good candidates:</p>
<ul>
<li>A house format your group has played for years that doesn't map to any built-in game</li>
<li>A hybrid format combining elements of two games in an unusual way</li>
<li>A one-off format invented for a specific event or outing</li>
</ul>
<p>If your format is close to a built-in game — Wolf, Skins, Nassau, Match Play, Stableford, and the others — configure that instead. Built-in games are fully tested and handle edge cases reliably. Use AI generation for the gaps, not as a substitute for formats that already exist.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">3</div>
<div class="tutorial-step__content">
<h3>Access AI game generation (commissioner only)</h3>
<p>Only the event commissioner can create games. From your event, go to <strong>Games → Add Game → Describe a Format</strong>. This opens the AI prompt interface.</p>
<p>Players cannot create or modify games — only the commissioner can. If you're not seeing this option, confirm you're signed in as the commissioner for the event.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">4</div>
<div class="tutorial-step__content">
<h3>Write a clear prompt</h3>
<p>The more precisely you describe the format, the better the generated game will match what you want. A good prompt covers:</p>
<ul>
<li><strong>Players or teams</strong> — individual, 2v2, 4-person team</li>
<li><strong>Scoring method</strong> — gross or net, stroke play or match play</li>
<li><strong>What wins</strong> — low score per hole, best total, a points system</li>
<li><strong>Settlement</strong> — pool buy-in, per-hole stakes, or front/back/overall structure</li>
</ul>
<p><strong>Examples of effective prompts:</strong></p>
<p>"4 players, best ball 2v2 teams, net scoring. Nassau structure: separate bets on front 9, back 9, and full 18."</p>
<p>"3 players shamble: all tee off, pick the best drive, then each plays their own ball from there. Lowest net total wins."</p>
<p>"Modified Stableford, individual, gross scoring. Eagle = +4, birdie = +2, par = 0, bogey = −1, double bogey or worse = −3."</p>
<p>What to avoid: vague descriptions ("a fun team game"), assuming the AI knows your group's house rules, or trying to describe a multi-round tournament structure in a single prompt.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">5</div>
<div class="tutorial-step__content">
<h3>Review the generated game before the round</h3>
<p>After the AI generates a game, Marker shows you the full rule summary before you activate it. Do not skip this step — read it carefully before committing, especially for money games.</p>
<p>Confirm that:</p>
<ul>
<li>The scoring method matches your description (gross vs. net, individual vs. team)</li>
<li>Win conditions are correct — hole-by-hole, cumulative total, or points-based</li>
<li>The settlement calculation looks right</li>
<li>The number of players or teams is correct</li>
</ul>
<p>If anything is off, revise your prompt and regenerate. The AI can misinterpret ambiguous instructions — a second attempt with a more specific description usually resolves it.</p>
</div>
</div>

<div class="tutorial-step">
<div class="tutorial-step__marker" aria-hidden="true">6</div>
<div class="tutorial-step__content">
<h3>Running the game</h3>
<p>Once activated, an AI-generated game runs like any other Marker game. Scores update live, the leaderboard reflects your custom format, and settlement is automatic at the end of the round.</p>
<p>Custom games stack alongside built-in games. You can run a generated format alongside Skins or Nassau in the same event — the games are independent and settle separately.</p>
</div>
</div>

</div>

<div class="tutorial-note">
<p><strong>Limitations and best practices</strong></p>
<ul>
<li><strong>Not official rules.</strong> Generated games reflect the scoring logic in your prompt — they do not reference the USGA Rules of Golf or any governing body's official formats. Treat them as custom house rules.</li>
<li><strong>Works best for well-defined formats.</strong> Clear, specific prompts produce better results than open-ended ones. If the format is hard to describe in a sentence or two, it may be too complex for reliable generation.</li>
<li><strong>Review before every use.</strong> Even if you've used a similar prompt before, review the generated rules each time — especially for money games where a misunderstood rule affects settlement.</li>
<li><strong>Privacy.</strong> The description you enter is sent to an AI model for processing. Keep prompts focused on game rules — do not include player names, financial details, or any personal information in the prompt text.</li>
</ul>
</div>
