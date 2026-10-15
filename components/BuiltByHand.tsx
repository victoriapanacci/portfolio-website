import { Reveal } from './motion/Reveal'

const stack = ['Next.js', 'React', 'TypeScript', 'Hand-written CSS', 'Motion']

/**
 * A quiet note under the work: this site is itself a shipped product, not a
 * template. Sits at the end of the project grid so it reads as the last item
 * of the work, not as a footer line.
 */
export function BuiltByHand() {
  return (
    <Reveal as="aside" className="colophon shell" aria-labelledby="colophon-title">
      <h2 id="colophon-title" className="colophon__title">
        This site is custom code, too.
      </h2>
      <div className="colophon__body">
        <p>
          No template and no site builder. I designed this portfolio and wrote
          every line of it myself, the same way I work on product: from the
          type scale and motion down to the markup.
        </p>
        <ul className="project-pills" aria-label="Built with">
          {stack.map((item) => (
            <li key={item} className="pill">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
