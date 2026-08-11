import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/SiteHeader'
import { versions } from '@/components/versions/versionData'

export const metadata: Metadata = {
  title: 'Layout explorations — Victoria Panacci',
  description: 'Five directions for the home page, same palette and type.',
}

export default function VersionsGallery() {
  return (
    <main className="vgallery">
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section className="vgallery-hero shell">
        <div className="hero-light" aria-hidden="true" />
        <p className="eyebrow reveal">Layout explorations</p>
        <h1 className="reveal">
          Five ways to open the <em>same</em> story.
        </h1>
        <p className="hero-body reveal">
          Each keeps the palette, type, and content of the live site. Only the
          structure of the hero and featured work changes. Open one to see it
          full screen, then use the switcher to compare.
        </p>
      </section>

      <section className="vgallery-list shell">
        {versions.map((v) => (
          <Link
            key={v.id}
            href={`/versions/${v.id}`}
            className="vgallery-card reveal-on-scroll"
          >
            <span className="vgallery-card__num">{v.id.padStart(2, '0')}</span>
            <div className="vgallery-card__body">
              <h2>{v.name}</h2>
              <p className="vgallery-card__approach">{v.approach}</p>
              <p className="vgallery-card__note">{v.note}</p>
            </div>
            <span className="vgallery-card__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </section>

      <footer className="vgallery-foot shell">
        <Link href="/">← Back to the live site</Link>
      </footer>
    </main>
  )
}
