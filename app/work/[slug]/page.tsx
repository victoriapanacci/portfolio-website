import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLink } from '@/components/ArrowLink'
import { CaseStudy } from '@/components/CaseStudy'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
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
  if (!project) return { title: 'Case study | Victoria Panacci' }
  return {
    title: `${project.title} | Victoria Panacci`,
    description: project.caseStudy?.summary ?? project.description,
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

  const hasStudy = Boolean(project.caseStudy)

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      {hasStudy ? (
        <CaseStudy project={project} />
      ) : (
        <section className="cs-placeholder shell" id="top">
          <p className="cs-eyebrow">{project.category}</p>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-summary">{project.description}</p>
          <p className="cs-placeholder__note">
            This case study is being written. In the meantime, explore my other
            work below.
          </p>
          <ArrowLink href="/#work">Back to all work</ArrowLink>
        </section>
      )}

      {/* Quick links back to the other project cards, same source of truth as home */}
      <ProjectShowcase
        variant="quick"
        kicker="Explore more work"
        excludeSlug={project.slug}
      />

      <SiteFooter />
    </main>
  )
}
