'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/now', label: 'Now' },
  ]

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="relative flex items-center justify-between h-12 sm:h-14 px-2 sm:px-6 rounded-full border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
          {/* Subtle inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
          {/* Left: Logo and Name */}
          <div className="relative z-10 flex items-center gap-2 min-w-0">
            <Image src="/logo.png" alt="Fox Logo" width={20} height={20} className="select-none flex-shrink-0" />
            <Link href="/" className="truncate text-white font-semibold text-sm xs:text-base sm:text-lg max-w-[50vw]">
              Fayaz Rafin
            </Link>
          </div>

          {/* Right: Navigation Items */}
          <nav className="relative z-10 hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative inline-flex items-center"
              >
                <span className={`text-white/80 hover:text-white transition-colors duration-200 ${pathname === item.href ? 'text-white' : ''}`}>
                  {item.label}
                </span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-2 h-[2px] w-full bg-white/70"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white ml-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2 rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl pointer-events-auto"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-base rounded-lg transition-colors duration-200
                    ${pathname === item.href 
                      ? 'bg-white/15 text-white' 
                      : 'text-white/80 hover:bg-white/15 hover:text-white'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}