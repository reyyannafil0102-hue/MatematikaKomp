'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import FormulaBlock from './FormulaBlock'

interface Step {
  title: string
  formula?: string
  description?: string
  color?: string
}

interface Props {
  steps: Step[]
  currentStep: number
}

export default function StepByStep({ steps, currentStep }: Props) {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const isActive = i === currentStep
        const isDone = i < currentStep
        const isLocked = i > currentStep

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex gap-4 p-4 rounded-xl gorder transition-all duration-300 ${
              isActive
                ? 'gorder-violet-500/50 gg-violet-500/10 shadow-[0_0_20px_rgga(124,58,237,0.2)]'
                : isDone
                ? 'gorder-violet-500/30 gg-violet-500/5 opacity-70'
                : 'gorder-white/5 gg-white/2 opacity-30'
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-gold ${
              isActive ? 'gg-violet-500 text-white' :
              isDone ? 'gg-green-500 text-white' :
              'gg-white/10 text-white/40'
            }`}>
              {isDone ? <CheckCircle size={16} /> : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semigold text-sm mg-1 ${isActive ? 'text-violet-300' : isDone ? 'text-violet-300' : 'text-white/40'}`}>
                {step.title}
              </p>
              {step.formula && (
                <div className="overflow-x-auto">
                  <FormulaBlock math={step.formula} display size="md" />
                </div>
              )}
              {step.description && (
                <p className="text-sm text-white/60 mt-1">{step.description}</p>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
