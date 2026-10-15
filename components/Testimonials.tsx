import Image from 'next/image'
import { testimonials, type Testimonial } from '@/lib/testimonials'
import { Reveal } from './motion/Reveal'

function Attribution({ t }: { t: Testimonial }) {
  return (
    <figcaption className="testimonial__who">
      {t.photo ? (
        <Image
          src={t.photo}
          alt=""
          width={48}
          height={48}
          className="testimonial__avatar"
        />
      ) : (
        <span className="testimonial__avatar" aria-hidden="true">
          {t.initials}
        </span>
      )}
      <span>
        <span className="testimonial__name">{t.name}</span>
        <span className="testimonial__role">{t.role}</span>
      </span>
    </figcaption>
  )
}

/**
 * Human proof. One lead quote set large in the serif, with the rest stacked
 * beside it between hairlines. Reads from lib/testimonials.ts.
 */
export function Testimonials() {
  const [lead, ...rest] = testimonials
  if (!lead) return null

  return (
    <Reveal as="section" className="testimonials shell" aria-labelledby="kind-words">
      <div className="section-kicker">
        <span id="kind-words">Kind words</span>
        <i />
      </div>
      <div className="testimonials__grid">
        <figure className="testimonial testimonial--lead">
          <blockquote>
            <p>{lead.quote}</p>
          </blockquote>
          <Attribution t={lead} />
        </figure>
        {rest.length ? (
          <div className="testimonials__stack">
            {rest.map((t) => (
              <figure key={t.quote} className="testimonial">
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <Attribution t={t} />
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  )
}
