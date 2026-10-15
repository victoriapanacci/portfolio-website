import type { CaseStudyPrototype as CaseStudyPrototypeType } from '@/lib/projects'

/**
 * Embeds an interactive prototype (e.g. a live Figma proto) on the media
 * plate. The iframe is lazy-loaded and titled for accessibility.
 */
export function CaseStudyPrototype({
  prototype,
}: {
  prototype: CaseStudyPrototypeType
}) {
  const aspect = prototype.aspect ?? '16 / 10'

  return (
    <figure className="media media--proto">
      {prototype.eyebrow ? (
        <figcaption className="media__label label">{prototype.eyebrow}</figcaption>
      ) : null}
      <div className="media__frame" style={{ aspectRatio: aspect }}>
        <iframe
          className="media__iframe"
          src={prototype.src}
          title={prototype.title}
          loading="lazy"
          allowFullScreen
        />
      </div>
      {prototype.caption ? (
        <figcaption className="media__caption caption">{prototype.caption}</figcaption>
      ) : null}
    </figure>
  )
}
