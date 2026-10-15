import type { ProjectArtType } from '@/lib/projects'

const artLabel: Record<ProjectArtType, string> = {
  mobile: 'Mobile product preview',
  imaging: 'Medical image redaction preview',
}

/**
 * Drawn illustrations for case-study heroes that do not have real media
 * yet. Cards always use a photographic cover instead.
 */
export function ProjectArt({ type }: { type: ProjectArtType }) {
  return (
    <div
      className={`project-art project-art--${type}`}
      role="img"
      aria-label={artLabel[type]}
    >
      <div className="project-art__surface">
        {type === 'mobile' && (
          <div className="phone-shell">
            <div className="phone-notch" />
            <div className="phone-copy">Good morning, Victoria</div>
            <div className="phone-title">How can we help you today?</div>
            <div className="phone-row">
              My tasks <span>2</span>
            </div>
            <div className="phone-row">
              Messages <span>1</span>
            </div>
            <div className="phone-row">
              Resources <span>→</span>
            </div>
          </div>
        )}
        {type === 'imaging' && (
          <>
            <div className="scan-toolbar">
              <span>Redact</span>
              <span>Audit</span>
            </div>
            <div className="scan-frame">
              <div className="scan-image" />
              <div className="redaction-box redaction-box--a" />
              <div className="redaction-box redaction-box--b" />
            </div>
            <div className="scan-status">
              PHI removed · 3 of 3 <span>✓</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
