import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Why from '@/components/Why'
import Mission from '@/components/Mission'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Why />
        <Mission />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
