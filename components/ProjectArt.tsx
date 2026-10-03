import Image from 'next/image'
import type { ProjectArtType } from '@/lib/projects'

const artLabel: Record<ProjectArtType, string> = {
  cashier:
    'Cashier withdrawal screen: a linked MetaMask wallet, Bitcoin selected, a $250 amount, and network fee tiers.',
  mobile:
    'Two DribbleCollect questionnaire screens: a vision question with answer options, and the same question with the voice-to-text transcription pane open.',
  system:
    'Design system sheet: a type sample, colour swatches, primary and secondary buttons, and a text field.',
  imaging:
    'Fusion redaction viewer: an MRI series with burned-in patient details blacked out and DICOM tag fields.',
}

/** Real screens from each project. */
const shots = {
  eproClosed: { src: '/work/epro/card-questionnaire.png', width: 298, height: 646 },
  eproOpen: { src: '/work/epro/card-voice-to-text.png', width: 298, height: 646 },
  cashier: { src: '/work/cashier/hero-2-amount.png', width: 780, height: 1688 },
  mri: { src: '/work/deid/hero-mri.png', width: 1180, height: 660 },
} as const

type Shot = (typeof shots)[keyof typeof shots]

function Screen({ shot, className }: { shot: Shot; className: string }) {
  return (
    <div className={`card-screen ${className}`}>
      <Image
        src={shot.src}
        alt=""
        width={shot.width}
        height={shot.height}
        className="card-screen__img"
      />
    </div>
  )
}

function WindowBar({ title }: { title: string }) {
  return (
    <div className="card-window__bar">
      <span className="card-window__dots">
        <i />
        <i />
        <i />
      </span>
      <span>{title}</span>
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
      <div className="project-art__stage" aria-hidden="true">
        {type === 'mobile' && (
          <>
            <Screen shot={shots.eproClosed} className="card-screen--a" />
            <Screen shot={shots.eproOpen} className="card-screen--b" />
          </>
        )}

        {type === 'cashier' && (
          <Screen shot={shots.cashier} className="card-screen--solo" />
        )}

        {type === 'imaging' && (
          <div className="card-window">
            <WindowBar title="Fusion · De-identify" />
            <div className="card-window__body">
              <div className="scan-tabs">
                <span>Original</span>
                <span className="is-active">Redacted</span>
              </div>
              <div className="scan-frame">
                <Image
                  src={shots.mri.src}
                  alt=""
                  width={shots.mri.width}
                  height={shots.mri.height}
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
            </div>
          </div>
        )}

        {type === 'system' && (
          <div className="card-window card-window--system">
            <WindowBar title="Foundations" />
            <div className="card-window__body">
              <div className="sys-type">
                <span className="sys-type__sample">Aa</span>
                <span className="sys-swatches">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="sys-row">
                <span className="sys-btn sys-btn--primary">Continue</span>
                <span className="sys-btn">Cancel</span>
              </div>
              <div className="sys-field">
                <span className="sys-field__label">Email</span>
                <span className="sys-field__value">victoria@studio.co</span>
              </div>
              <div className="sys-row">
                <span className="sys-chip">Default</span>
                <span className="sys-chip is-on">Selected</span>
                <span className="sys-chip">Disabled</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
