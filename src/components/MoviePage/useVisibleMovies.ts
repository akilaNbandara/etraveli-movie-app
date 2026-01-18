import type { Movie } from "../../domain/Movie";
import { useMovieState } from "../../state";
import { useMemo } from "react";

export function useVisibleMovies(movies: Movie[]) {
	const { filter, sortBy, sortOrder } = useMovieState();

	const filteredData = useMemo(() => {
		if (filter === '') return movies;
		return movies?.filter(movie =>
			movie.title.toLowerCase().includes(filter ? filter.toLowerCase() : '')
	)}, [movies, filter]);

	const sortedData = useMemo(() => [...filteredData].sort((a, b) => {
		if (!sortBy) return 0;
		const aValue = a[sortBy];
		const bValue = b[sortBy];

		if (aValue < bValue) return sortOrder === 'desc' ? 1 : -1;
		if (aValue > bValue) return sortOrder === 'desc' ? -1 : 1;
		return 0;
	}), [filteredData, sortBy, sortOrder]);

	return sortedData;
}