// components/RecentPosts.tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
}

export default function RecentPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'))

  const blogPosts: BlogPost[] = files.map((filename) => {
    const slug = filename.replace('.md', '')
    const fileContent = fs.readFileSync(path.join('content/blog', filename), 'utf-8')
    const { data } = matter(fileContent)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      readTime: data.readTime || '3 min read',
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-8">Recent Posts</h2>
      <div className="bg-[#1a1b26] rounded-xl p-8">
        {blogPosts.length > 0 ? (
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <div
                key={post.slug}
                className="border-b border-gray-800 last:border-0 pb-8 last:pb-0"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-pink-400 font-medium text-lg mb-2 hover:underline">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-300 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No posts found.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
