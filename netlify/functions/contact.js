// netlify/functions/contact.js
// Отправка в Telegram. Нужны переменные окружения TG_BOT_TOKEN и TG_CHAT_ID

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: 'ok' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method Not Allowed' };
  }

  try {
    const { name = '', contact = '', message = '' } = JSON.parse(event.body || '{}') || {};
    if (!name || !contact) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: false, error: 'name and contact are required' }),
      };
    }

    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    if (!token || !chatId) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: false, error: 'Bot env missing' }),
      };
    }

    const text =
      '📝 Новая заявка с сайта memqr.ru\n' +
      `• Имя: ${name}\n` +
      `• Контакт: ${contact}\n` +
      (message ? `• Комментарий: ${message}\n` : '') +
      `• Время: ${new Date().toLocaleString('ru-RU')}`;

    const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      return { statusCode: 502, headers: corsHeaders, body: `Telegram error: ${t}` };
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    return { statusCode: 500, headers: corsHeaders, body: e?.message || 'Server error' };
  }
};
