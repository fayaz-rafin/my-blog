import React from 'react'
import RecentPosts from '@/components/recent-posts'

export default function BlogPage() {
  return (
    <main className="pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blog Header Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-8">Blog</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">
              Welcome to my blog! Here, I share my thoughts, experiences, and insights about software development,
              technology, and everything in between.
            </p>
            <p className="text-gray-400 mb-6">
              Check back often for new posts and ideas — I’m building in public.
            </p>
          </div>
        </section>

        {/* Recent Posts Section */}
        <RecentPosts />

        {/* Categories Section removed as requested */}
      </div>
    </main>
  )
}
