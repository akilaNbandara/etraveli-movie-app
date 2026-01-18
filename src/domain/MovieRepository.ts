import type { Movie } from './Movie';

export interface MovieRepository {
	fetchMovies(): Promise<Movie[]>;
}