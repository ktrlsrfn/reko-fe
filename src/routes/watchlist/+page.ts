export const load = async ({ fetch }) => {
    let watchlist = [];
    const wlReq = await fetch('/api/show/watchlist/list');
    if (wlReq.status === 200) {
        const content = await wlReq.json();
        watchlist = content.data;
    }

    const shows = [];

    for (const bookmark of watchlist) {
        const res = await fetch(`/api/${bookmark.type}/detail?query=${bookmark.id}`);

        if (res.status === 200) {
            const content = await res.json();
            shows.push({
                ...content.content,
                type: bookmark.type
            });
        }
    }
    
    return { shows, watchlist };
};