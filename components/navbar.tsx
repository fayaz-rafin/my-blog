'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLanguage } from '@/components/language-provider'

export function Navbar() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = useMemo(
    () => [
      { href: '/', label: language === 'fr' ? 'Accueil' : 'Home' },
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: language === 'fr' ? 'À propos' : 'About' },
      { href: '/projects', label: language === 'fr' ? 'Projets' : 'Projects' },
      { href: '/now', label: language === 'fr' ? 'Maintenant' : 'Now' },
    ],
    [language],
  )

  return (
    <header className="pointer-events-none fixed top-0 left-0 right-0 z-50 border-b border-[color:var(--hairline)] bg-[var(--nav-bg)] pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 font-mono text-sm font-semibold tracking-[-0.02em] text-[var(--text-raw)] transition-colors hover:text-[var(--accent-raw)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)]"
          aria-label={language === 'fr' ? 'Retour à la page d’accueil' : 'Back to homepage'}
        >
          <Image src="/logo.png" alt="" width={18} height={18} className="shrink-0 select-none" priority />
          <span className="truncate">Fayaz Rafin</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)]',
                  isActive ? 'text-[var(--accent-raw)]' : 'text-[var(--muted-raw)] hover:text-[var(--text-raw)]',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute inset-x-3 -bottom-px h-px bg-[var(--accent-raw)]"
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </Link>
            )
          })}
          <div className="ml-2 flex items-center gap-1 border-l border-[color:var(--hairline)] pl-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[color:var(--hairline-strong)] text-[var(--text-raw)] transition-colors hover:border-[var(--accent-raw)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)]"
            aria-expanded={isOpen}
            aria-label={isOpen ? (language === 'fr' ? 'Fermer le menu' : 'Close menu') : language === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 17h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto overflow-hidden border-t border-[color:var(--hairline)] bg-[var(--bg-raw)] md:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block w-full border border-transparent px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors',
                    pathname === item.href
                      ? 'border-[var(--accent-raw)]/40 text-[var(--accent-raw)]'
                      : 'text-[var(--muted-raw)] hover:text-[var(--text-raw)]',
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
