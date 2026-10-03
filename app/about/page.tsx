import type { Metadata } from 'next'
import { ArrowLink } from '@/components/ArrowLink'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { Reveal } from '@/components/Reveal'
import { SectionLabel } from '@/components/SectionLabel'

export const metadata: Metadata = {
  title: 'VP: About',
  description:
    'How I work, where I have worked, and what I studied. Senior Product Designer based in Toronto, designing within real technical, regulatory, and organizational constraints.',
}

const principles = [
  'I frame ambiguous, high-stakes problems before jumping to solutions.',
  'I can build and ship production ready code using AI tools. I can read, modify, and maintain code.',
  'I design within real technical, regulatory, and organizational constraints.',
  'I work best in close collaboration with product, engineering, and leadership, so the tradeoffs stay explicit.',
]

const experience = [
  {
    role: 'Senior Product Designer',
    company: 'madhaus.io',
    period: 'April 2026 to September 2026',
    points: [
      'Built two design systems that became shared product-building tools, enabling teams outside design to prototype independently and significantly reducing time from concept to validation',
      'Led end-to-end design across sportsbook, casino, cashier, and account experiences, working directly with product and engineering from strategy through implementation',
      'Used technical fluency and AI-assisted development to prototype, build, and deploy web experiences, bringing design closer to production and accelerating iteration',
    ],
  },
  {
    role: 'Product Designer (Innovation Associate II)',
    company: 'Axiom Real-Time Metrics, acquired by Sitero in July 2025',
    period: 'April 2022 to September 2025',
    points: [
      'Translated complex clinical and regulatory workflows into intuitive product experiences, partnering with engineering, QA, and clinical SMEs from discovery through launch',
      'Led the design and delivery of a first-of-its-kind DICOM redaction workflow, reducing manual review effort by ~50% while meeting regulatory audit requirements',
      'Drove $15M into the sales pipeline through demos and client communication',
      'Rebuilt a legacy ePRO experience into a standalone mobile product supported by a scalable design system',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Victoria Panacci Design',
    period: 'August 2019 to April 2022',
    points: [
      'Designed and shipped digital products for 15+ early-stage businesses across eCommerce, hospitality, and technology',
      'Created MVPs, prototypes, workflows, and design systems that reduced time-to-launch by 30%+ and increased engagement and conversion',
    ],
  },
  {
    role: 'Marketing Associate',
    company: 'Bingemans',
    period: 'August 2017 to August 2019',
    points: [
      'Sole designer supporting 13 brand properties across digital, web, social, and print, including launches for new entertainment and hospitality brands',
    ],
  },
]

const education = [
  {
    credential: 'Ontario College Graduate Certificate',
    detail: 'Interactive Media Management @ George Brown College',
    note: "Dean's List",
    year: '2020',
  },
  {
    credential: 'Non-Degree Courses',
    detail: 'University of Toronto',
    note: 'Intro to UX P. I & II, Information Architecture & Content Strategy',
    year: '2018',
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
    <>
      {/* Breadcrumb back link, same pattern as the case study pages */}
      <div className="shell">
        <ArrowLink href="/" direction="back">
          Back to home
        </ArrowLink>
      </div>

      <section className="hero hero--short shell">
        <div className="hero-light" aria-hidden="true" />
        <Reveal className="hero-copy">
          <SectionLabel>About</SectionLabel>
          <h1 className="hero-title">I make complexity feel invisible</h1>
          <p className="hero-body">
            I&apos;m Victoria, I&apos;m a senior product designer. I have a knack
            for turning complex, data-heavy workflows into products that feel
            simple. I&apos;ve worked across iGaming, clinical research, SaaS, and
            consumer tech.
          </p>
        </Reveal>
      </section>

      <section className="section shell" aria-labelledby="how-i-work">
        <Reveal className="section-head">
          <SectionLabel id="how-i-work">How I work</SectionLabel>
        </Reveal>
        <ul className="about-principles">
          {principles.map((point, i) => (
            <Reveal as="li" key={point} className="about-principle card" delay={i * 0.06}>
              {point}
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section shell" aria-labelledby="experience">
        <Reveal className="section-head">
          <SectionLabel id="experience">Work experience</SectionLabel>
        </Reveal>
        <ol className="about-timeline">
          {experience.map((job) => (
            <Reveal as="li" key={`${job.company}-${job.period}`} className="about-job">
              <div className="about-job__head">
                <h3 className="about-job__role">{job.role}</h3>
                <p className="about-job__company">{job.company}</p>
                <p className="about-job__period">{job.period}</p>
              </div>
              <ul className="cs-rich-list about-job__points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section shell" aria-labelledby="education">
        <Reveal className="section-head">
          <SectionLabel id="education">Education</SectionLabel>
        </Reveal>
        <ul className="about-education">
          {education.map((item, i) => (
            <Reveal
              as="li"
              key={item.credential + item.detail}
              className="about-edu card"
              delay={i * 0.06}
            >
              <span className="about-edu__year">{item.year}</span>
              <div className="about-edu__body">
                <p className="about-edu__credential">{item.credential}</p>
                <p className="about-edu__detail">{item.detail}</p>
                <p className="about-edu__note">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <ProjectShowcase variant="quick" label="Selected work" title="Case studies" />
    </>
  )
}
