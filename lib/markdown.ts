import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface ProcessedMDX {
  frontmatter: {
    title: string
    date: string
    description: string
    [key: string]: any
  }
  mdxSource: MDXRemoteSerializeResult
}

export async function processMdx(content: string): Promise<ProcessedMDX> {
  const { data, content: mdxContent } = matter(content)
  
  const mdxSource = await serialize(mdxContent, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    parseFrontmatter: true,
  })

  return {
    frontmatter: data as ProcessedMDX['frontmatter'],
    mdxSource
  }
}