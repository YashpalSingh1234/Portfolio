'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Cpu } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [photoOpen, setPhotoOpen] = useState(false)
  const { scrollY } = useScroll()

  const openPhoto = useCallback(() => setPhotoOpen(true), [])
  const closePhoto = useCallback(() => setPhotoOpen(false), [])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(latest > prev && latest > 100)
    setScrolled(latest > 20)
  })

  // Single source of truth for the body scroll lock — covers both the
  // mobile nav overlay and the photo lightbox so they never fight over
  // `overflow`.
  useEffect(() => {
    document.body.style.overflow = isOpen || photoOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, photoOpen])

  useEffect(() => {
    if (!photoOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePhoto()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [photoOpen, closePhoto])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo — profile photo (opens preview) + existing mark, unchanged otherwise */}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={openPhoto}
              aria-label="View profile photo"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative h-10 w-10 shrink-0 rounded-full overflow-hidden border border-[var(--border-strong)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Image
                src="/images/profile/yash-kushwah.jpg"
                alt="Yash Kushwah"
                fill
                sizes="40px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </motion.button>

            <a
              href="#"
              className="flex items-center gap-2 font-mono text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--brand)] transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 border border-brand-500/20">
                <Cpu className="h-4 w-4 text-[var(--brand)]" />
              </div>
              <span>yashpal.singh</span>
            </a>
          </div>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-secondary)] transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/yashpal.resume.pdf"
              download
              className="hidden sm:inline-flex items-center gap-2 h-9 px-4 text-xs font-medium rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.25)]"
            >
              Resume
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Profile photo lightbox */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {photoOpen && (
              <motion.div
                key="photo-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                style={{
                  background: 'rgba(0,0,0,0.78)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                }}
                onClick={closePhoto}
                role="dialog"
                aria-modal="true"
                aria-label="Profile photo preview"
              >
                <button
                  onClick={closePhoto}
                  aria-label="Close"
                  className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <X className="h-4 w-4" />
                </button>
                <motion.div
                  key="photo-image"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative rounded-full overflow-hidden border-2 border-white/20"
                  style={{
                    width: 'clamp(240px, 60vmin, 480px)',
                    height: 'clamp(240px, 60vmin, 480px)',
                    boxShadow: '0 0 0 6px rgba(99,102,241,0.2), 0 24px 64px rgba(0,0,0,0.55)',
                  }}
                >
                  <Image
                    src="/images/profile/yash-kushwah.jpg"
                    alt="Yash Kushwah"
                    fill
                    sizes="480px"
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Mobile menu overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col h-full pt-24 px-6 pb-8">
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 text-lg font-medium text-[var(--text-primary)] rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <a
              href="/yashpal.resume.pdf"
              download
              className="flex items-center justify-center h-12 rounded-xl bg-brand-500 text-white font-medium text-base hover:bg-brand-600 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </motion.div>
      )}
    </>
  )
}
