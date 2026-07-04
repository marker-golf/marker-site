# Screenshot Automation

This document covers the screenshot management system for the Marker marketing site — how screenshots are organized, named, referenced in templates, and how to capture and update them with Playwright once the Expo app is stable.

---

## Folder structure

```
src/images/
  brand/                        Brand assets that do not change with app releases
    hero-bg.jpg                 CSS background texture for page hero sections
    sketch-bg.jpg               (unused) Alternate background texture
    sketch-bg-2.jpg             (unused) Alternate background texture

  MarkerLogo.svg                App wordmark — stable, referenced from header/footer
  usga-badge.png                USGA Handicap Data Affiliate badge — stable

  screenshots/
    source/                     Raw PNG captures (Playwright output or manual)
      homepage-hero-mobile-demo.png
      homepage-leaderboard-mobile-demo.png
      homepage-games-mobile-demo.png
      ... (see screenshots.json for full list)

    web/                        Optimized WebP files for production — generated from source/
      (empty until first optimization run)

    placeholders/               SVG fallback images shown while real screenshots are pending
      placeholder-mobile.svg    Generic mobile-viewport placeholder
```

**`source/`** — commit raw PNGs here after capture.  
**`web/`** — generated from `source/`; commit WebP after optimization.  
**`placeholders/`** — commit SVGs; these are permanent fallbacks.

---

## Naming convention

```
<context>-<screen>-<viewport>-<state>.<ext>
```

| Segment    | Values                                          |
|------------|-------------------------------------------------|
| `context`  | `homepage`, `tutorial-create-event`, `game-wolf`, `commissioners`, etc. |
| `screen`   | `hero`, `event-list`, `game-picker`, `leaderboard`, `settlement`, etc. |
| `viewport` | `mobile`, `tablet`, `desktop`                   |
| `state`    | `demo` (standard), `empty` (zero-state), `error` |
| `ext`      | `.png` in `source/`, `.webp` in `web/`          |

### Examples

```
homepage-hero-mobile-demo.png
homepage-leaderboard-mobile-demo.png
tutorial-create-event-01-event-list-mobile-demo.png
tutorial-add-games-02-game-form-mobile-demo.png
game-wolf-setup-mobile-demo.png
game-nassau-setup-mobile-demo.png
commissioners-event-overview-mobile-demo.png
```

Use a two-digit prefix (`01`, `02`) when multiple sequential steps are captured for the same context.

---

## Screenshot manifest (`src/_data/screenshots.json`)

Every screenshot slot — both real images and placeholders — has an entry in `src/_data/screenshots.json`. Each entry has:

| Field      | Type     | Description |
|------------|----------|-------------|
| `src`      | string   | WebP path (production-ready, in `screenshots/web/`) |
| `fallback` | string   | PNG path (source) or placeholder SVG path |
| `alt`      | string   | Descriptive alt text for accessibility |
| `caption`  | string \| null | Optional caption rendered below the screenshot |
| `usage`    | string[] | Pages that use this screenshot (informational) |
| `viewport` | string   | `mobile`, `tablet`, or `desktop` |
| `status`   | string   | See statuses below |
| `notes`    | string   | Capture instructions for the Playwright author |

### Statuses

| Status        | Meaning |
|---------------|---------|
| `placeholder` | No real screenshot yet — renders the SVG placeholder |
| `draft`       | Screenshot captured but not yet reviewed |
| `stale`       | Screenshot exists but app UI has changed and it needs recapture |
| `approved`    | Screenshot reviewed and approved for production |

The component renders the fallback (placeholder or source PNG) for `placeholder` and `stale` statuses. It renders the WebP `src` only for `draft` and `approved`.

---

## Using screenshots in templates

Import the component macros at the top of any `.njk` or `.md` file:

```njk
{% from "components/product-screenshot.njk" import ProductScreenshot %}
{% from "components/product-screenshot.njk" import TutorialStepScreenshot %}
{% from "components/product-screenshot.njk" import GameGuideScreenshot %}
```

**Basic usage:**

```njk
{{ ProductScreenshot("homepageHero", screenshots) }}
```

**With phone frame:**

```njk
{{ ProductScreenshot("tutorialCreateEventStep1", screenshots, frame="phone") }}
```

**Without caption:**

```njk
{{ ProductScreenshot("gameSkinsPayout", screenshots, caption=false) }}
```

**Tutorial step with step number badge:**

```njk
{{ TutorialStepScreenshot("tutorialCreateEventStep1", screenshots, 1) }}
{{ TutorialStepScreenshot("tutorialCreateEventStep2", screenshots, 2) }}
```

**Game guide screenshot:**

```njk
{{ GameGuideScreenshot("gameWolfSetup", screenshots) }}
```

The `screenshots` variable is automatically available in all templates via Eleventy's global data cascade from `src/_data/screenshots.json`.

---

## Viewports

All Playwright captures should use:

| Name    | Width | Height | Notes |
|---------|-------|--------|-------|
| mobile  | 390   | 844    | iPhone 14 Pro viewport |
| tablet  | 768   | 1024   | iPad mini viewport |
| desktop | 1440  | 900    | Standard widescreen |

All current screenshot slots are `viewport: "mobile"`. Desktop/tablet slots can be added as needed.

