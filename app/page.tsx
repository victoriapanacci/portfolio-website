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
          <h1>
            I make complexity <br />
            feel invisible
          </h1>
          <p className="eyebrow">
            Senior Product Designer in Toronto
          </p>
          <ArrowLink href="#work">Featured Projects</ArrowLink>
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Featured projects" />

      <SiteFooter />
    </main>
  )
}
