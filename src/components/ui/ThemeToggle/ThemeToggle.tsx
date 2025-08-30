'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme' // 'dark' | 'light'

function getSystemPrefersDark() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false)

  // hydrate current state from DOM (class set by initializer)
  useEffect(() => {
    const html = document.documentElement
    setIsDark(html.classList.contains('dark'))

    // keep in sync with system changes only if user hasn't chosen explicitly
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) {
        const preferred = mql.matches
        html.classList.toggle('dark', preferred)
        setIsDark(preferred)
      }
    }
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [])

  function applyTheme(nextDark: boolean, persist = true) {
    const html = document.documentElement
    html.classList.toggle('dark', nextDark)
    setIsDark(nextDark)
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, nextDark ? 'dark' : 'light')
      } catch {}
    }
  }

  function toggle() {
    applyTheme(!isDark)
  }

  function resetToSystem() {
    // optional: hold Alt/Option while clicking to reset to system preference
    const sys = getSystemPrefersDark()
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    applyTheme(sys, false)
  }

  return (
    <button
      type="button"
      aria-pressed={isDark}
      title={isDark ? 'Switch to light' : 'Switch to dark'}
      onClick={toggle}
      onAuxClick={resetToSystem}
      className={[
        // size + layout
        'inline-flex items-center gap-2 px-2 py-0.5 text-[13px] font-medium',
        'rounded-md border bg-card/80',
        // borders/shadows
        'border-border/60 shadow-sm',
        // interactions
        'hover:bg-card focus-ring',
        // subtle glass in header
        'backdrop-blur',
        // smooth transitions
        'transition-colors duration-150',
        // micropolish
        'text-fg/80 hover:text-fg',
      ].join(' ')}
    >
      {/* icon */}
      <span aria-hidden className="inline-flex h-4 w-4 items-center justify-center">
        {/* Sun (light) */}
        <svg
          className={isDark ? 'hidden' : 'block'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5.64 5.64l1.4 1.4m9.92 9.92 1.4 1.4m0-12.72-1.4 1.4M7.04 16.96l-1.4 1.4" />
        </svg>
        {/* Moon (dark) */}
        <svg
          className={isDark ? 'block' : 'hidden'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* label — hides on very small screens */}
      <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default ThemeToggle
