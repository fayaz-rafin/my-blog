'use client'

import { useLanguage } from '@/components/language-provider'

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  const nextLanguageLabel = language === 'en' ? 'FR' : 'EN'
  const srLabel = language === 'en' ? 'Passer le site en français' : 'Switch the site to English'

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex h-9 min-w-9 items-center justify-center border border-[color:var(--hairline-strong)] px-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted-raw)] transition-colors duration-200 hover:border-[var(--accent-raw)] hover:text-[var(--accent-raw)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)]"
      aria-label={srLabel}
    >
      <span aria-hidden="true">{nextLanguageLabel}</span>
    </button>
  )
}
