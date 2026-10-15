# Design system

The standard for every page, component, and style on victoriapanacci.com. It is the output of `docs/ux-audit.md`; where the two disagree, this document wins. The implementation lives in `lib/tokens.json` (tokens), `app/globals.css` (roles, components) and `components/` (behaviour).

Rules are written as "always" and "never" on purpose. Add a variant only when an existing one cannot do the job, and record why in the audit's decision log.

---

## 1. Principles

1. **Warm ink, one accent.** The site is dark only. Every surface is a tint of ink; every emphasis is rose or peach. No third accent, no light theme.
2. **Serif speaks, sans works.** Headlines, numerals and pull quotes are serif at weight 400. Everything functional (body, labels, nav, buttons) is Inter.
3. **Hairlines, not boxes.** Structure comes from 1 px rules at 14 % cream. Fills stay under 3 % white. Shadows only on things that float (feature cards, media plates, the popover).
4. **Affordance is honest.** Only links and buttons respond to hover. Static content never lifts, glows, or changes border on hover.
5. **One signal per state.** Hover is rose. Selected or current is peach. Nothing is underlined except a link inside prose.
6. **One arrival, one curve.** Content fades up once with a single ease-out. Nothing loops except the two drifting lights, and they stop under reduced motion.
7. **Tokens or nothing.** No raw hex, px radius, or cubic-bezier in a component rule. If a value is not a token, it is a mistake.

---

## 2. Tokens

All tokens are declared once in `lib/tokens.json`. `pnpm tokens` (run automatically before `dev` and `build`) writes them to `app/tokens.css` as `:root` custom properties, and components use them as plain CSS variables (`var(--rose)`). Edit the JSON, never the generated file. Only the two font families go through Tailwind's `@theme`; no component uses Tailwind utility classes, so nothing else needs to.

### 2.1 Colour

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0c0810` | Page background, focus-ring inner layer, text on rose |
| `--ink-2` | `#100913` | `main` gradient end, popover fill, card art fade |
| `--plum` | `rgba(74, 28, 47, 0.28)` | Tinted card and highlight gradients (start colour) |
| `--cream` | `#f2e8dc` | Brightest text: display, title, numerals, kicker |
| `--text-strong` | `#f2e2d9` | Card headings, quick-link titles, pull quotes |
| `--text` | `#d8cdc8` | Body copy, lead paragraphs, meta values |
| `--text-muted` | `#b9aead` | Captions, tags, "Coming soon", notes |
| `--text-faint` | `#897e80` | Colophon only |
| `--rose` | `#d97b72` | Emphasis in headings (`em`), arrows, bullets, hover borders, switch track, focus ring, selection |
| `--peach` | `#e9a27d` | Labels, eyebrows, selected chip |
| `--line` | `rgba(242, 232, 220, 0.14)` | Every hairline rule and border |
| `--fill` | `rgba(255, 255, 255, 0.02)` | Feature card fill |
| `--fill-soft` | `rgba(255, 255, 255, 0.015)` | Content card and bleed-plate fill |
| `--plate` | `linear-gradient(160deg, #f6f2ec, #e9e1d6)` | Light media plate behind screenshots |

Derived states use `color-mix(in srgb, var(--rose) N%, transparent)`, never a new hex:

| State | Formula |
| --- | --- |
| CTA fill | rose 10 % |
| CTA fill, hover | rose 20 % |
| CTA border | rose 40 % |
| Row wash, hover | rose 6 % |
| Highlight border | rose 28 % |
| Selection | rose 35 % |

Never: a new hex in a component rule, a grey that is not one of the four text steps, a light-mode token.

### 2.2 Typography

Families: `--font-sans` (Inter, optical sizing on) and `--font-serif` (Georgia stack). Weights: sans 400 and 600; serif 400 only. Inter 500 (`font-medium`) is allowed on buttons only.

