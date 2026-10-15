# UX audit and UI inventory

Audit date: 2026-10-15. Covers every route, component, and style in the repo at this commit, plus a browser pass (Chromium at 1440, 768, 390 and 360 px) against a production build. The companion document, `docs/design-system.md`, is the standard that comes out of these decisions.

Each item in the decision log is marked **Keep**, **Merge**, **Fix**, or **Remove**.

---

## 1. Scope and method

| Surface | Source of truth |
| --- | --- |
| Routes | `app/page.tsx` (home), `app/about/page.tsx`, `app/work/[slug]/page.tsx` (ePRO, DeID, Cashier with case studies; Design System as a placeholder), `app/coming-soon/page.tsx` |
| Shared components | `components/*.tsx`, `components/motion/*.tsx`, `components/ui/button.tsx` |
| Styles | `app/globals.css` (2,865 lines: 176 lines of shadcn tokens, then ~2,690 lines of hand-written site CSS) |
| Content model | `lib/projects.ts` |

Method: read every file, cross-referenced each CSS class against component usage, counted raw values (colours, radii, easings), then verified the behavioural findings in a headless browser.

---

## 2. Headline numbers

| Measure | Today | Target |
| --- | --- | --- |
| Unique hard-coded hex colours in site CSS | 58 | 0 (all through tokens) |
| Colour tokens actually used | 5 (`--ink`, `--cream`, `--rose`, `--peach`, `--line`) | ~14 semantic tokens |
| Distinct border radii | 23 | 5 |
| Copies of the identical "peach label" rule | 8 | 1 |
| Copies of the identical card `h3` rule | 7 | 1 |
| Copies of the identical card body `p` rule | 8 (in 4 different greys) | 1 |
| Copies of the 6 px rose bullet dot | 4 | 1 |
| Copies of the pill CTA Tailwind class string | 4 | 1 component |
| Focus ring treatments | 4 (custom ring, Tailwind ring, 2 px outline, browser default) | 1 |
| Section kicker variants | 2 (`.section-kicker`, `.cs-kicker`) | 1 |
| Arrival easings | 2 (`0.22,1,0.36,1` and `0.16,1,0.3,1`) | 1 |
| Breakpoints | 3 (1024, 860, 640) | 2 |
| Dead code | shadcn Button + 5 packages, ~175 lines of unused theme tokens, 4 unused classes, 3 unused content blocks, 1 orphan route, 4 placeholder assets | 0 |

---

## 3. Page inventory

### Home `/`
1. Site header (monogram, desktop nav, mobile menu)
2. Hero: split-word headline, lead paragraph with two external inline links, drifting light
3. "Featured projects" kicker + 2×2 project card grid (4 cards, 1 "Coming soon")
4. Footer: closing statement, two pill CTAs, colophon line, back-to-top

### About `/about`
1. Site header
2. "Back to Home" pill (back variant)
3. Hero: headline, summary, portrait plate, drifting light
4. "How I work" kicker + 4 principle cards
5. "Work experience" kicker + 4 timeline rows
6. "Education" kicker + 3 education cards
7. "Selected work" kicker + quick-links list
8. Footer

### Case study `/work/[slug]` (ePRO, DeID, Cashier)
1. Site header
2. "Back to All Work" pill (back variant)
3. Hero: title, summary, art (device loop, framed media, or drawn illustration); side or stacked layout
4. Meta bar (Role / Team / Product / Timeline)
5. Optional lede
6. Problem: lead + two panels + media
7. Solution or Research (order flips with `researchFirst`)
   - Solution variants: checklist + media, principle cards, decision rows with proof media, walkthrough device, prototype iframe
   - Research: lead, media, finding cards
8. Optional: pivot, process steps, objectives, sprints, metrics band, outcomes, launch phases, validation panel, reflection, learnings
9. "Explore more work" kicker + quick links (current project excluded)
10. Footer

### Placeholder `/work/system`
Eyebrow, title, description, note, "Back to all work" pill, quick links, footer.

### Coming soon `/coming-soon`
Orphan. No link points to it. Eyebrow, headline, lead, LinkedIn pill. No header or footer.

---

## 4. Element inventory with states

Legend: ✓ defined · — not applicable · ✗ missing or broken · ≈ inherited browser default

### 4.1 Navigation