---

## Prerequisites for Playwright automation

Before running automated screenshot capture, the following must be true:

### 1. Demo user account

A dedicated demo user must exist with:
- Established USGA handicap index (set to 14.0 for a mid-handicap look)
- No real personal data
- Credentials stored in `.env.screenshot` (never committed)

### 2. Demo event with deterministic data

A seeded event must exist with:
- Course: a real USGA course (e.g., a well-known public course with readable hole names)
- 4 players with recognizable first names (e.g., Todd, Mike, Sara, Chris)
- Scores entered for all 18 holes (par-realistic, not perfect)
- At least one game running: Skins with a carry on hole 7; Nassau with press on back 9
- Wolf game running if capturing Wolf screens

This data must be stable and not change between capture runs. A seed script or Expo dev fixture should create or reset it.

### 3. App in a predictable state

- No loading spinners during capture — wait for network idle
- No onboarding modals, tooltips, or "rate us" prompts
- Font rendering stable (system fonts, not web fonts, to avoid FOUT)
- Dark mode OFF (site screenshots are light-mode)

---

## Capture flow (future `npm run screenshots`)

```
1. Launch Expo web in CI mode with demo data pre-seeded
2. For each screenshot slot in screenshots.json:
   a. Navigate to the target screen/state defined in notes
   b. Set viewport to slot.viewport dimensions
   c. Wait for networkidle
   d. Screenshot → src/images/screenshots/source/<filename>.png
3. Optimize all new PNGs to WebP (see Optimization below)
4. Update screenshots.json statuses from "placeholder" → "draft"
5. Run npm run build to verify no broken paths
```

### Placeholder Playwright script design

```js
// scripts/capture-screenshots.js (future)
import { chromium } from '@playwright/test';
import screenshots from '../src/_data/screenshots.json' assert { type: 'json' };

const VIEWPORTS = {
  mobile:  { width: 390,  height: 844  },
  tablet:  { width: 768,  height: 1024 },
  desktop: { width: 1440, height: 900  },
};

const APP_BASE = process.env.EXPO_APP_URL ?? 'http://localhost:8081';

async function capture() {
  const browser = await chromium.launch();

  for (const [key, shot] of Object.entries(screenshots)) {
    if (shot.status !== 'placeholder' && shot.status !== 'stale') continue;
    if (!shot.notes) continue;

    const page = await browser.newPage();
    await page.setViewportSize(VIEWPORTS[shot.viewport]);

    // Navigate to the screen described in shot.notes
    // (each screen needs a deep-link or navigation sequence — defined per-shot)
    // await page.goto(`${APP_BASE}/...`);
    // await page.waitForLoadState('networkidle');

    const filename = shot.fallback.replace('/images/screenshots/source/', '').replace('.png', '');
    await page.screenshot({
      path: `src/images/screenshots/source/${filename}.png`,
      fullPage: false,
    });
    console.log(`Captured: ${key}`);
    await page.close();
  }

  await browser.close();
}

capture();
```

Add to `package.json`:
```json
"scripts": {
  "screenshots": "node scripts/capture-screenshots.js && npm run screenshots:optimize",
  "screenshots:optimize": "node scripts/optimize-screenshots.js"
}
```

---

## Optimization flow (PNG → WebP)

After capture, optimize each PNG to WebP before committing to `web/`:

```js
// scripts/optimize-screenshots.js (future)
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';

const sourceDir = 'src/images/screenshots/source';
const webDir    = 'src/images/screenshots/web';

const files = await glob(`${sourceDir}/*.png`);

for (const file of files) {
  const name = path.basename(file, '.png');
  await sharp(file)
    .webp({ quality: 85 })
    .toFile(`${webDir}/${name}.webp`);
  console.log(`Optimized: ${name}.webp`);
}
```

Install dependency: `npm install --save-dev sharp`

Target quality: `85` (good balance of size and fidelity for mobile screenshots).  
Typical result: 350 KB PNG → 40–80 KB WebP.

---

## Updating screenshots.json after capture

After new screenshots are captured and optimized:

1. Set `status` from `"placeholder"` → `"draft"` in `screenshots.json`
2. Verify the `src` (WebP) path matches the actual file in `screenshots/web/`
3. Review the image in context by running `npm run build` and opening the page locally
4. Promote `"draft"` → `"approved"` after visual review
5. Set `"approved"` → `"stale"` when the app UI changes and the screenshot needs recapture

---

## Verifying no stale screenshots

```bash
# List all screenshots with status "stale" or "placeholder"
node -e "
const s = JSON.parse(require('fs').readFileSync('src/_data/screenshots.json', 'utf8'));
Object.entries(s)
  .filter(([k,v]) => !k.startsWith('_') && (v.status === 'stale' || v.status === 'placeholder'))
  .forEach(([k,v]) => console.log(v.status.padEnd(12), k));
"
```

---

## What is NOT automated yet

- Navigation sequences to reach each screen (requires Expo deep-link support or test fixtures)
- Demo data seeding (requires a seed script in the Expo repo)
- CI integration (screenshot capture should run on a schedule, not on every push)
- Diff detection to auto-flag `approved` screenshots as `stale` after app changes
