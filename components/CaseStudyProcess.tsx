import { Check } from 'lucide-react'
import type { CaseStudyHeading, CaseStudyProcess as Process } from '@/lib/projects'
import { CaseStudyMediaGroup } from './CaseStudyMedia'
import { CaseStudyPrototype } from './CaseStudyPrototype'
import { CaseStudyWalkthrough } from './CaseStudyWalkthrough'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { RichText } from './RichText'
import { SectionLabel } from './SectionLabel'

function Heading({ heading, fallback }: { heading?: CaseStudyHeading; fallback?: React.ReactNode }) {
  if (!heading) return fallback ? <h2 className="cs-h2">{fallback}</h2> : null
  return (
    <h2 className="cs-h2">
      {heading.lead}
      <em>{heading.em}</em>
      {heading.tail}
    </h2>
  )
}

/**
 * The detailed process sections of a case study: problem, research,
 * solution, metrics, outcomes and so on. Every section is optional and
 * driven by data, so this component never needs editing to add a study.
 */
export function CaseStudyProcess({ process: cs }: { process: Process }) {
  const solutionSection = cs.solution ? (
    <section className="cs-section shell">
      <Reveal className="section-head">
        <SectionLabel>The solution</SectionLabel>
        <Heading heading={cs.solution.heading} />
      </Reveal>
      {cs.solution.principles || cs.solution.walkthrough ? (
        <div className="cs-principles-block">
          <Reveal className="cs-section__lead cs-section__lead--wide cs-rich">
            <RichText text={cs.solution.lead} />
          </Reveal>
          {cs.solution.walkthrough ? (
            <Reveal>
              <CaseStudyWalkthrough walk={cs.solution.walkthrough} />
            </Reveal>
          ) : null}
          {cs.solution.principles?.some((p) => p.media) ? (
            <CaseStudyMediaGroup media={cs.solution.media} />
          ) : null}
          {!cs.solution.principles ? null : cs.solution.principles.some(
              (p) => p.media,
            ) ? (
            <ol className="cs-decisions">
              {cs.solution.principles.map((p, i) => (
                <Reveal as="li" key={p.title} className="cs-decision">
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
                </Reveal>
              ))}
            </ol>
          ) : (
            <ol className="cs-principles">
              {cs.solution.principles.map((p, i) => (
                <Reveal as="li" key={p.title} className="cs-principle card" delay={i * 0.06}>
                  <span className="cs-principle__num">{`0${i + 1}`}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              ))}
            </ol>
          )}
        </div>
      ) : (
        <div className="cs-solution">
          <Reveal className="cs-section__lead cs-rich">
            <RichText text={cs.solution.lead} />
          </Reveal>
          <Reveal as="ul" className="cs-check-list">
            {(cs.solution.points ?? []).map((point) => (
              <li key={point}>
                <Icon icon={Check} />
                <span>{point}</span>
              </li>
            ))}
          </Reveal>
        </div>
      )}
      {cs.solution.prototype ? (
        <CaseStudyPrototype prototype={cs.solution.prototype} />
      ) : null}
      {cs.solution.principles?.some((p) => p.media) ? null : (
        <CaseStudyMediaGroup media={cs.solution.media} />
      )}
    </section>
  ) : null

  const discoverySection = cs.discovery ? (
    <section className="cs-section shell">
      <Reveal className="section-head">
        <SectionLabel>{cs.discovery.kicker ?? 'The research'}</SectionLabel>
        <Heading heading={cs.discovery.heading} />
      </Reveal>
      <Reveal className="cs-section__lead cs-rich">
        <RichText text={cs.discovery.lead} />
      </Reveal>
      <CaseStudyMediaGroup media={cs.discovery.media} />
      <div className="cs-findings">
        {cs.discovery.findings.map((f, i) => (
          <Reveal key={f.title} className="cs-finding card" delay={i * 0.06}>
            <div className="cs-rich">
              <h3>{f.title}</h3>
              <RichText text={f.body} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  ) : null

  const pivotSection = cs.pivot ? (
    <section className="cs-section shell">
      <Reveal className="section-head">
        <SectionLabel>{cs.pivot.kicker}</SectionLabel>
      </Reveal>
      <Reveal className="cs-pivot">
        {(Array.isArray(cs.pivot.body) ? cs.pivot.body : [cs.pivot.body]).map(
          (para) => (
            <p key={para}>{para}</p>
          ),
        )}
      </Reveal>
      <CaseStudyMediaGroup media={cs.pivot.media} />
    </section>
  ) : null

  return (
    <div className="cs-process">
      {cs.intro ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>The story</SectionLabel>
          </Reveal>
          <Reveal as="div">
            <p className="cs-lede">{cs.intro}</p>
          </Reveal>
        </section>
      ) : null}

      {cs.problem ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>{cs.problem.kicker ?? 'The problem'}</SectionLabel>
          </Reveal>
          <Reveal className="cs-section__lead cs-rich">
            <RichText text={cs.problem.lead} />
          </Reveal>
          {cs.problem.points.length ? (
            <div className="cs-two-col">
              {cs.problem.points.map((p, i) => (
                <Reveal key={p.title} className="cs-panel card" delay={i * 0.06}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              ))}
            </div>
          ) : null}
          <CaseStudyMediaGroup media={cs.problem.media} />
        </section>
      ) : null}

      {cs.researchFirst ? discoverySection : solutionSection}

      {pivotSection}

      {cs.process ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>Prototyping in sprints</SectionLabel>
          </Reveal>
          <Reveal as="ol" className="cs-steps">
            {cs.process.map((step) => (
              <li key={step.index} className="cs-step">
                <span className="cs-step__index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </Reveal>
        </section>
      ) : null}

      {cs.researchFirst ? solutionSection : discoverySection}

      {cs.objectives ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>Defining success</SectionLabel>
          </Reveal>
          <div className="cs-objectives">
            {cs.objectives.map((o, i) => (
              <Reveal key={o.label} className="cs-objective card" delay={i * 0.06}>
                <SectionLabel as="span" className="cs-objective__label">
                  {o.label}
                </SectionLabel>
                <p>{o.title}</p>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {cs.sprints ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>Prototyping in sprints</SectionLabel>
          </Reveal>
          <Reveal as="div">
            <p className="cs-section__lead">{cs.sprints.lead}</p>
          </Reveal>
          <div className="cs-sprints">
            {cs.sprints.items.map((s, i) => (
              <Reveal key={s.title} className="cs-sprint card" delay={i * 0.06}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {cs.metrics?.length ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>By the numbers</SectionLabel>
          </Reveal>
          <Reveal className="cs-metrics card">
            {cs.metrics.map((m) => (
              <div key={m.label} className="cs-metric">
                <span className="cs-metric__value">{m.value}</span>
                <span className="cs-metric__label">{m.label}</span>
              </div>
            ))}
          </Reveal>
        </section>
      ) : null}

      {cs.outcomes?.length ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>The outcome</SectionLabel>
            <Heading
              heading={cs.outcomesHeading}
              fallback={
                <>
                  Every objective, <em>delivered</em>.
                </>
              }
            />
          </Reveal>
          <div className="cs-outcomes">
            {cs.outcomes.map((o, i) => (
              <Reveal key={o.objective} className="cs-outcome card" delay={i * 0.06}>
                <h3>{o.objective}</h3>
                <ul className="cs-rich-list">
                  {o.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <CaseStudyMediaGroup media={cs.outcomesMedia} />
        </section>
      ) : null}

      {cs.launch ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>Build to launch</SectionLabel>
          </Reveal>
          <div className="cs-launch">
            {cs.launch.map((l, i) => (
              <Reveal key={l.phase} className="cs-phase card" delay={i * 0.06}>
                <div className="cs-phase__head">
                  <span className="cs-phase__name">{l.phase}</span>
                  <span className="chip">{l.tag}</span>
                </div>
                <div>
                  <p className="cs-phase__body">{l.body}</p>
                  <p className="cs-phase__feedback">
                    <SectionLabel as="span">Feedback loop</SectionLabel>
                    {l.feedback}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {cs.validation ? (
        <section className="cs-section shell">
          <Reveal className="cs-validation card">
            <SectionLabel>Outcome &amp; validation</SectionLabel>
            {cs.validation.map((v) => (
              <p key={v} className="cs-validation__line">
                {v}
              </p>
            ))}
          </Reveal>
        </section>
      ) : null}

      {cs.reflection ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>{cs.reflection.kicker}</SectionLabel>
          </Reveal>
          {cs.reflection.lead ? (
            <Reveal className="cs-section__lead cs-rich">
              <RichText text={cs.reflection.lead} />
            </Reveal>
          ) : null}
          <div className="cs-findings">
            {cs.reflection.items.map((f, i) => (
              <Reveal key={f.title} className="cs-finding card" delay={i * 0.06}>
                <div className="cs-rich">
                  <h3>{f.title}</h3>
                  <RichText text={f.body} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {cs.learnings?.length ? (
        <section className="cs-section shell">
          <Reveal className="section-head">
            <SectionLabel>What I took with me</SectionLabel>
          </Reveal>
          <ol className="cs-learnings">
            {cs.learnings.map((l, i) => (
              <Reveal as="li" key={l} delay={i * 0.06}>
                <span aria-hidden="true">{`0${i + 1}`}</span>
                <p>{l}</p>
              </Reveal>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  )
}
