'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import FormulaBlock from '@/components/ui/FormulaBlock'
import { ChevronRight, RotateCcw } from 'lucide-react'

const steps = [
  {
    title: 'Identifikasi Fungsi',
    formula: 'f(x) = 3x + 2, \\quad g(x) = x^2 - 1',
    description: 'Tentukan dengan jelas fungsi f dan g. Pastikan kamu tahu mana fungsi luar (f) dan fungsi dalam (g).',
  },
  {
    title: 'Tulis Ekspresi g(x)',
    formula: 'g(x) = x^2 - 1',
    description: 'Fokus pada fungsi g terlebih dahulu. Pada komposisi (f∘g), g selalu dikerjakan lebih dulu.',
  },
  {
    title: 'Substitusi g(x) ke dalam f',
    formula: 'f(g(x)) = f(x^2 - 1)',
    description: 'Ganti setiap variabel x dalam f(x) dengan ekspresi g(x).',
  },
  {
    title: 'Distribusikan & Sederhanakan',
    formula: 'f(g(x)) = 3(x^2 - 1) + 2 = 3x^2 - 3 + 2',
    description: 'Distribusikan koefisien, lalu gabungkan suku-suku sejenis.',
  },
  {
    title: 'Hasil Akhir',
    formula: '(f \\circ g)(x) = 3x^2 - 1',
    description: 'Fungsi komposisi telah ditemukan. Tulis dalam notasi (f∘g)(x).',
  },
]

const extraExamples = [
  {
    title: 'Contoh 2: Hitung Nilai',
    given: [
      { label: 'Diketahui', formula: 'f(x) = x + 4,\\quad g(x) = 2x' },
      { label: 'Ditanya', formula: '(f \\circ g)(5)' },
    ],
    solution: [
      { step: 'Hitung g(5)', formula: 'g(5) = 2(5) = 10' },
      { step: 'Masukkan ke f', formula: 'f(g(5)) = f(10) = 10 + 4 = 14' },
      { step: 'Hasil', formula: '(f \\circ g)(5) = 14' },
    ],
  },
  {
    title: 'Contoh 3: Tiga Fungsi',
    given: [
      { label: 'Diketahui', formula: 'f(x) = x+1,\\; g(x) = 2x,\\; h(x) = x^2' },
      { label: 'Ditanya', formula: '(f \\circ g \\circ h)(3)' },
    ],
    solution: [
      { step: 'Hitung h(3)', formula: 'h(3) = 3^2 = 9' },
      { step: 'Hitung g(h(3))', formula: 'g(9) = 2(9) = 18' },
      { step: 'Hitung f(g(h(3)))', formula: 'f(18) = 18 + 1 = 19' },
    ],
  },
]

