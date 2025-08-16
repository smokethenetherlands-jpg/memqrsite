# Автопач проекта (сохранить внешку + включить отправку в TG)

## Что делает
- добавляет `netlify/functions/send-telegram.js`
- добавляет `components/BindExistingForm.tsx`
- автоматически патчит `app/page.tsx`:
  - импортирует биндер
  - добавляет `id="contactForm"` первому `<form>`
  - вставляет `<BindExistingForm />` сразу после `</form>`

## Как запустить
1) Распакуй архив в **корень** проекта (рядом с папкой `app`).
2) Установи зависимости для запуска патчера: Node 18+ уже есть, зависимостей не нужно.
3) Выполни:
```bash
node scripts/patch.js
```
Увидишь `✔ Патч применён`.

4) В Netlify добавь переменные окружения:
   - `TG_BOT_TOKEN`
   - `TG_CHAT_ID`

5) Коммит и пуш:
```bash
git add .
git commit -m "chore: auto patch (bind form to TG function)"
git push origin main
```

6) В Netlify жми **Deploys → Trigger deploy → Clear cache and deploy site**.

Готово. Внешний вид остаётся прежним, форма отправляет в Telegram.
