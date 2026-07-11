import BlogHeader from '@/components/blog-header'
import RecentPosts from '@/components/recent-posts'

export default function BlogPage() {
  return (
    <main className="pb-16">
      <div className="mx-auto max-w-3xl">
        <BlogHeader />
        <RecentPosts />
      </div>
    </main>
  )
}
