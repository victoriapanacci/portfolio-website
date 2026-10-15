'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    function onClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  /* Only a real route can be the current page; hash links never are. */
  const current = (href: string) => (href === pathname ? 'page' : undefined)

  return (
    <header className="site-header shell">
      <Link className="monogram" href="/">
        Victoria Panacci
      </Link>
      <nav aria-label="Primary navigation" className="desktop-nav">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} aria-current={current(link.href)}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mobile-nav" ref={menuRef}>
        <button
          className={`mobile-menu${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          type="button"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="mobile-nav-menu"
          hidden={!open}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current(link.href)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
