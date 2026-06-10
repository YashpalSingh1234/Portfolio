'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { BLOG_POSTS } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export function Blog() {
  return (
    <section id="blog" className="section-padding">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Writing"
          title="Research Notes"
          subtitle="Technical deep-dives on what actually works in production AI systems."
        />

        <div className="flex flex-col gap-4">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 hover:border-[var(--border-strong)] transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="brand">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--brand)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-[var(--text-tertiary)] font-mono">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                </div>
                <a
                  href={post.link}
                  className="shrink-0 flex items-center gap-1 text-xs font-medium text-[var(--brand)] hover:text-brand-300 transition-colors group-hover:translate-x-1 duration-200"
                  aria-label={`Read ${post.title}`}
                >
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
