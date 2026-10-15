import Link from 'next/link'

type Props = {
  href: string
  children: React.ReactNode
  /** Arrow after the text (forward, default) or before it (back). */
  direction?: 'forward' | 'back'
  /** Opens in a new tab with the safe rel attributes. */
  external?: boolean
  className?: string
}

/**
 * The site's one button: a rose pill with an arrow. Renders a Next Link for
 * internal routes and a plain anchor for external ones. States (hover,
 * active, focus) live in globals.css under `.button`.
 */
export function Button({
  href,
  children,
  direction = 'forward',
  external = false,
  className,
}: Props) {
  const classes = ['button', direction === 'back' && 'button--back', className]
    .filter(Boolean)
    .join(' ')
  const arrow = (
    <span aria-hidden="true" className="button__arrow">
      {direction === 'back' ? '←' : '→'}
    </span>
  )
  const inner =
    direction === 'back' ? (
      <>
        {arrow}
        <span>{children}</span>
      </>
    ) : (
      <>
        <span>{children}</span>
        {arrow}
      </>
    )

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}
