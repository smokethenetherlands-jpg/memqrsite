// netlify/functions/send-telegram.js
export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Method Not Allowed" }),
    };
  }

  try {
    const { TG_BOT_TOKEN, TG_CHAT_ID } = process.env;
    const payload = JSON.parse(event.body || "{}");
    const name = (payload?.name || "").toString();
    const contact = (payload?.contact || "").toString();
    const comment = (payload?.comment || payload?.message || "").toString();

    if (!name.trim() || !contact.trim() || !comment.trim()) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Заполни все поля" }),
      };
    }

    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
      console.log("NO_TG_CREDS_PAYLOAD:", { name, contact, comment });
    } else {
      const text =
        "📝 *Новая заявка*\\n" +
        `*Имя:* ${escapeMd(name)}\\n` +
        `*Контакт:* ${escapeMd(contact)}\\n` +
        `*Комментарий:*\\n${escapeMd(comment)}`;

      const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Telegram error:", err);
        return {
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ok: false, error: "Telegram error" }),
        };
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    console.error("SEND_TG_ERROR:", e);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Server error" }),
    };
  }
};

function escapeMd(str = "") {
  return String(str).replace(/([_*[\\]()~`>#+=|{}.!-])/g, "\\$1");
}
