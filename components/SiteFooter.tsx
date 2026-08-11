import { ArrowLink } from './ArrowLink'

export function SiteFooter() {
  return (
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
            <ArrowLink href="mailto:panaccivictoria@gmail.com">
              Start a conversation
            </ArrowLink>
          </div>
        </div>
        <div className="footer-meta" id="about">
          <div>
            <span>Email</span>
            <a href="mailto:panaccivictoria@gmail.com">
              panaccivictoria@gmail.com
            </a>
          </div>
          <div>
            <span>LinkedIn</span>
            <a href="#">linkedin.com/in/vpanacci</a>
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
