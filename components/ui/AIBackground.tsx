'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

type RGB = [number, number, number]

interface Env {
  w: number
  h: number
  mobile: boolean
  /** True while the light theme is active. */
  light: boolean
  /** Gradient stops sampled by mix(): indigo → violet → cyan. */
  palette: RGB[]
}

interface Scene {
  init(): void
  update(dt: number): void
  draw(ctx: CanvasRenderingContext2D, alpha: number): void
}

const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

/* ─────────────────────────────────────────────────────────────
 * Theme-aware colour system
 *
 *  Dark  (bg #07070f): 400-weight hues — luminous and clearly separated
 *        from the near-black background.
 *  Light (bg #ffffff): 600-weight hues — deep, saturated tones that hold
 *        ~4–6:1 contrast on white without the neon harshness the dark-mode
 *        tones would have there.
 *
 *  Both run indigo → violet → cyan. Indigo ties the animation to the brand;
 *  the violet and cyan stops keep it visually distinct from the all-indigo
 *  UI chrome (grid lines, borders, cards), so it never blends into them.
 *
 *  Palettes live on a mutable Env, so a theme switch recolours the running
 *  animation in place instead of restarting it.
 * ───────────────────────────────────────────────────────────── */
const PALETTES: Record<'dark' | 'light', RGB[]> = {
  dark: [
    [129, 140, 248], // indigo-400
    [192, 132, 252], // purple-400
    [34, 211, 238], // cyan-400
  ],
  light: [
    [79, 70, 229], // indigo-600
    [147, 51, 234], // purple-600
    [8, 145, 178], // cyan-600
  ],
}

function themeColors(isDark: boolean) {
  return { light: !isDark, palette: PALETTES[isDark ? 'dark' : 'light'] }
}

/** Pick a per-theme value: th(env, darkValue, lightValue). */
const th = (env: Env, dark: number, light: number) => (env.light ? light : dark)

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const randInt = (n: number) => Math.floor(Math.random() * n)
const pick = <T,>(arr: readonly T[]): T => arr[randInt(arr.length)]

/** Palette colour at position t (0–1) across the gradient, as an rgba() string. */
function mix(env: Env, t: number, a: number) {
  const stops = env.palette
  const x = Math.max(0, Math.min(1, t)) * (stops.length - 1)
  const i = Math.min(Math.floor(x), stops.length - 2)
  const f = x - i
  const p = stops[i]
  const q = stops[i + 1]
  const r = p[0] + (q[0] - p[0]) * f
  const g = p[1] + (q[1] - p[1]) * f
  const b = p[2] + (q[2] - p[2]) * f
  return `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${Math.max(0, Math.min(a, 1))})`
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}

/* ─────────────────────────────────────────────────────────────
 * Scene 1 — LLM tokens: word chips drifting upward like a token stream
 * ───────────────────────────────────────────────────────────── */
function createTokensScene(env: Env): Scene {
  interface Tok {
    x: number
    y: number
    vx: number
    vy: number
    text: string
    life: number
    max: number
    tint: number
    size: number
    w: number
  }
  const WORDS = [
    'LLM', 'tokens', 'embedding', 'transformer', 'attention', 'prompt', 'agent',
    'RAG', 'fine-tune', 'vector DB', 'inference', 'GPU', 'tensor', 'softmax',
    'context window', 'LoRA', 'RLHF', 'CUDA', 'PyTorch', 'LangChain', 'top-k',
    'temperature', 'logits', 'backprop', 'dataset', 'epoch',
  ]
  let toks: Tok[] = []

  const make = (stagger: boolean): Tok => {
    const max = rand(6000, 10000)
    const text = pick(WORDS)
    const size = env.mobile ? 11 : rand(11, 14)
    // Keep the whole chip inside the viewport (estimated mono width + padding).
    // Only bites on narrow phones; on desktop the cap stays at the original 0.9.
    const estW = text.length * size * 0.6 + 14
    const maxX = Math.max(0.04, 1 - (estW + 8) / env.w)
    return {
      x: rand(0.03, Math.min(0.9, maxX)) * env.w,
      y: rand(0.08, 0.95) * env.h,
      vx: rand(-0.004, 0.004),
      vy: -rand(0.006, 0.018),
      text,
      life: stagger ? rand(0, max) : 0,
      max,
      tint: Math.random(),
      size,
      w: 0,
    }
  }

  return {
    init() {
      toks = Array.from({ length: env.mobile ? 10 : 22 }, () => make(true))
    },
    update(dt) {
      for (const t of toks) {
        t.x += t.vx * dt
        t.y += t.vy * dt
        t.life += dt
        if (t.life >= t.max) Object.assign(t, make(false))
      }
    },
    draw(ctx, alpha) {
      ctx.textBaseline = 'middle'
      for (const t of toks) {
        const a = Math.sin(Math.PI * (t.life / t.max)) * alpha
        ctx.font = `${t.size}px ${MONO}`
        if (!t.w) t.w = ctx.measureText(t.text).width
        const padX = 7
        const h = t.size + 9
        roundRectPath(ctx, t.x, t.y, t.w + padX * 2, h, 5)
        // Tinted chip body keeps the label legible on both backgrounds.
        ctx.fillStyle = mix(env, t.tint, th(env, 0.1, 0.09) * a)
        ctx.fill()
        ctx.lineWidth = 1
        ctx.strokeStyle = mix(env, t.tint, th(env, 0.6, 0.6) * a)
        ctx.stroke()
        ctx.fillStyle = mix(env, t.tint, th(env, 1, 0.95) * a)
        ctx.fillText(t.text, t.x + padX, t.y + h / 2 + 0.5)
      }
    },
  }
}

