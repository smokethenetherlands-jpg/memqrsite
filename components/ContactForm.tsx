'use client';

import { useState } from 'react';

type Payload = {
  name: string;
  contact: string;
  message: string;
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOk(false);

    // простая валидация
    if (!name.trim() || !contact.trim() || !message.trim()) {
      setError('Заполни, пожалуйста, все поля.');
      return;
    }

    setSending(true);
    try {
      const payload: Payload = { name, contact, message };
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || 'Не удалось отправить заявку');
      }

      setOk(true);
      setName('');
      setContact('');
      setMessage('');
    } catch (err: any) {
      setError(err?.message || 'Ошибка отправки заявки');
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
        className="rounded-2xl border border-neutral-200/70 bg-white/70 px-4 py-3 outline-none transition
                   focus:ring-2 focus:ring-black/10"
      />
      <input
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="+7… или name@mail.com"
        className="rounded-2xl border border-neutral-200/70 bg-white/70 px-4 py-3 outline-none transition
                   focus:ring-2 focus:ring-black/10"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Кого увековечиваем, какие материалы есть…"
        rows={6}
        className="rounded-2xl border border-neutral-200/70 bg-white/70 px-4 py-3 outline-none transition
                   focus:ring-2 focus:ring-black/10"
      />
      <button
        disabled={sending}
        className="rounded-2xl bg-neutral-900 px-5 py-3 text-white transition disabled:opacity-60">
        {sending ? 'Отправляю…' : 'Отправить заявку'}
      </button>

      {ok && (
        <p className="text-sm text-green-600">
          Заявка отправлена. Я свяжусь с вами в ближайшее время.
        </p>
      )}
      {error && <p className="text-sm text-rose-600">Ошибка: {error}</p>}
    </form>
  );
}
