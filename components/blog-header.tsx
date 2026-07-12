'use client'

import { useLanguage } from '@/components/language-provider'

interface BlogHeaderProps {
  postCount: number
}

export default function BlogHeader({ postCount }: BlogHeaderProps) {
  const { language } = useLanguage()

  const copy =
    language === 'fr'
      ? {
          index: '04 / Blog',
          title: 'Écrits',
          lede: 'Notes sur le logiciel, la tech, et ce que j’apprends en public.',
          countLabel: postCount === 1 ? '1 article' : `${postCount} articles`,
        }
      : {
          index: '04 / Blog',
          title: 'Writing',
          lede: 'Notes on software, technology, and building in public.',
          countLabel: postCount === 1 ? '1 post' : `${postCount} posts`,
        }

  return (
    <header className="relative mb-12 border-b border-[color:var(--hairline)] pb-10 sm:mb-16 sm:pb-14">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px bg-[var(--accent-raw)] opacity-80"
      />
      <div className="pl-5 sm:pl-7">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="page-index">{copy.index}</p>
          <p className="blog-meta">{copy.countLabel}</p>
        </div>
        <h1 className="blog-display-title mt-4 text-[clamp(3rem,12vw,5.5rem)] sm:mt-5">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-[var(--muted-raw)] sm:mt-6 sm:text-lg">
          {copy.lede}
        </p>
      </div>
    </header>
  )
}
