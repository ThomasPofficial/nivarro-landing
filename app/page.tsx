import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import DoctrineStrip from '@/components/DoctrineStrip'
import SectionDivider from '@/components/SectionDivider'
import Features from '@/components/Features'
import VirtueBand from '@/components/VirtueBand'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DoctrineStrip />
      <SectionDivider />
      <Features />
      <VirtueBand />
      <CTA />
      <Footer />
    </>
  )
}
