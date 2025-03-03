'use client'

import { useMemo } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

const components = {
  // Add any custom components here
  h1: (props: any) => <h1 className="text-3xl font-bold my-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold my-3" {...props} />,
  p: (props: any) => <p className="my-2" {...props} />,
}

export function Markdown({ source }: { source: MDXRemoteSerializeResult }) {
  const content = useMemo(() => {
    return <MDXRemote {...source} components={components} />
  }, [source])

  return (
    <article className="prose prose-invert max-w-none">
      {content}
    </article>
  )
}