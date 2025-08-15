'use client';
import React, { useState } from 'react';

type State = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<State>('idle');
  const [err, setErr] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setErr('');
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message }),
      });
      let data = {};
      try { data = await res.json(); } catch {}
      // @ts-ignore
      if (!res.ok || (data && data.ok !== true)) {
        // @ts-ignore
        const msg = (data && data.error) ? data.error : `HTTP ${res.status}`;
        throw new Error(msg);
      }
      setState('ok');
      setName(''); setContact(''); setMessage('');
    } catch (e) {
      // @ts-ignore
      setErr(e?.message || 'Ошибка отправки');
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder="Ваше имя"
        className="rounded-xl border px-3 py-2 bg-white text-neutral-900 placeholder:text-neutral-400"
        required
      />
      <input
        value={contact}
        onChange={(e)=>setContact(e.target.value)}
        placeholder="+7... или name@mail.com"
        className="rounded-xl border px-3 py-2 bg-white text-neutral-900 placeholder:text-neutral-400"
        required
      />
      <textarea
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        placeholder="Кого увековечиваем, какие материалы есть…"
        className="rounded-xl border px-3 py-2 bg-white text-neutral-900 placeholder:text-neutral-400 min-h-[140px]"
      />
      <button
        type="submit"
        disabled={state==='sending'}
        className="rounded-xl bg-neutral-900 text-white px-3 py-2 disabled:opacity-60"
      >
        {state==='sending' ? 'Отправка…' : 'Отправить заявку'}
      </button>

      {state==='ok' && (
        <p className="text-sm text-emerald-600">Заявка отправлена. Спасибо!</p>
      )}
      {state==='error' && (
        <p className="text-sm text-rose-600">Ошибка: {err}</p>
      )}
    </form>
  );
}
