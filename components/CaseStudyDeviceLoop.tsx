'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { CaseStudyDevice } from '@/lib/projects'

/**
 * An iPhone 15 frame drawn in CSS with a set of screens that crossfade on a
 * loop, plus a row of state labels that tracks the active screen. Honors
 * prefers-reduced-motion by holding on the first screen.
 */
export function CaseStudyDeviceLoop({ device }: { device: CaseStudyDevice }) {
  const { screens, backdrop, interval = 3200 } = device
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduced || screens.length < 2) return
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % screens.length),
      interval,
    )
    return () => window.clearInterval(id)
  }, [reduced, screens.length, interval])

  return (
    <figure
      className="cs-device-stage reveal"
      style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}
    >
      <div className="cs-iphone" aria-hidden="true">
        <span className="cs-iphone__btn cs-iphone__btn--l1" />
        <span className="cs-iphone__btn cs-iphone__btn--l2" />
        <span className="cs-iphone__btn cs-iphone__btn--l3" />
        <span className="cs-iphone__btn cs-iphone__btn--r1" />
        <div className="cs-iphone__screen">
          {screens.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt=""
              width={780}
              height={1688}
              priority={i === 0}
              className={`cs-iphone__shot${i === active ? ' is-active' : ''}`}
            />
          ))}
        </div>
        <span className="cs-iphone__island" />
      </div>

      <ol className="cs-device-steps" aria-label="Screens in this flow">
        {screens.map((s, i) => (
          <li
            key={s.label}
            className={i === active ? 'is-active' : undefined}
            aria-current={i === active ? 'step' : undefined}
          >
            <button type="button" onClick={() => setActive(i)}>
              {s.label}
            </button>
          </li>
        ))}
      </ol>

      <figcaption className="sr-only">{screens[active]?.alt}</figcaption>
    </figure>
  )
}
