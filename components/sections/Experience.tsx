'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EXPERIENCES } from '@/lib/data'

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
          {/* Vertical timeline line */}
          <div className="absolute left-[1.375rem] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--brand)]/40 via-[var(--border-strong)] to-transparent hidden sm:block" />

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
                    {/* Timeline dot — filled when open */}
                    <div className={`absolute left-[0.875rem] top-[1.1rem] h-4 w-4 rounded-full border-2 transition-colors duration-200 hidden sm:flex items-center justify-center ${
                      isOpen ? 'border-[var(--brand)] bg-brand-500/20' : 'border-[var(--border-strong)] bg-[var(--bg-primary)]'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full transition-colors ${isOpen ? 'bg-[var(--brand)]' : 'bg-[var(--text-tertiary)]'}`} />
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
                        className="w-full flex items-start justify-between p-4 text-left"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
                            <Briefcase className="h-4 w-4 text-[var(--brand)]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight">
                                {exp.role}
                              </h3>
                              <Badge variant="brand">{exp.type}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                              <span className="font-medium">{exp.company}</span>
                              <span className="text-[var(--text-tertiary)]">·</span>
                              <span className="font-mono text-[var(--text-tertiary)]">{exp.period}</span>
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

                      {/* Expanded: achievement bullets + tech stack */}
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-[var(--border)] px-4 pb-4"
                        >
                          {/* Achievement bullets — max 4, recruiter-scannable */}
                          <ul className="pt-4 space-y-2.5">
                            {exp.achievements.slice(0, 4).map((point, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand)]" />
                                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                  {point}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech stack */}
                          <div className="mt-5 pt-4 border-t border-[var(--border)]">
                            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                              Stack
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
