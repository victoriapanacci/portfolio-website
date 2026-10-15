import Link from 'next/link'
import { projects } from '@/lib/projects'
import { Reveal, StaggerGroup, StaggerItem } from './motion/Reveal'
import { ProjectCard } from './ProjectCard'

type Props = {
  /** 'full' = the featured card grid (home). 'quick' = compact links (project pages). */
  variant?: 'full' | 'quick'
  /** Kicker label shown above the section. */
  kicker?: string
  /** Slug to exclude from the list, used on a project page to hide the current project. */
  excludeSlug?: string
}

/**
 * The single source of truth for the project list. Used on the home page
 * (full grid), the About page and every project page (quick links), so
 * adding a project to `lib/projects.ts` updates all of them.
 */
export function ProjectShowcase({
  variant = 'full',
  kicker = 'Selected work',
  excludeSlug,
}: Props) {
  const list = excludeSlug
    ? projects.filter((p) => p.slug !== excludeSlug)
    : projects

  return (
    <section
      id="work"
      className={`work shell ${variant === 'full' ? 'work--grid' : ''}`}
    >
      <Reveal className="kicker">
        <span>{kicker}</span>
        <i />
      </Reveal>

      {variant === 'full' ? (
        <StaggerGroup className="project-grid">
          {list.map((project) => (
            <StaggerItem key={project.slug} className="project-grid__item">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <Reveal as="ul" className="quick-links">
          {list.map((project) => {
            const hasStudy = Boolean(project.caseStudy)
            const category = project.category
              .split('/')
              .map((tag) => tag.trim())
              .filter(Boolean)
              .join(' · ')
            return (
              <li key={project.slug} className="quick-link">
                <Link href={`/work/${project.slug}`}>
                  <span className="numeral">{project.index}</span>
                  <span className="quick-link__body">
                    <span className="quick-link__title">{project.title}</span>
                    <span className="label">{category}</span>
                  </span>
                  {!hasStudy && (
                    <span className="tag tag--outlined">Coming soon</span>
                  )}
                  <span className="quick-link__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            )
          })}
        </Reveal>
      )}
    </section>
  )
}
