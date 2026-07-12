'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

import HeroSection from './hero-section'
import { useLanguage } from '@/components/language-provider'

interface BlogPost {
  title: string
  description: string
  date: string
  slug: string
  readTime?: string
  imageUrl?: string
}

interface HomeClientProps {
  recentPost: BlogPost | null
}

const homeCopy = {
  en: {
    aboutHeading: '01 / About',
    aboutLead:
      'I build AI-powered tools at KPMG Canada and study Computer Engineering at York University.',
    aboutBody:
      'Based in Toronto, originally from Dhaka. Previously software engineering at TD Securities, Dorayaki Studios, and Radar.',
    aboutMore: 'More about me',
    recentHeading: '02 / Writing',
    viewAllPosts: 'All posts',
    readArticle: 'Read',
    noPostTitle: 'No posts yet.',
    noPostSubtitle: 'Check back soon, or browse the archive.',
  },
  fr: {
    aboutHeading: '01 / À propos',
    aboutLead:
      'Je conçois des outils propulsés par l’IA chez KPMG Canada et j’étudie le génie informatique à l’Université York.',
    aboutBody:
      'Basé à Toronto, originaire de Dhaka. Auparavant ingénieur logiciel chez TD Securities, Dorayaki Studios et Radar.',
    aboutMore: 'En savoir plus',
    recentHeading: '02 / Écriture',
    viewAllPosts: 'Tous les articles',
    readArticle: 'Lire',
    noPostTitle: 'Aucun article pour le moment.',
    noPostSubtitle: 'Revenez bientôt, ou parcourez les archives.',
  },
} as const

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function HomeClient({ recentPost }: HomeClientProps) {
  const { language } = useLanguage()
  const content = homeCopy[language]

  return (
    <main className="pb-16 sm:pb-24 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <HeroSection />

        <div className="mt-4 space-y-14 border-t border-[color:var(--hairline)] pt-12 sm:mt-2 sm:space-y-24 sm:pt-16 lg:space-y-28 lg:pt-20">
          <motion.section
            aria-labelledby="about-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={reveal}
            className="max-w-2xl"
          >
            <h2
              id="about-heading"
              className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent-raw)] sm:text-[11px] sm:tracking-[0.22em]"
            >
              {content.aboutHeading}
            </h2>
            <p className="mt-4 text-[clamp(1.2rem,4.5vw,1.85rem)] font-medium leading-snug tracking-[-0.02em] text-[var(--text-raw)] sm:mt-6">
              {content.aboutLead}
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--muted-raw)] sm:mt-5 sm:text-lg">
              {content.aboutBody}
            </p>
            <Link href="/about" className="link-raw mt-5 sm:mt-7">
              {content.aboutMore}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.section>

          <motion.section
            aria-labelledby="recent-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={reveal}
          >
            <div className="mb-6 flex flex-col gap-3 border-b border-[color:var(--hairline)] pb-4 sm:mb-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h2
                id="recent-heading"
                className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent-raw)] sm:text-[11px] sm:tracking-[0.22em]"
              >
                {content.recentHeading}
              </h2>
              <Link href="/blog" className="link-raw self-start">
                {content.viewAllPosts}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {recentPost ? (
              <Link
                href={`/blog/${recentPost.slug}`}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-raw)]"
                aria-label={`${content.readArticle}: ${recentPost.title}`}
              >
                <article className="grid gap-5 sm:grid-cols-[180px_1fr] sm:gap-8 lg:grid-cols-[200px_1fr] lg:gap-10">
                  {recentPost.imageUrl && (
                    <div className="relative h-44 w-full overflow-hidden border border-[color:var(--hairline-strong)] sm:h-36">
                      <Image
                        src={recentPost.imageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 200px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <time className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-raw)] sm:text-[11px] sm:tracking-[0.16em]">
                      {recentPost.date}
                    </time>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--text-raw)] transition-colors duration-300 group-hover:text-[var(--accent-raw)] sm:mt-3 sm:text-2xl lg:text-3xl">
                      {recentPost.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--muted-raw)] sm:mt-3 sm:text-base">
                      {recentPost.description}
                    </p>
                    <span className="link-raw mt-4 sm:mt-5">
                      {content.readArticle}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </article>
              </Link>
            ) : (
              <div className="py-2">
                <p className="text-[var(--text-raw)]">{content.noPostTitle}</p>
                <p className="mt-1 text-[var(--muted-raw)]">{content.noPostSubtitle}</p>
                <Link href="/blog" className="link-raw mt-5">
                  {content.viewAllPosts}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </main>
  )
}
