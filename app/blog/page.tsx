import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'

// Define more specific types
type Params = {
  slug: string;
}

type PageProps = {
  params: Params;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const files = await fs.readdir(blogDir)
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }))
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.md`)
  try {
    const file = await fs.readFile(filePath, 'utf8')
    const { data } = matter(file)
    return {
      title: data.title || 'Blog',
    }
  } catch {
    return {
      title: 'Blog Post Not Found',
    }
  }
}

export default async function BlogPost(props: PageProps) {
  const { params } = props
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.md`)

  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { content, data } = matter(fileContent)
    return (
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-2">{data.title}</h1>
          <p className="text-sm text-gray-400 mb-8">{data.date}</p>
          <article className="prose prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </div>
      </main>
    )
  } catch (error) {
    return notFound()
  }
}