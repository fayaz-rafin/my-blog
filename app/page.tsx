// app/page.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Interface for blog posts
interface BlogPost {
  title: string
  description: string
  date: string
  slug: string
}

export default function Home() {
  // This would typically come from your blog data/API
  const recentPosts: BlogPost[] = []

  return (
    <main className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-6 flex-col sm:flex-row">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt="Fayaz Rafin avatar"
              width={200}
              height={200}
              className="rounded-full border-4 border-[#313244] shadow-lg"
            />
          </div>

          {/* Hero content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-white">
              Hello, World!
            </h1>
            <p className="text-2xl text-gray-300">
              My name is Fayaz Rafin. I build software and write about technology, development, and my journey.
            </p>
            <p className="text-xl text-gray-400">
              Welcome to my digital garden. Here, I share my thoughts, projects, and experiences in software development and beyond.
            </p>
          </div>
        </div>

        {/* What's New Section */}
        <section className="mt-16">
          <motion.div 
            className="bg-[#252837] rounded-xl p-6 relative overflow-hidden"
            whileHover="hover"
            initial="initial"
            variants={{
              initial: {
                backgroundColor: '#252837',
              },
              hover: {
                backgroundColor: '#313244',
              }
            }}
          >
            {/* Green overlay that slides in from the corner */}
            <motion.div
              className="absolute inset-0 bg-emerald-500/20"
              initial={{ x: '100%', y: '100%' }}
              variants={{
                hover: {
                  x: 0,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut'
                  }
                }
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">
                What's new?
              </h2>
              <p className="text-gray-400">
                My latest updates and activities.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="bg-[#313244] p-4 rounded-lg flex-shrink-0">
                  <span className="text-3xl">📚</span>
                </div>
                <p className="text-xl text-gray-300 leading-normal">
                  I'm currently studying for my final exams and questioning all my life choices!
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Recent Blog Posts Section */}
        <section className="mt-16">
          <motion.div 
            className="bg-[#252837] rounded-xl p-6 relative overflow-hidden"
            whileHover="hover"
            initial="initial"
            variants={{
              initial: {
                backgroundColor: '#252837',
              },
              hover: {
                backgroundColor: '#313244',
              }
            }}
          >
            {/* Purple overlay that slides in from the corner */}
            <motion.div
              className="absolute inset-0 bg-purple-500/20"
              initial={{ x: '100%', y: '100%' }}
              variants={{
                hover: {
                  x: 0,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut'
                  }
                }
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Recent Updates
                  </h2>
                  <p className="text-gray-400">
                    Latest articles from my blog.
                  </p>
                </div>
                <Link 
                  href="/blog"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  View all posts
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Link>
              </div>

              {recentPosts.length > 0 ? (
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <Link 
                      key={index}
                      href={`/blog/${post.slug}`}
                      className="block bg-[#313244] rounded-lg p-4 hover:bg-[#3b3d57] transition-colors duration-200"
                    >
                      <h3 className="text-lg font-medium text-white mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {post.description}
                      </p>
                      <time className="text-sm text-purple-400">
                        {post.date}
                      </time>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-[#313244] rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-gray-300 text-lg">
                    The most recent blog posts will appear here
                  </p>
                  <p className="text-gray-400 mt-2">
                    Stay tuned for upcoming articles!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}