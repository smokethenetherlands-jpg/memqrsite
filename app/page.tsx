import BrandHeader from '@/components/BrandHeader';
import ContactForm from '@/components/ContactForm';

const gallery = [
  '/gallery/1.jpg',
  '/gallery/2.jpg',
  '/gallery/3.jpg',
  '/gallery/4.jpg',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF9F7] text-neutral-900">
      <BrandHeader />

      {/* HERO */}
      <section className="relative border-b border-black/5 bg-[radial-gradient(1200px_600px_at_75%_20%,rgba(255,182,130,0.12),transparent_40%),radial-gradient(1000px_500px_at_20%_10%,rgba(0,0,0,0.06),transparent_45%)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-neutral-600 backdrop-blur">
              QR-коды памяти на memqr.ru
            </div>
            <h1 className="mb-5 text-4xl font-black leading-tight md:text-5xl">
              Один скан — живая<br />память.
            </h1>
            <p className="mb-7 max-w-xl text-[15px] text-neutral-700">
              Я создаю аккуратные таблички с QR-кодами, которые ведут на достойно
              оформленную страницу памяти на memqr.ru. На странице — биография,
              фото, видео, важные даты и тёплые воспоминания.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-white/80"
              >
                Посмотреть примеры
              </a>
              <a
                href="#request"
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
              >
                Оставить заявку <span aria-hidden>➝</span>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-neutral-600">
              <div className="rounded-xl border border-black/10 bg-white px-3 py-2 text-center">
                Долговечные материалы
              </div>
              <div className="rounded-xl border border-black/10 bg-white px-3 py-2 text-center">
                Индивидуальный подход
              </div>
              <div className="rounded-xl border border-black/10 bg-white px-3 py-2 text-center">
                Уточнённый дизайн
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-md">
            {/* QR-бейдж с свечой справа — просто изображение из /public */}
            <img
              src="/qr-candle.svg"
              alt="QR со свечой"
              className="mx-auto w-72 drop-shadow-xl md:w-80"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="mb-6 text-2xl font-bold">О проекте QR Memory</h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="prose max-w-none text-[15px] text-neutral-800">
            <ul className="list-disc pl-5">
              <li>Эстетичные таблички под вашу стилистику памятника</li>
              <li>Личный кабинет: вы сами редактируете страницу памяти</li>
              <li>Надёжный редирект и контроль ссылки на вашей стороне</li>
              <li>Страница памяти с биографией, фото и видео</li>
              <li>Возможность обновлять материалы без замены таблички</li>
            </ul>
          </div>

          {/* мини-галерея справа */}
          <div className="rounded-2xl border border-black/10 bg-white p-3">
            <div className="grid grid-cols-2 gap-3">
              {gallery.slice(0, 4).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="border-y border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="mb-10 text-2xl font-bold">Как это работает</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              ['Заявка', 'Вы оставляете заявку и отправляете материалы.'],
              ['Дизайн', 'Создаю страницу памяти и даю доступ в личный кабинет.'],
              ['QR и печать', 'Готовлю QR-код с редиректом на страницу.'],
              ['Доставка', 'Отправляю табличку удобной доставкой.'],
            ].map(([title, text], i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/10 bg-white p-5"
              >
                <div className="mb-2 text-sm font-semibold text-neutral-500">
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </div>
                <div className="mb-2 font-medium">{title}</div>
                <div className="text-[15px] text-neutral-700">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="mb-6 text-2xl font-bold">Примеры работ</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* CONTACTS + FORM */}
      <section id="request" className="border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
          <div id="contacts">
            <h2 className="mb-3 text-2xl font-bold">Оставить заявку</h2>
            <p className="mb-6 text-[15px] text-neutral-700">
              Напишите, и я свяжусь с вами, чтобы уточнить детали.
            </p>
            <ul className="mb-8 grid gap-3 text-[15px] text-neutral-800">
              <li>Телефон/WhatsApp: <span className="text-neutral-500">по запросу</span></li>
              <li>Email: <a href="mailto:hello@memqr.ru" className="underline underline-offset-2">hello@memqr.ru</a></li>
              <li>Сайт: <a href="https://memqr.ru" className="underline underline-offset-2">memqr.ru</a></li>
            </ul>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
