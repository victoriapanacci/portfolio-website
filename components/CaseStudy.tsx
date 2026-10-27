import { Button } from './Button'
import { Reveal } from './motion/Reveal'
import { SplitHeadline } from './motion/SplitHeadline'
import type { CaseStudyHeading, Project } from '@/lib/projects'
import { ProjectArt } from './ProjectArt'
import { CaseStudyMedia, CaseStudyMediaGroup } from './CaseStudyMedia'
import { CaseStudyPrototype } from './CaseStudyPrototype'
import { CaseStudyDeviceLoop } from './CaseStudyDeviceLoop'
import { CaseStudyWalkthrough } from './CaseStudyWalkthrough'
import { RichText } from './RichText'

/** `{lead}<em>{em}</em>{tail}`: every section heading comes from the data. */
function Heading({ heading }: { heading: CaseStudyHeading }) {
  return (
    <>
      {heading.lead}
      <em>{heading.em}</em>
      {heading.tail}
    </>
  )
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="kicker">
      <span>{children}</span>
      <i />
    </div>
  )
}

function Meta({ items }: { items: { label: string; value: string; note?: string }[] }) {
  return (
    <>
      {items.map((m) => (
        <div key={m.label} className="cs-meta__item">
          <dt className="label">{m.label}</dt>
          <dd>{m.value}</dd>
          {m.note ? <dd className="cs-meta__note">{m.note}</dd> : null}
        </div>
      ))}
    </>
  )
}

/** Muted footnote beneath the meta block, e.g. an NDA disclaimer. */
function MetaNote({ note }: { note?: string }) {
  if (!note) return null
  return <p className="cs-meta__footnote caption">{note}</p>
}

