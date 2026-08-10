import Link from 'next/link'
import { projects } from '@/lib/projects'
import { ProjectCard } from './ProjectCard'

type Props = {
  /** 'full' = the featured card grid (home). 'quick' = compact links (project pages). */
  variant?: 'full' | 'quick'
  /** Kicker label shown above the section. */
  kicker?: string
  /** Slug to exclude from the list — used on a project page to hide the current project. */
  excludeSlug?: string
}

/**
 * The single source of truth for the project card section.
 * Used on the home page (full grid) and on every project page (quick links),
 * so adding a project to `lib/projects.ts` updates both automatically.
 */
export function ProjectShowcase({
  variant = 'full',
  kicker = 'Featured work',
  excludeSlug,
}: Props) {
  const list = excludeSlug
    ? projects.filter((p) => p.slug !== excludeSlug)
    : projects

  return (
    <section id="work" className="work shell">
      <div className="section-kicker">
        <span>{kicker}</span>
        <i />
      </div>

      {variant === 'full' ? (
        <div className="project-grid">
          {list.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <ul className="quick-links">
          {list.map((project) => {
            const hasStudy = Boolean(project.caseStudy)
            return (
              <li key={project.slug} className="quick-link reveal-on-scroll">
                <Link href={`/work/${project.slug}`}>
                  <span className="quick-link__index">{project.index}</span>
                  <span className="quick-link__body">
                    <span className="quick-link__title">{project.title}</span>
                    <span className="quick-link__category">
                      {project.category}
                    </span>
                  </span>
                  <span className="quick-link__arrow" aria-hidden="true">
                    →
                  </span>
                  {!hasStudy && (
                    <span className="quick-link__soon">Soon</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
