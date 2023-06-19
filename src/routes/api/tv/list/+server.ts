import { env } from "$env/dynamic/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import axios, { HttpStatusCode } from "axios";
import { POSTER_URL } from '$lib/stores/tmdb';

export const GET = (async ({ url }) => {
  const query = url.searchParams.get('query');
  const genres = url.searchParams.getAll('genre[]');

  if (!query && !genres) {
    return json({
      code: 500,
      message: 'Invalid query'
    }, { status: 500 });
  }

  let showUrl = '';

  if (query) {
    const showTypes: any = {
      top: 'https://api.themoviedb.org/3/tv/top_rated',
      popular: 'https://api.themoviedb.org/3/tv/popular'
    };

    showUrl = showTypes[query];
  } else if (genres) {
    let genreQuery = '';

    genres.forEach((genre) => {
      let genreCode = null;

      switch(genre) {
        case 'action_adventure':
          genreCode = 10759;
          break;

        case 'animation':
          genreCode = 16;
          break;

        case 'comedy':
          genreCode = 35;
          break;

        case 'crime':
          genreCode = 80;
          break;

        case 'documentary':
          genreCode = 99;
          break;

        case 'drama':
          genreCode = 18;
          break;

        case 'family':
          genreCode = 10751;
          break;

        case 'kids':
          genreCode = 10762;
          break;

        case 'mystery':
          genreCode = 9648;
          break;

        case 'news':
          genreCode = 10763;
          break;

        case 'reality':
          genreCode = 10764;
          break;

        case 'scifi_fantasy':
          genreCode = 10765;
          break;

        case 'soap':
          genreCode = 10766;
          break;

        case 'talk':
          genreCode = 10767;
          break;

        case 'war_politics':
          genreCode = 10768;
          break;

        case 'western':
          genreCode = 37;
          break;

        default: return;
      }

      genreQuery += `%2C${genreCode}`;
    });

    genreQuery = genreQuery.substring(3);
    showUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreQuery}`;
  }

  if (!showUrl) {
    return json({
      code: 500,
      message: 'Type not found'
    }, { status: 500 });
  }

  const response = await axios.get(
    showUrl,
    {
      headers: {
        'Authorization': 'Bearer ' + env.TMDB_API
      }
    }
  );

  if (response.status !== HttpStatusCode.Ok) {
    return json({
      code: 500,
      message: 'Unable to obtain shows'
    }, { status: 500 });
  }

  const content = response.data.results.reduce((result: any, data: any) => {
    if (!data.backdrop_path) return result;

    result.push({
      id: data.id,
      title: data.name,
      rating: data.vote_average,
      year: new Date(data.first_air_date).getFullYear(),
      backdrop: POSTER_URL(data.backdrop_path)
    });

    return result;
  }, []);

  return json({
    code: 200,
    content
  });
}) satisfies RequestHandler;