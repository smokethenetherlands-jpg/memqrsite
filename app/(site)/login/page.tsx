'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()
  const supabase = supabaseClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/dashboard')
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) router.replace('/dashboard')
    })
    return () => { sub.subscription.unsubscribe() }
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
    if (error) alert(error.message)
    else setSent(true)
  }

  return (
    <div className="mx-auto max-w-md p-6 my-16 rounded-2xl border bg-white/70 backdrop-blur">
      <h1 className="text-2xl font-bold mb-4">Вход в личный кабинет</h1>
      {sent ? (
        <p className="text-sm text-neutral-700">Ссылка для входа отправлена на {email}.</p>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-3">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="rounded-xl border px-3 py-2" />
          <button className="rounded-xl bg-neutral-900 text-white px-3 py-2">Получить ссылку для входа</button>
        </form>
      )}
    </div>
  )
}
