import { json } from '@sveltejs/kit';

export const GET = (async ({ locals: { supabase } }) => {
    try {
        const { data, error } = await supabase
            .from('thread')
            .select(`
                id,
                title,
                content,
                author ( name, avatar ),
                tag ( name )
            `);

        if (error) throw error;

        const mapped = data.map((d) => {
            return {
                id: d.id,
                title: d.title,
                author_name: d.author.name,
                author_avatar: d.author.avatar,
                tags: d.tag
            };
        });

        return json({
            code: 200,
            data: mapped
        });
    } catch (err) {
        console.error(err);
        return json({
            code: 400,
            message: 'An error occurred'
        }, { status: 400 });
    }
});