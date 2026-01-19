export type MovieRating = {
	source: string;
	value_string: string;
	value_percent: number | undefined;
};
export interface AdditionalMovieData {
	episode_id: number;
	poster_url?: string;
	ratings?: MovieRating[];
	average_rating_percent?: number;
};
export interface Movie {
  episode_id: number;
  title: string;
  director: string;
  release_date: Date;
  release_year: number;
  opening_crawl: string;
}

export interface MovieWithAdditionalData extends Movie, AdditionalMovieData {}
