import { json } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
        return json({
            code: 401,
            message: 'Unauthorized'
        }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        const { data, error } = await supabase
            .from('watchlist')
            .select(`
                id,
                type
            `)
            .eq('user', userId);

        if (error) throw error;

        return json({
            code: 200,
            data
        });
    } catch (err) {
        return json({
            code: 400,
            message: 'An error occurred'
        }, { status: 400 });
    }
};