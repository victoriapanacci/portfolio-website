import Image from 'next/image'
import type { ProjectArtType } from '@/lib/projects'

const artLabel: Record<ProjectArtType, string> = {
  cashier:
    'Cashier withdrawal screen on a phone: a linked MetaMask wallet, Bitcoin selected, a $250 amount, and three network fee tiers.',
  mobile:
    'DribbleCollect questionnaire screen on a phone: a vision question with answer options and the voice-to-text transcription pane open.',
  system: 'Design system preview',
  imaging:
    'Fusion redaction viewer: an MRI series with burned-in patient details blacked out, DICOM tag fields, and approve and reject actions.',
}

/** Real screens from each project, framed as device or window mock-ups. */
const shots = {
  cashier: { src: '/work/cashier/hero-2-amount.png', width: 780, height: 1688 },
  mobile: { src: '/work/epro/card-voice-to-text.png', width: 298, height: 646 },
  imaging: { src: '/work/deid/hero-mri.png', width: 1180, height: 660 },
} as const

function PhoneFrame({ shot }: { shot: (typeof shots)['cashier' | 'mobile'] }) {
  return (
    <div className="card-phone" aria-hidden="true">
      <span className="card-phone__btn card-phone__btn--l1" />
      <span className="card-phone__btn card-phone__btn--l2" />
      <span className="card-phone__btn card-phone__btn--l3" />
      <span className="card-phone__btn card-phone__btn--r1" />
      <div className="card-phone__screen">
        <Image
          src={shot.src}
          alt=""
          width={shot.width}
          height={shot.height}
          className="card-phone__shot"
        />
      </div>
      <span className="card-phone__island" />
    </div>
  )
}

export function ProjectArt({ type }: { type: ProjectArtType }) {
  return (
    <div
      className={`project-art project-art--${type}`}
      role="img"
      aria-label={artLabel[type]}
    >
      {(type === 'cashier' || type === 'mobile') && (
        <div className="project-art__stage">
          <div className="project-art__glow" />
          <PhoneFrame shot={shots[type]} />
        </div>
      )}

      {type === 'imaging' && (
        <div className="project-art__surface">
          <div className="scan-bar">
            <span className="scan-bar__dots">
              <i />
              <i />
              <i />
            </span>
            <span>Fusion · De-identify</span>
          </div>
          <div className="scan-body">
            <div className="scan-tabs">
              <span>Original</span>
              <span className="is-active">Redacted</span>
            </div>
            <div className="scan-frame">
              <Image
                src={shots.imaging.src}
                alt=""
                width={shots.imaging.width}
                height={shots.imaging.height}
                className="scan-image"
              />
              <div className="redaction-box redaction-box--a" />
              <div className="redaction-box redaction-box--b" />
              <div className="redaction-box redaction-box--c" />
            </div>
            <ul className="scan-tags">
              <li>
                PatientName <b />
              </li>
              <li>
                StudyDate <b />
              </li>
              <li>
                Institution <b />
              </li>
              <li>
                PatientID <b />
              </li>
            </ul>
            <div className="scan-actions">
              <span className="is-primary">Approve</span>
              <span>Reject</span>
            </div>
          </div>
        </div>
      )}

      {type === 'system' && (
        <div className="project-art__surface">
          <div className="system-head">
            <div className="type-sample">Aa</div>
            <div className="swatches">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="system-rows">
            <div className="system-row">
              Typography <span>→</span>
            </div>
            <div className="system-row">
              Buttons <span>→</span>
            </div>
            <div className="system-row">
              Inputs <span>→</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
