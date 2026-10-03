import Image from 'next/image'
import type { DeviceKind } from '@/lib/projects'
import { cn } from '@/lib/utils'

type Layout = 'thumbnail' | 'hero' | 'inline'

type Props = {
  kind: DeviceKind
  /** Screenshot to show inside the frame. Omit to render `children` in the screen instead. */
  src?: string
  alt?: string
  /** Preload the screenshot (use for the case study hero). */
  priority?: boolean
  /** Responsive `sizes` hint for the screenshot. */
  sizes?: string
  /**
   * 'thumbnail' = 4:3 stage for cards. 'hero' = wide stage for case study
   * heroes. 'inline' = the bare device, sized by its parent.
   */
  layout?: Layout
  /** Rendered inside the screen when no `src` is given. */
  children?: React.ReactNode
  /** Rendered in a layer over the screen that is never clipped (e.g. callout pins). */
  overlay?: React.ReactNode
  className?: string
}

/** Rounded-rectangle path, with independent corner radii, for even-odd bezels. */
function roundedRect(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | [number, number, number, number],
) {
  const [tl, tr, br, bl] = typeof r === 'number' ? [r, r, r, r] : r
  return [
    `M${x + tl},${y}`,
    `H${x + w - tr}`,
    tr ? `A${tr},${tr} 0 0 1 ${x + w},${y + tr}` : '',
    `V${y + h - br}`,
    br ? `A${br},${br} 0 0 1 ${x + w - br},${y + h}` : '',
    `H${x + bl}`,
    bl ? `A${bl},${bl} 0 0 1 ${x},${y + h - bl}` : '',
    `V${y + tl}`,
    tl ? `A${tl},${tl} 0 0 1 ${x + tl},${y}` : '',
    'Z',
  ].join(' ')
}

/* Phone: 430 x 890 viewBox, screen inset 16 on every side. */
const PHONE = {
  viewBox: '0 0 430 890',
  bezel: `${roundedRect(0, 0, 430, 890, 64)} ${roundedRect(16, 16, 398, 858, 50)}`,
  outline: roundedRect(1, 1, 428, 888, 63),
}

/* Browser: 1600 x 1000 viewBox, 60px toolbar, screen below it. */
const BROWSER = {
  viewBox: '0 0 1600 1000',
  bezel: `${roundedRect(0, 0, 1600, 1000, 28)} ${roundedRect(0, 60, 1600, 940, [0, 0, 28, 28])}`,
  outline: roundedRect(1, 1, 1598, 998, 27),
}

function PhoneChrome() {
  return (
    <svg
      className="device__chrome"
      viewBox={PHONE.viewBox}
      aria-hidden="true"
      focusable="false"
    >
      <path d={PHONE.bezel} fillRule="evenodd" className="device__bezel" />
      <path d={PHONE.outline} className="device__outline" />
      <rect x="155" y="34" width="120" height="34" rx="17" className="device__island" />
      <rect x="-4" y="190" width="4" height="36" rx="2" className="device__key" />
      <rect x="-4" y="252" width="4" height="66" rx="2" className="device__key" />
      <rect x="-4" y="334" width="4" height="66" rx="2" className="device__key" />
      <rect x="430" y="290" width="4" height="104" rx="2" className="device__key" />
    </svg>
  )
}

function BrowserChrome() {
  return (
    <svg
      className="device__chrome"
      viewBox={BROWSER.viewBox}
      aria-hidden="true"
      focusable="false"
    >
      <path d={BROWSER.bezel} fillRule="evenodd" className="device__bezel" />
      <path d={BROWSER.outline} className="device__outline" />
      <circle cx="40" cy="30" r="7" className="device__dot" />
      <circle cx="70" cy="30" r="7" className="device__dot" />
      <circle cx="100" cy="30" r="7" className="device__dot" />
      <rect x="150" y="16" width="1300" height="28" rx="14" className="device__address" />
    </svg>
  )
}

/**
 * A flat phone or browser frame around a screenshot. The chrome is a single
 * inline SVG (no 3D, no gradients on the device itself), the screenshot is
 * object-cover inside the screen, and the stage behind it carries one soft
 * gradient and one drop shadow. Every thumbnail and every case study hero
 * goes through this component, so all projects look uniform.
 */
export function DeviceFrame({
  kind,
  src,
  alt = '',
  priority,
  sizes,
  layout = 'inline',
  children,
  overlay,
  className,
}: Props) {
  const device = (
    <div className={cn('device', `device--${kind}`, layout === 'inline' && className)}>
      <div className="device__screen">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes ?? (layout === 'thumbnail' ? '(max-width: 640px) 100vw, 50vw' : '100vw')}
            className="device__shot"
          />
        ) : (
          children
        )}
      </div>
      {kind === 'phone' ? <PhoneChrome /> : <BrowserChrome />}
      {overlay ? <div className="device__overlay">{overlay}</div> : null}
    </div>
  )

  if (layout === 'inline') return device

  return (
    <div className={cn('device-stage', `device-stage--${layout}`, className)}>
      {device}
    </div>
  )
}
