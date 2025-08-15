import type { Handler } from "@netlify/functions";

type Payload = {
  name?: string;
  contact?: string;
  comment?: string;
};

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data: Payload;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const name = (data.name || "").trim();
  const contact = (data.contact || "").trim();
  const comment = (data.comment || "").trim();

  if (!name || !contact) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: "Missing required fields" }),
    };
  }

  // Send to Telegram if env vars exist
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (token && chatId) {
    try {
      const text = [
        "📝 Новая заявка",
        `Имя: ${name}`,
        `Контакт: ${contact}`,
        `Комментарий: ${comment || "—"}`,
        "",
        `Источник: ${event.headers["origin"] || event.headers["host"] || ""}`,
      ].join("\n");

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } catch (e) {
      // Не рушим ответ пользователю, просто логируем
      console.error("Telegram send error:", e);
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
