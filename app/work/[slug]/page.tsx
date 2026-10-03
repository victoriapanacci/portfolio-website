import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLink } from '@/components/ArrowLink'
import { CaseStudyLayout } from '@/components/CaseStudyLayout'
import { DeviceFrame } from '@/components/DeviceFrame'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { Reveal } from '@/components/Reveal'
import { SectionLabel } from '@/components/SectionLabel'
import { TagChips } from '@/components/TagChips'
import { getProject, projects } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'VP: Case Study' }
  return {
    title: `VP: ${project.title}`,
    description: project.summary,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      {project.caseStudy ? (
        <CaseStudyLayout project={project} />
      ) : (
        <article className="cs">
          <div className="shell">
            <ArrowLink href="/#work" direction="back">
              Back to all work
            </ArrowLink>
          </div>
          <Reveal as="header" className="cs-hero shell">
            <DeviceFrame
              kind={project.device}
              layout="hero"
              src={project.thumbnail.src}
              alt={project.thumbnail.alt}
              priority
            />
          </Reveal>
          <Reveal className="cs-intro shell">
            <SectionLabel>Case study {project.index}</SectionLabel>
            <h1 className="cs-title">{project.title}</h1>
            <p className="cs-summary">{project.summary}</p>
            <TagChips tags={project.tags} className="cs-tags" />
            <p className="cs-placeholder__note">
              This case study is being written. In the meantime, explore my
              other work below.
            </p>
          </Reveal>
        </article>
      )}

      {/* Quick links back to the other project cards, same source of truth as home */}
      <ProjectShowcase
        variant="quick"
        label="Explore more work"
        title="Other projects"
        excludeSlug={project.slug}
      />
    </>
  )
}
