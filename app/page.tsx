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
            I design for the <em>complicated</em> parts.
          </h1>
          <p className="hero-body">
            I take complex, data-heavy workflows and turn them into products
            that feel simple to use. The complexity stays underneath, where the
            people using the product don&rsquo;t have to carry it.
          </p>
          <ArrowLink href="#work">See the work</ArrowLink>
        </div>
      </section>

      <ProjectShowcase variant="full" kicker="Featured work" />

      <SiteFooter />
    </main>
  )
}
