import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';
import { useQuery } from '@tanstack/react-query';
import type { Movie } from '../../services/movies-api';

jest.mock('@tanstack/react-query');

describe('MovieList Component', () => {
	const mockMovies: Movie[] = [
		{
			episode_id: 1,
			title: 'The Phantom Menace',
			director: 'George Lucas',
			release_date: 1999,
			opening_crawl: 'The galaxy is in turmoil...',
			url: 'https://swapi.info/api/films/1',
		},
		{
			episode_id: 2,
			title: 'Attack of the Clones',
			director: 'George Lucas',
			release_date: 2002,
			opening_crawl: 'Ten years have passed...',
			url: 'https://swapi.info/api/films/2',
		},
		{
			episode_id: 3,
			title: 'Revenge of the Sith',
			director: 'George Lucas',
			release_date: 2005,
			opening_crawl: 'War! The Republic is crumbling...',
			url: 'https://swapi.info/api/films/3',
		},
	];

	it('should display loading state', () => {
		(useQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isPending: true,
			error: null,
		});

		render(<MovieList />);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('should display error state', () => {
		const errorMessage = 'Failed to fetch movies';
		(useQuery as jest.Mock).mockReturnValue({
			data: undefined,
			isPending: false,
			error: new Error(errorMessage),
		});

		render(<MovieList />);
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	it('should render all movies when data exists', () => {
		(useQuery as jest.Mock).mockReturnValue({
			data: mockMovies,
			isPending: false,
			error: null,
		});

		render(<MovieList />);
		const listItems = screen.getAllByRole('link');
		expect(listItems).toHaveLength(3);
	});
});
