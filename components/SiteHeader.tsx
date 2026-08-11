import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link className="monogram" href="/" aria-label="Victoria Panacci home">
        VP
      </Link>
      <nav aria-label="Primary navigation" className="desktop-nav">
        <Link href="/#work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <button className="mobile-menu" aria-label="Open navigation" type="button">
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
