import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './about.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'About — Nivarro',
  description:
    'Nivarro is built by two co-founders, Thomas Piacentine and Neel Patil, who are close to the problem of private and charter school funding.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${inter.variable} ab`}>{children}</div>
}
