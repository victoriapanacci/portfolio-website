export type ProjectArtType = 'mobile' | 'imaging'

/**
 * Card art as a working before/after slider: two full-frame layers at the
 * same 3:2 size, the after one revealed from the left as the pointer moves.
 */
export type ProjectCompare = {
  before: { src: string; alt: string }
  after: { src: string; alt: string }
  width: number
  height: number
}

/** Optional custom section heading: `{lead}<em>{em}</em>{tail}`. */
export type CaseStudyHeading = { lead?: string; em: string; tail?: string }

export type CaseStudyImage = {
  /**
   * Path under /public. Leave empty ('') to render a labelled placeholder
   * frame in its place until the real artifact is ready; `alt` is then shown
   * as the note inside the frame.
   */
  src: string
  alt: string
  /** Short rose eyebrow tag shown above the frame, e.g. "User journey map". */
  eyebrow?: string
  /** Descriptive caption shown beneath the frame. */
  caption?: string
  /**
   * 'plate' = light matted artifact (screens, boards). 'bleed' = wide framed
   * panel. 'phone' = a single portrait screen, centred at phone width.
   */
  variant?: 'plate' | 'bleed' | 'phone'
  /** CSS aspect-ratio for the placeholder frame, e.g. "16 / 9". Ignored once `src` is set. */
  aspect?: string
  /** In a story section: 'full' (default) spans the whole field, 'text' narrows the frame to the text columns. */
  span?: 'full' | 'text'
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

/** A guided tour: screens in an iPhone frame with numbered pins over the regions that matter. */
export type CaseStudyWalkthrough = {
  steps: {
    title: string
    body: Prose
    src: string
    alt: string
    /** Pins as percentages of the screen: x, y, width, height. */
    callouts: { x: number; y: number; w: number; h: number; note: string }[]
  }[]
  /** Milliseconds per step before auto-advancing. Defaults to 5200. */
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

/** Prose: one paragraph, or several. Items starting with "- " become bullets. */
export type Prose = string | string[]

/**
 * One decision as a repeated four-beat card: what I chose, what I rejected,
 * what it cost, and what I'd do now. Give it an `image` to show the
 * artifact beside the lines.
 */
export type CaseStudyDecision = {
  title: string
  image?: { src: string; alt: string }
  chose: string
  rejected: string
  cost: string
  now: string
}

/**
 * One section of a free-form narrative: a kicker, an optional heading, prose
 * (with "## " subheadings, "- " bullets and "> " pull quotes) and the
 * artifact(s) that belong with it.
 */
export type CaseStudyStorySection = {
  kicker: string
  heading?: string
  /** Omit when the section is only its decisions. */
  body?: Prose
  /** Decision cards shown after the prose, before `prototype` and `media`. */
  decisions?: CaseStudyDecision[]
  media?: CaseStudyMediaItem | CaseStudyMediaItem[]
  /** Interactive prototype shown after the prose, before `media`. */
  prototype?: CaseStudyPrototype
  /** 'stacked' (default) runs media full width beneath the prose. 'side' puts it beside the prose. */
  layout?: 'stacked' | 'side'
}

export type CaseStudy = {
  summary: Prose
  /** Each item may carry a muted `note` rendered beneath its value, e.g. a footnote or how a result was measured. */
  meta: { label: string; value: string; note?: string }[]
  /** Optional framed artifact shown in the hero, in place of the generated art. */
  heroMedia?: CaseStudyImage
  /** Animated device mock-up in the hero. Takes precedence over heroMedia. */
  heroDevice?: CaseStudyDevice
  /** 'side' (default) puts the hero art beside the copy; 'stacked' runs it full width beneath. */
  heroLayout?: 'side' | 'stacked'
  /** Lede paragraph under the meta bar. Omit to go straight to the problem. */
  intro?: string
  /**
   * Free-form narrative, rendered in order after the hero and intro. Use it
   * when the story has its own shape; the structured problem / solution /
   * research sections below are then usually omitted.
   */
  story?: CaseStudyStorySection[]
  problem?: {
    /** Overrides the default "The problem" kicker. */
    kicker?: string
    lead: Prose
    points: { title: string; body: string }[]
    /** Optional artifact(s) shown beneath the problem panels, e.g. the current state. */
    media?: CaseStudyMediaItem | CaseStudyMediaItem[]
  }
  /** Render the research section before the solution. Use when the insight has to land before the decisions. */
  researchFirst?: boolean
  solution?: {
    /** Overrides the default "The solution" kicker. */
    kicker?: string
    heading: CaseStudyHeading
    lead: Prose
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
    /** Interactive walkthrough shown after the lead, before the decisions. */
    walkthrough?: CaseStudyWalkthrough
  }
  discovery?: {
    /** Overrides the default "The research" kicker. */
    kicker?: string
    heading: CaseStudyHeading
    lead: Prose
    findings: { title: string; body: Prose }[]
    media?: CaseStudyMediaItem | CaseStudyMediaItem[]
  }
  /** Stat band. Omit or leave empty to hide it. */
  metrics?: { value: string; label: string }[]
  /** Overrides the default "The outcome" kicker. */
  outcomesKicker?: string
  /** Optional heading sentence above the outcome cards. */
  outcomesHeading?: CaseStudyHeading
  /** Outcome cards. Omit or leave empty to hide the section. */
  outcomes?: { objective: string; points: string[] }[]
  /** Optional framed artifact(s) closing the outcome section. */
  outcomesMedia?: CaseStudyMediaItem | CaseStudyMediaItem[]
  /** Closing reflection: a few scenarios worked through, rendered after the outcome. */
  reflection?: {
    kicker: string
    lead?: Prose
    items: { title: string; body: Prose }[]
  }
  /** Numbered takeaways. Omit or leave empty to hide the section. */
  learnings?: string[]
  /** Optional sections. Omit any of these to keep a case study tight. */
  process?: { index: string; title: string; body: string }[]
  /** Overrides the default "Process" kicker. */
  processKicker?: string
  launch?: { phase: string; tag: string; body: string; feedback: string }[]
  validation?: string[]
}

export type Project = {
  slug: string
  index: string
  title: string
  /** Short name used in the browser tab title ("Victoria Panacci: <shortTitle>"). */
  shortTitle: string
  category: string
  description: string
  /** Drawn illustration for the case-study hero when there is no real media. */
  art?: ProjectArtType
  /** Optional photographic cover. When present, the card shows it instead of the drawn art. */
  cover?: {
    src: string
    alt: string
    /** Intrinsic pixel size of the file. */
    width: number
    height: number
    /** Frame colour behind the image. Match the illustration's own background when zoom < 1. */
    bg?: string
    /** Image size as a fraction of the 3:2 frame (1 = fill). Below 1 the image sits centred on `bg`. */
    zoom?: number
    /** Vertical nudge in px from centre; negative moves the image up. */
    shiftY?: number
  }
  /** Working before/after slider in the card. Takes precedence over `cover`. */
  compare?: ProjectCompare
  /** Present when a full case study story exists for this project. */
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: 'epro',
    index: '01',
    title: 'ePRO rebuild: doubling questionnaire completion for participants over 60',
    shortTitle: 'ePRO',
    category: '0-1 / Regulated Clinical Research / Design & Product Management',
    description:
      'Rebuilding a legacy ePRO app as a native iOS product for study participants over 60. Completion went from 40% to 80%.',
    // The card is a working before/after slider over the entry summary. The
    // two layers, and fifteen still alternatives (v01 to v15), live in
    // /public/work/epro/covers, built by scripts/epro-cover.
    compare: {
      before: {
        src: '/work/epro/covers/wipe-before.webp',
        alt: 'Before: the legacy Confirm Entry Summary screen, a plain two-column list of questions and answers with small Ok and Cancel links in the corner.',
      },
      after: {
        src: '/work/epro/covers/wipe-after.webp',
        alt: 'After: the rebuilt Your evening diary review, marked Submitted 7:30 pm and editable until tomorrow, with answers grouped under How you feel and symptom rings for pain, nausea and overall.',
      },
      width: 1920,
      height: 1280,
    },
    caseStudy: {
      summary:
        'Four in ten participants finished the daily questionnaire. Nobody knew that, because nobody had counted. I counted, and then I rebuilt the app.',
      meta: [
        {
          label: 'Role',
          value:
            'Product Designer and Product Manager. Sole designer on a team of 12 PMs; also ran participant training. DribbleCollect*',
          note: '*DribbleCollect isn’t a real company. This work comes from a real project under NDA. The client name is the only thing that changed.',
        },
        { label: 'Platform', value: 'Native iOS (SwiftUI), site-issued iPhones' },
        {
          label: 'Result',
          value: 'Completion 40% → 80%. Error-free entries 60% → 95%. Support tickets down by half.',
          note: 'Before: counted by hand across live studies. After: event tracking in the new app, first on two studies with about 200 participants, then every client that migrated.',
        },
      ],
      heroLayout: 'stacked',
      heroMedia: {
        src: '/work/epro/hero-hands.webp',
        alt: 'A clinician in a white coat with a stethoscope holds a phone in both hands.',
        variant: 'bleed',
      },
      story: [
        {
          kicker: 'The problem',
          body: [
            'Every training session I ran ended the same way.',
            '> Where do I press? Is 10 good or bad? Did that save? Where do I go now?',
            'These were people over 60, using a tool a study told them to use, on a phone the site handed them. Every bit of friction was a missing data point.',
          ],
          media: [
            {
              src: '/work/epro/before-after-summary.webp',
              alt: 'Before and after of the entry summary. Before: the legacy Confirm Entry Summary screen, a plain two-column list of questions and answers with small Ok and Cancel links in the corner. After: the rebuilt Your evening diary review, marked Submitted 7:30 pm and editable until 7:30 pm tomorrow, with answers grouped under How you feel and symptom rings for pain, nausea and overall.',
              caption: 'The entry summary, before and after. The legacy screen was pitched and sold to clients exactly like this. Nothing could be read from the database automatically, so every answer was typed in by hand, and the button that completed the entry was easy to lose on the summary screen.',
              variant: 'bleed',
            },
          ],
        },
        {
          kicker: 'The number nobody had',
          body: [
            '- There was no analytics tooling. I pulled the numbers by hand, one live study at a time.',
            '- The app was a web wrapper on a legacy database engineers called “the scrolls.” One new question type: 15 engineering hours plus 2 of validation.',
            '- Leadership had heard “the app is bad” for years. They’d never heard “the app costs 17 hours per question.” A pitch built on taste would have died in the room. This one was built on hours.',
          ],
          media: [
            {
              src: '/work/epro/baseline-numbers.webp',
              alt: 'Four baseline number cards: 4 in 10 participants finished a questionnaire; 6 in 10 of those finished without an error; about 15 hours of engineering per new question type; plus 2 hours of validation on top of each one.',
              caption: 'Every one of these numbers was counted manually. That was the first finding.',
              variant: 'bleed',
            },
          ],
        },
        {
          kicker: 'The rules',
          heading:
            'Effortless daily completion · Respect the validated instrument · Visible compliance, no nagging · Trust over speed',
          body: [
            'The colours stayed because a palette change meant a brand review with every live sponsor and retraining people who had just learned the old look. The budget went to components, where the completion problem lived. I’d make the same call.',
            '> Sponsors kept asking for in-app messaging with coordinators. I asked the coordinators. Immediate no: one more inbox on a job that already had too many. The sponsor saw a feature. The coordinators saw their evening. I sided with the coordinators.',
          ],
        },
        {
          kicker: 'Four decisions',
          decisions: [
            {
              title: 'The pain scale',
              image: {
                src: '/work/epro/pain-scale-results.webp',
                alt: 'Three versions of “How much pain do you have right now?” answered with 7, Quite a lot: a slider labelled finished third, a vertical list from Worst pain 10 to No pain 1 labelled shipped, and a grid of number buttons labelled tied.',
              },
              chose: 'A vertical list of numbers.',
              rejected:
                'The slider I walked in expecting to pick. Smallest target on the screen, most ways to overshoot it. Finished third with 20 testers, half over 60.',
              cost: 'Two weeks of live data on the two finalists, which produced a tie. Leadership broke it on taste. Once the data said both worked, taste was the only thing left.',
              now: 'I’d make the same call.',
            },
            {
              title: 'The diary window',
              image: {
                src: '/work/epro/diary-window-and-done.webp',
                alt: 'Two screens. Open now, and what’s next: the home screen greeting Maria with an Evening diary card and Start button, Day 23 of 84 in the SUNRISE Study, and tomorrow’s morning diary opening at 7:00 am with a reminder on. Done, with a timestamp: the evening diary marked Submitted 7:30 pm and editable until 7:30 pm tomorrow.',
              },
              chose: 'One reminder, a visible open/closed window, a done state that says exactly when the entry counted.',
              rejected:
                'Escalating reminders and a hard lock at window close. Both sponsor asks. Both would have raised compliance on paper by annoying people into quitting.',
              cost: 'A harder conversation with sponsors than a “yes.”',
              now: 'Test reminder timing per study instead of one default schedule.',
            },
            {
              title: 'Two systems for a year',
              chose: 'Run old and new in parallel so studies closing within the year didn’t retrain mid-study.',
              rejected: 'A forced cutover that made the migration chart look clean.',
              cost: 'Two codebases, two training tracks, validation on both, for about a year.',
              now: 'Set the migration cut-off in the contract, so the choice happens at signing.',
            },
            {
              title: 'Easy Mode',
              image: {
                src: '/work/epro/easy-mode-switch.webp',
                alt: 'Easy Mode switched on: a question in Easy Mode with larger type, a “Pick one” hint, bigger option rows and a “Speak your answer” button, beside the Display and reading settings card with Easy mode on and Read questions aloud off.',
              },
              chose: 'One switch that turns on high contrast and larger text together.',
              rejected:
                'A settings menu of contrast, text size, reduce motion. More flexible, and nobody over 60 was going to find it.',
              cost: 'A second set of component states.',
              now: 'Almost nobody found the switch alone. When a coordinator or family member turned it on, they kept it. I’d designed accessibility as a setting; it turned out to be a handoff. It belongs in onboarding.',
            },
          ],
        },
        {
          kicker: 'What changed',
          body: [
            '- Completion: 40% → 80%',
            '- Error-free entries: 60% → 95%',
            '- New question type: about 10 fewer engineering hours',
            '- The app went from the slide we skipped in demos to the one we led with',
          ],
          // The functional prototype lives in /public/work/epro/prototype,
          // exported from the design canvas with its runtime and design system.
          prototype: {
            src: '/work/epro/prototype/index.html',
            title: 'Interactive ePRO prototype: Maria’s evening diary. Tap Start on the diary card to walk through the questionnaire.',
            caption: 'The prototype is the easy part to show. The part that mattered is how cheap it became to change. Tap Start to answer Maria’s evening diary; the settings gear turns on Easy Mode.',
            aspect: '390 / 844',
          },
        },
        {
          kicker: 'The training room',
          body: 'The training sessions changed too. The same hands stopped going up. People just answered the question, which was the only thing we had ever asked them to do.',
        },
      ],
    },
  },
  {
    slug: 'deid',
    index: '02',
    title: 'Automating Medical-Image Redaction Without Losing Human Control',
    shortTitle: 'De-Identification',
    category: 'Clinical Imaging / FDA-Regulated SaaS',
    description:
      'A new medical-image redaction tool built inside FDA-regulated clinical-trial software. It replaced slow, manual work with auditable automation while keeping reviewers in control.',
    art: 'imaging',
    cover: {
      src: '/work/deid/card-cover.jpg',
      alt: 'Black-and-white sheet of axial brain CT slices on a light box, with patient name, date and scanner details printed in the margins.',
      width: 2000,
      height: 1333,
    },
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
      outcomesHeading: { lead: 'Every objective, ', em: 'delivered', tail: '.' },
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
    title: 'Designing trust into ambiguous systems: a crypto cashier',
    shortTitle: 'Cashier',
    category: 'Functional UI / 0-1 / Payments',
    description:
      'A sportsbook and a crypto wallet are two systems that never explain themselves to each other, and the user stands between them with real money. I rebuilt the cashier that joins them so every screen answers one question: where is my money right now?',
    cover: {
      src: '/work/cashier/card-cover.webp',
      alt: 'Two phones on a sand-coloured surface: one showing a Link a wallet to get paid screen listing MetaMask, Coinbase Wallet, WalletConnect and Phantom, the other a Withdrawal on its way confirmation with a pending transaction status.',
      width: 1920,
      height: 1440,
    },
    caseStudy: {
      summary: [
        'A sportsbook and a crypto wallet never explain themselves to each other. The user stands between them with real money.',
        'The cashier that joined them was a vendor iframe nobody in house could change. In three weeks I rebuilt it as functional UI: a system of states, each with a visual indicator, so a user never has to ask where their money is.',
        'Withdrawal time on the prototype went from ~4 minutes to ~1 via unmoderated testing. The stake: a failed deposit is a support ticket. A failed withdrawal is a chargeback, a one-star review that says “scam,” and a complaint to the regulator.',
      ],
      meta: [
        { label: 'Role', value: 'Senior product designer' },
        { label: 'Team', value: '1 designer, 1 PM, leadership' },
        { label: 'Tools', value: 'Figma, Claude, Paper.design, GitHub' },
        { label: 'Timeline', value: '7 weeks total; 3 week design, 4 week engineering' },
      ],
      heroLayout: 'stacked',
      heroDevice: {
        backdrop: '/work/cashier/hero-backdrop.webp',
        screens: [
          {
            src: '/work/cashier/hero-1-link-wallet.png',
            label: 'Link a wallet',
            alt: 'Link a wallet to get paid: a list of wallet extensions with MetaMask detected and connected, Coinbase Wallet, WalletConnect and Phantom, plus a link to enter an address manually.',
          },
          {
            src: '/work/cashier/hero-2-amount.png',
            label: 'Enter amount',
            alt: 'Withdrawal form with the connected MetaMask wallet, currency, a dollar amount with MAX, the balance beneath, and three network fee tiers.',
          },
          {
            src: '/work/cashier/hero-3-review.png',
            label: 'Review',
            alt: 'Review sheet listing destination wallet, network, fee, amount received, and arrival time, with a note that nothing moves until confirmed in the wallet.',
          },
        ],
      },
      problem: {
        kicker: 'The problem & the brief',
        lead: [
          'The current state was a Fortris iframe dropped into an account page.',
          'Leadership had decided to bring the cashier in-house, to stop being limited by the vendor and to stop paying for it. The bill: roughly 3 weeks of research and 4 weeks of engineering, plus owning compliance, uptime and every future wallet integration ourselves. I inherited the decision and the bill.',
          '- Users picked a “wallet” that was really a coin.',
          '- Everything was typed by hand, hopping between apps.',
          '- Identity checks (KYC), the highest-stakes step, landed randomly in the middle.',
          '- Every step asked for trust. Every step caused uncertainty.',
          'The brief, in total: “Build a new crypto cashier and make it better than what we have.” No metric, no scope, no user.',
          'My first job was deciding what “better” meant. To me: the user never has to wonder whether their money moved.',
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
        lead: [
          'The first of Nielsen Norman Group’s usability heuristics is visibility of system status: keep users informed with timely, appropriate feedback. With money in flight, that means two things on every screen.',
          '- A state: idle, validating, pending, confirmed, or failed.',
          '- A status the user can verify: a confirmation count, a transaction link, a fee shown before commit.',
          'The rest of the screens follow from four standard heuristics: prevent errors, show rather than ask users to remember, speak in the user’s words, treat failure as a state with one next action.',
        ],
        findings: [],
      },
      solution: {
        heading: { lead: 'Four rules, ', em: 'every screen', tail: '.' },
        lead: [
          'Every screen in the new cashier is a state with a visible status, so nobody has to guess what is happening with their money.',
          'Three decisions',
          'One coin, not six. The brief was “build a better cashier.” The COO wanted the widest payment funnel: more coins, more ways to deposit. I had no access to the vendor and couldn’t verify what they supported or how the coins were used. I made a different bet: we were losing people on completion, not on choice, and one coin with a flow users could finish would move more money than six they abandoned. The cost was funnel breadth, and the COO’s goal, which I couldn’t validate. If drop-off was really about coin availability, this was the wrong call.',
          'MetaMask first, not a coin picker. My first prototypes were the vendor flow with better UI. When I got in front of users, the complaint wasn’t the screens, it was typing everything by hand. Nobody had put a wallet integration on the table. I made the case for it; the COO wanted the picker users already knew, which is a legitimate argument. We tested both. The integration won on time to completion.',
          'Withdrawal before deposit. Someone putting $5 into a sportsbook has already written it off. A deposit that fails is annoying. A withdrawal that fails is the moment the whole product becomes a scam in their head. The risk was asymmetric, so the two weeks went where the downside was unbounded. Deposit came second.',
          'Four rules shaped every screen. Click through them below.',
        ],
        walkthrough: {
          steps: [
            {
              title: 'Error prevention by default',
              body: 'Most mistakes in the old flow came from typing an address. So the screen leads with what the phone already knows.',
              src: '/work/cashier/hero-1-link-wallet.png',
              alt: 'Link a wallet to get paid, with MetaMask detected and connected at the top and a small link to enter an address manually at the bottom.',
              callouts: [
                { x: 3, y: 31.5, w: 94, h: 11, note: 'MetaMask was detected, so it is pre-selected. One tap, nothing to type.' },
                { x: 18, y: 81, w: 64, h: 5, note: 'Typing an address is still possible, as a secondary link for the few who need it.' },
              ],
            },
            {
              title: 'Decision-making in one state',
              body: 'Every decision that affects the transaction is made on the screen that shows it. Nothing lives behind a settings page, so nothing has to be remembered.',
              src: '/work/cashier/hero-2-amount.png',
              alt: 'Withdrawal form with the connected wallet, currency, amount with MAX, balance beneath, and three fee tiers.',
              callouts: [
                { x: 3, y: 24.5, w: 94, h: 9, note: 'The destination wallet, with Change right beside it.' },
                { x: 3, y: 48.5, w: 94, h: 23, note: 'Amount, balance, and fee tier together. Edit any of them in place.' },
              ],
            },
            {
              title: 'You always know where the money is',
              body: 'Once money is in flight, silence reads as failure. The screen keeps answering the only question that matters: where is it now?',
              src: '/work/cashier/screen-pending.png',
              alt: 'Withdrawal on its way, with a pending badge reading 1 of 3 confirmations, the destination address, a transaction link, and a note that the wallet is saved.',
              callouts: [
                { x: 1, y: 44, w: 98, h: 16, note: 'A pending badge with the confirmation count, the destination, and a link to verify on chain.' },
                { x: 1, y: 62, w: 98, h: 6.5, note: 'The wallet is saved, and the screen says what that means next time.' },
              ],
            },
            {
              title: 'Guardrails at every corner',
              body: 'The interface catches the mistake before the user can submit it.',
              src: '/work/cashier/screen-balance-error.png',
              alt: 'Withdrawal form with the amount field outlined in red, a message that amount plus fee exceeds the balance, a note on what MAX sends, and a disabled Review withdrawal button.',
              callouts: [
                { x: 3, y: 36, w: 94, h: 17.5, note: 'The field turns red, says what is wrong, and says what MAX would send instead.' },
                { x: 3, y: 86.5, w: 94, h: 7, note: 'The primary button stays disabled until the numbers work.' },
              ],
            },
          ],
        },
        media: {
          src: '/work/cashier/flow-wallet-connected.png',
          alt: 'Flowchart: purchase and redeem split at the top, package or currency selection, a KYC gate that only appears when verification is incomplete, then the in-house cashier and a confirmation screen.',
          caption:
            'The flow the screens hang off. Purchase and redeem split at the top, the KYC gate only appears when verification is incomplete, and every path ends on a confirmation screen instead of a copied address. KYC moved to signup and is offered again before withdrawal, because legally it has to happen before money leaves. That adds friction at signup. I took it: friction at signup is recoverable, friction mid-withdrawal is the scam moment again.',
        },
      },
      reflection: {
        kicker: 'Reflection',
        lead: 'A few scenarios I worked through, and what each one taught me about designing for money in flight.',
        items: [
          {
            title: 'The user closes the app mid-transaction',
            body: [
              'Money in flight does not wait for the app to be open.',
              '- The pending state survives the app closing.',
              '- The status is mirrored in history.',
              '- A push notification closes the loop when it confirms.',
              'Coming back never means starting over.',
            ],
          },
          {
            title: 'The connected wallet changes between sessions',
            body: [
              'Browser wallets switch accounts silently. I added a wallet-changed state that does three things.',
              '- Shows the new address.',
              '- Says plainly that it changed.',
              '- Asks the user to confirm it or reconnect the previous one.',
              'One screen, two safe exits.',
            ],
          },
          {
            title: 'The network fee moves between review and confirm',
            body: [
              'Fees are live.',
              '- If the quoted fee changed before approval, the review sheet re-rendered with the new number.',
              '- The wallet never shows a figure the user has not already seen.',
              'The rule: the app never lets a number surprise the user.',
            ],
          },
          {
            title: 'What I’d change',
            body: [
              'The research that found the wallet problem came in week two and cost a week of rework. Run first, it would have cost three days. I asked for it, was pushed to skip it, and didn’t make the case in those terms. Now I would.',
              'I handed off the full flow with every state specified and tested on prototypes. The contract ended before launch, so there are no production numbers.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'system',
    index: '04',
    title: 'Designing Systems That Scale',
    shortTitle: 'System',
    category: 'Design System',
    description:
      'Creating scalable design systems and workflows that enable teams to move faster and build with confidence.',
    cover: {
      src: '/work/system/card-cover.webp',
      alt: 'A translucent panel over a night-time dune landscape showing a two-column grid of blue-toned button components, each labelled with its numeric style token.',
      width: 1920,
      height: 1440,
    },
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
