import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "QR Memory — страницы памяти с QR‑кодом",
  description: "Оставьте заявку на изготовление таблички с QR‑кодом и созданием страницы памяти.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Другие секции страницы (герой, портфолио и т.п.) */}

      {/* Секция «Оставить заявку» */}
      <section id="contact" className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="mb-3 text-2xl font-semibold">Оставить заявку</h2>
            <p className="mb-6 text-sm text-neutral-600">
              Заполните форму — я отвечу удобным для вас способом и уточню детали.
            </p>
            <ContactForm />
          </div>

          {/* Правая колонка — контакты/пояснения, как у тебя было на макете */}
          <aside className="rounded-3xl border border-neutral-200/70 bg-white/50 p-6 text-sm text-neutral-700 shadow-sm backdrop-blur">
            <h3 className="mb-2 text-lg font-medium">Контакты</h3>
            <ul className="space-y-1">
              <li>Telegram: @your_nick</li>
              <li>Почта: hello@memqr.ru</li>
            </ul>
            <p className="mt-4 text-neutral-600">
              На странице памяти — биография, фото, видео, важные даты и тёплые воспоминания.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
