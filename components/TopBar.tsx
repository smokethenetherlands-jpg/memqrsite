'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`sticky top-0 z-50 transition backdrop-blur ${scrolled ? 'bg-white/75 border-b' : 'bg-white/40'}`}>
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">QR Memory</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          <a href="#how" className="hover:text-black">Как это работает</a>
          <a href="#contact" className="hover:text-black">Контакты</a>
          <Link href="/login" className="rounded-lg border px-3 py-1.5 hover:bg-white">Войти</Link>
        </nav>
      </div>
    </div>
  )
}
