export const load = async ({ parent, fetch }) => {
    const { session } = await parent();

    const response = await fetch('/api/forum/list');

    let threads = [];

    if (response.status === 200) {
        const content = await response.json();
        threads = content.data;
    }

    return {
        session,
        threads
    };
};