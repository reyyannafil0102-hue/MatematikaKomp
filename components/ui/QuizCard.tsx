'use client'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import FormulaBlock from '@/components/ui/FormulaBlock'
import { QuizQuestion, QuizPart } from '@/lib/quizData'

interface Props {
  question: QuizQuestion
  selectedAnswer: number | null
  onAnswer: (index: number) => void
  showResult: boolean
}

function MixedLine({ parts }: { parts: QuizPart[] }) {
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

export default function QuizCard({ question, selectedAnswer, onAnswer, showResult }: Props) {
  const optionLetters = ['A', 'B', 'C', 'D']

  return (
    <div className="w-full">
      {/* Question */}
      <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
        <p className="text-gray-400 text-xs mb-2 font-medium">Soal:</p>
        <div className="text-base flex flex-wrap items-center gap-y-1">
          <MixedLine parts={question.question} />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === i
          const isCorrect = i === question.correctIndex
          const isWrong = isSelected && !isCorrect

          let classes = 'border-gray-200 bg-white text-gray-700'

          if (showResult) {
            if (isCorrect) classes = 'border-gray-900 bg-gray-900 text-white'
            else if (isWrong) classes = 'border-gray-300 bg-gray-100 text-gray-400'
          } else if (isSelected) {
            classes = 'border-gray-900 bg-gray-50 text-gray-900'
          }

          return (
            <motion.button
              key={i}
              whileHover={!showResult ? { scale: 1.01, y: -1 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              onClick={() => !showResult && onAnswer(i)}
              disabled={showResult}
              className={`flex items-center gap-3 p-4 rounded-lg border ${classes} text-left transition-all duration-200 disabled:cursor-default`}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                {optionLetters[i]}
              </span>
              <span className="flex-1 text-sm">
                <FormulaBlock math={option} size="sm" />
              </span>
              {showResult && isCorrect && <CheckCircle size={16} className="text-white flex-shrink-0" />}
              {showResult && isWrong && <XCircle size={16} className="text-gray-400 flex-shrink-0" />}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