| Element | Where | Default | Hover | Focus-visible | Active / current | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Monogram link | `.monogram` | 13 px, 600, `#efaa92` | rose | ≈ grey 1 px auto outline | ✗ | Its colour is a one-off hex, not a token |
| Desktop nav link | `.desktop-nav a` | 11 px uppercase, 0.18 em, `#efe1d4` | rose | ≈ grey 1 px auto outline (verified) | ✗ no current-page state | 44 px min height ✓ |
| Mobile menu button | `.mobile-menu` | 44×44, 3 hairlines | ✗ | ✗ | ✓ morphs to X | No `cursor: pointer` |
| Mobile menu link | `.mobile-nav-menu a` | same as desktop | rose + 8 % cream wash | ≈ | ✗ | Escape and outside-click close ✓; no focus trap (acceptable for a 3-item menu) |
| Skip link | — | ✗ | | | | None on the site |

### 4.2 Calls to action

| Element | Where | Default | Hover | Focus-visible | Active | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Pill CTA, forward | `ArrowLink` | rose/10 fill, rose/40 border, cream text, → | rose border, rose/20 fill, arrow +4 px | 2 px rose/70 ring | ✗ | Class string duplicated in 3 other files |
| Pill CTA, back | `CaseStudy.tsx`, `about/page.tsx` | identical, ← leads | arrow −4 px | same | ✗ | Copy varies: "Back to Home", "Back to All Work", "Back to all work" |
| Footer CTA ×2 | `SiteFooter.tsx` | identical pill | same | same | ✗ | Email CTA opens a Gmail compose URL, not `mailto:` |
| Back to top | `.footer-bottom a` | 22 px ↑ glyph | ✗ | ≈ | — | Hit area 18×33 px (verified), below the 44 px minimum |
| Inline text link | `.hero-body a` | cream, rose underline | rose | ≈ | — | Only inline link style on the site; prose in case studies has no link support |

### 4.3 Interactive cards and rows

| Element | Where | Default | Hover | Focus-visible | Touch | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Project card (whole card is a link) | `.project-card` | 28 px radius, hairline, 2 % fill, shadow | lifts 4 px (`translate`), rose border, art scales 1.03, "Case study →" slides in | rose border + 3 px rose/45 ring; same reveal | CTA always visible | The best-specified element on the site; use it as the reference |
| Project card, no case study | `.project-card__cta--soon` | "Coming soon" in muted warm | same lift | same | | Still a link to a placeholder page |
| Quick link row | `.quick-link a` | index, title, category, → | 6 % rose wash, **padding-left animates 8→20 px** | ≈ | | Padding animation causes layout shift; arrow also moves 6 px |
| Quick link, no case study | `.quick-link__soon` | "Soon" outlined pill | | | | Second visual treatment for the same state as above |

### 4.4 Static content cards (not links)

| Element | Hover | Notes |
| --- | --- | --- |
| `.cs-panel` (problem) | none | |
| `.cs-principle` | lifts 4 px, rose border 42 % | Not interactive |
| `.cs-finding`, `.cs-objective`, `.cs-sprint`, `.cs-outcome`, `.cs-phase` | lifts 4 px, rose border 36 % | Not interactive; shared rule |
| `.cs-step`, `.cs-decision`, `.cs-metric`, `.cs-validation` | none | |
| `.about-principle` | **broken**: border changes, lift never happens (verified; the motion wrapper writes `transform: none` inline and wins over the CSS hover) | Not interactive |
| `.about-edu` | lifts 6 px + bigger shadow | Not interactive |
| `.about-job` | none | Open row, hairlines only |

Five different hover behaviours on cards that do nothing when clicked. A lift is an affordance that says "I'm clickable"; on static content it teaches visitors to click things that don't respond.

### 4.5 In-page controls (case study only)

| Element | Where | Default | Hover | Focus-visible | Active / selected | Semantics |
| --- | --- | --- | --- | --- | --- | --- |
| Screen chip | `.cs-device-steps button` | pill, 12 px, 60 % cream, blur | ✗ | 2 px rose outline | peach text, peach border | `aria-current="step"` on the `li` ✓ |
| Walkthrough step | `.cs-walk__step button` | transparent, 14 px radius | 2.5 % wash | 2 px rose outline | plum wash, rose border, number at full opacity | `aria-expanded` ✓, body `hidden` ✓ |
| Annotations switch | `.cs-walk__toggle` | pill with track + thumb | cream text, peach border | 2 px rose outline | rose track, thumb slides | `role="switch"` + `aria-checked` ✓ |
| Prototype iframe | `.cs-proto__iframe` | lazy, titled | — | ≈ | — | ✓ |

