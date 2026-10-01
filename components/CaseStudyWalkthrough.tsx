'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { CaseStudyWalkthrough as Walkthrough } from '@/lib/projects'

/**
 * A guided tour of how trust shows up in the UI: an iPhone frame with
 * numbered pins over the exact regions that do the work, and a list of
 * steps beside it. Auto-advances gently until the reader takes over.
 */
/** Breathing room around each callout, in px, beyond the region it marks. */
const PIN_PAD = 4

export function CaseStudyWalkthrough({ walk }: { walk: Walkthrough }) {
  const { steps, interval = 5200 } = walk
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [annotate, setAnnotate] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (paused || reduced || steps.length < 2) return
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % steps.length),
      interval,
    )
    return () => window.clearInterval(id)
  }, [paused, reduced, steps.length, interval])

  const pick = (i: number) => {
    setActive(i)
    setPaused(true)
  }

  const step = steps[active]

  return (
    <div className={`cs-walk reveal-on-scroll${annotate ? '' : ' cs-walk--clean'}`}>
      <div className="cs-walk__device">
        <div className="cs-iphone" aria-hidden="true">
          <span className="cs-iphone__btn cs-iphone__btn--l1" />
          <span className="cs-iphone__btn cs-iphone__btn--l2" />
          <span className="cs-iphone__btn cs-iphone__btn--l3" />
          <span className="cs-iphone__btn cs-iphone__btn--r1" />
          <div className="cs-iphone__screen">
            {steps.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt=""
                width={780}
                height={1688}
                className={`cs-iphone__shot${i === active ? ' is-active' : ''}`}
              />
            ))}
          </div>
          <span className="cs-iphone__island" />
          {/* Pins sit in a layer above the frame so they are never clipped */}
          <div className="cs-walk__pins">
            {annotate && step.callouts.map((c, i) => (
              <span
                key={`${active}-${i}`}
                className="cs-walk__pin"
                style={{
                  left: `calc(${c.x}% - ${PIN_PAD}px)`,
                  top: `calc(${c.y}% - ${PIN_PAD}px)`,
                  width: `calc(${c.w}% + ${PIN_PAD * 2}px)`,
                  height: `calc(${c.h}% + ${PIN_PAD * 2}px)`,
                }}
              >
                <i>{i + 1}</i>
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="cs-walk__toggle"
          role="switch"
          aria-checked={annotate}
          onClick={() => setAnnotate((v) => !v)}
        >
          <span className="cs-walk__toggle-track" aria-hidden="true">
            <span className="cs-walk__toggle-thumb" />
          </span>
          <span>Annotations {annotate ? 'on' : 'off'}</span>
        </button>
      </div>

      <ol className="cs-walk__steps">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className={`cs-walk__step${i === active ? ' is-active' : ''}`}
          >
            <button
              type="button"
              onClick={() => pick(i)}
              aria-expanded={i === active}
            >
              <span className="cs-walk__num">{`0${i + 1}`}</span>
              <span className="cs-walk__title">{s.title}</span>
            </button>
            <div className="cs-walk__body" hidden={i !== active}>
              <p>{s.body}</p>
              <ol className="cs-walk__notes">
                {s.callouts.map((c, j) => (
                  <li key={c.note}>
                    <i>{j + 1}</i>
                    <span>{c.note}</span>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
