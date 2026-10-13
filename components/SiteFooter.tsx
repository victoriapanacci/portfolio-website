const ctaClass =
  'group inline-flex min-h-11 items-center gap-3 rounded-full border border-rose/40 bg-rose/10 px-6 py-3 text-sm font-medium text-cream outline-none transition-colors hover:border-rose hover:bg-rose/20 focus-visible:ring-2 focus-visible:ring-rose/70'

const ctaArrowClass =
  'text-base font-light text-rose transition-transform duration-300 group-hover:translate-x-1'

const gmailComposeUrl = `https://mail.google.com/mail/?${new URLSearchParams({
  view: 'cm',
  fs: '1',
  to: 'panaccivictoria@gmail.com',
  su: "Let's create something together",
})}`

export function SiteFooter() {
  return (
    <footer id="contact" className="footer-wrap">
      <div className="footer-light" aria-hidden="true" />
      <div className="footer shell">
        <div className="footer-cta">
          <h2>Let&rsquo;s create something that your customers love</h2>
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
            <a
              href={gmailComposeUrl}
              className={ctaClass}
              target="_blank"
              rel="noopener noreferrer"
            >
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
