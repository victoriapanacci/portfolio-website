'use client'

import { motion } from 'motion/react'
import { ease } from '@/components/motion/Reveal'

/**
 * Remounts on every route change, so each page fades up on arrival. The
 * grain overlay lives in the layout, outside this wrapper, so the fade's
 * transform never captures its fixed positioning.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  )
}