| Role | Token | Size | Family | Line | Tracking | Used for |
| --- | --- | --- | --- | --- | --- | --- |
| Display | `--text-display` | 48→96 | serif | 0.95 | −0.035 em | Home `h1` only |
| Title | `--text-title` | 40→64 | serif | 1 | −0.03 em | Page `h1` (About, case study), footer statement |
| Heading | `--text-heading` | 30→44 | serif | 1.05 | −0.025 em | Section `h2`, project card title |
| Pull | `--text-pull` | 24→34 | serif | 1.4 | −0.015 em | Lede, pivot, validation lines |
| Subheading | `--text-subheading` | 20→24 | serif | 1.2 | −0.02 em | Card `h3`, kicker, quick-link title, principle text, timeline role (sans) |
| Numeral, large | `--text-numeral-lg` | 46 (40 on phone) | serif | 1 | −0.03 em | Principle and decision numbers |
| Numeral | `--text-numeral` | 22 | serif | 1 | −0.02 em | Step, learning, walkthrough, quick-link index, education year |
| Metric | `--text-metric` | 44→68 | serif | 1 | −0.03 em | Metric band value only |
| Lead | `--text-lead` | 18→20 | sans | 1.6 | 0 | Hero body, summary, section lead, learnings, education detail |
| Body | `--text-body` | 16 | sans | 1.65 | 0 | Card copy, lists, walkthrough body |
| Small | `--text-small` | 14 | sans | 1.6 | 0 | Captions, meta values, metric labels, feedback, button text |
| Label | `--text-label` | 12 | sans 600 | 1 | 0.04 em | Label role |
| Micro | `--text-micro` | 11 | sans 600 | 1 | 0.16 em | Eyebrow, Tag, Nav, colophon (colophon at 400) |

Tracking tokens: `--tracking-display` −0.035 em, `--tracking-tight` −0.02 em, `--tracking-caps` 0.16 em (replaces `--tracking-nav`; the only uppercase tracking on the site).

Rules:
- `h1`, `h2`, `h3` are serif 400 with `text-wrap: balance`; `p` and `li` use `text-wrap: pretty`.
- `em` inside `h1` or `h2` is rose, not italic. Inside `.cs-h2` it is cream (the only exception, kept for case-study headings where rose would fight the kicker).
- Measure: lead and body paragraphs max out at 640 px (≈ 62ch). Headings max out at 780 px.
- Never set `font-size` in px inside a component rule. Use a role token.

### 2.3 Spacing

| Token | Desktop | ≤1024 | ≤640 | Use |
| --- | --- | --- | --- | --- |
| `--space-section` | 160 | 120 | 88 | Between undivided sections (hero → work) |
| `--space-inner` | 104 | 80 | 56 | Either side of a divider rule; case-study section top padding |
| `--space-top` | 88 | 64 | 48 | Header → first content |
| `--gap-lg` | 48 | 28 | 18 | Card grid gap, two-column gap |
| `--gap-md` | 24 | 20 | 16 | Gap between cards in a dense grid, kicker gap |
| `--gap-sm` | 12 | 12 | 10 | Button row gap, label row gap |
| `--pad-card` | 32 | 24 | 20 | Card padding |

Shell: `width: min(1200px, 100% − 96px)` → `min(900px, 100% − 64px)` → `100% − 32px`.

### 2.4 Radius

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | 8 px | Images inside a plate, walkthrough step button, mobile menu link |
| `--radius-md` | 16 px | Content cards, highlight cards, media plates, device stage, portrait |
| `--radius-lg` | 24 px | Feature cards (project, About principle, education), popover |
| `--radius-pill` | 999 px | Buttons, chips, tags, switch |
| device set | `cqw` values in `.cs-iphone*` | The drawn iPhone only |

Never: 10, 11, 12, 14, 15, 18, 22, 28 px.

### 2.5 Elevation

| Token | Value | Use |
| --- | --- | --- |
| `--shadow-card` | `0 24px 60px rgba(6, 3, 10, 0.45)` | Feature card, popover |
| `--shadow-card-hover` | `0 34px 80px rgba(6, 3, 10, 0.65)` | Feature card hover |
| `--shadow-plate` | `0 40px 80px −48px rgba(0, 0, 0, 0.75)` | Media plate, device stage, portrait |

Content cards have no shadow.

### 2.6 Motion

