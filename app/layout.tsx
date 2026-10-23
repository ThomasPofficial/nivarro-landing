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
  description: 'Turn your alumni network into ongoing mentorship and reliable annual giving — a private community, verified mentorship, and a real-time admin dashboard, funded straight to your school\'s bank account.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
