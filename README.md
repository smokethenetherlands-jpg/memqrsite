# QR Memory Next (ready)

## Запуск
```bash
npm install
npm run dev
# http://localhost:3000
```
Убедись, что в `.env.local` прописаны:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## Страницы
- `/` — лендинг (анимации, фото)
- `/login` — вход по email (magic link)
- `/dashboard` — защищённый кабинет (читает `memorials` из Supabase по owner_id)
