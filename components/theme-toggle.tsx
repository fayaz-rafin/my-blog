'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

const toggleClasses =
  'inline-flex h-9 min-w-9 items-center justify-center border border-[color:var(--hairline-strong)] px-2 text-[var(--muted-raw)] transition-colors duration-200 hover:border-[var(--accent-raw)] hover:text-[var(--accent-raw)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)]'

const subscribeToHydration = () => () => {}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  )

  if (!mounted) {
    return <span aria-hidden="true" className={toggleClasses} />
  }

  const isDark = resolvedTheme === 'dark'

  const handleToggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={toggleClasses}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  )
}
