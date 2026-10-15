import type { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal'
import { SplitHeadline } from '@/components/motion/SplitHeadline'
import { ProjectShowcase } from '@/components/ProjectShowcase'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'Victoria Panacci: About',
  description:
    'How I work, where I have worked, and what I studied. Senior Product Designer based in Toronto, designing within real technical, regulatory, and organizational constraints.',
}

/** Portrait for the About hero: a 4:5 photo. Set to null to show the empty plate. */
const portrait: { src: string; width: number; height: number } | null = {
  src: '/about/portrait.jpg',
  width: 1200,
  height: 1500,
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
    <main id="main">
      <SiteHeader />

      <div className="shell back-link">
        <Button href="/" direction="back">
          Back to home
        </Button>
      </div>

      <section id="top" className="about-hero shell">
        <div className="hero-light" aria-hidden="true" />
        <div className="about-hero__copy">
          <SplitHeadline text="I make complexity feel invisible" className="cs-title" />
          <Reveal as="p" className="cs-summary lead" immediate delay={0.45}>
            I&apos;m Victoria, I&apos;m a senior product designer. I have a knack for turning complex, data-heavy workflows into products that feel simple. I&apos;ve worked across iGaming, clinical research, SaaS, and consumer tech.
          </Reveal>
        </div>
        <Reveal as="figure" className="about-portrait" immediate delay={0.3}>
          {portrait ? (
            <Image
              src={portrait.src}
              alt="Victoria Panacci"
              width={portrait.width}
              height={portrait.height}
              sizes="(max-width: 1024px) 60vw, 420px"
              className="about-portrait__img"
              priority
            />
          ) : (
            <div className="about-portrait__slot" role="img" aria-label="Portrait placeholder">
              <span>Portrait</span>
              <small className="caption">4:5 photo, public/about/portrait.jpg</small>
            </div>
          )}
        </Reveal>
      </section>

      <section className="about-section shell" aria-labelledby="how-i-work">
        <Reveal className="kicker">
          <span id="how-i-work">How I work</span>
          <i />
        </Reveal>
        <StaggerGroup as="ul" className="about-principles">
          {principles.map((point) => (
            <StaggerItem key={point} as="li" className="card card--feature about-principle">
              {point}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Reveal as="section" className="about-section shell" aria-labelledby="experience">
        <div className="kicker">
          <span id="experience">Work experience</span>
          <i />
        </div>
        <ol className="about-timeline">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="about-job">
              <div className="about-job__head">
                <h3 className="about-job__role">{job.role}</h3>
                <p className="label about-job__company">{job.company}</p>
                <p className="tag about-job__period">{job.period}</p>
              </div>
              <ul className="list about-job__points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="section" className="about-section shell" aria-labelledby="education">
        <div className="kicker">
          <span id="education">Education</span>
          <i />
        </div>
        <ul className="about-education">
          {education.map((item) => (
            <li key={item.credential + item.detail} className="card card--feature about-edu">
              <span className="numeral">{item.year}</span>
              <div className="about-edu__body">
                <p className="label about-edu__credential">{item.credential}</p>
                <p className="about-edu__detail">{item.detail}</p>
                <p className="about-edu__note">{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <ProjectShowcase variant="quick" kicker="Selected work" />

      <SiteFooter />
    </main>
  )
}
