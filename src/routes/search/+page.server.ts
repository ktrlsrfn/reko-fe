import { SITE_URL } from "$env/static/private";
import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  register: async ({ request, locals: { supabase }} ) => {
    const body = Object.fromEntries(await request.formData());
    const passwordLength = 6;

    try {
      if (body['password'] !== body['confirm-password']) {
        return fail(422, {
          error: 'Password does not match'
        });
      }

      if (!body['username'] || !body['email'] || !body['password'] || !body['confirm-password']) {
        return fail(422, {
          error: 'Please complete all the forms'
        });
      }

      if (body['password'].length < passwordLength) {
        return fail(422, {
          error: `Please enter a password longer than ${passwordLength} characters!`
        });
      }

      const { data: existingUser, error: existingUserError } = await supabase
        .from('User')
        .select('username, email')
        .or(`username.eq.${body.username},email.eq.${body.email}`);

      if (existingUserError) {
        throw existingUserError;
      }

      if (existingUser) {
        for (const user of existingUser) {
          if (user.email === body.email) {
            return fail(422, {
              error: 'Email already exists'
            });
          }

          if (user.username === body.username) {
            return fail(422, {
              error: 'Username already exists'
            });
          }
        }
      }

      const { error: authError } = await supabase.auth.signUp({
        email: body.email as string,
        password: body.password as string,
        options: {
          emailRedirectTo: `${SITE_URL}auth/callback`,
        }
      });

      if (authError) {
        throw authError;
      }

      const { error: userError } = await supabase
        .from('User')
        .insert({
          username: body.username,
          email: body.email
        });

      if (userError) {
        throw userError;
      }

      return {
        success: true
      }
    } catch (err) {
      console.log(err);
      return fail(422, {
        error: 'An error occurred'
      });
    }
  }
};