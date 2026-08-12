export type ProjectArtType = 'cashier' | 'mobile' | 'system' | 'imaging'

/** Optional custom section heading: `{lead}<em>{em}</em>{tail}`. */
export type CaseStudyHeading = { lead?: string; em: string; tail?: string }

export type CaseStudyImage = {
  src: string
  alt: string
  /** Short rose eyebrow tag shown above the frame, e.g. "User journey map". */
  eyebrow?: string
  /** Descriptive caption shown beneath the frame. */
  caption?: string
  /** 'plate' = light matted artifact (screens, boards). 'bleed' = wide framed panel. */
  variant?: 'plate' | 'bleed'
}

/** Interactive embed (e.g. a live Figma prototype) framed inside a case study. */
export type CaseStudyPrototype = {
  /** Embeddable URL, e.g. an embed.figma.com/proto/... link. */
  src: string
  /** Accessible iframe title. */
  title: string
  /** Short rose eyebrow tag shown above the frame. */
  eyebrow?: string
  /** Descriptive caption shown beneath the frame. */
  caption?: string
  /** Direct link to open the prototype in a new tab (fallback). */
  href?: string
  /** CSS aspect-ratio for the frame, e.g. "16 / 10". Defaults to "16 / 10". */
  aspect?: string
}

export type CaseStudy = {
  summary: string
  meta: { label: string; value: string }[]
  /** Optional framed artifact shown in the hero, in place of the generated art. */
  heroMedia?: CaseStudyImage
  intro: string
  problem: {
    lead: string
    points: { title: string; body: string }[]
  }
  solution: {
    /** Overrides the default "Meet DribbleCollect." heading. */
    heading?: CaseStudyHeading
    lead: string
    /** Checklist rows. Used when a media artifact accompanies the solution. */
    points?: string[]
    /** Bold, numbered principle cards. Used when there is no media artifact. */
    principles?: { title: string; body: string }[]
    media?: CaseStudyImage | CaseStudyImage[]
    /** Interactive prototype embedded as the solution centerpiece. */
    prototype?: CaseStudyPrototype
  }
  discovery: {
    /** Overrides the default "Four voices…" heading. */
    heading?: CaseStudyHeading
    lead: string
    findings: { title: string; body: string }[]
    media?: CaseStudyImage | CaseStudyImage[]
  }
  metrics: { value: string; label: string }[]
  outcomes: { objective: string; points: string[] }[]
  /** Optional framed artifact(s) closing the outcome section. */
  outcomesMedia?: CaseStudyImage | CaseStudyImage[]
  learnings: string[]
  /** Optional sections. Omit any of these to keep a case study tight. */
  process?: { index: string; title: string; body: string }[]
  objectives?: { label: string; title: string }[]
  sprints?: {
    lead: string
    items: { title: string; body: string }[]
  }
  launch?: { phase: string; tag: string; body: string; feedback: string }[]
  validation?: string[]
}

