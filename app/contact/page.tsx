import type { Metadata } from 'next'
import { ArrowUpRight, Mail } from 'lucide-react'
import { ArrowLink } from '@/components/ArrowLink'
import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionLabel } from '@/components/SectionLabel'
import { CONTACT_EMAIL, LINKEDIN_URL } from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'VP: Contact',
  description:
    'Get in touch with Victoria Panacci, Senior Product Designer in Toronto.',
}

export default function ContactPage() {
  return (
    <>
      <div className="shell">
        <ArrowLink href="/" direction="back">
          Back to home
        </ArrowLink>
      </div>

      <section className="hero shell">
        <div className="hero-light" aria-hidden="true" />
        <Reveal className="hero-copy">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="hero-title">
            Let&apos;s <em>talk</em>.
          </h1>
          <p className="hero-body">
            Whether it is a role, a project, or a problem you are still trying
            to frame, the fastest way to reach me is email. I reply within a
            couple of days.
          </p>
          <ArrowLink href={`mailto:${CONTACT_EMAIL}`} direction="mail" variant="primary">
            Email me
          </ArrowLink>
        </Reveal>
      </section>

      <section className="section shell" aria-labelledby="contact-ways">
        <Reveal className="section-head">
          <SectionLabel id="contact-ways">Where to find me</SectionLabel>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="card contact-card">
            <Icon icon={Mail} />
            <h2 className="contact-card__title">Email</h2>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-card__link">
              {CONTACT_EMAIL}
            </a>
          </Reveal>
          <Reveal className="card contact-card" delay={0.06}>
            <Icon icon={ArrowUpRight} />
            <h2 className="contact-card__title">LinkedIn</h2>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="contact-card__link"
            >
              linkedin.com/in/panacci
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
