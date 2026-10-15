import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { DecisionCards, type Decision } from '@/components/design-system/DecisionCards'
import { GateDemo } from '@/components/design-system/GateDemo'
import { LightboxMedia } from '@/components/design-system/LightboxMedia'
import { StatesDemo } from '@/components/design-system/StatesDemo'
import { StatsStrip } from '@/components/design-system/StatsStrip'
import { TokenGrid } from '@/components/design-system/TokenGrid'
import { WorkflowStepper } from '@/components/design-system/WorkflowStepper'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeadline } from '@/components/motion/SplitHeadline'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { RichText } from '@/components/RichText'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getProject } from '@/lib/projects'
import { getColourTokens } from '@/lib/tokens'

const SLUG = 'design-system'

const title = 'Bet105 design system'
const subtitle = 'A rule book for a team that ships by prompt'

export const metadata: Metadata = {
  title: 'Victoria Panacci: Design system',
  description: `${title}. ${subtitle}.`,
}

const meta = [
  { label: 'Role', value: 'Senior Product Designer, Madhaus.io' },
  { label: 'Timeline', value: 'About 2.5 months' },
  { label: 'Team', value: 'One engineer, one PM' },
]

const decisions: Decision[] = [
  {
    title: 'Foundation first, UI second.',
    lead: 'The visible problem was ugly screens. The real problem was that nothing constrained what the AI generated.',
    beats: [
      {
        label: 'What I chose',
        body: 'Build the token layer and patterns before touching any UI. Fixing screens without fixing tokens meant the next prompt would break them again. A real system takes months, not weeks, and I said so at the start.',
      },
      {
        label: 'What I rejected',
        body: 'A visual refresh first. It would have looked like progress for exactly one PR.',
      },
      {
        label: 'What it cost',
        body: 'Six weeks before anything looked different, and real friction with leadership who wanted a new face on the product immediately. I knew that was the trade and took it.',
      },
      {
        label: 'What I’d change',
        body: 'See “Ship one screen by week two” below.',
      },
    ],
  },
  {
    title: 'Make myself unnecessary at the gate.',
    lead: 'With everyone pushing PRs, every PR came to me for a manual check. I became the bottleneck on the team’s output.',
    beats: [
      {
        label: 'What I chose',
        body: 'Put the rules into the tool. Claude was handed the token JSON and a short set of rules: master components in the root were locked, every build went through settings passes against the tokens, and nothing could be pushed as a PR until it cleared a hard pass/fail check. Same idea as a test suite. The rules ran whether or not I was in the room.',
      },
      {
        label: 'What I rejected',
        body: 'Reviewing faster. It doesn’t scale past one person.',
      },
      {
        label: 'What it cost',
        body: 'I gave up first look at every screen, and some things shipped that I’d have caught earlier.',
      },
      {
        label: 'What it bought',
        body: 'The team’s throughput stopped depending on my calendar. I stopped being an approver and worked as a design engineer, reviewing after the fact.',
      },
    ],
  },
]

const laterDecisions: Decision[] = [
  {
    title: 'A gallery, not Storybook.',
    lead: 'People still needed a human-readable view of the system.',
    beats: [
      {
        label: 'What I chose',
        body: 'A small page, built with the engineer in Claude, that re-reads the token JSON on every refresh and renders the current components, named by the page they live on: bet slip, bet lines, page header. About a day of work.',
      },
      {
        label: 'What I rejected',
        body: 'Storybook. Right answer for a team of twenty. For us, every story was a second thing to maintain, and the maintenance would land on me.',
      },
      { label: 'What it cost', body: 'It was plain to the point of ugly.' },
      { label: 'What it bought', body: 'A reference that was true by construction.' },
    ],
  },
]

const lastDecision: Decision[] = [
  {
    title: 'Keep the existing interaction patterns.',
    lead: 'Leadership wanted something new and flashy.',
    beats: [
      {
        label: 'What I chose',
        body: 'Keep the navigation and interaction structure wherever it worked and spend the budget on standardisation.',
      },
      {
        label: 'What I rejected',
        body: 'A redesign. I said that was a different, longer project and asked whether they’d fund the time. They said no.',
      },
      {
        label: 'What it cost',
        body: 'The system launched looking evolutionary, not revolutionary.',
      },
      {
        label: 'Why it was right',
        body: 'A team that size can’t afford a redesign and a rebuild at once.',
      },
    ],
  },
]

