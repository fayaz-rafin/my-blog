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

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Web Development",
              "System Design",
              "TypeScript",
              "React",
              "Career Growth",
              "Best Practices"
            ].map((category, index) => (
              <div 
                key={index}
                className="bg-[#252837] rounded-lg px-4 py-3 text-gray-300"
              >
                {category}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
