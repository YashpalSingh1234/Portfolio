'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail, Github, Linkedin, Sparkles, Terminal } from 'lucide-react'
import { PERSONAL } from '@/lib/data'

const STATS = [
  { value: '2+', label: 'Years R&D' },
  { value: '4', label: 'Production AI Systems' },
  { value: '96.2%', label: 'Best Model Accuracy' },
  { value: '50K+', label: 'Daily Predictions' },
]

const TECH_CHIPS = [
  'Python', 'PyTorch', 'LangChain', 'FastAPI',
  'RAG', 'LLM', 'MLOps', 'Docker',
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Background mesh gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(168,85,247,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Grid bg */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-brand-500/5 blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl animate-float pointer-events-none"
        style={{ animationDelay: '-3s' }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-secondary)]/80 px-4 py-1.5 text-xs font-mono text-[var(--text-secondary)] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {PERSONAL.availability} · {PERSONAL.location}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
            <span className="block">{PERSONAL.name}</span>
            <span className="mt-2 block gradient-text">{PERSONAL.title}</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-mono text-base text-[var(--brand)] tracking-wide"
        >
          <Terminal className="inline h-4 w-4 mr-2" />
          {PERSONAL.tagline}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed"
        >
          {PERSONAL.shortBio}
        </motion.p>

        {/* Tech chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {TECH_CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-xs font-mono text-[var(--text-secondary)]"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            View Projects
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={PERSONAL.resumeUrl}
            download
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm font-semibold hover:bg-[var(--bg-tertiary)] hover:border-[var(--brand)] transition-all active:scale-95"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all active:scale-95"
          >
            <Mail className="h-4 w-4" />
            Contact Me
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex justify-center gap-4"
        >
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--brand)] hover:border-[var(--border-strong)] transition-all"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--brand)] hover:border-[var(--border-strong)] transition-all"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--border)]"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 bg-[var(--bg-secondary)] px-4 py-6"
            >
              <span className="text-2xl font-bold text-[var(--text-primary)] font-mono">
                {stat.value}
              </span>
              <span className="text-xs text-[var(--text-tertiary)] text-center">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-[var(--text-tertiary)]">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-5 w-px bg-gradient-to-b from-[var(--brand)] to-transparent"
        />
      </motion.div>
    </section>
  )
}
