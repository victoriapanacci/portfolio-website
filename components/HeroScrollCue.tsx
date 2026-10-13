/**
 * Down arrow under the hero copy. A plain hash link, so the browser's own
 * smooth scrolling (set on `html` in globals.css) slides the page down until
 * the featured projects section sits at the top of the viewport.
 */
export function HeroScrollCue() {
  return (
    <a href="#work" className="hero-scroll" aria-label="Scroll to featured projects">
      <svg
        className="hero-scroll__arrow"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4v16" />
        <path d="m5 13 7 7 7-7" />
      </svg>
    </a>
  )
}
