// src/routes/login/+page.server.ts
import type { Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, url, locals: { supabase } }) => {
		const provider = url.searchParams.get('provider') as Provider;

		if (provider) {
			const { data, error: err } = await supabase.auth.signInWithOAuth({
				provider: provider,
				options: {
					redirectTo: 'http://localhost:5173/auth/callback'
				}
			});

			if (err) {
				console.log(err);
				return fail(400, {
					message: 'Something went wrong.'
				});
			}
			throw redirect(303, data.url);
		}
	}
};
