// Writes app/tokens.css from lib/tokens.json. Runs before `dev` and `build`,
// or on its own with `pnpm tokens`. The CSS file is generated; edit the JSON.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.join(root, 'lib', 'tokens.json')
const target = path.join(root, 'app', 'tokens.css')

const tokens = JSON.parse(await readFile(source, 'utf8'))

/** Token entries of a group, skipping `$` notes. */
const entries = (group) => Object.entries(group).filter(([key]) => !key.startsWith('$'))

/** An alpha token is a base colour mixed with transparent at a percentage. */
const alpha = ({ of, percent }) => `color-mix(in srgb, var(--${of}) ${percent}%, transparent)`

const lines = []
lines.push('/* Generated from lib/tokens.json by scripts/build-tokens.mjs. Do not edit. */')
lines.push(':root {')
lines.push('  color-scheme: dark;')
for (const [group, values] of entries(tokens)) {
  if (group === 'breakpoints') continue
  lines.push('')
  if (values.$comment) lines.push(`  /* ${values.$comment} */`)
  for (const [name, value] of entries(values)) {
    lines.push(`  --${name}: ${group === 'alpha' ? alpha(value) : value};`)
  }
}
lines.push('}')
for (const [width, values] of entries(tokens.breakpoints)) {
  lines.push(`@media (max-width: ${width}) {`)
  lines.push('  :root {')
  for (const [name, value] of entries(values)) lines.push(`    --${name}: ${value};`)
  lines.push('  }')
  lines.push('}')
}

await writeFile(target, lines.join('\n') + '\n')
console.log(`tokens: wrote ${path.relative(root, target)}`)
