'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = {
  from: number
  to: number
  /** Formats the running number into the display string. */
  format: (n: number) => string
  /** Label shown beside the number. When `labelFrom` is set it shows during the count and swaps at the end. */
  label: string
  labelFrom?: string
}

const stats: Stat[] = [
  { from: 200, to: 80, format: (n) => `${Math.round(n)}+`, labelFrom: 'values', label: 'tokens' },
  { from: 0, to: 100, format: (n) => `${Math.round(n)}%`, label: 'of screens' },
  { from: 0, to: 2.5, format: (n) => n.toFixed(1), label: 'months' },
]

const DURATION = 1600

/** A cubic ease-out: the same shape as the site's arrival curve. */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Three counters that run once when the strip scrolls into view. Under
 * prefers-reduced-motion they render their final values immediately.
 */
export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setProgress(1)
      setDone(true)
      return
    }
    let frame = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION)
          setProgress(easeOut(t))
          if (t < 1) frame = requestAnimationFrame(tick)
          else setDone(true)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className="ds-stats">
        {stats.map((s) => {
          const value = s.from + (s.to - s.from) * progress
          const label = s.labelFrom && !done ? s.labelFrom : s.label
          return (
            <div key={s.label} className="ds-stat">
              <span className="ds-stat__value" aria-hidden="true">
                {s.format(value)}
              </span>
              <span className="ds-stat__label" aria-hidden="true">
                {label}
              </span>
              <span className="sr-only">
                {s.labelFrom
                  ? `${s.format(s.from)} ${s.labelFrom} to ${s.format(s.to)} ${s.label}`
                  : `${s.format(s.to)} ${s.label}`}
              </span>
            </div>
          )
        })}
    </div>
  )
}
