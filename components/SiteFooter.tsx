const ctaClass =
  'group inline-flex min-h-11 items-center gap-3 rounded-full border border-rose/40 bg-rose/10 px-6 py-3 text-sm font-medium text-cream outline-none transition-colors hover:border-rose hover:bg-rose/20 focus-visible:ring-2 focus-visible:ring-rose/70'

const ctaArrowClass =
  'text-base font-light text-rose transition-transform duration-300 group-hover:translate-x-1'

export function SiteFooter() {
  return (
    <footer id="contact" className="footer-wrap">
      <div className="footer-light" aria-hidden="true" />
      <div className="footer shell">
        <div className="footer-cta">
          <h2>Let&rsquo;s make the complexity disappear</h2>
          <div className="footer-actions">
            <a
              href="https://www.linkedin.com/in/panacci"
              className={ctaClass}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Connect on LinkedIn</span>
              <span aria-hidden="true" className={ctaArrowClass}>
                →
              </span>
            </a>
            <a href="mailto:panaccivictoria@gmail.com" className={ctaClass}>
              <span>Send an email</span>
              <span aria-hidden="true" className={ctaArrowClass}>
                →
              </span>
            </a>
          </div>
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
