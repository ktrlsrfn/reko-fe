export const load = async ({ fetch }) => {
    let watchlist = [];
    const wlReq = await fetch('/api/show/watchlist/list');
    if (wlReq.status === 200) {
        const content = await wlReq.json();
        watchlist = content.data;
    }

    return { watchlist }
};