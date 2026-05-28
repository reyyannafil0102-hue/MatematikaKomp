'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import FormulaBlock from '@/components/ui/FormulaBlock'
import { Eye, EyeOff } from 'lucide-react'

type Difficulty = 'mudah' | 'sedang' | 'sulit'
type Part = { type: 'text'; value: string } | { type: 'math'; value: string }

interface Problem {
  id: number
  parts: Part[]
  answer: Part[][]
  difficulty: Difficulty
}

const t = (value: string): Part => ({ type: 'text', value })
const m = (value: string): Part => ({ type: 'math', value })

const problems: Record<Difficulty, Problem[]> = {
  mudah: [
    {
      id: 1,
      difficulty: 'mudah',
      parts: [t('Diketahui '), m('f(x) = x + 5'), t(' dan '), m('g(x) = 2x'), t('. Tentukan '), m('(f \\circ g)(3)'), t('.')],
      answer: [
        [m('g(3) = 2(3) = 6')],
        [m('f(g(3)) = f(6) = 6 + 5 = 11')],
        [m('\\therefore\\ (f \\circ g)(3) = 11')],
      ],
    },
    {
      id: 2,
      difficulty: 'mudah',
      parts: [t('Jika '), m('f(x) = 3x - 1'), t(' dan '), m('g(x) = x + 2'), t(', tentukan '), m('(g \\circ f)(x)'), t('.')],
      answer: [
        [m('f(x) = 3x - 1')],
        [m('g(f(x)) = g(3x-1) = (3x-1) + 2')],
        [m('\\therefore\\ (g \\circ f)(x) = 3x + 1')],
      ],
    },
  ],
  sedang: [
    {
      id: 3,
      difficulty: 'sedang',
      parts: [t('Diketahui '), m('f(x) = x^2 + 1'), t(' dan '), m('g(x) = \\sqrt{x-2}'), t('. Tentukan domain '), m('(f \\circ g)(x)'), t('.')],
      answer: [
        [m('g(x) = \\sqrt{x-2}'), t(' terdefinisi jika '), m('x - 2 \\geq 0'), t(', sehingga '), m('x \\geq 2')],
        [m('f(g(x)) = (\\sqrt{x-2})^2 + 1 = x - 1')],
        [m('\\therefore\\ D_{f \\circ g} = [2,\\, \\infty)')],
      ],
    },
    {
      id: 4,
      difficulty: 'sedang',
      parts: [t('Jika '), m('f(x) = \\dfrac{x}{x-1}'), t(' dan '), m('g(x) = 2x + 1'), t(', tentukan '), m('(f \\circ g)(x)'), t('.')],
      answer: [
        [m('g(x) = 2x + 1')],
        [m('f(g(x)) = f(2x+1) = \\dfrac{2x+1}{(2x+1)-1} = \\dfrac{2x+1}{2x}')],
        [m('\\therefore\\ (f \\circ g)(x) = \\dfrac{2x+1}{2x},\\quad x \\neq 0')],
      ],
    },
  ],
  sulit: [
    {
      id: 5,
      difficulty: 'sulit',
      parts: [t('Diketahui '), m('(f \\circ g)(x) = 4x - 3'), t(' dan '), m('g(x) = 2x + 1'), t('. Tentukan '), m('f(x)'), t('.')],
      answer: [
        [t('Misalkan '), m('u = g(x) = 2x + 1'), t(', maka '), m('x = \\dfrac{u-1}{2}')],
        [m('f(u) = 4 \\cdot \\dfrac{u-1}{2} - 3 = 2(u-1) - 3 = 2u - 5')],
        [m('\\therefore\\ f(x) = 2x - 5')],
      ],
    },
    {
      id: 6,
      difficulty: 'sulit',
      parts: [t('Jika '), m('f(x) = 2x + 1'), t(' dan '), m('(f \\circ g)(x) = 2x^2 + 4x + 3'), t(', tentukan '), m('g(x)'), t('.')],
      answer: [
        [m('f(g(x)) = 2g(x) + 1 = 2x^2 + 4x + 3')],
        [m('2g(x) = 2x^2 + 4x + 2')],
        [m('g(x) = x^2 + 2x + 1')],
        [m('\\therefore\\ g(x) = (x+1)^2')],
      ],
    },
  ],
}

const difficultyConfig = {
  mudah:  { label: 'Mudah',  bg: 'bg-gray-100', border: 'border-gray-300', color: '#555555' },
  sedang: { label: 'Sedang', bg: 'bg-gray-100', border: 'border-gray-300', color: '#333333' },
  sulit:  { label: 'Sulit',  bg: 'bg-gray-900', border: 'border-gray-900', color: '#ffffff' },
}

function MixedLine({ parts }: { parts: Part[] }) {
  return (
    <span className="leading-relaxed">
      {parts.map((part, i) =>
        part.type === 'text'
          ? <span key={i} className="text-gray-700">{part.value}</span>
          : <FormulaBlock key={i} math={part.value} size="md" />
      )}
    </span>
  )
}

export default function ContohSoalSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState<Difficulty>('mudah')
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  const toggleReveal = (id: number) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="contoh" ref={ref} className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Latihan Soal</p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Contoh Soal & Pembahasan
          </h2>
          <p className="text-gray-500 max-w-xl leading-relaxed">
            Latih pemahaman dengan soal-soal dari berbagai tingkat kesulitan.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-2 mb-8 p-1 border border-gray-200 rounded-xl w-fit bg-white"
        >
          {(['mudah', 'sedang', 'sulit'] as Difficulty[]).map(tab => {
            const cfg = difficultyConfig[tab]
            return (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setRevealed(new Set()) }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? tab === 'sulit' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {cfg.label}
              </button>
            )
          })}
        </motion.div>

        {/* Problems */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {problems[activeTab].map((problem, i) => {
              const cfg = difficultyConfig[problem.difficulty]
              const isRevealed = revealed.has(problem.id)

              return (
                <GlassCard key={problem.id} hover={false} className="bg-white">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.bg} border ${cfg.border}`} style={{ color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Question */}
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 mb-4">
                    <p className="text-xs text-gray-400 mb-2 font-medium">Soal:</p>
                    <div className="text-base flex flex-wrap items-center gap-y-1">
                      <MixedLine parts={problem.parts} />
                    </div>
                  </div>

                  {/* Toggle button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleReveal(problem.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      isRevealed
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                    {isRevealed ? 'Sembunyikan Jawaban' : 'Tampilkan Jawaban'}
                  </motion.button>

                  {/* Answer */}
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                          <p className="text-xs font-semibold text-gray-500 mb-3">Pembahasan:</p>
                          <div className="space-y-3">
                            {problem.answer.map((step, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.07 }}
                                className="flex items-start gap-3"
                              >
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 mt-0.5">
                                  {j + 1}
                                </span>
                                <div className="flex flex-wrap items-center gap-y-1 text-sm">
                                  <MixedLine parts={step} />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
