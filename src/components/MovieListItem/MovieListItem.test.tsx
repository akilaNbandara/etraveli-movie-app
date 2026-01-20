import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieListItem from './MovieListItem';
import type { MovieWithAdditionalData } from '../../domain/Movie';

describe('MovieListItem Component', () => {
  const mockMovie: MovieWithAdditionalData = {
    episode_id: 4,
    title: 'A New Hope',
    director: 'George Lucas',
    release_date: new Date('1977-05-25'),
    release_year: 1977,
    opening_crawl: 'It is a period of civil war...',
  };

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('should render all movie data', () => {
    renderWithRouter(<MovieListItem movie={mockMovie} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain('A New Hope');
    expect(button.textContent).toContain('1977');
  });

  it('should render with different movie data', () => {
    const anotherMovie: MovieWithAdditionalData = {
      episode_id: 5,
      title: 'The Empire Strikes Back',
      director: 'Irvin Kershner',
      release_date: new Date('1980-05-21'),
      release_year: 1980,
      opening_crawl: 'It is a dark time for the Rebellion...',
    };

    renderWithRouter(<MovieListItem movie={anotherMovie} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain('The Empire Strikes Back');
    expect(button.textContent).toContain('1980');
  });
});
