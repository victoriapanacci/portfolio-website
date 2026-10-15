import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Button } from '@/components/Button'
import { CaseStudy } from '@/components/CaseStudy'
import { Reveal } from '@/components/motion/Reveal'
import { SplitHeadline } from '@/components/motion/SplitHeadline'
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
  if (!project) return { title: 'Victoria Panacci: Case Study' }
  return {
    title: `Victoria Panacci: ${project.shortTitle}`,
    description: project.caseStudy
      ? [project.caseStudy.summary].flat().join(' ')
      : project.description,
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
    <main id="main">
      <SiteHeader />

      {hasStudy ? (
        <CaseStudy project={project} />
      ) : (
        <Reveal as="section" className="cs-placeholder shell" id="top" immediate>
          <p className="label">{project.category}</p>
          <SplitHeadline text={project.title} className="cs-title" />
          <p className="cs-summary lead">{project.description}</p>
          <p className="cs-placeholder__note caption">
            This case study is being written. In the meantime, explore my other
            work below.
          </p>
          <Button href="/#work" direction="back">
            Back to all work
          </Button>
        </Reveal>
      )}

      {/* Quick links back to the other projects, same source of truth as home */}
      <ProjectShowcase variant="quick" kicker="More work" excludeSlug={project.slug} />

      <SiteFooter />
    </main>
  )
}
