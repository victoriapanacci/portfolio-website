/** Pre-fills the subject line so an intro email arrives already warmed up. */
const mailtoHref = `mailto:panaccivictoria@gmail.com?subject=${encodeURIComponent(
  'You have a cool portfolio and I think we should be friends',
)}`

export function SiteFooter() {
  return (
    <footer id="contact" className="footer-wrap">
      <div className="footer-light" aria-hidden="true" />
      <div className="footer shell">
        <div className="footer-intro">
          <div className="section-kicker">
            <span>Contact</span>
            <i />
          </div>
          <h2 className="footer-title">
            Let&apos;s chat! I&apos;m available at{' '}
            <a href={mailtoHref}>panaccivictoria@gmail.com</a> or on{' '}
            <a
              href="https://www.panaccivictoria.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            .
          </h2>
        </div>
        <div className="footer-bottom">
          <p>
            Designed under supervision of Mordecai the cat. He says meow and
            would like a raise. 2026, All Rights Reserved.
          </p>
          <a href="#top" aria-label="Back to top">
            ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
