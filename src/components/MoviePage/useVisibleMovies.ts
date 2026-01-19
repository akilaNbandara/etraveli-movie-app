import type { MovieWithAdditionalData } from '../../domain/Movie';
import { useMovieState } from '../../state';
import { useMemo } from 'react';

export function useVisibleMovies(movies: MovieWithAdditionalData[]) {
  const { filter, sortBy, sortOrder } = useMovieState();

  const filteredData = useMemo(() => {
    if (filter === '') return movies;
    return movies?.filter((movie) =>
      movie.title.toLowerCase().includes(filter ? filter.toLowerCase() : '')
    );
  }, [movies, filter]);

  const sortedData = useMemo(
    () =>
      [...filteredData].sort((a, b) => {
        if (!sortBy) return 0;
        const aValue = a[sortBy];
        const bValue = b[sortBy];
				
				if (sortOrder === 'desc') {
					if (!aValue) return 1;
					if (!bValue) return -1;
					if (aValue < bValue) return 1;
					if (aValue > bValue) return -1;
				} else {
					if (!aValue) return -1;
					if (!bValue) return 1;
					if (aValue < bValue) return -1;
					if (aValue > bValue) return 1;
				}
				return 0;
      }),
    [filteredData, sortBy, sortOrder]
  );

  return sortedData;
}
