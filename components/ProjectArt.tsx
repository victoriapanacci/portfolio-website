import Image from 'next/image'
import type { ProjectArtType } from '@/lib/projects'

const artLabel: Record<ProjectArtType, string> = {
  cashier:
    'The question "Where is my money right now?" above a withdrawal state track: Sent, then Pending at one of three confirmations, then Confirmed.',
  mobile:
    'A spoken patient answer, "I don\'t know, I think sometimes, but I\'m not sure", the app asking "Did you mean some of the time?", and the recorded answer: 3, some of the time.',
  system:
    'A type ramp of the letters Aa at six sizes on one baseline, and five named colour tokens: plum, wine, rose, peach and cream.',
  imaging:
    'An MRI series split between the original and a redacted version with patient details blacked out, stamped as human reviewed.',
}

const mri = { src: '/work/deid/hero-mri.png', width: 1180, height: 660 }

const tokens = [
  { name: 'Plum', hex: '#633547' },
  { name: 'Wine', hex: '#8b4957' },
  { name: 'Rose', hex: '#d97b72' },
  { name: 'Peach', hex: '#e9a27d' },
  { name: 'Cream', hex: '#f2e8dc' },
]

export function ProjectArt({ type }: { type: ProjectArtType }) {
  return (
    <div
      className={`project-art project-art--${type}`}
      role="img"
      aria-label={artLabel[type]}
    >
      <div className="project-art__stage" aria-hidden="true">
        {type === 'mobile' && (
          <div className="story story--voice">
            <p className="voice-said">
              “I don’t know… I think sometimes, but I’m not sure.”
            </p>
            <p className="voice-asked">
              Did you mean <em>some of the time</em>?
            </p>
            <p className="voice-logged">
              <span className="voice-option">3 · Some of the time</span>
              <span className="voice-note">Recorded</span>
            </p>
          </div>
        )}

        {type === 'cashier' && (
          <div className="story story--states">
            <p className="states-title">
              Where is <em>my money</em> right now?
            </p>
            <ol className="states-track">
              <li className="is-done">
                <i />
                <span>Sent</span>
              </li>
              <li className="is-active">
                <i />
                <span>Pending · 1/3</span>
              </li>
              <li>
                <i />
                <span>Confirmed</span>
              </li>
            </ol>
          </div>
        )}

        {type === 'imaging' && (
          <div className="story story--redact">
            <Image
              src={mri.src}
              alt=""
              width={mri.width}
              height={mri.height}
              className="redact-img redact-img--after"
            />
            <span className="redact-bar redact-bar--1" />
            <span className="redact-bar redact-bar--2" />
            <span className="redact-bar redact-bar--3" />
            <span className="redact-bar redact-bar--4" />
            <div className="redact-before">
              <Image
                src={mri.src}
                alt=""
                width={mri.width}
                height={mri.height}
                className="redact-img"
              />
            </div>
            <span className="redact-label redact-label--l">Original</span>
            <span className="redact-label redact-label--r">Redacted</span>
            <span className="redact-stamp">Human reviewed</span>
          </div>
        )}

        {type === 'system' && (
          <div className="story story--scale">
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
        )}
      </div>
    </div>
  )
}
