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
      popular: 'https://api.themoviedb.org/3/movie/popular',
      top: 'https://api.themoviedb.org/3/movie/top_rated',
      upcoming: 'https://api.themoviedb.org/3/movie/upcoming',
      now_playing: 'https://api.themoviedb.org/3/movie/now_playing'
    };

    showUrl = showTypes[query];
  } else if (genres) {
    let genreQuery = '';

    genres.forEach((genre) => {
      let genreCode = null;

      switch(genre) {
        case 'action':
          genreCode = 28;
          break;

        case 'adventure':
          genreCode = 12;
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

        case 'fantasy':
          genreCode = 14;
          break;

        case 'history':
          genreCode = 36;
          break;

        case 'horror':
          genreCode = 27;
          break;

        case 'music':
          genreCode = 10402;
          break;

        case 'mystery':
          genreCode = 9648;
          break;

        case 'romance':
          genreCode = 10749;
          break;

        case 'science':
          genreCode = 878;
          break;

        case 'war':
          genreCode = 10752;
          break;

        case 'western':
          genreCode = 37;
          break;

        default: return;
      }

      genreQuery += `%2C${genreCode}`;
    });

    genreQuery = genreQuery.substring(3);
    showUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreQuery}`;
  }

  if (!showUrl) {
    return json({
      code: 500,
      message: 'Shows not found'
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
      title: data.title,
      rating: data.vote_average,
      year: new Date(data.release_date).getFullYear(),
      backdrop: POSTER_URL(data.backdrop_path)
    });

    return result;
  }, []);

  return json({
    code: 200,
    content
  });
}) satisfies RequestHandler;