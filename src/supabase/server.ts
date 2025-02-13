import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/supabase/types';

export async function createClient() {
  if (typeof window !== 'undefined') {
    throw new Error('createClient should only be used on the server.');
  }

  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore errors if called from a Server Component
          }
        },
      },
    }
  );
}
