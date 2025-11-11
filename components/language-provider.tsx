'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Language = 'en' | 'fr'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const LANGUAGE_STORAGE_KEY = 'preferred-language'

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const detectDefaultLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  const preferredLocales: string[] = []

  if (Array.isArray(navigator.languages)) {
    preferredLocales.push(...navigator.languages)
  }

  if (navigator.language) {
    preferredLocales.push(navigator.language)
  }

  try {
    const resolved = Intl.DateTimeFormat().resolvedOptions().locale
    if (resolved) {
      preferredLocales.push(resolved)
    }
  } catch {
    // ignore
  }

  const lowered = preferredLocales
    .map((locale) => locale?.toLowerCase?.())
    .filter(Boolean) as string[]

  const hasFrenchPreference = lowered.some((locale) => {
    if (!locale) {
      return false
    }

    return (
      locale.startsWith('fr') ||
      locale.endsWith('-fr') ||
      locale.endsWith('_fr') ||
      locale === 'fr-ca' ||
      locale === 'fr-fr'
    )
  })

  return hasFrenchPreference ? 'fr' : 'en'
}

const setHtmlLangAttribute = (language: Language) => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = language
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored === 'en' || stored === 'fr') {
      setLanguageState(stored)
      setHtmlLangAttribute(stored)
      return
    }

    const detected = detectDefaultLanguage()
    setLanguageState(detected)
    setHtmlLangAttribute(detected)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    }

    setHtmlLangAttribute(language)
  }, [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => setLanguageState(nextLanguage),
      toggleLanguage: () => setLanguageState((prev) => (prev === 'en' ? 'fr' : 'en')),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}

