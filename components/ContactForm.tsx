'use client'
import React, { useState } from 'react'

type State = 'idle' | 'sending' | 'ok' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [comment, setComment] = useState('')
  const [state, setState] = useState<State>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    setError(null)
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, comment }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || `HTTP ${res.status}`)
      }
      setState('ok')
      setName(''); setContact(''); setComment('')
    } catch (err:any) {
      setError(err.message || 'Не удалось отправить')
      setState('error')
    }
  }

  const disabled = state === 'sending'

  return (
    <form onSubmit={onSubmit} className="grid gap-3 max-w-xl w-full">
      <input
        className="rounded-xl border px-3 py-2 bg-neutral-900/60 text-white placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-500"
        placeholder="Ваше имя"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
      />
      <input
        className="rounded-xl border px-3 py-2 bg-neutral-900/60 text-white placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-500"
        placeholder="Контакт (телефон или email)"
        value={contact}
        onChange={(e)=>setContact(e.target.value)}
        required
      />
      <textarea
        className="rounded-xl border px-3 py-2 bg-neutral-900/60 text-white placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-500 min-h-32"
        placeholder="Комментарий"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
      />
      <button
        type="submit"
        disabled={disabled}
        className="rounded-xl bg-black text-white px-4 py-3 disabled:opacity-60"
      >
        {state === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
      </button>
      {state === 'ok' && <p className="text-sm text-emerald-400">Заявка отправлена. Я свяжусь с вами.</p>}
      {state === 'error' && <p className="text-sm text-red-400">Ошибка: {error}</p>}
    </form>
  )
}