These three are well built. The only inconsistency is that their focus ring (2 px rose outline) differs from the pill CTAs (2 px rose/70 Tailwind ring) and the project card (3 px rose/45 shadow ring).

### 4.6 Labels and small type

| Class | Size | Case | Tracking | Colour | Verdict |
| --- | --- | --- | --- | --- | --- |
| `.cs-eyebrow` | 12 | none | 0.04 em | peach | **Canonical "Label"** |
| `.pill` | 12 (11 tablet, 10 phone) | none | 0.04 em | peach | identical to Label |
| `.cs-meta__item dt` | 12 | none | 0.04 em | peach | identical |
| `.cs-media__eyebrow` | 12 | none | 0.04 em | peach | identical |
| `.cs-proto__eyebrow` | 12 | none | 0.04 em | peach | identical |
| `.cs-phase__name` | 12 | none | 0.04 em | peach | identical |
| `.about-job__company` | 12 | none | 0.04 em | peach | identical |
| `.about-edu__credential` | 12 | none | 0.04 em | peach | identical |
| `.quick-link__category` | 12 | none | 0.04 em | peach | identical |
| `.eyebrow` | 12 (10 phone) | upper | 0.17 em | `#e78f7e` | **Canonical "Eyebrow"**, used once (coming-soon) |
| `.project-category` | micro | upper | 0.17 em | `#e98475` | unused |
| `.cs-objective__label` | micro | upper | 0.16 em | `#e98c7a` | Eyebrow in another hex |
| `.cs-phase__feedback span` | micro | upper | 0.14 em | `#e98c7a` | Eyebrow in another tracking |
| `.cs-phase__tag` | micro | upper | 0.14 em | `#b9aead` | **Canonical "Tag"** (muted uppercase) |
| `.about-job__period` | 12 | upper | 0.16 em | `#b9aead` | Tag |
| `.quick-link__soon` | 11 | upper | 0.14 em | `#b9aead` + outline | Tag, with a border |
| `.desktop-nav`, `.mobile-nav-menu a` | 11 | upper | 0.18 em | `#efe1d4` | Nav; the `--tracking-nav` token (0.16 em) exists but is not used |

Three roles are enough: **Label** (peach, mixed case), **Eyebrow** (peach, uppercase, wide), **Tag** (muted, uppercase, wide). Nine classes collapse into the first; four into the second; three into the third.

### 4.7 Headings and text roles

| Role | Token | Used by | Off-scale strays |
| --- | --- | --- | --- |
| Display | `--text-display` 48→96 | home `h1` | |
| Title | `--text-title` 40→64 | `.cs-title`, `.footer h2`, about `h1` | |
| Heading | `--text-heading` 30→44 | `.cs-h2`, `.project-copy h3` | |
| Pull | `--text-pull` 24→34 | `.cs-lede`, `.cs-pivot p` | `.cs-validation__line` 21→28, `.cs-objective p` 23 |
| Subheading | `--text-subheading` 20→24 | card `h3` ×7, kickers, `.quick-link__title`, `.about-principle` | `.cs-walk__title` 19 |
| Lead | `--text-lead` 18→20 | `.hero-body`, `.cs-summary`, `.cs-section__lead`, `.cs-learnings p`, `.about-edu__detail` | |
| Body | `--text-body` 16 | card `p` ×8, lists | `.cs-walk__body p` 15, `.cs-walk__body .cs-rich-list` 15, `.cs-placeholder__note` 15 |
| Small | `--text-small` 14 | captions, `.cs-meta dd`, `.cs-metric__label`, `.cs-phase__feedback` | `.cs-finding .cs-rich-list` 14 (hard-coded), `.about-summary` 14 (unused) |
| Label | `--text-label` 12 | `.pill` | nine labels hard-code `12px` instead of the token |
| Micro | `--text-micro` 11 | tags, nav, colophon | `.monogram` 13, `.cs-device-steps button` 12 |
| Numeral | none | `.cs-principle__num` 46, `.cs-decision__num` 46, `.cs-step__index` 30, `.cs-learnings span` 26, `.cs-walk__num` 22, `.quick-link__index` 22, `.about-edu__year` 22, `.cs-metric__value` 44→68 | needs a token |

