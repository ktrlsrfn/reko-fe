import { menus } from '$lib/stores/menus.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
  const menu = menus.find(menu => menu.link.toLowerCase() === params.slug.toLowerCase());
  if (!menu) {
    throw redirect(307, '/browse/all');
  }

  return {
    slug: params.slug
  }
}