'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SKILL_GROUPS } from '@/lib/data'

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Stack"
          subtitle="AI/ML core, with full-stack range to build and ship it end-to-end."
        />

        {/* Clean category grid — flat tags, no proficiency bars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-5"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xl">{group.icon}</span>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-mono text-[var(--text-secondary)] hover:border-[var(--brand)]/40 hover:text-[var(--brand)] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
