import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
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
  title: 'Yashpal Singh — AI Engineer',
  description:
    'AI Engineer with 2 years R&D experience building production-grade ML pipelines, LLM applications, and RAG systems. Specialising in applied AI, generative AI, and MLOps.',
  keywords: [
    'AI Engineer',
    'Machine Learning Engineer',
    'LLM',
    'RAG',
    'Generative AI',
    'MLOps',
    'PyTorch',
    'LangChain',
    'FastAPI',
    'Python',
  ],
  authors: [{ name: 'Yashpal Singh' }],
  creator: 'Yashpal Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yashpal.dev',
    title: 'Yashpal Singh — AI Engineer',
    description:
      'AI Engineer building production-grade AI systems. LLM, RAG, MLOps, and applied machine learning.',
    siteName: 'Yashpal Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: ' Yashpal Singh — AI Engineer',
    description: 'AI Engineer building production-grade AI systems.',
    creator: '@yashpal',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#07070f' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="noise-overlay relative min-h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
