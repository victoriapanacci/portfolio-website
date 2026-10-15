import tokens from './tokens.json'

export type ColourToken = { name: string; value: string }

type Alpha = { of: string; percent: number }

/** Token entries of a group, skipping `$` notes. */
function entries<T>(group: Record<string, T | string>): [string, T][] {
  return Object.entries(group).filter(([key]) => !key.startsWith('$')) as [string, T][]
}

/** The same formula scripts/build-tokens.mjs writes to app/tokens.css. */
const alpha = ({ of, percent }: Alpha) =>
  `color-mix(in srgb, var(--${of}) ${percent}%, transparent)`

/**
 * The site's colour tokens, read from `lib/tokens.json`: the file the
 * stylesheet is generated from. Base colours first, then the derived
 * alpha states, in the order the JSON declares them.
 */
export function getColourTokens(): ColourToken[] {
  const base = entries<string>(tokens.color).map(([name, value]) => ({ name: `--${name}`, value }))
  const derived = entries<Alpha>(tokens.alpha).map(([name, value]) => ({
    name: `--${name}`,
    value: alpha(value),
  }))
  return [...base, ...derived]
}
