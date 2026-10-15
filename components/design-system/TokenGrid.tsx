'use client'

import { useEffect, useRef, useState } from 'react'
import type { ColourToken } from '@/lib/tokens'

const COPIED_FOR = 1600

/**
 * A swatch grid of the site's colour tokens. Each swatch paints with the
 * live custom property, so what you see is what the stylesheet resolves.
 * Activating a swatch copies the token name to the clipboard.
 */
export function TokenGrid({ tokens }: { tokens: ColourToken[] }) {
  const [copied, setCopied] = useState<string | null>(null)
  const [announce, setAnnounce] = useState('')
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name)
      setCopied(name)
      setAnnounce(`Copied ${name}`)
    } catch {
      setAnnounce(`Could not copy. The token is ${name}`)
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(null), COPIED_FOR)
  }

  return (
    <>
      <ul className="ds-tokens" aria-label="Colour tokens">
        {tokens.map((t) => (
          <li key={t.name}>
            <button
              type="button"
              className="ds-token"
              onClick={() => copy(t.name)}
              aria-label={`Copy ${t.name}`}
              title={t.value}
              style={{ '--swatch': `var(${t.name})` } as React.CSSProperties}
            >
              <span className="ds-token__swatch" aria-hidden="true" />
              <span className="ds-token__name" aria-hidden="true">
                {copied === t.name ? 'Copied' : t.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </>
  )
}
