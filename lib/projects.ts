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

/** Several small artifacts side by side under one caption. */
export type CaseStudyMediaGrid = {
  grid: CaseStudyImage[]
  columns: 2 | 3 | 4
  caption?: string
}

/** Anything a section can show: one image, or a grid of them. */
export type CaseStudyMediaItem = CaseStudyImage | CaseStudyMediaGrid

/** An animated device mock-up: screens that cycle inside an iPhone frame. */
export type CaseStudyDevice = {
  screens: { src: string; alt: string; label: string }[]
  /** Optional full-bleed backdrop behind the device. */
  backdrop?: string
  /** Milliseconds per screen. Defaults to 3200. */
  interval?: number
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
  /** CSS aspect-ratio for the frame, e.g. "16 / 10". Defaults to "16 / 10". */
  aspect?: string
}

export type CaseStudy = {
  summary: string
  meta: { label: string; value: string }[]
  /** Optional framed artifact shown in the hero, in place of the generated art. */
  heroMedia?: CaseStudyImage
  /** Animated device mock-up in the hero. Takes precedence over heroMedia. */
  heroDevice?: CaseStudyDevice
  /** 'side' (default) puts the hero art beside the copy; 'stacked' runs it full width beneath. */
  heroLayout?: 'side' | 'stacked'
  /** Lede paragraph under the meta bar. Omit to go straight to the problem. */
  intro?: string
  problem: {
    /** Overrides the default "The problem" kicker. */
    kicker?: string
    /** One paragraph, or several. */
    lead: string | string[]
    points: { title: string; body: string }[]
    /** Optional artifact(s) shown beneath the problem panels, e.g. the current state. */
    media?: CaseStudyMediaItem | CaseStudyMediaItem[]
  }
  /** Render the research section before the solution. Use when the insight has to land before the decisions. */
  researchFirst?: boolean
  solution: {
    /** Overrides the default "Meet DribbleCollect." heading. */
    heading?: CaseStudyHeading
    lead: string
    /** Checklist rows. Used when a media artifact accompanies the solution. */
    points?: string[]
    /**
     * Bold, numbered principle cards. Used when there is no media artifact.
     * Give a principle its own `media` to render every principle as a row
     * with its proof artifact beside it.
     */
    principles?: { title: string; body: string; media?: CaseStudyMediaItem }[]
    media?: CaseStudyMediaItem | CaseStudyMediaItem[]
    /** Interactive prototype embedded as the solution centerpiece. */
    prototype?: CaseStudyPrototype
  }
  /** Optional turning-point section rendered between research and solution. */
  pivot?: {
    kicker: string
    body: string | string[]
    media?: CaseStudyMediaItem | CaseStudyMediaItem[]
  }
  discovery: {
    /** Overrides the default "The research" kicker. */
    kicker?: string
    /** Overrides the default "Four voices…" heading. */
    heading?: CaseStudyHeading
    lead: string
    findings: { title: string; body: string }[]
    media?: CaseStudyMediaItem | CaseStudyMediaItem[]
  }
  /** Stat band. Omit or leave empty to hide it. */
  metrics?: { value: string; label: string }[]
  /** Overrides the default "Every objective, delivered." heading. */
  outcomesHeading?: CaseStudyHeading
  /** Outcome cards. Omit or leave empty to hide the section. */
  outcomes?: { objective: string; points: string[] }[]
  /** Optional framed artifact(s) closing the outcome section. */
  outcomesMedia?: CaseStudyMediaItem | CaseStudyMediaItem[]
  /** Closing reflection: a few scenarios worked through, rendered after the outcome. */
  reflection?: {
    kicker: string
    lead?: string
    items: { title: string; body: string }[]
  }
  /** Numbered takeaways. Omit or leave empty to hide the section. */
  learnings?: string[]
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
      outcomesHeading: { lead: 'Every objective, ', em: 'delivered' },
      outcomes: [
        {
          objective: 'Compliant by design',
          points: [
            'Built audit trails, time-stamped entries, and e-signature validation into the workflow',
            'Ran mock FDA inspections during QA to prove 21 CFR Part 11 compliance before any client release',
          ],
        },
        {
          objective: 'Usable & inclusive',
          points: [
            'Cut average task time 40% with a 3-step flow, validated with low-tech-literacy patients',
            'Applied WCAG 2.1 AA and localized into English, French, and Spanish for multinational trials',
          ],
        },
        {
          objective: 'Built to scale',
          points: [
            'Shipped a microservices back-end with real-time API connections to major EDC systems',
            'Added a questionnaire builder so sponsors could stand up a new PRO module in under 24 hours',
          ],
        },
      ],
      launch: [
        {
          phase: 'MVP',
          tag: 'One client',
          body: 'Shipped to one dedicated client to confirm the need was real. Since the need came from a direct client request, this stage felt redundant, a candid lesson that skipping it could have saved time.',
          feedback: 'In-flow micro-surveys and a report-a-bug option',
        },
        {
          phase: 'Beta',
          tag: 'Three therapeutic areas',
          body: 'Widened to three clients across therapeutic areas. This is where the product got resilient: it uncovered edge cases we had not anticipated.',
          feedback: 'Tagged micro-surveys, an embedded widget, and user-panel testing',
        },
        {
          phase: 'GA',
          tag: 'General availability',
          body: 'Launched publicly at 80% client satisfaction, with continuous monitoring so we could respond to real usage quickly.',
          feedback: 'Randomized thumbs-up / thumbs-down ratings on every rollout',
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
    title: 'Designing Trust into Ambiguous Systems',
    category: 'Sportsbook / Crypto payments / Functional UI',
    description:
      'A sportsbook and a crypto wallet are two systems that never explain themselves to each other, and the user stands between them with real money. I rebuilt the cashier that joins them so every screen answers one question: where is my money right now?',
    art: 'cashier',
    caseStudy: {
      summary:
        'A sportsbook and a crypto wallet are two systems that never explain themselves to each other, and the user stands between them with real money. The cashier that joined them was a vendor iframe nobody in house could change, so every step asked for trust and gave nothing back. In two weeks I rebuilt it as functional UI: a system of states, each with a visual indicator, so a user never has to ask where their money is.',
      meta: [
        { label: 'Role', value: 'Senior product designer' },
        { label: 'Team', value: '1 designer, 1 PM, leadership' },
        { label: 'Tools', value: 'Figma, Claude, Paper.io, GitHub' },
        { label: 'Timeline', value: '2 weeks to handoff' },
      ],
      heroLayout: 'stacked',
      heroDevice: {
        backdrop: '/work/cashier/hero-backdrop.webp',
        screens: [
          {
            src: '/work/cashier/screen-form.png',
            label: 'Enter amount',
            alt: 'Withdrawal form with a saved MetaMask wallet, currency, a dollar amount with MAX, the balance beneath, and three network fee tiers.',
          },
          {
            src: '/work/cashier/screen-review.png',
            label: 'Review',
            alt: 'Review sheet listing destination wallet, network, fee, amount received, and arrival time, with a note that nothing moves until confirmed in the wallet.',
          },
          {
            src: '/work/cashier/screen-pending.png',
            label: 'Pending · 1 of 3',
            alt: 'Withdrawal on its way, with a pending badge reading 1 of 3 confirmations, the destination, and a transaction link.',
          },
        ],
      },
      problem: {
        kicker: 'The problem & the brief',
        lead: [
          'The current state was a Fortris iframe dropped into an account page. Users picked a “wallet” that was really a coin. Everything had to be typed by hand, hopping between many apps. The most high-stakes part of the transaction, KYC, was dropped randomly in the middle of it. Every step of the way asked for trust, and every step caused uncertainty.',
          'The brief, in total, was: “Build a new crypto cashier and make it better than what we have.” No metric, no scope, no user. The first job was to decide what “better” meant. To me, that was making sure the user never had to wonder whether their money moved.',
        ],
        points: [],
        media: [
          {
            grid: [
              {
                src: '/work/cashier/before-1-account.png',
                alt: 'Account hub with balances and Buy Coins and Redeem Cash buttons.',
                variant: 'bleed',
              },
              {
                src: '/work/cashier/before-2-choose-wallet.png',
                alt: 'Vendor screen titled Choose Your Wallet showing a grid of six coins: BTC, SOL, ETH, USDC, LTC, BCH.',
                variant: 'bleed',
              },
              {
                src: '/work/cashier/before-3-deposit.png',
                alt: 'Vendor Deposit Using Bitcoin form with a dollar amount, purchase limits, and a red warning that other networks will lose funds.',
                variant: 'bleed',
              },
              {
                src: '/work/cashier/before-4-id-verification.png',
                alt: 'Document ID Verification iframe from a second vendor on the redeem path, with a button reading complete the verification process and click this button when finished.',
                variant: 'bleed',
              },
            ],
            columns: 4,
            caption:
              'The current state. Account hub, then the vendor takes over: a “wallet” picker that is really a coin picker, a deposit form whose only guidance is a red warning, and a redeem path that hands the user to a second vendor for ID checks.',
          },
          {
            src: '/work/cashier/journey-map-redeem.png',
            alt: 'Journey map of redeeming funds through the vendor flow: what the user is doing, thinking, and feeling at each step, ending in either relief or the belief that the app is a scam.',
            caption:
              'The current-state journey for redeeming. The manual path ends in two places: relief that it worked, or “this app is a scam.” Half of our users were new to crypto, so the default had to protect them.',
          },
        ],
      },
      researchFirst: true,
      discovery: {
        kicker: 'How do you show trust in UI?',
        heading: { lead: 'Trust is ', em: 'system status', tail: ', shown before the user has to ask.' },
        lead: 'Nielsen Norman’s first heuristic is visibility of system status: keep users informed with timely, appropriate feedback. With money in flight, that means every screen carries a state (idle, validating, pending, confirmed, failed) and a status the user can verify (a confirmation count, a transaction link, a fee shown before commit). Three more heuristics did the rest of the work.',
        findings: [
          {
            title: 'Error prevention',
            body: 'Make the wrong action hard to take. Buttons stay disabled until the inputs are valid, errors appear on the field itself, and the default path protects people who are new.',
          },
          {
            title: 'Recognition over recall',
            body: 'The saved wallet, the network, the fee, and the net amount sit on the screen where the decision is made. Nobody should have to remember an address or a fee tier.',
          },
          {
            title: 'Match between system and real world',
            body: 'Status in the user’s words. “Nothing moves until you confirm in your wallet,” not “awaiting signature.” “1 of 3 confirmations,” not a spinner.',
          },
          {
            title: 'Help users recognise, diagnose, and recover',
            body: 'A failure is a state with a plain-language cause and one obvious next action, not a red toast that disappears.',
          },
        ],
      },
      solution: {
        heading: { lead: 'Four rules, ', em: 'every screen', tail: '.' },
        lead: 'The cashier became functional UI: a system of states, each with a visual indicator and a status, so the user never has to ask what is happening with their money. I scoped to one coin, four wallets, and withdrawal first, because that was where trust broke. Four rules shaped every screen.',
        media: {
          src: '/work/cashier/flow-wallet-connected.png',
          alt: 'Flowchart: purchase and redeem split at the top, package or currency selection, a KYC gate that only appears when verification is incomplete, then the in-house cashier and a confirmation screen.',
          caption:
            'The flow the screens hang off. Purchase and redeem split at the top, the KYC gate only appears when verification is incomplete, and every path ends on a confirmation screen instead of a copied address.',
        },
        principles: [
          {
            title: 'Guardrails: make the mistake impossible',
            body: 'The balance and the fee are on screen before anyone types. Exceed them and the field turns red with the reason, MAX explains exactly what it will send, and the button stays off until the numbers work. The interface catches the error, not the user.',
            media: {
              grid: [
                {
                  src: '/work/cashier/screen-form.png',
                  alt: 'Withdrawal form with a saved MetaMask wallet, currency, a dollar amount with MAX, the balance shown beneath, and three network fee tiers.',
                  variant: 'bleed',
                },
                {
                  src: '/work/cashier/screen-balance-error.png',
                  alt: 'The same form with the amount field outlined in red, an inline message that amount plus network fee exceeds the balance, a note explaining what MAX sends, and the Review withdrawal button disabled.',
                  variant: 'bleed',
                },
              ],
              columns: 2,
              caption: 'Balance and fee tiers visible before typing. Over the limit, the field explains why and the button will not go.',
            },
          },
          {
            title: 'No surprises: every step has an indicator',
            body: 'Before anything moves, one sheet shows the destination, the network, the fee, the net amount, and the arrival time, with a note that the wallet will open to approve. The user knows what happens next and when, before it happens.',
            media: {
              src: '/work/cashier/screen-review.png',
              alt: 'Review sheet listing destination wallet, network, network fee, amount received in green, and arrival time, with a note that the wallet will open to approve and nothing moves until confirmed there.',
              variant: 'bleed',
              caption: 'The review sheet. Every number the wallet is about to show, shown here first.',
            },
          },
          {
            title: 'Where is my money, on every page',
            body: 'Once sent, the status is live: a pending badge with the confirmation count, the destination, and a transaction link to verify on chain. A saved-wallet note tells them the next withdrawal is two taps. The user never has to ask.',
            media: {
              src: '/work/cashier/screen-pending.png',
              alt: 'Withdrawal on its way screen with a pending badge reading 1 of 3 confirmations, the destination address, a transaction link, and a note that the wallet is saved for next time.',
              variant: 'bleed',
              caption: 'Pending, with a count and a link. Latency is out of our control. Silence is not.',
            },
          },
          {
            title: 'Failure is a state, not an error message',
            body: 'If the user cancels in their wallet, the screen says exactly that, confirms that no funds moved, and offers retry or edit. Every failure path ends in a cause and a next action, with the visual cue to match.',
            media: {
              src: '/work/cashier/screen-cancelled.png',
              alt: 'Withdrawal screen after the user cancelled in their wallet, with an info panel reading transaction cancelled in your wallet, no funds moved, retry when ready, and buttons to retry or edit details.',
              variant: 'bleed',
              caption: 'Cancelled in wallet. What happened, what it means for the money, and two ways forward.',
            },
          },
        ],
      },
      reflection: {
        kicker: 'Reflection',
        lead: 'A few scenarios I worked through, and what each one taught me about designing for money in flight.',
        items: [
          {
            title: 'The user closes the app mid-transaction',
            body: 'Money in flight does not wait for the app to be open. I designed the pending state to survive the app closing, with the status mirrored in history and a push notification when it confirmed, so coming back never meant starting over.',
          },
          {
            title: 'The connected wallet changes between sessions',
            body: 'Browser wallets switch accounts silently. I added a wallet-changed state that shows the new address, says plainly that it changed, and asks the user to confirm it or reconnect the previous one. One screen, two safe exits.',
          },
          {
            title: 'The network fee moves between review and confirm',
            body: 'Fees are live. If the quoted fee changed before approval, the review sheet re-rendered with the new number rather than letting the wallet show a figure the user had never seen. The rule became: the app never lets a number surprise the user.',
          },
          {
            title: 'Where it ended',
            body: 'I handed off the full flow with every state specified and tested on prototypes. I was let go before launch, so I cannot report production numbers. What I can say is that the research I was pushed to skip is what caught the biggest miss, the wallet integration, and I would run it first next time.',
          },
        ],
      },
    },
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
