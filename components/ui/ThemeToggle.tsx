'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={cn(
          'h-9 w-9 rounded-lg bg-[var(--bg-tertiary)] animate-pulse',
          className
        )}
      />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        'relative h-9 w-9 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]',
        'flex items-center justify-center',
        'text-[var(--text-secondary)] hover:text-[var(--brand)] hover:border-[var(--border-strong)]',
        'transition-all duration-200 hover:bg-[var(--bg-tertiary)]',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}
