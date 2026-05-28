'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import GlassCard from '@/components/ui/GlassCard'
import FormulaBlock from '@/components/ui/FormulaBlock'
import ArrowDiagram from '@/components/ui/ArrowDiagram'
import { AlertCircle } from 'lucide-react'
import { validateExpression } from '@/lib/mathUtils'

const FunctionGraph = dynamic(() => import('@/components/ui/FunctionGraph'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
      Memuat grafik...
    </div>
  ),
})

export default function GrafikSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [fExpr, setFExpr] = useState('2*x + 1')
  const [gExpr, setGExpr] = useState('x^2')
  const [fInput, setFInput] = useState('2*x + 1')
  const [gInput, setGInput] = useState('x^2')
  const [fError, setFError] = useState(false)
  const [gError, setGError] = useState(false)

  const [showF, setShowF] = useState(true)
  const [showG, setShowG] = useState(true)
  const [showFoG, setShowFoG] = useState(true)
  const [showGoF, setShowGoF] = useState(false)
  const [activeX, setActiveX] = useState(2)

  const applyExpressions = () => {
    const fValid = validateExpression(fInput)
    const gValid = validateExpression(gInput)
    setFError(!fValid)
    setGError(!gValid)
    if (fValid && gValid) {
      setFExpr(fInput)
      setGExpr(gInput)
    }
  }

  return (
    <section id="grafik" ref={ref} className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Visualisasi</p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Grafik Fungsi Komposisi
          </h2>
          <p className="text-gray-500 max-w-xl leading-relaxed">
            Visualisasikan fungsi dan komposisinya secara interaktif.
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard hover={false}>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-40">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">f(x) =</label>
                  <input
                    type="text"
                    value={fInput}
                    onChange={e => { setFInput(e.target.value); setFError(false) }}
                    className={fError ? 'border-red-400' : ''}
                    placeholder="2*x + 1"
                  />
                  {fError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> Ekspresi tidak valid</p>}
                </div>
                <div className="flex-1 min-w-40">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">g(x) =</label>
                  <input
                    type="text"
                    value={gInput}
                    onChange={e => { setGInput(e.target.value); setGError(false) }}
                    className={gError ? 'border-red-400' : ''}
                    placeholder="x^2"
                  />
                  {gError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> Ekspresi tidak valid</p>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={applyExpressions}
                  className="px-5 py-2 bg-gray-900 hover:bg-gray-700 rounded-lg text-sm font-semibold text-white transition-colors"
                >
                  Terapkan
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Main graph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <GlassCard hover={false}>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h3 className="font-bold text-gray-900">Grafik Komposisi</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'f', label: 'f(x)', state: showF, set: setShowF },
                    { key: 'g', label: 'g(x)', state: showG, set: setShowG },
                    { key: 'fog', label: '(f∘g)(x)', state: showFoG, set: setShowFoG },
                    { key: 'gof', label: '(g∘f)(x)', state: showGoF, set: setShowGoF },
                  ].map(item => (
                    <button
                      key={item.key}
                      onClick={() => item.set(!item.state)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                        item.state
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-400 border-gray-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <FunctionGraph
                fx={fExpr}
                gx={gExpr}
                showF={showF}
                showG={showG}
                showFoG={showFoG}
                showGoF={showGoF}
                activeX={activeX}
                height={350}
              />

              <div className="mt-4">
                <label className="text-xs text-gray-500 mb-2 block font-medium">Titik aktif x = {activeX}</label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={activeX}
                  onChange={e => setActiveX(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </GlassCard>
          </motion.div>

          {/* Arrow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard hover={false}>
              <h3 className="font-bold text-gray-900 mb-4">Diagram Panah</h3>
              <p className="text-sm text-gray-500 mb-4">
                Visualisasi pemetaan nilai dari domain ke range melalui komposisi.
              </p>
              <ArrowDiagram fExpr={fExpr} gExpr={gExpr} xValues={[-2, -1, 0, 1, 2]} />
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