const workflow = [
  { name: 'Figma', line: 'Exploration. Where I think and compare against Mobbin.' },
  { name: 'Claude build', line: 'A rapid build wired to the same JSON the codebase uses.' },
  { name: 'Settings passes', line: 'Every build checked against the tokens, pass by pass.' },
  { name: 'Pass/fail check', line: 'A hard gate. Off-system values fail here.' },
  { name: 'PR', line: 'Only what passed gets pushed. Reviewed after the fact, not before.' },
]

const enabled = [
  {
    title: 'Risk',
    body: '80+ reconciled tokens replacing 200+ duplicate and hardcoded values. Roughly a 60% reduction in the surface area an engineer, or a model, could pick the wrong value from.',
  },
  {
    title: 'Coverage',
    body: 'Every screen across web and mobile moved onto the system. A full brand identity, colour and type for Bet105, live today.',
  },
  {
    title: 'Throughput',
    body: 'The engineer prototyped and launched a new bet slip without me in the room. The PM wrote on-brand copy from the tone documentation without me.',
  },
  {
    title: 'Speed',
    body: 'UI exploration time cut by more than half.',
  },
]

const differently = [
  {
    title: 'Ship one screen on the new tokens by week two.',
    body: 'The foundation was right, but it had no face, and for six weeks the people paying for it couldn’t see it working. A visible slice would have bought the trust the rest of the build needed. Sequence foundation work so it’s legible to the people who have to believe in it.',
  },
  {
    title: 'Start on a headless component library.',
    body: 'The cashier was later built on Base UI and it would have saved time here. Next time the token work goes on top of a library like that from day one, instead of building primitives by hand.',
  },
  {
    title: 'Give the human layer a day of design.',
    body: 'I treated the gallery as plumbing, and the people deciding whether the system was worth it were looking at the plumbing.',
  },
]

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="kicker">
      <span>{children}</span>
      <i />
    </div>
  )
}

