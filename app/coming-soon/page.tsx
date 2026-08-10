import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ArrowLink'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Coming Soon — Victoria Panacci',
  description: 'Something new is on the way. Connect with me on LinkedIn in the meantime.',
}

export default function ComingSoon() {
  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section className="hero shell" style={{ minHeight: 'calc(100vh - 104px)' }}>
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow">Victoria Panacci</p>
          <h1>
            Coming <em>soon</em>.
          </h1>
          <p className="hero-body">
            A new chapter of my work is in the making. In the meantime, let&apos;s
            connect.
          </p>
          <ArrowLink href="https://www.linkedin.com/in/panacci">
            Connect on LinkedIn
          </ArrowLink>
        </div>
      </section>
    </main>
  )
}
