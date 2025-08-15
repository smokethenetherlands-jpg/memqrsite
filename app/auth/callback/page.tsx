'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClientComponentClient(); // ← создаём клиент

  useEffect(() => {
    const run = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        alert(error.message);
        router.replace('/login');
      } else {
        router.replace('/dashboard');
      }
    };
    run();
  }, [router, supabase]);

  return <p className="p-6 text-sm text-neutral-500">Завершаем вход…</p>;
}
