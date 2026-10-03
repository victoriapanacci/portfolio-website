---
version: 1
slug: "components-projectart-tsx"
primary_target: "components/ProjectArt.tsx"
related_targets: ["app/page.tsx","components/ProjectShowcase.tsx"]
---

# Featured project tiles (home page)

Scope: the art inside each featured-project card on the home page (`components/ProjectArt.tsx`), rendered again in the ePRO and DeID case-study heroes. Visitor mode: Experience. Audience: hiring managers, design leads, recruiters with little or no context. Action: open a case study.

## Direction contract

THESIS: Each tile is one piece of real evidence from the project, chosen for the tension the case study resolves, and staged like an archive item rather than a product shot. It refuses the category default (a device mockup on a tinted field) and the opposite default (a typographic title card).

OWN-WORLD: The site's incumbent world, unchanged: near-black plum grounds tinted per tile, cream type, rose accent only where it carries meaning, serif display with Inter for labels. Flat fields, hairline rules, cream label strips like a typed archive label. No gradients, glows, glass, or faked materials.

STORY: A reader sees four different kinds of evidence (a redacted film, a patient's words, a pending withdrawal, an in-progress token sheet), understands each project's stakes without domain knowledge, and clicks to find out how it was resolved.

FIRST VIEWPORT: Two-column grid of 3:2 tiles. DeID: the MRI film split by one vertical seam, original left, redacted right, rose-outlined black bars, outlined "Human reviewed" tag. ePRO: a five-stage journey ruler with stage four marked, the patient's quoted line set large in serif, source and mood beneath. Cashier: the real pending-withdrawal status block bleeding off the right edge, a cream label strip across the bottom with project, status, handoff. Design systems: a type ramp and five named tokens, cream label strip reading in progress. The primary action stays the card's "View case study" link.

FORM: User-pinned mix of three dealt structures (before/after, field notes, case file), assigned per tile by which one the material can carry truthfully. Seed key 9f9586e6, surface scope, experience mode, degraded roll (no challengers).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
