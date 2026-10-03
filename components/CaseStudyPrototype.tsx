import type { CaseStudyPrototype as CaseStudyPrototypeType } from '@/lib/projects'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

/**
 * Embeds an interactive prototype (e.g. a live Figma proto) inside the
 * case-study design system. Mirrors the CaseStudyMedia plate aesthetic:
 * a hairline-bordered frame with a small label and caption. The iframe
 * is lazy-loaded and titled for accessibility.
 */
export function CaseStudyPrototype({
  prototype,
}: {
  prototype: CaseStudyPrototypeType
}) {
  const aspect = prototype.aspect ?? '16 / 10'

  return (
    <Reveal as="figure" className="cs-proto">
      {prototype.eyebrow ? (
        <SectionLabel as="span" className="cs-media__eyebrow">
          {prototype.eyebrow}
        </SectionLabel>
      ) : null}
      <div className="cs-proto__frame" style={{ aspectRatio: aspect }}>
        <iframe
          className="cs-proto__iframe"
          src={prototype.src}
          title={prototype.title}
          loading="lazy"
          allowFullScreen
        />
      </div>
      {prototype.caption ? (
        <figcaption className="cs-media__caption">{prototype.caption}</figcaption>
      ) : null}
    </Reveal>
  )
}
