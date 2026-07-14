'use client'

import { motion } from 'framer-motion'

/**
 * Shared, GPU-only decorative background system.
 *
 * Design rules (apply to every variant below):
 *  - Only `transform`, `opacity`, and `background-position` are animated —
 *    no layout-affecting properties, so these never trigger repaint storms
 *    or layout shift.
 *  - Everything here is `aria-hidden`, `pointer-events-none`, and sits at
 *    `-z-10` behind real content — purely decorative, never focusable.
 *  - `prefers-reduced-motion` is already handled globally in globals.css
 *    (`* { animation-duration: 0.01ms !important }`), so every animation
 *    used here automatically freezes for users who ask for reduced motion
 *    — no per-component logic needed.
 *  - Each instance fades in once via `whileInView` as its section enters
 *    the viewport, instead of snapping in instantly — this is what gives
 *    scrolling between sections a smooth, "morphing" feel without any
 *    expensive scroll-linked blending.
 *
 * Variants map 1:1 to the section that uses them, but the primitives
 * (grid, glow blobs, dashed lines, pulsing nodes) are all shared so there
 * is exactly one implementation of each animation technique.
 */

type Variant = 'blueprint' | 'circuit' | 'neural' | 'ambient'

export function SectionBackground({
  variant,
  interactive = false,
}: {
  variant: Variant
  /** Only meaningful for the 'circuit' variant — adds a mouse-reactive glow. */
  interactive?: boolean
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {variant === 'blueprint' && <BlueprintLayer />}
      {variant === 'circuit' && <CircuitLayer interactive={interactive} />}
      {variant === 'neural' && <NeuralLayer />}
      {variant === 'ambient' && <AmbientLayer />}
    </motion.div>
  )
}

/* ── Experience: professional engineering / blueprint feel ── */
function BlueprintLayer() {
  return (
    <>
      {/* Slow-panning line grid — reuses the same .grid-bg pattern as Hero */}
      <div className="absolute inset-0 grid-bg opacity-[0.15] animate-grid-pan" />

      {/* Vertical scanning sweep, echoes the timeline line in the section itself */}
      <div
        className="absolute left-1/2 top-0 h-1/2 w-full max-w-3xl -translate-x-1/2 animate-scan"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(99,102,241,0.10), transparent)',
        }}
      />

      {/* Two quiet connection dots drifting in place */}
      <div className="absolute left-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-[var(--brand)]/40 animate-pulse-slow blur-[1px]" />
      <div
        className="absolute right-[24%] top-[62%] h-1.5 w-1.5 rounded-full bg-[var(--brand)]/40 animate-pulse-slow blur-[1px]"
        style={{ animationDelay: '-2s' }}
      />
    </>
  )
}

/* ── Projects / Architecture: technical, circuit-board feel ── */
function CircuitLayer({ interactive = false }: { interactive?: boolean }) {
  return (
    <>
      {/* Sparse dot grid — visually distinct from the line grid used elsewhere */}
      <div
        className="absolute inset-0 opacity-[0.18] animate-grid-pan"
        style={{
          backgroundImage: 'radial-gradient(var(--border-strong) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Ambient depth blobs */}
      <div className="absolute -left-16 top-1/4 h-64 w-64 rounded-full bg-brand-500/[0.06] blur-3xl animate-float" />
      <div
        className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-purple-500/[0.05] blur-3xl animate-float"
        style={{ animationDelay: '-3s' }}
      />

      {/* Mouse-reactive glow — reads --mx/--my set by the section on mousemove; no-op (centered) if unset */}
      {interactive && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.10), transparent 70%)',
          }}
        />
      )}

      {/* Circuit traces */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M0 20 H30 V45 H70 V20 H100"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="0.15"
          strokeOpacity="0.25"
          strokeDasharray="2 3"
          className="animate-dash"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 78 H22 V58 H60 V85 H100"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="0.15"
          strokeOpacity="0.18"
          strokeDasharray="2 3"
          className="animate-dash"
          style={{ animationDelay: '-1.2s' }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  )
}

/* ── Skills: neural-network motif ── */
function NeuralLayer() {
  // Hand-placed, fixed layout (not runtime-generated) — a small, literal
  // network diagram rather than a particle system, per the "nothing
  // excessive" brief.
  const nodes = [
    { x: 8, y: 20 }, { x: 8, y: 50 }, { x: 8, y: 80 },
    { x: 50, y: 12 }, { x: 50, y: 38 }, { x: 50, y: 62 }, { x: 50, y: 88 },
    { x: 92, y: 30 }, { x: 92, y: 68 },
  ]
  const links: [number, number][] = [
    [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
    [3, 7], [4, 7], [5, 8], [6, 8],
  ]

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.22]"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {links.map(([a, b], i) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--brand)"
          strokeWidth="0.12"
          strokeOpacity="0.5"
          strokeDasharray={i % 3 === 0 ? '1.5 2.5' : undefined}
          className={i % 3 === 0 ? 'animate-dash' : undefined}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="0.9"
          fill="var(--brand)"
          className="animate-pulse-slow"
          style={{ animationDelay: `${-(i % 5)}s`, transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </svg>
  )
}

/* ── Contact: calm ambient glow ── */
function AmbientLayer() {
  return (
    <>
      <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-brand-500/[0.06] blur-3xl animate-drift-slow" />
      <div
        className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-emerald-500/[0.05] blur-3xl animate-drift-slow"
        style={{ animationDelay: '-8s' }}
      />
    </>
  )
}
