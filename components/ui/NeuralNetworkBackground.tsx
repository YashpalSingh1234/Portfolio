'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface NeuralNetworkBackgroundProps {
  /** Extra classes merged onto the canvas element (e.g. z-index overrides). */
  className?: string
  /** Enable subtle cursor interaction on non-touch devices. */
  interactive?: boolean
}

interface Neuron {
  layer: number
  /** "Home" position the neuron gently bobs and springs back around. */
  baseX: number
  baseY: number
  x: number
  y: number
  /** Cursor-induced offset, eased back to zero every frame. */
  offsetX: number
  offsetY: number
  r: number
  phase: number
  bobSpeed: number
  bobAmp: number
  /** 0–1, spikes when a pulse arrives and decays smoothly — the "firing" glow. */
  activation: number
}

interface Synapse {
  a: number
  b: number
  weight: number
  /** 0–1 trailing glow left behind by pulses that recently traveled this line. */
  heat: number
}

interface Pulse {
  synapse: number
  t: number
  speed: number
  delay: number
}

const LAYER_PRESETS = {
  // [neurons per layer], input layer first, output layer last
  mobile: [3, 4, 4, 3],
  tablet: [4, 6, 7, 6, 4],
  desktop: [5, 8, 9, 8, 6, 4],
}

/**
 * Global perceptron / neural-network visualization.
 *
 * Fixed full-viewport Canvas 2D background, mounted once at the root
 * layout. Renders a layered network (input → hidden → output) with
 * forward-pass activation pulses traveling along adjacent-layer
 * connections, rather than a generic drifting particle cloud.
 *
 * All animation state lives in refs/closures — no React state per frame.
 * Respects `prefers-reduced-motion` (static single frame) and disables
 * cursor interaction on touch devices.
 */
