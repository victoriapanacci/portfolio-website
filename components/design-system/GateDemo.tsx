'use client'

import { useEffect, useState } from 'react'

type Result = 'running' | 'pass' | 'fail'

const CHECK_DELAY = 500

/**
 * A mock pull request card. The switch swaps one line of the diff between a
 * token and a raw hex value, and the check beneath it re-runs: PASS for the
 * token, FAIL for the hex. It illustrates the rule; it is not a real tool.
 */
export function GateDemo() {
  const [offSystem, setOffSystem] = useState(false)
  const [result, setResult] = useState<Result>('running')

  useEffect(() => {
    setResult('running')
    const id = window.setTimeout(
      () => setResult(offSystem ? 'fail' : 'pass'),
      CHECK_DELAY,
    )
    return () => window.clearTimeout(id)
  }, [offSystem])

  const added = offSystem ? 'background: #2d6cdf;' : 'background: var(--color-accent);'

  return (
    <div className="card ds-gate">
      <div className="ds-gate__head">
        <div>
          <span className="eyebrow">Pull request</span>
          <p className="ds-gate__title">Bet slip: selected cell</p>
        </div>
        <span className="tag tag--outlined">1 file changed</span>
      </div>

      <pre className="ds-gate__diff" aria-label="Diff">
        <code>
          <span className="ds-gate__ln">{'  .bet-slip__cell[aria-selected="true"] {'}</span>
          <span className="ds-gate__ln is-add">{`+   ${added}`}</span>
          <span className="ds-gate__ln">{'  }'}</span>
        </code>
      </pre>

      <div className="ds-gate__controls">
        <button
          type="button"
          className="switch"
          role="switch"
          aria-checked={offSystem}
          onClick={() => setOffSystem((v) => !v)}
        >
          <span className="switch__track" aria-hidden="true">
            <span className="switch__thumb" />
          </span>
          <span>Use an off-system value</span>
        </button>
      </div>

      <div className="ds-gate__check" aria-live="polite">
        <span className="ds-gate__name">Token check</span>
        <span className="ds-gate__status" data-state={result}>
          {result === 'running' ? 'Running' : result === 'pass' ? 'PASS' : 'FAIL'}
        </span>
        {result === 'fail' ? (
          <p className="ds-gate__reason">hex value found, token expected</p>
        ) : null}
      </div>
    </div>
  )
}
