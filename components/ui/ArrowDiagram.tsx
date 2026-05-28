'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'
import * as math from 'mathjs'

interface Props {
  fExpr?: string
  gExpr?: string
  xValues?: number[]
}

export default function ArrowDiagram({
  fExpr = '2*x + 1',
  gExpr = 'x^2',
  xValues = [-2, -1, 0, 1, 2],
}: Props) {
  const [phase, setPhase] = useState(0)

  const evaluate = (expr: string, x: number): number => {
    try {
      const result = math.evaluate(expr, { x }) as number
      return isFinite(result) ? parseFloat(result.toFixed(3)) : NaN
    } catch {
      return NaN
    }
  }

  const gValues = xValues.map(x => evaluate(gExpr, x))
  const fgValues = gValues.map(gx => isNaN(gx) ? NaN : evaluate(fExpr, gx))

  const animate = async () => {
    setPhase(0)
    await new Promise(r => setTimeout(r, 100))
    setPhase(1)
    await new Promise(r => setTimeout(r, 1200))
    setPhase(2)
  }

  const reset = () => setPhase(0)

  const circleR = 20
  const colX = [80, 260, 440]
  const rowH = 50
  const topPad = 50
  const svgW = 540
  const svgH = xValues.length * rowH + topPad + 20

  const formatVal = (v: number) => isNaN(v) ? '?' : (Number.isInteger(v) ? String(v) : v.toFixed(1))

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex gap-3 mb-5">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={animate}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 rounded-lg text-sm font-semibold text-white transition-colors"
        >
          <Play size={14} />
          Animasi Panah
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={reset}
          className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw size={14} />
        </motion.button>
      </div>

      {/* SVG Diagram */}
      <div className="overflow-x-auto">
        <svg
          width={svgW}
          height={svgH}
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="block mx-auto"
        >
          <defs>
            <marker id="ad-arrow-1" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#555555" />
            </marker>
            <marker id="ad-arrow-2" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#111111" />
            </marker>
          </defs>

          {/* Column headers */}
          <text x={colX[0]} y={24} textAnchor="middle" fill="#888888" fontSize={13} fontWeight="600">Domain</text>
          <text x={colX[1]} y={24} textAnchor="middle" fill="#555555" fontSize={13} fontWeight="600">g(x)</text>
          <text x={colX[2]} y={24} textAnchor="middle" fill="#111111" fontSize={13} fontWeight="600">f(g(x))</text>

          {xValues.map((x, i) => {
            const cy = topPad + i * rowH + rowH / 2
            const gap = circleR + 4
            const ax1 = colX[0] + gap
            const ax2 = colX[1] - gap
            const bx1 = colX[1] + gap
            const bx2 = colX[2] - gap

            return (
              <g key={i}>
                {/* Column 1: Domain */}
                <circle cx={colX[0]} cy={cy} r={circleR} fill="#f5f5f5" stroke="#cccccc" strokeWidth={1.5} />
                <text x={colX[0]} y={cy + 5} textAnchor="middle" fill="#333333" fontSize={13} fontWeight="600">{x}</text>

                {/* Column 2: g(x) */}
                <circle cx={colX[1]} cy={cy} r={circleR} fill="#eeeeee" stroke="#aaaaaa" strokeWidth={1.5} />
                <text x={colX[1]} y={cy + 5} textAnchor="middle" fill="#444444" fontSize={13} fontWeight="600">{formatVal(gValues[i])}</text>

                {/* Column 3: f(g(x)) */}
                <circle cx={colX[2]} cy={cy} r={circleR} fill="#222222" stroke="#111111" strokeWidth={1.5} />
                <text x={colX[2]} y={cy + 5} textAnchor="middle" fill="#ffffff" fontSize={13} fontWeight="600">{formatVal(fgValues[i])}</text>

                {/* Arrow 1: Domain -> g(x) */}
                {phase >= 1 && (
                  <motion.line
                    x1={ax1} y1={cy}
                    x2={ax2} y2={cy}
                    stroke="#555555"
                    strokeWidth={2}
                    markerEnd="url(#ad-arrow-1)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: i * 0.12, duration: 0.35 }}
                  />
                )}

                {/* Arrow 2: g(x) -> f(g(x)) */}
                {phase >= 2 && (
                  <motion.line
                    x1={bx1} y1={cy}
                    x2={bx2} y2={cy}
                    stroke="#111111"
                    strokeWidth={2}
                    markerEnd="url(#ad-arrow-2)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: i * 0.12, duration: 0.35 }}
                  />
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 mt-3 text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <svg width="24" height="10" viewBox="0 0 24 10">
            <defs>
              <marker id="leg-1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#555555" />
              </marker>
            </defs>
            <line x1="0" y1="5" x2="18" y2="5" stroke="#555555" strokeWidth="2" markerEnd="url(#leg-1)" />
          </svg>
          g(x) = {gExpr}
        </span>
        <span className="flex items-center gap-2">
          <svg width="24" height="10" viewBox="0 0 24 10">
            <defs>
              <marker id="leg-2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#111111" />
              </marker>
            </defs>
            <line x1="0" y1="5" x2="18" y2="5" stroke="#111111" strokeWidth="2" markerEnd="url(#leg-2)" />
          </svg>
          f(x) = {fExpr}
        </span>
      </div>
    </div>
  )
}
