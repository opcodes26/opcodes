import React from 'react'
import { cn } from '../../lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean
  glowColor?: 'mint' | 'cyan' | 'default'
  hoverEffect?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, glowColor = 'default', hoverEffect = true, children, ...props }, ref) => {
    const glowShadows = {
      default: 'hover:shadow-[0_0_25px_rgba(255,255,255,0.02)]',
      mint: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]',
      cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-xl border border-white/[0.06] bg-[#121417]/75 backdrop-blur-[12px] overflow-clip transition-all duration-300',
          hoverEffect && 'hover:bg-[#1A1D22]/80 hover:border-white/[0.15]',
          glow && glowShadows[glowColor],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
