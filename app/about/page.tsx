import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ArrowLink'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'About | Victoria Panacci',
  description:
    'How I work, where I have worked, and what I studied. Senior Product Designer based in Toronto, designing within real technical, regulatory, and organizational constraints.',
}

const principles = [
  'I frame ambiguous, high-stakes problems before jumping to solutions.',
  'I design within real technical, regulatory, and organizational constraints.',
  'I work best in close collaboration with product, engineering, and leadership, so the tradeoffs stay explicit.',
  'I build scalable systems that hold usability, safety, and speed at the same time.',
]

const experience = [
  {
    role: 'Senior Product Designer',
    company: 'madhaus.io',
    period: 'September 2025 — Present',
    points: [
      'Sole product designer inside a 0-to-1 startup, owning the design vision from research through shipped interface.',
      'Built the end-to-end design system and the structures the product grows on, so early decisions could scale instead of being redone.',
      'Prototyped and shipped in code with Claude, Cursor, and v0, using AI tooling to compress the earliest, most uncertain stages of design.',
    ],
  },
  {
    role: 'Product Designer (Innovation Associate II)',
    company: 'Axiom Real-Time Metrics — acquired by Sitero',
    period: 'April 2022 — September 2025',
    points: [
      'Designed and led core product experiences for regulated clinical-trial management software, including AI-assisted medical image redaction and EDC workflows.',
      'Worked closely with product and engineering to ship high-impact, enterprise-grade features.',
      'Drove $15M into the sales pipeline through demos and client communication.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Victoria Panacci Design',
    period: 'August 2019 — April 2022',
    points: [
      'Delivered lean UX and product design for eCommerce brands and digital creators.',
      'Improved usability and conversion while building brand and platform experiences that could scale.',
    ],
  },
  {
    role: 'Marketing Associate',
    company: 'Bingemans',
    period: 'August 2017 — August 2019',
    points: [
      'Sole designer managing 13 brand properties across digital, print, and social.',
      'Delivered creative work that drove ROI, engagement, and community growth. Some of it is still in use in 2026.',
    ],
  },
]

const education = [
  {
    credential: 'Ontario College Graduate Certificate',
    detail: 'Interactive Media Management @ George Brown College',
    note: "Dean's List.",
    year: '2020',
  },
  {
    credential: 'Non-Degree Courses',
    detail: 'Google Coursera UX Design Program',
    note: 'Intro to UX P. I & II, Information Architecture & Content Strategy @ University of Toronto (2018).',
    year: '2020',
  },
  {
    credential: 'Bachelor of Arts',
    detail: 'Communication Studies @ Wilfrid Laurier University',
    note: 'Specialized in business-marketing and visual communication. Recognized for community service with WLUSU and for photography with WLUSP.',
    year: '2017',
  },
]

export default function AboutPage() {
  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <SiteHeader />

      <section id="top" className="about-hero shell">
        <div className="hero-light" aria-hidden="true" />
        <div className="about-hero__copy reveal">
          <p className="cs-eyebrow">About</p>
          <h1 className="cs-title">
            I design for the <em>complicated</em> parts.
          </h1>
          <p className="cs-summary">
            I am a Senior Product Designer based in Toronto. I work where user
            trust, technical complexity, and organizational scale meet, most
            often in regulated and early-stage products where the right decision
            is rarely the obvious one.
          </p>
          <div className="about-hero__cta">
            <ArrowLink href="mailto:panaccivictoria@gmail.com">
              Get in touch
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="about-section shell" aria-labelledby="how-i-work">
        <div className="section-kicker">
          <span id="how-i-work">How I work</span>
          <i />
        </div>
        <ul className="about-principles">
          {principles.map((point) => (
            <li key={point} className="about-principle reveal-on-scroll">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="about-section shell" aria-labelledby="experience">
        <div className="section-kicker">
          <span id="experience">Work experience</span>
          <i />
        </div>
        <ol className="about-timeline">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="about-job reveal-on-scroll">
              <div className="about-job__head">
                <h3 className="about-job__role">{job.role}</h3>
                <p className="about-job__company">{job.company}</p>
                <p className="about-job__period">{job.period}</p>
              </div>
              <ul className="about-job__points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-section shell" aria-labelledby="education">
        <div className="section-kicker">
          <span id="education">Education</span>
          <i />
        </div>
        <ul className="about-education">
          {education.map((item) => (
            <li key={item.credential + item.detail} className="about-edu reveal-on-scroll">
              <span className="about-edu__year">{item.year}</span>
              <div className="about-edu__body">
                <p className="about-edu__credential">{item.credential}</p>
                <p className="about-edu__detail">{item.detail}</p>
                <p className="about-edu__note">{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ProjectShowcase variant="quick" kicker="Selected work" />

      <SiteFooter />
    </main>
  )
}
