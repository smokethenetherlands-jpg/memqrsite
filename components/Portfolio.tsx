'use client'
import { motion } from 'framer-motion'

export default function Portfolio({ photos }: { photos: string[] }) {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold">Примеры работ</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="overflow-hidden rounded-2xl border bg-white/70"
          >
            <img src={src} className="h-40 w-full object-cover md:h-48" alt="" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
