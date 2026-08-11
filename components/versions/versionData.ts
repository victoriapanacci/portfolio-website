export type VersionMeta = {
  id: string
  name: string
  approach: string
  note: string
}

/**
 * The five home-page layout experiments. Same palette and type as the live
 * site; each explores a different structure for the hero + featured work.
 */
export const versions: VersionMeta[] = [
  {
    id: '1',
    name: 'Colossal',
    approach: 'Oversized serif statement, work as a scaling list',
    note: 'The headline fills the screen. Every project is a full-width line that grows as you move through it.',
  },
  {
    id: '2',
    name: 'Split Editorial',
    approach: 'Sticky hero column beside a numbered case index',
    note: 'A magazine spread. The introduction holds still on the left while the work reads down the right.',
  },
  {
    id: '3',
    name: 'Index Table',
    approach: 'Compact intro over a typographic project table',
    note: 'The work is a designed table, sorted and legible, with discipline and status in line.',
  },
  {
    id: '4',
    name: 'Filmstrip',
    approach: 'Hero beside a horizontal, snapping gallery of work',
    note: 'Projects run sideways as framed panels you scroll through, one at a time.',
  },
  {
    id: '5',
    name: 'Manifesto',
    approach: 'Centered statement with a discipline rail and offset grid',
    note: 'A centered opening and a moving rail of disciplines, then work in a deliberately uneven grid.',
  },
]

export function getVersion(id: string) {
  return versions.find((v) => v.id === id)
}
