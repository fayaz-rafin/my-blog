import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  title: string
  description: string
  date: string
  slug: string
  readTime?: string
}

export async function getLatestPost(): Promise<BlogPost | null> {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const files = await fs.promises.readdir(blogDir)

  if (files.length === 0) return null

  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, '')
      const filePath = path.join(blogDir, filename)
      const fileContent = await fs.promises.readFile(filePath, 'utf8')
      const { data } = matter(fileContent)
      return {
        slug,
        title: data.title || 'Untitled Post',
        description: data.description || '',
        date: data.date || '',
        readTime: data.readTime || '3 min read',
      } as BlogPost
    })
  )

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts[0] || null
}
