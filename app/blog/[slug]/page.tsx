// app/blog/[slug]/page.tsx
import fs from 'fs/promises'
import path from 'path'
import { processMdx } from '@/lib/markdown'
import { BlogPost } from '@/components/BlogPost'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(path.join(process.cwd(), 'content/blog'))
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace(/\.mdx$/, '')
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function Page({ params }: Props) {
  // Await the params before using them
  const { slug } = await params

  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { frontmatter, mdxSource } = await processMdx(fileContent)

    return (
      <main className="pt-32 pb-16">
        <BlogPost frontmatter={frontmatter} mdxSource={mdxSource} />
      </main>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}