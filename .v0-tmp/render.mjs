import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
const require = createRequire('/tmp/svgrender/')
const sharp = require('sharp')

const svg = readFileSync('/vercel/share/v0-project/public/icon.svg')
const out = '/vercel/share/v0-project/public'

const targets = [
  ['icon-dark-32x32.png', 32],
  ['icon-light-32x32.png', 32],
  ['apple-icon.png', 180],
]

for (const [name, size] of targets) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(`${out}/${name}`)
  console.log('wrote', name, size)
}
