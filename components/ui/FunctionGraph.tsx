'use client'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceDot
} from 'recharts'
import { generatePoints } from '@/lib/mathUtils'
import { useMemo } from 'react'

interface Props {
  fx?: string
  gx?: string
  showF?: boolean
  showG?: boolean
  showFoG?: boolean
  showGoF?: boolean
  activeX?: number
  height?: number
}

export default function FunctionGraph({
  fx = '2*x + 1',
  gx = 'x^2',
  showF = true,
  showG = true,
  showFoG = false,
  showGoF = false,
  activeX,
  height = 300,
}: Props) {
  const data = useMemo(() => {
    const fPoints = showF ? generatePoints(fx, -5, 5, 80) : []
    const gPoints = showG ? generatePoints(gx, -5, 5, 80) : []
    const fogPoints = showFoG ? generatePoints(`(${fx.replace(/x/g, `(${gx})`)})`, -5, 5, 80) : []
    const gofPoints = showGoF ? generatePoints(`(${gx.replace(/x/g, `(${fx})`)})`, -5, 5, 80) : []

    const allX = new Set([
      ...fPoints.map(p => p.x),
      ...gPoints.map(p => p.x),
    ])

    return Array.from(allX).sort((a, b) => a - b).map(x => {
      const fp = fPoints.find(p => p.x === x)
      const gp = gPoints.find(p => p.x === x)
      const fogp = fogPoints.find(p => p.x === x)
      const gofp = gofPoints.find(p => p.x === x)
      return {
        x,
        f: fp?.y ?? null,
        g: gp?.y ?? null,
        fog: fogp?.y ?? null,
        gof: gofp?.y ?? null,
      }
    })
  }, [fx, gx, showF, showG, showFoG, showGoF])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-xs shadow-sm">
          <p className="text-gray-400 mb-1">x = {typeof label === 'number' ? label.toFixed(2) : label}</p>
          {payload.map((p: { name: string; value: number; color: string }, i: number) => (
            <p key={i} style={{ color: p.color }} className="font-medium">
              {p.name} = {typeof p.value === 'number' ? p.value.toFixed(3) : p.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="x"
          type="number"
          domain={[-5, 5]}
          tickCount={11}
          stroke="#cccccc"
          tick={{ fill: '#999999', fontSize: 11 }}
        />
        <YAxis
          domain={[-10, 30]}
          stroke="#cccccc"
          tick={{ fill: '#999999', fontSize: 11 }}
        />
        <Tooltip content={customTooltip} />
        <Legend
          wrapperStyle={{ fontSize: '12px', color: '#666666' }}
        />
        {showF && (
          <Line
            type="monotone"
            dataKey="f"
            name="f(x)"
            stroke="#555555"
            strokeWidth={2}
            dot={false}
            connectNulls={false}
          />
        )}
        {showG && (
          <Line
            type="monotone"
            dataKey="g"
            name="g(x)"
            stroke="#999999"
            strokeWidth={2}
            dot={false}
            connectNulls={false}
          />
        )}
        {showFoG && (
          <Line
            type="monotone"
            dataKey="fog"
            name="(f∘g)(x)"
            stroke="#111111"
            strokeWidth={2.5}
            dot={false}
            connectNulls={false}
          />
        )}
        {showGoF && (
          <Line
            type="monotone"
            dataKey="gof"
            name="(g∘f)(x)"
            stroke="#333333"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={false}
            connectNulls={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