/* ─────────────────────────────────────────────────────────────
 * Scene 2 — Embedding space: scattered points converge into clusters
 * ───────────────────────────────────────────────────────────── */
function createEmbeddingsScene(env: Env): Scene {
  interface Pt {
    x: number
    y: number
    c: number
    ang: number
    rad: number
    dir: number
    r: number
  }
  interface Centroid {
    x: number
    y: number
    vx: number
    vy: number
  }
  const K = 4
  let pts: Pt[] = []
  let cents: Centroid[] = []
  let t = 0

  return {
    init() {
      t = 0
      const spread = env.mobile ? 50 : 85
      cents = Array.from({ length: K }, () => ({
        x: rand(0.15, 0.85) * env.w,
        y: rand(0.2, 0.8) * env.h,
        vx: rand(-0.012, 0.012),
        vy: rand(-0.012, 0.012),
      }))
      const n = env.mobile ? 50 : 110
      pts = Array.from({ length: n }, (_, i) => ({
        x: rand(0, env.w),
        y: rand(0, env.h),
        c: i % K,
        ang: rand(0, Math.PI * 2),
        rad: spread * Math.sqrt(Math.random()),
        dir: Math.random() < 0.5 ? -1 : 1,
        r: rand(1.6, 3),
      }))
    },
    update(dt) {
      t += dt
      for (const c of cents) {
        c.x += c.vx * dt
        c.y += c.vy * dt
        if (c.x < env.w * 0.1 || c.x > env.w * 0.9) c.vx *= -1
        if (c.y < env.h * 0.15 || c.y > env.h * 0.85) c.vy *= -1
      }
      const ease = Math.min(1, dt / 700)
      for (const p of pts) {
        const c = cents[p.c]
        const a = p.ang + t * 0.0003 * p.dir
        p.x += (c.x + Math.cos(a) * p.rad - p.x) * ease
        p.y += (c.y + Math.sin(a) * p.rad - p.y) * ease
      }
    },
    draw(ctx, alpha) {
      const maxD = env.mobile ? 45 : 60
      ctx.lineWidth = 0.7
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          if (pts[i].c !== pts[j].c) continue
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.hypot(dx, dy)
          if (d > maxD) continue
          ctx.strokeStyle = mix(
            env,
            pts[i].c / (K - 1),
            (1 - d / maxD) * th(env, 0.42, 0.5) * alpha,
          )
          ctx.beginPath()
          ctx.moveTo(pts[i].x, pts[i].y)
          ctx.lineTo(pts[j].x, pts[j].y)
          ctx.stroke()
        }
      }
      for (const p of pts) {
        ctx.fillStyle = mix(env, p.c / (K - 1), th(env, 0.95, 0.9) * alpha)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      // Centroid markers
      ctx.font = `10px ${MONO}`
      ctx.textBaseline = 'middle'
      cents.forEach((c, i) => {
        const col = mix(env, i / (K - 1), 0.95 * alpha)
        ctx.strokeStyle = col
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(c.x - 5, c.y)
        ctx.lineTo(c.x + 5, c.y)
        ctx.moveTo(c.x, c.y - 5)
        ctx.lineTo(c.x, c.y + 5)
        ctx.stroke()
        ctx.fillStyle = col
        ctx.fillText(`cluster_${i}`, c.x + 9, c.y - 9)
      })
    },
  }
}

