import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import 'highlight.js/styles/github-dark.css'

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), 'content/blog'))

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }))
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug
    
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
    const file = await fs.readFile(filePath, 'utf8')
    const { data } = matter(file)

    return {
      title: data.title || 'Blog',
      description: data.description || '',
    }
  } catch (error) {
    return {
      title: 'Blog Post',
    }
  }
}

// Define components for ReactMarkdown to use for each element type
const components = {
  h1: ({ node, ...props }: any) => <h1 className="text-4xl font-bold mt-8 mb-4 text-white" {...props} />,
  h2: ({ node, ...props }: any) => <h2 className="text-3xl font-bold mt-8 mb-3 text-white" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="text-2xl font-bold mt-6 mb-3 text-white" {...props} />,
  h4: ({ node, ...props }: any) => <h4 className="text-xl font-bold mt-6 mb-2 text-white" {...props} />,
  p: ({ node, ...props }: any) => <p className="my-4 text-gray-300" {...props} />,
  a: ({ node, href, ...props }: any) => <a href={href} className="text-blue-400 hover:underline" {...props} />,
  ul: ({ node, ...props }: any) => <ul className="list-disc pl-8 my-4 text-gray-300" {...props} />,
  ol: ({ node, ...props }: any) => <ol className="list-decimal pl-8 my-4 text-gray-300" {...props} />,
  li: ({ node, ...props }: any) => <li className="my-1" {...props} />,
  blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-gray-600 pl-4 italic my-4" {...props} />,
  code: ({ node, inline, className, children, ...props }: any) => {
    if (inline) {
      return <code className="bg-gray-800 px-1 py-0.5 rounded text-white font-mono text-sm" {...props}>{children}</code>
    }
    return <code className={`${className} block p-4 my-4 rounded bg-gray-800 overflow-auto font-mono text-sm`} {...props}>{children}</code>
  },
  pre: ({ node, ...props }: any) => <pre className="my-4 rounded overflow-auto" {...props} />,
  table: ({ node, ...props }: any) => <div className="my-6 overflow-auto"><table className="border-collapse border border-gray-700 w-full" {...props} /></div>,
  th: ({ node, ...props }: any) => <th className="border border-gray-700 px-4 py-2 text-left font-bold bg-gray-800 text-white" {...props} />,
  td: ({ node, ...props }: any) => <td className="border border-gray-700 px-4 py-2 text-gray-300" {...props} />,
  img: ({ node, ...props }: any) => <img className="max-w-full h-auto my-4 rounded" {...props} />,
  hr: ({ node, ...props }: any) => <hr className="my-8 border-gray-700" {...props} />,
  strong: ({ node, ...props }: any) => <strong className="font-bold text-white" {...props} />,
  em: ({ node, ...props }: any) => <em className="italic" {...props} />,
}

export default async function BlogPost({ params }: PageProps) {
  try {
    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams.slug
    
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const { content, data } = matter(fileContent)

    return (
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-2">{data.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <span>{data.date}</span>
            {data.readTime && <span>•</span>}
            {data.readTime && <span>{data.readTime}</span>}
          </div>

          <article className="max-w-none">
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeSlug, [rehypeHighlight, { ignoreMissing: true }]]}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error rendering blog post:", error);
    return notFound()
  }
}