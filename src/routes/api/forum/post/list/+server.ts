import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase }}) => {
    const body = await request.json();

    if (!body['id']) {
        return json({
            code: 400,
            message: 'Invalid input'
        }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('post')
            .select(`
                content,
                author ( name, avatar )
            `)
            .eq('thread_id', body.id);

        if (error) throw error;

        const mapping = data.map((d) => {
            return {
                content: d.content,
                author_name: d.author.name,
                author_avatar: d.author.avatar
            };
        });

        return json({
            code: 200,
            data: mapping
        });
    } catch (err) {
        return json({
            code: 400,
            message: 'An error occurred'
        }, { status: 400 });
    }
};