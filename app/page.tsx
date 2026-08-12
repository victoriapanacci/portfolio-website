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
          <p className="pill pill--eyebrow">Victoria Panacci, Senior Product Designer</p>
          <h1>
            I make complexity <br />
            feel invisible
          </h1>
          <p className="hero-body">
            I&apos;m a senior product designer in Toronto who turns complex, data-heavy workflows into products that feel simple, working across gaming, clinical technology, and consumer software from early discovery through shipped product.
          </p>
          <ArrowLink href="#work">Featured projects</ArrowLink>
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Featured projects" />

      <SiteFooter />
    </main>
  )
}
