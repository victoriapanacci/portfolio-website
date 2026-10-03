import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { PageEndCta } from '@/components/SiteChrome'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // Inter's optical-size axis: tighter, higher-contrast glyphs at display
  // sizes and more open letterforms for 11-12px labels.
  axes: ['opsz'],
})

export const metadata: Metadata = {
  title: 'Victoria Panacci',
  description:
    'Senior Product Designer focused on high-trust, complex digital products.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0c0810',
}

/**
 * Every page shares the same chrome: grain overlay, header, the page
 * itself, the CTA band, and the footer. Pages only render their sections.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-ink`}>
      <body className="antialiased font-sans">
        <div className="grain" aria-hidden="true" />
        <div className="page" id="top">
          <SiteHeader />
          <main>{children}</main>
          <PageEndCta />
          <SiteFooter />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
