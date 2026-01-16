import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieListItem from './MovieListItem';
import type { Movie } from '../../services/movies-api';

describe('MovieListItem Component', () => {
	const mockMovie: Movie = {
		episode_id: 4,
		title: 'A New Hope',
		director: 'George Lucas',
		release_date: 1977,
		opening_crawl: 'It is a period of civil war...',
		url: 'https://swapi.info/api/films/4',
	};

	const renderWithRouter = (component: React.ReactElement) => {
		return render(<MemoryRouter>{component}</MemoryRouter>);
	};

	it('should render all movie data', () => {
		renderWithRouter(<MovieListItem movie={mockMovie} />);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.textContent).toContain('A New Hope');
		expect(button.textContent).toContain('George Lucas');
		expect(button.textContent).toContain('1977');
	});

	it('should render with different movie data', () => {
		const anotherMovie: Movie = {
			episode_id: 5,
			title: 'The Empire Strikes Back',
			director: 'Irvin Kershner',
			release_date: 1980,
			opening_crawl: 'It is a dark time for the Rebellion...',
			url: 'https://swapi.info/api/films/5',
		};

		renderWithRouter(<MovieListItem movie={anotherMovie} />);
		
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.textContent).toContain('The Empire Strikes Back');
		expect(button.textContent).toContain('Irvin Kershner');
		expect(button.textContent).toContain('1980');
	});
});
