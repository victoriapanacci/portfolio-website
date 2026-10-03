import type { ProjectArtType } from '@/lib/projects'

type Note = {
  /** Positions on the instrument line; exactly one is marked. */
  steps: string[]
  marked: number
  /** 'ruler' numbers the steps and names only the marked one. 'tags' shows DICOM tag names with their values blacked out. */
  instrument: 'ruler' | 'tags'
  statement: string
  source: string
  state: string
  label: string
}

const notes: Record<ProjectArtType, Note> = {
  mobile: {
    instrument: 'ruler',
    steps: ['Onboarding', 'First use', 'Daily use', 'Missed entry', 'End of study'],
    marked: 3,
    statement:
      '“I keep getting errors. How do I add a missed entry? I don’t know how to do this.”',
    source: 'Patient journey map, legacy ePRO',
    state: 'Frustrated, then abandoned',
    label:
      'Research note from the legacy ePRO study: a five-stage patient journey with stage four, missed entry, marked, and the words from its sticky: "I keep getting errors. How do I add a missed entry? I don\'t know how to do this." Frustrated, then abandoned.',
  },
  imaging: {
    instrument: 'tags',
    steps: ['PatientName', 'PatientID', 'StudyDate'],
    marked: 0,
    statement:
      'One study. Close to 100,000 images. Every one of them redacted by hand before a regulator could see it.',
    source: 'Fusion imaging module, before',
    state: 'Automated, with a human in final control',
    label:
      'Note from the DeID project: a row of DICOM tags, PatientName, PatientID and StudyDate, with their values blacked out, and the statement: one study, close to 100,000 images, every one of them redacted by hand before a regulator could see it. Automated, with a human in final control.',
  },
  cashier: {
    instrument: 'ruler',
    steps: ['Sent', 'Pending · 1/3 confirmations', 'Confirmed'],
    marked: 1,
    statement: '“Where is my money right now?”',
    source: 'The question every screen answers',
    state: 'Vendor iframe, then functional UI',
    label:
      'Note from the cashier project: a three-step withdrawal track with pending, one of three confirmations, marked, and the question every screen answers: "Where is my money right now?" Vendor iframe, then functional UI.',
  },
  system: {
    instrument: 'ruler',
    steps: ['Tokens', 'Components', 'Patterns', 'Templates'],
    marked: 1,
    statement:
      'Two systems that let teams outside design prototype on their own.',
    source: 'madhaus.io, 2026',
    state: 'In progress',
    label:
      'Note from the design-systems project: four layers, tokens, components, patterns and templates, with components marked, and the statement: two systems that let teams outside design prototype on their own. In progress.',
  },
}

export function ProjectArt({ type }: { type: ProjectArtType }) {
  const n = notes[type]
  return (
    <div
      className={`project-art project-art--${type}`}
      role="img"
      aria-label={n.label}
    >
      <div className="project-art__stage" aria-hidden="true">
        <div className="note">
          {n.instrument === 'ruler' ? (
            <ol className="note-ruler">
              {n.steps.map((s, i) => (
                <li key={s} className={i === n.marked ? 'is-here' : undefined}>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="note-tags">
              {n.steps.map((s) => (
                <li key={s}>
                  <span>{s}</span>
                  <b />
                </li>
              ))}
            </ul>
          )}
          <p className="note-statement">{n.statement}</p>
          <p className="note-meta">
            <span>{n.source}</span>
            <span>{n.state}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
