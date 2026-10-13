import type { Metadata } from 'next'
import { HeroScrollCue } from '@/components/HeroScrollCue'
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
    <main>
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section id="top" className="hero shell">
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-copy reveal">
          <h1>I design the parts of money and medicine nobody should have to think about</h1>
          <p className="hero-body">
            Senior Product Designer, Toronto. Previously{' '}
            <a href="https://sitero.com/" target="_blank" rel="noopener noreferrer">
              Axiom Real-Time Metrics-Sitero
            </a>{' '}
            and{' '}
            <a href="https://madhaus.io/" target="_blank" rel="noopener noreferrer">
              Madhaus.io
            </a>
          </p>
          <HeroScrollCue />
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Featured projects" />

      <SiteFooter />
    </main>
  )
}
