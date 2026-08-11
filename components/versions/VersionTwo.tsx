import Link from 'next/link'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { projects } from '@/lib/projects'

/**
 * Version 2 — Split Editorial.
 * A sticky hero column on the left holds the introduction while a numbered
 * case index reads down the right. Magazine structure, same palette and type.
 */
export function VersionTwo() {
  return (
    <main className="v2">
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <div id="top" className="v2-split shell">
        <aside className="v2-aside reveal">
          <div className="hero-light" aria-hidden="true" />
          <p className="eyebrow">Senior Product Designer — Toronto</p>
          <h1>
            I design for the <em>complicated</em> parts.
          </h1>
          <p className="hero-body">
            I work where user trust, technical complexity, and organizational
            scale meet.
          </p>
          <Link className="v2-aside__link" href="#work">
            Explore my work →
          </Link>
        </aside>

        <section id="work" className="v2-index">
          <div className="section-kicker">
            <span>Featured work</span>
            <i />
          </div>
          <ul>
            {projects.map((project) => {
              const hasStudy = Boolean(project.caseStudy)
              return (
                <li key={project.slug} className="v2-item reveal-on-scroll">
                  <Link href={`/work/${project.slug}`}>
                    <div className="v2-item__top">
                      <span className="v2-item__index">{project.index}</span>
                      <span className="v2-item__status">
                        {hasStudy ? 'Case study' : 'Soon'}
                      </span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="v2-item__cat">{project.category}</p>
                    <p className="v2-item__desc">{project.description}</p>
                    <span className="v2-item__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <SiteFooter />
    </main>
  )
}
