import type { Metadata } from 'next'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeadline } from '@/components/motion/SplitHeadline'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Victoria Panacci',
  description:
    'I design the parts of money and medicine nobody should have to think about. Senior Product Designer, Toronto. Previously Axiom Real-Time Metrics-Sitero and Madhaus.io.',
}

export default function Home() {
  return (
    <main id="main">
      <SiteHeader />

      <section id="top" className="hero shell">
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-copy">
          <SplitHeadline text="I design the parts of money and medicine nobody should have to think about" />
          <Reveal as="p" className="hero-body lead" immediate delay={0.55}>
            Senior Product Designer, Toronto. Previously{' '}
            <a href="https://sitero.com/" target="_blank" rel="noopener noreferrer">
              Axiom Real-Time Metrics-Sitero
            </a>{' '}
            and{' '}
            <a href="https://madhaus.io/" target="_blank" rel="noopener noreferrer">
              Madhaus.io
            </a>
          </Reveal>
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Selected work" />

      <SiteFooter />
    </main>
  )
}
