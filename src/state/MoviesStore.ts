import type { Movie } from '../domain/Movie';

export type SortOptions =
  | 'release_year'
  | 'episode_id'
  | 'title'
  | 'average_rating_percent';
export type SortOrder = 'asc' | 'desc';

export interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
  error: Error | null;
  filter: string;
  sortBy: SortOptions;
  sortOrder: SortOrder;
}

export interface MoviesAction {
  setMovies: (movies: Movie[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setFilter: (filter: string) => void;
  setSortBy: (sortBy: SortOptions) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  fetchMovies: () => Promise<void>;
}

export type MoviesStore = MoviesState & MoviesAction;
