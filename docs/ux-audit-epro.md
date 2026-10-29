# ePRO case study: UX and accessibility audit

Audit date: 2026-10-29. Covers the whole `/work/epro` route: the case-study
page, the embedded interactive prototype (`public/work/epro/prototype`), and
the "More work" links and footer beneath it. Browser pass in headless
Chromium at 1920, 1440, 1366×768, 1280×720, 1024, 768, 390, 360, 320 and
568×320 against a production build, with axe-core 4.10 on the page and on
each prototype screen (Home, three questions, Review, Done, Settings, and
the same with Easy Mode on).

The brief: no live text under 8px anywhere on the page, the prototype sized
to the screen with no page overflow and centred, plus an accessibility pass.
Every **Fix** below is implemented on this branch.

---

## 1. Text size

Method: every rendered text node was measured at its effective size
(computed `font-size` × any zoom or transform on its ancestors). Inside the
prototype the artboard is 390px wide and is zoomed to the iframe's width, so
a 15px label renders at 15 × (iframe width ÷ 390).

| Surface | Smallest live text, before | Smallest live text, after |
| --- | --- | --- |
| Page (all widths) | 11px (tags and eyebrows: `--text-micro`) | 11px |
| Prototype at 1440×900 | 14.9px | 14.5px (plate now fits the 900px viewport) |
| Prototype at 1280×720 | 14.9px, but the plate was 909px tall on a 720px screen | 11.3px, whole plate on screen |
| Prototype at 390 (phone) | 12.9px | 12.9px |
| Prototype at 320 (smallest phone) | 10.0px | 10.0px (floor: the iframe never goes under 260px wide, so even a 12px label stays at 8px) |

Result: no live text on the page or in the prototype renders under 8px at
any width tested. The 11px page minimum is the existing `--text-micro`
token used for tags, eyebrows and the footer line; it passes AA contrast
(§3) and was kept.

**Text inside images (out of the 8px rule, but the real culprit).** The
four decision mock-ups (`pain-scale-results`, `diary-window-and-done`,
`easy-mode-switch`) and the before/after and baseline images are bitmaps
exported at 1960px wide. Beside the decision copy they rendered at 590px on
desktop, so each phone screen in them was about 120px wide and the type on
those screens was 4 to 5px. That is what reads as "text built into the
mock-ups that is way too small".

- **Fix:** decision cards now put the artifact across the whole field
  beneath the copy (the same full-field pattern as the before/after image),
  with the 640px height cap removed. On desktop each image renders at
  1118px, the phone screens in them at about 230px, and their type at 8 to
  9px. On a 1024px tablet the image renders at 837px; on a 768px tablet at
  656px.
- **Open (asset work):** at phone width a three-up image can only be 316px
  wide, so the screens inside it are 60 to 65px and unreadable. The CSS
  cannot fix that. Re-export the three decision images as per-screen crops
  (one phone per image, 780×1688 like the hero screens) and show them as a
  `grid` of `phone` media; the content model already supports it.

## 2. The interactive prototype

Before: the plate was fixed at 420px wide with the artboard's 390/844 ratio,
so it was 909px tall whatever the screen. On a 1280×720 or 1440×900 laptop
the whole prototype never fit on screen, and on desktop it was left-aligned
in the text column (84px off centre at 1440, 240px off at 1024). The iframe
was also slightly taller than the zoomed artboard, leaving a dark strip under
it.

**Fix** (`.media--proto` in `globals.css`, `CaseStudyPrototype.tsx`):

- The iframe carries the prototype's aspect ratio (from the data) and the
  plate's width is the smallest of: the field, the artboard's true size
  (420px), and the width at which the plate's height equals the viewport
  less a 48px gutter (`100svh`, with `100vh` as the fallback).
- A floor keeps the iframe at 260px or wider so the artboard's smallest
  possible type (12px) never renders under 8px. Below about 600px of
  viewport height the plate is therefore taller than the screen; the page
  scrolls, it never overflows sideways.
- The plate is centred in the field at every width, with its label and
  caption centred beneath it.

Measured after the change:

