// /.netlify/functions/contact.js

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'Method Not Allowed' }) };
  }

  try {
    const { TG_BOT_TOKEN, TG_CHAT_ID } = process.env;
    const payload = JSON.parse(event.body || '{}');
    const { name = '', contact = '', message = '' } = payload;

    if (!name.trim() || !contact.trim() || !message.trim()) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Заполни все поля' }) };
    }

    // если нет токенов — не падаем, просто пишем лог
    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
      console.log('CONTACT FORM (no TG creds):', payload);
    } else {
      const text =
        `📝 *Новая заявка*\n` +
        `*Имя:* ${escapeMd(name)}\n` +
        `*Контакт:* ${escapeMd(contact)}\n` +
        `*Сообщение:*\n${escapeMd(message)}`;

      const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`;
      const body = {
        chat_id: TG_CHAT_ID,
        text,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      };

      const tgRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!tgRes.ok) {
        const err = await tgRes.text();
        console.error('Telegram error:', err);
        return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Telegram error' }) };
      }
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    console.error('CONTACT ERROR:', e);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Server error' }) };
  }
};

function escapeMd(str = '') {
  // лёгкий эскейп markdown
  return String(str).replace(/([_*[\]()~`>#+=|{}.!-])/g, '\\$1');
}
