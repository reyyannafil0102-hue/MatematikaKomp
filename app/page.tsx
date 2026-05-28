'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import PengertianSection from '@/components/sections/PengertianSection'
import DomainSection from '@/components/sections/DomainSection'
import CaraHitungSection from '@/components/sections/CaraHitungSection'
import SifatSection from '@/components/sections/SifatSection'
import GrafikSection from '@/components/sections/GrafikSection'
import ContohSoalSection from '@/components/sections/ContohSoalSection'
import KuisSection from '@/components/sections/KuisSection'
import RangkumanSection from '@/components/sections/RangkumanSection'

export default function Home() {
  return (
    <main className="relative z-10 overflow-hidden">
      <Navbar />
      <HeroSection />
      <PengertianSection />
      <DomainSection />
      <CaraHitungSection />
      <SifatSection />
      <GrafikSection />
      <ContohSoalSection />
      <KuisSection />
      <RangkumanSection />
      <Footer />
    </main>
  )
}
