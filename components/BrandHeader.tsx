'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { QrCode } from 'lucide-react'

export default function BrandHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-neutral-200/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: -8 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900 text-white">
            <QrCode className="h-5 w-5" />
          </motion.div>
          <div>
            <div className="text-sm font-semibold tracking-wide">QR Memory</div>
            <span className="text-xs text-neutral-500">memqr.ru</span>
          </div>
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#about" className="hover:opacity-70">О проекте</a>
          <a href="#how" className="hover:opacity-70">Как это работает</a>
          <a href="#portfolio" className="hover:opacity-70">Примеры</a>
          <a href="#contact" className="hover:opacity-70">Контакты</a>
          <Link href="/login" className="hover:opacity-70">Вход</Link>
        </nav>
        <Link href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white shadow hover:shadow-md">
          Кабинет
        </Link>
      </div>
    </header>
  )
}
