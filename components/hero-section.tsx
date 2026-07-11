'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

import { useLanguage } from '@/components/language-provider'

const heroCopy = {
  en: {
    index: '00 / INTRO',
    role: 'Software engineer at KPMG Canada. Computer Engineering at York University.',
    viewProjects: 'View Projects',
    readBlog: 'Read Blog',
  },
  fr: {
    index: '00 / INTRO',
    role: 'Ingénieur logiciel chez KPMG Canada. Génie informatique à l’Université York.',
    viewProjects: 'Voir les projets',
    readBlog: 'Lire le blog',
  },
} as const

const socialLinks = [
  {
    href: 'https://github.com/fayaz-rafin',
    label: 'GitHub',
    icon: '/icons/github.svg',
  },
  {
    href: 'https://linkedin.com/in/fayazrafin',
    label: 'LinkedIn',
    icon: '/icons/linkedin.svg',
  },
  {
    href: 'https://devpost.com/fayaz-rafin',
    label: 'Devpost',
    icon: '/icons/devpost.svg',
  },
] as const

const ease = [0.16, 1, 0.3, 1] as const

export default function HeroSection() {
  const { language } = useLanguage()
  const content = heroCopy[language]

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex items-center py-6 sm:py-10 lg:min-h-[calc(100vh-8rem)] lg:py-14"
    >
      <div className="grid w-full gap-7 sm:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12 xl:gap-16">
        <motion.div
          className="relative mx-auto h-[min(48svh,360px)] w-full max-w-md overflow-hidden border border-white/15 bg-black sm:h-[min(52svh,440px)] sm:max-w-lg lg:mx-0 lg:h-auto lg:max-w-none lg:min-h-[min(72vh,640px)] lg:aspect-auto"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease }}
        >
          <Image
            src="/avatar-fayaz.jpg"
            alt="Fayaz Rafin"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-[center_18%]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/30"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1 bg-[var(--accent-raw)]"
          />
        </motion.div>

        <div className="flex flex-col justify-end lg:min-h-[min(72vh,640px)] lg:pb-4">
          <motion.p
            className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent-raw)] sm:text-[11px] sm:tracking-[0.22em]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            {content.index}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="mt-3 font-mono text-[clamp(2.25rem,12vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#f2f0eb] sm:mt-4 sm:text-[clamp(2.5rem,5.5vw+0.5rem,4.25rem)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease }}
          >
            Fayaz
            <br />
            Rafin
          </motion.h1>

          <motion.p
            className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[#9a9690] sm:mt-6 sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease }}
          >
            {content.role}
          </motion.p>

          <motion.div
            className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
          >
            <Link href="/projects" className="btn-raw-primary group w-full sm:w-auto">
              {content.viewProjects}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link href="/blog" className="btn-raw-secondary w-full sm:w-auto">
              {content.readBlog}
            </Link>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-1 border-t border-white/10 pt-5 sm:mt-10 sm:pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.5, ease }}
          >
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex h-11 min-w-11 flex-1 items-center justify-center gap-2 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9a9690] transition-colors duration-300 hover:text-[var(--accent-raw)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-raw)] sm:flex-none"
              >
                <Image
                  src={link.icon}
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                  className="brightness-0 invert opacity-80"
                />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