export type Project = {
  slug: string
  index: string
  title: string
  category: string
  description: string
  art: ProjectArtType
  /** Present when a full case study story exists for this project. */
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: 'epro',
    index: '01',
    title: 'Building a Mobile Product from a Legacy Platform',
    category: 'Healthcare / ePRO',
    description:
      'Rebuilding a legacy ePRO platform into a mobile product patients and researchers could rely on.',
    art: 'mobile',
    caseStudy: {
      summary:
        'ePRO (Electronic Patient Reported Outcomes) data records how a drug or device actually affects the people taking it, which makes it central to every clinical trial. Our EDC could no longer support that work well, so I designed and shipped DribbleCollect: a 21 CFR Part 11 compliant ePRO patients can download from the app store.',
      meta: [
        { label: 'Role', value: 'Lead Product Designer + PM' },
        { label: 'Team', value: '1 Designer/PM, 1 Full-stack & Mobile Eng, 1 QA' },
        { label: 'Tools', value: 'Figma, Axosoft, Capacitor, AWS' },
        { label: 'Timeline', value: '6 Months, MVP to GA' },
      ],
      intro:
        'ClearQ was an established EDC for running clinical trials, and it was steadily losing clients. The interface fought the people using it, and the architecture had no room left to grow. I owned both the product and the design, so I could not treat those as separate problems. A brittle experience produced bad data, and a rigid back-end made the experience impossible to fix without a rebuild.',
      problem: {
        lead: 'Two failures compounded each other, in exactly the place a clinical trial can least afford it: the data itself.',
        points: [
          {
            title: 'An interface working against its users',
            body: 'Error rates and drop-offs were high, and the instructions were hard to follow. Every point of friction was another chance to lose reliable data.',
          },
          {
            title: 'A back-end with no room to move',
            body: 'Limited scalability, no independent operation, and no API. The platform could not integrate with other systems or grow alongside the trials it supported.',
          },
        ],
      },
      solution: {
        lead: 'DribbleCollect answered both failures at once: a rebuilt experience on a rebuilt foundation. The prototype below is the real flow, from secure login through voice-to-text capture. Move through it the way a patient would.',
        prototype: {
          src: 'https://embed.figma.com/proto/Okrztm0qQfLlTIPRwVsMRT?content-scaling=fixed&kind=proto&node-id=613-1013&page-id=509%3A1016&scaling=scale-down&starting-point-node-id=613%3A1013&embed-host=share',
          href: 'https://www.figma.com/proto/Okrztm0qQfLlTIPRwVsMRT?content-scaling=fixed&kind=proto&node-id=613-1013&page-id=509%3A1016&scaling=scale-down&starting-point-node-id=613%3A1013',
          title: 'Interactive DribbleCollect prototype',
          eyebrow: 'Interactive prototype',
          aspect: '9 / 16',
          caption:
            'The DribbleCollect prototype: a 3-step login and reporting flow with LLM-powered voice-to-text entry, built 21 CFR Part 11 compliant. Tap through it live.',
        },
        points: [
          'AI voice-to-text data entry, built 21 CFR Part 11 compliant',
          'A 3-step login and reporting flow that cut task time',
          'A modular back-end that runs independently, with its own API',
          'An accessible UI, localized for multinational trials',
        ],
        media: {
          src: '/figma/epro-voice-to-text.webp',
          alt: 'Two annotated DribbleCollect questionnaire screens (transcription pane closed and open) with accessibility, interaction, and content callouts documenting the voice-to-text flow.',
          eyebrow: 'Voice-to-text: annotated flow',
          caption:
            'The signature feature, annotated. An LLM-powered pane reads questions aloud, listens for a spoken answer, and clarifies low-literacy responses against the questionnaire. I tested Siri, ChatGPT, and Amazon Transcribe Medical; Siri gave the best balance of usability and cost for this audience.',
          variant: 'plate',
        },
      },
      discovery: {
        lead: 'Questionnaires, interviews, and usability testing surfaced three voices in the same fragile chain of data. Mapping the legacy experience made the stakes undeniable.',
        findings: [
          {
            title: 'Patients abandon tools that waste their time',
            body: 'Each questionnaire meant stopping to give ten minutes of undivided attention by hand. When it felt invasive, patients simply stopped responding.',
          },
          {
            title: 'Site staff need to spend time on care, not tech support',
            body: 'Staff burned hours troubleshooting errors for patients who could not get the tool to work, time taken directly from patient care.',
          },
          {
            title: 'Data has to be reliable the first time',
            body: 'Data managers wrestled with lost, incomplete, and non-compliant entries. Capture had to be near-effortless without sacrificing accuracy.',
          },
        ],
        media: {
          src: '/figma/epro-journey-map.webp',
          alt: 'Experience map of the legacy ePRO across five stages (Onboarding, First Use, Daily Use, Missed Entry, and End of Study) with an emotion curve declining from confident to abandoned.',
          eyebrow: 'Experience map: the legacy tool',
          caption:
            'Confidence at onboarding decayed into frustration at the first error and abandonment by the end of the study. Every dip on that curve was a data point at risk.',
          variant: 'plate',
        },
      },
      process: [
        {
          index: '01',
          title: 'Onboarding & secure login',
          body: 'Weighed Okta 2FA and Google Authenticator to earn trust at the first step, then simplified the path down to a 3-step login and reporting flow.',
        },
        {
          index: '02',
          title: 'Voice-to-text capture',
          body: 'Tested Siri, ChatGPT, and Amazon Transcribe Medical against usability and cost. Siri won for this audience and became the core of natural-language entry.',
        },
        {
          index: '03',
          title: 'Autosave, progress & sync',
          body: 'Built a sync process that saved data accurately and showed users their progress, resolving longstanding fears about lost entries.',
        },
        {
          index: '04',
          title: 'Accessibility & onboarding support',
          body: 'Iterated the UI against WCAG 2.1 AA and added an introductory video, so low-tech-literacy patients felt at ease from day one.',
        },
      ],
      metrics: [
        { value: '40%', label: 'reduction in average task time' },
        { value: '3-step', label: 'login & reporting flow' },
        { value: '<24hrs', label: 'to add a new PRO module' },
        { value: '80%', label: 'client satisfaction at launch' },
      ],
      outcomes: [
        {
          objective: 'Compliant by design',
          points: [
            'Built audit trails, time-stamped entries, and e-signature validation into the workflow.',
            'Ran mock FDA inspections during QA to prove 21 CFR Part 11 compliance before any client release.',
          ],
        },
        {
          objective: 'Usable & inclusive',
          points: [
            'Cut average task time 40% with a 3-step flow, validated with low-tech-literacy patients.',
            'Applied WCAG 2.1 AA and localized into English, French, and Spanish for multinational trials.',
          ],
        },
        {
          objective: 'Built to scale',
          points: [
            'Shipped a microservices back-end with real-time API connections to major EDC systems.',
            'Added a questionnaire builder so sponsors could stand up a new PRO module in under 24 hours.',
          ],
        },
      ],
      launch: [
        {
          phase: 'MVP',
          tag: 'One client',
          body: 'Shipped to one dedicated client to confirm the need was real. Since the need came from a direct client request, this stage felt redundant, a candid lesson that skipping it could have saved time.',
          feedback: 'In-flow micro-surveys and a report-a-bug option.',
        },
        {
          phase: 'Beta',
          tag: 'Three therapeutic areas',
          body: 'Widened to three clients across therapeutic areas. This is where the product got resilient: it uncovered edge cases we had not anticipated.',
          feedback: 'Tagged micro-surveys, an embedded widget, and user-panel testing.',
        },
        {
          phase: 'GA',
          tag: 'General availability',
          body: 'Launched publicly at 80% client satisfaction, with continuous monitoring so we could respond to real usage quickly.',
          feedback: 'Randomized thumbs-up / thumbs-down ratings on every rollout.',
        },
      ],
      learnings: [
        'On a project this complex, clear communication mattered more than I expected. Small misreadings were expensive to fix later.',
        'Prioritization and trade-offs were not optional. They were how the team actually met the deadline.',
        'Designing for accessibility from the start made the product better for everyone, not only for users with disabilities.',
      ],
    },
  },
  {
    slug: 'deid',
    index: '02',
    title: 'Automating Medical-Image Redaction Without Losing Human Control',
    category: 'Clinical Imaging / FDA-Regulated SaaS',
    description:
      'A new medical-image redaction tool built inside FDA-regulated clinical-trial software. It replaced slow, manual work with auditable automation while keeping reviewers in control.',
    art: 'imaging',
    caseStudy: {
      summary:
        'Fusion is FDA-regulated clinical-trial software that collects and stores patient data while researching new drugs and devices. Before any of it reaches an external regulatory board, every piece of protected health information (PHI) has to be removed. I designed a new imaging redaction module inside Fusion that turned a slow, manual, error-prone process into an auditable one. It cut review sessions roughly in half while keeping human reviewers in final control.',
      meta: [
        { label: 'Role', value: 'Product Designer, end-to-end ownership' },
        { label: 'Team', value: '1 PD/PM, 2 Engineers, 1 QA' },
        { label: 'Product', value: 'Fusion Imaging Module (FDA-regulated)' },
        { label: 'Timeline', value: '6 Months' },
      ],
      intro:
        'Every medical image has to have its protected health information removed before a regulator sees it. At Fusion that redaction was done by hand, one file at a time, across teams in different parts of the world, and a single study could hold close to 100,000 images. The real problem was never just speed. It was making automation trustworthy enough to hold up in an FDA-regulated review.',
      problem: {
        lead: 'The redaction workflow was where the product slowed down. It was manual, error-prone, and expensive, and mistakes carried real consequences because this was the step that removed protected health information before a regulator saw it.',
        points: [
          {
            title: 'A manual process that could not scale',
            body: 'Every image was redacted by hand, and each one required specialized software just to open and edit. As studies approached 100,000 images, the work grew faster than any team could reasonably staff for.',
          },
          {
            title: 'Distributed teams, fragile output',
            body: 'Redaction teams worked globally, moving between several disconnected programs. Every tool switch and handoff was another chance for PHI to slip through, or for a valid image to be over-redacted.',
          },
        ],
      },
      solution: {
        heading: { lead: 'Three principles that made automation ', em: 'trustworthy', tail: '.' },
        lead: 'Before designing a single screen, I defined the rules the automation had to follow. They were grounded in Axiom’s product vision, and they let the team move quickly without giving up the confidence a regulated review depends on. They also gave everyone one consistent way to judge a tradeoff.',
        principles: [
          {
            title: 'Human authority over automation',
            body: 'Reviewers keep final control at every critical moment, so a regulatory board can validate the tool no matter how much it automates.',
          },
          {
            title: 'Trust before speed',
            body: 'No efficiency gain is worth compromising confidence or auditability. Speed only counts once the output can be trusted.',
          },
          {
            title: 'Reversibility as safety',
            body: 'Every automated action stays reviewable and fully undoable, so no single click can quietly put patient data at risk.',
          },
        ],
      },
      discovery: {
        heading: { lead: 'Two users and one ', em: 'regulatory', tail: ' standard.' },
        lead: 'To ground a new tool in reality, I ran a full research phase: 34 questionnaires, 14 interviews, and 7 shadowing sessions watching people redact images in their own environment. Three findings shaped the decisions that followed.',
        findings: [
          {
            title: 'Data managers are measured by efficiency',
            body: 'They have to confirm every trace of PHI is gone across enormous volumes of images, all while moving between separate, specialized programs.',
          },
          {
            title: 'Site users need speed above all',
            body: 'They upload images and need to get in and out of the EDC fast, because they are managing real patients in real time.',
          },
          {
            title: 'FDA rules were the baseline requirement',
            body: 'With most clients based in the US, the FDA rules for electronic signatures and audit trails became the standard behind every decision.',
          },
        ],
      },
      metrics: [
        { value: '50%', label: 'reduction in review session time' },
        { value: '<1%', label: 'false-negative rate on redaction' },
        { value: '<3', label: 'clicks to review & redact an image' },
        { value: '100%', label: 'auditable actions, on every page' },
      ],
      outcomes: [
        {
          objective: 'A blind review portal inside Fusion',
          points: [
            'Blinded reviewers view, read, redact, and audit every image without leaving Fusion.',
          ],
        },
        {
          objective: 'Redaction in under three clicks',
          points: [
            'AWS Rekognition, AWS Medical Transcribe, and the LeadTools medical viewer clear PHI across many image instances at once, retiring the old download, redact locally, and re-upload loop.',
          ],
        },
        {
          objective: 'Auditable and reversible by design',
          points: [
            'A full audit trail sits on every page, and every automated action stays reviewable and undoable.',
          ],
        },
        {
          objective: 'Ready to scale',
          points: [
            'Responsive down to web tablet, with scalability phased so scope stayed honest.',
          ],
        },
      ],
      validation: [
        'The module cut redaction sessions roughly in half and kept the false-negative rate under 1%, with a full audit trail on every page. Because reviewers kept authority at every control point, it earned the confidence of both internal teams and the regulatory boards it had to satisfy.',
      ],
      learnings: [
        'In a regulated product, trust is a design material. Auditability and reversibility have to be designed in from the first sketch, not bolted on at the end.',
        'Clear principles turn ambiguity into decisions. Naming “human authority,” “trust before speed,” and “reversibility” up front let me disqualify slick ideas that quietly added risk.',
        'Constraints sharpen the work. With UI changes off the table, focusing purely on workflow and reviewer decision-making produced a faster, safer tool than a full redesign would have.',
      ],
    },
  },
  {
    slug: 'cashier',
    index: '03',
    title: 'Designing Trust Into Every Transaction',
    category: 'Sportsbook & Casino',
    description:
      'Reimagining the cashier experience to drive trust, conversion, and loyalty in a high-stakes environment.',
    art: 'cashier',
  },
  {
    slug: 'system',
    index: '04',
    title: 'Designing Systems That Scale',
    category: 'Design System',
    description:
      'Creating scalable design systems and workflows that enable teams to move faster and build with confidence.',
    art: 'system',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
