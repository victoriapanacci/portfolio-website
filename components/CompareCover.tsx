'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { ProjectCompare } from '@/lib/projects'

const REST = 50
const MIN = 6
const MAX = 94
/** Pointer travel, in px, past which a touch is a drag and not a tap on the card link. */
const DRAG_THRESHOLD = 6

const clamp = (n: number) => Math.min(MAX, Math.max(MIN, n))

/**
 * Card art as a working before/after slider. The after layer is clipped at
 * `--split`; a mouse moves the split by hovering, a finger by dragging. The
 * card around it is still one link: a tap goes through, a drag does not.
 * Leaving the art eases the split back to the middle.
 */
export function CompareCover({ compare }: { compare: ProjectCompare }) {
  const ref = useRef<HTMLDivElement>(null)
  const [split, setSplit] = useState(REST)
  const [following, setFollowing] = useState(false)
  const dragging = useRef(false)
  const dragged = useRef(false)
  const startX = useRef(0)

  const moveTo = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box || box.width === 0) return
    setSplit(clamp(((clientX - box.left) / box.width) * 100))
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return
    dragging.current = true
    dragged.current = false
    startX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
    setFollowing(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      setFollowing(true)
      moveTo(e.clientX)
      return
    }
    if (!dragging.current) return
    if (Math.abs(e.clientX - startX.current) > DRAG_THRESHOLD) dragged.current = true
    moveTo(e.clientX)
  }

  const release = () => {
    dragging.current = false
    setFollowing(false)
    setSplit(REST)
  }

  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') release()
  }

  /* A finger that dragged the handle must not also follow the card link. */
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragged.current) return
    dragged.current = false
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      ref={ref}
      className="project-art project-art--compare"
      data-following={following ? 'true' : 'false'}
      style={{ '--split': `${split}%` } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={onPointerLeave}
      onClickCapture={onClickCapture}
    >
      <div className="compare-layer">
        <Image
          src={compare.before.src}
          alt={compare.before.alt}
          width={compare.width}
          height={compare.height}
          sizes="(min-width: 1280px) 600px, (min-width: 641px) 50vw, 100vw"
          className="project-art__cover"
        />
      </div>
      <div className="compare-layer compare-layer--after">
        <Image
          src={compare.after.src}
          alt={compare.after.alt}
          width={compare.width}
          height={compare.height}
          sizes="(min-width: 1280px) 600px, (min-width: 641px) 50vw, 100vw"
          className="project-art__cover"
        />
      </div>
      <div className="compare-divider" aria-hidden="true">
        <span className="compare-handle">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  )
}
