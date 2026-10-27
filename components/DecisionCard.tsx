import type { CaseStudyDecision } from '@/lib/projects'
import { CaseStudyMedia } from './CaseStudyMedia'

/**
 * One decision as a repeated four-beat card: what I chose, what I rejected,
 * what it cost, and what I'd do now. The four lines are a definition list
 * beside the figure on the decision row layout; a card without an image
 * runs its lines across the field. Renders a list item for a
 * `.cs-decisions` list.
 */
export function DecisionCard({ title, image, chose, rejected, cost, now }: CaseStudyDecision) {
  const lines: [string, string][] = [
    ['Chose', chose],
    ['Rejected', rejected],
    ['Cost', cost],
    ['Now', now],
  ]

  return (
    <li className={`cs-decision cs-decision-card${image ? '' : ' cs-decision-card--text'}`}>
      <div className="cs-decision__copy">
        <h3>{title}</h3>
        <dl className="cs-decision-card__lines">
          {lines.map(([label, value]) => (
            <div key={label}>
              <dt className="label">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      {image ? (
        <div className="cs-decision__media">
          <CaseStudyMedia media={{ src: image.src, alt: image.alt, variant: 'bleed' }} />
        </div>
      ) : null}
    </li>
  )
}
