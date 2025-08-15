// components/ContactForm.tsx
'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    setOk(false);
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'Ошибка отправки');
      setOk(true);
      setName('');
      setContact('');
      setMessage('');
    } catch (err: any) {
      setError(err?.message || 'Не удалось отправить');
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none"
      />
      <input
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="+7… или name@mail.com"
        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Кого увековечиваем, какие материалы есть…"
        rows={6}
        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none"
      />
      <button
        disabled={sending}
        className="rounded-xl bg-neutral-900 px-5 py-3 text-white transition hover:bg-neutral-800 disabled:opacity-60"
      >
        {sending ? 'Отправляю…' : 'Отправить заявку'}
      </button>
      {ok && <p className="text-sm text-green-600">Заявка отправлена. Спасибо! Я свяжусь с вами.</p>}
      {error && <p className="text-sm text-red-600">Ошибка: {error}</p>}
    </form>
  );
}
