import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'brand' | 'outline' | 'mono'
  className?: string
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium font-mono',
          variant === 'default' && 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border)]',
          variant === 'brand' && 'bg-brand-500/10 text-brand-400 border border-brand-500/20',
          variant === 'outline' && 'border border-[var(--border-strong)] text-[var(--text-secondary)]',
          variant === 'mono' && 'bg-[var(--bg-secondary)] text-[var(--brand)] border border-[var(--border)] font-mono text-xs',
          className
        )}
      >
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'
