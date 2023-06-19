import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const body = await request.json();

    if (!body['id'] || !body['type'] || !body['action']) {
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
        if (body.action === 'add') {
            const { error } = await supabase
                .from('watchlist')
                .insert({
                    user: userId,
                    id: body.id,
                    type: body.type
                });
    
            if (error) throw error;
        }

        if (body.action === 'remove') {
            const { error } = await supabase
                .from('watchlist')
                .delete()
                .eq('user', userId)
                .eq('id', body.id)
                .eq('type', body.type);

            if (error) throw error;
        }

        return json({
            code: 200,
            message: 'Successfully added to watchlist'
        });
    } catch (err) {
        return json({
            code: 400,
            message: 'An error occurred'
        }, { status: 400 });
    }
};