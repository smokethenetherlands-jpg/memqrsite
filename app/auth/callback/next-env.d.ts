import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  // куда вести после успешного входа:
  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`;
  return NextResponse.redirect(redirectTo);
}
