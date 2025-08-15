import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { name, contact, message, company /*honeypot*/ } = await req.json()

    // honeypot: если поле заполнено — это бот
    if (company) return NextResponse.json({ ok: true })

    if (!name || !contact) {
      return NextResponse.json({ ok: false, error: 'Заполните имя и контакт' }, { status: 400 })
    }

    // 1) Telegram
    const token = process.env.TG_BOT_TOKEN!
    const chatId = process.env.TG_CHAT_ID!
    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: 'Телеграм не настроен' }, { status: 500 })
    }

    const text =
      `*Новая заявка с memqr.ru*\n` +
      `*Имя:* ${md(name)}\n` +
      `*Контакт:* ${md(contact)}\n` +
      (message ? `*Комментарий:* ${md(message)}` : '')

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown', disable_web_page_preview: true }),
    })
    if (!tgRes.ok) {
      const err = await tgRes.text()
      return NextResponse.json({ ok: false, error: `TG error: ${err}` }, { status: 500 })
    }

    // 2) (опционально) пишем лид в Supabase
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!, // серверный ключ; RLS обходит
        { auth: { persistSession: false } }
      )
      await supabase.from('leads').insert({
        name, contact, message, source: 'memqr.ru', created_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}

function md(s: string) {
  return s.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&')
}