Text colours: body copy is set in **11 different near-identical greys** (`#c4b9b4`, `#c8bdb8`, `#cabfba`, `#cfc4bf`, `#d1c6c1`, `#d1c6c2`, `#d3c8c3`, `#d8cdc8`, `#ddd2cd`, `#ded4cf`, `#e4d9d3`) and headings in 6 (`#eadfd8`, `#eddfd8`, `#ede2d9`, `#f0e0d7`, `#f2e2d9`, `#f5e7de`). None is distinguishable from its neighbour at 16 px.

### 4.8 Surfaces, rules, media

| Element | Radius | Fill | Border | Shadow | Verdict |
| --- | --- | --- | --- | --- | --- |
| `.project-card` | 28 → 24 → 18 | white 2 % | `--line` | 24/60 | Feature card |
| `.about-principle`, `.about-edu` | 24 | white 2 % | `--line` | 24/60 | Feature card |
| `.cs-panel`, `.cs-finding`, `.cs-sprint`, `.cs-outcome`, `.cs-phase`, `.cs-walk`, `.cs-process` | 18 | white 1.5 % | `--line` | none | Content card |
| `.cs-principle`, `.cs-objective` | 18 | plum gradient | `--line` | none | Content card, tinted |
| `.cs-validation` | 22 | plum gradient | rose 28 % | none | Highlight card |
| `.cs-metrics-wrap` | 22 | plum gradient | `--line` | none | Highlight card |
| `.cs-media__frame`, `.cs-proto__frame`, `.cs-device-stage`, `.about-portrait`, `.cs-hero__art .project-art` | 16 | cream gradient or ink | `--line` | 40/80 −48 | Media plate |
| `.mobile-nav-menu` | 14 | ink 97 % | `--line` | 24/60 | Popover |
| `.cs-walk__step button` | 14 | | | | Control |
| Inner image radii | 8, 10, 11, 12, 15 | | | | one inner radius |

Section rules: `.section-kicker i` is a flat `--line`; `.cs-kicker i` is a rose-to-transparent gradient. Gaps differ (22 vs 28 px) and bottom margins differ (48 vs 36 px). Same job.

Decorative: `.grain` (fixed film grain), `.hero-light`, `.footer-light` (drifting radial lights), `.cs-device-stage::before` (scrim). All fine.

### 4.9 Motion

| Mechanism | Where | Duration / ease |
| --- | --- | --- |
| Page fade-up on route change | `app/template.tsx` | 0.5 s, `0.22,1,0.36,1` |
| `Reveal` (section fade-up, once) | every section | 0.7 s, same ease |
| `StaggerGroup` / `StaggerItem` | card grid, about principles | 0.7 s, 90 ms stagger |
| `SplitHeadline` (word rise + unblur) | every `h1` | 0.6 s total |
| Hover transitions | cards, pills, arrows | 0.3–0.7 s, `0.22,1,0.36,1` **and** `0.16,1,0.3,1` **and** `ease` |
| Device crossfade | `.cs-iphone__shot` | 0.7 / 0.9 s, `0.16,1,0.3,1` |
| Lights drift | `vp-drift`, `vp-drift-soft` | 22 / 26 s loops |
| Mobile menu | `mobile-nav-in` | 0.2 s |
| Pin in | `cs-pin-in` | 0.5 s |
| Reduced motion | CSS zeroes every transition and animation; `MotionConfig reducedMotion="user"` keeps opacity fades; device loop and walkthrough stop auto-advancing | ✓ well handled |

One robustness note from the browser pass: every section below the fold ships with `opacity: 0` inline and only becomes visible when JavaScript runs and the section scrolls into view. A full-page capture of the home page is a 1,100 px blank gap between the kicker and the footer. Search and link-preview crawlers that execute JS are fine; anything that doesn't (print, reader modes, no-JS) sees empty pages.

### 4.10 Forms and inputs
None. Contact is two links. The only `<button>` elements are the mobile menu toggle and the three case-study controls above.

---

## 5. Decision log

