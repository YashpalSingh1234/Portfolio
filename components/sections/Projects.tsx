'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="AI Projects"
          subtitle="Production systems built end-to-end — from dataset curation to deployed APIs."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] py-24 px-6 text-center"
        >
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            Projects Coming Soon
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-sm">
            Selected production-quality work will be added here.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
