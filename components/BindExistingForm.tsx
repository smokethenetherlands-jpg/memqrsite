'use client';
import { useEffect, useRef } from 'react';

export default function BindExistingForm() {
  const bound = useRef(false);

  useEffect(() => {
    if (bound.current) return;
    const form = document.getElementById('contactForm') as HTMLFormElement | null;
    if (!form) return;

    const handler = async (e: Event) => {
      e.preventDefault();
      const nameInput = form.querySelector('input[placeholder="Иван"]') as HTMLInputElement | null;
      const contactInput = form.querySelector('input[placeholder="+7… / name@mail.com"]') as HTMLInputElement | null;
      const textarea = form.querySelector('textarea') as HTMLTextAreaElement | null;

      const name = (nameInput?.value || '').trim();
      const contact = (contactInput?.value || '').trim();
      const comment = (textarea?.value || '').trim();

      if (!name || !contact || !comment) {
        alert('Заполни все поля');
        return;
      }

      try {
        const res = await fetch('/.netlify/functions/send-telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, contact, comment }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || (data && data.ok === false)) throw new Error((data && data.error) || 'Не удалось отправить');
        alert('✅ Заявка отправлена!');
        form.reset();
      } catch (e) {
        alert('❌ Ошибка отправки. Попробуйте позже.');
      }
    };

    form.addEventListener('submit', handler);
    bound.current = true;
    return () => { form.removeEventListener('submit', handler); };
  }, []);

  return null;
}
