import { readFile } from 'node:fs/promises'
import path from 'node:path'

export type ColourToken = { name: string; value: string }

/** A value counts as a colour when it is a hex, an rgb/hsl call, a colour mix or a gradient. */
const COLOUR_VALUE = /^(#|rgba?\(|hsla?\(|color-mix\(|linear-gradient\()/

/**
 * Reads the site's live colour tokens from the file it builds from
 * (`app/globals.css`, the `:root` block) at build time. Nothing is
 * hardcoded here: add a token to the stylesheet and it shows up.
 */
export async function getColourTokens(): Promise<ColourToken[]> {
  const file = path.join(process.cwd(), 'app', 'globals.css')
  const css = await readFile(file, 'utf8')

  // The first `:root { ... }` block holds every token declaration.
  const start = css.indexOf(':root {')
  if (start === -1) return []
  const end = css.indexOf('\n}', start)
  const block = css.slice(start, end === -1 ? undefined : end)

  const tokens: ColourToken[] = []
  const declaration = /--([\w-]+):\s*([^;]+);/g
  for (const match of block.matchAll(declaration)) {
    const [, name, raw] = match
    const value = raw.replace(/\s+/g, ' ').trim()
    if (COLOUR_VALUE.test(value)) tokens.push({ name: `--${name}`, value })
  }
  return tokens
}
