import Link from 'next/link'
import { ProjectArt } from '@/components/ProjectArt'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { projects } from '@/lib/projects'

/**
 * Version 4 — Filmstrip.
 * Hero copy sits beside a horizontal, snapping gallery of framed project
 * panels built from the existing ProjectArt. Same palette and type.
 */
export function VersionFour() {
  return (
    <main className="v4">
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section id="top" className="v4-hero shell">
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

      <section id="work" className="v4-work">
        <div className="v4-work__kicker shell">
          <div className="section-kicker">
            <span>Featured work — scroll sideways</span>
            <i />
          </div>
        </div>

        <div className="v4-strip">
          {projects.map((project) => {
            const hasStudy = Boolean(project.caseStudy)
            return (
              <article key={project.slug} className="v4-panel reveal-on-scroll">
                <Link href={`/work/${project.slug}`}>
                  <div className="v4-panel__art">
                    <ProjectArt type={project.art} />
                  </div>
                  <div className="v4-panel__foot">
                    <span className="v4-panel__index">{project.index}</span>
                    <div>
                      <h3>{project.title}</h3>
                      <p className="project-category">{project.category}</p>
                    </div>
                    <span className="v4-panel__status">
                      {hasStudy ? 'Case study →' : 'Soon'}
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
