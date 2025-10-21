'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
 
import OnlineViewers from './online-viewers'

interface BlogPost {
  title: string
  description: string
  date: string
  slug: string
  readTime?: string
  imageUrl?: string
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
        <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-start gap-6 flex-col sm:flex-row">
            <div className="flex-shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Fayaz Rafin avatar"
                width={200}
                height={200}
                className="rounded-full border-4 border-white/10 shadow-lg"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl sm:text-6xl font-bold text-white" style={{ minHeight: '3rem' }}>
              {displayText}<span className={`cursor ${((!isDeleting && displayText === phrases[phraseIndex]) || (isDeleting && displayText === '')) ? 'blinking' : ''}`}>|</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90">
                My name is Fayaz Rafin. Computer Engineering Student at York University with expertise in full-stack development.
              </p>
              <p className="text-base sm:text-xl text-white/70">
                Welcome to my digital garden. Here, I share my thoughts, projects, and experiences in software development and beyond.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2 sm:gap-3 pt-4 flex-wrap">
                <Link 
                  href="https://github.com/fayaz-rafin" 
                  target="_blank"
                  className="inline-flex items-center gap-2 max-w-full px-3 py-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/15 rounded-lg transition-colors duration-200 border border-white/10"
                >
                  <Image
                    src="/icons/github.svg"
                    alt="GitHub"
                    width={18}
                    height={18}
                    className="flex-shrink-0"
                  />
                  <span className="text-white text-sm sm:text-base truncate">GitHub</span>
                </Link>
                <Link 
                  href="https://linkedin.com/in/fayazrafin" 
                  target="_blank"
                  className="inline-flex items-center gap-2 max-w-full px-3 py-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/15 rounded-lg transition-colors duration-200 border border-white/10"
                >
                  <Image
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    width={18}
                    height={18}
                    className="flex-shrink-0"
                  />
                  <span className="text-white text-sm sm:text-base truncate">LinkedIn</span>
                </Link>
                <Link 
                  href="https://devpost.com/fayaz-rafin" 
                  target="_blank"
                  className="inline-flex items-center gap-2 max-w-full px-3 py-2 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/15 rounded-lg transition-colors duration-200 border border-white/10"
                >
                  <Image
                    src="/icons/devpost.svg"
                    alt="Devpost"
                    width={18}
                    height={18}
                    className="flex-shrink-0"
                  />
                  <span className="text-white text-sm sm:text-base truncate">Devpost</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary Section */}
        <section className="mt-16">
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-transparent p-3 rounded-lg">
                  <span className="text-2xl">💻</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">About Me</h2>
                  <p className="text-gray-400">Software engineer & Computer Engineering student</p>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  I'm a software engineer based in <span className="text-pink-400 font-medium">Toronto, Canada</span>, originally from 
                  <span className="text-pink-400 font-medium"> Dhaka, Bangladesh</span>. Currently pursuing my degree in 
                  <span className="text-pink-400 font-medium"> Computer Engineering at York University</span>.
                </p>
                
                <p className="text-base">
                  My journey combines <span className="text-pink-400 font-medium">hardware and software expertise</span>. While my Computer 
                  Engineering background satisfies my curiosity for hardware systems, my internship at 
                  <span className="text-white font-medium"> Radar in 2022</span> helped me discover my true calling in software engineering.
                </p>

                <p className="text-base">
                  I have experience as a <span className="text-pink-400 font-medium">Software Engineer at Dorayaki Studios</span>, 
                  <span className="text-pink-400 font-medium"> Prompt Engineer at Outlier AI</span>, and 
                  <span className="text-pink-400 font-medium"> Software Engineer Intern at Radar</span>. This unique perspective allows me to 
                  approach problems with both hardware and software solutions in mind.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-pink-300 text-sm font-medium">JavaScript</span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-pink-300 text-sm font-medium">TypeScript</span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-pink-300 text-sm font-medium">Python</span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-pink-300 text-sm font-medium">React</span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-pink-300 text-sm font-medium">Next.js</span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-pink-300 text-sm font-medium">AWS</span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-pink-300 text-sm font-medium">Docker</span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-pink-300 text-sm font-medium">PostgreSQL</span>
              </div>
            </div>
          </div>
        </section>

        {/* What's New Section */}
        <section className="mt-16">
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-2">What's new?</h2>
            <p className="text-gray-400">My latest updates and activities.</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="p-4 rounded-lg flex-shrink-0">
                <span className="text-3xl">😔</span>
              </div>
              <p className="text-xl text-gray-300 leading-normal">
                Reading Week was too short. I need more time!!!!
              </p>
            </div>
          </div>
        </section>



        {/* Recent Blog Post Section */}
        <section className="mt-16">
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Recent Update</h2>
                <p className="text-gray-400">Latest article from my blog.</p>
              </div>
              <Link 
                href="/blog"
                className="text-pink-400 hover:text-pink-300 flex items-center gap-2 self-start sm:self-auto"
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
                className="block rounded-lg p-0 hover:text-white text-gray-300 transition-colors duration-200"
              >
                <div className="flex flex-row gap-4 items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-white mb-2">{recentPost.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{recentPost.description}</p>
                    <time className="text-sm text-pink-400">{recentPost.date}</time>
                  </div>
                  {recentPost.imageUrl && (
                    <div className="flex-shrink-0 w-20 h-16 sm:w-32 sm:h-20">
                      <Image
                        src={recentPost.imageUrl}
                        alt={recentPost.title}
                        width={128}
                        height={80}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <div className="rounded-lg p-0 text-center">
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
        </section>
      </div>
    </main>
  )
}
