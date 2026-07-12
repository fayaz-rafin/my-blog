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

export const getBlogPosts = (): BlogPost[] => {
  const files = fs.readdirSync(BLOG_DIR)

  return files
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const fileContent = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(fileContent)
      const dateIso = new Date(data.date).toISOString()

      const imageMatch = content.match(/!\[.*?\]\((.*?)\)/)
      const imageUrl = imageMatch ? imageMatch[1] : undefined

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
      }
    })
    .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime())
}
