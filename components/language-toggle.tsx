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
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 transition-all duration-200 hover:border-white/30 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
    >
      <span aria-hidden="true">{nextLanguageLabel}</span>
      <span className="sr-only">{srLabel}</span>
    </button>
  )
}

