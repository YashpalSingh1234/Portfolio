import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
  href?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className, href, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
      'transition-all duration-200 cursor-pointer select-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',

      size === 'sm' && 'h-8 px-3 text-xs',
      size === 'md' && 'h-10 px-4 text-sm',
      size === 'lg' && 'h-12 px-6 text-base',

      variant === 'primary' && [
        'bg-brand-500 text-white',
        'hover:bg-brand-600 active:bg-brand-700',
        'shadow-[0_0_20px_rgba(99,102,241,0.3)]',
        'hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]',
      ],
      variant === 'secondary' && [
        'bg-[var(--bg-secondary)] text-[var(--text-primary)]',
        'border border-[var(--border)]',
        'hover:border-[var(--border-strong)] hover:bg-[var(--bg-tertiary)]',
      ],
      variant === 'ghost' && [
        'text-[var(--text-secondary)]',
        'hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]',
      ],
      variant === 'outline' && [
        'border border-[var(--border-strong)] text-[var(--text-primary)]',
        'hover:bg-[var(--bg-secondary)] hover:border-[var(--brand)]',
      ],
      className
    )

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
