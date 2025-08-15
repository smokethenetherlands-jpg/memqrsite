'use client';

import React, { useState } from 'react';

type FormState =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'ok' }
  | { status: 'error'; message: string };

export default function ContactForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [state, setState] = useState<FormState>({ status: 'idle' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.status === 'sending') return;

    setState({ status: 'sending' });

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, comment }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }

      setState({ status: 'ok' });
      setName('');
      setContact('');
      setComment('');
    } catch (err: any) {
      setState({ status: 'error', message: err?.message || 'Ошибка отправки' });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Ваше имя"
        className="rounded-xl border px-3 py-2 bg-neutral-900 text-white placeholder:text-neutral-400"
        required
      />
      <input
        value={contact}
        onChange={e => setContact(e.target.value)}
        placeholder="+7... / name@mail.com"
        className="rounded-xl border px-3 py-2 bg-neutral-900 text-white placeholder:text-neutral-400"
        required
      />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Кого увековечиваем, какие материалы есть..."
        className="rounded-xl border px-3 py-2 bg-neutral-900 text-white placeholder:text-neutral-400 min-h-[140px]"
      />
      <button
        type="submit"
        disabled={state.status === 'sending'}
        className="rounded-xl bg-neutral-900 text-white px-3 py-2 disabled:opacity-50"
      >
        {state.status === 'sending' ? 'Отправка…' : 'Отправить заявку'}
      </button>

      {state.status === 'ok' && (
        <p className="text-sm text-emerald-400">Заявка отправлена. Спасибо!</p>
      )}
      {state.status === 'error' && (
        <p className="text-sm text-rose-400">Ошибка: {state.message}</p>
      )}
    </form>
  );
}