| Token | Value |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-drift` | `cubic-bezier(0.45, 0, 0.55, 1)` (lights only) |
| `--dur-fast` | 200 ms (colour, opacity, arrows, menu) |
| `--dur-base` | 400 ms (lift, border, wash) |
| `--dur-slow` | 700 ms (reveal, art scale, crossfade) |

The same `ease` constant is exported from `components/motion/Reveal.tsx` for the motion library.

### 2.7 Focus

`--focus-ring: 0 0 0 2px var(--ink), 0 0 0 4px var(--rose)`

Applied once, globally:

```css
:where(a, button, [tabindex]):focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
```

Elements that already carry a shadow (feature card) append `var(--focus-ring)` to their shadow list rather than replacing it. No component defines its own focus style.

### 2.8 Breakpoints

Two: `max-width: 1024px` (tablet) and `max-width: 640px` (phone). Hover-capable detection via `@media (hover: none)`. Nothing else.

---

## 3. Text roles (utility classes)

| Class | Spec |
| --- | --- |
| `.label` | Label size, sans 600, peach, mixed case, 0.04 em. Meta terms, media labels, category tags, company, credential, phase name. |
| `.eyebrow` | Micro size, sans 600, peach, uppercase, `--tracking-caps`. Above a hero title or as a small section flag ("Feedback loop"). |
| `.tag` | Micro size, sans 600, muted, uppercase, `--tracking-caps`. Dates, status ("Coming soon"), phase tag. `.tag--outlined` adds a `--line` border and 5/10 px padding in the pill radius. |
| `.kicker` | Subheading serif, cream, with a trailing hairline `<i>`; gap `--gap-md`; margin-bottom 40 px. One per section. |
| `.lede` | Pull serif, `--text-strong`, max 900 px. |
| `.lead` | Lead sans, `--text`, max 640 px. |
| `.caption` | Small sans, muted, max 760 px. |
| `.list` | Bulleted list: 6 px rose dot at 2 px left, 22 px indent, 8 px row gap. Replaces every bespoke bullet. |
| `.numeral`, `.numeral--lg` | Serif index numbers, cream. |

---

## 4. Components

Every component lists its anatomy, variants, and the full state matrix. A state not listed does not exist for that component.

### 4.1 Button (`components/Button.tsx`)

The site's only button and only link style with a container. Renders `<a>` (internal, external) or `<button>`.

Anatomy: pill container · text (Small, Inter 500, cream) · arrow glyph (rose, 300 weight, 16 px).

Props: `direction: 'forward' | 'back' | 'up'` (arrow after the text, before it, or an up arrow after it), `external` (adds `target="_blank" rel="noopener noreferrer"`), `href` or `onClick`.

| State | Fill | Border | Text | Arrow |
| --- | --- | --- | --- | --- |
| Default | rose 10 % | rose 40 % | cream | at rest |
| Hover | rose 20 % | rose 100 % | cream | +4 px forward, −4 px back, −3 px up, `--dur-fast` |
| Focus-visible | as default | as default | | focus ring |
| Active | rose 24 % | rose 100 % | | arrow stays moved |
| Disabled | not used. There is nothing on the site to disable. |

Sizing: `min-height: 44px`, padding 12/24 px, gap 12 px. On phones, button rows stack vertically and centre.

Uses: footer CTAs, back links, back to top, placeholder "Back to all work". Never: inside a card, inside a paragraph, more than two in a row. There is no icon-only variant: every standalone action carries its words.

Copy: sentence case, verb first ("Connect on LinkedIn", "Send an email", "Back to all work").

### 4.2 Text link

Inline links in prose only. Cream text, 1 px rose underline, 0.2 em offset. Hover: rose text. External links carry `rel="noopener noreferrer"`; no icon.

### 4.3 Arrows inside links

The card's "Case study →" and the quick-link row's trailing → are not buttons. The whole card or row is the link; the arrow is its affordance. Both are 16 px, weight 300, rose, and travel 4–6 px on hover. Never wrap one in a pill. The mobile menu button is the only icon-only control on the site, because a header menu toggle is a convention readers already know.

### 4.4 Site header

Anatomy: monogram (Label size, 600, peach) · desktop nav (`<nav aria-label="Primary">`, three links, Micro uppercase, cream at 95 %, 48 px gap, 44 px tall) · mobile menu button (44×44, three 24×1 px cream hairlines; morphs to × when open) · mobile popover (`--radius-lg`, ink-2 at 97 %, `--line` border, `--shadow-card`, 6 px blur).

| Element | Hover | Focus-visible | Current |
| --- | --- | --- | --- |
| Monogram | rose | ring | — |
| Nav link | rose | ring | peach (`aria-current="page"`; only `/about` can be current) |
| Menu button | hairlines rose | ring | `aria-expanded` |
| Popover link | rose + cream 8 % wash | ring | as nav |

Behaviour: Escape closes, outside click closes, choosing a link closes. The header is not sticky.

A "Skip to content" link precedes the monogram in DOM order, visually hidden until focused, styled as a Button.

### 4.5 Feature card (project card)

The reference interaction for the site. The whole card is one `<a>`.

Anatomy: 3:2 cover art (bleeds to the card edge, 42 % bottom fade into the card) · title (Heading serif, max 95 %) · category labels (`.label` in a wrapping list, 10 px gap) · CTA line ("Case study →" Small 600, or `.tag` "Coming soon").

Surface: `--radius-lg`, `--fill`, `--line` border, `--shadow-card`, `--pad-card`.

| State | Card | Art | CTA |
| --- | --- | --- | --- |
| Default | at rest | at rest | hidden (opacity 0, −10 px) |
| Hover | `translate: 0 −4px`, rose border, `--shadow-card-hover`, `--dur-base` | scale 1.03, `--dur-slow` | slides in, arrow +5 px |
| Focus-visible | as hover + focus ring | as hover | as hover |
| Touch (`hover: none`) | at rest | at rest | always visible |
| Coming soon | as above | as above | `.tag` "Coming soon", always visible, no arrow |

Lift uses the `translate` property, never `transform`, so the motion wrapper that owns `transform` cannot cancel it.

Grid: 2 columns at ≥641 px (an odd last card spans both columns on tablet), 1 column on phones, rows stretch to equal height, gap `--gap-lg`.

Also uses this surface, without the interactive states: About principle cards, education cards.

### 4.6 Content card

Static. Never a link, never a hover state.

Surface: `--radius-md`, `--fill-soft`, `--line` border, no shadow, `--pad-card`. Children: `h3` (Subheading serif, `--text-strong`, 14 px below), `p` (Body, `--text`), `.list`.

Variants:
- `.card--tinted`: `--plum` → `--fill-soft` gradient at 160°, plus a 3 px rose-to-transparent top rule at 55 %. For principle cards.
- `.card--highlight`: `--radius-md`, rose 28 % border, `--plum` gradient at 145°. For the validation panel and the metrics band.
- `.card--grid`: a bordered container whose children are divided by internal hairlines (process steps, metrics). Children have no border of their own.

Uses: problem panels, findings, outcomes, launch phases, sprint-style blocks, walkthrough container.

### 4.7 List row (quick link)

A full-width link row between hairlines.

Anatomy: `.numeral` index · title (Subheading serif, `--text-strong`) · category (`.label`, segments joined with ` · `) · optional `.tag--outlined` "Coming soon" · arrow (rose, 16 px).

| State | Row | Content | Arrow |
| --- | --- | --- | --- |
| Default | transparent, hairline below | at rest | at rest |
| Hover | rose 6 % wash | `translate: 12px 0`, `--dur-base` | +6 px |
| Focus-visible | as hover + focus ring | as hover | as hover |

Never animate padding. Padding is 30/8 px (24/4 on phones).

Related open rows without a link: timeline entries (`.about-job`), learnings. These get hairlines and no hover.

### 4.8 Media plate

The one way to show an artifact.

Anatomy: `.media__label` (`.label`, 16 px above) · frame (`--radius-md`, `--line` border, `--shadow-plate`) · image (`--radius-sm`) · `.media__caption` (`.caption`, 20 px below).

Variants:
- `plate` (default): `--plate` light gradient, padding `clamp(16px, 3vw, 40px)`. Screens and boards.
- `bleed`: no padding, `--fill-soft`, image radius 15 px matching the frame inside its 1 px border. Wide panels and portrait phone screens (max-height 640 px, centred).
- `grid`: 2–4 plates side by side, `--gap-md`, one caption for the group.
- `prototype`: the plate variant with an `<iframe>` (lazy, titled, `allowfullscreen`), max-width 420 px, aspect from data.
- `device`: the CSS iPhone (`.cs-iphone`) on a 2:1 (4:5 on tablet) stage with a scrim, crossfading screens.
- `portrait`: 4:5 plate for the About photo.

### 4.9 Chip (screen selector)

Pill, Label size, 60 % cream on ink 55 % with 8 px blur, `--line` border.

| State | Text | Border | Fill |
| --- | --- | --- | --- |
| Default | cream 60 % | `--line` | ink 55 % |
| Hover | cream | peach 45 % | ink 55 % |
| Focus-visible | | | ring |
| Selected (`aria-current="step"`) | peach | peach 55 % | ink 80 % |

Behaviour: auto-advances on an interval; stops under reduced motion; any click selects.

### 4.10 Step (walkthrough accordion)

Button row with `.numeral` and Subheading title; body revealed with `hidden`.

| State | Fill | Border | Numeral |
| --- | --- | --- | --- |
| Default | transparent | transparent | cream 60 % |
| Hover | white 2.5 % | transparent | |
| Focus-visible | | | ring |
| Expanded (`aria-expanded="true"`) | plum 22 % | rose 35 % | cream 100 % |

Behaviour: auto-advances until the reader clicks, then stays put.

### 4.11 Switch (annotations)

`<button role="switch" aria-checked>`: pill container, 30×18 track, 14 px cream thumb.

| State | Track | Thumb | Border |
| --- | --- | --- | --- |
| Off | cream 18 % | left | `--line` |
| On | rose | +12 px | `--line` |
| Hover | | | peach 45 %, text cream |
| Focus-visible | | | ring |

### 4.12 Meta bar

`<dl>` of label/value pairs: `dt` is `.label`, `dd` is Small in `--text`. Four columns between two hairlines; two columns on tablet; one on phone. In the stacked hero it sits beside the title with a hairline above each item. Always a `<dl>`, even when wrapped in a motion element.

### 4.13 Section

`<section class="shell">` → `.kicker` → optional `h2` (Heading) → optional `.lead` → content → optional media. Padding `--space-inner` top; the last section also gets it on the bottom. Each section is one `Reveal`; elements inside it do not animate individually, except card grids, which use `StaggerGroup`.

Kicker copy is data, never hard-coded in a shared component. Defaults: "The problem", "The solution", "The research", "The outcome", "Process", "Build to launch", "What I took with me". The work list is "Selected work" on home and About, and "More work" on a case study.

### 4.14 Footer

Hairline above · drifting light · closing statement (Title serif, centred, max 780 px) · up to two Buttons · hairline · colophon (Micro 400, `--text-faint`) · "Back to top" Button (`direction="up"`). `id="contact"` lives here.

### 4.15 Decorative

Film grain (fixed, 5.5 %, soft-light, outside the page-transition wrapper). Hero light and footer light drift on 22 s / 26 s loops with `--ease-drift`, `aria-hidden`, frozen under reduced motion.

---

## 5. Motion rules

1. Route change: whole page fades up 12 px over `--dur-slow` × 0.7.
2. Section arrival: `Reveal` fades up 24 px over `--dur-slow`, once, when 15 % is in view. Grids use `StaggerGroup` with a 90 ms stagger.
3. Headline arrival: `SplitHeadline` on every `h1`; words rise 0.4 em and unblur, 60 ms apart, 0.6 s in total. The full sentence stays one accessible label.
4. Hover: colour and opacity at `--dur-fast`; lift, border and wash at `--dur-base`; art scale and crossfade at `--dur-slow`. All with `--ease-out`.
5. Reduced motion: `MotionConfig reducedMotion="user"` keeps opacity fades and drops transforms; CSS zeroes every transition and animation; loops hold on their first frame; auto-advancing controls stop.
6. Never: a loop other than the two lights, a bounce or spring, an animation longer than `--dur-slow` that is not a crossfade, animating `padding`, `margin`, `width` or `height`.

---

## 6. Accessibility rules

- Every interactive element: 44 px minimum target, visible focus ring (§2.7), a hover state that is not the only cue.
- Landmarks: `header`, `nav aria-label`, `main id="main"`, `footer`, one `h1` per page, a skip link.
- Lists are lists (`ul`/`ol`), definition pairs are `dl`, decorative glyphs are `aria-hidden`, drawn art has `role="img"` and a label, images have alt text, iframes have titles.
- Controls announce state: `aria-expanded`, `aria-current`, `aria-checked`, `aria-controls`.
- Colour is never the only signal: selected chips also change fill and border; links in prose are underlined.
- Contrast: `--text-muted` on `--ink` is the floor (≈ 9:1; `--text-faint` is ≈ 5:1). Nothing dimmer carries meaning; `--text-faint` is for the colophon only.
- Text wraps with `balance` and `pretty`; no `white-space: nowrap` on anything longer than a label.

---

## 7. Content rules

- Sentence case for buttons, kickers, labels and tags. Title case is only for proper nouns and project titles.
- Eyebrow and Tag are uppercase by CSS; write them in sentence case in the data.
- The work list is named the same way everywhere (§4.13).
- Shared components carry no project-specific defaults; every heading sentence lives in `lib/projects.ts`.
- Per `CLAUDE.md`, a change to hero copy, headings or descriptions updates the route's `metadata` in the same commit.

---

## 8. Migration map

| Today | Becomes |
| --- | --- |
| `ArrowLink`, `ctaClass` in `SiteFooter`, inline pill class strings in `CaseStudy` and `about/page` | `<Button>` |
| `.cs-eyebrow`, `.pill`, `.cs-meta__item dt`, `.cs-media__eyebrow`, `.cs-proto__eyebrow`, `.cs-phase__name`, `.about-job__company`, `.about-edu__credential`, `.quick-link__category` | `.label` |
| `.eyebrow`, `.cs-objective__label`, `.cs-phase__feedback span` | `.eyebrow` |
| `.cs-phase__tag`, `.about-job__period`, `.project-card__cta--soon` | `.tag` |
| `.quick-link__soon` | `.tag.tag--outlined` |
| `.section-kicker`, `.cs-kicker` | `.kicker` |
| `.cs-panel`, `.cs-finding`, `.cs-outcome`, `.cs-phase`, `.cs-walk` | `.card` |
| `.cs-principle` | `.card.card--tinted` |
| `.cs-validation`, `.cs-metrics-wrap` | `.card.card--highlight` |
| `.cs-process`, `.cs-metrics` | `.card.card--grid` |
| `.about-principle`, `.about-edu` | `.card.card--feature` (static) |
| `.cs-check-list`, `.cs-rich-list`, `.cs-outcome ul`, `.about-job__points` | `.list` |
| `.cs-principle__num`, `.cs-decision__num` | `.numeral.numeral--lg` |
| `.cs-step__index`, `.cs-learnings span`, `.cs-walk__num`, `.quick-link__index`, `.about-edu__year` | `.numeral` |
| `.cs-media__caption`, `.cs-proto__caption` | `.media__caption` |
| `.cs-lede`, `.cs-pivot p`, `.cs-validation__line` | `.lede` |
| `.cs-section__lead`, `.cs-summary`, `.hero-body` | `.lead` |
| 58 hex values | the 14 tokens in §2.1 |
| 23 radii | the 4 tokens in §2.4 |
| 2 easings, 8 durations | `--ease-out`, 3 duration tokens |
| 4 focus styles | `--focus-ring` |
| `components/ui/button.tsx`, shadcn tokens, `.dark`, `components.json` | removed |
| `app/coming-soon`, `.about`, `.about-summary`, `.short-rule`, `.project-category`, cashier and system drawn art, `objectives`, `sprints`, `pivot` | removed |
