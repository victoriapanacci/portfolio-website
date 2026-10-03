import Image from 'next/image'
import type { ProjectArtType } from '@/lib/projects'

const artLabel: Record<ProjectArtType, string> = {
  cashier:
    'Archive card for the cashier project: the real pending-withdrawal screen, "Withdrawal on its way", with a label strip reading project Cashier; status pending, one of three confirmations; handoff in two weeks.',
  mobile:
    'Research note from the legacy ePRO study: a five-stage patient journey with stage four, missed entry, marked, and the words from its stage-four sticky, "I keep getting errors. How do I add a missed entry? I don\'t know how to do this." Mood: frustrated, then abandoned.',
  system:
    'Archive card for the design-systems project: a type ramp of the letters Aa at six sizes and five named colour tokens, with a label strip reading project design systems; where madhaus.io; status in progress.',
  imaging:
    'An MRI film series split down the middle: the redacted version on the left with patient details blacked out, the original on the right with them visible, tagged as human reviewed.',
}

const mri = { src: '/work/deid/hero-mri.png', width: 1180, height: 660 }
const mriRedacted = { src: '/work/deid/hero-mri-redacted.png', width: 1180, height: 660 }
const pending = { src: '/work/cashier/card-pending-status.png', width: 780, height: 470 }

const stages = ['Onboarding', 'First use', 'Daily use', 'Missed entry', 'End of study']

const tokens = [
  { name: 'Plum', hex: '#633547' },
  { name: 'Wine', hex: '#8b4957' },
  { name: 'Rose', hex: '#d97b72' },
  { name: 'Peach', hex: '#e9a27d' },
  { name: 'Cream', hex: '#f2e8dc' },
]

function LabelStrip({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="file-label">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export function ProjectArt({ type }: { type: ProjectArtType }) {
  return (
    <div
      className={`project-art project-art--${type}`}
      role="img"
      aria-label={artLabel[type]}
    >
      <div className="project-art__stage" aria-hidden="true">
        {type === 'mobile' && (
          <div className="story story--notes">
            <ol className="notes-stages">
              {stages.map((s, i) => (
                <li key={s} className={i === 3 ? 'is-here' : undefined}>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <p className="notes-quote">
              “I keep getting errors. How do I add a missed entry? I don’t know
              how to do this.”
            </p>
            <p className="notes-meta">
              <span>From the patient journey map, legacy ePRO study</span>
              <span>Frustrated, then abandoned</span>
            </p>
          </div>
        )}

        {type === 'cashier' && (
          <div className="story story--file">
            <div className="file-specimen file-specimen--shot">
              <Image
                src={pending.src}
                alt=""
                width={pending.width}
                height={pending.height}
                loading="eager"
              />
            </div>
            <LabelStrip
              rows={[
                ['Project', 'Cashier'],
                ['Status', 'Pending · 1/3 conf.'],
                ['Handoff', '2 weeks'],
              ]}
            />
          </div>
        )}

        {type === 'imaging' && (
          <div className="story story--redact">
            <Image
              src={mriRedacted.src}
              alt=""
              width={mriRedacted.width}
              height={mriRedacted.height}
              loading="eager"
              className="redact-img"
            />
            <div className="redact-before">
              <Image
                src={mri.src}
                alt=""
                width={mri.width}
                height={mri.height}
                loading="eager"
                className="redact-img redact-img--before"
              />
            </div>
            <span className="redact-label redact-label--l">Redacted</span>
            <span className="redact-label redact-label--r">Original</span>
            <span className="redact-stamp">Human reviewed</span>
          </div>
        )}

        {type === 'system' && (
          <div className="story story--file">
            <div className="file-specimen file-specimen--sheet">
              <p className="ramp">
                <span>Aa</span>
                <span>Aa</span>
                <span>Aa</span>
                <span>Aa</span>
                <span>Aa</span>
                <span>Aa</span>
              </p>
              <ul className="tokens">
                {tokens.map((t) => (
                  <li key={t.name}>
                    <i style={{ background: t.hex }} />
                    <b>{t.name}</b>
                    <span>{t.hex}</span>
                  </li>
                ))}
              </ul>
            </div>
            <LabelStrip
              rows={[
                ['Project', 'Design systems'],
                ['Where', 'madhaus.io'],
                ['Status', 'In progress'],
              ]}
            />
          </div>
        )}
      </div>
    </div>
  )
}
