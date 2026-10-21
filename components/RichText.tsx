/**
 * Renders case-study prose from a string or a list of strings. Each string
 * is a paragraph, except: strings that start with "- " are gathered into a
 * bulleted list, "## " opens a small subheading, and "> " is a pull quote.
 * Keeps long sections scannable without a markdown dependency.
 */
type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] }

export function RichText({ text }: { text: string | string[] }) {
  const parts = Array.isArray(text) ? text : [text]
  const blocks: Block[] = []
  for (const part of parts) {
    if (part.startsWith('- ')) {
      const last = blocks[blocks.length - 1]
      if (last && last.type === 'ul') last.items.push(part.slice(2))
      else blocks.push({ type: 'ul', items: [part.slice(2)] })
    } else if (part.startsWith('## ')) {
      blocks.push({ type: 'h3', text: part.slice(3) })
    } else if (part.startsWith('> ')) {
      blocks.push({ type: 'quote', text: part.slice(2) })
    } else {
      blocks.push({ type: 'p', text: part })
    }
  }
  return (
    <>
      {blocks.map((b, i) =>
        b.type === 'p' ? (
          <p key={i}>{b.text}</p>
        ) : b.type === 'h3' ? (
          <h3 key={i} className="cs-rich__sub">
            {b.text}
          </h3>
        ) : b.type === 'quote' ? (
          <blockquote key={i} className="cs-rich__quote">
            {b.text}
          </blockquote>
        ) : (
          <ul key={i} className="list">
            {b.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      )}
    </>
  )
}
