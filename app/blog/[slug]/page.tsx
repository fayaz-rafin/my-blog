import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'

import BlogPostFooter, { BlogBackLink } from '@/components/blog-post-nav'
import { getPost, getSlugs } from '@/lib/blog'
import 'highlight.js/styles/github-dark.css'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = getPost(slug)

    return {
      title: post.title || 'Blog',
      description: post.description || '',
    }
  } catch {
    return {
      title: 'Blog Post',
    }
  }
}

const components: Components = {
  h1: ({ children, ...props }) => (
    <h2 className="blog-section-title" {...props}>
      {children}
    </h2>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="blog-section-title" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="blog-display-title mt-10 mb-3 text-[clamp(1.25rem,2vw,1.5rem)]" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-8 mb-2 text-base font-semibold tracking-[-0.01em] text-[var(--text-raw)]" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="blog-paragraph" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a href={href} className="blog-link" {...props}>
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="blog-list list-disc" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="blog-list list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="my-1.5 pl-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="blog-quote" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="blog-inline-code" {...props}>
          {children}
        </code>
      )
    }

    return (
      <code className={`${className ?? ''} blog-code-block`} {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }) => (
    <pre className="blog-pre" {...props}>
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="my-8 overflow-auto border border-[color:var(--hairline-strong)]">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-[color:var(--hairline-strong)] bg-[var(--surface-hover)] px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-raw)]"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-b border-[color:var(--hairline)] px-4 py-3 text-[0.95rem] text-[var(--muted-raw)]"
      {...props}
    >
      {children}
    </td>
  ),
  img: ({ alt = '', src, ...props }) => {
    const imageProps = { ...props } as Record<string, unknown>
    delete imageProps.node

    return (
      <span className="blog-figure">
        {/* eslint-disable-next-line @next/next/no-img-element -- markdown content images */}
        <img alt={alt} src={src} className="blog-image" {...imageProps} />
        {alt ? <span className="blog-caption">{alt}</span> : null}
      </span>
    )
  },
  hr: (props) => <hr className="blog-rule" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-[var(--text-raw)]" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="font-display italic" {...props}>
      {children}
    </em>
  ),
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params

  let post: ReturnType<typeof getPost>
  try {
    post = getPost(slug)
  } catch (error) {
    console.error('Error rendering blog post:', error)
    notFound()
  }

  const { cover, body, readTime, dateIso, date: formattedDate } = post
  const description = typeof post.description === 'string' ? post.description.trim() : ''

  return (
    <main className="pb-16">
      <article className="mx-auto max-w-3xl">
        <header className="relative mb-10 sm:mb-12">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-px bg-[var(--accent-raw)] opacity-80"
          />
          <div className="pl-5 sm:pl-7">
            <BlogBackLink />
            <p className="page-index mt-6">04 / Post</p>
            <h1 className="blog-display-title mt-4 text-[clamp(2.35rem,7vw,4rem)]">
              {post.title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--muted-raw)] sm:mt-6 sm:text-xl sm:leading-relaxed">
                {description}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[color:var(--hairline)] pt-5">
              <p className="blog-meta">
                <time dateTime={dateIso}>{formattedDate}</time>
              </p>
              <span aria-hidden="true" className="text-[var(--hairline-strong)]">
                /
              </span>
              <p className="blog-meta">
                {readTime} min read
              </p>
            </div>
          </div>
        </header>

        {cover ? (
          <figure className="blog-cover mb-12 sm:mb-14">
            {/* eslint-disable-next-line @next/next/no-img-element -- markdown cover image */}
            <img src={cover.src} alt={cover.alt} className="blog-cover__image" />
            <div aria-hidden="true" className="blog-cover__accent" />
            {cover.alt ? <figcaption className="blog-caption mt-3">{cover.alt}</figcaption> : null}
          </figure>
        ) : null}

        <div className="blog-prose">
          <ReactMarkdown
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              rehypeUnwrapImages,
              rehypeSlug,
              [rehypeHighlight, { ignoreMissing: true }],
            ]}
          >
            {body}
          </ReactMarkdown>
        </div>

        <BlogPostFooter />
      </article>
    </main>
  )
}
