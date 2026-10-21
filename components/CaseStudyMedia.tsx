import Image from 'next/image'
import type { CaseStudyImage, CaseStudyMediaItem } from '@/lib/projects'

/**
 * The media plate: the one way an artifact is shown. A hairline-bordered
 * frame with a label above and a caption beneath. `plate` mats the image on
 * a light surface; `bleed` lets it fill the frame; `phone` centres a single
 * portrait screen at phone width. An empty `src` draws a labelled
 * placeholder frame instead, so a story can be laid out before its
 * artifacts exist.
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
      className={`media media--${variant}${media.span === 'text' ? ' media--span-text' : ''}${className ? ` ${className}` : ''}`}
    >
      {media.eyebrow ? (
        <figcaption className="media__label label">{media.eyebrow}</figcaption>
      ) : null}
      {media.src ? (
        <div className="media__frame">
          <Image
            src={media.src}
            alt={media.alt}
            width={2400}
            height={1400}
            sizes="(max-width: 900px) 100vw, 900px"
            className="media__img"
          />
        </div>
      ) : (
        <div
          className="media__frame media__frame--placeholder"
          style={{ aspectRatio: media.aspect ?? (variant === 'phone' ? '9 / 19.5' : '16 / 9') }}
          role="img"
          aria-label={media.alt}
        >
          <div className="media__placeholder">
            <span className="label">Image to come</span>
            <p className="caption">{media.alt}</p>
          </div>
        </div>
      )}
      {media.caption ? (
        <figcaption className="media__caption caption">{media.caption}</figcaption>
      ) : null}
    </figure>
  )
}

/**
 * Renders one artifact or a stacked group of them. Accepts a single image,
 * a grid of images under one caption, an array of either, or undefined, so
 * any case-study section can carry visuals.
 */
export function CaseStudyMediaGroup({
  media,
}: {
  media?: CaseStudyMediaItem | CaseStudyMediaItem[]
}) {
  if (!media) return null
  const items = Array.isArray(media) ? media : [media]
  return (
    <>
      {items.map((m) =>
        'grid' in m ? (
          <figure
            key={m.grid.map((g) => g.src).join('|')}
            className="media-grid"
            style={{ '--media-cols': m.columns } as React.CSSProperties}
          >
            <div className="media-grid__items">
              {m.grid.map((g) => (
                <CaseStudyMedia key={g.src} media={g} />
              ))}
            </div>
            {m.caption ? (
              <figcaption className="media__caption caption">{m.caption}</figcaption>
            ) : null}
          </figure>
        ) : (
          <CaseStudyMedia key={m.src} media={m} />
        ),
      )}
    </>
  )
}
