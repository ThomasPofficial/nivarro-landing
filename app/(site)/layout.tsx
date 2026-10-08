import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import ScrollReveal from '@/components/site/ScrollReveal'
import './site.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})

export const viewport = { themeColor: '#FFFFFF' }

export const metadata: Metadata = {
  title: 'Nivarro — Alumni engagement and fundraising for private and charter schools',
  description:
    "Turn your alumni network into ongoing mentorship and reliable annual giving: a private community, fundraising pages and a real-time admin dashboard, funded straight to your school's bank account.",
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${newsreader.variable} nv`}>
      <ScrollReveal />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
