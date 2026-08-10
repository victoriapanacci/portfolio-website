import Link from 'next/link'
import type { Project } from '@/lib/projects'
import { ProjectArt } from './ProjectArt'

export function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy
  if (!cs) return null

  return (
    <article className="cs">
      {/* Breadcrumb back link */}
      <div className="shell">
        <Link href="/#work" className="cs-back">
          <span aria-hidden="true">←</span>
          Back to all work
        </Link>
      </div>

      {/* Hero */}
      <header className="cs-hero shell">
        <div className="cs-hero__copy reveal">
          <p className="cs-eyebrow">{project.category}</p>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-summary">{cs.summary}</p>
        </div>
        <div className="cs-hero__art reveal">
          <ProjectArt type={project.art} />
        </div>
      </header>

      {/* Meta bar */}
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

      {/* Intro / lede */}
      <section className="cs-section shell">
        <p className="cs-lede reveal-on-scroll">{cs.intro}</p>
      </section>

      {/* Problem */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>The problem</span>
          <i />
        </div>
        <p className="cs-section__lead">{cs.problem.lead}</p>
        <div className="cs-two-col">
          {cs.problem.points.map((p) => (
            <div key={p.title} className="cs-panel reveal-on-scroll">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>The solution</span>
          <i />
        </div>
        <div className="cs-solution">
          <h2 className="cs-h2">
            Meet <em>DribbleCollect</em>.
          </h2>
          <div>
            <p className="cs-section__lead">{cs.solution.lead}</p>
            <ul className="cs-check-list">
              {cs.solution.points.map((point) => (
                <li key={point} className="reveal-on-scroll">
                  <span className="cs-check" aria-hidden="true">
                    →
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>How we got there</span>
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

      {/* Discovery */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>Step 01 — Listening</span>
          <i />
        </div>
        <h2 className="cs-h2">
          Four voices, one <em>fragile chain</em> of data.
        </h2>
        <p className="cs-section__lead">{cs.discovery.lead}</p>
        <div className="cs-findings">
          {cs.discovery.findings.map((f, i) => (
            <div key={f.title} className="cs-finding reveal-on-scroll">
              <span className="cs-finding__num">{`0${i + 1}`}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>Step 02 — Defining goals</span>
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

      {/* Sprints */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>Step 03 — Prototyping in sprints</span>
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

      {/* Metrics band */}
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

      {/* Outcomes */}
      <section className="cs-section shell">
        <div className="cs-kicker">
          <span>Step 04 — The outcome</span>
          <i />
        </div>
        <h2 className="cs-h2">
          Every objective, <em>delivered</em>.
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
      </section>

      {/* Launch */}
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

      {/* Validation */}
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

      {/* Learnings */}
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
    </article>
  )
}
