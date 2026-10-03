import Link from 'next/link'
import type { Project } from '@/lib/projects'
import { ProjectArt } from './ProjectArt'
import { CaseStudyMedia, CaseStudyMediaGroup } from './CaseStudyMedia'
import { CaseStudyPrototype } from './CaseStudyPrototype'
import { CaseStudyDeviceLoop } from './CaseStudyDeviceLoop'
import { CaseStudyWalkthrough } from './CaseStudyWalkthrough'
import { RichText } from './RichText'

export function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy
  if (!cs) return null
  const stacked = cs.heroLayout === 'stacked'

  const solutionHeading = cs.solution.heading ? (
    <>
      {cs.solution.heading.lead}
      <em>{cs.solution.heading.em}</em>
      {cs.solution.heading.tail}
    </>
  ) : (
    <>
      Meet <em>DribbleCollect</em>
    </>
  )

  const solutionSection = (
    <>
      {/* Solution */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>The solution</span>
          <i />
        </div>
        {cs.solution.principles || cs.solution.walkthrough ? (
          <div className="cs-principles-block">
            <h2 className="cs-h2">{solutionHeading}</h2>
            <div className="cs-section__lead cs-section__lead--wide cs-rich">
              <RichText text={cs.solution.lead} />
            </div>
            {cs.solution.walkthrough ? (
              <CaseStudyWalkthrough walk={cs.solution.walkthrough} />
            ) : null}
            {cs.solution.principles?.some((p) => p.media) ? (
              <CaseStudyMediaGroup media={cs.solution.media} />
            ) : null}
            {!cs.solution.principles ? null : cs.solution.principles.some(
                (p) => p.media,
              ) ? (
              <ol className="cs-decisions">
                {cs.solution.principles.map((p, i) => (
                  <li key={p.title} className="cs-decision reveal-on-scroll">
                    <div className="cs-decision__copy">
                      <span className="cs-decision__num">{`0${i + 1}`}</span>
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
                  <li key={p.title} className="cs-principle reveal-on-scroll">
                    <span className="cs-principle__num">{`0${i + 1}`}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ) : (
          <div className="cs-solution">
            <h2 className="cs-h2">{solutionHeading}</h2>
            <div>
              <div className="cs-section__lead cs-rich">
                <RichText text={cs.solution.lead} />
              </div>
              <ul className="cs-check-list">
                {(cs.solution.points ?? []).map((point) => (
                  <li key={point} className="reveal-on-scroll">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {cs.solution.prototype ? (
          <CaseStudyPrototype prototype={cs.solution.prototype} />
        ) : null}
        {cs.solution.principles?.some((p) => p.media) ? null : (
          <CaseStudyMediaGroup media={cs.solution.media} />
        )}
      </section>
    </>
  )

  const discoverySection = (
    <>
      {/* Discovery */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>{cs.discovery.kicker ?? 'The research'}</span>
          <i />
        </div>
        <h2 className="cs-h2">
          {cs.discovery.heading ? (
            <>
              {cs.discovery.heading.lead}
              <em>{cs.discovery.heading.em}</em>
              {cs.discovery.heading.tail}
            </>
          ) : (
            <>
              Four voices, one <em>fragile chain</em> of data
            </>
          )}
        </h2>
        <div className="cs-section__lead cs-rich">
          <RichText text={cs.discovery.lead} />
        </div>
        <CaseStudyMediaGroup media={cs.discovery.media} />
        <div className="cs-findings">
          {cs.discovery.findings.map((f) => (
            <div key={f.title} className="cs-finding reveal-on-scroll">
              <div className="cs-rich">
                <h3>{f.title}</h3>
                <RichText text={f.body} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )

  const pivotSection = cs.pivot ? (
    <section className="cs-section shell">
      <div className="cs-kicker">
        <span>{cs.pivot.kicker}</span>
        <i />
      </div>
      <div className="cs-pivot reveal-on-scroll">
        {(Array.isArray(cs.pivot.body) ? cs.pivot.body : [cs.pivot.body]).map(
          (para) => (
            <p key={para}>{para}</p>
          ),
        )}
      </div>
      <CaseStudyMediaGroup media={cs.pivot.media} />
    </section>
  ) : null

  return (
    <article className="cs">
      {/* Breadcrumb back link */}
      <div className="shell">
        <Link
          href="/#work"
          className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-rose/40 bg-rose/10 px-6 py-3 text-sm font-medium text-cream outline-none transition-colors hover:border-rose hover:bg-rose/20 focus-visible:ring-2 focus-visible:ring-rose/70"
        >
          <span
            aria-hidden="true"
            className="text-base font-light text-rose transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          <span>Back to All Work</span>
        </Link>
      </div>

      {/* Hero */}
      <header className={`cs-hero shell${stacked ? ' cs-hero--stacked' : ''}`}>
        <div className="cs-hero__copy reveal">
          <h1 className="cs-title">{project.title}</h1>
          <div className="cs-summary cs-rich">
            <RichText text={cs.summary} />
          </div>
        </div>
        {stacked ? (
          <dl className="cs-meta cs-hero__meta reveal">
            {cs.meta.map((m) => (
              <div key={m.label} className="cs-meta__item">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="cs-hero__art reveal">
          {cs.heroDevice ? (
            <CaseStudyDeviceLoop device={cs.heroDevice} />
          ) : cs.heroMedia ? (
            <CaseStudyMedia media={cs.heroMedia} className="cs-media--hero" />
          ) : (
            <ProjectArt type={project.art} />
          )}
        </div>
      </header>

      {/* Meta bar (side layout only; the stacked hero carries it inline) */}
      {stacked ? null : (
        <div className="shell">
          <dl className="cs-meta">
            {cs.meta.map((m) => (
              <div key={m.label} className="cs-meta__item">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Intro / lede (optional) */}
      {cs.intro ? (
        <section className="cs-section shell">
          <p className="cs-lede reveal-on-scroll">{cs.intro}</p>
        </section>
      ) : null}

      {/* Problem */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>{cs.problem.kicker ?? 'The problem'}</span>
          <i />
        </div>
        <div className="cs-section__lead cs-rich">
          <RichText text={cs.problem.lead} />
        </div>
        {cs.problem.points.length ? (
          <div className="cs-two-col">
            {cs.problem.points.map((p) => (
              <div key={p.title} className="cs-panel reveal-on-scroll">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        ) : null}
        <CaseStudyMediaGroup media={cs.problem.media} />
      </section>

      {cs.researchFirst ? discoverySection : solutionSection}

      {/* Pivot (optional) */}
      {pivotSection}

      {/* Process (optional) */}
      {cs.process ? (
        <section className="cs-section shell">
          <div className="cs-kicker">
            <span>Prototyping in sprints</span>
            <i />
          </div>
          <ol className="cs-process">
            {cs.process.map((step) => (
              <li key={step.index} className="cs-step reveal-on-scroll">
                <span className="cs-step__index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {cs.researchFirst ? solutionSection : discoverySection}

      {/* Objectives (optional) */}
      {cs.objectives ? (
        <section className="cs-section shell">
          <div className="cs-kicker">
            <span>Defining success</span>
            <i />
          </div>
          <div className="cs-objectives">
            {cs.objectives.map((o) => (
              <div key={o.label} className="cs-objective reveal-on-scroll">
                <span className="cs-objective__label">{o.label}</span>
                <p>{o.title}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Sprints (optional) */}
      {cs.sprints ? (
        <section className="cs-section shell">
          <div className="cs-kicker">
            <span>Prototyping in sprints</span>
            <i />
          </div>
          <p className="cs-section__lead">{cs.sprints.lead}</p>
          <div className="cs-sprints">
            {cs.sprints.items.map((s) => (
              <div key={s.title} className="cs-sprint reveal-on-scroll">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Metrics band (optional) */}
      {cs.metrics?.length ? (
        <section className="cs-metrics-wrap">
          <div className="cs-metrics shell">
            {cs.metrics.map((m) => (
              <div key={m.label} className="cs-metric reveal-on-scroll">
                <span className="cs-metric__value">{m.value}</span>
                <span className="cs-metric__label">{m.label}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Outcomes (optional) */}
      {cs.outcomes?.length ? (
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>The outcome</span>
          <i />
        </div>
        <h2 className="cs-h2">
          {cs.outcomesHeading ? (
            <>
              {cs.outcomesHeading.lead}
              <em>{cs.outcomesHeading.em}</em>
              {cs.outcomesHeading.tail}
            </>
          ) : (
            <>
              Every objective, <em>delivered</em>.
            </>
          )}
        </h2>
        <div className="cs-outcomes">
          {cs.outcomes.map((o) => (
            <div key={o.objective} className="cs-outcome reveal-on-scroll">
              <h3>{o.objective}</h3>
              <ul>
                {o.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <CaseStudyMediaGroup media={cs.outcomesMedia} />
      </section>
      ) : null}

      {/* Launch (optional) */}
      {cs.launch ? (
        <section className="cs-section shell">
          <div className="cs-kicker">
            <span>Build to launch</span>
            <i />
          </div>
          <div className="cs-launch">
            {cs.launch.map((l) => (
              <div key={l.phase} className="cs-phase reveal-on-scroll">
                <div className="cs-phase__head">
                  <span className="cs-phase__name">{l.phase}</span>
                  <span className="cs-phase__tag">{l.tag}</span>
                </div>
                <p className="cs-phase__body">{l.body}</p>
                <p className="cs-phase__feedback">
                  <span>Feedback loop</span>
                  {l.feedback}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Validation (optional) */}
      {cs.validation ? (
        <section className="cs-section shell">
          <div className="cs-validation reveal-on-scroll">
            <div className="cs-kicker">
              <span>Outcome &amp; validation</span>
              <i />
            </div>
            {cs.validation.map((v) => (
              <p key={v} className="cs-validation__line">
                {v}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {/* Reflection (optional) */}
      {cs.reflection ? (
        <section className="cs-section shell">
          <div className="cs-kicker">
            <span>{cs.reflection.kicker}</span>
            <i />
          </div>
          {cs.reflection.lead ? (
            <div className="cs-section__lead cs-rich">
              <RichText text={cs.reflection.lead} />
            </div>
          ) : null}
          <div className="cs-findings">
            {cs.reflection.items.map((f) => (
              <div key={f.title} className="cs-finding reveal-on-scroll">
                <div className="cs-rich">
                  <h3>{f.title}</h3>
                  <RichText text={f.body} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Learnings (optional) */}
      {cs.learnings?.length ? (
        <section className="cs-section shell">
          <div className="cs-kicker">
            <span>What I took with me</span>
            <i />
          </div>
          <ol className="cs-learnings">
            {cs.learnings.map((l, i) => (
              <li key={l} className="reveal-on-scroll">
                <span aria-hidden="true">{`0${i + 1}`}</span>
                <p>{l}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </article>
  )
}
