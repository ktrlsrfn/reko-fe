import { json } from '@sveltejs/kit';

export const POST = (async ({ request, locals: { supabase }}) => {
    const body = await request.json();

    if (!body['id']) {
        return json({
            code: 400,
            message: 'Invalid input'
        }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('thread')
            .select(`
                id,
                title,
                content,
                author ( name, avatar ),
                tag ( name )
            `)
            .eq('id', body.id);

        if (error) throw error;
        if (!data.length) throw Error('No data');

        const d = data[0];
        const mapping = {
            id: d.id,
            title: d.title,
            content: d.content,
            author_name: d.author.name,
            author_avatar: d.author.avatar,
            tags: d.tag,
            posts: d.post
        };

        return json({
            code: 200,
            data: mapping
        });
    } catch (err) {
        // console.log(err);
        return json({
            code: 400,
            message: 'An error occurred'
        }, { status: 400 });
    }
});