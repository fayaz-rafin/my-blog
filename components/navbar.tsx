'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { LanguageToggle } from '@/components/language-toggle'
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
    <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between h-12 sm:h-14 px-3 sm:px-6 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
            <div className="relative z-10 flex items-center gap-2 min-w-0">
              <Image src="/logo.png" alt="" width={20} height={20} className="select-none flex-shrink-0" priority />
              <Link href="/" className="truncate text-white font-semibold text-sm xs:text-base sm:text-lg max-w-[45vw]" aria-label={language === 'fr' ? 'Retour à la page d’accueil' : 'Back to homepage'}>
                Fayaz Rafin
              </Link>
            </div>

            <nav className="relative z-10 flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="navbar-underline" 
                        layout="position"
                        initial={false}
                        transition={{ 
                          layout: { 
                            duration: 0.2, 
                            ease: [0.4, 0, 0.2, 1]
                          }
                        }}
                        className="absolute left-0 -bottom-2 h-[2px] w-full bg-white/70" 
                      />
                    )}
                  </Link>
                )
              })}
              <LanguageToggle />
            </nav>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between rounded-full border border-white/10 bg-white/10 px-4 py-2 shadow-[0_10px_35px_-15px_rgba(0,0,0,0.55)] backdrop-blur-md md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt=""
              width={18}
              height={18}
              className="h-5 w-5 select-none"
              priority
            />
            <span className="text-sm font-semibold text-white">Fayaz Rafin</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-white/40"
              aria-label={isOpen ? (language === 'fr' ? 'Fermer le menu' : 'Close menu') : language === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
            >
              <span className="sr-only">{isOpen ? (language === 'fr' ? 'Fermer le menu' : 'Close menu') : language === 'fr' ? 'Ouvrir le menu' : 'Open menu'}</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl border border-white/10 bg-black/50 px-4 py-4 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.6)] backdrop-blur-lg md:hidden"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      if (item.href !== pathname) {
                        window.location.href = item.href
                      }
                    }}
                    className={cn(
                      'block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-white/80 transition-colors duration-200',
                      pathname === item.href ? 'bg-white/15 text-white' : 'hover:bg-white/10 hover:text-white',
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}