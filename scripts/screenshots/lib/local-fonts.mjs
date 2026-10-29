// Network-policy fulfillers that answer the Vue app's Google Fonts requests
// from the pinned @fontsource packages, so captures never reach Google and
// always render with the same font files.

import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

// Google Fonts families requested by the Vue app, mapped to @fontsource files.
const FONT_PACKAGES = {
  'Source Sans Pro': { pkg: '@fontsource/source-sans-pro', slug: 'source-sans-pro', weights: [400, 600, 700] },
  'Pragati Narrow': { pkg: '@fontsource/pragati-narrow', slug: 'pragati-narrow', weights: [400, 700] },
  'Marck Script': { pkg: '@fontsource/marck-script', slug: 'marck-script', weights: [400] }
}
const LOCAL_FONT_PREFIX = 'https://fonts.gstatic.com/__local__/'

function fontCss (url) {
  const families = url.searchParams.getAll('family').flatMap(f => f.split('|'))
  return families.map(spec => {
    const name = spec.split(':')[0].replace(/\+/g, ' ')
    const config = FONT_PACKAGES[name]
    if (!config) throw new Error(`Unmapped font family requested: ${name}`)
    return config.weights.map(weight => `@font-face { font-family: '${name}'; font-style: normal; font-weight: ${weight}; font-display: block; src: url(${LOCAL_FONT_PREFIX}${config.slug}/${weight}.woff2) format('woff2'); }`).join('\n')
  }).join('\n')
}

// The woff2 file for one family and weight (also used for video callouts).
export function localFontFile (slug, weight) {
  const config = Object.values(FONT_PACKAGES).find(f => f.slug === slug)
  if (!config || !config.weights.includes(weight)) throw new Error(`Unknown local font ${slug}/${weight}`)
  const dir = path.dirname(require.resolve(`${config.pkg}/package.json`))
  return fs.readFileSync(path.join(dir, 'files', `${slug}-latin-${weight}-normal.woff2`))
}

function fontFile (url) {
  const [slug, file] = url.pathname.replace('/__local__/', '').split('/')
  return localFontFile(slug, parseInt(file, 10))
}

export const fontFulfillers = [
  { match: url => url.protocol === 'https:' && url.host === 'fonts.googleapis.com', respond: url => ({ status: 200, contentType: 'text/css', body: fontCss(url) }) },
  { match: url => url.href.startsWith(LOCAL_FONT_PREFIX), respond: url => ({ status: 200, contentType: 'font/woff2', body: fontFile(url) }) }
]
