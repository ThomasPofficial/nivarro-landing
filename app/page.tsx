import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SectionDivider from '@/components/SectionDivider'
import Features from '@/components/Features'
import Mission from '@/components/Mission'
import VirtueBand from '@/components/VirtueBand'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionDivider />
      <Features />
      <Mission />
      <VirtueBand />
      <CTA />
      <Footer />
    </>
  )
}
