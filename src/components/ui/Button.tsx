/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-sans text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-[0_0_18px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:brightness-110 border border-cyan-400/30',
        secondary: 'bg-[#121418] text-[#FFFFFF] border border-white/[0.08] hover:bg-[#181B22] hover:border-blue-500/40 shadow-sm',
        outline: 'border border-white/10 bg-transparent text-[#FFFFFF] font-mono hover:border-cyan-400/40 hover:bg-white/[0.04]',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
