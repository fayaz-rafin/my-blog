'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import OnlineViewers from './online-viewers'
import { useLanguage } from '@/components/language-provider'

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

const englishTypingPhrases = [
  'Hello, World!',
  'Bonjour, le monde!',
  'Hola, Mundo!',
  'こんにちは、世界！',
  '안녕하세요, 세계!',
  'Привет, мир!',
  'مرحبا بالعالم!',
  'হ্যালো, বিশ্ব!',
  'नमस्ते, दुनिया!',
  'வணக்கம், உலகம்!',
  '你好，世界！',
  'Olá, Mundo!',
  'Ciao, Mondo!',
  'שלום, עולם!',
]

const frenchTypingPhrases = [
  'Bonjour, le monde !',
  'Salut tout le monde !',
  'Bienvenue !',
  'Enchanté !',
  'Bienvenue sur mon site !',
]

const homeCopy = {
  en: {
    heroIntro:
      'My name is Fayaz Rafin. Computer Engineering Student at York University with expertise in full-stack development.',
    heroWelcome:
      'Welcome to my digital garden. Here, I share my thoughts, projects, and experiences in software development and beyond.',
    aboutHeading: 'About Me',
    aboutSubtitle: 'Software engineer & Computer Engineering student',
    aboutParagraphs: [
      `I'm a software engineer based in <span class="text-purple-400 font-medium">Toronto, Canada</span>, originally from <span class="text-purple-400 font-medium">Dhaka, Bangladesh</span>. Currently pursuing my degree in <span class="text-purple-400 font-medium">Computer Engineering at York University</span>.`,
      `My journey combines <span class="text-purple-400 font-medium">hardware and software expertise</span>. While my Computer Engineering background satisfies my curiosity for hardware systems, my internship at <span class="text-white font-medium">Radar in 2022</span> helped me discover my true calling in software engineering.`,
      `I have experience as a <span class="text-purple-400 font-medium">Software Engineer at Dorayaki Studios</span>, <span class="text-purple-400 font-medium">Prompt Engineer at Outlier AI</span>, and <span class="text-purple-400 font-medium">Software Engineer Intern at Radar</span>. This unique perspective allows me to approach problems with both hardware and software solutions in mind.`,
    ],
    whatsNewHeading: "What's new?",
    whatsNewDescription: 'My latest updates and activities.',
    whatsNewBody: 'Reading Week was too short. I need more time!!!!',
    recentHeading: 'Recent Update',
    recentDescription: 'Latest article from my blog.',
    viewAllPosts: 'View all posts',
    noPostTitle: 'The most recent blog post will appear here.',
    noPostSubtitle: 'Stay tuned for upcoming articles!',
  },
  fr: {
    heroIntro:
      "Je m'appelle Fayaz Rafin. Étudiant en génie informatique à l'Université York avec une expertise en développement full-stack.",
    heroWelcome:
      'Bienvenue dans mon jardin numérique. Ici, je partage mes réflexions, projets et expériences en développement logiciel et au-delà.',
    aboutHeading: 'À propos de moi',
    aboutSubtitle: "Ingénieur logiciel et étudiant en génie informatique",
    aboutParagraphs: [
      `Je suis un ingénieur logiciel basé à <span class="text-purple-400 font-medium">Toronto, Canada</span>, originaire de <span class="text-purple-400 font-medium">Dhaka, Bangladesh</span>. Je poursuis actuellement mon diplôme en <span class="text-purple-400 font-medium">génie informatique à l'Université York</span>.`,
      `Mon parcours combine <span class="text-purple-400 font-medium">expertise matérielle et logicielle</span>. Si ma formation en génie informatique nourrit ma curiosité pour les systèmes matériels, mon stage chez <span class="text-white font-medium">Radar en 2022</span> m'a permis de découvrir ma véritable vocation : le génie logiciel.`,
      `J'ai travaillé comme <span class="text-purple-400 font-medium">ingénieur logiciel chez Dorayaki Studios</span>, <span class="text-purple-400 font-medium">prompt engineer chez Outlier AI</span> et <span class="text-purple-400 font-medium">stagiaire en génie logiciel chez Radar</span>. Cette perspective unique me permet d'aborder les problèmes sous l'angle du matériel et du logiciel.`,
    ],
    whatsNewHeading: 'Quoi de neuf ?',
    whatsNewDescription: 'Mes dernières mises à jour et activités.',
    whatsNewBody: 'La semaine de lecture était trop courte. Il me faut plus de temps !!!!',
    recentHeading: 'Mise à jour récente',
    recentDescription: 'Dernier article publié sur mon blog.',
    viewAllPosts: 'Voir tous les articles',
    noPostTitle: 'Le billet de blog le plus récent apparaîtra ici.',
    noPostSubtitle: 'Restez à l’écoute des prochains articles !',
  },
} as const

export default function HomeClient({ recentPost }: HomeClientProps) {
  const { language } = useLanguage()

  const phrases = useMemo(
    () => (language === 'fr' ? frenchTypingPhrases : englishTypingPhrases),
    [language],
  )

  const content = homeCopy[language]

  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    setDisplayText('')
    setPhraseIndex(0)
    setIsDeleting(false)
  }, [phrases])

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex] ?? ''
      setDisplayText(
        isDeleting
          ? currentPhrase.substring(0, displayText.length - 1)
          : currentPhrase.substring(0, displayText.length + 1),
      )

      setTypingSpeed(isDeleting ? 75 : 150)

      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
      }
    }

    const typingTimer = setTimeout(handleTyping, typingSpeed)

    return () => clearTimeout(typingTimer)
  }, [displayText, isDeleting, phraseIndex, typingSpeed, phrases])


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
                {content.heroIntro}
              </p>
              <p className="text-base sm:text-xl text-white/70">
                {content.heroWelcome}
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
                  <h2 className="text-2xl font-bold text-white">{content.aboutHeading}</h2>
                  <p className="text-gray-400">{content.aboutSubtitle}</p>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                {content.aboutParagraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={index === 0 ? 'text-lg' : 'text-base'}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
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
            <h2 className="text-2xl font-bold text-white mb-2">{content.whatsNewHeading}</h2>
            <p className="text-gray-400">{content.whatsNewDescription}</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="p-4 rounded-lg flex-shrink-0">
                <span className="text-3xl">😔</span>
              </div>
              <p className="text-xl text-gray-300 leading-normal">
                {content.whatsNewBody}
              </p>
            </div>
          </div>
        </section>



        {/* Recent Blog Post Section */}
        <section className="mt-16">
          <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{content.recentHeading}</h2>
                <p className="text-gray-400">{content.recentDescription}</p>
              </div>
              <Link 
                href="/blog"
                className="text-purple-400 hover:text-purple-300 flex items-center gap-2 self-start sm:self-auto"
              >
                {content.viewAllPosts}
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
                    <time className="text-sm text-purple-400">{recentPost.date}</time>
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
                  {content.noPostTitle}
                </p>
                <p className="text-gray-400 mt-2">
                  {content.noPostSubtitle}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
