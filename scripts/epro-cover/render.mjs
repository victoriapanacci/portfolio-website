/**
 * Renders the ePRO card-cover variants to 1920x1280 WebP.
 *
 *   node scripts/epro-cover/render.mjs [outDir] [only]
 *
 * Needs the Playwright-bundled Chromium (`require('playwright')` must
 * resolve) and ImageMagick's `convert` for the WebP step.
 */
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { variants } from './variants.mjs'
import { screenCss } from './screens.mjs'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const outDir = resolve(process.argv[2] ?? resolve(here, 'out'))
const only = process.argv[3]
mkdirSync(outDir, { recursive: true })

export const W = 1920
export const H = 1280

const fontCss = `
  @font-face { font-family: 'Figtree'; font-weight: 600 800; src: url('file://${here}/fonts/figtree.woff2') format('woff2'); }
  @font-face { font-family: 'Noto Serif'; font-weight: 400; src: url('file://${here}/fonts/notoserif.woff2') format('woff2'); }
  @font-face { font-family: 'Noto Serif'; font-weight: 400; font-style: italic; src: url('file://${here}/fonts/notoserif-italic.woff2') format('woff2'); }
`

/* Site tokens, mirrored from app/globals.css so the covers sit in the card
   like they were born there. */
const siteCss = `
  :root {
    --ink: #0c0810; --ink-2: #100913; --plum: rgba(74, 28, 47, 0.28);
    --cream: #f2e8dc; --text: #d8cdc8; --text-muted: #b9aead;
    --rose: #d97b72; --peach: #e9a27d;
    --line: rgba(242, 232, 220, 0.14);
    --serif: 'Noto Serif', Georgia, serif;
    --sans: Inter, system-ui, sans-serif;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body { width: ${W}px; height: ${H}px; overflow: hidden; background: var(--ink); color: var(--cream); font-family: var(--sans); -webkit-font-smoothing: antialiased; }
  .canvas { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: linear-gradient(180deg, #0b0710 0%, #0d0811 58%, #100913 100%); }
  .abs { position: absolute; }
  .tag {
    display: inline-flex; align-items: center; height: 56px; padding: 0 26px;
    border-radius: 999px; font-size: 22px; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; line-height: 1; white-space: nowrap;
  }
  .tag--before { border: 2px solid rgba(242, 232, 220, 0.35); color: var(--cream); }
  .tag--after { background: var(--peach); color: var(--ink); }
  .eyebrow { font-size: 22px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--peach); line-height: 1; }
  .serif { font-family: var(--serif); font-weight: 400; letter-spacing: -0.03em; line-height: 1; }
  .light {
    position: absolute; pointer-events: none; filter: blur(14px);
    background: radial-gradient(ellipse at 50% 50%,
      rgba(244, 192, 148, 0.62) 0 6%, rgba(230, 112, 104, 0.36) 16%,
      rgba(136, 53, 82, 0.22) 32%, transparent 60%);
  }
  .dim { filter: saturate(0.55) brightness(0.72); }
`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })

const list = only ? variants.filter((v) => v.id === only || String(v.n) === only) : variants
for (const v of list) {
  const html = `<!doctype html><html><head><meta charset="utf-8">
    <style>${fontCss}${siteCss}${screenCss}${v.css ?? ''}</style></head>
    <body><div class="canvas">${v.html({ root })}</div></body></html>`
  const file = `v${String(v.n).padStart(2, '0')}-${v.id}`
  const htmlPath = resolve(outDir, `${file}.html`)
  writeFileSync(htmlPath, html)
  // Load from disk rather than setContent: file:// images only resolve from a file:// page.
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const png = resolve(outDir, `${file}.png`)
  await page.screenshot({ path: png, type: 'png' })
  execFileSync('convert', [png, '-quality', '82', '-define', 'webp:method=6', resolve(outDir, `${file}.webp`)])
  console.log('rendered', file)
}
await browser.close()
