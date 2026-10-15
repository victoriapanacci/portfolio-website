'use client'

import { useState } from 'react'

type RowState = 'available' | 'selected' | 'off'

const states: { id: RowState; label: string }[] = [
  { id: 'available', label: 'Available' },
  { id: 'selected', label: 'Selected' },
  { id: 'off', label: 'No line' },
]

const markets = [
  { name: 'Spread', line: '+3.5', price: '-110' },
  { name: 'Total', line: 'O 221.5', price: '-108' },
  { name: 'Money', line: 'TOR', price: '+150' },
]

const describe: Record<RowState, string> = {
  available: 'Every market is open. Each cell shows its line and price.',
  selected: 'The spread is in the slip. The selected cell is peach.',
  off: 'No market is available. Every cell is locked.',
}

/**
 * One bet-lines row built from the site's own chip and card components, with
 * three chips above it that switch the row between its states.
 */
export function StatesDemo() {
  const [state, setState] = useState<RowState>('available')

  return (
    <div className="ds-demo">
      <ul className="ds-chips" aria-label="Row state">
        {states.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              className="chip"
              aria-pressed={state === s.id}
              onClick={() => setState(s.id)}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="card ds-betline" data-state={state}>
        <div className="ds-betline__event">
          <span className="tag">Tonight 7:30 pm</span>
          <span className="ds-betline__team">Toronto</span>
          <span className="ds-betline__team">Boston</span>
        </div>
        <div className="ds-betline__markets">
          {markets.map((m, i) => {
            const selected = state === 'selected' && i === 0
            const off = state === 'off'
            return (
              <div key={m.name} className="ds-betline__market">
                <span className="tag">{m.name}</span>
                <span
                  className={`ds-odds${selected ? ' is-selected' : ''}${off ? ' is-off' : ''}`}
                  aria-disabled={off || undefined}
                >
                  {off ? (
                    <svg
                      className="ds-odds__lock"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M4.5 7V5.5a3.5 3.5 0 0 1 7 0V7M3.5 7h9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  ) : (
                    <>
                      <span className="ds-odds__line">{m.line}</span>
                      <span className="ds-odds__price">{m.price}</span>
                    </>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {describe[state]}
      </p>
    </div>
  )
}
