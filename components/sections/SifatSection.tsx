'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import FormulaBlock from '@/components/ui/FormulaBlock'
import { Shuffle, Link, User, RotateCcw, ChevronDown } from 'lucide-react'

const properties = [
  {
    icon: Shuffle,
    title: 'Tidak Komutatif',
    subtitle: 'Urutan sangat berpengaruh',
    formula: 'f \\circ g \\neq g \\circ f',
    description: 'Umumnya, menukar urutan fungsi menghasilkan hasil yang berbeda.',
    detail: 'Berbeda dengan penjumlahan (a+b = b+a), komposisi fungsi tidak bersifat komutatif. Urutan f dan g menentukan hasil yang berbeda.',
    hasToggle: true,
    toggleContent: {
      left:  { label: '(f∘g)(x)', formula: 'f(g(x)) = f(x^2) = 2x^2 + 1' },
      right: { label: '(g∘f)(x)', formula: 'g(f(x)) = g(2x+1) = (2x+1)^2' },
      note: 'Dengan f(x) = 2x+1, g(x) = x²',
      conclusion: '2x^2 + 1 \\neq (2x+1)^2',
    },
    example: null,
  },
  {
    icon: Link,
    title: 'Asosiatif',
    subtitle: 'Pengelompokan bebas',
    formula: 'f \\circ (g \\circ h) = (f \\circ g) \\circ h',
    description: 'Pengelompokan komposisi tidak mempengaruhi hasil akhir.',
    detail: 'Sifat asosiatif memungkinkan kita menghitung komposisi tiga fungsi atau lebih dengan cara yang paling mudah.',
    hasToggle: false,
    example: {
      given: 'f(x) = x+1,\\; g(x) = 2x,\\; h(x) = x^2',
      left:  { label: 'f∘(g∘h)', steps: ['g \\circ h: 2x^2', 'f(2x^2) = 2x^2 + 1'] },
      right: { label: '(f∘g)∘h', steps: ['f \\circ g: 2x+1', '(2x^2)+1 = 2x^2+1'] },
    },
  },
  {
    icon: User,
    title: 'Fungsi Identitas',
    subtitle: 'Tidak mengubah fungsi',
    formula: 'f \\circ I = I \\circ f = f',
    description: 'Komposisi dengan fungsi identitas I(x) = x tidak mengubah fungsi apapun.',
    detail: 'Fungsi identitas I(x) = x berperan seperti angka 1 dalam perkalian. Mengkomposisikan dengan I tidak mengubah fungsi.',
    hasToggle: false,
    example: {
      given: 'f(x) = 3x + 2,\\; I(x) = x',
      left:  { label: 'f∘I', steps: ['f(I(x)) = f(x) = 3x+2'] },
      right: { label: 'I∘f', steps: ['I(f(x)) = f(x) = 3x+2'] },
    },
  },
  {
    icon: RotateCcw,
    title: 'Fungsi Invers',
    subtitle: 'Saling meniadakan',
    formula: 'f \\circ f^{-1} = f^{-1} \\circ f = I',
    description: 'Komposisi fungsi dengan inversnya menghasilkan fungsi identitas.',
    detail: 'Jika f(x) = 2x+1, maka f⁻¹(x) = (x−1)/2. Komposisi keduanya menghasilkan x. Sifat ini digunakan untuk membuktikan invers suatu fungsi.',
    hasToggle: false,
    example: {
      given: 'f(x) = 2x+1,\\; f^{-1}(x) = \\dfrac{x-1}{2}',
      left:  { label: 'f∘f⁻¹', steps: ['f\\!\\left(\\dfrac{x-1}{2}\\right) = 2 \\cdot \\dfrac{x-1}{2} + 1 = x'] },
      right: { label: 'f⁻¹∘f', steps: ['f^{-1}(2x+1) = \\dfrac{(2x+1)-1}{2} = x'] },
    },
  },
]

