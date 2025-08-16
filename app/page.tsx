// app/page.tsx (hotfix: .jp -> .jpg in first image)
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "QR Memory — страницы памяти с QR-кодом",
  description:
    "Один скан — живая память. Аккуратные таблички с QR-кодами, ведущими на страницу памяти.",
};

const photos = [
  "https://eezvkzgssllsvzuklnhv.supabase.co/storage/v1/object/public/memqr%20photo/065cfebaedb06404f183b22ab5dbff96.jpg",
  "https://eezvkzgssllsvzuklnhv.supabase.co/storage/v1/object/public/memqr%20photo/5db8a1a909faa39eae7f3d7252b67e52.jpg",
  "https://eezvkzgssllsvzuklnhv.supabase.co/storage/v1/object/public/memqr%20photo/8a9ac8a619396f3500fe389d9694432a.jpg",
  "https://eezvkzgssllsvzuklnhv.supabase.co/storage/v1/object/public/memqr%20photo/bfd53420bcebecb1c0e5ecf5c1b4b5ce.jpg",
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="border-b bg-neutral-50/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-500">
                memqr.ru — QR-коды памяти
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Один скан — живая память.
              </h1>
              <p className="mb-8 text-neutral-600">
                Таблички с QR-кодами ведут на красиво оформленную страницу памяти: фото,
                биография, важные даты и тёплые воспоминания. Личный кабинет — редактируете сами.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#examples" className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm hover:bg-neutral-50">
                  Примеры
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                  Оставить заявку
                </a>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <Image
                  src={photos[0]}
                  alt="QR-память — пример"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section className="py-12 md:py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">О проекте QR Memory</h2>
            <p className="mb-5 text-neutral-700">
              Бережно соединяю офлайн-память с живой цифровой историей.
              QR-код ведёт на персональную страницу памяти на memqr.ru, где вы сами
              наполняете материалы в любое время.
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li>• Индивидуальный дизайн под памятник</li>
              <li>• Личный кабинет для семьи</li>
              <li>• Редиректом управляю я — без сторонних сервисов</li>
              <li>• Фото, видео, биография, воспоминания</li>
              <li>• Доставка табличек (установку не выполняю)</li>
            </ul>
          </div>

          <div id="examples">
            <h3 className="mb-3 text-lg font-medium">Как это выглядит</h3>
            <div className="grid grid-cols-2 gap-4">
              {photos.slice(1).map((src, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-white">
                  <Image
                    src={src}
                    alt={`Пример ${i + 1}`}
                    width={640}
                    height={480}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* КАК ЭТО РАБОТАЕТ */}
      <section className="border-y bg-neutral-50/40">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-14">
          <h2 className="mb-8 text-2xl font-semibold">Как это работает</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              ["Заявка", "Вы оставляете заявку и отправляете материалы."],
              ["Дизайн", "Готовлю страницу памяти и подключаю личный кабинет."],
              ["QR и печать", "Формирую QR с редиректом, изготавливаю табличку."],
              ["Доставка", "Отправляю удобной службой доставки."],
            ].map(([title, text], i) => (
              <div key={i} className="rounded-xl border border-neutral-200 bg-white p-4 text-neutral-700">
                <div className="mb-2 text-sm font-semibold">{i + 1}. {title}</div>
                <div className="text-sm">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФОРМА */}
      <section className="py-12 md:py-16" id="contact">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">Оставить заявку</h3>
            <p className="mb-6 text-sm text-neutral-600">
              Заполните форму — я свяжусь с вами и уточню детали.
            </p>
            <ContactForm />
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold">Почему QR Memory</h2>
            <ul className="space-y-3 text-neutral-700">
              <li>• Эстетично и долговечно</li>
              <li>• Вся информация — по одному скану</li>
              <li>• Изменения без замены таблички</li>
              <li>• Личный доступ к редактированию 24/7</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
