import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { calculateReadTime } from '@/lib/utils'
import 'highlight.js/styles/github-dark.css'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const files = await fs.readdir(path.join(process.cwd(), 'content/blog'))

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
    const file = await fs.readFile(filePath, 'utf8')
    const { data } = matter(file)

    return {
      title: data.title || 'Blog',
      description: data.description || '',
    }
  } catch {
    return {
      title: 'Blog Post',
    }
  }
}

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="mt-10 mb-4 font-mono text-3xl font-semibold tracking-[-0.03em] text-[var(--text-raw)] sm:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mt-10 mb-3 font-mono text-2xl font-semibold tracking-[-0.02em] text-[var(--text-raw)]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-[var(--text-raw)]" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold text-[var(--text-raw)]" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="my-4 leading-relaxed text-[var(--muted-raw)]" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-[var(--accent-raw)] underline-offset-2 hover:underline"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="my-4 list-disc space-y-1 pl-6 text-[var(--muted-raw)]" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-4 list-decimal space-y-1 pl-6 text-[var(--muted-raw)]" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="my-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 border-l-2 border-[var(--accent-raw)] pl-4 italic text-[var(--muted-raw)]"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code
          className="border border-[color:var(--hairline)] bg-[var(--surface-hover)] px-1.5 py-0.5 font-mono text-sm text-[var(--text-raw)]"
          {...props}
        >
          {children}
        </code>
      )
    }

    return (
      <code
        className={`${className} my-4 block overflow-auto border border-[color:var(--hairline)] bg-[var(--code-bg)] p-4 font-mono text-sm`}
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }) => (
    <pre className="my-4 overflow-auto border border-[color:var(--hairline)]" {...props}>
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-auto">
      <table className="w-full border-collapse border border-[color:var(--hairline-strong)]" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-[color:var(--hairline-strong)] bg-[var(--surface-hover)] px-4 py-2 text-left font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-raw)]"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-[color:var(--hairline-strong)] px-4 py-2 text-[var(--muted-raw)]" {...props}>
      {children}
    </td>
  ),
  img: ({ alt = '', ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element -- markdown content images
    <img alt={alt} className="my-6 h-auto max-w-full border border-[color:var(--hairline-strong)]" {...props} />
  ),
  hr: (props) => <hr className="my-10 border-[color:var(--hairline)]" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-[var(--text-raw)]" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
}

const loadPost = async (slug: string) => {
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`)
  const fileContent = await fs.readFile(filePath, 'utf8')
  return matter(fileContent)
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params

  let content: string
  let data: matter.GrayMatterFile<string>['data']

  try {
    const post = await loadPost(slug)
    content = post.content
    data = post.data
  } catch (error) {
    console.error('Error rendering blog post:', error)
    notFound()
  }

  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="pb-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-[color:var(--hairline)] pb-8">
          <p className="page-index">04 / Post</p>
          <h1 className="page-title text-[clamp(1.85rem,3vw+0.5rem,2.75rem)]">{data.title}</h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted-raw)]">
            {formattedDate} · {calculateReadTime(content)} min read
          </p>
        </header>

        <article className="max-w-none">
          <ReactMarkdown
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              rehypeSlug,
              [rehypeHighlight, { ignoreMissing: true }],
            ]}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  )
}
