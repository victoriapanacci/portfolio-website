import type { LucideIcon, LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

/** The only icon size and stroke used on the site. */
export const ICON_SIZE = 20
export const ICON_STROKE = 1.5

type Props = {
  icon: LucideIcon
  /** Short description for screen readers. Omit for purely decorative icons. */
  label?: string
} & Omit<LucideProps, 'size' | 'strokeWidth' | 'ref'>

/**
 * Every icon on the site goes through this wrapper so they all share one
 * size (20px), one stroke width (1.5) and one colour (the rose accent,
 * overridable with a text colour class).
 */
export function Icon({ icon: Glyph, label, className, ...props }: Props) {
  return (
    <Glyph
      size={ICON_SIZE}
      strokeWidth={ICON_STROKE}
      absoluteStrokeWidth
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      className={cn('icon', className)}
      {...props}
    />
  )
}
