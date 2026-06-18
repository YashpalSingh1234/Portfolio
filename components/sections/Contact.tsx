'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin, Send, Check } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PERSONAL } from '@/lib/data'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In production, wire to an API route or Resend/Formspree
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's Work Together"
          subtitle="Open to AI Engineer / ML Engineer opportunities. Let's talk."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-6"
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
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-5 flex flex-col gap-3">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="flex items-center gap-3 rounded-xl p-3 hover:bg-[var(--bg-secondary)] transition-colors group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 border border-brand-500/20">
                  <Mail className="h-4 w-4 text-[var(--brand)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Email</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors">
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
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                  <Github className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">GitHub</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors">
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
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                  <Linkedin className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">LinkedIn</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors">
                    www.linkedin.com/in/yashpal-singh-65810b241/
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-xl p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                  <MapPin className="h-4 w-4 text-[var(--text-secondary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Location</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{PERSONAL.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  placeholder="AI Engineer role at Acme Corp"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about the role, team, and what you're building..."
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--brand)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className={`flex items-center justify-center gap-2 h-11 rounded-xl font-medium text-sm transition-all duration-200 ${submitted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-brand-500 text-white hover:bg-brand-600 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]'
                  }`}
              >
                {submitted ? (
                  <><Check className="h-4 w-4" /> Message Sent!</>
                ) : (
                  <><Send className="h-4 w-4" /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
