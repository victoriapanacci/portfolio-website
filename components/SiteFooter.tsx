import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { ArrowLink } from './ArrowLink'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

export const CONTACT_EMAIL = 'panaccivictoria@gmail.com'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/panacci'

/**
 * Global footer: a short "Ready when you are" close with a mail button,
 * the contact links, and the credits line.
 */
export function SiteFooter() {
  return (
    <footer id="contact" className="footer">
      <Reveal as="div" className="footer__inner shell">
        <div className="footer__cta">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="footer__title">Ready when you are</h2>
          <ArrowLink href={`mailto:${CONTACT_EMAIL}`} direction="mail" variant="primary">
            Let&apos;s talk
          </ArrowLink>
        </div>

        <dl className="footer__meta">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer__link">
                <Icon icon={Mail} />
                <span>{CONTACT_EMAIL}</span>
              </a>
            </dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="footer__link">
                <Icon icon={ArrowUpRight} />
                <span>linkedin.com/in/panacci</span>
              </a>
            </dd>
          </div>
        </dl>

        <div className="footer__bottom">
          <p>
            Designed under supervision of Mordecai the cat. He says meow and
            would like a raise. 2026, All Rights Reserved.
          </p>
          <a href="#top" className="footer__top" aria-label="Back to top">
            <Icon icon={ArrowUp} />
          </a>
        </div>
      </Reveal>
    </footer>
  )
}
