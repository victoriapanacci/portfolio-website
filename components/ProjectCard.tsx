import type { Project } from '@/lib/projects'
import { ArrowLink } from './ArrowLink'
import { ProjectArt } from './ProjectArt'

export function ProjectCard({ project }: { project: Project }) {
  const href = `/work/${project.slug}`
  const hasStudy = Boolean(project.caseStudy)

  return (
    <article className="project-card reveal-on-scroll group">
      <div className="project-index">{project.index}</div>
      <ProjectArt type={project.art} />
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        <div className="short-rule" />
        <p className="project-description">{project.description}</p>
        <ArrowLink href={href}>
          {hasStudy ? 'View case study' : 'Coming soon'}
        </ArrowLink>
      </div>
    </article>
  )
}
