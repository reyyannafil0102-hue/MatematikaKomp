'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: 'violet' | 'blue' | 'pink' | 'green'
  onClick?: () => void
}

export default function GlassCard({ children, className, hover = true, onClick }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        'glass p-6 relative overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
