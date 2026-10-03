import type { Project } from '@/lib/projects'
import { ArrowLink } from './ArrowLink'
import { CaseStudyMediaGroup } from './CaseStudyMedia'
import { CaseStudyProcess } from './CaseStudyProcess'
import { DeviceFrame } from './DeviceFrame'
import { Reveal } from './Reveal'
import { RichText } from './RichText'
import { SectionLabel } from './SectionLabel'
import { TagChips } from './TagChips'

/**
 * Every case study page follows this structure, in this order:
 *
 *   1. Hero screenshot in a DeviceFrame
 *   2. Title + one-line summary
 *   3. Metadata strip: Role, Timeline, Team, Tools
 *   4. Tag chips (the same tags as the project card)
 *   5. Three short blocks: Overview, Problem, Outcome
 *   6. Optional gallery of supporting artifacts
 *   7. The detailed process sections
 *
 * It takes a project data object, so adding a new case study is only data.
 */
export function CaseStudyLayout({ project }: { project: Project }) {
  const cs = project.caseStudy
  if (!cs) return null

  const meta = [
    { label: 'Role', value: cs.meta.role },
    { label: 'Timeline', value: cs.meta.timeline },
    { label: 'Team', value: cs.meta.team },
    { label: 'Tools', value: cs.meta.tools },
  ]

  const blocks = [
    { label: 'Overview', text: cs.overview },
    { label: 'Problem', text: cs.problem },
    { label: 'Outcome', text: cs.outcome },
  ]

  return (
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
          src={cs.hero.src}
          alt={cs.hero.alt}
          priority
        />
      </Reveal>

      <Reveal className="cs-intro shell">
        <SectionLabel>Case study {project.index}</SectionLabel>
        <h1 className="cs-title">{project.title}</h1>
        <p className="cs-summary">{project.summary}</p>
      </Reveal>

      <Reveal className="shell">
        <dl className="cs-meta">
          {meta.map((m) => (
            <div key={m.label} className="cs-meta__item">
              <dt>
                <SectionLabel as="span">{m.label}</SectionLabel>
              </dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
        <TagChips tags={project.tags} className="cs-tags" />
      </Reveal>

      <section className="cs-blocks shell" aria-label="Summary">
        {blocks.map((b, i) => (
          <Reveal key={b.label} className="cs-block" delay={i * 0.06}>
            <SectionLabel>{b.label}</SectionLabel>
            <div className="cs-block__body cs-rich">
              <RichText text={b.text} />
            </div>
          </Reveal>
        ))}
      </section>

      {cs.images?.length ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>Artifacts</SectionLabel>
          </Reveal>
          <CaseStudyMediaGroup media={cs.images} />
        </section>
      ) : null}

      {cs.process ? <CaseStudyProcess process={cs.process} /> : null}
    </article>
  )
}
