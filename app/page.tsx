'use client'

import HeroQR from '@/components/HeroQR'
import TopBar from '@/components/TopBar'

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(1200px_420px_at_65%_0%,rgba(246,243,238,.9),rgba(255,255,255,0))]">
      {/* фиксированная плашка наверху */}
      <TopBar />

      {/* HERO */}
      <section className="relative pt-28 md:pt-32">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Левый столбец — текст */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-600 bg-white/70 backdrop-blur">
                QR Memory · memqr.ru
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
                Бережные QR‑код таблички <br className="hidden md:block" />
                и страницы памяти
              </h1>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                Создаю QR‑коды с бережным редиректом на персональную страницу памяти.
                Доставка по РФ и СНГ. Личный кабинет — близкие сами редактируют
                историю, фото и видео.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#contact" className="rounded-xl bg-neutral-900 text-white px-5 py-3 hover:bg-neutral-800 transition">
                  Оформить память
                </a>
                <a href="#how" className="rounded-xl border px-5 py-3 text-neutral-800 hover:bg-white transition">
                  Как это работает
                </a>
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm text-neutral-500">
                <div className="flex -space-x-2">
                  <img src="/photos/065cfebaedb06404f183b22ab5dbff96.jpg" alt="" className="w-8 h-8 rounded-full object-cover border" />
                  <img src="/photos/5db8a1a909faa39eae7f3d7252b67e52.jpg" alt="" className="w-8 h-8 rounded-full object-cover border" />
                  <img src="/photos/8a9ac8a619396f3500fe389d9694432a.jpg" alt="" className="w-8 h-8 rounded-full object-cover border" />
                </div>
                <span>С любовью и вниманием к деталям</span>
              </div>
            </div>

            {/* Правый столбец — декоративный QR */}
            <div className="relative">
              <HeroQR />
            </div>
          </div>
        </div>
      </section>

      {/* Прокрутка к остальным секциям (заглушки, чтобы не падала верстка) */}
      <section id="how" className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-4">Как это работает</h2>
          <ol className="space-y-2 text-neutral-700 list-decimal pl-5">
            <li>Оформляете заявку на сайте.</li>
            <li>Получаете письмо для входа в личный кабинет.</li>
            <li>Создаёте страницу памяти: фото, тексты, видео.</li>
            <li>Получаете QR‑табличку с доставкой.</li>
          </ol>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white/60 backdrop-blur">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-semibold mb-6">Оставить заявку</h2>
          {/* Оставляем место под вашу форму, чтобы не ломать проект */}
          <p className="text-neutral-600">
            Здесь будет ваша форма (у вас уже подключена через Netlify Functions и Telegram).
          </p>
        </div>
      </section>
    </main>
  )
}
