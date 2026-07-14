import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, Cpu } from 'lucide-react'
import { BackButton } from '@/components/ui/BackButton'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center"
      aria-labelledby="not-found-heading"
    >
      {/* Background — matches Hero's mesh gradient + grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(168,85,247,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-brand-500/5 blur-3xl animate-float pointer-events-none" />

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-6">
        <Cpu className="h-8 w-8 text-[var(--brand)]" aria-hidden="true" />
      </div>

      <p className="font-mono text-sm text-[var(--brand)] tracking-wide mb-2">error · 404</p>

      <h1
        id="not-found-heading"
        className="text-5xl font-bold tracking-tight text-[var(--text-primary)] sm:text-7xl gradient-text"
      >
        404
      </h1>

      <p className="mt-4 max-w-md text-base sm:text-lg text-[var(--text-secondary)]">
        This route couldn&apos;t be resolved. The page you&apos;re looking for doesn&apos;t exist
        or may have moved.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-brand-500 text-white text-sm font-bold hover:bg-brand-600 transition-all shadow-[0_0_32px_rgba(99,102,241,0.5)] hover:shadow-[0_0_48px_rgba(99,102,241,0.7)] hover:-translate-y-0.5 active:scale-95"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        <BackButton />
      </div>
    </section>
  )
}
