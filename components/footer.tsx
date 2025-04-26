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
            className="fill-[#313244]"
          />
        </svg>
      </div>

      {/* Footer content */}
      <div className="relative bg-[#313244] py-8 sm:py-12 text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            <FooterLink href="#top">↑ Back to top</FooterLink>
            <FooterLink href="mailto:fayaz.rafin@gmail.com">
              <img src="/icons/email.svg" alt="Email" className="w-6 h-6" />
            </FooterLink>
            <FooterLink href="https://github.com/fayaz-rafin">
              <img src="/icons/github.svg" alt="GitHub" className="w-6 h-6" />
            </FooterLink>
            <FooterLink href="https://linkedin.com/in/fayazrafin">
              <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
            </FooterLink>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm sm:text-base text-gray-400">
            © 2025 Fayaz Rafin. All rights reserved.
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
        px-4 py-2 rounded-full text-sm sm:text-base
        bg-[#252837] hover:bg-[#1e1e2e] text-gray-300 hover:text-[#cba6f7]
        transition-all duration-200"
    >
      {typeof children === 'string' ? children : children}
    </Link>
  )
}
