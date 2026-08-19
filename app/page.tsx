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
          <h1>Experienced product designer that makes complexity feel invisible</h1>
          <p className="hero-body">
            I use my extensive experience in UX design, communications, and product to understand why and act strategically. In a world where virtually anyone can build, the decisions that save you money long term are getting to the need as fast as possible.
          </p>
          <ArrowLink href="#work">Featured projects</ArrowLink>
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Featured projects" />

      <SiteFooter />
    </main>
  )
}
