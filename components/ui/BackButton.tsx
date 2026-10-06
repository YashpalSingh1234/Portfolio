'use client'

import { ArrowLeft } from 'lucide-react'

/**
 * Isolated client component so the rest of not-found.tsx (and any other
 * page that uses it) can stay a server component.
 */
export function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm font-semibold hover:bg-[var(--bg-tertiary)] hover:border-[var(--brand)] transition-all active:scale-95"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Go Back
    </button>
  )
}
