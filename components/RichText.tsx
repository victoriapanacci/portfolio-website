/**
 * Renders case-study prose from a string or a list of strings. Each string
 * is a paragraph, except strings that start with "- ", which are gathered
 * into a bulleted list. Keeps long sections scannable without a markdown
 * dependency.
 */
type Block = { type: 'p'; text: string } | { type: 'ul'; items: string[] }

export function RichText({ text }: { text: string | string[] }) {
  const parts = Array.isArray(text) ? text : [text]
  const blocks: Block[] = []
  for (const part of parts) {
    if (part.startsWith('- ')) {
      const last = blocks[blocks.length - 1]
      if (last && last.type === 'ul') last.items.push(part.slice(2))
      else blocks.push({ type: 'ul', items: [part.slice(2)] })
    } else {
      blocks.push({ type: 'p', text: part })
    }
  }
  return (
    <>
      {blocks.map((b, i) =>
        b.type === 'p' ? (
          <p key={i}>{b.text}</p>
        ) : (
          <ul key={i} className="cs-rich-list">
            {b.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      )}
    </>
  )
}
