import { cn } from '@/lib/utils'

type Props = {
  tags: string[]
  /** Accessible name for the list. */
  label?: string
  className?: string
}

/**
 * Small pill chips, pulled from a project's `tags`. The same component is
 * rendered on the project card and at the top of its case study, so the
 * two always agree.
 */
export function TagChips({ tags, label = 'Tags', className }: Props) {
  if (!tags.length) return null
  return (
    <ul className={cn('chip-list', className)} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className="chip">
          {tag}
        </li>
      ))}
    </ul>
  )
}
