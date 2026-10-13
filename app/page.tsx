import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ArrowLink'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'VP: Home',
  description:
    'Senior Product Designer in Toronto turning complex, data-heavy workflows into products that feel simple.',
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
            (clinical research organization) and{' '}
            <a href="https://madhaus.io/" target="_blank" rel="noopener noreferrer">
              Madhaus.io
            </a>{' '}
            (sportsbook &amp; casino)
          </p>
          <ArrowLink href="#work">Featured projects</ArrowLink>
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Featured projects" />

      <SiteFooter />
    </main>
  )
}
