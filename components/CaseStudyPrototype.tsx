import type { CaseStudyPrototype as CaseStudyPrototypeType } from '@/lib/projects'

/**
 * Embeds an interactive prototype (e.g. a live Figma proto) inside the
 * case-study design system. Mirrors the CaseStudyMedia plate aesthetic:
 * a hairline-bordered frame with a rose eyebrow tag and caption. The iframe
 * is lazy-loaded and titled for accessibility.
 */
export function CaseStudyPrototype({
  prototype,
}: {
  prototype: CaseStudyPrototypeType
}) {
  const aspect = prototype.aspect ?? '16 / 10'

  return (
    <figure className="cs-proto reveal-on-scroll">
      {prototype.eyebrow ? (
        <figcaption className="cs-proto__eyebrow">{prototype.eyebrow}</figcaption>
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
        <figcaption className="cs-proto__caption">{prototype.caption}</figcaption>
      ) : null}
    </figure>
  )
}
