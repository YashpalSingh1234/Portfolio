import { ImageResponse } from 'next/og'
import { PERSONAL } from '@/lib/data'
import { getOgFonts } from '@/lib/fonts/og-fonts'

// Served at /opengraph-image and used for LinkedIn, X (Twitter), Facebook,
// Slack, etc. Regenerated at build/request time — no static asset to keep in sync.
//
// IMPORTANT: fonts is passed explicitly (see lib/fonts/og-fonts.ts) so
// ImageResponse never falls back to its bundled default font — that
// fallback is what throws `TypeError: Invalid URL` on Windows.
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CHIPS = ['Python', 'PyTorch', 'LangChain', 'RAG', 'LLMs', 'MLOps']

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#07070f',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.35) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 90%, rgba(168,85,247,0.18) 0%, transparent 60%)',
          fontFamily: 'JetBrains Mono',
        }}
      >
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'rgba(99,102,241,0.14)',
              border: '1px solid rgba(99,102,241,0.35)',
              color: '#a5b4fc',
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            Y
          </div>
          <span style={{ color: '#a0a0c8', fontSize: 24, letterSpacing: 1 }}>yashpal.singh</span>
        </div>

        {/* Name */}
        <div style={{ display: 'flex', color: '#f0f0f8', fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>
          {PERSONAL.name}
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            marginTop: 14,
            fontSize: 38,
            fontWeight: 700,
            backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #a855f7 50%, #ec4899 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          AI Engineer · LLM · RAG · MLOps
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', marginTop: 22, fontSize: 26, color: '#a0a0c8', maxWidth: 880 }}>
          {PERSONAL.tagline}
        </div>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40 }}>
          {CHIPS.map((chip) => (
            <div
              key={chip}
              style={{
                display: 'flex',
                padding: '8px 18px',
                borderRadius: 8,
                border: '1px solid rgba(99,102,241,0.3)',
                background: 'rgba(13,13,26,0.6)',
                color: '#c7d2fe',
                fontSize: 20,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: getOgFonts() }
  )
}
