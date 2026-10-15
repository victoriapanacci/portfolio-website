'use client'

import { motion } from 'motion/react'
import { ease } from './Reveal'

type Props = {
  text: string
  as?: 'h1' | 'h2'
  className?: string
  /** Seconds before the first word starts. */
  delay?: number
}

/**
 * The page's one authored entrance: a headline whose words rise and sharpen
 * one after another, the whole run lasting about 0.6s. The full sentence is
 * exposed to assistive tech as one label, so the split is purely visual.
 */
export function SplitHeadline({ text, as = 'h1', className, delay = 0.1 }: Props) {
  const words = text.split(' ')
  const step = Math.min(0.06, 0.6 / words.length)
  const Tag = as

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="split-word" aria-hidden="true">
          <motion.span
            className="split-word__inner"
            initial={{ opacity: 0, y: '0.4em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: delay + i * step, ease }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
