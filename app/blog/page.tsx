import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          <p className="text-xl text-gray-400">
            Thoughts, ideas, and everything in between.
          </p>

          <div className="space-y-8 mt-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#252837] rounded-xl p-6 hover:bg-[#2a2d3d] transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">
                      {formatDate(post.date)}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {post.title}
                    </h2>
                    <p className="text-gray-300">{post.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}