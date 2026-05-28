'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import FormulaBlock from '@/components/ui/FormulaBlock'
import { ChevronDown } from 'lucide-react'

const examples = [
  {
    title: 'Contoh 1',
    given: 'f(x) = \\sqrt{x},\\quad g(x) = x - 3',
    steps: [
      { label: 'Domain g', content: 'g(x) = x − 3 terdefinisi untuk semua bilangan real.', formula: 'D_g = \\mathbb{R}' },
      { label: 'Syarat f(g(x))', content: 'f(g(x)) = √(x−3). Nilai dalam akar harus ≥ 0.', formula: 'x - 3 \\geq 0 \\Rightarrow x \\geq 3' },
      { label: 'Domain (f∘g)', content: 'Gabungkan kedua syarat:', formula: 'D_{f \\circ g} = [3,\\, \\infty)' },
    ],
  },
  {
    title: 'Contoh 2',
    given: 'f(x) = \\dfrac{1}{x},\\quad g(x) = x - 2',
    steps: [
      { label: 'Domain g', content: 'g(x) = x − 2 terdefinisi untuk semua bilangan real.', formula: 'D_g = \\mathbb{R}' },
      { label: 'Syarat f(g(x))', content: 'f(g(x)) = 1/(x−2). Penyebut tidak boleh nol.', formula: 'x - 2 \\neq 0 \\Rightarrow x \\neq 2' },
      { label: 'Domain (f∘g)', content: 'Semua bilangan real kecuali x = 2:', formula: 'D_{f \\circ g} = \\mathbb{R} \\setminus \\{2\\}' },
    ],
  },
  {
    title: 'Contoh 3',
    given: 'f(x) = \\sqrt{x-1},\\quad g(x) = x^2',
    steps: [
      { label: 'Domain g', content: 'g(x) = x² terdefinisi untuk semua bilangan real.', formula: 'D_g = \\mathbb{R}' },
      { label: 'Syarat f(g(x))', content: 'f(g(x)) = √(x²−1). Syarat: x²−1 ≥ 0.', formula: 'x^2 - 1 \\geq 0 \\Rightarrow x^2 \\geq 1' },
      { label: 'Domain (f∘g)', content: 'x ≤ −1 atau x ≥ 1:', formula: 'D_{f \\circ g} = (-\\infty,\\,-1] \\cup [1,\\,\\infty)' },
    ],
  },
]

const domainTypes = [
  { type: 'Fungsi Akar', icon: '√', rule: 'Nilai di dalam akar harus ≥ 0', formula: '\\sqrt{h(x)} \\Rightarrow h(x) \\geq 0' },
  { type: 'Fungsi Pecahan', icon: '÷', rule: 'Penyebut tidak boleh = 0', formula: '\\dfrac{1}{h(x)} \\Rightarrow h(x) \\neq 0' },
  { type: 'Fungsi Logaritma', icon: 'log', rule: 'Nilai di dalam log harus > 0', formula: '\\log h(x) \\Rightarrow h(x) > 0' },
  { type: 'Fungsi Polinomial', icon: 'xⁿ', rule: 'Terdefinisi untuk semua bilangan real', formula: 'D = \\mathbb{R}' },
]

