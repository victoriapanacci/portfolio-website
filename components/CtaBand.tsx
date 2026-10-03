import { ArrowLink } from './ArrowLink'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

type Props = {
  title?: string
  body?: string
  href?: string
  cta?: string
}

/**
 * Full-width call to action rendered above the footer on every page.
 */
export function CtaBand({
  title = "Let's work together",
  body = 'I help teams turn complex, high-stakes workflows into products that feel simple. If that sounds like your problem, I would love to hear about it.',
  href = '/contact',
  cta = 'Get in touch',
}: Props) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="cta-band__light" aria-hidden="true" />
      <Reveal className="cta-band__inner shell">
        <SectionLabel>Next step</SectionLabel>
        <h2 id="cta-band-title" className="cta-band__title">
          {title}
        </h2>
        <p className="cta-band__body">{body}</p>
        <ArrowLink href={href} variant="primary">
          {cta}
        </ArrowLink>
      </Reveal>
    </section>
  )
}
