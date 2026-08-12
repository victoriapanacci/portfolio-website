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
            Senior Product Designer in Toronto
          </p>
          <h1>
            I make complexity <br />
            feel invisible
          </h1>
          <ArrowLink href="#work" className="mt-14">Featured Projects</ArrowLink>
        </div>
      </section>

      <section id="about" className="about shell reveal-on-scroll">
        <div className="section-kicker">
          <span>Who am I?</span>
          <i />
        </div>
        <p className="about-summary">
          I&apos;m a senior product designer in Toronto who turns complex, data-heavy workflows into products that feel simple, working across gaming, clinical technology, and consumer software from early discovery through shipped product.
        </p>
      </section>

      <ProjectShowcase variant="full" kicker="Featured projects" />

      <SiteFooter />
    </main>
  )
}
