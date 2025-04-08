// app/blog/page.tsx
import React from 'react'

interface BlogPost {
  title: string
  description: string
  date: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  // You can add your blog posts here later
  // Example:
  // {
  //   title: "Getting Started with Next.js",
  //   description: "A comprehensive guide to building modern web applications with Next.js",
  //   date: "March 25, 2024",
  //   readTime: "5 min read"
  // },
]

export default async function BlogPage() {
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
              This page is currently under construction. I'm working on bringing you valuable content soon.
              Check back later for updates!
            </p>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Posts</h2>
          <div className="bg-[#1a1b26] rounded-xl p-8">
            {blogPosts.length > 0 ? (
              <div className="space-y-8">
                {blogPosts.map((post, index) => (
                  <div key={index} className="border-b border-gray-800 last:border-0 pb-8 last:pb-0">
                    <h3 className="text-pink-400 font-medium text-lg mb-2">
                      {post.title}
                    </h3>
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
                  Coming soon! I'm working on some exciting content to share with you.
                </p>
              </div>
            )}
          </div>
        </section>

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