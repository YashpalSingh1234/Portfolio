import { Analytics } from '@vercel/analytics/react'

/**
 * Vercel Web Analytics — zero-config, privacy-friendly pageview tracking.
 * Requires the `@vercel/analytics` package (added to package.json) and,
 * once deployed, Analytics enabled for this project in the Vercel dashboard.
 * Safe to render unconditionally; it no-ops outside of Vercel deployments.
 */
export function VercelAnalytics() {
  return <Analytics />
}
