'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import QuizCard from '@/components/ui/QuizCard'
import { quizQuestions } from '@/lib/quizData'
import { RefreshCw, Play, Clock, CheckCircle, XCircle } from 'lucide-react'
import FormulaBlock from '@/components/ui/FormulaBlock'
import { QuizPart } from '@/lib/quizData'

type Phase = 'intro' | 'playing' | 'result'

export default function KuisSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [phase, setPhase] = useState<Phase>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [answers, setAnswers] = useState<Array<number | null>>([])
  const [showResult, setShowResult] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowResult(true)
    const isCorrect = index === quizQuestions[currentQ].correctIndex
    if (isCorrect) setScore(s => s + 1)
    setAnswers(prev => {
      const next = [...prev]
      next[currentQ] = index
      return next
    })
    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(q => q + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(30)
      } else {
        setPhase('result')
      }
    }, 1500)
  }, [selectedAnswer, currentQ])

  useEffect(() => {
    if (phase !== 'playing' || showResult) return
    if (timeLeft <= 0) { handleAnswer(-1); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, showResult, handleAnswer])

  useEffect(() => {
    if (phase !== 'result') return
    let current = 0
    const target = score
    const interval = setInterval(() => {
      if (current >= target) { clearInterval(interval); return }
      current++
      setDisplayScore(current)
    }, 150)
    return () => clearInterval(interval)
  }, [phase, score])

  const startQuiz = () => {
    setPhase('playing')
    setCurrentQ(0)
    setSelectedAnswer(null)
    setScore(0)
    setTimeLeft(30)
    setAnswers([])
    setShowResult(false)
    setDisplayScore(0)
  }

  const getLabel = () => {
    if (score >= 9) return 'Master Komposisi'
    if (score >= 7) return 'Hampir Master'
    if (score >= 5) return 'Terus Berlatih'
    return 'Ayo Coba Lagi'
  }

  const timerPercent = (timeLeft / 30) * 100
  const timerUrgent = timeLeft <= 10

  return (
    <section id="kuis" ref={ref} className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Uji Pemahaman</p>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Kuis Fungsi Komposisi
          </h2>
          <p className="text-gray-500 max-w-xl leading-relaxed">
            10 soal pilihan ganda untuk menguji pemahamanmu. Setiap soal diberi waktu 30 detik.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* INTRO */}
          {phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}>
              <GlassCard hover={false} className="bg-white text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Siap Memulai Kuis?</h3>
                <div className="grid grid-cols-3 gap-4 my-6">
                  {[
                    { label: 'Soal', value: '10' },
                    { label: 'Waktu/Soal', value: '30s' },
                    { label: 'Tingkat', value: 'Mix' },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="text-2xl font-black text-gray-900">{item.value}</div>
                      <div className="text-xs text-gray-400 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startQuiz}
                  className="flex items-center gap-2 mx-auto px-8 py-3.5 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-bold text-base transition-colors"
                >
                  <Play size={18} />
                  Mulai Kuis
                </motion.button>
              </GlassCard>
            </motion.div>
          )}

          {/* PLAYING */}
          {phase === 'playing' && (
            <motion.div key="playing" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <GlassCard hover={false} className="bg-white">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Soal</span>
                    <span className="text-lg font-bold text-gray-900">{currentQ + 1}</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-400">{quizQuestions.length}</span>
                  </div>
                  {/* Timer */}
                  <div className="flex items-center gap-2">
                    <Clock size={14} className={timerUrgent ? 'text-gray-900' : 'text-gray-400'} />
                    <div className="relative w-10 h-10">
                      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15" fill="none"
                          stroke={timerUrgent ? '#111111' : '#9ca3af'} strokeWidth="3"
                          strokeDasharray={`${timerPercent * 0.942} 94.2`}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dasharray 1s linear' }}
                        />
                      </svg>
                      <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${timerUrgent ? 'text-gray-900' : 'text-gray-500'}`}>
                        {timeLeft}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-gray-100 rounded-full mb-6">
                  <motion.div
                    className="h-full bg-gray-900 rounded-full"
                    animate={{ width: `${(currentQ / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Score */}
                <div className="flex items-center gap-1 mb-5">
                  <span className="text-xs text-gray-400">Skor:</span>
                  <span className="text-sm font-bold text-gray-900">{score}</span>
                  <span className="text-xs text-gray-300">/ {currentQ}</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <QuizCard
                      question={quizQuestions[currentQ]}
                      selectedAnswer={selectedAnswer}
                      onAnswer={handleAnswer}
                      showResult={showResult}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className={`p-3 rounded-lg text-sm border ${
                        selectedAnswer === quizQuestions[currentQ].correctIndex
                          ? 'bg-gray-50 border-gray-300'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {selectedAnswer === quizQuestions[currentQ].correctIndex
                            ? <CheckCircle size={14} className="text-gray-700" />
                            : <XCircle size={14} className="text-gray-400" />
                          }
                          <span className="font-semibold text-gray-800">
                            {selectedAnswer === quizQuestions[currentQ].correctIndex ? 'Benar' : 'Kurang tepat'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs">{quizQuestions[currentQ].explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          )}

          {/* RESULT */}
          {phase === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <GlassCard hover={false} className="bg-white text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{getLabel()}</h3>

                {/* Score */}
                <div className="my-6">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="text-7xl font-black text-gray-900"
                  >
                    {displayScore}
                  </motion.div>
                  <p className="text-gray-400 text-sm">dari {quizQuestions.length} soal benar</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="text-xl font-bold text-gray-900">{score}</div>
                    <div className="text-xs text-gray-400">Benar</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="text-xl font-bold text-gray-500">{quizQuestions.length - score}</div>
                    <div className="text-xs text-gray-400">Salah</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-900">
                    <div className="text-xl font-bold text-white">{Math.round((score / quizQuestions.length) * 100)}%</div>
                    <div className="text-xs text-gray-400">Akurasi</div>
                  </div>
                </div>

                {/* Review */}
                <div className="text-left mb-6 space-y-2">
                  <p className="text-sm font-semibold text-gray-500 mb-3">Review Jawaban:</p>
                  {quizQuestions.map((q, i) => {
                    const userAns = answers[i]
                    const isCorrect = userAns === q.correctIndex
                    return (
                      <div key={q.id} className="flex items-start gap-2 p-2 rounded-lg text-xs bg-gray-50 border border-gray-200">
                        {isCorrect
                          ? <CheckCircle size={12} className="text-gray-700 flex-shrink-0 mt-0.5" />
                          : <XCircle size={12} className="text-gray-300 flex-shrink-0 mt-0.5" />
                        }
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-600 truncate text-xs flex flex-wrap items-center gap-0.5">
                            {q.question.slice(0, 4).map((part: QuizPart, pi: number) =>
                              part.type === 'text'
                                ? <span key={pi}>{part.value}</span>
                                : <FormulaBlock key={pi} math={part.value} size="sm" />
                            )}
                            <span>...</span>
                          </div>
                          {!isCorrect && (
                            <p className="text-gray-400 mt-0.5 text-xs">{q.explanation}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startQuiz}
                  className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-700 text-white font-semibold transition-colors"
                >
                  <RefreshCw size={16} />
                  Kuis Lagi
                </motion.button>
              </GlassCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}
