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
│   │   └── pricing.json          # Pricing plans rendered in index.njk
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
│   │   │   └── trust-stats.njk   # TrustStats macro
│   │   ├── header.njk            # Sticky nav with mobile panel
│   │   └── footer.njk            # 4-column footer
│   ├── css/
│   │   └── styles.css            # All styles: tokens, layout, components
│   ├── js/
│   │   └── main.js               # Mobile nav toggle
│   ├── images/                   # See Images section below
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
│   │   ├── event-scoring.md
│   │   └── side-games.md
│   ├── index.njk                 # Homepage
│   ├── games.njk                 # Games landing page
│   ├── tutorials.njk             # Tutorials landing page
│   ├── commissioners.njk         # Commissioner features page
│   ├── about.md                  # About page
│   ├── privacy.md                # Privacy policy
│   ├── terms.md                  # Terms & Conditions
│   └── _redirects                # URL redirect rules (copied to _site/)
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

## Images

All images live in `src/images/` and are copied verbatim to `_site/images/` at build time.

| File | Usage |
|---|---|
| `MarkerLogo.svg` | Header and footer wordmark |
| `usga-badge.png` | USGA Handicap Affiliate badge |
| `hero-bg.jpg` | Homepage hero background |
| `sketch-bg.jpg`, `sketch-bg-2.jpg` | Section backgrounds |
| `screen-home.png` | Homepage hero screenshot |
| `screen-leaderboard.png` | Leaderboard feature row |
| `screen-games.png` | Games feature row |
| `screen-scorecard.png` | Scorecard screenshot |
| `screen-scoring.png` | Scoring screenshot |
| `screen-event.png` | Event screenshot |
| `screen-end-round.png` | End-of-round screenshot |

Reference images in templates with the `url` filter: `{{ '/images/screen-home.png' | url }}`.

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

### Update a screenshot

Replace the file in `src/images/`. The filename and `alt` text are referenced directly in templates — update `alt` in the template if the content changes significantly.

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
