import Link from 'next/link'

type Props = { href: string; children: React.ReactNode; className?: string }

export function ArrowLink({ href, children, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-5 border-b border-rose/40 pb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-cream outline-none transition-colors hover:border-rose focus-visible:ring-2 focus-visible:ring-rose/70 ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="text-lg font-light text-rose transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  )
}
