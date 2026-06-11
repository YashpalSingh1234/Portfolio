'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, ChevronRight, Layers, Cpu, Shield, CreditCard } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'

/* ─────────────────────────────────────────────
   Verified data — extracted directly from
   https://cvking.in/ and its sub-pages.
   No metrics, user counts, or technologies
   have been invented or assumed.
───────────────────────────────────────────── */

const CVKING = {
  id: 'cvking',
  title: 'CVKing',
  tagline: 'AI Resume Builder, Resume Analyzer & Free CV Maker',
  description:
    'A full-stack SaaS platform that helps students and professionals build ATS-friendly resumes using AI. Covers the complete job-application workflow — from a blank form to a downloadable, recruiter-ready PDF.',
  problem:
    'Most job seekers submit resumes that fail automated Applicant Tracking System (ATS) filters before a human ever reads them. Existing tools are either too expensive, too generic, or lack actionable AI feedback.',
  solution:
    'CVKing combines an AI Resume Optimizer, a real-time ATS score checker, and a structured CV builder into a single freemium SaaS product priced for the Indian job market.',
  // Top 3 shown on the card — chosen for maximum recruiter signal
  cardFeatures: [
    {
      icon: '🤖',
      label: 'AI Resume Optimizer',
      detail: 'Rewrites bullets with stronger action verbs and impact framing.',
    },
    {
      icon: '✅',
      label: 'ATS Score & Formatter',
      detail: 'Automatically formats and scores resumes to pass ATS filters.',
    },
    {
      icon: '👁️',
      label: 'Live Preview Editor',
      detail: 'Resume updates render in real-time as users type — no reloads.',
    },
  ] as const,
  // Full feature set shown in modal
  features: [
    {
      icon: '🤖',
      label: 'AI Resume Optimizer',
      detail: 'Rewrites bullets with stronger action verbs and impact framing using AI-powered suggestions.',
    },
    {
      icon: '📊',
      label: 'Resume Analyzer',
      detail: 'Instantly analyses resume quality and surfaces actionable improvements.',
    },
    {
      icon: '✅',
      label: 'ATS Score & Formatter',
      detail: 'Automatically formats resumes to pass Applicant Tracking System filters with 100% compatibility.',
    },
    {
      icon: '👁️',
      label: 'Live Preview Editor',
      detail: 'Resume updates render in real-time as users type — no page reloads.',
    },
    {
      icon: '📄',
      label: 'PDF Export',
      detail: 'One-click export to PDF across all plans; export limits scale with tier.',
    },
    {
      icon: '🗺️',
      label: 'Career Roadmap Generator',
      detail: 'AI-generated career progression plans and skill gap analysis (paid tiers).',
    },
    {
      icon: '✉️',
      label: 'AI Cover Letter Generator',
      detail: 'Generates tailored cover letters for each job application (paid tiers).',
    },
    {
      icon: '🎯',
      label: 'Interview Prep Generator',
      detail: 'Produces role-specific interview question sets to help candidates prepare (paid tiers).',
    },
  ] as const,
  // All entries verified from live site source and privacy policy.
  techStack: [
    { label: 'Next.js',        note: 'verified — SSR routing, metadata API' },
    { label: 'JWT Auth',       note: 'verified — privacy policy §2' },
    { label: 'bcrypt',         note: 'verified — privacy policy §8' },
    { label: 'Razorpay',       note: 'verified — pricing page + privacy policy §5' },
    { label: 'Google OAuth',   note: 'verified — login page' },
    { label: 'HTTPS / TLS',    note: 'verified — privacy policy §8' },
    { label: 'AI (LLM)',       note: 'verified — features present; provider not disclosed' },
    { label: 'PDF Export',     note: 'verified — pricing table' },
  ] as const,
  architecture: [
    { icon: <Cpu className="h-4 w-4" />,        label: 'AI Layer',        detail: 'Resume optimiser, cover letter + roadmap generators' },
    { icon: <Layers className="h-4 w-4" />,     label: 'Builder',         detail: 'Live-preview editor + ATS formatter + PDF export' },
    { icon: <Shield className="h-4 w-4" />,     label: 'Auth & Sessions', detail: 'JWT + bcrypt + Google OAuth + CSRF protection' },
    { icon: <CreditCard className="h-4 w-4" />, label: 'Payments',        detail: 'Razorpay — 5 tiers from free to ₹999/yr' },
  ],
  pricing: {
    free: 'Free — 2 templates, basic ATS check, 3 PDF exports/mo',
    paid: 'Paid from ₹49 (one-time templates) to ₹999/yr (AI Ultimate)',
  },
  demo: 'https://cvking.in/',
  github: null, // No public GitHub repo linked on the live site.
  year: '2026',
}

