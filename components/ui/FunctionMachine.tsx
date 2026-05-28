'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'
import FormulaBlock from './FormulaBlock'

export default function FunctionMachine() {
  const [inputX, setInputX] = useState('3')
  const [step, setStep] = useState(0)
  const [intermediateValue, setIntermediateValue] = useState<number | null>(null)
  const [outputValue, setOutputValue] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const process = async () => {
    const x = parseFloat(inputX)
    if (isNaN(x)) return
    setIsAnimating(true)
    setStep(0)
    setIntermediateValue(null)
    setOutputValue(null)

    await new Promise(r => setTimeout(r, 300))
    setStep(1)
    await new Promise(r => setTimeout(r, 700))
    const gResult = x * x
    setIntermediateValue(gResult)
    setStep(2)
    await new Promise(r => setTimeout(r, 700))
    const fResult = 2 * gResult + 1
    setOutputValue(fResult)
    setStep(3)
    setIsAnimating(false)
  }

  const reset = () => {
    setStep(0)
    setIntermediateValue(null)
    setOutputValue(null)
    setIsAnimating(false)
  }

  const x = parseFloat(inputX)

  return (
    <div className="w-full">
      {/* Input */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm text-gray-500 whitespace-nowrap">Nilai x =</label>
        <input
          type="number"
          value={inputX}
          onChange={e => { setInputX(e.target.value); reset() }}
          className="w-24 text-center text-lg font-bold"
          step="1"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={process}
          disabled={isAnimating}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 disabled:opacity-40 rounded-lg text-sm font-semibold text-white transition-colors"
        >
          <Play size={14} />
          Proses
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={reset}
          className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw size={14} />
        </motion.button>
      </div>

      {/* Machine Diagram */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {/* Input Box */}
        <motion.div
          animate={{ scale: step >= 1 ? [1, 1.08, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-16 h-16 rounded-xl border-2 border-gray-300 bg-gray-50 flex items-center justify-center"
        >
          <span className="text-gray-800 font-bold text-lg">{!isNaN(x) ? x : '?'}</span>
        </motion.div>

        {/* Arrow 1 */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-0.5 bg-gray-400 origin-left"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-xs text-gray-400 mt-1"
          >x</motion.div>
        </div>

        {/* Machine g */}
        <motion.div
          animate={{ borderColor: step === 1 ? '#111111' : '#e5e7eb' }}
          className="flex-shrink-0 w-28 h-20 rounded-xl border-2 bg-gray-50 flex flex-col items-center justify-center gap-1"
        >
          <span className="text-xs text-gray-400 font-medium">Mesin g</span>
          <FormulaBlock math="g(x) = x^2" size="sm" />
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 rounded-full bg-gray-800"
            />
          )}
        </motion.div>

        {/* Arrow 2 */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-0.5 bg-gray-400 origin-left"
          />
          <AnimatePresence>
            {step >= 2 && intermediateValue !== null && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-gray-500 mt-1 whitespace-nowrap"
              >
                {intermediateValue}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Machine f */}
        <motion.div
          animate={{ borderColor: step === 2 ? '#111111' : '#e5e7eb' }}
          className="flex-shrink-0 w-28 h-20 rounded-xl border-2 bg-gray-50 flex flex-col items-center justify-center gap-1"
        >
          <span className="text-xs text-gray-400 font-medium">Mesin f</span>
          <FormulaBlock math="f(x) = 2x+1" size="sm" />
          {step >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 rounded-full bg-gray-800"
            />
          )}
        </motion.div>

        {/* Arrow 3 */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step >= 3 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-0.5 bg-gray-400 origin-left"
          />
        </div>

        {/* Output */}
        <AnimatePresence>
          {step >= 3 && outputValue !== null && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex-shrink-0 w-20 h-16 rounded-xl border-2 border-gray-900 bg-gray-900 flex flex-col items-center justify-center"
            >
              <span className="text-xs text-gray-300">Output</span>
              <span className="text-white font-bold text-xl">{outputValue}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result Summary */}
      <AnimatePresence>
        {step >= 3 && outputValue !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-2">Hasil Komposisi:</p>
            <div className="space-y-1 text-sm text-gray-700">
              <p>g({!isNaN(x) ? x : '?'}) = {!isNaN(x) ? x : '?'}² = <strong>{intermediateValue}</strong></p>
              <p>f(g({!isNaN(x) ? x : '?'})) = f({intermediateValue}) = 2({intermediateValue}) + 1 = <strong>{outputValue}</strong></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