| Viewport | Plate | Fits viewport height | Off-centre | Horizontal overflow |
| --- | --- | --- | --- | --- |
| 1920×1080 | 420×869 | yes | 0px | 0px |
| 1440×900 | 411×850 | yes | 0px | 0px |
| 1366×768 | 350×718 | yes | 0px | 0px |
| 1280×720 | 328×670 | yes | 0px | 0px |
| 1024×768 | 350×718 | yes | 0px | 0px |
| 768×1024 | 420×871 | yes | 0px | 0px |
| 390×844 | 358×749 | yes | 0px | 0px |
| 360×740 | 328×684 | yes | 0px | 0px |
| 320×568 | 282×585 | no (floor) | 0px | 0px |

## 3. Accessibility

axe-core, WCAG 2.0/2.1/2.2 A and AA plus best-practice rules.

| Check | Before | After |
| --- | --- | --- |
| axe violations, page | 0 | 0 |
| axe violations, prototype (per screen) | 1: content outside any landmark (`region`, moderate) | 0 |
| Contrast (computed by hand against the darkest and lightest stops of the page gradient, which axe cannot resolve) | all 9 text/background pairs pass AA; lowest is the 11px footer line at 5.07:1 | unchanged |
| Heading outline | `h1`, then one `h2` (the four rules) and the decision `h3`s; the story sections (The problem, The number nobody had, Four decisions, What changed, The training room) and More work had no heading | `h1` → `h2` per section → `h3` for the rules line and each decision |
| Keyboard focus ring | every link and button shows the two-layer ring; the prototype iframe showed nothing when Tab moved into it | the plate wears the ring while focus is inside the prototype after a Tab; a mouse click into it draws no ring |
| Target size (WCAG 2.2, 24px) | all pass; smallest is the 41×44 "Work" nav link | unchanged |
| Images | all six carry descriptive alt text | unchanged |
| Landmarks, skip link, `lang`, page title, iframe title, reduced motion | present | unchanged |

Fixes made:

- **Story kickers are headings.** `Kicker` takes `as="h2"` and the story
  layout uses it; a story's own heading line drops to `h3` (same `.cs-h2`
  styling). The "More work" / "Selected work" kicker in `ProjectShowcase` is
  an `h2` too, which also gives the home page a `h1 → h2 → h3` outline.
- **Prototype landmark.** The artboard root in `prototype/index.html` is
  `role="main"`, so nothing in it sits outside a landmark.
- **Focus into the prototype is visible.** Browsers hand focus straight to
  the document inside an iframe, so the iframe never matches
  `:focus-visible`. `CaseStudyPrototype` watches for a window blur that
  follows a Tab and sets `.media__frame--focused`, which adds the site's
  focus ring to the plate's shadow. Verified: Tab in → ring; Shift+Tab out →
  gone; click in → no ring. `iframe` was also added to the global
  `:focus-visible` rule for browsers that do focus the element itself.

Noted, not changed:

- The 11px footer line is AA (5.07:1) but under AAA (7:1). Raising it to
  `--text-label` (12px) and `--text-muted` would clear AAA; a taste call.
- The prototype caption says "Tap Start"; on a desktop it is a click. "Press
  Start" would cover both. Copy, so left for the author.
- Sections still arrive with a fade (opacity 0 until scrolled into view),
  so the page depends on JavaScript to show content. Recorded in the
  2026-10-15 audit; unchanged.
- On the other case studies the Process, Build to launch, Outcome and What I
  took with me kickers are still `div`s. `Kicker as="h2"` is ready for them.

## 4. Other UX notes on the page

- **Decision copy width.** With the artifact beneath it, the four-line
  `dl` now hangs from the text axis (columns 4 to 11) like every other
  story block, instead of being pinned to a sticky five-column rail.
- **Sticky copy removed.** The sticky decision copy only made sense beside
  a tall artifact; stacked, it would have overlapped the image.
- **Prototype affordance.** The caption carries the instruction ("Tap
  Start… the settings gear turns on Easy Mode") and the plate is now fully
  visible without scrolling, so the Start button is on screen when the
  reader reaches it.

## 5. Verification

- `tsc --noEmit`: clean. `next build`: clean.
- `pnpm lint` fails before and after this change for an unrelated reason:
  the repo has no `eslint.config.*` for ESLint 9.
- Browser re-check after the fixes at every viewport above: 0 horizontal
  overflow, plate centred to the pixel, 0 axe violations on the page and on
  every prototype screen, no live text under 8px.