/* ── Detail Modal ── */
function CVKingModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-primary)] shadow-2xl"
      >
        {/* Sticky header */}
        <div className="sticky top-0 flex items-start justify-between gap-4 p-6 border-b border-[var(--border)] bg-[var(--bg-primary)] rounded-t-2xl z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">👑</span>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{CVKING.title}</h3>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-400">
                Live
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{CVKING.tagline}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Problem / Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Problem</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{CVKING.problem}</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Solution</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{CVKING.solution}</p>
            </div>
          </div>

          {/* All Features */}
          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">All Features</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {CVKING.features.map((f) => (
                <div key={f.label} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
                  <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{f.label}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Architecture</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {CVKING.architecture.map((a) => (
                <div key={a.label} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] text-[var(--brand)]">
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{a.label}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {CVKING.techStack.map((t) => (
                <div
                  key={t.label}
                  title={`Source: ${t.note}`}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5"
                >
                  <span className="text-xs font-mono font-semibold text-[var(--brand)]">{t.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-[var(--text-tertiary)]">
              All items verified from live site and privacy policy. Hover for source.
            </p>
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Pricing Model</p>
            <p className="text-sm text-[var(--text-secondary)]">{CVKING.pricing.free}</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{CVKING.pricing.paid}</p>
          </div>

          {/* Modal CTA */}
          <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
            <a
              href={CVKING.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.25)]"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Featured Card ── */
function CVKingCard() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--brand)]/40 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(99,102,241,0.2)] hover:-translate-y-1.5"
      >
        {/* ── Hero band — tall gradient header ── */}
        <div className="relative h-52 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/10 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />

          {/* Feature pills — top-left */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
            {['ATS Optimized', 'AI-Powered', 'Freemium SaaS'].map((pill) => (
              <span
                key={pill}
                className="inline-block rounded-md border border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-mono font-semibold text-[var(--brand)]"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Central icon */}
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-primary)]/60 backdrop-blur-sm shadow-xl group-hover:scale-105 group-hover:shadow-2xl transition-transform duration-300">
            <span className="text-5xl select-none">👑</span>
          </div>

          {/* Live + year — top-right */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-400">
              Live
            </span>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-primary)]/60 backdrop-blur-sm rounded-md border border-[var(--border)] px-2 py-0.5">
              {CVKING.year}
            </span>
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="flex flex-col flex-1 p-6">
          {/* Title + tagline */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors">
              {CVKING.title}
            </h3>
            <p className="mt-0.5 text-xs font-mono text-[var(--text-tertiary)]">{CVKING.tagline}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {CVKING.description}
          </p>

          {/* Top 3 features — clean and scannable */}
          <div className="mt-5 grid sm:grid-cols-3 gap-3">
            {CVKING.cardFeatures.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-3 flex flex-col gap-1.5"
              >
                <span className="text-lg">{f.icon}</span>
                <p className="text-xs font-semibold text-[var(--text-primary)] leading-tight">{f.label}</p>
                <p className="text-[11px] text-[var(--text-tertiary)] leading-snug">{f.detail}</p>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {CVKING.techStack.slice(0, 5).map((t) => (
              <Badge key={t.label} variant="default">{t.label}</Badge>
            ))}
          </div>

          {/* ── CTA hierarchy ── */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 border-t border-[var(--border)] pt-5">
            {/* Primary — full emphasis */}
            <a
              href={CVKING.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.5)] active:scale-[0.98]"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
            {/* Secondary — outline */}
            <button
              onClick={() => setOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-xl border border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all active:scale-[0.98]"
            >
              View Details
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && <CVKingModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

/* ── Section ── */
export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="AI Projects"
          subtitle="Production systems built end-to-end — from dataset curation to deployed APIs."
        />

        {/* Single featured card — capped at 3xl for visual prominence without over-stretching */}
        <div className="mx-auto max-w-3xl">
          <CVKingCard />
        </div>
      </div>
    </section>
  )
}
