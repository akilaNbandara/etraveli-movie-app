import { render, screen, fireEvent } from '@testing-library/react';
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

	it('should render all movie data', () => {
		render(<MovieListItem movie={mockMovie} />);
		const container = screen.getByRole('link')
		expect(container).toBeInTheDocument();
		expect(container?.textContent).toContain('A New Hope');
		expect(container?.textContent).toContain('George Lucas');
		expect(container?.textContent).toContain('1977');
	});

	it('should be clickable and navigate', async () => {
		render(<MovieListItem movie={mockMovie} />);
		
		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		
		fireEvent.click(link);
		expect(link).toHaveAttribute('href', '/movie?episode_id=4');
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

		render(<MovieListItem movie={anotherMovie} />);
		
		expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
		expect(screen.getByText((content) => content.includes('Irvin Kershner'))).toBeInTheDocument();
		expect(screen.getByText((content) => content.includes('1980'))).toBeInTheDocument();
		
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/movie?episode_id=5');
	});
});