### A. Remove

| # | Item | Why | Action |
| --- | --- | --- | --- |
| A1 | `components/ui/button.tsx` and its dependencies (`@base-ui/react`, `class-variance-authority`, `shadcn`, `lucide-react`, `tw-animate-css`) | Never imported. Every real button on the site is hand-styled. Keeping an unused design system next to the real one is the main source of confusion in this codebase. | Delete the file, drop the five packages, remove `@import 'tw-animate-css'` and `@import 'shadcn/tailwind.css'`, delete `components.json`. |
| A2 | shadcn theme tokens: the `@theme inline` colour/radius/sidebar/chart block, `:root` oklch tokens, `.dark`, the `prefers-color-scheme` override, `@layer base { * { @apply border-border outline-ring/50 } }` (the shadcn part of `@theme inline`, lines 23–63, and lines 65–175) | Dark-only site; `.dark` is never applied; `--muted` is declared twice with different meanings (a surface in shadcn, a text colour in the site tokens); `color-scheme: light` on `:root` contradicts `viewport.colorScheme = 'dark'`; the `outline-ring/50` rule is what paints the weak grey focus ring on nav links. | Delete. Set `color-scheme: dark` on `:root`. |
| A3 | Duplicate colour tokens: `--color-ink`, `--color-plum`, `--color-cream`, `--color-muted-warm`, `--color-rose`, `--color-peach` in `@theme` **and** `--ink`, `--ink-2`, `--cream`, `--muted`, `--rose`, `--peach` in `:root` | Two names for every colour. `--color-plum` and `--ink-2` are different values (`#18101d` vs `#130c17`) for the same idea and neither is used. | Keep one set in `@theme` (so Tailwind utilities like `text-cream` keep working) and alias nothing. |
| A4 | Unused classes `.about`, `.about-summary`, `.short-rule`, `.project-category` | No component references them. | Delete. |
| A5 | Drawn art variants `project-art--cashier` and `project-art--system` (and their `.mini-*`, `.type-sample`, `.swatches`, `.system-*` rules, ~120 lines) | Every card now has a photographic cover. The Cashier hero uses the device loop; Design System has no case study. These two illustrations can never render. `mobile` and `imaging` still draw the ePRO and DeID heroes. | Delete the two variants and their markup in `ProjectArt.tsx`. Revisit `mobile` and `imaging` once those heroes get real media. |
| A6 | Content blocks `objectives`, `sprints`, `pivot` in `lib/projects.ts` plus `.cs-objectives`, `.cs-objective*`, `.cs-sprints`, `.cs-sprint`, `.cs-pivot` CSS and the matching JSX in `CaseStudy.tsx` | No project uses them. They carry their own one-off label styles. | Delete. Re-add from the design system if a future study needs them. |
| A7 | `app/coming-soon/page.tsx` | Orphan route; nothing links to it; it renders without header or footer. | Delete. `.eyebrow` then has no remaining user; fold it into the Eyebrow role instead of deleting the role. |
| A8 | `public/placeholder-logo.png`, `placeholder-logo.svg`, `placeholder-user.jpg`, `placeholder.jpg` | v0 scaffolding, unreferenced. `placeholder.svg` is still the `CaseStudyMedia` fallback and stays. | Delete four files. |
| A9 | 860 px breakpoint (About page only) | Third breakpoint for one page. | Move those rules to 1024 or 640. |
| A10 | Hover lift on static cards (`.cs-principle`, `.cs-finding`, `.cs-outcome`, `.cs-phase`, `.about-principle`, `.about-edu`; `.cs-sprint`, `.cs-objective` go with A6) | A lift says "clickable". These cards are not. The About version is also broken. | Remove the transform and border-colour hover. Static cards get no hover state. Lift stays on the project card and is added to the quick-link row (see C3). |

### B. Merge

