import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, contact, comment } = await req.json();

    const token = process.env.TG_BOT_TOKEN!;
    const chatId = process.env.TG_CHAT_ID!;

    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: 'TG env missing' }, { status: 500 });
    }

    const text =
      `<b>Новая заявка</b>\n` +
      `Имя: ${name || '-'}\n` +
      `Контакт: ${contact || '-'}\n` +
      `Комментарий: ${comment || '-'}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    }).then(r => r.json());

    if (!tgRes.ok) {
      return NextResponse.json({ ok: false, error: 'Telegram error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e.message ?? 'error' }, { status: 500 });
  }
}
