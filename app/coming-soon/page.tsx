import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ArrowLink'

export const metadata: Metadata = {
  title: 'Coming Soon: Victoria Panacci',
  description: 'Something new is on the way. Connect with me on LinkedIn in the meantime.',
}

export default function ComingSoon() {
  return (
    <main>
      <div className="grain" aria-hidden="true" />

      <section className="hero shell" style={{ minHeight: '100vh' }}>
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow">Victoria Panacci</p>
          <h1>
            Scheming <em>in progress</em>
          </h1>
          <p className="hero-body">
            Portfolio coming soon. In the meantime:
          </p>
          <ArrowLink href="https://www.linkedin.com/in/panacci">
            Connect on LinkedIn
          </ArrowLink>
        </div>
      </section>
    </main>
  )
}
