import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';
import type { Movie } from '../../domain/Movie';

// Mock the MovieListItem component
jest.mock('../MovieListItem/MovieListItem', () => ({
  __esModule: true,
  default: ({ movie }: { movie: Movie }) => (
    <div data-testid="movie-item">{movie.title}</div>
  ),
}));

const mockMovies: Movie[] = [
  {
    episode_id: 4,
    title: 'A New Hope',
    director: 'George Lucas',
    release_date: new Date('1977-05-25'),
    release_year: 1977,
    opening_crawl: 'It is a period of civil war...',
  },
  {
    episode_id: 5,
    title: 'The Empire Strikes Back',
    director: 'Irvin Kershner',
    release_date: new Date('1980-05-17'),
    release_year: 1980,
    opening_crawl: 'It is a dark time...',
  },
  {
    episode_id: 6,
    title: 'Return of the Jedi',
    director: 'Richard Marquand',
    release_date: new Date('1983-05-25'),
    release_year: 1983,
    opening_crawl: 'Luke Skywalker has returned...',
  },
];

describe('MovieList Component', () => {
  it('should display loading text when loading', () => {
    render(<MovieList movies={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error text when error occurs', () => {
    render(
      <MovieList
        movies={[]}
        isLoading={false}
        error={new Error('Failed to fetch')}
      />
    );
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('should render all movies when data is available', () => {
    render(<MovieList movies={mockMovies} isLoading={false} error={null} />);
    const movieItems = screen.getAllByTestId('movie-item');
    expect(movieItems).toHaveLength(3);
  });
});
