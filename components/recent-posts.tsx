import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { calculateReadTime } from '@/lib/utils'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  imageUrl?: string
}

export default function RecentPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'))

  const blogPosts: BlogPost[] = files
    .map((filename) => {
      const slug = filename.replace('.md', '')
      const filePath = path.join('content/blog', filename)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const imageRegex = /!\[.*?\]\((.*?)\)/
      const match = content.match(imageRegex)
      const imageUrl = match ? match[1] : undefined

      return {
        slug,
        title: data.title,
        description: data.description,
        date: formattedDate,
        readTime: calculateReadTime(content),
        imageUrl,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section aria-labelledby="posts-heading">
      <h2 id="posts-heading" className="section-index mb-8">
        Posts
      </h2>

      {blogPosts.length > 0 ? (
        <ul className="divide-y divide-[color:var(--hairline)] border-y border-[color:var(--hairline)]">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-raw)] sm:flex-row sm:items-start sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <time className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted-raw)]">
                    {post.date} · {post.readTime} min
                  </time>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[var(--text-raw)] transition-colors group-hover:text-[var(--accent-raw)] sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-raw)] sm:text-base">
                    {post.description}
                  </p>
                  <span className="link-raw mt-4">
                    Read
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                {post.imageUrl && (
                  <div className="relative h-28 w-full shrink-0 overflow-hidden border border-[color:var(--hairline-strong)] sm:h-24 sm:w-36">
                    <Image
                      src={post.imageUrl}
                      alt=""
                      fill
                      sizes="144px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--muted-raw)]">No posts found.</p>
      )}
    </section>
  )
}
