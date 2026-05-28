'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, BookOpen } from 'lucide-react'

const navLinks = [
  { label: 'Pengertian', href: '#pengertian' },
  { label: 'Domain', href: '#domain' },
  { label: 'Cara Hitung', href: '#cara-hitung' },
  { label: 'Sifat', href: '#sifat' },
  { label: 'Grafik', href: '#grafik' },
  { label: 'Contoh', href: '#contoh' },
  { label: 'Kuis', href: '#kuis' },
]

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

function smoothScrollTo(targetY: number, duration = 900) {
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()
  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeOutQuart(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function scrollToSection(href: string) {
  const el = document.querySelector(href)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 64
  smoothScrollTo(top, 900)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-100">
        <motion.div
          className="h-full bg-gray-900"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0.5 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.button
            onClick={() => smoothScrollTo(0, 800)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-black text-gray-900">f ∘ g</span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const id = link.href.slice(1)
              const isActive = activeSection === id
              return (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3 py-1.5 text-sm rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'text-gray-900 font-semibold bg-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gray-900"
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden sm:flex items-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavClick('#pengertian')}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-900 hover:bg-gray-700 text-white transition-colors"
            >
              Mulai Belajar
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-white border-b border-gray-200"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map(link => {
                  const id = link.href.slice(1)
                  const isActive = activeSection === id
                  return (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gray-100 text-gray-900 font-semibold'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </button>
                  )
                })}
                <div className="pt-2">
                  <button
                    onClick={() => handleNavClick('#pengertian')}
                    className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-gray-900 hover:bg-gray-700 text-white transition-colors"
                  >
                    Mulai Belajar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
