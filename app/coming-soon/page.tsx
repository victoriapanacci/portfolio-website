import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ArrowLink'
import { Reveal } from '@/components/Reveal'
import { SectionLabel } from '@/components/SectionLabel'
import { LINKEDIN_URL } from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'VP: Coming Soon',
  description: 'Something new is on the way. Connect with me on LinkedIn in the meantime.',
}

export default function ComingSoon() {
  return (
    <section className="hero hero--tall shell">
      <div className="hero-light" aria-hidden="true" />
      <Reveal className="hero-copy">
        <SectionLabel>Victoria Panacci</SectionLabel>
        <h1 className="hero-title">
          Scheming <em>in progress</em>.
        </h1>
        <p className="hero-body">Portfolio coming soon.</p>
        <ArrowLink href={LINKEDIN_URL} direction="external">
          Connect on LinkedIn
        </ArrowLink>
      </Reveal>
    </section>
  )
}
