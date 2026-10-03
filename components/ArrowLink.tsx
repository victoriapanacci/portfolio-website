import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icon } from './Icon'

type Props = {
  href: string
  children: React.ReactNode
  /** 'forward' (default) puts an arrow after the text; 'back' puts one before it. */
  direction?: 'forward' | 'back' | 'external' | 'mail'
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
}

const icons = {
  forward: ArrowRight,
  back: ArrowLeft,
  external: ArrowUpRight,
  mail: Mail,
}

/**
 * A button-shaped link with a lucide arrow. Used for every call to action
 * and every back link, so they all share the same pill, height and motion.
 */
export function ArrowLink({
  href,
  children,
  direction = 'forward',
  variant = 'outline',
  className,
}: Props) {
  const external = href.startsWith('http') || href.startsWith('mailto:')
  const glyph = (
    <Icon
      icon={icons[direction]}
      className={cn(
        'transition-transform duration-200 ease-soft',
        direction === 'forward' && 'group-hover/button:translate-x-0.5',
        direction === 'back' && 'group-hover/button:-translate-x-0.5',
        direction === 'external' &&
          'group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5',
      )}
    />
  )

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant }), className)}
      target={external && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {direction === 'back' ? glyph : null}
      <span>{children}</span>
      {direction === 'back' ? null : glyph}
    </Link>
  )
}
