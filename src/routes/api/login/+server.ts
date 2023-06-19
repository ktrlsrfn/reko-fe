import { json, redirect } from "@sveltejs/kit";
import { SITE_URL } from '$env/static/private';

export const GET = async ({ locals: { supabase }}) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${SITE_URL}/browse/all`
    }
  });

  if (error) {
    return json({
      code: 400,
      message: 'Something went wrong'
    })
  }

  throw redirect(303, data.url);
}