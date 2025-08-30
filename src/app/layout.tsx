import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import { THEME_INIT_SNIPPET } from 'src/lib/theme.init'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Doan Nguyen — Portfolio',
  description: 'Portfolio terminal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SNIPPET}
        </Script>
      </head>
      <body suppressHydrationWarning className={`${inter.className} bg-bg text-fg antialiased`}>
        {children}
      </body>
    </html>
  )
}
