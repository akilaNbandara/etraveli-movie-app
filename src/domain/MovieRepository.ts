import type { AdditionalMovieData, Movie } from './Movie';

export interface MovieRepository {
  fetchMovies(): Promise<Movie[]>;
	fetchAdditionalMovieData(episode_id: number, title: string): Promise<AdditionalMovieData>;
}
