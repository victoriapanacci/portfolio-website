import Image from 'next/image'
import type { Project } from '@/lib/projects'

const artLabel = {
  mobile:
    'Illustration for the ePRO project: a spoken waveform resolving into five answer options, with one chosen.',
  imaging:
    'Illustration for the DeID project: a series of eighteen scan frames, the first eleven with their identifiers blacked out, the twelfth outlined for human review, the rest still waiting.',
  cashier:
    'Three screens from the cashier withdrawal flow layered at depth: link a wallet, enter an amount, and a withdrawal on its way.',
  system:
    'Illustration for the design-systems project: one card component repeated at three scales on a column grid.',
} as const

const cream = '#f2e8dc'
const rose = '#d97b72'

/** ePRO: speech on the left, five options on the right, one chosen. */
function VoiceToAnswer() {
  const heights = [10, 16, 26, 40, 58, 46, 70, 54, 82, 64, 48, 72, 38, 56, 30, 44, 22, 34, 16, 24, 12, 8]
  return (
    <svg className="art-svg" viewBox="0 0 300 200" aria-hidden="true">
      <g stroke={cream} strokeWidth="2.6" strokeLinecap="round">
        {heights.map((h, i) => (
          <line
            key={i}
            x1={34 + i * 5.2}
            x2={34 + i * 5.2}
            y1={100 - h / 2}
            y2={100 + h / 2}
            opacity={0.35 + (i / heights.length) * 0.55}
          />
        ))}
      </g>
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x="172"
            y={42 + i * 26}
            width="96"
            height="16"
            rx="8"
            fill={i === 2 ? rose : 'none'}
            stroke={i === 2 ? rose : cream}
            strokeOpacity={i === 2 ? 1 : 0.5}
            strokeWidth="1.5"
          />
        ))}
      </g>
    </svg>
  )
}

/** DeID: a series of frames, identifiers blacked out in order, one frame under review. */
function RedactionSeries() {
  const cols = 6
  const rows = 3
  const w = 38
  const h = 44
  const gap = 8
  const x0 = (300 - (cols * w + (cols - 1) * gap)) / 2
  const y0 = (200 - (rows * h + (rows - 1) * gap)) / 2
  const done = 11
  const frames = Array.from({ length: cols * rows }, (_, i) => ({
    x: x0 + (i % cols) * (w + gap),
    y: y0 + Math.floor(i / cols) * (h + gap),
    state: i < done ? 'done' : i === done ? 'review' : 'todo',
  }))
  return (
    <svg className="art-svg" viewBox="0 0 300 200" aria-hidden="true">
      {frames.map((f, i) => (
        <g key={i} transform={`translate(${f.x} ${f.y})`}>
          <rect
            width={w}
            height={h}
            rx="4"
            fill={cream}
            fillOpacity="0.06"
            stroke={f.state === 'review' ? rose : cream}
            strokeOpacity={f.state === 'review' ? 1 : 0.32}
            strokeWidth={f.state === 'review' ? 1.5 : 1}
          />
          <circle cx={w / 2} cy={h / 2 + 4} r="11" fill={cream} fillOpacity="0.14" stroke={cream} strokeOpacity="0.35" strokeWidth="0.8" />
          {f.state === 'done' ? (
            <rect x="5" y="5" width="18" height="5" rx="1" fill="#06040a" stroke={rose} strokeWidth="0.9" />
          ) : (
            <rect x="5" y="6" width="16" height="3" rx="1" fill={cream} fillOpacity={f.state === 'review' ? 0.9 : 0.55} />
          )}
        </g>
      ))}
    </svg>
  )
}

/** Cashier: three real screens layered at depth. */
const cashierScreens = [
  { src: '/work/cashier/hero-1-link-wallet.png', cls: 'scene-screen--back' },
  { src: '/work/cashier/screen-pending.png', cls: 'scene-screen--right' },
  { src: '/work/cashier/hero-2-amount.png', cls: 'scene-screen--front' },
]
function CashierScene() {
  return (
    <div className="scene" aria-hidden="true">
      {cashierScreens.map((s) => (
        <div key={s.src} className={`scene-screen ${s.cls}`}>
          <Image src={s.src} alt="" width={780} height={1688} loading="eager" />
        </div>
      ))}
    </div>
  )
}

/** Design systems: one card component at three scales on a column grid. */
function ComponentScale() {
  const card = (x: number, y: number, s: number, key: string) => (
    <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
      <rect width="104" height="124" rx="8" fill={cream} fillOpacity="0.06" stroke={cream} strokeOpacity="0.45" strokeWidth={1.2 / s} />
      <rect x="14" y="16" width="52" height="7" rx="3.5" fill={cream} fillOpacity="0.85" />
      <rect x="14" y="34" width="76" height="4" rx="2" fill={cream} fillOpacity="0.4" />
      <rect x="14" y="44" width="62" height="4" rx="2" fill={cream} fillOpacity="0.4" />
      <rect x="14" y="54" width="70" height="4" rx="2" fill={cream} fillOpacity="0.4" />
      <rect x="14" y="88" width="48" height="18" rx="9" fill={rose} />
    </g>
  )
  return (
    <svg className="art-svg" viewBox="0 0 300 200" aria-hidden="true">
      <g stroke={cream} strokeOpacity="0.1" strokeWidth="0.8">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={24 + i * 25.2} x2={24 + i * 25.2} y1="0" y2="200" />
        ))}
      </g>
      {card(24, 38, 1, 'l')}
      {card(150, 54, 0.75, 'm')}
      {card(250, 70, 0.5, 's')}
    </svg>
  )
}

export function ProjectArt({ project }: { project: Project }) {
  const type = project.art
  const custom = project.artImage
  return (
    <div
      className={`project-art project-art--${type}`}
      role="img"
      aria-label={custom?.alt ?? artLabel[type]}
    >
      <div className="project-art__stage" aria-hidden="true">
        {custom ? (
          <Image
            src={custom.src}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 50vw"
            loading="eager"
            className="project-art__image"
          />
        ) : type === 'mobile' ? (
          <VoiceToAnswer />
        ) : type === 'imaging' ? (
          <RedactionSeries />
        ) : type === 'cashier' ? (
          <CashierScene />
        ) : (
          <ComponentScale />
        )}
      </div>
    </div>
  )
}
