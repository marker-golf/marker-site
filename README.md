# Marker — Marketing Website

Public marketing website for [Marker](https://marker.golf), a golf scoring platform built for commissioners, golf trips, tournaments, and side games.

**Live site:** https://marker-golf.github.io/marker-site/  
**App:** https://app.marker.golf

---

## What is Marker?

Marker is a cross-platform golf scoring app that handles everything groups hate doing manually: tracking scores hole by hole, running side games, managing handicaps, and settling up at the end. It's designed for golf commissioners running leagues and events, as well as casual groups who play with money on the line.

Available on iPhone, iPad, Android, and Web. Official USGA Handicap Affiliate.

This repository is the public-facing marketing site — it explains the product, showcases features, documents game rules, and drives sign-ups.

---

## Requirements

- Node 20 (pinned via `.nvmrc`)
- npm (no other global tools required)

---

## Local Development

```bash
npm install
npm run start
```

Eleventy starts a dev server at **http://localhost:8080/** with live reload. Internal links and asset paths use root-relative paths locally (e.g. `/games/`, `/images/`). The `PATHPREFIX` env var is not needed locally.

---

## Build

```bash
npm run build
```

Output is written to `_site/`. That directory is gitignored and generated fresh on every build.

The GitHub Actions workflow runs the build with `PATHPREFIX=/marker-site/` so all internal paths resolve under the GitHub Pages sub-path. No manual intervention is needed.

---

## Architecture

### Tech stack

| Layer | Choice |
|---|---|
| Static site generator | [Eleventy 3.x](https://www.11ty.dev/) |
| Templates | Nunjucks (`.njk`) and Markdown with Nunjucks pre-processing |
| Styles | Vanilla CSS with custom properties |
| Scripts | Vanilla JavaScript (mobile nav toggle only) |
| Data | JSON files in `src/_data/` |
| Hosting | GitHub Pages via GitHub Actions |

No frameworks, no bundlers, no build-time dependencies beyond Eleventy.

### File tree

```
marker-site/
├── src/
│   ├── _data/
│   │   ├── pricing.json          # Pricing plans rendered in index.njk
│   │   └── screenshots.json      # Screenshot manifest (see Images and Screenshots)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk          # HTML shell: meta, fonts, header, footer
│   │   │   ├── game-guide.njk    # Game detail page with hero, stats, sections
│   │   │   ├── legal-page.njk    # TOC sidebar + prose body (privacy, terms)
│   │   │   ├── prose-page.njk    # Hero + content body (about)
│   │   │   └── tutorial-guide.njk# Tutorial page with breadcrumb, subnav, steps
│   │   ├── components/
│   │   │   ├── badges.njk        # AppStoreBadge, PlayStoreBadge macros
│   │   │   ├── game-guide.njk    # Game guide section/step macros
│   │   │   ├── platform-bar.njk  # PlatformSupportBar macro
│   │   │   ├── product-screenshot.njk # ProductScreenshot, TutorialStepScreenshot, GameGuideScreenshot
│   │   │   └── trust-stats.njk   # TrustStats macro
│   │   ├── header.njk            # Sticky nav with mobile panel
│   │   └── footer.njk            # 5-column footer
│   ├── css/
│   │   └── styles.css            # All styles: tokens, layout, components
│   ├── js/
│   │   └── main.js               # Mobile nav toggle
│   ├── images/                   # See Images and Screenshots section below
│   ├── games/
│   │   ├── GAME-GUIDE-AUTHORING.md  # Author reference (excluded from build)
│   │   ├── handicap-settings.njk    # Handicap reference page
│   │   ├── wolf.md
│   │   ├── hammer.md
│   │   ├── ryder-cup.md
│   │   ├── team-count-x.md
│   │   ├── high-low.md
│   │   ├── match-play.md
│   │   ├── nassau.md
│   │   ├── nines.md
│   │   ├── scotch.md
│   │   ├── skins.md
│   │   ├── stableford.md
│   │   ├── team-stableford.md
│   │   ├── stroke-play.md
│   │   └── team-stroke-play.md
│   ├── tutorials/
│   │   ├── getting-started.md
│   │   ├── create-an-event.md
│   │   ├── add-players.md
│   │   ├── create-scorecards.md
│   │   ├── add-and-configure-games.md
│   │   ├── event-scoring.md
│   │   ├── handicap-settings.md
│   │   ├── side-games.md
│   │   └── ai-game-generation.md
│   ├── index.njk                 # Homepage
│   ├── games.njk                 # Games landing page
│   ├── tutorials.njk             # Tutorials landing page
│   ├── commissioners.njk         # Commissioner features page
│   ├── about.md                  # About page
│   ├── privacy.md                # Privacy policy
│   ├── terms.md                  # Terms & Conditions
│   └── _redirects                # URL redirect rules (copied to _site/)
├── docs/
│   └── screenshot-automation.md  # Playwright automation design (see Images and Screenshots)
├── _site/                        # Generated output (gitignored)
├── eleventy.config.js
├── package.json
├── .nvmrc                        # Pins Node 20
└── .github/
    └── workflows/
        └── pages.yml             # GitHub Pages CI/CD
```

### Eleventy collections

Two collections are defined in `eleventy.config.js`:

**`games`** — built from `src/games/*.md` files that have a `category` field. Sorted by category priority (`featured` → `classic`) then by `order`. Used in `games.njk` to render game cards.

**`tutorials`** — built from `src/tutorials/*.md` files that have a `cardDescription` field. Sorted by category priority (`Getting Started` → `Running Events`) then by `order`. Used in `tutorials.njk` to render tutorial cards.

### Path prefix

The `url` filter is required on every internal link and asset path: `{{ '/games/' | url }}`, `{{ '/images/foo.png' | url }}`. This ensures paths resolve correctly both locally (`/`) and on GitHub Pages (`/marker-site/`).

---

## Content Types

### Game guides (`src/games/*.md`)

Each game guide is a Markdown file with a `game-guide.njk` layout. Required front matter fields:

| Field | Description |
|---|---|
| `layout` | `layouts/game-guide.njk` |
| `title` | SEO title |
| `description` | SEO meta description |
| `status` | `available` or `coming-soon` |
| `category` | `featured` or `classic` |
| `order` | Integer sort order within category |
| `players` | e.g. `"2–4"` |
| `format` | e.g. `"Hole by Hole"` |
| `cardDescription` | Short text shown on the games landing page card |
| `game.name` | Display name |
| `game.difficulty` | `beginner`, `intermediate`, or `advanced` |
| `game.difficultyLabel` | Display label for difficulty |
| `game.subtitle` | Hero subtitle text |
| `game.heroStats` | Array of `{label, value}` objects shown in hero |

See `src/games/GAME-GUIDE-AUTHORING.md` for the full authoring guide and available macros from `components/game-guide.njk`.

### Tutorial guides (`src/tutorials/*.md`)

Each tutorial is a Markdown file with a `tutorial-guide.njk` layout. Required front matter:

| Field | Description |
|---|---|
| `layout` | `layouts/tutorial-guide.njk` |
| `title` | Page title and card heading |
| `description` | SEO meta description |
| `subtitle` | Hero subtitle |
| `category` | `Getting Started` or `Running Events` |
| `order` | Integer sort order within category |
| `estimatedTime` | e.g. `"3 min read"` |
| `cardDescription` | Short text shown on the tutorials landing page card |
| `iconSvg` | SVG `<path>` elements (single-quoted YAML) for the card icon |

### Prose pages (`src/about.md`)

Uses `layouts/prose-page.njk`. Front matter provides `heroHeading` and `heroSubtitle`. Body is HTML blocks at column 0 (CommonMark type-6 rule).

### Legal pages (`src/privacy.md`, `src/terms.md`)

Use `layouts/legal-page.njk`. Front matter includes a `toc` array of `{label, anchor}` objects that render the table of contents sidebar. Body HTML must start at column 0.

### Marketing pages

`index.njk`, `games.njk`, `tutorials.njk`, and `commissioners.njk` are standard Nunjucks templates with `layout: layouts/base.njk`. The games and tutorials pages are data-driven from their respective Eleventy collections.

### Pricing data (`src/_data/pricing.json`)

Pricing values are stored in `src/_data/pricing.json` and automatically available in templates as `pricing`. The homepage renders both the hero note and the pricing cards from this file. Edit the JSON to change prices, plan features, or copy without touching `index.njk`.

---

## Images and Screenshots

All images live under `src/images/` and are copied verbatim to `_site/images/` at build time. Use the `url` filter on every reference: `{{ '/images/MarkerLogo.svg' | url }}`.

### Directory layout

```
src/images/
├── MarkerLogo.svg                      # Brand wordmark — used in header and footer
├── usga-badge.png                      # USGA Handicap Affiliate badge
├── brand/
│   ├── hero-bg.jpg                     # Hero section background (CSS only)
│   ├── sketch-bg.jpg                   # (unused) alternate background texture
│   └── sketch-bg-2.jpg                 # (unused) alternate background texture
└── screenshots/
    ├── source/                         # Original PNG captures — commit after capture
    ├── web/                            # Optimized WebP files — served by the site
    └── placeholders/
        └── placeholder-mobile.svg      # Fallback shown for unshot slots
```

`web/` holds optimized WebP files ready to serve. WebP files land here after optimization; the manifest `status` determines whether `src` (the WebP) or `fallback` (source PNG or placeholder SVG) is rendered for each entry.

### The core principle: filename vs. manifest key

A screenshot **filename** describes what was captured. A **manifest key** describes how the site uses it.

```
Filename:   game-wolf-scorecard-mobile-active.webp
Key:        wolfLiveScorecard
```

This separation means a screenshot can be replaced — or renamed — without touching any page template. Templates reference the stable key; the manifest entry points to whichever file currently fills that slot.

### Naming convention

```
<context>-<screen>-<viewport>-<state>.<ext>
```

| Segment | Examples |
|---|---|
| `context` | `homepage`, `tutorial-create-event`, `game-wolf`, `commissioners` |
| `screen` | `hero`, `event-list`, `game-picker`, `leaderboard`, `settlement` |
| `viewport` | `mobile`, `tablet`, `desktop` |
| `state` | `demo`, `empty`, `active`, `results`, `setup` |
| `ext` | `.png` in `source/`, `.webp` in `web/` |

Use lowercase kebab-case. For multi-step tutorial captures, prefix with a two-digit sequence number:

```
tutorial-create-event-01-event-list-mobile-demo.png
tutorial-create-event-02-event-form-mobile-demo.png
```

Name files after **what is captured**, not where the image appears on the site:

```
# Good — describes the UI state shown
game-wolf-scorecard-mobile-active.webp

# Avoid — describes page placement
wolf-guide-second-image.webp
```

### Screenshot manifest (`src/_data/screenshots.json`)

Every screenshot slot — real or placeholder — has a named entry in `src/_data/screenshots.json`. This is the source of truth for what screenshots exist, what they show, and where they are used.

| Field | Description |
|---|---|
| `src` | WebP path in `screenshots/web/` — served when `status` is `draft` or `approved` |
| `fallback` | PNG in `source/` or placeholder SVG — rendered when `src` is not yet ready |
| `alt` | Alt text for accessibility |
| `caption` | Optional caption rendered below the image (`null` to suppress) |
| `usage` | Informational list of pages that reference this screenshot |
| `viewport` | `mobile`, `tablet`, or `desktop` |
| `status` | `placeholder` / `draft` / `approved` / `stale` — see lifecycle below |
| `notes` | Capture instructions for whoever takes the screenshot |

### Status lifecycle

```
placeholder → draft → approved → stale
```

| Status | Meaning |
|---|---|
| `placeholder` | Not yet captured — site renders the SVG fallback |
| `draft` | Screenshot exists and is under review — **not safe to commit or deploy until approved** |
| `approved` | Passed visual, accuracy, and privacy review — ready for production |
| `stale` | Exists but shows outdated UI — renders from `fallback` until replaced |

`draft` is a workflow state, not a deployment or privacy clearance. A draft screenshot may contain personal or sensitive data from the capture session and must pass privacy review before it can be promoted to `approved` or committed to the repository.

Mark screenshots `stale` explicitly rather than leaving obsolete product UI silently on the site.

### Using screenshots in templates

Import the macros at the top of any `.njk` or `.md` file:

```njk
{% from "components/product-screenshot.njk" import ProductScreenshot %}
{% from "components/product-screenshot.njk" import TutorialStepScreenshot %}
{% from "components/product-screenshot.njk" import GameGuideScreenshot %}
```

The `screenshots` variable is globally available from `src/_data/screenshots.json`.

```njk
{# Bare image #}
{{ ProductScreenshot("homepageHero", screenshots) }}

{# With phone frame #}
{{ ProductScreenshot("tutorialCreateEventStep1", screenshots, frame="phone") }}

{# Tutorial step with numbered badge #}
{{ TutorialStepScreenshot("tutorialCreateEventStep1", screenshots, 1) }}

{# Game guide screenshot #}
{{ GameGuideScreenshot("gameWolfSetup", screenshots) }}
```

Do not hardcode `src/images/screenshots/` paths in templates. The component resolves the correct path from the manifest and handles fallback automatically.

### Tested manual screenshot workflow

This workflow was validated replacing the `homepageHero` screenshot with an Expo capture.

1. Start the Expo web dev server locally from the Marker app project:

   ```bash
   npx expo start --web
   # default URL: http://localhost:8081
   ```

   Navigate to the screen you want to capture. Capture a PNG at the exact viewport dimensions for the manifest slot — 390×844 for mobile. Two options:

   - **Playwright** (preferred): see `docs/screenshot-automation.md` for the recommended viewport and clip settings.
   - **Chrome DevTools**: open DevTools → device toolbar → set 390×844 → ⌘+Shift+P → "Capture screenshot".

2. Save the PNG to `src/images/screenshots/source/` using the naming convention.
3. Convert to WebP using Sharp (already a project devDependency):

   ```bash
   node -e "require('sharp')('src/images/screenshots/source/<filename>.png').webp({ quality: 85 }).toFile('src/images/screenshots/web/<filename>.webp')"
   ```

4. Update the manifest entry in `src/_data/screenshots.json`:
   - For a **new** screenshot: add an entry with a stable semantic key.
   - For a **replacement**: keep the existing key, update `src` and `fallback` paths.
   - Set `status: "draft"`.

5. Run `npm run build` — verify no broken paths.
6. Run `npm run start` and review the screenshot in context at the relevant page.
7. Complete the privacy review checklist (see below) — **a screenshot must pass privacy review before it can be committed**.
8. Run `git status` — confirm the manifest change and the approved asset file are staged together, and no draft or personal-data screenshots are staged.
9. Promote `status` to `"approved"` only after all reviews pass.
10. Commit the manifest and the approved WebP together in the same commit.

**Example — `homepageHero`:**

| | |
|---|---|
| Manifest key | `homepageHero` (stable — survives future filename changes) |
| Source PNG | `src/images/screenshots/source/homepage-hero-mobile-expo-demo.png` |
| Optimized WebP | `src/images/screenshots/web/homepage-hero-mobile-expo-demo.webp` |

The key `homepageHero` stays constant even if the underlying filename changes in a future UI refresh — only the manifest `src` and `fallback` values update.

### Privacy review checklist

Before promoting a screenshot from `draft` to `approved`, verify the image contains **none** of the following:

- [ ] Real names
- [ ] GHIN numbers or other handicap identifiers
- [ ] Phone numbers
- [ ] Email addresses
- [ ] Profile photos of real people
- [ ] Real customer or player information
- [ ] Private event or club names
- [ ] Personal financial or payment information
- [ ] Precise location data
- [ ] Any other personally identifying or sensitive data

**Screenshots containing personal or sensitive information must not be committed to this repository or deployed to production.**

Capture screenshots using only:
- Dedicated demo accounts with fictional identities
- Seeded events with fictional player names and synthetic scoring data
- Non-sensitive course and event information
- No real GHIN identifiers

### Screenshot automation (planned)

Playwright-based automated capture is designed but not yet implemented. Sharp is already installed as a project devDependency and will be used for the PNG→WebP optimization step. The full automation design — capture flow, Playwright script structure, viewport standards, demo data requirements, and stale-screenshot verification — is documented in [`docs/screenshot-automation.md`](docs/screenshot-automation.md).

**Currently implemented:** folder structure, naming convention, manifest, reusable template components, SVG placeholder fallback, Sharp for WebP conversion.  
**Planned:** Playwright capture, automated optimization pipeline, stale screenshot detection.

### Image rules

- Never hardcode screenshot paths in templates — use manifest keys.
- A screenshot filename describes what was captured; the manifest key describes how the site uses it.
- Keep original captures in `source/`. Serve optimized WebP from `web/`.
- `draft` is not a deployment approval — screenshots must pass privacy review before being committed or promoted to `approved`.
- Use only demo accounts with fictional identities. Never use real customer, player, or personal data in screenshots.
- Use consistent viewports: mobile 390×844, tablet 768×1024, desktop 1440×900.
- Mark outdated screenshots `stale` — don't leave obsolete product UI on the site silently.
- Commit the manifest and asset files together — never let a manifest entry point to a local-only file.
- Run `npm run build` before committing any image change.

---

## Deployment

Pushes to `main` trigger `.github/workflows/pages.yml`, which:

1. Checks out the repo with `node-version: 20`
2. Runs `npm ci` and `npm run build` with `PATHPREFIX=/marker-site/`
3. Uploads `_site/` as a GitHub Pages artifact
4. Deploys to GitHub Pages

Concurrent runs are cancelled (`cancel-in-progress: true`) to prevent stale builds from overwriting a newer deployment.

**Live URL:** https://marker-golf.github.io/marker-site/

---

## Common Workflows

### Add a new game guide

1. Copy an existing file in `src/games/` as a starting point.
2. Set the front matter fields: `status`, `category`, `order`, `players`, `format`, `cardDescription`, `game.*`.
3. Write the guide body using the macros documented in `GAME-GUIDE-AUTHORING.md`.
4. The guide will appear automatically on the games landing page once `category` is set.

### Add a new tutorial

1. Create a new `.md` file in `src/tutorials/`.
2. Set `layout: layouts/tutorial-guide.njk`, `category`, `order`, `cardDescription`, and `iconSvg`.
3. The card will appear automatically on the tutorials landing page.

### Update pricing

Edit `src/_data/pricing.json`. Changes propagate to the homepage hero note and both pricing cards. No template changes needed.

### Edit about or legal content

`src/about.md`, `src/privacy.md`, and `src/terms.md` are standard Markdown files. Edit the body directly. For legal pages, if adding a new section, also add a matching `{label, anchor}` entry to the `toc` array in the front matter.

### Add a new page

Create a `.njk` or `.md` file in `src/`. Set `layout: layouts/base.njk` (or a more specific layout). Eleventy will generate the page at the matching URL. Add the page to the nav in `src/_includes/header.njk` and footer in `src/_includes/footer.njk` if needed.

### Add or replace a screenshot

See [Images and Screenshots](#images-and-screenshots) for the full workflow, naming convention, and manifest update steps.

### Test the path prefix locally

To simulate a GitHub Pages build locally:

```bash
PATHPREFIX=/marker-site/ npm run build
```

Then serve `_site/` with any static file server and navigate to `/marker-site/`.

### Add a URL redirect

Append a line to `src/_redirects` in the format `old-path  new-path  301`. The file is copied verbatim to `_site/_redirects` at build time.

---

## Build Validation

After any structural change, verify the build is clean:

```bash
npm run build
```

Eleventy will exit non-zero and report the error if any template fails. Common issues:

- **Missing `| url` filter** on an internal link — the link will work locally but break on GitHub Pages.
- **HTML blocks indented ≥ 4 spaces** in `.md` files — CommonMark treats them as code blocks; keep block-level HTML at column 0.
- **`&` in Nunjucks output** — store bare `&` in front matter; Nunjucks auto-escapes it to `&amp;` in HTML output.

---

## Git Workflow

- `main` is the production branch. Every push deploys automatically.
- There is no staging environment. Test locally with `npm run start` before merging.
- The `_site/` directory is gitignored — never commit build output.
