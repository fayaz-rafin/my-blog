'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { useLanguage } from '@/components/language-provider'

export default function BlogPostFooter() {
  const { language } = useLanguage()

  const copy =
    language === 'fr'
      ? {
          label: 'Continuer',
          cta: 'Retour aux écrits',
          note: 'D’autres notes sur le logiciel, la tech, et ce que j’apprends en public.',
        }
      : {
          label: 'Continue',
          cta: 'Back to Writing',
          note: 'More notes on software, technology, and building in public.',
        }

  return (
    <footer className="mt-16 border-t border-[color:var(--hairline)] pt-10 sm:mt-20 sm:pt-12">
      <p className="section-index">{copy.label}</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted-raw)] sm:text-base">
        {copy.note}
      </p>
      <Link href="/blog" className="link-raw mt-6 group">
        {copy.cta}
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>
    </footer>
  )
}

export function BlogBackLink() {
  const { language } = useLanguage()
  const label = language === 'fr' ? 'Écrits' : 'Writing'

  return (
    <Link
      href="/blog"
      className="inline-flex min-h-10 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted-raw)] transition-colors duration-300 hover:text-[var(--accent-raw)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)]"
    >
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </Link>
  )
}
