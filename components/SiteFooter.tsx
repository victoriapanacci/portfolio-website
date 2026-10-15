import { Button } from './Button'

const mailto = `mailto:panaccivictoria@gmail.com?subject=${encodeURIComponent(
  "Let's create something together",
)}`

export function SiteFooter() {
  return (
    <footer id="contact" className="footer-wrap">
      <div className="footer-light" aria-hidden="true" />
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
            Designed under supervision of Mordecai the cat. He says meow and
            would like a raise. 2026, All Rights Reserved.
          </p>
          <a href="#top" className="to-top" aria-label="Back to top">
            ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
