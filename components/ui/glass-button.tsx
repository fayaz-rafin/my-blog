'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base glass look
          'relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-white/95',
          'border border-white/10 bg-white/10 backdrop-blur-xl',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_10px_30px_-10px_rgba(0,0,0,0.6)]',
          'transition-[background,box-shadow,transform] duration-200 will-change-transform',
          // Subtle hover/active
          'hover:bg-white/12 active:scale-[0.99]',
          // Readability
          'whitespace-nowrap',
          className
        )}
        {...props}
      >
        {/* liquid highlight - top left */}
        <span className="pointer-events-none absolute -top-1 -left-1 h-10 w-16 rounded-full bg-white/20 blur-2xl" />
        {/* rim light */}
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/15" />
        {/* inner sheen */}
        <span className="pointer-events-none absolute inset-x-1 top-0 h-1/2 rounded-t-[0.75rem] bg-gradient-to-b from-white/15 to-transparent" />
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

GlassButton.displayName = 'GlassButton'


