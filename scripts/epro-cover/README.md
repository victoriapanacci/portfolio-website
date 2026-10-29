# ePRO card cover

Renders the fifteen card-cover options in `/public/work/epro/covers` from
HTML: the two entry-summary screens (`screens.mjs`), the compositions
(`variants.mjs`) and a Playwright renderer (`render.mjs`).

```sh
node scripts/epro-cover/render.mjs public/work/epro/covers      # all fifteen
node scripts/epro-cover/render.mjs public/work/epro/covers 2    # one, by number
node scripts/epro-cover/render.mjs public/work/epro/covers wipe-after   # one slider layer
```

Needs a resolvable `playwright` with its Chromium, plus ImageMagick's
`convert` for the WebP step. Fonts in `fonts/` are Figtree and Noto Serif
(both SIL Open Font License); Inter comes from the system.

The home card uses the functional slider (`compare` on the ePRO project in
`lib/projects.ts`, drawn by `components/CompareCover.tsx` from the two
`wipe-*` layers). Set `cover.src` to one of the `v*` files instead for a
still image. The card fades its bottom 42% into ink, so every composition keeps
the story in the top two-thirds of the 3:2 frame.