/* ─────────────────────────────────────────────────────────────
 * Scene 3 — Attention matrix: causal-masked heatmap that re-weights row by row
 * ───────────────────────────────────────────────────────────── */
function createAttentionScene(env: Env): Scene {
  const N = 14
  let ox = 0
  let oy = 0
  let size = 0
  let cell = 0
  let timer = 0
  let vals: number[][] = []
  let tgt: number[][] = []

  const setRow = (i: number) => {
    const row: number[] = new Array(N).fill(0)
    const peaks = 1 + randInt(3)
    // Causal mask: a token only attends to itself and earlier tokens.
    for (let p = 0; p < peaks; p++) row[randInt(i + 1)] = rand(0.4, 1)
    row[i] = Math.max(row[i], rand(0.2, 0.5))
    tgt[i] = row
  }

  return {
    init() {
      size = Math.min(env.mobile ? 230 : 340, Math.min(env.w, env.h) * 0.65)
      cell = size / N
      ox = rand(0, 1) * Math.max(0, env.w - size)
      oy = 20 + rand(0, 1) * Math.max(0, env.h - size - 40)
      timer = 0
      vals = Array.from({ length: N }, () => new Array(N).fill(0))
      tgt = Array.from({ length: N }, () => new Array(N).fill(0))
      for (let i = 0; i < N; i++) setRow(i)
    },
    update(dt) {
      timer += dt
      if (timer > 450) {
        timer = 0
        setRow(randInt(N))
      }
      const ease = Math.min(1, dt / 300)
      for (let i = 0; i < N; i++) {
        for (let j = 0; j <= i; j++) vals[i][j] += (tgt[i][j] - vals[i][j]) * ease
      }
    },
    draw(ctx, alpha) {
      ctx.font = `10px ${MONO}`
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = mix(env, 0.3, 0.9 * alpha)
      ctx.fillText('softmax(QKᵀ / √d)', ox, oy - 8)
      ctx.strokeStyle = mix(env, 0.5, 0.4 * alpha)
      ctx.lineWidth = 1
      ctx.strokeRect(ox, oy, size, size)
      for (let i = 0; i < N; i++) {
        for (let j = 0; j <= i; j++) {
          const x = ox + j * cell + 1
          const y = oy + i * cell + 1
          // Resting cell: always visible, so the matrix shape never disappears.
          ctx.fillStyle = mix(env, j / (N - 1), th(env, 0.1, 0.09) * alpha)
          ctx.fillRect(x, y, cell - 2, cell - 2)
          const v = vals[i][j]
          if (v < 0.02) continue
          ctx.fillStyle = mix(env, j / (N - 1), v * th(env, 0.75, 0.65) * alpha)
          ctx.fillRect(x, y, cell - 2, cell - 2)
        }
      }
    },
  }
}

/* ─────────────────────────────────────────────────────────────
 * Scene 4 — Gradient descent: optimisers rolling down a loss surface
 * ───────────────────────────────────────────────────────────── */