export default function CaraHitungSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [currentStep, setCurrentStep] = useState(0)

  const next = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1))
  const reset = () => setCurrentStep(0)

  return (
    <section id="cara-hitung" ref={ref} className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Langkah demi Langkah</p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Cara Menghitung Komposisi
          </h2>
          <p className="text-gray-500 max-w-2xl leading-relaxed">
            Menghitung fungsi komposisi memerlukan ketelitian dalam urutan pengerjaan. Ikuti langkah-langkah berikut.
          </p>
        </motion.div>

        {/* Row 1: Steps + Tips */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <GlassCard hover={false}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Langkah-langkah</h3>
                <span className="text-sm text-gray-400">{currentStep + 1} / {steps.length}</span>
              </div>

              <div className="space-y-3">
                {steps.map((step, i) => {
                  const isActive = i === currentStep
                  const isDone = i < currentStep

                  return (
                    <motion.div
                      key={i}
                      layout
                      className={`flex gap-4 p-4 rounded-lg border transition-all duration-300 ${
                        isActive
                          ? 'border-gray-900 bg-gray-50'
                          : isDone
                          ? 'border-gray-200 bg-gray-50 opacity-70'
                          : 'border-gray-100 opacity-30'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isActive ? 'bg-gray-900 text-white' :
                          isDone ? 'bg-gray-300 text-gray-700' :
                          'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isDone ? '✓' : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm mb-1 ${isActive ? 'text-gray-900' : isDone ? 'text-gray-600' : 'text-gray-300'}`}>
                          {step.title}
                        </p>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="overflow-hidden"
                          >
                            <div className="overflow-x-auto mb-2">
                              <FormulaBlock math={step.formula} display size="sm" />
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                          </motion.div>
                        )}
                        {isDone && (
                          <div className="overflow-x-auto">
                            <FormulaBlock math={step.formula} display size="sm" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex gap-3 mt-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={next}
                  disabled={currentStep >= steps.length - 1}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {currentStep >= steps.length - 1 ? 'Selesai' : 'Langkah Berikutnya'}
                  {currentStep < steps.length - 1 && <ChevronRight size={16} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={reset}
                  className="p-3 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw size={16} />
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <GlassCard hover={false}>
              <h3 className="font-bold text-gray-900 mb-4">Contoh Soal 1</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-400 mb-1">Diketahui:</p>
                  <FormulaBlock math="f(x) = 3x + 2" display size="sm" />
                  <FormulaBlock math="g(x) = x^2 - 1" display size="sm" />
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-400 mb-1">Ditanya:</p>
                  <FormulaBlock math="(f \circ g)(x) = \, ?" display size="sm" />
                </div>
                <AnimatePresence>
                  {currentStep >= steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 rounded-lg bg-gray-900 text-white"
                    >
                      <p className="text-xs text-gray-300 mb-1">Jawaban:</p>
                      <FormulaBlock math="(f \circ g)(x) = 3x^2 - 1" display size="md" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <h3 className="font-bold text-gray-900 mb-3">Tips & Trik</h3>
              <div className="space-y-3">
                {[
                  { tip: 'Selalu kerjakan fungsi dalam (g) terlebih dahulu', detail: 'Pada (f∘g), g adalah fungsi dalam yang dikerjakan pertama.' },
                  { tip: 'Gunakan tanda kurung saat substitusi', detail: 'Tulis f((x²−1)) untuk menghindari kesalahan distribusi.' },
                  { tip: 'Sederhanakan langkah demi langkah', detail: 'Jangan langsung melompat ke hasil akhir.' },
                  { tip: 'Verifikasi dengan nilai numerik', detail: 'Cek hasilmu dengan memasukkan nilai x tertentu.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-gray-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.tip}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Contoh Tambahan */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-5">Contoh Tambahan</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {extraExamples.map((ex, i) => (
              <GlassCard key={i} hover={false}>
                <h4 className="font-bold text-gray-900 mb-4">{ex.title}</h4>
                <div className="space-y-2 mb-4">
                  {ex.given.map((g, j) => (
                    <div key={j} className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                      <p className="text-xs text-gray-400 mb-1">{g.label}:</p>
                      <FormulaBlock math={g.formula} display size="sm" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 font-semibold mb-3">Penyelesaian:</p>
                <div className="space-y-2">
                  {ex.solution.map((s, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">
                        {j + 1}
                      </span>
                      <div>
                        <p className="text-xs text-gray-500">{s.step}</p>
                        <FormulaBlock math={s.formula} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Mencari Fungsi Asal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8"
        >
          <GlassCard hover={false}>
            <h3 className="font-bold text-gray-900 mb-2">Mencari Fungsi Asal dari Komposisi</h3>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Kadang soal memberikan hasil komposisi dan salah satu fungsi, lalu meminta fungsi yang lain.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Jika diketahui (f∘g)(x) dan g(x), cari f(x):</p>
                <div className="space-y-2">
                  {[
                    { step: '1', text: 'Misalkan u = g(x)', formula: 'u = g(x)' },
                    { step: '2', text: 'Nyatakan x dalam u', formula: 'x = g^{-1}(u)' },
                    { step: '3', text: 'Substitusi ke (f∘g)(x)', formula: 'f(u) = (f \\circ g)(g^{-1}(u))' },
                    { step: '4', text: 'Ganti u dengan x', formula: 'f(x) = \\ldots' },
                  ].map(item => (
                    <div key={item.step} className="flex items-start gap-3 p-2 rounded-lg bg-gray-50 border border-gray-200">
                      <span className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">{item.step}</span>
                      <div>
                        <p className="text-xs text-gray-500">{item.text}</p>
                        <FormulaBlock math={item.formula} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">Contoh:</p>
                <p className="text-xs text-gray-500 mb-3">Diketahui <FormulaBlock math="(f \circ g)(x) = 4x - 3" /> dan <FormulaBlock math="g(x) = 2x + 1" />. Cari f(x).</p>
                <div className="space-y-2">
                  {[
                    { s: 'Misalkan u = 2x + 1', f: 'x = \\dfrac{u-1}{2}' },
                    { s: 'Substitusi ke (f∘g)', f: 'f(u) = 4 \\cdot \\dfrac{u-1}{2} - 3 = 2u - 5' },
                    { s: 'Ganti u dengan x', f: 'f(x) = 2x - 5' },
                  ].map((item, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="text-xs text-gray-400 mt-1 w-4 flex-shrink-0">{j + 1}.</span>
                      <div>
                        <p className="text-xs text-gray-500">{item.s}</p>
                        <FormulaBlock math={item.f} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  )
}
