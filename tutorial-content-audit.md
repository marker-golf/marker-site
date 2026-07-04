# Tutorial Content Audit
**Date:** 2026-07-04  
**Scope:** `src/tutorials.njk`, all `src/tutorials/*.md`, tutorial front matter, landing page, and cross-links to/from game guides.

---

## Executive Summary

The tutorials section is structurally sound for its six workflow tutorials (Getting Started through Event Scoring, Using Handicaps, Side Games, and AI Game Generation). These pages are clean and genuinely instructional.

The critical problems are on the **Tutorials landing page** (`tutorials.njk`), not in the tutorial content itself:

1. **The Wolf card links to a game guide**, not a tutorial. A 900-line game guide (rules, mechanics, strategy, FAQ) is being surfaced as a tutorial card in the Running Events section.
2. **Eight placeholder tutorial cards link to `#`** (Hammer, Ryder Cup, TeamCountX, Nassau, Match Play, Stableford, Skins, Scotch). Several of their card descriptions frame the content as "understand when hammers apply" or "understand how Marker closes matches" — game rule language, not workflow language.
3. **The Running Events section description** says "Detailed walkthroughs for all supported game formats — rules, configuration, and settlement" — which is an accurate description of game guides, not tutorials.
4. **"Add and Configure Games" does not exist** as a tutorial. There is no tutorial explaining how a commissioner adds Wolf, Skins, Nassau, etc. to a Marker event. This is the most important missing workflow step.
5. **"Using Handicaps in Marker"** is categorized as `Getting Started` at order 6, placing it after Event Scoring in the Getting Started section. Handicap configuration happens during game setup, not after scoring begins. It belongs in Running Events.

None of the eight `.md` tutorial files contain material that should be moved to Games. The taxonomy issue is entirely in the landing page architecture and in content that doesn't exist yet.

---

## Current Tutorial Inventory

| File | Title | Category | Order | Est. Time | Status |
|---|---|---|---|---|---|
| `getting-started.md` | Getting Started | Getting Started | 1 | 3 min | Clean |
| `create-an-event.md` | Create an Event | Getting Started | 2 | 4 min | Clean |
| `add-players.md` | Add Players | Getting Started | 3 | 2 min | Clean |
| `create-scorecards.md` | Create Scorecards | Getting Started | 4 | 3 min | Clean |
| `event-scoring.md` | Event Scoring | Getting Started | 5 | 3 min | Clean, but scope is wide |
| `handicap-settings.md` | Using Handicaps in Marker | Getting Started | 6 | 5 min | Wrong category |
| `side-games.md` | Side Games | Running Events | 1 | 4 min | Clean |
| `ai-game-generation.md` | Create a Custom Game with AI | Running Events | 2 | 4 min | Clean |

**Tutorials landing page — Running Events section (hardcoded cards):**

| Card title | href | Status |
|---|---|---|
| Wolf | `/games/wolf/` | **Game guide, not a tutorial** |
| Hammer | `#` | Placeholder (does not exist) |
| Ryder Cup | `#` | Placeholder (does not exist) |
| TeamCountX | `#` | Placeholder (does not exist) |
| Nassau | `#` | Placeholder (does not exist) |
| Match Play | `#` | Placeholder (does not exist) |
| Stableford | `#` | Placeholder (does not exist) |
| Skins | `#` | Placeholder (does not exist) |
| Scotch | `#` | Placeholder (does not exist) |

---

## Page-by-Page Findings

---

### 1. Getting Started
**Current purpose:** Sign in via phone number, set up profile, install as PWA.  
**Belongs in Tutorials:** Yes.  
**Content to keep:** All four steps. Pure workflow — no game concepts introduced.  
**Content to remove or shorten:** None.  
**Should link to Game Guide instead:** N/A.  
**Missing Marker workflow steps:** None for this scope.  
**Factual conflicts:** None found.  
**Title / category / order:** Correct as-is.

---

### 2. Create an Event
**Current purpose:** Tap "Host Event," select course, name event, set date, save.  
**Belongs in Tutorials:** Yes.  
**Content to keep:** All five steps.  
**Content to remove or shorten:** None.  
**Should link to Game Guide instead:** N/A.  
**Missing Marker workflow steps:** The tutorial ends at "event created." It does not mention that the next step is adding players AND then adding games. A transitional note pointing toward "Add and Configure Games" (once that tutorial exists) would complete the user journey. The current flow (event → players → scorecards) skips the games-setup step entirely.  
**Factual conflicts:** None found.  
**Title / category / order:** Correct as-is.

---

### 3. Add Players
**Current purpose:** Search by name/phone, add guest, send SMS join link, set tees.  
**Belongs in Tutorials:** Yes.  
**Content to keep:** All five steps.  
**Content to remove or shorten:** None.  
**Should link to Game Guide instead:** N/A.  
**Missing Marker workflow steps:** None for this scope.  
**Factual conflicts:** None found.  
**Title / category / order:** Correct as-is.

