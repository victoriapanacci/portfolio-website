import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/projects'
import { ProjectArt } from './ProjectArt'

/**
 * The whole card is one link; there is no separate call-to-action inside it.
 * Projects without a case study carry a muted "Coming soon" tag instead.
 */
export function ProjectCard({ project }: { project: Project }) {
  const href = `/work/${project.slug}`
  const hasStudy = Boolean(project.caseStudy)

  return (
    <Link href={href} className="project-card reveal-on-scroll group">
      {project.cover ? (
        <div
          className="project-art project-art--cover"
          style={
            {
              '--cover-bg': project.cover.bg ?? 'transparent',
              '--cover-zoom': project.cover.zoom ?? 1,
              '--cover-shift-y': `${project.cover.shiftY ?? 0}px`,
            } as React.CSSProperties
          }
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(max-width: 900px) 100vw, 50vw"
            className="project-art__cover"
          />
        </div>
      ) : (
        <ProjectArt type={project.art} />
      )}
      <div className="project-copy">
        <h3>{project.title}</h3>
        <ul className="project-pills" aria-label="Categories">
          {project.category
            .split('/')
            .map((tag) => tag.trim())
            .filter(Boolean)
            .map((tag) => (
              <li key={tag} className="pill">
                {tag}
              </li>
            ))}
          {!hasStudy && <li className="pill pill--soon">Coming soon</li>}
        </ul>
      </div>
    </Link>
  )
}
