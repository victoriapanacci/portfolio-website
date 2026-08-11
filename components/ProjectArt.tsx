import type { ProjectArtType } from '@/lib/projects'

const artLabel: Record<ProjectArtType, string> = {
  cashier: 'Cashier experience preview',
  mobile: 'Mobile product preview',
  system: 'Design system preview',
  imaging: 'Medical image redaction preview',
}

export function ProjectArt({ type }: { type: ProjectArtType }) {
  return (
    <div
      className={`project-art project-art--${type}`}
      role="img"
      aria-label={artLabel[type]}
    >
      <div className="project-art__surface">
        {type === 'cashier' && (
          <>
            <div className="mini-label">QUICK BALANCE</div>
            <div className="mini-balance">$2,450.75</div>
            <div className="mini-tabs">
              <span>Deposit</span>
              <span>Withdraw</span>
              <span>Transactions</span>
            </div>
            <div className="mini-grid">
              <i />
              <i />
              <i />
              <i />
            </div>
          </>
        )}
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
        {type === 'system' && (
          <>
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
          </>
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
