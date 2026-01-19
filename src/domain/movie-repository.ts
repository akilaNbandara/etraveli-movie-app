import type { MovieRepository } from './MovieRepository';
import type { AdditionalMovieData, Movie } from './Movie';

interface ResponseMovie {
  episode_id: number;
  title: string;
  director: string;
  release_date: string;
  opening_crawl: string;
}

type Rating = {
  Source: string;
  Value: string;
};
interface ResponseMovieAdditional {
  Poster: string | undefined;
  Ratings: Rating[] | undefined;
}

const normalizeMovie = (movieData: ResponseMovie): Movie => ({
  episode_id: movieData.episode_id,
  title: movieData.title,
  director: movieData.director,
  release_date: new Date(movieData.release_date),
  release_year: new Date(movieData.release_date).getFullYear(),
  opening_crawl: movieData.opening_crawl,
});

const getRatingPercent = (value: string): number | undefined => {
  if (value.includes('%')) {
    return parseInt(value.replace('%', ''), 10);
  }
  if (value.includes('/100')) {
    return parseInt(value.replace('/100', ''), 10);
  }
  if (value.includes('/10')) {
    return parseFloat(value.replace('/10', '')) * 10;
  }
  return undefined;
};

const normalizeMovieAdditional = (
  episode_id: number,
  movieData?: ResponseMovieAdditional
): AdditionalMovieData => {
  const ratingsList = movieData?.Ratings?.map((rating) => ({
    source: rating.Source,
    value_string: rating.Value,
    value_percent: getRatingPercent(rating.Value),
  }));

  const average_rating_percent =
    ratingsList && ratingsList?.length > 0
      ? Math.round(
          ratingsList.reduce((sum, r) => sum + (r.value_percent || 0), 0) /
            ratingsList.length
        )
      : undefined;

  return {
    episode_id,
    poster_url: movieData?.Poster,
    ratings: ratingsList,
    average_rating_percent,
  };
};

export const movieRepository: MovieRepository = {
  fetchMovies: async () => {
    const response = await fetch('https://swapi.info/api/films/');
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const movies = await response.json();
    return movies.map(normalizeMovie);
  },

  fetchAdditionalMovieData: async (
    movie: Movie
  ): Promise<AdditionalMovieData> => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    if (!apiKey) {
      console.warn('OMDb API key not configured');
      return normalizeMovieAdditional(movie.episode_id);
    }

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.title}&y=${movie.release_year}`
      );
      
      if (!response.ok) {
        console.error(`OMDb API returned status: ${response.status}`);
        return normalizeMovieAdditional(movie.episode_id);
      }
      
      const movieData: ResponseMovieAdditional = await response.json();
      return normalizeMovieAdditional(movie.episode_id, movieData);
    } catch (error) {
      console.error('Error fetching additional movie data:', error);
      // Always return normalized object, never throw
      return normalizeMovieAdditional(movie.episode_id);
    }
  },
};
