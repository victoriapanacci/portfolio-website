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
          <h1>Senior Product Designer based in Toronto. Specialized in making complex, data-heavy interfaces feel seamless</h1>
          <p className="hero-body">
            Previously at{' '}
            <a href="https://madhaus.io/" target="_blank" rel="noopener noreferrer">
              Madhaus.io
            </a>{' '}
            and{' '}
            <a href="https://sitero.com/" target="_blank" rel="noopener noreferrer">
              Axiom Real-Time Metrics-Sitero
            </a>
          </p>
          <ArrowLink href="#work">Featured projects</ArrowLink>
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Featured projects" />

      <SiteFooter />
    </main>
  )
}
