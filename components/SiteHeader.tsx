'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

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

  return (
    <header className="site-header shell">
      <Link className="monogram" href="/" aria-label="Victoria Panacci home">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
        </svg>
      </Link>
      <nav aria-label="Primary navigation" className="desktop-nav">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
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
          className={`mobile-nav-menu${open ? ' is-open' : ''}`}
          hidden={!open}
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
