import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ArrowLink'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { Reveal } from '@/components/Reveal'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'VP: Home',
  description:
    'Senior Product Designer in Toronto turning complex, data-heavy workflows into products that feel simple.',
}

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-light" aria-hidden="true" />
        <Reveal className="hero-copy">
          <SectionLabel>Senior product designer, Toronto</SectionLabel>
          <h1 className="hero-title">
            Experienced product designer that makes complexity feel invisible
          </h1>
          <p className="hero-body">
            In a world where anyone can ship, the costliest mistake is shipping
            the wrong thing. I use design, research, and product strategy to get
            to the real need fast
          </p>
          <ArrowLink href="#work">Featured projects</ArrowLink>
        </Reveal>
      </section>

      <ProjectShowcase variant="full" label="Selected work" title="Featured projects" />
    </>
  )
}