---

### 4. Create Scorecards
**Current purpose:** Choose start format, set time, group players into carts, publish via SMS.  
**Belongs in Tutorials:** Yes.  
**Content to keep:** All five steps.  
**Content to remove or shorten:** None.  
**Should link to Game Guide instead:** N/A.  
**Missing Marker workflow steps:** Like Create an Event, this tutorial doesn't reference game configuration. A reader following the Getting Started sequence (event → players → scorecards → scoring) could complete the full flow without ever learning how to add a game. The gap is addressed by an eventual "Add and Configure Games" tutorial.  
**Factual conflicts:** None found.  
**Title / category / order:** Correct as-is.

---

### 5. Event Scoring
**Current purpose:** Open leaderboard, track cross-group standings, settle, record series results.  
**Belongs in Tutorials:** Yes.  
**Content to keep:** All four steps.  
**Content to remove or shorten:** Step 3 mentions "skins, Nassau, stroke play net, Stableford points" by name. This is appropriate — it's listing what Marker settles, not explaining how those games work. No change needed.  
**Should link to Game Guide instead:** Step 3 could optionally add a phrase like "For game-specific settlement details, see the relevant game guide" with a link to `/games/`. Not required, but would be useful.  
**Missing Marker workflow steps:** The tutorial covers the leaderboard and settlement but not the scorecard entry experience itself. Step 1 ("open the leaderboard") assumes scores have already been entered — there's no step for "how do I actually enter a score on my phone?" That workflow gap is either a missing step here or a separate "Enter Scores" tutorial.  
**Factual conflicts:** Step 3 states Marker "simplifies [settlements] to the minimum number of transactions." This is a specific algorithmic claim. If Marker's settlement screen does not use minimum-transaction optimization (i.e., if it shows all individual debts rather than a simplified graph), this is inaccurate. Worth verifying.  
**Title / category / order:** The title "Event Scoring" implies score-entry, but the content focuses on the leaderboard view and post-round settlement. Consider "Live Scoring and Settlement" or split into two separate tutorials. Category (Getting Started) is acceptable. Order (5) is correct.

---

### 6. Using Handicaps in Marker
**Current purpose:** Documents all five handicap configuration options and USGA score posting.  
**Belongs in Tutorials:** Yes — these are Marker settings, not golf rules per se.  
**Content to keep:** All six steps. The formula in Step 1 (Course Handicap calculation) and the ESC explanation in Step 4 are necessary to understand why a commissioner would choose each option. This is acceptable rules context serving a configuration decision.  
**Content to remove or shorten:** None.  
**Should link to Game Guide instead:** Step 1's bullet points about stroke allocation ("A 10-handicap player receives one stroke on each of the 10 hardest-rated holes") are accurate but lean toward rules explanation. A brief cross-link to game guides that show handicap in action (Skins, Match Play, Stableford) would be appropriate. Currently the tutorial has no outbound links to game guides at all.  
**Missing Marker workflow steps:** The tutorial explains the options but doesn't tell the commissioner *where* in the Marker UI to find these settings. Adding "Where to find handicap settings: from your event, tap Games → [game name] → Handicap" would make it more actionable.  
**Factual conflicts:** None found. The content aligns with what game guides reference when they link here.  
**Title / category / order:** Category should be **Running Events**, not Getting Started. Handicap configuration is part of game setup, not account/event creation. Current placement (Getting Started, order 6) puts it after Event Scoring in the Getting Started section — the user has finished the round before reading the handicap guide. In Running Events it would logically follow an eventual "Add and Configure Games" tutorial. Suggested order: Running Events, order 2 (after Side Games) or Running Events, order 3 (after a future "Add and Configure Games" tutorial).

---

### 7. Side Games
**Current purpose:** Explains cross-group side matches — what they are, how to set them up, how to track and settle.  
**Belongs in Tutorials:** Yes — the focus is on the Marker workflow for setting up a side match.  
**Content to keep:** All five steps plus the closing note.  
**Content to remove or shorten:** Step 1 ("What is a side game?") explains the concept. This is necessary context for a user who has never heard the term. It is brief (two short paragraphs) and appropriate.  
The closing note mentions Nassau specifically: "Two players in different carts bet on front 9, back 9, and overall 18 — Marker tracks all three bets automatically and handles press rules without any manual tracking." This describes Nassau's structure (front/back/overall, presses) in one sentence. Acceptable for a note; a link to the Nassau game guide would be better practice.  
**Should link to Game Guide instead:** The Nassau mention in the closing note should link to `/games/nassau/` rather than leaving the concept unexplained. Similarly, the step mentioning "Nassau is the most common [side game]" should link to the Nassau game guide.  
**Missing Marker workflow steps:** Step 3 says "Select which players from your group are in the match and which players from the other group they're competing against" — clear. No significant gaps.  
**Factual conflicts:** None found.  
**Title / category / order:** Correct as-is (Running Events, order 1).

