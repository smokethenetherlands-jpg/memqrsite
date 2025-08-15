'use client'
import { motion } from 'framer-motion'

export default function QRBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.6 }}
      className="relative isolate w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-3xl border bg-white/85 shadow-lg overflow-hidden rotate-[-8deg]"
    >
      {/* мягкая аура */}
      <div className="absolute -inset-8 rounded-[40px] bg-[conic-gradient(from_180deg_at_50%_50%,#9ca3af33_0deg,transparent_120deg,#9ca3af33_240deg,transparent_360deg)] opacity-60" />
      {/* псевдо-QR из модулей */}
      <div className="relative grid grid-cols-9 gap-[3px] p-5 z-10">
        {Array.from({ length: 81 }).map((_, i) => {
          const on = [0,1,2, 9,10,11, 18,19,20,   60,61,62,69,70,71,78,79,80,   32,34,40,41,42,47,49].includes(i)
          return (
            <div key={i} className="h-4 w-4 rounded-[2px] bg-neutral-900/90"
              style={{ opacity: on ? 1 : 0.08 }} />
          )
        })}
      </div>
      {/* глянец */}
      <div className="absolute inset-x-0 -top-10 h-28 bg-white/40 blur-2xl" />
      <div className="absolute bottom-3 left-3 text-[11px] tracking-wide text-neutral-600">QR Memory</div>
    </motion.div>
  )
}
