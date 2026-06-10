'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EXPERIENCES } from '@/lib/data'

const DETAIL_LABELS = [
  { key: 'problem', label: 'Problem', color: 'text-rose-400' },
  { key: 'research', label: 'Research', color: 'text-amber-400' },
  { key: 'solution', label: 'Solution', color: 'text-blue-400' },
  { key: 'outcome', label: 'Outcome', color: 'text-emerald-400' },
] as const

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(EXPERIENCES[0].id)

  return (
    <section id="experience" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Career"
          title="Experience"
          subtitle="2 years of shipping AI systems in R&D — from research to production."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--border-strong)] to-transparent hidden sm:block" />

          <div className="flex flex-col gap-4">
            {EXPERIENCES.map((exp, idx) => {
              const isOpen = expanded === exp.id
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="sm:pl-16 relative">
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-5 h-4 w-4 rounded-full border-2 border-[var(--brand)] bg-[var(--bg-secondary)] hidden sm:flex items-center justify-center">
                      <div className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-[var(--brand)]' : 'bg-[var(--text-tertiary)]'} transition-colors`} />
                    </div>

                    {/* Card */}
                    <div
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? 'border-[var(--border-strong)] bg-[var(--bg-primary)]'
                          : 'border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {/* Header — always visible */}
                      <button
                        onClick={() => setExpanded(isOpen ? null : exp.id)}
                        className="w-full flex items-start justify-between p-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
                            <Briefcase className="h-4 w-4 text-[var(--brand)]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-[var(--text-primary)] text-base leading-tight">
                                {exp.role}
                              </h3>
                              <Badge variant="brand">{exp.type}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
                              <span className="font-medium">{exp.company}</span>
                              <span>·</span>
                              <span className="font-mono text-xs">{exp.period}</span>
                            </div>
                            {exp.highlight && (
                              <p className="mt-2 text-xs font-mono text-emerald-400">
                                ↑ {exp.highlight}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 shrink-0 text-[var(--text-tertiary)]">
                          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </button>

                      {/* Expanded content */}
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-[var(--border)] px-5 pb-5"
                        >
                          <div className="pt-5 grid sm:grid-cols-2 gap-5">
                            {DETAIL_LABELS.map(({ key, label, color }) => (
                              <div key={key}>
                                <p className={`text-xs font-mono font-semibold mb-1.5 ${color} uppercase tracking-wider`}>
                                  {label}
                                </p>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                  {exp[key]}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Tech stack */}
                          <div className="mt-5 pt-4 border-t border-[var(--border)]">
                            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                              Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.tech.map((t) => (
                                <Badge key={t} variant="mono">{t}</Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
