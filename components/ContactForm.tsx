'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setOk(false);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name')?.toString() || '',
      contact: fd.get('contact')?.toString() || '',
      message: fd.get('message')?.toString() || '',
    };

    try {
      // если у тебя сейчас другой путь (например /.netlify/functions/send-telegram) — просто замени строку ниже
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || 'Не удалось отправить.');
      }
      setOk(true);
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || 'Ошибка сети');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm text-neutral-600">Ваше имя</span>
        <input
          name="name"
          required
          placeholder="Иван"
          className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900 placeholder-neutral-400 outline-none ring-2 ring-transparent transition focus:border-neutral-300 focus:ring-neutral-200"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-neutral-600">Контакт (телефон или email)</span>
        <input
          name="contact"
          required
          placeholder="+7... / name@mail.com"
          className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-[15px] text-neutral-900 placeholder-neutral-400 outline-none ring-2 ring-transparent transition focus:border-neutral-300 focus:ring-neutral-200"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-neutral-600">Комментарий</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Кого увековечиваем, какие материалы есть..."
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder-neutral-400 outline-none ring-2 ring-transparent transition focus:border-neutral-300 focus:ring-neutral-200"
        />
      </label>

      <button
        disabled={loading}
        className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-[15px] font-medium text-white shadow-sm hover:bg-black disabled:opacity-60"
      >
        {loading ? 'Отправляю…' : 'Отправить заявку'} <span className="ml-2" aria-hidden>➝</span>
      </button>

      {ok && <p className="text-sm text-emerald-600">Заявка отправлена. Я свяжусь с вами.</p>}
      {error && <p className="text-sm text-rose-600">Ошибка: {error}</p>}

      <p className="mt-2 text-center text-[12px] text-neutral-400">
        Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