---

### 8. Create a Custom Game with AI
**Current purpose:** Commissioner workflow for AI game generation — prompt → review → run.  
**Belongs in Tutorials:** Yes — this is entirely about using a Marker feature.  
**Content to keep:** All six steps and the limitations note.  
**Content to remove or shorten:** None.  
**Should link to Game Guide instead:** The prompt examples in Step 4 mention Nassau, Stableford, and shamble formats. These are fine as examples without being full explanations. No links are strictly required, though linking "Nassau structure" to `/games/nassau/` would help a user who doesn't know the term.  
**Missing Marker workflow steps:** The tutorial describes the prompt interface but doesn't mention where in Marker to find AI game generation specifically (what menu, what tab). Step 3 gives a path ("Games → Add Game → Describe a Format") — this is good, but it assumes the UI path is correct. If the actual path differs, this step will be wrong.  
**Factual conflicts:** None found with other tutorial or game guide content.  
**Title / category / order:** Correct as-is (Running Events, order 2).

---

## Duplicated Games Content

No tutorial file duplicates detailed game guide content. The taxonomy violations are all structural (landing page architecture) rather than content-level.

**Minor overlaps worth noting:**

- **Event Scoring step 3** lists game types by name when describing settlement. This is listing, not explaining. Acceptable.
- **Side Games closing note** gives a one-sentence Nassau description. This should link to the game guide rather than standing alone.
- **Using Handicaps in Marker** explains the USGA handicap formula and ESC. These appear in several game guides (Skins, Match Play, Stableford) as cross-referenced concepts. The tutorial is the authoritative source for this configuration content — no duplication problem, but the linking pattern should consistently point from game guides to this tutorial (currently they do, correctly).

---

## Missing Tutorial Workflow Content

### Critical gap: "Add and Configure Games"

No tutorial explains how to add games to a Marker event. The current Getting Started sequence takes a user from account creation through scorecard publication without ever showing them how to add Skins, Nassau, Wolf, or any other game. This is the most-used feature in Marker.

A complete tutorial would cover:
- Opening the Games tab in an event
- Browsing and selecting a built-in game
- Configuring game-specific options (stake, carryover, handicap mode, etc.)
- Adding multiple games to the same event
- Editing or removing a game before the round starts

This tutorial should live in Running Events and be the entry point to all game-specific configuration. It should link out to individual game guides for rules details rather than re-explaining them.

### Moderate gap: Scorecard score entry

"Event Scoring" opens with the leaderboard view but doesn't explain how players actually enter scores. A step explaining "tap the hole, enter gross score, tap save" is absent. This may be an intentional scope choice (the flow is extremely simple), but it leaves a gap in the user journey between "scorecards published" and "leaderboard showing live scores."

### Moderate gap: "Review Results and Settlements"

Settlement is covered in one step of Event Scoring (step 3). A separate tutorial covering the full settlement screen — reading the breakdown, understanding per-game vs. aggregate totals, sharing results — would give this important post-round workflow the depth it deserves.

---

## Recommended Information Architecture

Reorganizing around the desired user journey, with category corrections and identified gaps:

### Getting Started
| # | Title | Status | Notes |
|---|---|---|---|
| 1 | Getting Started | Exists, clean | No change |
| 2 | Create an Event | Exists, clean | No change |
| 3 | Add Players | Exists, clean | No change |
| 4 | Create Scorecards | Exists, clean | No change |

### Running Events
| # | Title | Status | Notes |
|---|---|---|---|
| 5 | Add and Configure Games | **Missing** | Most critical new tutorial |
| 6 | Using Handicaps in Marker | Exists, wrong category | Move from Getting Started to Running Events, change order to 2 (or 3 if "Add Games" is order 1) |
| 7 | Event Scoring | Exists, needs minor scope work | Consider rename or split |
| 8 | Create a Custom Game with AI | Exists, clean | Renumber order to 3 or 4 after new tutorials are added |
| 9 | Review Results and Settlements | **Missing** | Can start as split from Event Scoring |
| 10 | Side Games | Exists, clean | Remains at order 1 in Running Events, renumber as needed |

---

## Recommended Rename / Merge / Retire Decisions

### Rename: "Event Scoring" → "Live Scoring and Settlement"
The current title implies score-entry (the user doing it), but the content is about the leaderboard view and settlement. "Live Scoring and Settlement" is more accurate. Alternatively, split:
- **"Enter Scores and Follow Live Scoring"** — leaderboard, cross-group tracking
- **"Review Results and Settlements"** — settle screen, series recording