| # | Items | Into | Notes |
| --- | --- | --- | --- |
| B1 | 4 copies of the pill CTA class string (`ArrowLink.tsx`, `SiteFooter.tsx`, `CaseStudy.tsx`, `about/page.tsx`) | One `Button` component (`components/Button.tsx`) with `direction: 'forward' \| 'back'` and `external` props | Arrow glyph and its hover travel live inside the component. Replaces `ArrowLink`. |
| B2 | 9 peach label classes (§4.6) | `.label` | `.pill` keeps its wrapping list but uses `.label` for type. |
| B3 | `.eyebrow`, `.cs-objective__label`, `.cs-phase__feedback span` | `.eyebrow` | One hex, one tracking (0.16 em, the existing unused `--tracking-nav` token, renamed `--tracking-caps`). |
| B4 | `.cs-phase__tag`, `.about-job__period`, `.quick-link__soon`, `.project-card__cta--soon` | `.tag` (+ `.tag--outlined` for the quick-link case) | "Coming soon" gets one treatment on cards and rows: outlined tag, muted text. |
| B5 | `.section-kicker` and `.cs-kicker` | `.kicker` | Keep the flat hairline from `.section-kicker` (the gradient rule only exists on case studies and reads as a different section language). Gap 24 px, margin-bottom 40 px. |
| B6 | 7 card `h3` rules and 8 card `p` rules | `.card h3`, `.card p` | Cards become `.card` + a modifier; the children inherit. |
| B7 | 4 bullet-dot rules (`.cs-check-list`, `.cs-rich-list`, `.cs-outcome li`, `.about-job__points li`) | `.list` | One rose dot, one indent (22 px), one gap. |
| B8 | Numeral sizes 46 / 30 / 26 / 22 | `--text-numeral-lg` (46 → 40 on phone) and `--text-numeral` (22) | `.cs-step__index` and `.cs-learnings span` move to 22; the two 46 px numerals share `--text-numeral-lg`. The metric value keeps its own clamp as the one display-size numeral. |
| B9 | 11 body greys and 6 heading tints | `--text-strong` `#f2e2d9`, `--text` `#d8cdc8`, `--text-muted` `#b9aead`, `--text-faint` `#897e80` | Plus `--cream` for the brightest headings. Four steps is as many as the eye can separate on `--ink`. |
| B10 | 23 radii | `--radius-sm` 8, `--radius-md` 16, `--radius-lg` 24, `--radius-pill` 999, and the device `cqw` set | Content cards and media plates: 16. Feature cards and the popover: 24. Inner images: 8. 18, 22, 28, 14, 12, 11, 10, 15 all go. |
| B11 | Two arrival easings | `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` | The `0.16,1,0.3,1` curve is imperceptibly different. Durations snap to `--dur-fast` 200 ms, `--dur-base` 400 ms, `--dur-slow` 700 ms. |
| B12 | 4 focus-ring styles | `--focus-ring: 0 0 0 2px var(--ink), 0 0 0 4px var(--rose)` applied via a single `:focus-visible` rule for `a, button, [tabindex]` | Two-layer ring reads on any surface (card, plate, ink). Replaces the project card's 3 px shadow, the Tailwind `ring-2`, the 2 px outline, and the grey browser default. |
| B13 | `.cs-media__eyebrow` / `.cs-proto__eyebrow` and `.cs-media__caption` / `.cs-proto__caption` | `.media__label`, `.media__caption` | Prototype is a media plate with an iframe in it. |
| B14 | Kicker copy "Featured projects" / "Selected work" / "Explore more work" (and the unused default "Featured work") | "Selected work" on home and About; "More work" on case studies | Same list, same source of truth, one name. |
| B15 | CTA copy "Back to Home" / "Back to All Work" / "Back to all work" | Sentence case everywhere: "Back to home", "Back to all work" | |

### C. Fix

