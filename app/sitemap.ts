import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// The site is currently a single-page app (sections are anchor-linked),
// so there's one canonical URL today. Add more entries here if/when
// standalone routes (e.g. /blog/[slug]) are introduced.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
