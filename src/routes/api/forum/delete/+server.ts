import { json } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();
	const body = await request.json();

	if (!body['id']) {
		return json({
			code: 500,
			message: 'Invalid input'
		}, { status: 500 });
	}

	if (!session) {
		return json({
			code: 401,
			message: 'Unauthorized'
		},
		{ status: 401 });
	}

	const userId = session.user.id;

	try {
		const { error } = await supabase
			.from('thread')
			.delete()
			.eq('id', body.id)
			.eq('author', userId);

		if (error) throw error;

		return json({
			code: 200,
			data: {
				id: body.id
			}
		});
	} catch (err) {
		return json({
			code: 400,
			message: 'An error occurred'
		},
		{ status: 400 });
	}
});