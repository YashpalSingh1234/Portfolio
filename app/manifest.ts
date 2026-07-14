import type { MetadataRoute } from 'next'
import { PERSONAL } from '@/lib/data'
import { SITE_NAME } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: PERSONAL.name,
    description:
      'AI Engineer portfolio — LLM applications, RAG systems, computer vision, and MLOps projects.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07070f',
    theme_color: '#6366f1',
  }
}
