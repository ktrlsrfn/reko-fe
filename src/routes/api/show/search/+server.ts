import { env } from "$env/dynamic/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import axios from "axios";
import { POSTER_URL } from '$lib/stores/tmdb';

export const GET = (async ({ url }) => {
  const API_KEY = env.TMDB_API;
  const query = url.searchParams.get('query');

  if (!query) {
    return json({
      code: 500,
      message: 'Invalid query'
    }, { status: 500 });
  }

  const data = [];

  for (let page = 1; page <= 3; page++) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi`,
        {
          headers: {
            'Authorization': 'Bearer ' + API_KEY
          },
          params: {
            query,
            page
          }
        }
      );

      const body = response.data;

      data.push(...body.results);
  }

  const mapping = data.reduce((total, d) => {
    const type = d.media_type;
    if (type === 'movie') {
        // if (!d.title || !d.vote_average || !d.release_date || !d.backdrop_path || !d.overview) {
        //     return total;
        // }
        return [...total, {
          id: d.id,
          title: d.title,
          rating: d.vote_average,
          year: new Date(d.release_date).getFullYear(),
          backdrop: POSTER_URL(d.backdrop_path),
          overview: d.overview,
          type
        }];
    }

    if (type === 'tv') {
        // if (!d.name || !d.vote_average || !d.first_air_date || !d.backdrop_path || !d.overview) {
        //     return total;
        // }
        return [...total, {
          id: d.id,
          title: d.name,
          rating: d.vote_average,
          year: new Date(d.first_air_date).getFullYear(),
          backdrop: POSTER_URL(d.backdrop_path),
          overview: d.overview,
          type
        }];
    }
  }, []);

  return json({
    code: 200,
    data: mapping ?? []
  });
}) satisfies RequestHandler;