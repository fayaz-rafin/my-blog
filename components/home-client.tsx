'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import OnlineViewers from './online-viewers'
import TimezoneDisplay from './timezone-display'

interface BlogPost {
  title: string
  description: string
  date: string
  slug: string
  readTime?: string
}

interface HomeClientProps {
  recentPost: BlogPost | null
}

export default function HomeClient({ recentPost }: HomeClientProps) {
  const [displayText, setDisplayText] = useState('Hello, World!');
  const phrases = ['Hello, World!', 'Bonjour, le monde!', 'Hola, Mundo!', 'こんにちは、世界！', '안녕하세요, 세계!', 'Привет, мир!', 'مرحبا بالعالم!','হ্যালো, বিশ্ব!', 'नमस्ते, दुनिया!', 'வணக்கம், உலகம்!', '你好，世界！', 'Olá, Mundo!', 'Ciao, Mondo!', 'שלום, עולם!'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      setDisplayText(
        isDeleting
          ? currentPhrase.substring(0, displayText.length - 1)
          : currentPhrase.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [displayText, isDeleting, phraseIndex, typingSpeed]);


  return (
    <main className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Online Viewers Counter */}
        <div className="flex justify-end mb-4">
          <OnlineViewers />
        </div>
        {/* Intro Section */}
        <div className="flex items-start gap-6 flex-col sm:flex-row">
          <div className="flex-shrink-0">
            <Image
              src="/avatar.jpg"
              alt="Fayaz Rafin avatar"
              width={200}
              height={200}
              className="rounded-full border-4 border-[#313244] shadow-lg"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold text-white" style={{ minHeight: '4rem' }}>
            {displayText}<span className={`cursor ${((!isDeleting && displayText === phrases[phraseIndex]) || (isDeleting && displayText === '')) ? 'blinking' : ''}`}>|</span>
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
            initial={{ backgroundColor: '#252837' }}
            whileHover={{ backgroundColor: '#313244' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-emerald-500/20"
              initial={{ x: '100%', y: '100%' }}
              whileHover={{ x: 0, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">What's new?</h2>
              <p className="text-gray-400">My latest updates and activities.</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="bg-[#313244] p-4 rounded-lg flex-shrink-0">
                  <span className="text-3xl">🏃</span>
                </div>
                <p className="text-xl text-gray-300 leading-normal">
                  Making the most of my summer break before university starts.
                </p>
              </div>
            </div>
          </motion.div>
        </section>



        {/* Recent Blog Post Section */}
        <section className="mt-16">
          <motion.div 
            className="bg-[#252837] rounded-xl p-6 relative overflow-hidden"
            initial={{ backgroundColor: '#252837' }}
            whileHover={{ backgroundColor: '#313244' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-purple-500/20"
              initial={{ x: '100%', y: '100%' }}
              whileHover={{ x: 0, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Recent Update</h2>
                  <p className="text-gray-400">Latest article from my blog.</p>
                </div>
                <Link 
                  href="/blog"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  View all posts
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              {recentPost ? (
                <Link 
                  href={`/blog/${recentPost.slug}`}
                  className="block bg-[#313244] rounded-lg p-4 hover:bg-[#3b3d57] transition-colors duration-200"
                >
                  <h3 className="text-lg font-medium text-white mb-2">{recentPost.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{recentPost.description}</p>
                  <time className="text-sm text-purple-400">{recentPost.date}</time>
                </Link>
              ) : (
                <div className="bg-[#313244] rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-gray-300 text-lg">
                    The most recent blog post will appear here.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Stay tuned for upcoming articles!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Timezone Display Section */}
        <section className="mt-16">
          <TimezoneDisplay 
            userTimezone="America/Toronto"
            userLocation="Toronto, Canada"
          />
        </section>
      </div>
    </main>
  )
}
