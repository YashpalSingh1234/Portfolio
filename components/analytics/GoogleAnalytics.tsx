import Script from 'next/script'

/**
 * GA4 loader — deliberately a no-op until NEXT_PUBLIC_GA_ID is set.
 *
 * To enable:
 *   1. Create a GA4 property and copy its Measurement ID (looks like "G-XXXXXXXXXX").
 *   2. Add NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX to your Vercel project's Environment
 *      Variables (and to .env.local for development).
 *   3. Redeploy. No code changes needed — this component enables itself.
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  if (!gaId) return null

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  )
}
