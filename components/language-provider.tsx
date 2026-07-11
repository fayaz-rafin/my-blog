'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react'

export type Language = 'en' | 'fr'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const LANGUAGE_STORAGE_KEY = 'preferred-language'
const LANGUAGE_CHANGE_EVENT = 'portfolio-language-change'

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

const readStoredLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (stored === 'en' || stored === 'fr') {
    return stored
  }

  return detectDefaultLanguage()
}

const subscribeToLanguage = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY) {
      onStoreChange()
    }
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange)
  }
}

const writeLanguage = (language: Language) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT))
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    readStoredLanguage,
    () => 'en' as Language,
  )

  useEffect(() => {
    setHtmlLangAttribute(language)

    if (typeof window === 'undefined') {
      return
    }

    if (!window.localStorage.getItem(LANGUAGE_STORAGE_KEY)) {
      writeLanguage(language)
    }
  }, [language])

  const setLanguage = useCallback((nextLanguage: Language) => {
    writeLanguage(nextLanguage)
    setHtmlLangAttribute(nextLanguage)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'fr' : 'en')
  }, [language, setLanguage])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage],
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
