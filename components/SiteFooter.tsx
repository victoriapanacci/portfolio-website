import { ArrowLink } from './ArrowLink'

export function SiteFooter() {
  return (
    <footer id="contact" className="footer-wrap">
      <div className="footer-light" aria-hidden="true" />
      <div className="footer shell">
        <div className="footer-cta">
          <h2>
            Let&rsquo;s talk about the <em>hard part</em>.
          </h2>
          <div className="footer-message">
            <p>
              If you&rsquo;re working through a complicated problem, I&rsquo;d
              like to hear about it. I&rsquo;m open to new roles and
              collaborations.
            </p>
            <ArrowLink href="mailto:hello@victoriapanacci.com">
              Let&rsquo;s talk
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
  )
}
