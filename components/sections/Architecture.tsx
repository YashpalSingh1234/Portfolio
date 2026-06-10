'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const PIPELINE_STAGES = [
  {
    id: 'data',
    icon: '📥',
    label: 'Data',
    subtitle: 'Ingestion & Processing',
    color: 'from-blue-500/20 to-cyan-500/10',
    accent: 'border-blue-500/30',
    details: [
      { label: 'Sources', value: 'APIs, databases, files, streams' },
      { label: 'Processing', value: 'Cleaning, validation, feature engineering' },
      { label: 'Versioning', value: 'DVC data pipelines + S3 storage' },
      { label: 'Monitoring', value: 'Schema validation + drift detection' },
    ],
    tools: ['DVC', 'Pandas', 'Apache Kafka', 'S3', 'Great Expectations'],
  },
  {
    id: 'training',
    icon: '🏋️',
    label: 'Training',
    subtitle: 'Experiment & Evaluate',
    color: 'from-violet-500/20 to-purple-500/10',
    accent: 'border-violet-500/30',
    details: [
      { label: 'Frameworks', value: 'PyTorch, Scikit-learn, HuggingFace' },
      { label: 'Tracking', value: 'MLflow experiments + hyperparameter tuning' },
      { label: 'Evaluation', value: 'Cross-validation, RAGAS, custom rubrics' },
      { label: 'Registry', value: 'MLflow model registry + staging gates' },
    ],
    tools: ['PyTorch', 'HuggingFace', 'MLflow', 'Optuna', 'RAGAS'],
  },
  {
    id: 'serving',
    icon: '🚀',
    label: 'Serving',
    subtitle: 'Packaging & Deployment',
    color: 'from-indigo-500/20 to-brand-500/10',
    accent: 'border-indigo-500/30',
    details: [
      { label: 'API', value: 'FastAPI with async endpoints + streaming' },
      { label: 'Containerisation', value: 'Multi-stage Docker + Docker Compose' },
      { label: 'Orchestration', value: 'AWS ECS with auto-scaling + ALB' },
      { label: 'CI/CD', value: 'GitHub Actions → test → build → deploy' },
    ],
    tools: ['FastAPI', 'Docker', 'AWS ECS', 'GitHub Actions', 'ONNX'],
  },
  {
    id: 'monitoring',
    icon: '👁️',
    label: 'Monitoring',
    subtitle: 'Observability & Drift',
    color: 'from-emerald-500/20 to-teal-500/10',
    accent: 'border-emerald-500/30',
    details: [
      { label: 'Metrics', value: 'Latency, throughput, error rate, accuracy' },
      { label: 'Drift', value: 'Feature drift (PSI) + prediction drift (KS test)' },
      { label: 'Alerting', value: 'PagerDuty alerts → auto-rollback triggers' },
      { label: 'Dashboards', value: 'Grafana + Prometheus + custom LLM evals' },
    ],
    tools: ['Grafana', 'Prometheus', 'Evidently AI', 'Datadog', 'LangSmith'],
  },
]

export function Architecture() {
  const [active, setActive] = useState<string>(PIPELINE_STAGES[0].id)
  const activeStage = PIPELINE_STAGES.find((s) => s.id === active)!

  return (
    <section id="architecture" className="section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="System Design"
          title="AI Architecture Showcase"
          subtitle="How I think about end-to-end ML systems — from raw data to monitored production."
        />

        {/* Pipeline visual */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-0 min-w-max mx-auto w-fit">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-center">
                <button
                  onClick={() => setActive(stage.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-6 py-4 text-center transition-all duration-200 min-w-[120px] ${
                    active === stage.id
                      ? `${stage.accent} bg-gradient-to-b ${stage.color}`
                      : 'border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <span className="text-3xl">{stage.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{stage.label}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{stage.subtitle}</p>
                  </div>
                  {active === stage.id && (
                    <div className="h-1 w-6 rounded-full bg-[var(--brand)]" />
                  )}
                </button>

                {i < PIPELINE_STAGES.length - 1 && (
                  <div className="flex items-center px-1">
                    <ChevronRight className="h-5 w-5 text-[var(--text-tertiary)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`rounded-2xl border-2 ${activeStage.accent} bg-gradient-to-br ${activeStage.color} bg-[var(--bg-secondary)] p-6 sm:p-8`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">{activeStage.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{activeStage.label} Layer</h3>
              <p className="text-sm text-[var(--text-secondary)]">{activeStage.subtitle}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {activeStage.details.map((d) => (
              <div key={d.label} className="rounded-xl border border-[var(--border)] bg-[var(--bg-primary)]/60 backdrop-blur-sm p-4">
                <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-1">{d.label}</p>
                <p className="text-sm text-[var(--text-primary)]">{d.value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Tools</p>
            <div className="flex flex-wrap gap-2">
              {activeStage.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]/60 px-3 py-1 text-xs font-mono text-[var(--text-secondary)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
