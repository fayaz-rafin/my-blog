import BlogHeader from '@/components/blog-header'
import BlogListing from '@/components/blog-listing'
import { getBlogPosts } from '@/lib/blog'

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <main className="pb-16">
      <div className="mx-auto max-w-5xl">
        <BlogHeader postCount={posts.length} />
        <BlogListing posts={posts} />
      </div>
    </main>
  )
}
