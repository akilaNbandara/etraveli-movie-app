import type { AdditionalMovieData, Movie } from './Movie';

export interface MovieRepository {
  fetchMovies(): Promise<Movie[]>;
  fetchAdditionalMovieData(movie: Movie): Promise<AdditionalMovieData>;
}
