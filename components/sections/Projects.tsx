'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ChevronRight, TrendingUp, Database, Cpu, Rocket, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PROJECTS } from '@/lib/data'
import type { Project } from '@/types'

function MetricCard({ label, value, delta, positive }: {
  label: string; value: string; delta?: string; positive?: boolean
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
      <p className="text-xs text-[var(--text-tertiary)] mb-1">{label}</p>
      <p className="text-xl font-bold font-mono text-[var(--text-primary)]">{value}</p>
      {delta && (
        <p className={`text-xs mt-1 font-mono ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {delta}
        </p>
      )}
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[var(--border)] bg-[var(--bg-primary)] rounded-t-2xl z-10">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{project.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Metrics */}
          <div>
            <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="h-3 w-3" /> Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="h-3 w-3" /> Architecture
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {project.architecture.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="flex flex-col items-center rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-center min-w-[80px]">
                    <span className="text-xl mb-1">{step.icon}</span>
                    <span className="text-xs font-semibold text-[var(--text-primary)]">{step.label}</span>
                    <span className="text-xs text-[var(--text-tertiary)] mt-0.5">{step.description}</span>
                  </div>
                  {i < project.architecture.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Database className="h-3 w-3" /> Data & Model
              </h4>
              <p className="text-sm text-[var(--text-secondary)]"><span className="text-[var(--text-primary)] font-medium">Dataset:</span> {project.dataset}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1"><span className="text-[var(--text-primary)] font-medium">Model:</span> {project.model}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1"><span className="text-[var(--text-primary)] font-medium">Eval:</span> {project.evaluation}</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Rocket className="h-3 w-3" /> Deployment
              </h4>
              <p className="text-sm text-[var(--text-secondary)]">{project.deployment}</p>
            </div>
          </div>

          {/* Challenges */}
          <div>
            <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" /> Challenges & Solutions
            </h4>
            <ul className="space-y-2">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Results */}
          <div>
            <h4 className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="h-3 w-3" /> Results
            </h4>
            <ul className="space-y-2">
              {project.results.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="mono">{tag}</Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const PROJECT_COLORS = ['from-indigo-500/20 to-purple-500/10', 'from-blue-500/20 to-cyan-500/10', 'from-violet-500/20 to-pink-500/10', 'from-emerald-500/20 to-teal-500/10']
  const color = PROJECT_COLORS[index % PROJECT_COLORS.length]

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden hover:border-[var(--border-strong)] transition-all duration-300 hover:shadow-card-dark"
      >
        {/* Image placeholder / gradient header */}
        <div className={`h-36 bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 grid-bg opacity-20" />
          <span className="text-5xl relative z-10">
            {index === 0 ? '📰' : index === 1 ? '🤖' : index === 2 ? '⚡' : '🚀'}
          </span>
          {/* Top metric badge */}
          <div className="absolute top-3 right-3 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]/80 backdrop-blur-sm px-2 py-1">
            <span className="text-xs font-mono font-semibold text-emerald-400">
              {project.metrics[0].value}
            </span>
            <span className="text-xs text-[var(--text-tertiary)] ml-1">{project.metrics[0].label}</span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--brand)] transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Quick stats row */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="rounded-lg bg-[var(--bg-tertiary)] px-3 py-2">
                <p className="text-xs text-[var(--text-tertiary)]">{m.label}</p>
                <p className="text-sm font-mono font-semibold text-[var(--text-primary)]">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--brand)] hover:border-[var(--border-strong)] transition-all"
                  aria-label="GitHub"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--brand)] hover:border-[var(--border-strong)] transition-all"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--brand)] hover:text-brand-300 transition-colors"
            >
              View details <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="AI Projects"
          subtitle="Production systems built end-to-end — from dataset curation to deployed APIs."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
