import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { MovieContext } from './context'
import type { Movie } from '../domain/Movie'
import type { SortOptions, SortOrder } from './MoviesStore'
import { movieRepository } from '../domain/movie-repository'

export function MovieProvider({ children }: { children: ReactNode }) {
	const [movies, setMovies] = useState<Movie[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)
	const [filter, setFilter] = useState('')
	const [sortBy, setSortBy] = useState<SortOptions>('release_year')
	const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

	const fetchMovies = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const movies = await movieRepository.fetchMovies()
			setMovies(movies)
		} catch (err) {
			setError(err as Error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	return (
		<MovieContext.Provider value={{
			 movies, isLoading, error, filter, sortBy, sortOrder, setMovies, setIsLoading, setError, setFilter, setSortBy, setSortOrder
			 , fetchMovies}}>
			{children}
		</MovieContext.Provider>
	)
}
