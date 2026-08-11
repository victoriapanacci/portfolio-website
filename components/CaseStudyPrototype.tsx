import type { CaseStudyPrototype as CaseStudyPrototypeType } from '@/lib/projects'

/**
 * Embeds an interactive prototype (e.g. a live Figma proto) inside the
 * case-study design system. Mirrors the CaseStudyMedia plate aesthetic:
 * a hairline-bordered frame with a rose eyebrow tag and caption. The iframe
 * is lazy-loaded and titled for accessibility, with an "Open in Figma" link
 * as a fallback when the embed is blocked.
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
      <figcaption className="cs-proto__caption">
        {prototype.caption ? <span>{prototype.caption}</span> : null}
        {prototype.href ? (
          <a
            className="cs-proto__link"
            href={prototype.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Figma
            <span aria-hidden="true"> ↗</span>
          </a>
        ) : null}
      </figcaption>
    </figure>
  )
}
