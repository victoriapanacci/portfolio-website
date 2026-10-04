export function SiteFooter() {
  return (
    <footer id="contact" className="footer-wrap">
      <div className="footer-light" aria-hidden="true" />
      <div className="footer shell">
        <div className="footer-cta">
          <h2>Ready when you are</h2>
          <div className="footer-message">
            <a
              href="mailto:panaccivictoria@gmail.com"
              className="group inline-flex min-h-11 items-center gap-3 rounded-full border border-rose/40 bg-rose/10 px-6 py-3 text-sm font-medium text-cream outline-none transition-colors hover:border-rose hover:bg-rose/20 focus-visible:ring-2 focus-visible:ring-rose/70"
            >
              <span>Let&rsquo;s talk</span>
              <span
                aria-hidden="true"
                className="text-base font-light text-rose transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
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
            <a href="#">linkedin.com/in/panacci</a>
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
