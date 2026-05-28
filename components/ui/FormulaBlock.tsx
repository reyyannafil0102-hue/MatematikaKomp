'use client'
import { useEffect, useRef } from 'react'
import katex from 'katex'
import { cn } from '@/lib/utils'

interface Props {
  math: string
  display?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

function KatexRenderer({ math, display, className }: { math: string; display: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    try {
      katex.render(math, ref.current, {
        displayMode: display,
        throwOnError: false,
        errorColor: '#7C3AED',
        trust: false,
      })
    } catch {
      if (ref.current) ref.current.textContent = math
    }
  }, [math, display])

  return <span ref={ref} className={className} />
}

export default function FormulaBlock({ math, display = false, size = 'md', className }: Props) {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
  }[size]

  if (display) {
    return (
      <div className={cn('overflow-x-auto py-2', sizeClass, className)}>
        <KatexRenderer math={math} display={true} />
      </div>
    )
  }

  return (
    <span className={cn('inline-block align-middle', sizeClass, className)}>
      <KatexRenderer math={math} display={false} />
    </span>
  )
}
