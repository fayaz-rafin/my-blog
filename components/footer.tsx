// components/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[60px] w-full sm:h-[100px]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <path
            d="M0,96 C200,120 400,40 800,40 C1000,40 1200,80 1200,80 V120 H0 V96Z"
            className="fill-[#ec4899]"
          />
        </svg>
      </div>

      {/* Footer content */}
      <div className="relative bg-[#ec4899] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation links */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            <FooterLink href="#top">
              <span className="hidden sm:inline">↑ Back to top</span>
              <span className="sm:hidden">↑</span>
            </FooterLink>
            <FooterLink href="/rss.xml">
              <span className="hidden sm:inline">📰 RSS Feed</span>
              <span className="sm:hidden">📰</span>
            </FooterLink>
            <FooterLink href="mailto:your@email.com">
              <span className="hidden sm:inline">✉️ Say "hi"!</span>
              <span className="sm:hidden">✉️</span>
            </FooterLink>
            <FooterLink href="https://mastodon.social/@yourusername">
              <span className="hidden sm:inline">🐘 Mastodon</span>
              <span className="sm:hidden">🐘</span>
            </FooterLink>
            <FooterLink href="https://github.com/yourusername">
              <span className="hidden sm:inline">🐙 Github</span>
              <span className="sm:hidden">🐙</span>
            </FooterLink>
            <FooterLink href="https://linkedin.com/in/yourusername">
              <span className="hidden sm:inline">💼 LinkedIn</span>
              <span className="sm:hidden">💼</span>
            </FooterLink>
          </div>

          {/* Copyright */}
          <div className="text-center text-pink-100/80 text-sm sm:text-base">
            © 2024 Your Name. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center
        px-3 py-2 sm:px-4 sm:py-2 rounded-full 
        bg-pink-400/30 text-pink-100 hover:bg-pink-400/40 
        transition-colors duration-200 text-sm sm:text-base
        min-w-[40px] sm:min-w-fit"
    >
      {children}
    </Link>
  )
}