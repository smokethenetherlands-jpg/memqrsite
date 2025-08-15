// app/page.tsx
import BrandHeader from "@/components/BrandHeader";
import HoverGlow from "@/components/HoverGlow";
import NoiseBackdrop from "@/components/NoiseBackdrop";
import ORBadge from "@/components/ORBadge";
import Portfolio from "@/components/Portfolio";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "QR Memory — страницы памяти с QR‑кодом",
  description:
    "Оставьте заявку на изготовление таблички с QR‑кодом и созданием страницы памяти.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="relative overflow-hidden">
        <NoiseBackdrop />
        <div className="relative z-10">
          <BrandHeader />
        </div>
      </header>

      <section className="relative py-16 md:py-20">
        <div className="container mx-auto px-4">
          <HoverGlow />
          <div className="mt-8 flex items-center gap-3">
            <ORBadge />
            <p className="text-sm text-neutral-600">
              QR‑коды памяти на&nbsp;memqr.ru
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Portfolio />
        </div>
      </section>

      <section id="contact" className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="mb-2 text-2xl font-bold">Оставить заявку</h2>
            <p className="mb-6 text-neutral-600">
              Заполните форму — я отвечу удобным для вас способом и уточню
              детали.
            </p>
            <ContactForm />
          </div>
          <aside className="rounded-2xl border border-neutral-200/70 bg-white/50 p-6 text-sm text-neutral-700 shadow-sm backdrop-blur">
            <h3 className="mb-2 text-lg font-medium">Контакты</h3>
            <ul className="space-y-1">
              <li>Telegram: @your_nick</li>
              <li>Почта: hello@memqr.ru</li>
            </ul>
            <p className="mt-4 text-neutral-600">
              На странице памяти — биография, фото, видео, важные даты и
              тёплые воспоминания.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