export function NeuralNetworkBackground({
  className = '',
  interactive = true,
}: NeuralNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    const canInteract = interactive && !isTouchDevice && !prefersReducedMotion
    const isDark = resolvedTheme !== 'light'

    // Brand indigo, blended subtly toward cyan across layers (input → output)
    // so the network reads as coherent-but-not-flat. Kept restrained.
    const INDIGO: [number, number, number] = isDark ? [129, 140, 248] : [79, 70, 229]
    const CYAN: [number, number, number] = isDark ? [56, 189, 248] : [14, 116, 144]

    function lerpColor(a: [number, number, number], b: [number, number, number], t: number) {
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t] as [
        number,
        number,
        number,
      ]
    }

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let neurons: Neuron[] = []
    let synapses: Synapse[] = []
    let pulses: Pulse[] = []
    let layerCounts: number[] = LAYER_PRESETS.desktop
    let animationId: number | null = null
    let running = false
    let lastTime = performance.now()
    let elapsed = 0
    let nextWaveAt = 1500 + Math.random() * 1500

    const PULSE_CAP = 160

    const mouse = { x: -9999, y: -9999, active: false }

    function layerCountsFor(w: number): number[] {
      if (w < 640) return LAYER_PRESETS.mobile
      if (w < 1024) return LAYER_PRESETS.tablet
      return LAYER_PRESETS.desktop
    }

    function buildNetwork() {
      layerCounts = layerCountsFor(width)
      neurons = []
      synapses = []
      pulses = []

      const marginX = width * (width < 640 ? 0.12 : 0.08)
      const marginY = height * 0.12
      const usableW = Math.max(width - marginX * 2, 1)
      const usableH = Math.max(height - marginY * 2, 1)
      const layerGap = layerCounts.length > 1 ? usableW / (layerCounts.length - 1) : 0
      const isMobile = width < 640

      const layerStartIndex: number[] = []
      let cursor = 0
      for (const count of layerCounts) {
        layerStartIndex.push(cursor)
        cursor += count
        const layerIndex = layerStartIndex.length - 1
        const x = marginX + layerGap * layerIndex
        const step = count > 1 ? usableH / (count - 1) : 0
        const yStart = count > 1 ? marginY : marginY + usableH / 2

        for (let i = 0; i < count; i++) {
          const y = count > 1 ? yStart + step * i : yStart
          neurons.push({
            layer: layerIndex,
            baseX: x,
            baseY: y,
            x,
            y,
            offsetX: 0,
            offsetY: 0,
            r: (isMobile ? 2 : 3) + Math.random() * (isMobile ? 1.5 : 2.5),
            phase: Math.random() * Math.PI * 2,
            bobSpeed: 0.4 + Math.random() * 0.5,
            bobAmp: (isMobile ? 2 : 4) + Math.random() * (isMobile ? 2 : 4),
            activation: 0,
          })
        }
      }

      // Connections between adjacent layers only.
      for (let l = 0; l < layerCounts.length - 1; l++) {
        const startA = layerStartIndex[l]
        const countA = layerCounts[l]
        const startB = layerStartIndex[l + 1]
        const countB = layerCounts[l + 1]
        for (let i = 0; i < countA; i++) {
          for (let j = 0; j < countB; j++) {
            synapses.push({
              a: startA + i,
              b: startB + j,
              weight: 0.35 + Math.random() * 0.65,
              heat: 0,
            })
          }
        }
      }
    }

    // Outgoing synapse indices per neuron, precomputed for fast pulse spawning.
    let outgoing: number[][] = []
    function buildOutgoingIndex() {
      outgoing = neurons.map(() => [])
      synapses.forEach((s, idx) => outgoing[s.a].push(idx))
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNetwork()
      buildOutgoingIndex()
    }

    function triggerWave() {
      const inputCount = layerCounts[0]
      for (let i = 0; i < inputCount; i++) {
        const n = neurons[i]
        n.activation = 1
        for (const synIdx of outgoing[i]) {
          if (Math.random() < 0.75 && pulses.length < PULSE_CAP) {
            pulses.push({ synapse: synIdx, t: 0, speed: 0.55 + Math.random() * 0.5, delay: Math.random() * 150 })
          }
        }
      }
    }

    function step(frameFactorMs: number) {
      elapsed += frameFactorMs

      if (elapsed >= nextWaveAt) {
        triggerWave()
        nextWaveAt = elapsed + 2500 + Math.random() * 2500
      }

      // Neuron positions: gentle bob around home + spring-eased cursor offset.
      for (const n of neurons) {
        n.x = n.baseX + Math.sin(elapsed * 0.001 * n.bobSpeed + n.phase) * n.bobAmp * 0.4
        n.y = n.baseY + Math.cos(elapsed * 0.001 * n.bobSpeed * 0.8 + n.phase) * n.bobAmp

        if (canInteract && mouse.active) {
          const dx = n.baseX - mouse.x
          const dy = n.baseY - mouse.y
          const d2 = dx * dx + dy * dy
          const radius = 130
          if (d2 < radius * radius && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const force = (1 - d / radius) * 10
            n.offsetX += (dx / d) * force * 0.06
            n.offsetY += (dy / d) * force * 0.06
          }
        }
        // Spring back to zero offset.
        n.offsetX *= 0.9
        n.offsetY *= 0.9
        n.x += n.offsetX
        n.y += n.offsetY

        n.activation *= 0.94
      }

      for (const s of synapses) s.heat *= 0.92

      // Advance pulses; spawn the next hop when one arrives.
      const finished: number[] = []
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i]
        if (p.delay > 0) {
          p.delay -= frameFactorMs
          continue
        }
        p.t += (frameFactorMs / 1000) * p.speed
        const syn = synapses[p.synapse]
        syn.heat = Math.max(syn.heat, Math.min(1, p.t * 3))
        if (p.t >= 1) {
          finished.push(i)
          const dest = syn.b
          const destNeuron = neurons[dest]
          destNeuron.activation = 1
          if (destNeuron.layer < layerCounts.length - 1 && pulses.length < PULSE_CAP) {
            for (const synIdx of outgoing[dest]) {
              if (Math.random() < 0.6 && pulses.length < PULSE_CAP) {
                pulses.push({
                  synapse: synIdx,
                  t: 0,
                  speed: 0.55 + Math.random() * 0.5,
                  delay: Math.random() * 120,
                })
              }
            }
          }
        }
      }
      if (finished.length) {
        for (let i = finished.length - 1; i >= 0; i--) pulses.splice(finished[i], 1)
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      const layerSpan = Math.max(layerCounts.length - 1, 1)

      // Synapses
      for (const s of synapses) {
        const na = neurons[s.a]
        const nb = neurons[s.b]
        const t = na.layer / layerSpan
        const [r, g, b] = lerpColor(INDIGO, CYAN, t)
        const baseAlpha = (isDark ? 0.1 : 0.08) * s.weight
        const alpha = baseAlpha + s.heat * (isDark ? 0.55 : 0.4)
        ctx!.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${Math.min(alpha, 0.9)})`
        ctx!.lineWidth = s.heat > 0.05 ? 1.1 : 0.7
        ctx!.beginPath()
        ctx!.moveTo(na.x, na.y)
        ctx!.lineTo(nb.x, nb.y)
        ctx!.stroke()
      }

      // Pulses
      for (const p of pulses) {
        if (p.delay > 0) continue
        const syn = synapses[p.synapse]
        const na = neurons[syn.a]
        const nb = neurons[syn.b]
        const x = na.x + (nb.x - na.x) * p.t
        const y = na.y + (nb.y - na.y) * p.t
        const t = na.layer / layerSpan
        const [r, g, b] = lerpColor(INDIGO, CYAN, t)
        const fade = Math.sin(Math.min(p.t, 1) * Math.PI)
        ctx!.beginPath()
        ctx!.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${(isDark ? 0.95 : 0.75) * fade})`
        ctx!.arc(x, y, isDark ? 1.8 : 1.5, 0, Math.PI * 2)
        ctx!.fill()
      }

      // Neurons
      for (const n of neurons) {
        const t = n.layer / layerSpan
        const [r, g, b] = lerpColor(INDIGO, CYAN, t)
        const breathe = 0.12 * Math.sin(elapsed * 0.0006 * n.bobSpeed + n.phase)
        const glowBoost = n.activation
        const coreAlpha = Math.min((isDark ? 0.6 : 0.65) + breathe + glowBoost * 0.35, 1)

        // Soft glow
        const glowR = n.r * (isDark ? 4.5 : 3)
        const glow = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR * (1 + glowBoost * 0.6))
        const glowAlpha = (isDark ? 0.22 : 0.12) + glowBoost * (isDark ? 0.35 : 0.18)
        glow.addColorStop(0, `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${glowAlpha})`)
        glow.addColorStop(1, `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0)`)
        ctx!.beginPath()
        ctx!.fillStyle = glow
        ctx!.arc(n.x, n.y, glowR * (1 + glowBoost * 0.6), 0, Math.PI * 2)
        ctx!.fill()

        // Core
        ctx!.beginPath()
        ctx!.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${coreAlpha})`
        ctx!.arc(n.x, n.y, n.r * (1 + glowBoost * 0.25), 0, Math.PI * 2)
        ctx!.fill()
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

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    function handleMouseLeave() {
      mouse.active = false
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

    if (canInteract) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseleave', handleMouseLeave)
    }
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    if (prefersReducedMotion) {
      // Static single frame — a fully formed network, no animation loop.
      draw()
    } else {
      start()
    }

    return () => {
      stop()
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [resolvedTheme, interactive])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 h-screen w-screen pointer-events-none -z-10 ${className}`}
    />
  )
}
