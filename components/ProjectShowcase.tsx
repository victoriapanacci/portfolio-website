import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/lib/projects'
import { Icon } from './Icon'
import { ProjectCard } from './ProjectCard'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

type Props = {
  /** 'full' = the featured card grid (home). 'quick' = compact links (project pages). */
  variant?: 'full' | 'quick'
  /** Section label shown above the heading. */
  label?: string
  /** Section heading. */
  title?: string
  /** Slug to exclude from the list, used on a project page to hide the current project. */
  excludeSlug?: string
}

/**
 * The single source of truth for the project list. Used on the home page
 * (full grid) and on every project page (quick links), so adding a project
 * to `lib/projects.ts` updates both automatically.
 */
export function ProjectShowcase({
  variant = 'full',
  label = 'Selected work',
  title = 'Featured projects',
  excludeSlug,
}: Props) {
  const list = excludeSlug
    ? projects.filter((p) => p.slug !== excludeSlug)
    : projects

  return (
    <section id="work" className="section shell">
      <Reveal className="section-head">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="section-title">{title}</h2>
      </Reveal>

      {variant === 'full' ? (
        <div className="project-grid">
          {list.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={i * 0.06} />
          ))}
        </div>
      ) : (
        <ul className="quick-links">
          {list.map((project, i) => {
            const hasStudy = Boolean(project.caseStudy)
            return (
              <Reveal as="li" key={project.slug} className="quick-link" delay={i * 0.05}>
                <Link href={`/work/${project.slug}`}>
                  <span className="quick-link__index">{project.index}</span>
                  <span className="quick-link__body">
                    <span className="quick-link__title">{project.title}</span>
                    <span className="quick-link__tags">
                      {project.tags.join(', ')}
                    </span>
                  </span>
                  {!hasStudy ? (
                    <span className="chip">Soon</span>
                  ) : null}
                  <Icon
                    icon={ArrowRight}
                    className="quick-link__arrow transition-transform duration-200 ease-soft"
                  />
                </Link>
              </Reveal>
            )
          })}
        </ul>
      )}
    </section>
  )
}
