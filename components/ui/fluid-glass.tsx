'use client'

import { cn } from '@/lib/utils'
import { useMemo, type ReactNode } from 'react'

type NavItem = {
  label: string
  href: string
}

interface FluidGlassProps {
  navItems: NavItem[]
  activeHref?: string
  onNavigate?: (href: string) => void
  className?: string
  brand?: {
    label: string
    href?: string
    icon?: ReactNode
  }
  rightSlot?: ReactNode
}

const EMPTY_PLACEHOLDER = <span aria-hidden="true" className="block w-10" />

const normalizeNavItems = (navItems: NavItem[]) =>
  navItems.map((item) => ({
    ...item,
    href: item.href || '#',
  }))

export default function FluidGlass({
  navItems,
  activeHref,
  onNavigate,
  className,
  brand,
  rightSlot,
}: FluidGlassProps) {
  const items = useMemo(() => normalizeNavItems(navItems), [navItems])

  const handleNavigate = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
      return
    }

    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }

    window.location.href = href
  }

  return (
    <div
      className={cn(
        'relative flex h-14 w-full items-center overflow-hidden rounded-full border border-white/12 text-white',
        'bg-[linear-gradient(120deg,rgba(8,10,26,0.82)_0%,rgba(20,22,50,0.75)_45%,rgba(40,44,85,0.7)_100%)]',
        'shadow-[0_22px_45px_-20px_rgba(115,87,255,0.6)] backdrop-blur-[22px]',
        'before:absolute before:inset-[-65%] before:bg-[radial-gradient(circle_at_20%_20%,rgba(186,148,255,0.55),transparent_60%)] before:blur-[110px] before:opacity-75 before:animate-glassDrift',
        'after:absolute after:inset-[-55%] after:bg-[radial-gradient(circle_at_78%_32%,rgba(56,189,248,0.42),transparent_60%)] after:blur-[130px] after:opacity-70 after:animate-glassDriftReverse',
        className,
      )}
    >
      <div className="absolute inset-x-6 top-2 h-[1px] rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80" />
      <div className="absolute inset-x-10 bottom-2 h-[1px] rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60" />

      <div className="relative z-10 flex w-full items-center gap-4 px-4">
        <div className="flex flex-shrink-0 items-center">
          {brand ? (
            <button
              type="button"
              onClick={() => handleNavigate(brand.href ?? '/')}
              className={cn(
                'group flex items-center gap-2 px-2 py-2 text-sm font-semibold text-white/85 transition-colors duration-200',
                'hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-200/70',
              )}
              aria-label={brand.label}
            >
              {brand.icon && (
                <span className="text-lg drop-shadow-[0_0_6px_rgba(255,190,125,0.75)] transition-transform duration-300 group-hover:scale-105">
                  {brand.icon}
                </span>
              )}
              <span>{brand.label}</span>
            </button>
          ) : (
            EMPTY_PLACEHOLDER
          )}
        </div>

        <div className="flex flex-1 items-center justify-center gap-6 text-sm font-medium">
          {items.map((item) => {
            const isActive = Boolean(activeHref && activeHref === item.href)
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.href)}
                className={cn(
                  'relative px-2 py-2 text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-200/70',
                  isActive && 'text-white',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <span className="pointer-events-none absolute left-1/2 top-[calc(100%-6px)] h-[2px] w-14 -translate-x-1/2 rounded-full bg-white/85 shadow-[0_0_12px_rgba(255,255,255,0.75)]" />
                )}
              </button>
            )
          })}
        </div>

        <div className="flex flex-shrink-0 items-center">
          {rightSlot ?? EMPTY_PLACEHOLDER}
        </div>
      </div>
    </div>
  )
}

