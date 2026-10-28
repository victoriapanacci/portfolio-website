# ePRO card cover

Renders the fifteen card-cover options in `/public/work/epro/covers` from
HTML: the two entry-summary screens (`screens.mjs`), the compositions
(`variants.mjs`) and a Playwright renderer (`render.mjs`).

```sh
node scripts/epro-cover/render.mjs public/work/epro/covers      # all fifteen
node scripts/epro-cover/render.mjs public/work/epro/covers 2    # one, by number
```

Needs a resolvable `playwright` with its Chromium, plus ImageMagick's
`convert` for the WebP step. Fonts in `fonts/` are Figtree and Noto Serif
(both SIL Open Font License); Inter comes from the system.

The home card picks one file in `lib/projects.ts` (`cover.src` on the ePRO
project). The card fades its bottom 42% into ink, so every composition keeps
the story in the top two-thirds of the 3:2 frame.
