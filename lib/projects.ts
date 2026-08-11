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
    media?: CaseStudyImage
  }
  discovery: {
    /** Overrides the default "Four voices…" heading. */
    heading?: CaseStudyHeading
    lead: string
    findings: { title: string; body: string }[]
    media?: CaseStudyImage
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
    slug: 'trust-in-every-transaction',
    index: '01',
    title: 'Designing Trust Into Every Transaction',
    category: 'Sportsbook & Casino',
    description:
      'Reimagining the cashier experience to drive trust, conversion, and loyalty in a high-stakes environment.',
    art: 'cashier',
  },
  {
    slug: 'epro',
    index: '02',
    title: 'Building a Mobile Product from a Legacy Platform',
    category: 'Healthcare / ePRO',
    description:
      'Transforming a legacy ePRO platform into a modern, scalable mobile experience for patients and researchers.',
    art: 'mobile',
    caseStudy: {
      summary:
        'ePRO (Electronic Patient Reported Outcomes) are the backbone of every clinical trial, documenting how a drug or device actually affects the people taking it. When our industry-leading EDC could no longer carry that weight, I designed and shipped DribbleCollect: a fully 21 CFR Part 11 compliant ePRO you can download wherever you get your apps.',
      meta: [
        { label: 'Role', value: 'Lead Product Designer + Product Manager' },
        { label: 'Team', value: '1 Designer/PM, 1 Full-stack & Mobile Engineer, 1 QA (part-time)' },
        { label: 'Tools', value: 'Figma, Axosoft, Capacitor, AWS' },
        { label: 'Timeline', value: '6 Months, MVP to GA' },
      ],
      intro:
        'ClearQ was an industry-leading EDC for running clinical trials, and it was quietly losing the room. Clients kept surfacing the same two truths: the interface was fighting the people using it, and the architecture had nowhere left to grow. I owned both the product and the design, which meant I could not hide a usability problem behind a roadmap, or a roadmap problem behind a redesign. I had to solve the whole thing.',
      problem: {
        lead: 'Two failures compounded each other. A brittle experience produced bad data, and a rigid back-end made it impossible to fix the experience without a rebuild.',
        points: [
          {
            title: 'An interface working against its users',
            body: 'High error rates, high drop-offs, and instructions nobody could follow. Every point of friction in a clinical trial is a data point at risk.',
          },
          {
            title: 'A back-end with no room to move',
            body: 'Limited scalability, no ability to operate independently, and no API. The platform could not integrate, extend, or grow with the trials it served.',
          },
        ],
      },
      solution: {
        lead: 'DribbleCollect answered both failures at once: a rebuilt experience on top of a rebuilt foundation.',
        points: [
          'Innovative AI voice-to-text data entry, fully 21 CFR Part 11 compliant',
          'An expansive UX flow engineered against drop-offs, confusion, and disengagement',
          'A modular back-end that runs independently, with a streamlined API',
          'A refreshed, accessible UI patients could trust on the first try',
        ],
        media: {
          src: '/figma/epro-voice-to-text.webp',
          alt: 'Two annotated DribbleCollect questionnaire screens (transcription pane closed and open) with accessibility, interaction, and content callouts documenting the voice-to-text flow.',
          eyebrow: 'Voice-to-text: annotated flow',
          caption:
            'The signature feature: an LLM-powered voice-to-text pane that dictates questions aloud, listens for a spoken answer, and clarifies low-literacy responses against the questionnaire. Every interaction is annotated for accessibility, interaction, and content decisions, and built 21 CFR Part 11 compliant.',
          variant: 'plate',
        },
      },
      process: [
        {
          index: '01',
          title: 'Understand the pain points and technical limits',
          body: 'Get honest about where the legacy tool was failing, and why the architecture made those failures unavoidable.',
        },
        {
          index: '02',
          title: 'Define specific goals and a plan to reach them',
          body: 'Translate vague frustration into measurable objectives the whole team could build toward.',
        },
        {
          index: '03',
          title: 'Prototype and pressure-test solutions',
          body: 'Break the problem into focused sprints, then test, iterate, and refine against real concerns.',
        },
        {
          index: '04',
          title: 'Build to launch: MVP, Beta, GA',
          body: 'Stage the rollout so every release earned its way to the next audience.',
        },
      ],
      discovery: {
        lead: 'Through questionnaires, informal interviews, and usability testing, four voices came through clearly, each one a different stakeholder in the same fragile chain of data.',
        findings: [
          {
            title: 'Patients value tools that respect their time',
            body: 'When an ePRO notification arrives, patients often have to stop, sit down, and give ten minutes of undivided attention to fill each questionnaire by hand. Invasive tools get abandoned.',
          },
          {
            title: 'Site staff need to spend time on care, not tech support',
            body: 'Staff burned hours troubleshooting errors with patients who simply could not get the tool to work, time stolen directly from patient care.',
          },
          {
            title: 'Data must be reliable the first time',
            body: 'Data managers wrestled with lost, incomplete, or non-compliant entries. The tool needed to be as un-manual as possible while still capturing accurate readings.',
          },
          {
            title: 'The platform should inspire confidence, not doubt',
            body: 'Leadership needed a product that made sponsors want to come back, and feel certain about the money they were investing.',
          },
        ],
        media: {
          src: '/figma/epro-journey-map.webp',
          alt: 'Experience map of the legacy ePRO across five stages (Onboarding, First Use, Daily Use, Missed Entry, and End of Study) with an emotion curve declining from confident to abandoned.',
          eyebrow: 'Experience map: the legacy tool',
          caption:
            'Mapping the legacy experience made the stakes undeniable: confidence at onboarding decayed into frustration at the first error and outright abandonment by the end of the study. Every dip was a data point at risk.',
          variant: 'plate',
        },
      },
      objectives: [
        {
          label: 'Objective 01',
          title: 'Achieve seamless regulatory compliance for AI-driven data capture',
        },
        {
          label: 'Objective 02',
          title: 'Maximize usability and engagement through intelligent UX design',
        },
        {
          label: 'Objective 03',
          title: 'Champion inclusive, accessible design with scalable support',
        },
        {
          label: 'Objective 04',
          title: 'Build a future-ready modular architecture for scalable growth',
        },
      ],
      sprints: {
        lead: 'I broke the work into focused sprints. Each one took a single concern, so we could test, iterate, and refine practical solutions instead of guessing at the whole picture.',
        items: [
          {
            title: 'Onboarding & account management',
            body: 'Explored secure login options like Okta 2FA and Google Authenticator to earn trust from the very first step.',
          },
          {
            title: 'Home & navigation',
            body: 'Presented critical information clearly, so users with low tech literacy could navigate with confidence.',
          },
          {
            title: 'Form entry & voice-to-text capture',
            body: 'Tested Siri, ChatGPT, and Amazon Transcribe Medical. Siri offered the best balance of usability and cost for our audience.',
          },
          {
            title: 'Autosave, progress & feedback',
            body: 'Built a sync process that saved data accurately and reassured users, resolving longstanding concerns about lost progress.',
          },
          {
            title: 'Accessibility & inclusive design',
            body: 'Tested multiple tools and iterated on the UI so everyone could interact with the app comfortably.',
          },
          {
            title: 'Training & in-app support',
            body: 'Designed an introductory video so brand-new users felt at ease from day one.',
          },
        ],
      },
      metrics: [
        { value: '40%', label: 'reduction in average task time' },
        { value: '3-step', label: 'login & reporting flow' },
        { value: '<24hrs', label: 'to add a new PRO module' },
        { value: '80%', label: 'client satisfaction at launch' },
      ],
      outcomes: [
        {
          objective: 'Seamless regulatory compliance',
          points: [
            'Built automatic audit trails, time-stamped entries, and electronic signature validation directly into the workflow.',
            'Ran mock FDA inspections during QA to prove compliance before any client release.',
          ],
        },
        {
          objective: 'Usability & engagement',
          points: [
            'Ran usability tests with low-tech-literacy patients to surface real friction points.',
            'Simplified the journey to a 3-step login and reporting flow, cutting average task time by 40%.',
            'Added AI-driven natural language input so patients could record symptoms in plain language or by voice.',
          ],
        },
        {
          objective: 'Inclusive, accessible design',
          points: [
            'Applied WCAG 2.1 AA standards: large targets, screen reader support, and high-contrast modes.',
            'Localized into English, French, and Spanish to support multinational trials.',
            'Built modular templates so new questionnaires inherit accessibility features automatically.',
          ],
        },
        {
          objective: 'Future-ready architecture',
          points: [
            'Developed a microservices back-end with secure, real-time API connections to major EDC systems.',
            'Shipped a questionnaire builder so sponsors could add PRO modules in under 24 hours.',
            'Structured the architecture to handle both demo prototypes and full-scale deployments.',
          ],
        },
      ],
      launch: [
        {
          phase: 'MVP',
          tag: 'Minimum viable product',
          body: 'Launched bare-bones prototypes to one dedicated client and a select group of users to confirm we were solving a real need. Because the need came from a direct client request, this stage felt redundant: a candid lesson that removing it could have saved real time.',
          feedback: 'Micro-surveys surfaced naturally as users moved through the flow, plus a report-a-bug option.',
        },
        {
          phase: 'Beta',
          tag: 'Three therapeutic areas',
          body: 'Reached three clients across different therapeutic areas. This wider release was crucial: it refined usability and uncovered edge cases we had not anticipated, shaping a far more resilient product.',
          feedback: 'Tagged micro-surveys, an embedded feedback widget, and user-panel invites for deeper usability testing.',
        },
        {
          phase: 'GA',
          tag: 'General availability',
          body: 'Launched publicly with systems for continuous monitoring, so we could respond rapidly to real-world usage and evolving needs.',
          feedback: 'Sporadic thumbs-up / thumbs-down experience ratings, triggered at random and on every new feature rollout.',
        },
      ],
      validation: [
        'The final deployed product earned 80% client satisfaction, with sponsors citing reduced patient drop-off and faster integrations.',
        'Feedback confirmed compliance, usability, inclusivity, and scalability worked together to deliver a solution greater than the sum of its parts.',
      ],
      learnings: [
        'Effective communication is essential in complex projects to avoid costly misinterpretations.',
        'Prioritization and trade-offs are not optional; they are how you actually meet a deadline.',
        'Designing for accessibility from the start benefits every user, not only those with disabilities.',
      ],
    },
  },
  {
    slug: 'design-systems-that-scale',
    index: '03',
    title: 'Designing Systems That Scale',
    category: 'Design System / Platform',
    description:
      'Creating scalable design systems and workflows that enable teams to move faster and build with confidence.',
    art: 'system',
  },
  {
    slug: 'confidence-in-a-regulated-industry',
    index: '04',
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
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
