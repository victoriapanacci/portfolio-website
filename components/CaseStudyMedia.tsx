import Image from 'next/image'
import type { CaseStudyImage } from '@/lib/projects'

/**
 * Frames any case-study image inside the design system: a hairline-bordered
 * plate with a rose eyebrow tag and a caption. Keeps real product screenshots
 * and boards feeling native to the warm-ink / rose aesthetic instead of
 * dropping raw white artboards onto the dark background.
 */
export function CaseStudyMedia({
  media,
  className,
}: {
  media: CaseStudyImage
  className?: string
}) {
  const variant = media.variant ?? 'plate'

  return (
    <figure
      className={`cs-media cs-media--${variant} reveal-on-scroll${className ? ` ${className}` : ''}`}
    >
      {media.eyebrow ? (
        <figcaption className="cs-media__eyebrow">{media.eyebrow}</figcaption>
      ) : null}
      <div className="cs-media__frame">
        <Image
          src={media.src || '/placeholder.svg'}
          alt={media.alt}
          width={2400}
          height={1400}
          sizes="(max-width: 900px) 100vw, 900px"
          className="cs-media__img"
        />
      </div>
      {media.caption ? (
        <figcaption className="cs-media__caption">{media.caption}</figcaption>
      ) : null}
    </figure>
  )
}

/**
 * Renders one artifact or a stacked group of them. Accepts a single image,
 * an array, or undefined, so any case-study section can carry visuals.
 */
export function CaseStudyMediaGroup({
  media,
}: {
  media?: CaseStudyImage | CaseStudyImage[]
}) {
  if (!media) return null
  const items = Array.isArray(media) ? media : [media]
  return (
    <>
      {items.map((m) => (
        <CaseStudyMedia key={m.src} media={m} />
      ))}
    </>
  )
}
