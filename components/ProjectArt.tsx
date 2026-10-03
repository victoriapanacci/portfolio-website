import Image from 'next/image'
import type { ProjectArtType } from '@/lib/projects'

const artLabel: Record<ProjectArtType, string> = {
  cashier:
    'The question "Where is my money right now?" above a withdrawal state track: Sent, then Pending at one of three confirmations, then Confirmed.',
  mobile:
    'A spoken patient answer, "I don\'t know, I think sometimes, but I\'m not sure", and the app asking "Did you mean some of the time?" before confirming the answer.',
  system:
    'A type sample beside a scale of six bars growing in size, and a row of colour swatches.',
  imaging:
    'An MRI series split between the original and a redacted version with patient details blacked out, stamped as reviewed by a human.',
}

const mri = { src: '/work/deid/hero-mri.png', width: 1180, height: 660 }

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
            <p className="voice-bubble voice-bubble--user">
              “I don’t know… I think sometimes, but I’m not sure.”
            </p>
            <p className="voice-bubble voice-bubble--app">
              Did you mean <em>some of the time</em>?
            </p>
            <p className="voice-confirm">
              <b>✓</b> 3 · Some of the time
            </p>
            <div className="voice-wave">
              {Array.from({ length: 14 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${(i % 7) * 0.11}s` }} />
              ))}
            </div>
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
            <span className="redact-stamp">Reviewed by a human</span>
          </div>
        )}

        {type === 'system' && (
          <div className="story story--scale">
            <span className="scale-type">Aa</span>
            <ul className="scale-bars">
              {['8%', '13%', '21%', '34%', '55%', '89%'].map((w) => (
                <li key={w} style={{ width: w }} />
              ))}
            </ul>
            <ul className="scale-swatches">
              <li />
              <li />
              <li />
              <li />
              <li />
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
