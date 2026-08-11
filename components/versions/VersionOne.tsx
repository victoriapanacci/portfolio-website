import Link from 'next/link'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { projects } from '@/lib/projects'

/**
 * Version 1 — Colossal.
 * A full-height serif statement, then the work as oversized full-width rows
 * that grow on hover. Same ink/cream/rose palette and Georgia display type.
 */
export function VersionOne() {
  return (
    <main className="v1">
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section id="top" className="v1-hero shell">
        <div className="hero-light" aria-hidden="true" />
        <p className="eyebrow reveal">
          Senior Product Designer — Toronto
        </p>
        <h1 className="v1-title reveal">
          I design for the <em>complicated</em> parts.
        </h1>
        <div className="v1-hero-foot reveal">
          <p>
            I work where user trust, technical complexity, and organizational
            scale meet.
          </p>
          <Link href="#work">Explore my work →</Link>
        </div>
      </section>

      <section id="work" className="v1-work shell">
        <div className="section-kicker">
          <span>Featured work</span>
          <i />
        </div>

        <ul className="v1-list">
          {projects.map((project) => {
            const hasStudy = Boolean(project.caseStudy)
            return (
              <li key={project.slug} className="v1-row reveal-on-scroll">
                <Link href={`/work/${project.slug}`}>
                  <span className="v1-row__index">{project.index}</span>
                  <span className="v1-row__title">{project.title}</span>
                  <span className="v1-row__meta">
                    <span className="v1-row__cat">{project.category}</span>
                    <span className="v1-row__status">
                      {hasStudy ? 'Case study' : 'Soon'}
                    </span>
                  </span>
                  <span className="v1-row__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <SiteFooter />
    </main>
  )
}