| # | Item | Problem | Fix |
| --- | --- | --- | --- |
| C1 | Stacked hero meta (`CaseStudy.tsx`, `heroLayout: 'stacked'`) | `<dt>`/`<dd>` rendered inside `<div>`s with no `<dl>` ancestor (verified in DOM: `DIV > DIV`). Invalid HTML; screen readers lose the term/definition pairing. | Add `dl` to the `Reveal` tag map and render `<Reveal as="dl">`. |
| C2 | About principle hover | Lift never fires because the motion wrapper owns `transform`. | Resolved by A10 (no hover on static cards). If any motion-wrapped element ever needs a hover lift, use `translate`, as `.project-card` already does. |
| C3 | Quick-link hover | Animating `padding-left` reflows the row and shifts the text. | Use `translate: 12px 0` on the inner content; add the focus ring; add the 6 % wash on focus as well as hover. |
| C4 | Back-to-top link | 18×33 px target. | 44×44 inline-flex, centred glyph, hover rose, focus ring. |
| C5 | Nav links, monogram, mobile menu button | No usable focus state; browser default 1 px grey at 50 % on ink. | Covered by B12. Add `cursor: pointer` to `.mobile-menu`. |
| C6 | Desktop nav | No current-page state. | `aria-current="page"` on the matching link, rendered as cream at full opacity with a 1 px rose underline offset 6 px. Hash links (`/#work`, `/#contact`) never get it. |
| C7 | Skip link | None. | Add "Skip to content" as the first focusable element, visually hidden until focused, targeting `<main id="main">`. |
| C8 | Email CTA | Gmail compose URL only works for people signed into Gmail on the web; on phones and for everyone else it lands on a login wall. | `mailto:` with the same subject. Keep the LinkedIn link as is. |
| C9 | Phone card grid (<640 px) | Two columns at 360 px give 155 px cards: titles wrap to five lines and the two category labels run together ("Mobile UI 0-1 Clinical ePRO") because the 6 px gap reads as a space. | One column below 640 px; cards keep the 3:2 art. Labels keep their 10 px gap and get a `·` separator in the quick-link row where they are joined into one line. |
| C10 | Case-study sections hard-code labels and defaults ("Prototyping in sprints" is used for both `process` and `sprints`; "Meet DribbleCollect", "Four voices, one fragile chain of data", "Every objective, delivered." are ePRO copy living in the shared component) | A second project rendering `process` would be mislabelled; a project that omits a heading silently inherits another project's sentence. | Make `heading` required on `solution`, `discovery`, `outcomes`; move the kickers into data with sensible neutral defaults ("The solution", "The research", "The outcome", "Process"). |
| C11 | Off-scale sizes (§4.7) | Fourteen one-off font sizes. | Snap to the nearest token: 19 → subheading, 15 → body, 23 and 21→28 → pull, 13 → label, 14 hard-codes → `--text-small`, 12 hard-codes → `--text-label`. |
| C12 | `images.unoptimized: true` in `next.config.mjs` with `sizes` attributes everywhere | The `sizes` hints do nothing while optimisation is off; 2400 px media plates ship at full size. | Out of the design system's scope, but worth turning on once the host supports it. |

### D. Keep

| Item | Why it earns its place |
| --- | --- |
| Project card hover/focus spec (`translate` lift, rose border, art scale, CTA slide-in, touch fallback) | Complete, accessible, and already solves the transform conflict. It is the reference interaction for the whole site. |
| Space tokens (`--space-section`, `--space-inner`, `--space-top`) stepping down at 1024 and 640 | Exactly the vertical rhythm a system needs. |
| Type-scale tokens | Right steps, right clamps. The problem is adherence, not the scale. |
| `Reveal`, `StaggerGroup`, `SplitHeadline`, page template fade, `MotionConfig reducedMotion="user"` | One arrival curve, one authored entrance, reduced motion handled centrally. |
| Device loop, walkthrough, annotations switch, prototype plate | Properly labelled controls with keyboard support. Only their focus ring changes. |
| Film grain, hero and footer lights | The site's texture. Already frozen under reduced motion. |
| Mobile menu behaviour (Escape, outside click, `aria-expanded`, `aria-controls`, `hidden`) | Correct. |
| Media plate / bleed / grid / caption model | Flexible, data-driven, consistent. Keep as the one way to show an artifact. |
| `RichText` (paragraph or `- ` bullet) | Minimal and sufficient. |
| Hairline `--line` at 14 % cream | Used 44 times. It is the site's structural line. |

---

## 6. Order of work

1. Tokens and base: A2, A3, B9, B10, B11, B12, C7 (one PR, no visual change beyond focus rings and a few greys).
2. Dead code: A1, A4, A5, A6, A7, A8 (one PR, no visual change).
3. Type roles and labels: B2, B3, B4, B6, B7, B8, C11 (one PR, subtle visual change).
4. Components: B1, B5, B13, C1, C3, C4, C5, C6, C8 (one PR, visible but small).
5. Layout and content: A9, A10, C9, C10, B14, B15 (one PR, visible).

Per `CLAUDE.md`, any copy change in step 5 that touches a hero, heading, or description updates the matching route `metadata` in the same commit.