Splitting produces more focused tutorials but adds a page. The split is recommended if the settlement screen has enough distinct workflow to warrant its own page.

### Recategorize: "Using Handicaps in Marker" — Getting Started → Running Events
Category change only. No content changes needed. Adjusting the `order` field to place it logically within Running Events (after "Add and Configure Games" if that tutorial is created).

### Retire (or replace): Wolf card on tutorials landing page
The Wolf card on the tutorials landing page links to `/games/wolf/`. This must be removed or replaced with a link to a dedicated Wolf setup tutorial when one exists. Until then, remove the card.

### Replace or remove: 8 placeholder `href="#"` cards on tutorials landing page
These cards (Hammer, Ryder Cup, TeamCountX, Nassau, Match Play, Stableford, Skins, Scotch) do not exist and link nowhere. Options:
1. **Remove them** until the tutorials are written. Dead links erode trust.
2. **Replace descriptions** to be clearly workflow-focused (not "understand when hammers apply") so that when tutorials are eventually created, they're written to the right spec.

The placeholder card descriptions that contain game rule language ("understand when hammers apply," "track hole standings (2UP, 3DOWN), and understand how Marker closes matches") should be reframed as workflow language ("configure Hammer multipliers," "set up match play in Marker") regardless of when the tutorials are written.

---

## Internal Linking Recommendations

| From | Currently links to | Should also link to |
|---|---|---|
| `side-games.md` (Nassau note) | `/games/` (via relatedTutorials) | `/games/nassau/` inline for the Nassau mention |
| `event-scoring.md` (step 3, game types) | Nothing | `/games/` or relevant individual game guides |
| `handicap-settings.md` | `/tutorials/event-scoring/` (relatedTutorials) | `/games/skins/`, `/games/match-play/`, `/games/stableford/` for "see handicap in action" |
| `ai-game-generation.md` (Step 4, examples) | `/tutorials/side-games/` | `/games/nassau/` for the Nassau prompt example |
| Game guides (all) | `/tutorials/handicap-settings/` ✓ | Future: `/tutorials/add-and-configure-games/` for setup workflow |
| `tutorials.njk` Running Events header | Nothing | Should remove "rules" from section description |

**Current tutorials.njk Running Events section description:**  
> "Detailed walkthroughs for all supported game formats — rules, configuration, and settlement."

This description applies to game guides, not tutorials. Suggested replacement:  
> "Step-by-step guides for configuring and running games in Marker — from adding your first game to custom AI formats."

---

## Phased Cleanup Plan

### Phase 1 — Fix the landing page (no content writing required)

1. Remove the Wolf card from `tutorials.njk` (it links to a game guide)
2. Revise the Running Events section header description
3. Reframe the 8 placeholder card descriptions to use workflow language, or remove the placeholder cards entirely

### Phase 2 — Category and metadata corrections (no content writing required)

4. Move "Using Handicaps in Marker" from `Getting Started` to `Running Events` — change `category` and `order` in front matter

### Phase 3 — New tutorial: "Add and Configure Games"

5. Create `src/tutorials/add-and-configure-games.md` covering the game-addition workflow. This is the most impactful missing tutorial and unlocks the rest of the Running Events sequence.

### Phase 4 — Refine existing tutorials

6. Split or rename "Event Scoring" to address scope ambiguity
7. Add score-entry workflow (the missing step between scorecard publication and leaderboard)
8. Add inline cross-links from `side-games.md` to `/games/nassau/`

### Phase 5 — Game-specific setup tutorials (long-term)

9. Write proper setup tutorials for Wolf, Skins, Nassau, and Hammer — the four most commonly played games. These should explain *how to configure them in Marker* and link to the game guide for rules. Replace the current placeholder cards.
10. Retire remaining placeholder cards for games with less tutorial demand.

---

## Highest-Priority Cleanup Actions

1. **Remove the Wolf card from the tutorials landing page.** It links to `/games/wolf/` — a 900-line game guide. This is the most direct taxonomy violation: a game guide surfaced as a tutorial.

2. **Move "Using Handicaps in Marker" to Running Events.** Category and order change only — no content rewrite. Currently it sits at the end of Getting Started after Event Scoring, which is illogical since handicap is configured before scoring begins.

3. **Fix the Running Events section description** in `tutorials.njk`. "Rules, configuration, and settlement" is game guide language. The section header actively misrepresents the tutorials section.

4. **Create "Add and Configure Games."** The tutorial sequence currently has no page explaining how to add a game to an event. This is the most critical missing workflow step — it's the bridge between event setup and game-specific behavior.

5. **Reframe or remove the 8 placeholder cards.** Any card description using "understand [rule concept]" language should be rewritten to workflow language before a tutorial is written against it. Descriptions drive content; wrong descriptions produce wrong tutorials.