function createDescentScene(env: Env): Scene {
  interface Ball {
    u: number
    v: number
    vu: number
    vv: number
    trail: { x: number; y: number }[]
    tint: number
  }
  let cx = 0
  let cy = 0
  let a = 0
  let b = 0
  let theta = 0
  let balls: Ball[] = []

  const toWorld = (u: number, v: number) => ({
    x: cx + u * Math.cos(theta) - v * Math.sin(theta),
    y: cy + u * Math.sin(theta) + v * Math.cos(theta),
  })

  return {
    init() {
      cx = rand(0.3, 0.7) * env.w
      cy = rand(0.35, 0.65) * env.h
      a = Math.min(env.w, env.h) * rand(0.3, 0.42)
      b = a * rand(0.4, 0.6)
      theta = rand(0, Math.PI)
      balls = Array.from({ length: env.mobile ? 2 : 3 }, (_, i) => {
        const ang = rand(0, Math.PI * 2)
        const R = rand(0.9, 1.3)
        return {
          u: Math.cos(ang) * a * R,
          v: Math.sin(ang) * b * R,
          vu: 0,
          vv: 0,
          trail: [],
          tint: i / 2,
        }
      })
    },
    update(dt) {
      const f = dt / 16.67
      const damp = Math.pow(0.975, f)
      for (const ball of balls) {
        // Momentum SGD on an anisotropic bowl → the familiar spiral/zig-zag descent.
        ball.vu += -0.0045 * ball.u * f
        ball.vv += -0.009 * ball.v * f
        ball.vu *= damp
        ball.vv *= damp
        ball.u += ball.vu * f
        ball.v += ball.vv * f
        ball.trail.push(toWorld(ball.u, ball.v))
        if (ball.trail.length > 140) ball.trail.shift()
      }
    },
    draw(ctx, alpha) {
      // Contour rings of the loss surface
      ctx.lineWidth = 1
      for (let k = 1; k <= 6; k++) {
        ctx.strokeStyle = mix(env, k / 6, th(env, 0.3, 0.34) * alpha)
        ctx.beginPath()
        ctx.ellipse(cx, cy, (a * k) / 6, (b * k) / 6, theta, 0, Math.PI * 2)
        ctx.stroke()
      }
      // Minimum marker
      ctx.fillStyle = mix(env, 1, alpha)
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.font = `11px ${MONO}`
      ctx.textBaseline = 'middle'
      ctx.fillText('θ*', cx + 8, cy - 8)

      for (const ball of balls) {
        const tr = ball.trail
        if (tr.length > 1) {
          ctx.lineWidth = 1.4
          for (let i = 1; i < tr.length; i++) {
            ctx.strokeStyle = mix(env, ball.tint, (i / tr.length) * th(env, 0.9, 0.85) * alpha)
            ctx.beginPath()
            ctx.moveTo(tr[i - 1].x, tr[i - 1].y)
            ctx.lineTo(tr[i].x, tr[i].y)
            ctx.stroke()
          }
          const head = tr[tr.length - 1]
          ctx.fillStyle = mix(env, ball.tint, th(env, 0.28, 0.22) * alpha)
          ctx.beginPath()
          ctx.arc(head.x, head.y, 9, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = mix(env, ball.tint, alpha)
          ctx.beginPath()
          ctx.arc(head.x, head.y, 3.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    },
  }
}

/* ─────────────────────────────────────────────────────────────
 * Scene 5 — Data rain: falling binary / hex streams
 * ───────────────────────────────────────────────────────────── */
function createRainScene(env: Env): Scene {
  interface Col {
    x: number
    y: number
    speed: number
    len: number
    chars: string[]
    tint: number
  }
  const fs = env.mobile ? 12 : 14
  const randChar = () => (Math.random() < 0.8 ? (Math.random() < 0.5 ? '0' : '1') : pick('23456789ABCDEF'.split('')))
  let cols: Col[] = []

  const makeCol = (x: number, stagger: boolean): Col => {
    const len = 8 + randInt(8)
    return {
      x,
      y: stagger ? rand(-env.h * 0.3, env.h) : -rand(0, 200),
      speed: rand(0.05, 0.14),
      len,
      chars: Array.from({ length: len }, randChar),
      tint: Math.random(),
    }
  }

  return {
    init() {
      cols = []
      const spacing = fs * 1.7
      const n = Math.floor(env.w / spacing)
      for (let i = 0; i < n; i++) {
        if (Math.random() < 0.35) cols.push(makeCol(i * spacing + spacing / 2, true))
      }
    },
    update(dt) {
      for (const c of cols) {
        c.y += c.speed * dt
        if (c.y - c.len * fs > env.h) Object.assign(c, makeCol(c.x, false))
        if (Math.random() < dt * 0.003) c.chars[randInt(c.len)] = randChar()
      }
    },
    draw(ctx, alpha) {
      ctx.font = `${fs}px ${MONO}`
      ctx.textBaseline = 'top'
      ctx.textAlign = 'center'
      for (const c of cols) {
        for (let k = 0; k < c.len; k++) {
          const y = c.y - k * fs
          if (y < -fs || y > env.h) continue
          const fade = 1 - k / c.len
          // Bright head, tail fades — tail floor stays visible on both themes.
          const a = (k === 0 ? th(env, 1, 0.95) : th(env, 0.6, 0.6) * fade) * alpha
          ctx.fillStyle = mix(env, c.tint, a)
          ctx.fillText(c.chars[k], c.x, y)
        }
      }
      ctx.textAlign = 'left'
    },
  }
}

/* ─────────────────────────────────────────────────────────────
 * Scene 6 — Terminal: model / agent log lines typing themselves out
 * ───────────────────────────────────────────────────────────── */
function createTerminalScene(env: Env): Scene {
  interface Block {
    x: number
    y: number
    line: string
    cps: number
    t: number
    tint: number
  }
  const LINES = [
    '>>> model.generate(prompt, max_tokens=256)',
    'retrieving top-k=5 chunks from vector store...',
    'loss: 0.0231 | epoch 12/50 | lr: 3e-4',
    'tokens/sec: 84.2   latency: 118ms',
    '{"role": "assistant", "content": "Here is the summary..."}',
    'embedding.shape = (1, 1536)',
    'agent.plan() -> [search, read, summarize]',
    'cuda:0 | mem 14.2/24 GB | util 87%',
    'validation accuracy: 0.943',
    'chain = prompt | llm | parser',
    'rerank(docs, query) -> score 0.91',
    'fine-tuning: step 1200/5000 ...',
  ]
  const HOLD = 2800
  const FADE_OUT = 900
  const fs = env.mobile ? 10 : 12
  let blocks: Block[] = []

  const make = (stagger: boolean): Block => {
    // Only pick lines that fit the viewport width, so nothing is typed off-screen on narrow phones.
    const fitting = LINES.filter((l) => (l.length + 1) * fs * 0.6 <= env.w * 0.94)
    const line = pick(fitting.length ? fitting : [LINES.reduce((a, b) => (a.length <= b.length ? a : b))])
    const est = line.length * fs * 0.6
    const maxX = Math.max(0.03, 1 - est / env.w - 0.02)
    return {
      x: rand(0.02, maxX) * env.w,
      y: rand(0.08, 0.94) * env.h,
      line,
      cps: rand(28, 55),
      t: stagger ? -rand(0, 4000) : -rand(0, 1500),
      tint: Math.random(),
    }
  }
  const total = (b: Block) => b.line.length * b.cps + HOLD + FADE_OUT

  return {
    init() {
      blocks = Array.from({ length: env.mobile ? 3 : 6 }, () => make(true))
    },
    update(dt) {
      for (const b of blocks) {
        b.t += dt
        if (b.t > total(b)) Object.assign(b, make(false))
      }
    },
    draw(ctx, alpha) {
      ctx.font = `${fs}px ${MONO}`
      ctx.textBaseline = 'middle'
      for (const b of blocks) {
        if (b.t < 0) continue
        const typeDur = b.line.length * b.cps
        const typed = Math.min(b.line.length, Math.floor(b.t / b.cps))
        const fade = b.t > typeDur + HOLD ? 1 - (b.t - typeDur - HOLD) / FADE_OUT : 1
        const cursorOn = typed < b.line.length || Math.floor(b.t / 500) % 2 === 0
        ctx.fillStyle = mix(env, b.tint, th(env, 0.95, 0.9) * fade * alpha)
        ctx.fillText(b.line.slice(0, typed) + (cursorOn ? '▌' : ''), b.x, b.y)
      }
    },
  }
}

/* ─────────────────────────────────────────────────────────────
 * Manager
 * ───────────────────────────────────────────────────────────── */

interface Active {
  scene: Scene
  t: number
  dur: number
  spawnedNext: boolean
}

const FADE = 1800
const smooth = (x: number) => {
  const c = Math.max(0, Math.min(1, x))
  return c * c * (3 - 2 * c)
}

interface AIBackgroundProps {
  /** Extra classes merged onto the canvas element (e.g. z-index overrides). */
  className?: string
}

/**
 * Global AI-themed background.
 *
 * A fixed, full-viewport Canvas 2D layer mounted once in the root layout.
 * It plays a random sequence of AI-related animations, crossfading from one
 * to the next so there is always something different on screen:
 *
 *   • LLM token chips drifting upward
 *   • Embedding-space points converging into clusters
 *   • Causal-masked attention heatmap
 *   • Gradient descent on a loss surface
 *   • Binary / hex data rain
 *   • Terminal log lines typing themselves out
 *
 * All animation state lives in closures — no React state per frame.
 * Pauses when the tab is hidden and renders a single static frame when the
 * user prefers reduced motion. Switching Light/Dark recolours the running
 * animation in place (no restart).
 */
export function AIBackground({ className = '' }: AIBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  // Shared with the theme effect below so a theme change can recolour the live animation.
  const initialTheme = useRef(resolvedTheme)
  const envRef = useRef<Env | null>(null)
  const repaintRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const env: Env = {
      w: window.innerWidth,
      h: window.innerHeight,
      mobile: window.innerWidth < 640,
      ...themeColors(initialTheme.current !== 'light'),
    }
    envRef.current = env

    const scenes: Scene[] = [
      createTokensScene(env),
      createEmbeddingsScene(env),
      createAttentionScene(env),
      createDescentScene(env),
      createRainScene(env),
      createTerminalScene(env),
    ]

    let active: Active[] = []
    let last: Scene | null = null
    let animationId: number | null = null
    let running = false
    let lastTime = performance.now()

    function spawn() {
      const candidates = scenes.filter((s) => s !== last && !active.some((a) => a.scene === s))
      const scene = pick(candidates)
      scene.init()
      last = scene
      active.push({ scene, t: 0, dur: rand(9000, 14000), spawnedNext: false })
    }

    // Reduced motion: a single settled frame at full opacity, no loop.
    function paintStatic() {
      ctx!.clearRect(0, 0, env.w, env.h)
      active[0].scene.draw(ctx!, 1)
    }
    function settleStatic() {
      for (let i = 0; i < 150; i++) active[0].scene.update(16)
      paintStatic()
    }

    let lastW = 0
    let lastH = 0

    function resize() {
      const w = window.innerWidth
      const rawH = window.innerHeight
      // Mobile browsers fire `resize` whenever the URL bar collapses/expands while
      // scrolling: width stays put and height moves by ~50–120px. That isn't a real
      // layout change, so keep the larger height (the canvas keeps covering the
      // whole screen) and do NOT re-init the scenes — doing so on every scroll
      // would restart the animation constantly.
      const heightOnly = lastW === w && lastH !== 0 && Math.abs(rawH - lastH) < 160
      const h = heightOnly ? Math.max(rawH, lastH) : rawH
      if (heightOnly && h === lastH) return
      lastW = w
      lastH = h

      env.w = w
      env.h = h
      env.mobile = w < 640
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.floor(env.w * dpr)
      canvas!.height = Math.floor(env.h * dpr)
      canvas!.style.width = `${env.w}px`
      canvas!.style.height = `${env.h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!heightOnly) for (const a of active) a.scene.init()
      if (prefersReducedMotion && active.length) {
        if (heightOnly) paintStatic()
        else settleStatic()
      }
    }

    function step(dt: number) {
      for (const a of [...active]) {
        a.t += dt
        a.scene.update(dt)
        // Start the next scene while this one is fading out → smooth crossfade.
        if (!a.spawnedNext && a.t > a.dur - FADE) {
          a.spawnedNext = true
          spawn()
        }
      }
      active = active.filter((a) => a.t < a.dur)
    }

    function draw() {
      ctx!.clearRect(0, 0, env.w, env.h)
      for (const a of active) {
        const alpha = smooth(a.t / FADE) * smooth((a.dur - a.t) / FADE)
        if (alpha > 0.001) a.scene.draw(ctx!, alpha)
      }
    }

    function loop(now: number) {
      if (!running) return
      const dt = Math.min(now - lastTime, 48)
      lastTime = now
      step(dt)
      draw()
      animationId = requestAnimationFrame(loop)
    }

    function start() {
      running = true
      lastTime = performance.now()
      animationId = requestAnimationFrame(loop)
    }
    function stop() {
      running = false
      if (animationId) cancelAnimationFrame(animationId)
      animationId = null
    }

    function handleVisibility() {
      if (document.hidden) stop()
      else if (!prefersReducedMotion) start()
    }

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null
    function handleResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resize, 150)
    }

    resize()
    spawn()

    if (prefersReducedMotion) {
      settleStatic()
      // The loop isn't running, so a theme change has to repaint the still frame itself.
      repaintRef.current = paintStatic
    } else {
      start()
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      stop()
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      envRef.current = null
      repaintRef.current = null
    }
  }, [])

  // Theme switch: swap the palette on the live Env. Scenes read it every frame,
  // so the running animation recolours instantly without restarting.
  useEffect(() => {
    const env = envRef.current
    if (!env) return
    Object.assign(env, themeColors(resolvedTheme !== 'light'))
    repaintRef.current?.()
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 h-screen w-screen pointer-events-none -z-10 ${className}`}
    />
  )
}
