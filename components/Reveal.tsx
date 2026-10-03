'use client'

import { MotionConfig, motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type Tag =
  | 'div'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'figure'
  | 'li'
  | 'ul'
  | 'ol'

/** Standard ease-out; no overshoot, no bounce. */
const EASE = [0.25, 0.1, 0.25, 1] as const
const DURATION = 0.4
const DISTANCE = 16

type Props = Omit<HTMLMotionProps<'div'>, 'children'> & {
  as?: Tag
  /** Seconds to hold before the fade starts. Use for staggering cards. */
  delay?: number
  children?: React.ReactNode
}

/**
 * Gentle fade-up when the element scrolls into view. Runs once, honours
 * prefers-reduced-motion, and is the only entrance animation on the site.
 */
export function Reveal({ as = 'div', delay = 0, children, ...rest }: Props) {
  const reduce = useReducedMotion()
  const Component = motion[as] as typeof motion.div

  return (
    <MotionConfig reducedMotion="user">
      <Component
        initial={reduce ? false : { opacity: 0, y: DISTANCE }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: DURATION, ease: EASE, delay }}
        {...rest}
      >
        {children}
      </Component>
    </MotionConfig>
  )
}
