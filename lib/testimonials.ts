export type Testimonial = {
  quote: string
  name: string
  role: string
  /** Shown in the avatar circle until a photo is supplied. */
  initials: string
  /** Optional square photo, e.g. '/testimonials/name.jpg'. */
  photo?: string
}

/**
 * PLACEHOLDER COPY. Every entry below is a stand-in that shows the layout.
 * Replace each quote with a real line from a colleague or client (with their
 * permission) before this ships. The first entry is set larger as the lead.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Placeholder for the lead quote: two or three sentences from a product or engineering partner about what it was like to ship with you, and what changed because of it.',
    name: 'Colleague name',
    role: 'Role, Company',
    initials: 'CN',
  },
  {
    quote:
      'Placeholder for a shorter quote: one specific thing you did that made a hard project easier.',
    name: 'Colleague name',
    role: 'Role, Company',
    initials: 'CN',
  },
  {
    quote:
      'Placeholder for a shorter quote: a line from a client or stakeholder about the outcome.',
    name: 'Client name',
    role: 'Role, Company',
    initials: 'CL',
  },
]