export function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy
  if (!cs) return null
  const stacked = cs.heroLayout === 'stacked'
  const principlesHaveMedia = Boolean(cs.solution?.principles?.some((p) => p.media))

  const solutionSection = !cs.solution ? null : (
    <Reveal as="section" className="cs-section shell">
      <Kicker>{cs.solution.kicker ?? 'The solution'}</Kicker>
      {cs.solution.principles || cs.solution.walkthrough ? (
        <div>
          <h2 className="cs-h2">
            <Heading heading={cs.solution.heading} />
          </h2>
          <div className="lead cs-section__lead cs-section__lead--wide cs-rich">
            <RichText text={cs.solution.lead} />
          </div>
          {cs.solution.walkthrough ? (
            <CaseStudyWalkthrough walk={cs.solution.walkthrough} />
          ) : null}
          {principlesHaveMedia ? <CaseStudyMediaGroup media={cs.solution.media} /> : null}
          {!cs.solution.principles ? null : principlesHaveMedia ? (
            <ol className="cs-decisions">
              {cs.solution.principles.map((p, i) => (
                <li key={p.title} className="cs-decision">
                  <div className="cs-decision__copy">
                    <span className="numeral numeral--lg">{`0${i + 1}`}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                  {p.media ? (
                    <div className="cs-decision__media">
                      <CaseStudyMediaGroup media={p.media} />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : (
            <ol className="cs-principles">
              {cs.solution.principles.map((p, i) => (
                <li key={p.title} className="card card--tinted cs-principle">
                  <span className="numeral numeral--lg">{`0${i + 1}`}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      ) : (
        <div className="cs-solution">
          <h2 className="cs-h2">
            <Heading heading={cs.solution.heading} />
          </h2>
          <div>
            <div className="lead cs-section__lead cs-rich">
              <RichText text={cs.solution.lead} />
            </div>
            <ul className="list list--rows">
              {(cs.solution.points ?? []).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {cs.solution.prototype ? (
        <CaseStudyPrototype prototype={cs.solution.prototype} />
      ) : null}
      {principlesHaveMedia ? null : <CaseStudyMediaGroup media={cs.solution.media} />}
    </Reveal>
  )

  const discoverySection = !cs.discovery ? null : (
    <Reveal as="section" className="cs-section shell">
      <Kicker>{cs.discovery.kicker ?? 'The research'}</Kicker>
      <h2 className="cs-h2">
        <Heading heading={cs.discovery.heading} />
      </h2>
      <div className="lead cs-section__lead cs-rich">
        <RichText text={cs.discovery.lead} />
      </div>
      <CaseStudyMediaGroup media={cs.discovery.media} />
      {cs.discovery.findings.length ? (
        <div className="cs-findings">
          {cs.discovery.findings.map((f) => (
            <div key={f.title} className="card cs-finding">
              <div className="cs-rich">
                <h3>{f.title}</h3>
                <RichText text={f.body} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </Reveal>
  )

  return (
    <article className="cs">
      <div className="shell back-link">
        <Button href="/#work" direction="back">
          Back to all work
        </Button>
      </div>

      {/* Hero */}
      <header className={`cs-hero shell${stacked ? ' cs-hero--stacked' : ''}`}>
        <div className="cs-hero__copy">
          <SplitHeadline text={project.title} className="cs-title" />
          <Reveal className="cs-summary lead cs-rich" immediate delay={0.5}>
            <RichText text={cs.summary} />
          </Reveal>
        </div>
        {stacked ? (
          <Reveal className="cs-hero__meta" immediate delay={0.65}>
            <dl className="cs-meta">
              <Meta items={cs.meta} />
            </dl>
            <MetaNote note={cs.metaNote} />
          </Reveal>
        ) : null}
        <Reveal className="cs-hero__art" immediate delay={0.35}>
          {cs.heroDevice ? (
            <CaseStudyDeviceLoop device={cs.heroDevice} />
          ) : cs.heroMedia ? (
            <CaseStudyMedia media={cs.heroMedia} className="media--hero" />
          ) : project.art ? (
            <ProjectArt type={project.art} />
          ) : null}
        </Reveal>
      </header>

      {/* Meta bar (side layout only; the stacked hero carries it inline) */}
      {stacked ? null : (
        <div className="shell">
          <dl className={`cs-meta${cs.story ? ' cs-meta--open' : ''}`}>
            <Meta items={cs.meta} />
          </dl>
          <MetaNote note={cs.metaNote} />
        </div>
      )}

      {/* Intro / lede (optional) */}
      {cs.intro ? (
        <Reveal as="section" className="cs-section shell">
          <p className="lede">{cs.intro}</p>
        </Reveal>
      ) : null}

      {/* Story (optional): free-form sections in the order they are written */}
      {cs.story?.map((section) => (
        <Reveal
          key={section.kicker}
          as="section"
          className={`cs-section cs-story shell${section.layout === 'side' ? ' cs-story--side' : ''}`}
        >
          <div className="cs-grid cs-story__grid">
            <div className="cs-story__kicker">
              <Kicker>{section.kicker}</Kicker>
            </div>
            <div className="cs-story__copy">
              {section.heading ? <h2 className="cs-h2">{section.heading}</h2> : null}
              <div className="lead cs-rich cs-story__body">
                <RichText text={section.body} />
              </div>
            </div>
            {section.prototype || section.media ? (
              <div className="cs-story__media">
                {section.prototype ? <CaseStudyPrototype prototype={section.prototype} /> : null}
                <CaseStudyMediaGroup media={section.media} />
              </div>
            ) : null}
          </div>
        </Reveal>
      ))}

      {/* Problem (optional) */}
      {cs.problem ? (
        <Reveal as="section" className="cs-section shell">
          <Kicker>{cs.problem.kicker ?? 'The problem'}</Kicker>
          <div className="lead cs-section__lead cs-rich">
            <RichText text={cs.problem.lead} />
          </div>
          {cs.problem.points.length ? (
            <div className="cs-two-col">
              {cs.problem.points.map((p) => (
                <div key={p.title} className="card cs-panel">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          ) : null}
          <CaseStudyMediaGroup media={cs.problem.media} />
        </Reveal>
      ) : null}

      {cs.researchFirst ? discoverySection : solutionSection}

      {/* Process (optional) */}
      {cs.process ? (
        <Reveal as="section" className="cs-section shell">
          <Kicker>{cs.processKicker ?? 'Process'}</Kicker>
          <ol className="card card--grid cs-process">
            {cs.process.map((step) => (
              <li key={step.index} className="cs-step">
                <span className="numeral">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      ) : null}

      {cs.researchFirst ? solutionSection : discoverySection}

      {/* Metrics band (optional) */}
      {cs.metrics?.length ? (
        <Reveal as="section" className="card card--highlight card--grid cs-metrics-wrap">
          <div className="cs-metrics shell">
            {cs.metrics.map((m) => (
              <div key={m.label} className="cs-metric">
                <span className="cs-metric__value">{m.value}</span>
                <span className="cs-metric__label">{m.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* Outcomes (optional) */}
      {cs.outcomes?.length ? (
        <Reveal as="section" className="cs-section shell">
          <Kicker>{cs.outcomesKicker ?? 'The outcome'}</Kicker>
          {cs.outcomesHeading ? (
            <h2 className="cs-h2">
              <Heading heading={cs.outcomesHeading} />
            </h2>
          ) : null}
          <div className="cs-outcomes">
            {cs.outcomes.map((o) => (
              <div key={o.objective} className="card cs-outcome">
                <h3>{o.objective}</h3>
                <ul className="list">
                  {o.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <CaseStudyMediaGroup media={cs.outcomesMedia} />
        </Reveal>
      ) : null}

      {/* Launch (optional) */}
      {cs.launch ? (
        <Reveal as="section" className="cs-section shell">
          <Kicker>Build to launch</Kicker>
          <div className="cs-launch">
            {cs.launch.map((l) => (
              <div key={l.phase} className="card cs-phase">
                <div className="cs-phase__head">
                  <span className="label">{l.phase}</span>
                  <span className="tag">{l.tag}</span>
                </div>
                <div>
                  <p className="cs-phase__body">{l.body}</p>
                  <p className="cs-phase__feedback">
                    <span className="eyebrow">Feedback loop</span>
                    {l.feedback}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* Validation (optional) */}
      {cs.validation ? (
        <Reveal as="section" className="cs-section shell">
          <div className="card card--highlight cs-validation">
            <Kicker>Outcome &amp; validation</Kicker>
            {cs.validation.map((v) => (
              <p key={v} className="lede">
                {v}
              </p>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* Reflection (optional) */}
      {cs.reflection ? (
        <Reveal as="section" className="cs-section shell">
          <Kicker>{cs.reflection.kicker}</Kicker>
          {cs.reflection.lead ? (
            <div className="lead cs-section__lead cs-rich">
              <RichText text={cs.reflection.lead} />
            </div>
          ) : null}
          <div className="cs-findings">
            {cs.reflection.items.map((f) => (
              <div key={f.title} className="card cs-finding">
                <div className="cs-rich">
                  <h3>{f.title}</h3>
                  <RichText text={f.body} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* Learnings (optional) */}
      {cs.learnings?.length ? (
        <Reveal as="section" className="cs-section shell">
          <Kicker>What I took with me</Kicker>
          <ol className="cs-learnings">
            {cs.learnings.map((l, i) => (
              <li key={l}>
                <span className="numeral" aria-hidden="true">{`0${i + 1}`}</span>
                <p className="lead">{l}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      ) : null}
    </article>
  )
}