export default function SifatSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [showCompare, setShowCompare] = useState(false)
  const [openDetail, setOpenDetail] = useState<number | null>(null)

  return (
    <section id="sifat" ref={ref} className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Sifat-sifat</p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Sifat Fungsi Komposisi
          </h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Memahami sifat-sifat komposisi fungsi membantu menyelesaikan soal lebih cepat dan menghindari kesalahan umum.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid sm:grid-cols-2 gap-6 mb-8"
        >
          {properties.map((prop, i) => {
            const Icon = prop.icon
            const isOpen = openDetail === i
            return (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              >
                <GlassCard className="h-full bg-white" hover={false}>
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{prop.title}</h3>
                      <p className="text-xs text-gray-400">{prop.subtitle}</p>
                    </div>
                  </div>

                  {/* Formula */}
                  <div className="p-3 rounded-lg bg-gray-900 text-white mb-3 overflow-x-auto">
                    <FormulaBlock math={prop.formula} display size="md" />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{prop.description}</p>

                  {/* Toggle Bandingkan */}
                  {prop.hasToggle && prop.toggleContent && (
                    <div className="mb-3">
                      <button
                        onClick={() => setShowCompare(!showCompare)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        {showCompare ? 'Sembunyikan' : 'Lihat Perbandingan'}
                      </button>
                      <AnimatePresence>
                        {showCompare && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 overflow-hidden"
                          >
                            <p className="text-xs text-gray-400 mb-2">{prop.toggleContent.note}</p>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                                <p className="text-xs text-gray-600 mb-1 font-semibold">{prop.toggleContent.left.label}</p>
                                <FormulaBlock math={prop.toggleContent.left.formula} size="sm" />
                              </div>
                              <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                                <p className="text-xs text-gray-600 mb-1 font-semibold">{prop.toggleContent.right.label}</p>
                                <FormulaBlock math={prop.toggleContent.right.formula} size="sm" />
                              </div>
                            </div>
                            <div className="p-2 rounded-lg bg-gray-900 text-center">
                              <FormulaBlock math={prop.toggleContent.conclusion} size="sm" />
                              <p className="text-xs text-gray-300 mt-1">Terbukti tidak sama</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Expand Detail */}
                  <button
                    onClick={() => setOpenDetail(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-700 transition-colors pt-2 border-t border-gray-100"
                  >
                    <span>{isOpen ? 'Sembunyikan penjelasan' : 'Penjelasan lebih lanjut'}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={14} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 space-y-3">
                          <p className="text-xs text-gray-600 leading-relaxed">{prop.detail}</p>
                          {prop.example && (
                            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                              <p className="text-xs text-gray-400 mb-2">Contoh:</p>
                              <div className="mb-2">
                                <FormulaBlock math={prop.example.given} size="sm" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 rounded-lg bg-white border border-gray-200">
                                  <p className="text-xs font-semibold mb-1 text-gray-700">{prop.example.left.label}</p>
                                  {prop.example.left.steps.map((s, j) => (
                                    <div key={j}><FormulaBlock math={s} size="sm" /></div>
                                  ))}
                                </div>
                                <div className="p-2 rounded-lg bg-white border border-gray-200">
                                  <p className="text-xs font-semibold mb-1 text-gray-700">{prop.example.right.label}</p>
                                  {prop.example.right.steps.map((s, j) => (
                                    <div key={j}><FormulaBlock math={s} size="sm" /></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tabel Perbandingan */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard hover={false} className="bg-white">
            <h3 className="font-bold text-gray-900 mb-4">Perbandingan Sifat Operasi</h3>
            <p className="text-sm text-gray-500 mb-4">Bandingkan sifat komposisi fungsi dengan operasi aritmatika biasa:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold">Sifat</th>
                    <th className="text-center py-2 pr-4 text-gray-500 font-semibold">Penjumlahan (+)</th>
                    <th className="text-center py-2 pr-4 text-gray-500 font-semibold">Perkalian (×)</th>
                    <th className="text-center py-2 text-gray-500 font-semibold">Komposisi (∘)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { sifat: 'Komutatif',     plus: 'a+b = b+a',           kali: 'a×b = b×a',           komposisi: 'f∘g ≠ g∘f',          ok: false },
                    { sifat: 'Asosiatif',     plus: '(a+b)+c = a+(b+c)',   kali: '(a×b)×c = a×(b×c)',   komposisi: '(f∘g)∘h = f∘(g∘h)', ok: true  },
                    { sifat: 'Elemen Netral', plus: 'a+0 = a',             kali: 'a×1 = a',             komposisi: 'f∘I = f',            ok: true  },
                    { sifat: 'Elemen Invers', plus: 'a+(-a) = 0',          kali: 'a×(1/a) = 1',         komposisi: 'f∘f⁻¹ = I',         ok: true  },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 pr-4 text-gray-800 font-medium">{row.sifat}</td>
                      <td className="py-2.5 pr-4 text-center text-gray-500 text-xs">{row.plus}</td>
                      <td className="py-2.5 pr-4 text-center text-gray-500 text-xs">{row.kali}</td>
                      <td className={`py-2.5 text-center text-xs font-semibold ${row.ok ? 'text-gray-800' : 'text-gray-400'}`}>{row.komposisi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  )
}
