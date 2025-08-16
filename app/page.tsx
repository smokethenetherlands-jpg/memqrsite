'use client'

import TopBar from '@/components/TopBar'
import HeroQR from '@/components/HeroQR'

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <TopBar />

      {/* HERO */}
      <section className="relative pt-28 md:pt-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* Левый столбец: заголовок и CTA */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] text-neutral-600 bg-white/80 backdrop-blur">
                QR Memory · memqr.ru
              </span>
              <h1 className="mt-4 text-4xl md:text-[44px] font-semibold leading-tight tracking-tight">
                Бережные QR‑коды и <br className="hidden md:block" />
                страницы памяти
              </h1>
              <p className="mt-4 text-[15px] text-neutral-600 leading-relaxed max-w-prose">
                QR‑табличка со ссылкой на персональную страницу памяти. Доставка. 
                Личный кабинет для близких — можно самостоятельно редактировать историю, фото и видео.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#contact" className="rounded-xl bg-neutral-900 text-white px-5 py-3 hover:bg-neutral-800 transition">
                  Оформить память
                </a>
                <a href="#how" className="rounded-xl border px-5 py-3 text-neutral-800 hover:bg-white transition">
                  Как это работает
                </a>
              </div>

              {/* полоса мини‑аватаров как в прежней версии */}
              <div className="mt-6 flex items-center gap-4 text-sm text-neutral-500">
                <div className="flex -space-x-2">
                  <img src="/photos/065cfebaedb06404f183b22ab5dbff96.jpg" alt="" className="w-9 h-9 rounded-full object-cover border" />
                  <img src="/photos/5db8a1a909faa39eae7f3d7252b67e52.jpg" alt="" className="w-9 h-9 rounded-full object-cover border" />
                  <img src="/photos/8a9ac8a619396f3500fe389d9694432a.jpg" alt="" className="w-9 h-9 rounded-full object-cover border" />
                  <img src="/photos/bfd53420bcebecb1c0e5ecf5c1b4b5ce.jpg" alt="" className="w-9 h-9 rounded-full object-cover border" />
                </div>
                <span>С любовью и вниманием к деталям</span>
              </div>
            </div>

            {/* Правый столбец: декоративный QR */}
            <div className="relative">
              <HeroQR />
            </div>
          </div>
        </div>
      </section>

      {/* Примеры/портфолио — опционально */}
      <section id="portfolio" className="py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-6">Примеры</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <img src="/photos/065cfebaedb06404f183b22ab5dbff96.jpg" className="rounded-xl object-cover" alt="" />
            <img src="/photos/5db8a1a909faa39eae7f3d7252b67e52.jpg" className="rounded-xl object-cover" alt="" />
            <img src="/photos/8a9ac8a619396f3500fe389d9694432a.jpg" className="rounded-xl object-cover" alt="" />
            <img src="/photos/bfd53420bcebecb1c0e5ecf5c1b4b5ce.jpg" className="rounded-xl object-cover" alt="" />
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section id="how" className="py-16 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-4">Как это работает</h2>
          <ol className="space-y-2 text-neutral-700 list-decimal pl-5">
            <li>Оставляете заявку на сайте — кнопка ниже.</li>
            <li>Письмо для входа в личный кабинет придёт на почту.</li>
            <li>Создаёте страницу памяти (фото, текст, видео) самостоятельно.</li>
            <li>Получаете QR‑табличку с доставкой.</li>
          </ol>
        </div>
      </section>

      {/* Контакты / форма */}
      <section id="contact" className="py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-semibold mb-6">Оставить заявку</h2>
          <p className="text-neutral-600 mb-4">
            Ваша форма остаётся прежней (через Netlify Functions + Telegram). 
            Чтобы текст при вводе был виден, используйте классы полей: 
            <code> bg-white text-neutral-900 placeholder-neutral-400 </code>.
          </p>
        </div>
      </section>
    </main>
  )
}
