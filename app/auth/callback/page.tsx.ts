'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabaseClient.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        // покажем пользователю
        alert(error.message);
        // вернём на логин
        router.replace('/login');
      } else {
        router.replace('/dashboard');
      }
    };
    run();
  }, [router]);

  return <p className="p-6 text-sm text-neutral-500">Завершаем вход…</p>;
}
