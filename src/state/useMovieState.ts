import { useContext } from 'react'
import { MovieContext } from './context'

export function useMovieState() {
	const context = useContext(MovieContext)
	if (!context) {
		throw new Error('useMovieState must be used within MovieProvider')
	}
	return context
}
