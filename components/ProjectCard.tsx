import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { DeviceFrame } from './DeviceFrame'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { TagChips } from './TagChips'

type Props = {
  project: Project
  /** Stagger offset in seconds, so a grid of cards fades in one after another. */
  delay?: number
}

/**
 * One project card: a 4:3 thumbnail in a device frame, the title, a
 * one-line summary and the project's tag chips. Hovering scales the
 * device slightly and lifts the card.
 */
export function ProjectCard({ project, delay = 0 }: Props) {
  const href = `/work/${project.slug}`
  const hasStudy = Boolean(project.caseStudy)

  return (
    <Reveal as="article" className="project-card group" delay={delay}>
      <Link href={href} className="project-card__link" aria-label={project.title}>
        <DeviceFrame
          kind={project.device}
          layout="thumbnail"
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
        />
      </Link>
      <div className="project-card__body">
        <h3 className="project-card__title">
          <Link href={href}>{project.title}</Link>
        </h3>
        <p className="project-card__summary">{project.summary}</p>
        <TagChips tags={project.tags} />
        <Link href={href} className="project-card__cta">
          <span>{hasStudy ? 'View case study' : 'Coming soon'}</span>
          <Icon icon={ArrowRight} className="transition-transform duration-200 ease-soft group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Reveal>
  )
}
