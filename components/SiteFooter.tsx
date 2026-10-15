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
            Full website design, build, and deployment done by Victoria Panacci
            using: Figma, VSCode, Claude Code, and Vercel. 2026, All Rights
            Reserved.
          </p>
          <Button href="#top" direction="up">
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  )
}
