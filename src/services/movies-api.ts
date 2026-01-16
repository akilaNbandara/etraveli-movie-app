export interface Movie {
	episode_id: number;
	title: string;
	director: string;
	release_date: number;
	opening_crawl: string;
	url: string;
}

export const fetchMovies = async (): Promise<Movie[]> => {
	const response = await fetch('https://swapi.info/api/films/');
	if (!response.ok) {
		throw new Error("Failed to fetch movies");
	}
	return response.json();
}