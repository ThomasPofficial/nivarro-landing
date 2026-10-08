import type { Metadata } from 'next'
import './about.css'

export const metadata: Metadata = {
  title: 'About — Nivarro',
  description:
    'Nivarro is built by two co-founders, Thomas Piacentine and Neel Patil, who are close to the problem of private and charter school funding.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <div className="ab">{children}</div>
}
