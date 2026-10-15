'use client'

import Image from 'next/image'
import { useRef } from 'react'
import type { CaseStudyImage } from '@/lib/projects'

/**
 * The media plate with a lightbox. The frame is a button that opens the
 * same image full size in a native dialog, which handles focus, Escape and
 * the backdrop. Markup mirrors `CaseStudyMedia` so the plates match.
 */
export function LightboxMedia({ media }: { media: CaseStudyImage }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const variant = media.variant ?? 'plate'

  const open = () => dialog.current?.showModal()
  const close = () => dialog.current?.close()

  return (
    <figure className={`media media--${variant}`}>
      {media.eyebrow ? (
        <figcaption className="media__label label">{media.eyebrow}</figcaption>
      ) : null}
      <div className="media__frame">
        <button
          type="button"
          className="lightbox-trigger"
          onClick={open}
          aria-label={`View larger: ${media.alt}`}
        >
          <Image
            src={media.src}
            alt={media.alt}
            width={2400}
            height={1400}
            sizes="(max-width: 900px) 100vw, 900px"
            className="media__img"
          />
        </button>
      </div>
      {media.caption ? (
        <figcaption className="media__caption caption">{media.caption}</figcaption>
      ) : null}

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={media.alt}
        onClick={(e) => {
          // A click on the backdrop lands on the dialog itself, not its content.
          if (e.target === e.currentTarget) close()
        }}
      >
        <div className="lightbox__body">
          <Image
            src={media.src}
            alt={media.alt}
            width={2400}
            height={1400}
            sizes="100vw"
            className="lightbox__img"
          />
          {media.caption ? <p className="lightbox__caption caption">{media.caption}</p> : null}
        </div>
        <button type="button" className="button lightbox__close" onClick={close}>
          <span>Close</span>
          <span aria-hidden="true" className="button__arrow">
            ×
          </span>
        </button>
      </dialog>
    </figure>
  )
}
