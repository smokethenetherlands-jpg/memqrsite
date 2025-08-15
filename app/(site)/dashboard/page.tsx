import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabaseServer'

export default async function DashboardPage() {
  const supabase = supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: memorials, error } = await supabase
    .from('memorials')
    .select('id,name,slug,visibility')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="mx-auto max-w-4xl p-6">Ошибка: {error.message}</div>
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-4">Мои страницы памяти</h1>
      <div className="grid gap-3">
        {memorials?.length ? memorials.map((m: any) => (
          <div key={m.id} className="rounded-xl border p-4">
            <div className="font-semibold">{m.name}</div>
            <div className="text-sm text-neutral-600">URL: /m/{m.slug} · Видимость: {m.visibility}</div>
          </div>
        )) : (
          <div className="text-neutral-600">Пока пусто. Создайте первую страницу памяти.</div>
        )}
      </div>
    </div>
  )
}
