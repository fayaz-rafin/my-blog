'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement>

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Match hero buttons: subtle blur, ~10% translucent fill, soft border
          'backdrop-blur-md bg-white/10 supports-[backdrop-filter]:bg-white/10 border border-white/10 shadow-lg rounded-2xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassPanel.displayName = 'GlassPanel'

export { GlassPanel }


