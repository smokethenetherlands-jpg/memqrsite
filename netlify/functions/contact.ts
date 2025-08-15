// netlify/functions/contact.ts
import type { Handler } from '@netlify/functions';

type Payload = { name?: string; contact?: string; message?: string };

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const body: Payload = JSON.parse(event.body || '{}');
    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;
    if (token && chatId) {
      const text =
        `📝 Новая заявка с сайта\n\n` +
        `👤 Имя: ${body.name || '—'}\n` +
        `📞 Контакт: ${body.contact || '—'}\n` +
        `💬 Сообщение:\n${body.message || '—'}`;
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    }
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
  } catch (e: any) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: false, error: e?.message || 'Bad Request' }) };
  }
};

export { handler };
