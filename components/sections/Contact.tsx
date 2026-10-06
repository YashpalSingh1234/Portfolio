'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SectionBackground } from '@/components/ui/SectionBackground'
import { PERSONAL } from '@/lib/data'

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden section-padding bg-[var(--bg-secondary)]">
      <SectionBackground variant="ambient" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's Work Together"
          subtitle="Open to AI Engineer / ML Engineer opportunities. Let's talk."
        />

        <div className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* Availability card — explicit role targeting */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/8 p-5 shadow-[0_0_28px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-emerald-400">Available Now</span>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
                Open to AI Engineer / ML Engineer opportunities
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Actively looking for AI/ML Engineering roles. Response time: &lt;24h.
              </p>
            </div>

            {/* Contact links */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-3 sm:p-5 flex flex-col gap-1 sm:gap-3">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-[var(--bg-secondary)] transition-colors group"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 border border-brand-500/20">
                  <Mail className="h-4 w-4 text-[var(--brand)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[var(--text-tertiary)]">Email</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors break-words">
                    {PERSONAL.email}
                  </p>
                </div>
              </a>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-[var(--bg-secondary)] transition-colors group"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                  <Github className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[var(--text-tertiary)]">GitHub</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors break-words">
                    github.com/YashpalSingh1234
                  </p>
                </div>
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-[var(--bg-secondary)] transition-colors group"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                  <Linkedin className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[var(--text-tertiary)]">LinkedIn</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors break-words">
                    www.linkedin.com/in/yashpal-singh-65810b241/
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-xl p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                  <MapPin className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[var(--text-tertiary)]">Location</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{PERSONAL.location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
