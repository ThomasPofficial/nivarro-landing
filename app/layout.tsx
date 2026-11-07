import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Nivarro — The alumni engagement platform for public, charter and private schools',
  description: 'Turn your alumni network into ongoing mentorship and reliable annual giving — a private community, verified mentorship, and a real-time admin dashboard. Gifts go straight to your school through its own giving page. Nivarro never touches the money.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* Relative href: resolves to the current page's own machine view (see middleware.ts). */}
        <link rel="alternate" type="text/markdown" href="?view=machine" title="This page as Markdown" />
        {/* Warm up the connection so "Sign in" opens app.nivarro.co faster */}
        <link rel="preconnect" href="https://app.nivarro.co" />
        <link rel="dns-prefetch" href="https://app.nivarro.co" />
      </head>
      <body>{children}</body>
    </html>
  )
}
