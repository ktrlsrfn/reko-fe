import { menus } from '$lib/stores/menus.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
  const menu = menus.find(menu => menu.link.toLowerCase() === params.slug.toLowerCase());
  if (!menu) {
    throw redirect(307, '/browse/all');
  }

  let watchlist = [];
  const wlReq = await fetch('/api/show/watchlist/list');
  if (wlReq.status === 200) {
    const content = await wlReq.json();
    watchlist = content.data;
  }

  return {
    slug: params.slug,
    watchlist
  }
}