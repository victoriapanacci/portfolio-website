import Link from 'next/link'

type Props = { href: string; children: React.ReactNode; className?: string }

export function ArrowLink({ href, children, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-3 rounded-full border border-rose/40 bg-rose/10 px-6 py-3 text-sm font-medium text-cream outline-none transition-colors hover:border-rose hover:bg-rose/20 focus-visible:ring-2 focus-visible:ring-rose/70 ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="text-base font-light text-rose transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  )
}
