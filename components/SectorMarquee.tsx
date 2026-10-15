/** The sectors the work spans. Edit this list to change the band. */
const sectors = [
  'Clinical trials',
  'Payments',
  'Crypto',
  'Regulated SaaS',
  'Medical imaging',
  'Design systems',
  'iGaming',
  'Mobile ePRO',
]

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {sectors.map((sector) => (
        <li key={sector}>
          {sector}
          <i aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
}

/**
 * A slow band of sectors between the hero and the work. Pure CSS: the list is
 * rendered twice so the loop is seamless, the copy is hidden from assistive
 * tech, and reduced-motion users get the list laid out statically instead.
 */
export function SectorMarquee() {
  return (
    <section className="marquee" aria-label="Sectors I have designed for">
      <Track />
      <Track hidden />
    </section>
  )
}
