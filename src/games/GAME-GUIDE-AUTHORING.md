# Game Guide Authoring Guide

Game guides live in `src/games/`. Each guide is a Markdown file (`.md`) that uses the shared `game-guide` layout.

## File structure

```
src/games/high-low.md        ← game-specific content
src/games/wolf.md
src/games/team-count-x.md
src/_includes/layouts/game-guide.njk   ← shared hero, nav, CTA
src/_includes/components/game-guide.njk ← reusable macros
```

## Editing copy

Open the `.md` file for the game you want to edit. The overview prose is at the top of the file body, right after the front matter `---` block. Paragraphs are plain Markdown text — just edit and save. Run `npm run build` (or `npm run serve`) to preview.

## Front matter

The front matter at the top of each file controls the hero section, page navigation, and final CTA. Key fields:

```yaml
game:
  name: High-Low          # h1 in hero
  difficulty: intermediate # CSS modifier: intermediate | advanced
  difficultyLabel: Intermediate
  subtitle: "..."         # hero subtitle paragraph
  heroSubtitleWidth: "520px"  # optional max-width for subtitle
  heroStats:              # stats row in hero
    - label: Players
      value: "4 (2v2)"
  heroCta:
    primary: {text: "Play High-Low in Marker", href: "https://app.marker.golf"}
    secondary: {text: "Browse All Games", href: "/games/"}
  finalCta:
    heading: Ready to Play High-Low?
    body: "..."
    primary: {text: "Start Your First Event", href: "https://app.marker.golf"}
    secondary: {text: "Read the Setup Guide", href: "/tutorials/getting-started/"}
sections:                  # in-page navigation links
  - {id: overview, label: Overview}
  - {id: how-it-works, label: "How It Works"}
```

**Note on special characters in YAML values:** Store plain `&` in YAML (e.g. `"Groups & outings"`). Nunjucks auto-escaping will produce `&amp;` in the HTML output correctly.

## Adding a prose paragraph

Find the section in the `.md` file. Inside `<div class="gg-prose">` blocks, prose is plain Markdown. Add a blank line between paragraphs:

```markdown
<div class="gg-prose">

First paragraph here.

Second paragraph here. Use **bold** or _italic_ as needed.

</div>
```

The blank line after the opening `<div>` tag and before the closing `</div>` tag is required — it signals CommonMark to process the enclosed text as Markdown rather than raw HTML.

## Adding a table

Use the `.scoring-table-wrap` class for mobile scroll on wide tables:

```html
<div class="scoring-table-wrap">
  <table class="scoring-table">
    <thead><tr><th>Column</th><th>Column</th></tr></thead>
    <tbody>
      <tr><td>Value</td><td>Value</td></tr>
    </tbody>
  </table>
</div>
```

## Adding a Marker Implementation callout

Use the `MarkerImplNote` macro (already imported at the top of each file):

```njk
{{ MarkerImplNote("This guide describes how X is scored in Marker.") }}
```

## Adding a worked example

Use the `gg-callout` class for summary callouts and the `scoring-table` class for data tables. See the existing Example sections in any guide for the full pattern.

## Adding FAQ items

In the `#faq` section, add a `<details>` block:

```html
<details class="gg-faq-item">
  <summary>Your question here?</summary>
  <div class="gg-faq-body">
    <p>Your answer here.</p>
  </div>
</details>
```

## Adding related games

Use the `RelatedCard` macro in the `#related` section:

```njk
{{ RelatedCard(
  "Game Name",
  "One-line description of the game.",
  '/games/game-slug/' | url
) }}
```

## Creating a new guide

1. Copy an existing guide (e.g., `cp src/games/wolf.md src/games/new-game.md`)
2. Update the front matter: `title`, `description`, `game.*`, `sections`
3. Replace all content sections with new content
4. Run `npm run build` to verify

The URL will be `/games/new-game/` automatically.

## Available macros

Import at the top of the file body (already in each guide):
```njk
{% from "components/game-guide.njk" import SectionHeader, ConfigCard, ScreenshotPlaceholder, TipCard, FaqItem, RelatedCard, MarkerImplNote %}
```

| Macro | Purpose |
|-------|---------|
| `SectionHeader(label, heading, subtitle)` | Section title block |
| `ConfigCard(label, title, desc, options, badge)` | Setup option card |
| `TipCard(category, heading, body)` | Strategy tip card |
| `MarkerImplNote(body)` | Marker implementation callout |
| `RelatedCard(name, desc, href)` | Related game card |
| `ScreenshotPlaceholder(caption, sub)` | App screenshot placeholder |

## Section background pattern

Sections alternate between cream (default `.section`) and white (`.section--white`). The dark section is used for "Why Marker":

```html
<section class="section section--white" id="overview">
<section class="section" id="how-it-works">
<section class="section section--dark" id="why-marker">
```

## How Nunjucks + Markdown processing works

Because `markdownTemplateEngine: "njk"` is set in `eleventy.config.js`, `.md` files are processed in two passes:

1. **Nunjucks first** — macro calls expand, `{% from %}` imports resolve, `{{ }}` expressions evaluate, `{# #}` comments are stripped
2. **Markdown second** — the Nunjucks output is parsed as CommonMark; plain paragraphs become `<p>` tags, Markdown lists become `<ul>`, etc.

This means you can use full Nunjucks syntax anywhere in the `.md` body. The prose paragraphs in `<div class="gg-prose">` blocks are converted to Markdown and rendered as clean `<p>` tags, while complex HTML components (tables, macro calls, config cards, FAQ items) pass through unchanged.
