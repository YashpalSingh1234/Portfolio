import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { PERSONAL } from '@/lib/data'
import { ALL_SKILLS, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL_LINKS } from '@/lib/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${PERSONAL.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: PERSONAL.name, url: SITE_URL }],
  creator: PERSONAL.name,
  publisher: PERSONAL.name,
  applicationName: SITE_NAME,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${PERSONAL.name} — AI Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
    // Replace with the real handle if/when one exists.
    creator: '@yashpal',
  },

  manifest: '/manifest.webmanifest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Add real verification tokens here when available, e.g.:
  // verification: { google: 'xxxx', other: { 'msvalidate.01': 'xxxx' } },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#07070f' },
  ],
}

// Person structured data (JSON-LD) — helps Google show a knowledge panel
// and rich results for the site owner.
function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL.name,
    url: SITE_URL,
    image: `${SITE_URL}/images/profile/yash-kushwah.jpg`,
    jobTitle: PERSONAL.title,
    description: PERSONAL.shortBio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSONAL.location,
    },
    email: `mailto:${PERSONAL.email}`,
    sameAs: SOCIAL_LINKS,
    knowsAbout: ALL_SKILLS,
    worksFor: {
      '@type': 'Organization',
      name: 'Phibonacci Learning',
    },
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonJsonLd />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
          >
            Skip to content
          </a>
          <div className="noise-overlay relative min-h-screen">
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* Disabled until NEXT_PUBLIC_GA_ID is set in the environment. */}
        <GoogleAnalytics />
        {/* Vercel Web Analytics — Next.js App Router entrypoint, zero-config. */}
        <Analytics />
      </body>
    </html>
  )
}
