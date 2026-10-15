import { Reveal } from './motion/Reveal'

/**
 * Colophon: the print convention of stating how a thing was made. Facts only,
 * set like the case-study meta bar, so the site reads as one more shipped
 * product rather than a claim about itself.
 */
const specs = [
  { label: 'Design & code', value: 'Victoria Panacci' },
  { label: 'Stack', value: 'Next.js, React, TypeScript' },
  { label: 'Type', value: 'Inter and Georgia' },
  { label: 'Motion', value: 'Motion, hand-written CSS' },
  { label: 'Hosting', value: 'Vercel' },
]

export function BuiltByHand() {
  return (
    <Reveal as="aside" className="colophon shell" aria-labelledby="colophon-title">
      <div className="section-kicker">
        <span id="colophon-title">Colophon</span>
        <i />
      </div>
      <dl className="colophon__specs">
        {specs.map((s) => (
          <div key={s.label} className="colophon__item">
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}
