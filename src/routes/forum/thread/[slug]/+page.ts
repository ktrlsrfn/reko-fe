import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, params, parent }) => {
    const { session } = await parent();
    const slug = params.slug;

    try {
        const response = await fetch('/api/forum/find', {
            method: 'POST',
            body: JSON.stringify({
                id: slug
            })
        });

        if (response.status !== 200) {
            throw Error('An error occurred');
        }

        const content = await response.json();
        const data = content.data;

        // console.log(data);

        return {
            thread: data,
            session
        };
    } catch (err) {
        // console.log(err);
        throw redirect(302, '/forum');
    }
};