'use client'

import { useLanguage } from '@/components/language-provider'

export default function BlogHeader() {
  const { language } = useLanguage()

  const copy =
    language === 'fr'
      ? {
          index: '04 / Blog',
          title: 'Blog',
          lede: 'Notes sur le développement logiciel, la tech, et ce que j’apprends en public.',
        }
      : {
          index: '04 / Blog',
          title: 'Blog',
          lede: 'Notes on software, technology, and building in public.',
        }

  return (
    <header className="mb-10 border-b border-white/10 pb-8 sm:mb-14 sm:pb-10">
      <p className="page-index">{copy.index}</p>
      <h1 className="page-title">{copy.title}</h1>
      <p className="page-lede">{copy.lede}</p>
    </header>
  )
}
