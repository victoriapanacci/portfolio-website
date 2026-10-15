'use client'

import { motion, type Variants } from 'motion/react'

/** The site's one arrival curve: a confident exponential ease-out. */
export const ease = [0.22, 1, 0.36, 1] as const

const tags = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  aside: motion.aside,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  figure: motion.figure,
  p: motion.p,
} as const

type Tag = keyof typeof tags

/** Content is visible once scrolled a little way in, and only animates once. */
const viewport = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' } as const

type RevealProps = {
  as?: Tag
  className?: string
  children: React.ReactNode
  /** Seconds to wait before starting. */
  delay?: number
  /** Animate as soon as it mounts instead of waiting to scroll into view. */
  immediate?: boolean
  id?: string
  'aria-labelledby'?: string
}

/**
 * Fades a block up as it scrolls into view. Used for whole sections, so each
 * section arrives once and the elements inside it stay still.
 */
export function Reveal({
  as = 'div',
  className,
  children,
  delay = 0,
  immediate = false,
  ...rest
}: RevealProps) {
  const Component = tags[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport })}
      transition={{ duration: 0.7, delay, ease }}
      {...rest}
    >
      {children}
    </Component>
  )
}

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

type StaggerProps = {
  as?: Tag
  className?: string
  children: React.ReactNode
}

/**
 * A list that arrives as a list: children (StaggerItem) rise one after
 * another once the group scrolls into view.
 */
export function StaggerGroup({ as = 'div', className, children }: StaggerProps) {
  const Component = tags[as]
  return (
    <Component
      className={className}
      variants={group}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({ as = 'div', className, children }: StaggerProps) {
  const Component = tags[as]
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  )
}
