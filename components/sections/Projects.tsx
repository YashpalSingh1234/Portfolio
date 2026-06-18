'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  X,
  ChevronRight,
  Layers,
  Cpu,
  Shield,
  CreditCard,
  FileText,
  Scissors,
  Database,
  Search,
  Bot,
  Github,
  CheckCircle2,
} from 'lucide-react'
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
    { label: 'Next.js', note: 'verified — SSR routing, metadata API' },
    { label: 'JWT Auth', note: 'verified — privacy policy §2' },
    { label: 'bcrypt', note: 'verified — privacy policy §8' },
    { label: 'Razorpay', note: 'verified — pricing page + privacy policy §5' },
    { label: 'Google OAuth', note: 'verified — login page' },
    { label: 'HTTPS / TLS', note: 'verified — privacy policy §8' },
    { label: 'AI (LLM)', note: 'verified — features present; provider not disclosed' },
    { label: 'PDF Export', note: 'verified — pricing table' },
  ] as const,
  architecture: [
    { icon: <Cpu className="h-4 w-4" />, label: 'AI Layer', detail: 'Resume optimiser, cover letter + roadmap generators' },
    { icon: <Layers className="h-4 w-4" />, label: 'Builder', detail: 'Live-preview editor + ATS formatter + PDF export' },
    { icon: <Shield className="h-4 w-4" />, label: 'Auth & Sessions', detail: 'JWT + bcrypt + Google OAuth + CSRF protection' },
    { icon: <CreditCard className="h-4 w-4" />, label: 'Payments', detail: 'Razorpay — 5 tiers from free to ₹999/yr' },
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

/* ─────────────────────────────────────────────
   Billo AI — Retrieval-Augmented Generation (RAG)
   document-intelligence pipeline. Personal
   engineering project. Every line below reflects
   an actual system-design decision or a real bug
   that was hit and fixed — no invented metrics,
   no inflated claims.
───────────────────────────────────────────── */

const BILLO = {
  id: 'billo-ai',
  title: 'Billo AI',
  tagline: 'Retrieval-Augmented Generation (RAG) Pipeline',
  impact:
    'An end-to-end document-intelligence pipeline that ingests PDFs, generates embeddings, and answers questions over private documents — built as two decoupled services, not a single notebook script.',
  problem:
    'Most reference RAG implementations load, chunk, embed, and query documents in one linear script — fine for a demo, unusable as a service. Add a single new PDF and the entire index gets rebuilt from scratch; run the same code from a different working directory and path-dependent failures surface that never showed up in development.',
  solution:
    'Billo AI splits the system into two stages that share nothing but a persisted vector store: an indexing pipeline that loads PDFs, recursively chunks them, generates embeddings with Sentence-Transformers, and writes them to a local Chroma collection — and a FastAPI service that performs semantic retrieval over that store and assembles context for an LLM response. Either stage can be rebuilt, redeployed, or extended without touching the other.',
  architecture: [
    { icon: <FileText className="h-4 w-4" />, label: 'PDF Loader', detail: 'Reads & parses source docs' },
    { icon: <Scissors className="h-4 w-4" />, label: 'Text Chunking', detail: 'Recursive, overlap-aware split' },
    { icon: <Cpu className="h-4 w-4" />, label: 'Embedding Generation', detail: 'Sentence-Transformers encode' },
    { icon: <Database className="h-4 w-4" />, label: 'Chroma Vector Store', detail: 'Persisted to local disk' },
    { icon: <Search className="h-4 w-4" />, label: 'Semantic Retrieval', detail: 'Vector similarity search' },
    { icon: <Bot className="h-4 w-4" />, label: 'LLM Response', detail: 'Context-grounded generation' },
  ],
  techStack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Sentence-Transformers', 'Transformers', 'Vector Database'],
  // Top 3 shown on the card — chosen for maximum recruiter signal
  cardFeatures: [
    {
      icon: '🧩',
      label: 'Modular Architecture',
      detail: 'Ingestion and retrieval run as independent, decoupled stages.',
    },
    {
      icon: '🗄️',
      label: 'Chroma Vector Persistence',
      detail: 'Local vector store — no managed DB dependency.',
    },
    {
      icon: '⚡',
      label: 'FastAPI Backend',
      detail: 'Typed, async REST endpoints for ingestion and query.',
    },
  ] as const,
  // Full feature set shown in modal
  features: [
    {
      icon: '📥',
      label: 'PDF Ingestion Pipeline',
      detail: 'Loads and parses arbitrary PDF documents into raw text ready for chunking.',
    },
    {
      icon: '✂️',
      label: 'Recursive Text Chunking',
      detail: 'Splits documents into overlapping chunks that preserve context across boundaries.',
    },
    {
      icon: '🧬',
      label: 'Embedding Generation',
      detail: 'Converts each chunk into dense vectors using Sentence-Transformers.',
    },
    {
      icon: '🗄️',
      label: 'Chroma Vector Persistence',
      detail: 'Writes embeddings to a local Chroma store that survives restarts.',
    },
    {
      icon: '🔎',
      label: 'Semantic Retrieval',
      detail: 'Surfaces the most relevant chunks for a query by vector similarity, not keyword match.',
    },
    {
      icon: '⚡',
      label: 'FastAPI Backend',
      detail: 'Exposes ingestion and query endpoints over a typed, async REST API.',
    },
    {
      icon: '🧩',
      label: 'Modular Architecture',
      detail: 'Indexing and retrieval are separate stages connected only through the vector store.',
    },
    {
      icon: '💾',
      label: 'Local Vector Storage',
      detail: 'Runs entirely on local disk — no managed vector database, no per-query egress cost.',
    },
    {
      icon: '♻️',
      label: 'Reusable Indexing Pipeline',
      detail: 'Callable independently of the API, so new document sets can be indexed on their own.',
    },
  ] as const,
  // Written as outcomes, not a task list — what actually broke and how it was fixed.
  challenges: [
    {
      issue: 'The vector store was constructed inline inside the request handler, so every API call re-initialized Chroma from scratch.',
      fix: 'Moved vectorstore initialization into the application startup lifecycle so it loads once and is reused across requests.',
    },
    {
      issue: 'Embedding generation and query-time retrieval were entangled in the same code path, so indexing a new document required restarting the whole API.',
      fix: 'Split the system into a standalone indexing pipeline and a retrieval-only service that read from the same persisted store.',
    },
    {
      issue: 'Relative paths to the source PDFs and the Chroma persistence directory meant the pipeline behaved differently depending on which directory the process was launched from.',
      fix: 'Resolved all storage paths against the project root at startup, removing an entire class of environment-dependent failures.',
    },
    {
      issue: 'The service occasionally accepted requests before the embedding model and persisted vector store had finished loading, causing intermittent failures on first use.',
      fix: 'Added explicit readiness checks so the API only reports healthy once the model and the vector store are both confirmed initialized.',
    },
    {
      issue: "LangChain's split into langchain-core, langchain-community, and partner packages broke existing imports mid-build.",
      fix: 'Migrated imports to the new package structure and pinned compatible versions, isolating the pipeline from further upstream churn.',
    },
    {
      issue: 'Adding a single new PDF meant deleting and rebuilding the entire vector store from scratch.',
      fix: 'Implemented incremental indexing so new documents are chunked, embedded, and appended to the existing Chroma collection directly.',
    },
  ] as const,
  // Qualitative outcomes only — no invented numbers.
  results: [
    'Indexing and retrieval now run as independently deployable stages, connected only through a persisted vector store — the index can be rebuilt without taking the API down.',
    'Moving path resolution and readiness checks into the application lifecycle eliminated an entire category of "works on my machine" startup failures.',
    "Tracking LangChain's package migration early kept the pipeline aligned with the current ecosystem instead of pinned to a deprecated API surface.",
    'Biggest lesson: most RAG reference code is written for a single demo run, not for being restarted, redeployed, or extended with new documents — designing for that constraint from the start avoided a rewrite later.',
  ] as const,
  github: 'https://github.com/YashpalSingh1234/b-illo_Ai', // TODO: confirm/replace with the real repo URL
}

/* ── Detail Modal ── */
function BilloModal({ onClose }: { onClose: () => void }) {
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
              <span className="text-2xl">🧠</span>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{BILLO.title}</h3>
              <span className="rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-[var(--brand)]">
                Open Source
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{BILLO.tagline}</p>
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
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{BILLO.problem}</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Solution</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{BILLO.solution}</p>
            </div>
          </div>

          {/* Architecture — literal pipeline flow */}
          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Architecture</p>
            <div className="overflow-x-auto pb-2 -mx-1 px-1">
              <div className="flex items-center gap-0 min-w-max">
                {BILLO.architecture.map((step, i) => (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-center min-w-[128px]">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] text-[var(--brand)]">
                        {step.icon}
                      </div>
                      <p className="text-xs font-semibold text-[var(--text-primary)]">{step.label}</p>
                      <p className="text-[10px] text-[var(--text-tertiary)] leading-snug">{step.detail}</p>
                    </div>
                    {i < BILLO.architecture.length - 1 && (
                      <ChevronRight className="h-4 w-4 mx-1 shrink-0 text-[var(--text-tertiary)]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {BILLO.techStack.map((t) => (
                <div key={t} className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5">
                  <span className="text-xs font-mono font-semibold text-[var(--brand)]">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Key Features</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {BILLO.features.map((f) => (
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

          {/* Engineering Challenges & Fixes */}
          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Engineering Challenges &amp; Fixes</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {BILLO.challenges.map((c) => (
                <div key={c.issue} className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
                  <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1.5">Issue</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{c.issue}</p>
                  <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">Fix</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{c.fix}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results & Learnings */}
          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Results &amp; Learnings</p>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 space-y-3">
              {BILLO.results.map((r) => (
                <div key={r} className="flex gap-3 items-start">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-[var(--brand)]" />
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modal CTA */}
          <div className="flex gap-3 pt-2 border-t border-[var(--border)]">
            <a
              href={BILLO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.25)]"
            >
              <Github className="h-4 w-4" /> View on GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Featured Card ── */
function BilloCard() {
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
            {['RAG Pipeline', 'Self-Hosted', 'Modular Design'].map((pill) => (
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
            <span className="text-5xl select-none">🧠</span>
          </div>

          {/* Status — top-right */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
            <span className="rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-[var(--brand)]">
              Open Source
            </span>
          </div>
        </div>

        {/* ── Card body ── */}
        <div className="flex flex-col flex-1 p-6">
          {/* Title + tagline */}
          <div className="mb-3">
            <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors">
              {BILLO.title}
            </h3>
            <p className="mt-0.5 text-xs font-mono text-[var(--text-tertiary)]">{BILLO.tagline}</p>
          </div>

          {/* Impact statement */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {BILLO.impact}
          </p>

          {/* Top 3 features — clean and scannable */}
          <div className="mt-5 grid sm:grid-cols-3 gap-3">
            {BILLO.cardFeatures.map((f) => (
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
            {BILLO.techStack.slice(0, 5).map((t) => (
              <Badge key={t} variant="default">{t}</Badge>
            ))}
          </div>

          {/* ── CTA hierarchy ── */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 border-t border-[var(--border)] pt-5">
            {/* Primary — GitHub */}
            <a
              href={BILLO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.5)] active:scale-[0.98]"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
            {/* Secondary — case study */}
            <button
              onClick={() => setOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 rounded-xl border border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all active:scale-[0.98]"
            >
              View Case Study
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && <BilloModal onClose={() => setOpen(false)} />}
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

        {/* Featured project grid — capped at 6xl so two cards sit comfortably side by side */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <CVKingCard />
          <BilloCard />
        </div>
      </div>
    </section>
  )
}
