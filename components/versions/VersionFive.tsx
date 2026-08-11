import Link from 'next/link'
import { ProjectArt } from '@/components/ProjectArt'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { projects } from '@/lib/projects'

const disciplines = [
  'Product Design',
  'Design Systems',
  'Regulated SaaS',
  'Mobile',
  'User Trust',
  'Zero-to-One',
]

/**
 * Version 5 — Manifesto.
 * A centered serif statement over a moving discipline rail, then work in a
 * deliberately uneven offset grid. Same palette and type.
 */
export function VersionFive() {
  return (
    <main className="v5">
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section id="top" className="v5-hero shell">
        <div className="hero-light" aria-hidden="true" />
        <p className="eyebrow reveal">Senior Product Designer — Toronto</p>
        <h1 className="reveal">
          I design for the <em>complicated</em> parts.
        </h1>
        <p className="hero-body reveal">
          I work where user trust, technical complexity, and organizational
          scale meet.
        </p>
        <Link className="v5-hero__link reveal" href="#work">
          Explore my work →
        </Link>
      </section>

      <div className="v5-rail" aria-hidden="true">
        <div className="v5-rail__track">
          {[...disciplines, ...disciplines].map((d, i) => (
            <span key={i}>
              {d}
              <i aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <section id="work" className="v5-work shell">
        <div className="section-kicker">
          <span>Featured work</span>
          <i />
        </div>

        <div className="v5-grid">
          {projects.map((project, idx) => {
            const hasStudy = Boolean(project.caseStudy)
            return (
              <article
                key={project.slug}
                className={`v5-card v5-card--${idx % 2 === 0 ? 'tall' : 'short'} reveal-on-scroll`}
              >
                <Link href={`/work/${project.slug}`}>
                  <div className="v5-card__art">
                    <ProjectArt type={project.art} />
                  </div>
                  <div className="v5-card__body">
                    <span className="v5-card__index">{project.index}</span>
                    <h3>{project.title}</h3>
                    <p className="project-category">{project.category}</p>
                    <p className="v5-card__desc">{project.description}</p>
                    <span className="v5-card__link">
                      {hasStudy ? 'View case study →' : 'Coming soon'}
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
