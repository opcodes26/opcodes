/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded font-sans text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mint disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-accent-mint text-[#08090A] shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:bg-[#12d394] hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]',
        secondary: 'bg-[#121417] text-[#F3F4F6] border border-border-subtle hover:bg-bg-surface-hover hover:border-border-interactive',
        outline: 'border border-border-subtle bg-transparent text-[#F3F4F6] font-mono hover:border-border-interactive hover:bg-bg-surface-hover/50',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover/50',
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