export default async function DesignSystemPage() {
  const tokens = await getColourTokens()
  const project = getProject(SLUG)

  return (
    <main id="main">
      <SiteHeader />

      <article className="cs">
        <div className="shell back-link">
          <Button href="/#work" direction="back">
            Back to all work
          </Button>
        </div>

        {/* Hero */}
        <header className="cs-hero shell cs-hero--stacked">
          <div className="cs-hero__copy">
            <SplitHeadline text={title} className="cs-title" />
            <Reveal as="p" className="cs-summary lead" immediate delay={0.5}>
              {subtitle}
            </Reveal>
          </div>
          <Reveal as="dl" className="cs-meta cs-hero__meta" immediate delay={0.65}>
            {meta.map((m) => (
              <div key={m.label} className="cs-meta__item">
                <dt className="label">{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </Reveal>
          <Reveal className="cs-hero__art" immediate delay={0.35}>
            <StatsStrip />
          </Reveal>
        </header>

        {/* The situation */}
        <Reveal as="section" className="cs-section shell">
          <Kicker>The situation</Kicker>
          <div className="lead cs-section__lead cs-section__lead--wide cs-rich">
            <RichText
              text={[
                'Madhaus had never had an in-house designer. Fractional designers handed off screens and left. Engineers, the PM and I were all designing features and pushing PRs, and most of that work ran through AI: prompt, generate, open a PR.',
                'What that looked like:',
                '- The core palette wasn’t standardised, so the codebase had over 200 duplicate or hardcoded values for colour, spacing and type.',
                '- Engineers were prompting a generic Claude Code with screenshots and asking it to build around the picture.',
                '- Claude reached for whichever value it found first, the PR shipped, and a page came out wrong. “Why does this page look different?” had no answer.',
                'The brief was “build a design system in two weeks.” The team was me, one engineer and a PM. That headcount decided most of what follows.',
              ]}
            />
          </div>
          <LightboxMedia
            media={{
              src: '/work/design-system/before-three-blues.png',
              alt: 'Grainy screenshot of the sportsbook before the system, with three different blues on one page.',
              caption: 'Before. Three blues on one page and nobody could say which was right.',
            }}
          />
        </Reveal>

        {/* What a design system is */}
        <Reveal as="section" className="cs-section shell">
          <Kicker>What a design system is, in plain terms</Kicker>
          <p className="lede ds-lede">It’s the rule book everyone agrees to before the game starts.</p>
          <div className="lead cs-section__lead cs-section__lead--wide cs-rich">
            <RichText
              text={[
                '- Tokens are the words: this blue, this spacing, this radius. Decided once, named once.',
                '- Components are the sentences built from those words: a button, an odds cell, a bet slip.',
                '- States are what each sentence looks like in every situation it will meet: selected, empty, unavailable, pending.',
              ]}
            />
          </div>
          <StatesDemo />
          <p className="caption ds-caption">
            That one row is the whole idea. Decided once, so nobody decides it again, and so the
            model generating the next screen can’t invent a fourth version.
          </p>
        </Reveal>

        {/* What I decided */}
        <Reveal as="section" className="cs-section shell">
          <Kicker>What I decided</Kicker>
          <DecisionCards decisions={decisions} />
          <GateDemo />
          <WorkflowStepper steps={workflow} />
          <div className="ds-decisions-more">
            <DecisionCards decisions={laterDecisions} startIndex={2} />
          </div>
          <LightboxMedia
            media={{
              src: '/work/design-system/gallery.png',
              alt: 'The component gallery page: the current tokens and components rendered from the token JSON, named by the page they live on.',
              caption: 'The gallery. Ugly, always current.',
            }}
          />
          <div className="ds-decisions-more">
            <DecisionCards decisions={lastDecision} startIndex={3} />
          </div>
        </Reveal>

        {/* What it enabled */}
        <Reveal as="section" className="cs-section shell">
          <Kicker>What it enabled</Kicker>
          <LightboxMedia
            media={{
              src: '/work/design-system/system-beside-live.png',
              alt: 'The Figma page composition on the left beside the live Bet105 sportsbook home on the right.',
              caption: 'Left, the system. Right, the shipped page.',
              variant: 'bleed',
            }}
          />
          <div className="cs-outcomes ds-enabled">
            {enabled.map((e) => (
              <div key={e.title} className="card cs-outcome">
                <h3>{e.title}</h3>
                <p>{e.body}</p>
              </div>
            ))}
          </div>
          <p className="lead ds-after">
            My time went to usability testing and the flows that drive conversion, instead of
            policing pixels on every PR.
          </p>
          <LightboxMedia
            media={{
              src: '/work/design-system/unit-betting-three-widths.png',
              alt: 'Unit-based betting: the settings panel shown at three widths beside the bet slip.',
              caption:
                'One setting, three breakpoints, and the slip updates to match. Built from existing tokens and states, no new primitives.',
            }}
          />
          <LightboxMedia
            media={{
              src: '/work/design-system/bet-slip-states.png',
              alt: 'Bet slip component sheet showing the pending, singles, parlay and empty states.',
              caption: 'Bet slip states. Pending, singles, parlay, empty.',
            }}
          />
          <p className="lead cs-rich ds-after">
            The cashier rebuild sits on the same foundation. That story is{' '}
            <Link href="/work/cashier">here</Link>.
          </p>
        </Reveal>

        {/* What I'd do differently */}
        <Reveal as="section" className="cs-section shell">
          <Kicker>What I’d do differently</Kicker>
          <div className="cs-findings ds-three">
            {differently.map((d) => (
              <div key={d.title} className="card cs-finding">
                <div className="cs-rich">
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Easter egg */}
        <Reveal as="section" className="cs-section shell">
          <Kicker>Easter egg</Kicker>
          <TokenGrid tokens={tokens} />
          <p className="caption ds-caption">
            This site runs on the same approach, JSON tokens first. These are its live colour
            tokens, read from the file the site builds from. Click one to copy its name.
          </p>
        </Reveal>
      </article>

      <ProjectShowcase variant="quick" kicker="More work" excludeSlug={project?.slug ?? SLUG} />

      <SiteFooter />
    </main>
  )
}
