import { json } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase, getSession } }) => {
    const body = await request.json();
    const session = await getSession();
    
    if (!body['title'] || !body['content']) {
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
        const { data, error: threadError } = await supabase
            .from('thread')
            .insert({
                title: body.title,
                content: body.content,
                author: userId
            })
            .select();

        if (threadError) throw threadError;

        const threadId = data[0].id;

        const tags = body.tags.map((tag) => {
            return {
                thread_id: threadId,
                name: tag
            };
        });

        await supabase
            .from('tag')
            .insert(tags);

        return json({
            code: 200,
            data: {
                id: threadId
            }
        });
    } catch (err) {
        return json({
            code: 400,
            message: 'An error occurred'
        }, { status: 400 });
    }
});