import Image from 'next/image'
import type { CaseStudyImage, CaseStudyMediaItem } from '@/lib/projects'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

/**
 * Frames any case-study image inside the design system: a hairline-bordered
 * plate with a small label and a caption. Keeps real product screenshots
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
    <Reveal
      as="figure"
      className={`cs-media cs-media--${variant}${className ? ` ${className}` : ''}`}
    >
      {media.eyebrow ? (
        <SectionLabel as="span" className="cs-media__eyebrow">
          {media.eyebrow}
        </SectionLabel>
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
    </Reveal>
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
          <Reveal
            as="figure"
            key={m.grid.map((g) => g.src).join('|')}
            className="cs-media-grid"
            style={{ '--cs-media-cols': m.columns } as React.CSSProperties}
          >
            <div className="cs-media-grid__items">
              {m.grid.map((g) => (
                <CaseStudyMedia key={g.src} media={g} />
              ))}
            </div>
            {m.caption ? (
              <figcaption className="cs-media__caption">{m.caption}</figcaption>
            ) : null}
          </Reveal>
        ) : (
          <CaseStudyMedia key={m.src} media={m} />
        ),
      )}
    </>
  )
}
