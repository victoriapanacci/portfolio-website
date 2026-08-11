import Link from 'next/link'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { projects } from '@/lib/projects'

/**
 * Version 3 — Index Table.
 * A compact statement, then the work as a designed typographic table with
 * discipline and status in line. Dense and legible, same palette and type.
 */
export function VersionThree() {
  return (
    <main className="v3">
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section id="top" className="v3-hero shell">
        <div className="hero-light" aria-hidden="true" />
        <p className="eyebrow reveal">Senior Product Designer — Toronto</p>
        <h1 className="reveal">
          I design for the <em>complicated</em> parts.
        </h1>
        <p className="hero-body reveal">
          I work where user trust, technical complexity, and organizational
          scale meet.
        </p>
      </section>

      <section id="work" className="v3-work shell">
        <div className="section-kicker">
          <span>Featured work</span>
          <i />
        </div>

        <div className="v3-table" role="table" aria-label="Featured work">
          <div className="v3-table__head" role="row">
            <span role="columnheader">№</span>
            <span role="columnheader">Project</span>
            <span role="columnheader">Discipline</span>
            <span role="columnheader">Status</span>
            <span role="columnheader" aria-hidden="true" />
          </div>
          {projects.map((project) => {
            const hasStudy = Boolean(project.caseStudy)
            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="v3-table__row reveal-on-scroll"
                role="row"
              >
                <span className="v3-cell v3-cell--index" role="cell">
                  {project.index}
                </span>
                <span className="v3-cell v3-cell--title" role="cell">
                  {project.title}
                </span>
                <span className="v3-cell v3-cell--cat" role="cell">
                  {project.category}
                </span>
                <span className="v3-cell v3-cell--status" role="cell">
                  <i className={hasStudy ? 'dot dot--live' : 'dot'} />
                  {hasStudy ? 'Case study' : 'Soon'}
                </span>
                <span className="v3-cell v3-cell--arrow" role="cell" aria-hidden="true">
                  →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
