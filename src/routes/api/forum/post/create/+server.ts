import { json } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase, getSession } }) => {
    const body = await request.json();
    const session = await getSession();    

    if (!body['id'] || !body['content']) {
        return json({
            code: 400,
            message: 'Invalid input'
        }, { status: 400 });
    }    
    
    if (!session) {
        return json({
            code: 401,
            message: 'Unauthorized'
        }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        const { data, error } = await supabase
        .from('post')
        .insert({
            thread_id: body.id,
            content: body.content,
            author: userId
        });

        if (error) throw error;

        return json({
            code: 200,
            message: 'Post created'
        });
    } catch (err) {
        return json({
            code: 400,
            message: 'An error occurred'
        }, { status: 400 });
    }
});