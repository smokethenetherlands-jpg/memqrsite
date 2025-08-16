import type { Handler } from "@netlify/functions";

type Payload = { name?: string; contact?: string; message?: string; };

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload: Payload = JSON.parse(event.body || "{}");
    // TODO: отправь в Telegram/почту
    console.log("CONTACT FORM:", payload);

    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: true }) };
  } catch (e: any) {
    return { statusCode: 400, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ok: false, error: e?.message || "Bad Request" }) };
  }
};
