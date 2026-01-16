import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MoviePage from './MoviePage'
import type { Movie } from '../../services/movies-api'

// Mock the child components to simplify testing
jest.mock('../../components/MovieList', () => ({
	MovieList: () => <div data-testid="movie-list">Movie List</div>,
}))

jest.mock('../../components/MovieDetails', () => ({
	MovieDetails: ({ movie }: { movie: Movie }) => (
		<div data-testid="movie-details">{movie.title}</div>
	),
}))

// Mock the API call to return predictable data
jest.mock('../../services/movies-api', () => ({
	fetchMovies: jest.fn(() =>
		Promise.resolve([
			{
				episode_id: 4,
				title: 'A New Hope',
				director: 'George Lucas',
				release_date: 1977,
				opening_crawl: 'It is a period of civil war...',
				url: 'https://swapi.info/api/films/4',
			},
		])
	),
}))

describe('MoviePage Component - Three States', () => {
	const renderMoviePage = async (initialRoute = '/') => {
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: { retry: false },
			},
		})

		render(
			<MemoryRouter initialEntries={[initialRoute]}>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path="/" element={<MoviePage />} />
					</Routes>
				</QueryClientProvider>
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
