'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLink } from '@/components/ArrowLink'
import { ProjectCard } from '@/components/ProjectCard'

const projects = [
  {
    index: '01',
    title: 'Designing Trust Into Every Transaction',
    category: 'Sportsbook & Casino',
    description:
      'Reimagining the cashier experience to drive trust, conversion, and loyalty in a high-stakes environment.',
    art: 'cashier' as const,
  },
  {
    index: '02',
    title: 'Building a Mobile Product from a Legacy Platform',
    category: 'Healthcare / ePRO',
    description:
      'Transforming a legacy ePRO platform into a modern, scalable mobile experience for patients and researchers.',
    art: 'mobile' as const,
  },
  {
    index: '03',
    title: 'Designing Systems That Scale',
    category: 'Design System / Platform',
    description:
      'Creating scalable design systems and workflows that enable teams to move faster and build with confidence.',
    art: 'system' as const,
  },
]

export default function Home() {
  const reduce = useReducedMotion()
  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="site-header shell">
        <a className="monogram" href="#top" aria-label="Victoria Panacci home">
          VP
        </a>
        <nav aria-label="Primary navigation" className="desktop-nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="mobile-menu" aria-label="Open navigation" type="button">
          <span />
          <span />
          <span />
        </button>
      </header>

      <section id="top" className="hero shell">
        <div className="hero-light" aria-hidden="true" />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hero-copy"
        >
          <p className="eyebrow">
            Senior Product Designer
            <br />
            Based in Toronto
          </p>
          <h1>
            I design for the <em>complicated</em> parts.
          </h1>
          <p className="hero-body">
            I work where user trust, technical complexity, and organizational
            scale meet.
          </p>
          <ArrowLink href="#work">Explore my work</ArrowLink>
        </motion.div>
      </section>

      <section id="work" className="work shell">
        <div className="section-kicker">
          <span>Featured work</span>
          <i />
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.index} project={project} />
          ))}
        </div>
      </section>

      <footer id="contact" className="footer-wrap">
        <div className="footer-light" aria-hidden="true" />
        <div className="footer shell">
          <div className="footer-cta">
            <h2>
              Let&rsquo;s create <em>meaningful impact</em> together.
            </h2>
            <div className="footer-message">
              <p>
                I&rsquo;m always open to new opportunities and interesting
                conversations.
              </p>
              <ArrowLink href="mailto:hello@victoriapanacci.com">
                Start a conversation
              </ArrowLink>
            </div>
          </div>
          <div className="footer-meta" id="about">
            <div>
              <span>Email</span>
              <a href="mailto:hello@victoriapanacci.com">
                hello@victoriapanacci.com
              </a>
            </div>
            <div>
              <span>Location</span>
              <p>Toronto, Canada</p>
            </div>
            <div>
              <span>LinkedIn</span>
              <a href="#">linkedin.com/in/vpanacci</a>
            </div>
            <div>
              <span>Resume</span>
              <a href="#">View PDF</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>VP</span>
            <p>&copy; 2026 Victoria Panacci. All rights reserved.</p>
            <a href="#top" aria-label="Back to top">
              ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
