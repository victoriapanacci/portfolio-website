import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  /** Element to render. Defaults to a paragraph. */
  as?: 'p' | 'span' | 'h2' | 'div'
  id?: string
  className?: string
}

/**
 * The one label style used above every major section: uppercase, 0.3em
 * tracking, 12px, muted foreground. Keeps section openings identical across
 * the home page, the about page, and every case study.
 */
export function SectionLabel({ children, as: Tag = 'p', id, className }: Props) {
  return (
    <Tag id={id} className={cn('section-label', className)}>
      {children}
    </Tag>
  )
}
