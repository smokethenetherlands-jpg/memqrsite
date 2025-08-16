'use client';

import Link from 'next/link';

export default function BrandHeader() {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Логотип + QR со свечой */}
          <img
            src="/qr-candle.svg"
            alt="QR Memory"
            className="h-8 w-8 shrink-0"
            loading="eager"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold">QR Memory</div>
            <div className="text-[11px] text-neutral-500">memqr.ru</div>
          </div>
        </div>

        <nav className="hidden gap-6 text-sm text-neutral-700 md:flex">
          <Link href="#about" className="hover:text-black">О проекте</Link>
          <Link href="#how" className="hover:text-black">Как это работает</Link>
          <Link href="#gallery" className="hover:text-black">Примеры</Link>
          <Link href="#contacts" className="hover:text-black">Контакты</Link>
          <Link href="/login" className="hover:text-black">Вход</Link>
        </nav>

        <Link
          href="#request"
          className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"
        >
          Заказать <span aria-hidden>➝</span>
        </Link>
      </div>
    </div>
  );
}
