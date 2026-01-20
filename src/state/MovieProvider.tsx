import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { MovieContext } from './context';
import type { AdditionalMovieData, Movie } from '../domain/Movie';
import type { SortOptions, SortOrder } from './MoviesStore';
import { movieRepository } from '../domain/movie-repository';
import { useStorageService } from './useStorageService';

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortOptions>('release_year');
  useStorageService('sortBy', sortBy, setSortBy);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  useStorageService('sortOrder', sortOrder, setSortOrder);

  const onAdditionalDataFetched = useCallback(
    async (data: AdditionalMovieData[]) => {
      const dataMap = new Map<number, AdditionalMovieData>();
      data.forEach((d) => dataMap.set(d.episode_id, d));

      setMovies((prevMovies) => {
        return prevMovies.map((movie) => {
          const additionalData = dataMap.get(movie.episode_id);
          return additionalData ? { ...movie, ...additionalData } : movie;
        });
      });
    },
    []
  );

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const movies = await movieRepository.fetchMovies();
      setMovies(movies);

      const additionalData = await Promise.all(
        movies.map(movieRepository.fetchAdditionalMovieData)
      );
      onAdditionalDataFetched(additionalData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [onAdditionalDataFetched]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        isLoading,
        error,
        filter,
        sortBy,
        sortOrder,
        setMovies,
        setIsLoading,
        setError,
        setFilter,
        setSortBy,
        setSortOrder,
        fetchMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
