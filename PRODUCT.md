# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and design leads screening a senior product designer. They skim the home page in a minute or two and decide whether to open a case study. Secondary: recruiters doing a quick credibility-and-range pass before forwarding the portfolio. Both arrive with little or no context about the projects.

## Product Purpose

A personal portfolio for Victoria Panacci, a senior product designer in Toronto. It exists to get a reader from the home page into a case study, and from a case study into a conversation. Success is a click into a case study from the featured-projects section, then a read-through.

## Positioning

Design for complex, data-heavy, regulated workflows (clinical trials, medical imaging under FDA rules, crypto payments inside a sportsbook), delivered end to end by one designer who also owns product decisions and ships production code with AI tooling. The claim: making complexity feel invisible.

## Operating Context

- Featured work lives on the home page as a grid of project cards, each linking to `/work/[slug]`.
- Case studies are long-form reads with real artifacts: screens, journey maps, wireframes, prototypes.
- The site is deployed on Vercel from this repository; the home page must read well on desktop and phone.

## Capabilities and Constraints

- Next.js 16 app router, Tailwind v4, static pages. Images are served unoptimized.
- Four featured projects: ePRO mobile rebuild, DICOM redaction (DeID), crypto cashier, and a design-systems project that is still "coming soon" with no assets.
- Card copy (titles, categories, descriptions) is not locked; nothing in the grid structure is locked. The only hard requirement is that the structure looks good on web and mobile.
- Undecided: whether the design-systems project gets a case study.

## Brand Commitments

- Name: Victoria Panacci. Voice is first person, plain, confident.
- Incumbent visual world in code: near-black plum ground, cream text, rose and peach accents, a serif display face with Inter for body. The owner likes this general vibe.
- Binding constraint from the owner: the featured-project art must read as made by a designer, not generated. Specifically ruled out: elements placed oddly, single-word colour highlights inside headlines, and the generic tells of AI-made UI (gradients, glows, glass, floating device mockups). Abstraction is welcome when it serves the hook.
- Each card must work as a hook for a reader with little or no context.

## Evidence on Hand

- ePRO: annotated Figma export of the voice-to-text questionnaire (`public/figma/epro-voice-to-text.webp`), a journey map (`public/figma/epro-journey-map.webp`), two cleaned phone-screen crops (`public/work/epro/`), and a live Figma prototype embed.
- DeID: a photograph of an MRI film series (`public/work/deid/hero-mri.png`), hand-drawn wireframes of the redaction viewer, a legacy Fusion portal screenshot, and reviewer-role flow diagrams (`public/work/deid/`).
- Cashier: polished phone screens for the withdrawal flow and before-state screens (`public/work/cashier/`), a journey map, a wallet-connected flow diagram.
- Design systems: no assets. Do not fabricate screens for it.
- No testimonials, client logos, or metrics beyond those written in the case studies.

## Product Principles

- The hook is the project's tension, not its UI. A card should raise the question the case study answers.
- Real material over illustration. Use the project's own artifacts wherever one exists.
- Restraint is the credential. A senior designer's portfolio earns trust through control, not effects.
- Legible without context. A recruiter with no domain knowledge should still grasp what each project is.
- Mobile is a first-class read, not a reflow.
