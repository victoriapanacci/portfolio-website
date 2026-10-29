'use client'

import { useEffect, useRef, useState } from 'react'
import type { CaseStudyPrototype as CaseStudyPrototypeType } from '@/lib/projects'

/** "390 / 844" → 0.462: the ratio as a number, for the plate's width math. */
function ratioOf(aspect: string) {
  const [w, h] = aspect.split('/').map((n) => parseFloat(n))
  return w > 0 && h > 0 ? w / h : 1.6
}

/**
 * Embeds an interactive prototype (e.g. a live Figma proto) on the media
 * plate. The iframe is lazy-loaded and titled for accessibility. The plate
 * sizes itself to the screen from the prototype's aspect ratio (see
 * `.media--proto` in globals.css), so the whole artboard fits the viewport
 * without the page overflowing.
 *
 * Keyboard focus: the browser hands focus straight to the document inside
 * the iframe, so the iframe itself never matches `:focus-visible`. The
 * plate draws the site's focus ring instead while focus is inside the
 * prototype after a Tab, so a keyboard user can see where they are.
 */
export function CaseStudyPrototype({
  prototype,
}: {
  prototype: CaseStudyPrototypeType
}) {
  const aspect = prototype.aspect ?? '16 / 10'
  const frameStyle = {
    '--proto-aspect': aspect,
    '--proto-ratio': ratioOf(aspect).toFixed(4),
  } as React.CSSProperties

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    // A Tab that lands in the iframe fires keydown here and blurs the window
    // straight after; a click inside the iframe only blurs it. So the ring
    // is drawn only when the blur follows a Tab within a beat.
    let lastTab = -Infinity
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') lastTab = performance.now()
    }
    const onBlur = () => {
      const byKeyboard = performance.now() - lastTab < 400
      if (byKeyboard && document.activeElement === iframeRef.current) setFocused(true)
    }
    const onFocus = () => setFocused(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  return (
    <figure className="media media--proto">
      {prototype.eyebrow ? (
        <figcaption className="media__label label">{prototype.eyebrow}</figcaption>
      ) : null}
      <div
        className={`media__frame${focused ? ' media__frame--focused' : ''}`}
        style={frameStyle}
      >
        <iframe
          ref={iframeRef}
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
