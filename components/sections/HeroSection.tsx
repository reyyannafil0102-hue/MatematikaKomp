'use client'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import FormulaBlock from '@/components/ui/FormulaBlock'

function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4) }

function smoothScrollTo(href: string, duration = 900) {
  const el = document.querySelector(href)
  if (!el) return
  const targetY = el.getBoundingClientRect().top + window.scrollY - 64
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()
  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeOutQuart(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-16 bg-white">
      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 text-sm text-gray-500 mb-8"
        >
          <span>Matematika SMA/SMK — Kelas XI</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black leading-tight mb-6 text-gray-900 tracking-tight"
        >
          Fungsi<br />Komposisi
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Gabungkan dua fungsi menjadi satu. Pahami cara kerjanya secara visual dan interaktif — lengkap dengan grafik, contoh soal, dan kuis.
        </motion.p>

        {/* Formula cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <GlassCard className="w-44 text-center border-gray-200" hover={false}>
              <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Fungsi f</div>
              <FormulaBlock math="f(x) = 2x + 1" size="sm" />
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="hidden sm:flex items-center"
          >
            <svg width="40" height="20" viewBox="0 0 40 20">
              <path d="M0 10 L30 10 M25 5 L35 10 L25 15" stroke="#999" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}>
            <GlassCard className="w-52 text-center border-gray-900 shadow-md" hover={false}>
              <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Komposisi</div>
              <FormulaBlock math="(f \circ g)(x)" display size="lg" />
              <div className="text-xs text-gray-400 mt-2">= f(g(x))</div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="hidden sm:flex items-center rotate-180"
          >
            <svg width="40" height="20" viewBox="0 0 40 20">
              <path d="M0 10 L30 10 M25 5 L35 10 L25 15" stroke="#999" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
            <GlassCard className="w-44 text-center border-gray-200" hover={false}>
              <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Fungsi g</div>
              <FormulaBlock math="g(x) = x^2" size="sm" />
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => smoothScrollTo('#pengertian')}
            className="px-8 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-semibold text-base transition-colors"
          >
            Pelajari Sekarang
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => smoothScrollTo('#kuis')}
            className="px-8 py-3.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-base transition-colors"
          >
            Uji Pemahaman
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        onClick={() => smoothScrollTo('#pengertian')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-gray-700 transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  )
}
