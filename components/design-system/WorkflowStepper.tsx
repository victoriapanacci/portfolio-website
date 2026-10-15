'use client'

import { useId, useState } from 'react'

export type WorkflowStep = { name: string; line: string }

/**
 * Five steps in a row (a column on phones). Activating a step reveals its
 * one line of explanation beneath it. One step is open at a time.
 */
export function WorkflowStepper({ steps }: { steps: WorkflowStep[] }) {
  const base = useId()
  const [active, setActive] = useState<number | null>(null)

  return (
    <ol className="ds-stepper" aria-label="Workflow">
      {steps.map((s, i) => {
        const open = active === i
        const id = `${base}-line-${i}`
        return (
          <li key={s.name} className="ds-step">
            <button
              type="button"
              className="ds-step__btn"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setActive(open ? null : i)}
            >
              <span className="numeral ds-step__num" aria-hidden="true">
                {`0${i + 1}`}
              </span>
              <span className="ds-step__name">{s.name}</span>
            </button>
            <p id={id} className="ds-step__line" hidden={!open}>
              {s.line}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
