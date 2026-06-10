'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CERTIFICATIONS } from '@/lib/data'

export function Certifications() {
  return (
    <section id="certifications" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          subtitle="Formal credentials complementing hands-on production experience."
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-5 hover:border-[var(--border-strong)] transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-2xl">
                  {cert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--brand)] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-0.5">{cert.issuer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">{cert.date}</span>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-[var(--brand)] hover:text-brand-300 transition-colors"
                      >
                        Verify <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
