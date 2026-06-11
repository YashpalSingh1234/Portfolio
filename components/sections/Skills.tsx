'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

// Clean 4-category grouping: AI · Backend · Frontend · Tools
const SKILL_GROUPS = [
  {
    category: 'AI & ML',
    icon: '🤖',
    color: 'from-violet-500/15 to-indigo-500/5',
    skills: [
      { name: 'Python',                  level: 97 },
      { name: 'PyTorch / TensorFlow',    level: 88 },
      { name: 'HuggingFace Transformers',level: 93 },
      { name: 'Scikit-learn',            level: 95 },
      { name: 'LangChain / LlamaIndex',  level: 92 },
      { name: 'OpenAI API',              level: 95 },
      { name: 'FAISS / Vector Search',   level: 90 },
      { name: 'Fine-tuning (LoRA/PEFT)', level: 80 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚡',
    color: 'from-blue-500/15 to-cyan-500/5',
    skills: [
      { name: 'FastAPI',          level: 92 },
      { name: 'PostgreSQL / SQL', level: 82 },
      { name: 'Redis',            level: 80 },
      { name: 'REST APIs',        level: 88 },
      { name: 'Next.js (API)',    level: 82 },
      { name: 'Celery / Queues',  level: 78 },
    ],
  },
  {
    category: 'Frontend',
    icon: '🖥️',
    color: 'from-emerald-500/15 to-teal-500/5',
    skills: [
      { name: 'Next.js / React',   level: 85 },
      { name: 'TypeScript',        level: 82 },
      { name: 'Tailwind CSS',      level: 88 },
      { name: 'Framer Motion',     level: 78 },
    ],
  },
  {
    category: 'Tools & Infra',
    icon: '🚀',
    color: 'from-orange-500/15 to-amber-500/5',
    skills: [
      { name: 'Docker',                level: 85 },
      { name: 'MLflow / DVC',          level: 88 },
      { name: 'AWS (ECS, S3, Lambda)', level: 80 },
      { name: 'GitHub Actions / CI',   level: 87 },
      { name: 'Grafana / Monitoring',  level: 76 },
    ],
  },
]

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
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.05 }}
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

  const [animKey, setAnimKey] = useState(0)
  function handleGroupChange(i: number) {
    setActiveGroup(i)
    setAnimKey((k) => k + 1)
  }

  const group = SKILL_GROUPS[activeGroup]

  return (
    <section id="skills" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills & Stack"
          subtitle="Depth across the full AI engineering lifecycle — research through production."
        />

        {/* 4-tab navigation — clean grouped categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {SKILL_GROUPS.map((g, i) => (
            <button
              key={g.category}
              onClick={() => handleGroupChange(i)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeGroup === i
                  ? 'border-[var(--brand)] bg-brand-500/10 text-[var(--brand)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
              }`}
            >
              <span>{g.icon}</span>
              <span>{g.category}</span>
            </button>
          ))}
        </div>

        {/* Active group panel */}
        <motion.div
          key={`${activeGroup}-${animKey}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={`rounded-2xl border border-[var(--border)] bg-gradient-to-br ${group.color} bg-[var(--bg-primary)] p-6 mb-6`}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">{group.icon}</span>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">{group.category}</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {group.skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} animate={visible} />
            ))}
          </div>
        </motion.div>

        {/* Full tech cloud */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-5">
          <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-4">
            Full Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {['Python','PyTorch','TensorFlow','Scikit-learn','HuggingFace','LangChain',
              'FastAPI','Docker','FAISS','MLflow','DVC','AWS','PostgreSQL','Redis',
              'Next.js','TypeScript','Tailwind','Git'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.025 }}
                whileHover={{ scale: 1.06 }}
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
