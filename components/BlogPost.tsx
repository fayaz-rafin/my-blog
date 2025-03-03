'use client'

import { Markdown } from './Markdown'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface BlogPostProps {
  frontmatter: {
    title: string
    date: string
    description: string
  }
  mdxSource: MDXRemoteSerializeResult
}

export function BlogPost({ frontmatter, mdxSource }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {frontmatter.title}
        </h1>
        <time className="text-gray-400">
          {new Date(frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </header>

      <Markdown source={mdxSource} />
    </article>
  )
}