# Victoria Panacci — Brand Kit

Everything here is extracted from the live site (`app/globals.css`, `app/layout.tsx`)
so it stays true to what actually ships. Upload the PNGs straight into Canva.

## Files

| File | Size | Use |
|---|---|---|
| `hero-background-2880x1620.png` | 2880×1620 (16:9) | Slide/presentation backgrounds, LinkedIn banners, case-study covers |
| `hero-background-2160x3840.png` | 2160×3840 (9:16) | Instagram/TikTok stories, mobile-first posts |
| `colour-palette.png` | 3200×1496 | Reference card. Canva can also pull the palette off it via **Brand Kit → Add colours from image** |
| `design-tokens.json` | — | Full machine-readable token set (colour ramps, type scale, radii, shadows). Repo reference, not a Canva upload |

The hero backgrounds are re-renders of the site's `.hero-light` bloom — the same
radial + linear gradient stack, rotation, blur, film grain, and page gradient. The
site generates it in CSS, so there was no existing image file to pull; these are the
first raster versions of it.

## Colour

### Core palette

| Name | Hex | Role |
|---|---|---|
| Ink | `#0C0810` | Page background. The darkest ground. |
| Ink 2 | `#130C17` | Raised surfaces and cards. |
| Plum | `#18101D` | Warm dark accent surface. |
| Cream | `#F2E8DC` | Primary text on dark. |
| Muted warm | `#B9AEAD` | Secondary text, labels, meta. |
| Rose | `#D97B72` | Primary accent. Links, rules, highlights. |
| Peach | `#E9A27D` | Secondary accent. Gradient partner to rose. |
| Ember | `#E78F7E` | Eyebrow / kicker text. |

### Supporting values

- **Hairline / divider:** `rgba(242, 232, 220, 0.14)`
- **Page gradient:** `linear-gradient(180deg, #0B0710 0%, #0D0811 58%, #100913 100%)`
- **Accent rule:** `linear-gradient(90deg, #D97B72, transparent)`
- **Light card gradient:** `linear-gradient(160deg, #F6F2EC, #E9E1D6)`
- **Text selection:** `rgba(217, 123, 114, 0.35)`

The site is dark-only — `themeColor` is `#0C0810` and `colorScheme` is `dark`.
There is no light mode to match.

## Type

| Role | Face | Notes |
|---|---|---|
| Display / headings | **Georgia** (`Georgia, 'Times New Roman', serif`) | Always weight 400. Tight tracking: `-0.02em` on titles, `-0.045em` on the big hero line. |
| Body / UI | **Inter** (Google Fonts, loaded via `next/font`) | Weights 400 and 600 only. |

**In Canva:** Inter is a standard Canva font. Georgia is a system font and generally
isn't in Canva's library — **Gelasio** is metric-compatible with Georgia and is the
closest substitute (it's what the palette card above is set in). Lora, PT Serif, or
Noto Serif also work if Gelasio isn't available to you.

### Scale

| Token | Size | Line height | Tracking |
|---|---|---|---|
| Hero H1 | `clamp(55px, 7.1vw, 84px)` | 0.92 | −0.045em |
| Page H1 | `clamp(68px, 7.2vw, 118px)` | 0.92 | −0.045em |
| Case study title | `clamp(40px, 4.6vw, 66px)` | 1.0 | −0.03em |
| Footer H2 | `clamp(54px, 5.2vw, 86px)` | 0.95 | −0.035em |
| Section kicker | 22px | 1.0 | −0.02em |
| Lede | 17px | 1.75 | — |
| Body | 14px | 1.7 | — |
| Eyebrow (uppercase, 600) | 12px | 1.8 | 0.04em |
| Nav (uppercase) | 11px | — | 0.18em |
| Category (uppercase) | 11px | — | 0.17em |

The signature move: a tightly-tracked serif display line against wide-tracked
uppercase sans micro-labels. Keep that contrast and it reads as yours.

## Voice

**The through-line:** *"I make complexity feel invisible."*

### How it sounds

- **First person, declarative, no hedging.** "I frame ambiguous, high-stakes problems
  before jumping to solutions." Not "I try to" or "I'm passionate about."
- **Stakes first, then the work, then the number.** "Led the design and delivery of a
  first-of-its-kind DICOM redaction workflow, reducing manual review effort by ~50%
  while meeting regulatory audit requirements."
- **Numbers are evidence, not decoration.** ~50%, $15M, 30%+, 15+ businesses,
  13 brand properties. Always attached to what they measure.
- **Tension as a hook.** "In a world where anyone can ship, the costliest mistake is
  shipping the wrong thing."
- **Concrete over abstract.** Names the real domain — DICOM, 21 CFR Part 11, ePRO,
  sportsbook, cashier — and expands an acronym the first time it appears.
- **Sentences start with a strong verb.** Designed, led, translated, drove, rebuilt, built.
- **Dry humour, but only at the edges.** The footer credits Mordecai the cat. The body
  copy stays straight.

### What it avoids

No exclamation points. No "passionate," "obsessed," "rockstar," "10x." No adjective
stacking. No claiming outcomes without the constraint that made them hard — the
constraint *is* the story.

### Reusable lines

- Experienced product designer that makes complexity feel invisible
- I make complexity feel invisible
- Turning complex, data-heavy workflows into products that feel simple
- Designing within real technical, regulatory, and organizational constraints
- In a world where anyone can ship, the costliest mistake is shipping the wrong thing
