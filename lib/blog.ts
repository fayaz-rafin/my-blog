import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { calculateReadTime } from '@/lib/utils'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  dateIso: string
  readTime: number
  imageUrl?: string
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export const getSlugs = () =>
  fs.readdirSync(BLOG_DIR).filter((filename) => filename.endsWith('.md')).map((filename) => filename.replace(/\.md$/, ''))

export const getPost = (slug: string) => {
  const fileContent = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf-8')
  const { data, content } = matter(fileContent)
  const dateIso = new Date(data.date).toISOString()

  const imageMatch = content.match(/!\[(.*?)\]\((.*?)\)/)
  const imageUrl = imageMatch ? imageMatch[2] : undefined

  return {
    slug,
    title: data.title as string,
    description: (data.description as string) || '',
    date: new Date(data.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    dateIso,
    readTime: calculateReadTime(content),
    imageUrl,
    cover: imageMatch ? { alt: imageMatch[1] || '', src: imageMatch[2] } : null,
    body: imageMatch ? content.replace(imageMatch[0], '').replace(/^\s*\n+/, '') : content,
  }
}

export const getBlogPosts = (): BlogPost[] =>
  getSlugs()
    .map((slug) => {
      const post = getPost(slug)
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        dateIso: post.dateIso,
        readTime: post.readTime,
        imageUrl: post.imageUrl,
      }
    })
    .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime())
