'use client'
import { motion } from 'framer-motion'

export default function NoiseBackdrop() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.12 }}
      transition={{ duration: 1.2 }}
      style={{
        backgroundImage:
          'radial-gradient(circle at 25% 15%, rgba(0,0,0,.05), transparent 40%), radial-gradient(circle at 75% 60%, rgba(0,0,0,.06), transparent 45%)',
        backdropFilter: 'saturate(110%)',
      }}
    />
  )
}