export default function DomainSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [openExample, setOpenExample] = useState<number | null>(null)

  return (
    <section id="domain" ref={ref} className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Domain & Range</p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Domain Fungsi Komposisi
          </h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Domain fungsi komposisi adalah himpunan semua nilai x yang memenuhi syarat agar komposisi terdefinisi.
          </p>
        </motion.div>

        {/* Row 1: Alur + Rumus + Contoh */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          {/* Alur */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard hover={false} className="h-full bg-white">
              <h3 className="text-base font-bold text-gray-900 mb-4">Alur Komposisi</h3>
              <div className="flex flex-col items-center gap-2 py-2">
                {[
                  { label: 'Nilai x (input)', sublabel: 'Harus ada di Domain g' },
                  { label: 'Hasil g(x)', sublabel: 'Harus ada di Domain f' },
                  { label: 'Hasil f(g(x))', sublabel: 'Output akhir komposisi' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center w-full">
                    <div className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.sublabel}</p>
                    </div>
                    {i < 2 && (
                      <div className="flex flex-col items-center my-1">
                        <div className="w-0.5 h-4 bg-gray-300" />
                        <svg width="10" height="6" viewBox="0 0 10 6">
                          <path d="M0 0 L5 6 L10 0" fill="#9ca3af" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-gray-900 text-white border border-gray-900">
                <p className="text-xs text-gray-300 font-semibold mb-1">Penting</p>
                <p className="text-xs text-gray-400">Domain (f∘g) selalu merupakan himpunan bagian dari domain g.</p>
                <FormulaBlock math="D_{f \circ g} \subseteq D_g" size="sm" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Rumus */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <GlassCard hover={false} className="h-full bg-white">
              <h3 className="text-base font-bold text-gray-900 mb-4">Rumus & Langkah</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-900 text-white">
                  <p className="text-xs text-gray-300 mb-2">Rumus Domain (f∘g):</p>
                  <FormulaBlock math="D_{f \circ g} = \{x \in D_g \mid g(x) \in D_f\}" display size="sm" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700">Langkah-langkah:</p>
                  {[
                    'Tentukan domain g',
                    'Tentukan domain f',
                    'Cari syarat agar g(x) masuk ke domain f',
                    'Ambil irisan dari semua syarat',
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard hover={false} className="h-full bg-white">
              <h3 className="text-base font-bold text-gray-900 mb-4">Contoh Mencari Domain</h3>
              <div className="space-y-3">
                {examples.map((ex, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenExample(openExample === i ? null : i)}
                      className="w-full flex items-start justify-between p-3 text-left hover:bg-gray-50 transition-colors gap-2"
                    >
                      <div>
                        <span className="text-sm font-semibold text-gray-800 block">{ex.title}</span>
                        <span className="text-xs text-gray-400 mt-0.5 block">
                          <FormulaBlock math={ex.given} size="sm" />
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: openExample === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown size={16} className="text-gray-400" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openExample === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 space-y-2 border-t border-gray-100 pt-2">
                            {ex.steps.map((step, j) => (
                              <div key={j} className="flex gap-2">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center mt-0.5">{j + 1}</span>
                                <div>
                                  <p className="text-xs font-semibold text-gray-700">{step.label}</p>
                                  <p className="text-xs text-gray-500 mb-1">{step.content}</p>
                                  <FormulaBlock math={step.formula} size="sm" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Jenis Fungsi */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <GlassCard hover={false} className="bg-white">
            <h3 className="text-base font-bold text-gray-900 mb-2">Domain Berdasarkan Jenis Fungsi</h3>
            <p className="text-sm text-gray-500 mb-5">Kenali jenis fungsi untuk menentukan syarat domain dengan cepat:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {domainTypes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="p-4 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-base font-bold text-gray-700 mb-3">
                    {item.icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{item.type}</p>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{item.rule}</p>
                  <div className="p-2 rounded-lg bg-white border border-gray-200">
                    <FormulaBlock math={item.formula} size="sm" />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Kesalahan Umum */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <GlassCard hover={false} className="bg-white">
            <h3 className="text-base font-bold text-gray-900 mb-4">Kesalahan Umum yang Harus Dihindari</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { wrong: 'Mengabaikan domain g', right: 'Selalu periksa domain g terlebih dahulu, bukan hanya syarat dari f' },
                { wrong: 'Lupa syarat tambahan dari f', right: 'Setelah domain g, cari syarat agar g(x) masuk ke domain f' },
                { wrong: 'Tidak mengambil irisan', right: 'Domain akhir adalah irisan semua syarat, bukan gabungan' },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Salah: {item.wrong}</p>
                  <p className="text-xs text-gray-700 font-medium">Benar: {item.right}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  )
}
