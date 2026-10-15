'use client'

import { useEffect, useId, useState } from 'react'

export type Decision = {
  title: string
  lead: string
  beats: { label: string; body: string }[]
}

/**
 * Each decision is a card with its title and lead. Activating the card
 * expands it to show the labelled beats. On phones one card is open at a
 * time; on larger screens any number can be open.
 */
export function DecisionCards({
  decisions,
  startIndex = 0,
}: {
  decisions: Decision[]
  /** Numbering offset, so a list split around other content keeps counting. */
  startIndex?: number
}) {
  const base = useId()
  const [open, setOpen] = useState<Set<number>>(() => new Set())
  const [phone, setPhone] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const sync = () => setPhone(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(phone ? [] : prev)
      if (prev.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <ol className="ds-decisions" start={startIndex + 1}>
      {decisions.map((d, i) => {
        const isOpen = open.has(i)
        const panelId = `${base}-panel-${i}`
        const n = startIndex + i + 1
        return (
          <li key={d.title} className="card ds-decision" data-open={isOpen}>
            <h3 className="ds-decision__heading">
              <button
                type="button"
                className="ds-decision__toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
              >
                <span className="numeral numeral--lg" aria-hidden="true">
                  {n < 10 ? `0${n}` : n}
                </span>
                <span className="ds-decision__copy">
                  <span className="ds-decision__title">{d.title}</span>
                  <span className="ds-decision__lead">{d.lead}</span>
                </span>
                <span className="ds-decision__glyph" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div id={panelId} className="ds-decision__panel" hidden={!isOpen}>
              <dl className="ds-beats">
                {d.beats.map((b) => (
                  <div key={b.label} className="ds-beat">
                    <dt className="label">{b.label}</dt>
                    <dd>{b.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
