import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import MoviePage from './MoviePage'
import type { Movie } from '../../domain/Movie'

// Mock the child components to simplify testing
jest.mock('../../components/MovieList', () => {
	return {
		__esModule: true,
		MovieList: () => <div data-testid="movie-list">Movie List</div>,
	}
})

jest.mock('../../components/MovieDetails', () => {
	return {
		__esModule: true,
		MovieDetails: ({ movie }: { movie: Movie }) => (
			<div data-testid="movie-details">{movie.title}</div>
		),
	}
})

jest.mock('../../components/ListHeader/ListHeader', () => {
	return {
		__esModule: true,
		default: () => <div data-testid="list-header">List Header</div>,
	}
})

// Mock useMovieState hook
jest.mock('../../state', () => ({
	useMovieState: () => ({
		movies: [
			{
				episode_id: 4,
				title: 'A New Hope',
				director: 'George Lucas',
				release_date: new Date('1977-05-25'),
				release_year: 1977,
				opening_crawl: 'It is a period of civil war...',
			},
		],
		isLoading: false,
		error: null,
		fetchMovies: jest.fn(),
	}),
}))

// Mock the API call to return predictable data
jest.mock('../../domain/movie-repository', () => ({
	default: {
		fetchMovies: jest.fn(),
	},
}))

describe('MoviePage Component - Three States', () => {
	const renderMoviePage = async (initialRoute = '/') => {
		render(
			<MemoryRouter initialEntries={[initialRoute]}>
					<Routes>
						<Route path="/" element={<MoviePage />} />
					</Routes>
			</MemoryRouter>
		)

		// Wait for React Query to finish loading
		await new Promise((resolve) => setTimeout(resolve, 100))
	}

	it('should show "Please select a movie to show details" when no episode_id is provided', async () => {
		await renderMoviePage('/')
		expect(
			screen.getByText('Please select a movie to show details')
		).toBeInTheDocument()
	})

	it('should show "No available movie for given id" when episode_id does not exist', async () => {
		await renderMoviePage('/?episode_id=999')
		expect(
			screen.getByText('No available movie for given id')
		).toBeInTheDocument()
	})

	it('should display MovieDetails when valid episode_id is provided', async () => {
		await renderMoviePage('/?episode_id=4')
		expect(screen.getByTestId('movie-details')).toBeInTheDocument()
		expect(screen.getByText('A New Hope')).toBeInTheDocument()
	})
})
