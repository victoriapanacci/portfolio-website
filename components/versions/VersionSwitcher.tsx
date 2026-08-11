'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { versions } from './versionData'

/**
 * Floating pill that lets you jump between the five layout experiments and
 * back to the gallery. Fixed to the bottom of the viewport on every version.
 */
export function VersionSwitcher() {
  const pathname = usePathname()
  const current = pathname?.split('/').pop()

  return (
    <div className="vswitch" role="navigation" aria-label="Layout versions">
      <Link className="vswitch__home" href="/versions">
        All
      </Link>
      <span className="vswitch__divider" aria-hidden="true" />
      <ul>
        {versions.map((v) => {
          const active = v.id === current
          return (
            <li key={v.id}>
              <Link
                href={`/versions/${v.id}`}
                aria-current={active ? 'page' : undefined}
                className={active ? 'is-active' : undefined}
                title={v.name}
              >
                {v.id}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
