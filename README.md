# Marker — Marketing Website

Public marketing website for [Marker](https://marker.golf), a golf scoring platform built for commissioners, golf trips, tournaments, and side games.

**Live site:** https://marker-golf.github.io/marker-site/  
**App:** https://app.marker.golf

---

## What is Marker?

Marker is a cross-platform golf scoring app that handles everything groups hate doing manually: tracking scores hole by hole, running side games (Skins, Nassau, Nines, and six more), managing handicaps, and settling up at the end. It's designed for golf commissioners running leagues and events, as well as casual groups who play with money on the line.

Available on iPhone, iPad, Android, and Web. Official USGA Handicap Affiliate.

This repository is the public-facing marketing site — it explains the product, showcases its features, and drives sign-ups to the app.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Static site generator | [Eleventy 3.x](https://www.11ty.dev/) |
| Templates | Nunjucks (`.njk`) |
| Styles | Vanilla CSS with custom properties |
| Scripts | Vanilla JavaScript (mobile nav toggle) |
| Node version | 20 (see `.node-version`) |
| Hosting | GitHub Pages (CI/CD via GitHub Actions) |
| Future hosting | Cloudflare Pages compatible (`npm run build` → `_site/`) |

No frameworks, no bundlers, no build-time dependencies beyond Eleventy.

---

## Local Development

```bash
npm install
npm run start
```

Eleventy starts a local dev server at **http://localhost:8080/** with live reload. Assets and internal links use root-relative paths (`/css/styles.css`, `/games/`) in local development.

---

## Build

```bash
npm run build
```

Output is written to `_site/`. This directory is gitignored and generated fresh on every build.

For GitHub Pages deployment, the build is run with `PATHPREFIX=/marker-site/` so all internal paths resolve correctly under the project sub-path:

```bash
PATHPREFIX=/marker-site/ npm run build
```

The GitHub Actions workflow sets this automatically — no manual intervention needed.

---

## Deployment

Pushes to `main` trigger the workflow at `.github/workflows/pages.yml`, which:

1. Checks out the repo on Node 20
2. Runs `npm ci` and `npm run build` with `PATHPREFIX=/marker-site/`
3. Uploads `_site/` as a Pages artifact
4. Deploys to GitHub Pages

Concurrent runs are cancelled (`cancel-in-progress: true`) to prevent stale builds from overwriting a newer deployment.

---

## Repository Structure

```
marker-site/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk          # HTML shell, fonts, meta
│   │   ├── components/
│   │   │   ├── badges.njk        # AppStoreBadge, PlayStoreBadge macros
│   │   │   └── platform-bar.njk  # PlatformSupportBar macro
│   │   ├── header.njk            # Sticky nav with mobile panel
│   │   └── footer.njk            # 4-column footer
│   ├── css/
│   │   └── styles.css            # Full CSS (tokens, layout, components)
│   ├── js/
│   │   └── main.js               # Mobile nav toggle
│   ├── images/
│   │   ├── MarkerLogo.svg
│   │   ├── usga-badge.png
│   │   ├── hero-bg.jpg
│   │   └── screen-*.png          # App screenshots (placeholder)
│   ├── index.njk                 # Homepage
│   ├── games.njk                 # Games page
│   ├── about.njk                 # About page (footer-linked only)
│   └── _redirects                # Cloudflare Pages URL redirects
├── _site/                        # Generated output (gitignored)
├── eleventy.config.js
├── package.json
├── .node-version                 # Pins Node 20
└── .github/
    └── workflows/
        └── pages.yml             # GitHub Pages CI/CD
```

---

## Content

### Home (`/`)

Hero with primary CTA ("Try Marker Free"), App Store and Google Play placeholder badges, platform availability bar (USGA · iPhone & iPad · Android · Web), a three-step how-it-works section, two feature showcase rows, commissioner callout, testimonials, and a bottom CTA band.

### Games (`/games/`)

One card per supported game, each with an anchor ID that footer links resolve to directly (e.g. `/games/#nassau`). Games covered: High-Low, Matchplay, Nassau, Nines, Scotch, Skins, Stableford, Stroke Play, Team Stroke Play.

### About (`/about/`)

Origin story and product positioning. Linked from the footer but not the primary nav.

### Positioning

The site leads with commissioner-friendly messaging — league management, multi-flight events, handicap control — alongside casual group play. The tagline "All Golf. No Math." anchors the brand throughout.

---

## Contributing

- **Reuse components.** Badge and platform bar macros live in `src/_includes/components/`. Add new reusable pieces there.
- **Mobile-first.** Write base styles for small screens and use `@media (min-width: ...)` for larger breakpoints.
- **No new dependencies.** If it can be done with vanilla CSS or JS, do that. Eleventy is the only build dependency.
- **Follow Eleventy conventions.** Templates in `src/`, includes in `src/_includes/`, static assets via `addPassthroughCopy` in `eleventy.config.js`.
- **Use the `url` filter** for every internal link and asset path so builds work at any `pathPrefix`.

---

## Roadmap

- [ ] Replace placeholder app screenshots with Expo-generated screenshots
- [ ] Replace App Store placeholder badge with official Apple badge once live
- [ ] Replace Google Play placeholder badge with official Google badge once live
- [ ] Commissioner landing page (`/commissioner/`)
- [ ] Tutorials section (`/tutorials/`)
- [ ] Additional game detail pages
- [ ] Custom domain (marker.golf or marketing.marker.golf)
- [ ] Migrate to Cloudflare Pages
