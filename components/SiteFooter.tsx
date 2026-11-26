import { Button } from './Button'

const mailto = `mailto:panaccivictoria@gmail.com?subject=${encodeURIComponent(
  "Let's create something together",
)}`

export function SiteFooter() {
  return (
    <footer id="contact" className="footer-wrap">
      <div className="footer shell">
        <div className="footer-cta">
          <h2>Let&rsquo;s create something that your customers love</h2>
          <div className="footer-actions">
            <Button href="https://www.linkedin.com/in/panacci" external>
              Connect on LinkedIn
            </Button>
            <Button href={mailto}>Send an email</Button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Website built end to end by Victoria Panacci. Self hosted, 2026.
            All rights reserved.
          </p>
          <Button href="#top" direction="up">
            Top
          </Button>
        </div>
      </div>
    </footer>
  )
}
