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
    <header className="fixed top-0 w-full z-50 bg-[#1e1e2e]/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-16 flex items-center">
          {/* Left: Logo and Name */}
          <div className="flex-1 flex items-center gap-3">
            <Image src="/logo.png" alt="Fox Logo" width={24} height={24} />
            <Link href="/" className="text-white font-semibold text-lg">
              Fayaz Rafin
            </Link>
          </div>

          {/* Right: Navigation Items */}
          <nav className="hidden md:flex items-center gap-6 mr-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group px-2"
              >
                <span className={`text-gray-300 group-hover:text-[#cba6f7] transition-colors duration-200
                  ${pathname === item.href ? 'text-[#cba6f7]' : ''}`}
                >
                  {item.label}
                </span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 top-full h-[2px] w-full bg-[#cba6f7]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
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
            className="md:hidden bg-[#1e1e2e] border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-base rounded-lg transition-colors duration-200
                    ${pathname === item.href 
                      ? 'bg-[#cba6f7]/10 text-[#cba6f7]' 
                      : 'text-gray-300 hover:bg-[#cba6f7]/10 hover:text-[#cba6f7]'
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