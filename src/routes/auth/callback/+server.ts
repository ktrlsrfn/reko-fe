import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code')

  console.log('hello');

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  throw redirect(303, '/browse/all');
}