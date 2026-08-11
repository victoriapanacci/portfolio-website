import { ArrowLink } from '@/components/ArrowLink'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export default function Home() {
  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section id="top" className="hero shell">
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow">
            Senior Product Designer
            <br />
            Based in Toronto
          </p>
          <h1>
            I design for the complicated parts.
          </h1>
          <p className="hero-body">
            I work where user trust, technical complexity, and organizational
            scale meet.
          </p>
          <ArrowLink href="#work">Featured Projects</ArrowLink>
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Featured projects" />

      <SiteFooter />
    </main>
  )
}
