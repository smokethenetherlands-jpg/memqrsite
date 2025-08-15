import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, contact, comment } = await req.json()
    const token = process.env.TG_BOT_TOKEN
    const chatId = process.env.TG_CHAT_ID
    if (!token || !chatId) {
      return new Response(JSON.stringify({ error: 'Bot credentials are missing' }), { status: 500 })
    }
    const text =
      `📝 Новая заявка\n` +
      `Имя: ${name || '-'}\n` +
      `Контакт: ${contact || '-'}\n` +
      `Комментарий: ${comment || '-'}`

    const url = `https://api.telegram.org/bot${token}/sendMessage`
    const tgRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    })
    if (!tgRes.ok) {
      const body = await tgRes.text()
      console.error('Telegram error', body)
      return new Response(JSON.stringify({ error: 'Failed to send to Telegram' }), { status: 502 })
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e:any) {
    return new Response(JSON.stringify({ error: e?.message || 'Unknown error' }), { status: 400 })
  }
}
