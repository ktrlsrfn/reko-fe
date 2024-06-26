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

  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${query}`,
    {
      headers: {
        'Authorization': 'Bearer ' + API_KEY
      }
    }
  );

  if (response.status !== 200) {
    return json({
      code: 400,
      message: 'An error occurred'
    }, { status: 400 });
  }

  const body = response.data;

  const videoRes = await axios.get(
    `https://api.themoviedb.org/3/tv/${query}/videos`,
    {
      headers: {
        'Authorization': 'Bearer ' + API_KEY
      }
    }
  );

  if (videoRes.status !== 200) {
    return json({
      code: 400,
      message: 'An error occurred'
    }, { status: 400 });
  }

  const videoList = videoRes.data;
  const video = videoList.results.find((video: any) => video.site === 'YouTube' && video.official === true && (video.type === 'Trailer' || video.type === 'Clip'));
  let videoLink = ''
  if (video) {;
    videoLink = `https://www.youtube.com/embed/${video.key}`;
  }

  const providerReq = await axios.get(
    ` https://api.themoviedb.org/3/tv/${body.id}/watch/providers`,
    {
      headers: {
        'Authorization': 'Bearer ' + API_KEY
      }
    }
  );

  const providers: any = [];
  if (providerReq.status == 200) {
    const data = providerReq.data;
    if (Object.prototype.hasOwnProperty.call(data.results, 'ID')) {
      const prov: any = {};
      if (Object.prototype.hasOwnProperty.call(data.results.ID, 'ads')) {
        data.results.ID.ads.forEach((p: any) => {
          prov[p.provider_id] = {
            name: p.provider_name,
            logo: POSTER_URL(p.logo_path)
          };
        });
      }

      if (Object.prototype.hasOwnProperty.call(data.results.ID, 'flatrate')) {
        data.results.ID.flatrate.forEach((p: any) => {
          prov[p.provider_id] = {
            name: p.provider_name,
            logo: POSTER_URL(p.logo_path)
          };
        });
      }

      Object.values(prov).forEach((p: any) => {
        providers.push(p);
      });
    }
  }

  const content = {
    id: body.id,
    title: body.name,
    rating: body.vote_average,
    year: new Date(body.first_air_date).getFullYear(),
    backdrop: POSTER_URL(body.backdrop_path),
    overview: body.overview,
    video: videoLink,
    providers
  };

  return json({
    code: 200,
    content
  });
}) satisfies RequestHandler;