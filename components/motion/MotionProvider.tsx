'use client'

import { MotionConfig } from 'motion/react'

/**
 * One place for site-wide motion settings. `reducedMotion="user"` makes every
 * motion component drop its transform animations (and keep opacity) when the
 * visitor has asked their OS for reduced motion, so no component has to
 * check the preference itself.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
