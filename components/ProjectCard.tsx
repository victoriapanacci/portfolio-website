import { ArrowLink } from './ArrowLink'

type Project = {
  index: string
  title: string
  category: string
  description: string
  art: 'cashier' | 'mobile' | 'system'
}

const artLabel = {
  cashier: 'Cashier experience preview',
  mobile: 'Mobile product preview',
  system: 'Design system preview',
}

function ProjectArt({ type }: { type: Project['art'] }) {
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
            <div className="type-sample">Aa</div>
            <div className="swatches">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="system-row">
              Typography <span>→</span>
            </div>
            <div className="system-row">
              Buttons <span>→</span>
            </div>
            <div className="system-row">
              Inputs <span>→</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card reveal-on-scroll group">
      <div className="project-index">{project.index}</div>
      <ProjectArt type={project.art} />
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p className="project-category">{project.category}</p>
        <div className="short-rule" />
        <p className="project-description">{project.description}</p>
        <ArrowLink href="#">View case study</ArrowLink>
      </div>
    </article>
  )
}
