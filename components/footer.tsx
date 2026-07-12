'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '@/components/language-provider'

const socialLinks = [
  {
    href: 'mailto:fayaz.rafin@gmail.com',
    label: 'Email',
    icon: '/icons/email.svg',
    external: false,
  },
  {
    href: 'https://github.com/fayaz-rafin',
    label: 'GitHub',
    icon: '/icons/github.svg',
    external: true,
  },
  {
    href: 'https://linkedin.com/in/fayazrafin',
    label: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    external: true,
  },
] as const

const footerCopy = {
  en: {
    index: '99 / Outro',
    tagline: 'Software engineer · Toronto',
    backToTop: 'Back to top',
    navLabel: 'Contact',
  },
  fr: {
    index: '99 / Outro',
    tagline: 'Ingénieur logiciel · Toronto',
    backToTop: 'Retour en haut',
    navLabel: 'Contact',
  },
} as const

export function Footer() {
  const { language } = useLanguage()
  const content = footerCopy[language]
  const year = new Date().getFullYear()

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-12 border-t border-[color:var(--hairline)] sm:mt-20">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-16 bg-[var(--accent-raw)] sm:w-24"
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:gap-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent-raw)] sm:text-[11px] sm:tracking-[0.22em]">
              {content.index}
            </p>
            <p className="mt-3 font-mono text-lg font-semibold tracking-[-0.03em] text-[var(--text-raw)] sm:text-xl">
              Fayaz Rafin
            </p>
            <p className="mt-2 text-sm text-[var(--muted-raw)]">{content.tagline}</p>
          </div>

          <nav
            className="flex w-full flex-col gap-3 sm:w-auto sm:items-end"
            aria-label={content.navLabel}
          >
            <div className="flex w-full divide-x divide-[color:var(--hairline)] border border-[color:var(--hairline-strong)] sm:w-auto">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-raw)] transition-colors duration-300 hover:bg-[var(--surface-hover)] hover:text-[var(--accent-raw)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)] sm:flex-none sm:px-5 sm:text-[11px]"
                >
                  <Image
                    src={link.icon}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="opacity-80 [filter:var(--icon-filter)]"
                  />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-[color:var(--hairline)] pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-raw)] sm:text-[11px] sm:tracking-[0.16em]">
            © {year} Fayaz Rafin
          </p>
          <button
            type="button"
            onClick={handleBackToTop}
            className="inline-flex min-h-11 items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-raw)] transition-colors duration-300 hover:text-[var(--accent-raw)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)] sm:self-auto sm:text-[11px]"
            aria-label={content.backToTop}
          >
            <span aria-hidden="true">↑</span>
            {content.backToTop}
          </button>
        </div>
      </div>
    </footer>
  )
}
