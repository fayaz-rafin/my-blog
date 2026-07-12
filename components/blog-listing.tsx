'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { useLanguage } from '@/components/language-provider'
import type { BlogPost } from '@/lib/blog'

interface BlogListingProps {
  posts: BlogPost[]
}

export default function BlogListing({ posts }: BlogListingProps) {
  const { language } = useLanguage()

  const copy =
    language === 'fr'
      ? {
          featured: 'À la une',
          archive: 'Archives',
          read: 'Lire',
          min: 'min',
          empty: 'Aucun article pour le moment.',
        }
      : {
          featured: 'Featured',
          archive: 'Archive',
          read: 'Read',
          min: 'min',
          empty: 'No posts found.',
        }

  if (posts.length === 0) {
    return <p className="text-[var(--muted-raw)]">{copy.empty}</p>
  }

  const [featured, ...archive] = posts

  return (
    <div className="space-y-14 sm:space-y-20">
      <section aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="section-index mb-6 sm:mb-8">
          01 / {copy.featured}
        </h2>

        <Link
          href={`/blog/${featured.slug}`}
          className="group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-raw)]"
          aria-label={`${copy.read}: ${featured.title}`}
        >
          <article className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-10">
            {featured.imageUrl ? (
              <div className="relative aspect-[16/10] overflow-hidden border border-[color:var(--hairline-strong)] bg-[var(--image-bg)] lg:aspect-[4/3]">
                <Image
                  src={featured.imageUrl}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-[var(--accent-raw)]"
                />
              </div>
            ) : (
              <div className="relative flex aspect-[16/10] items-end border border-[color:var(--hairline-strong)] bg-[var(--surface-raw)] p-6 lg:aspect-[4/3]">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-1 bg-[var(--accent-raw)]"
                />
                <span className="blog-meta text-[var(--accent-raw)]">01</span>
              </div>
            )}

            <div className="min-w-0 lg:pb-2">
              <p className="blog-meta">
                <time dateTime={featured.dateIso}>{featured.date}</time>
                {' · '}
                {featured.readTime} {copy.min}
              </p>
              <h3 className="blog-display-title mt-3 text-[clamp(1.85rem,4.5vw,3rem)] transition-colors duration-300 group-hover:text-[var(--accent-raw)]">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted-raw)] sm:text-base">
                {featured.description}
              </p>
              <span className="link-raw mt-6">
                {copy.read}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </article>
        </Link>
      </section>

      {archive.length > 0 && (
        <section aria-labelledby="archive-heading">
          <h2 id="archive-heading" className="section-index mb-6 sm:mb-8">
            02 / {copy.archive}
          </h2>

          <ul className="border-y border-[color:var(--hairline)]">
            {archive.map((post, index) => {
              const number = String(index + 2).padStart(2, '0')
              return (
                <li
                  key={post.slug}
                  className="border-b border-[color:var(--hairline)] last:border-b-0"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid grid-cols-[auto_1fr] gap-4 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-raw)] sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-8 sm:py-8"
                  >
                    <span
                      aria-hidden="true"
                      className="pt-1 font-mono text-xs tracking-[0.12em] text-[var(--accent-raw)] sm:pt-2 sm:text-sm"
                    >
                      {number}
                    </span>

                    <div className="min-w-0">
                      <p className="blog-meta">
                        <time dateTime={post.dateIso}>{post.date}</time>
                        {' · '}
                        {post.readTime} {copy.min}
                      </p>
                      <h3 className="blog-display-title mt-2 text-[clamp(1.35rem,2.8vw,1.85rem)] transition-colors duration-300 group-hover:text-[var(--accent-raw)]">
                        {post.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted-raw)] sm:text-[0.9375rem]">
                        {post.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent-raw)] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:hidden">
                        {copy.read}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>

                    {post.imageUrl ? (
                      <div className="relative col-span-2 mt-1 hidden h-20 w-28 shrink-0 overflow-hidden border border-[color:var(--hairline-strong)] sm:col-span-1 sm:mt-0 sm:block sm:h-24 sm:w-32">
                        <Image
                          src={post.imageUrl}
                          alt=""
                          fill
                          sizes="128px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    ) : (
                      <span className="link-raw hidden self-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline-flex">
                        {copy.read}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}
