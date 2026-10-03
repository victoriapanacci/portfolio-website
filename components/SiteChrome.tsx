'use client'

import { usePathname } from 'next/navigation'
import { CtaBand } from './CtaBand'

/**
 * Page-end chrome shared by every route: the CTA band, except on the
 * contact page it points to, where it would only repeat itself.
 */
export function PageEndCta() {
  const pathname = usePathname()
  if (pathname === '/contact') return null
  return <CtaBand />
}
