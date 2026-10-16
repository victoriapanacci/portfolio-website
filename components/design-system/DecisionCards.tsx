'use client'

import { useEffect, useId, useState } from 'react'

export type Decision = {
  title: string
  lead: string
  beats: { label: string; body: string }[]
}

/**
 * Each decision is a hairline row with its title and lead. The title is the
 * disclosure button; its hit area stretches over the whole row head, so the
 * heading's name stays the title alone. On phones one is open at a time; on
 * larger screens any number can be open.
 */
export function DecisionCards({ decisions }: { decisions: Decision[] }) {
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
    <ul className="ds-decisions">
      {decisions.map((d, i) => {
        const isOpen = open.has(i)
        const panelId = `${base}-panel-${i}`
        return (
          <li key={d.title} className="ds-decision" data-open={isOpen}>
            <div className="ds-decision__head">
              <div className="ds-decision__copy">
                <h3 className="ds-decision__heading">
                  <button
                    type="button"
                    className="ds-decision__toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    {d.title}
                  </button>
                </h3>
                <p className="ds-decision__lead">{d.lead}</p>
              </div>
              <span className="ds-decision__glyph" aria-hidden="true">
                +
              </span>
            </div>
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
    </ul>
  )
}
