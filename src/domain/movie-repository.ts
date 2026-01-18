import type { MovieRepository } from './MovieRepository';
import type { Movie } from './Movie';

interface ResponseMovie {
	episode_id: number;
	title: string;
	director: string;
	release_date: string;
	opening_crawl: string;
}

const normalizeMovie = (movieData: ResponseMovie): Movie => ({
	episode_id: movieData.episode_id,
	title: movieData.title,
	director: movieData.director,
	release_date: new Date(movieData.release_date),
	release_year: new Date(movieData.release_date).getFullYear(),
	opening_crawl: movieData.opening_crawl,
});

export const movieRepository: MovieRepository = {
	fetchMovies: async () => {
		const response = await fetch('https://swapi.info/api/films/');
		if (!response.ok) {
			throw new Error("Failed to fetch movies");
		}
		const movies = await response.json();
		return movies.map(normalizeMovie);
	}
}