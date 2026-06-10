'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SKILL_GROUPS } from '@/lib/data'

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
          {name}
        </span>
        <span className="text-xs font-mono text-[var(--text-tertiary)]">{level}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500"
        />
      </div>
    </div>
  )
}

export function Skills() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const ALL_TECH = [
    'Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'HuggingFace',
    'LangChain', 'FastAPI', 'Docker', 'FAISS', 'MLflow', 'DVC',
    'AWS', 'PostgreSQL', 'Redis', 'Git', 'SQL',
  ]

  return (
    <section id="skills" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Stack"
          subtitle="Depth across the full AI engineering lifecycle — research through production."
        />

        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SKILL_GROUPS.map((group, i) => (
            <button
              key={group.category}
              onClick={() => setActiveGroup(i)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeGroup === i
                  ? 'border-[var(--brand)] bg-brand-500/10 text-[var(--brand)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>{group.icon}</span>
              <span className="hidden sm:inline">{group.category}</span>
            </button>
          ))}
        </div>

        {/* Skill group content */}
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          {SKILL_GROUPS.filter((_, i) => i === activeGroup).map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="sm:col-span-2"
            >
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{group.category}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {group.skills.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} animate={visible} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech cloud */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-6">
          <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
            Full Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {ALL_TECH.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5 text-xs font-mono text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--brand)] transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
