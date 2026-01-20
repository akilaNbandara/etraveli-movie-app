import { renderHook } from '@testing-library/react';
import { useVisibleMovies } from './useVisibleMovies';
import { useMovieState } from '../../state';
import type { Movie } from '../../domain/Movie';

jest.mock('../../state');
jest.mock('../../domain/movie-repository');

describe('useVisibleMovies', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all movies when no filter or sort is applied', () => {
    (useMovieState as jest.Mock).mockReturnValue({
      filter: '',
      sortBy: null,
      sortOrder: 'asc',
    });

    const { result } = renderHook(() => useVisibleMovies(mockMovies));
    expect(result.current).toEqual(mockMovies);
  });

  it('should filter movies by title', () => {
    (useMovieState as jest.Mock).mockReturnValue({
      filter: 'empire',
      sortBy: null,
      sortOrder: 'asc',
    });

    const { result } = renderHook(() => useVisibleMovies(mockMovies));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe('The Empire Strikes Back');
  });

  it('should sort movies by episode_id in ascending order', () => {
    (useMovieState as jest.Mock).mockReturnValue({
      filter: '',
      sortBy: 'episode_id',
      sortOrder: 'asc',
    });

    const { result } = renderHook(() => useVisibleMovies(mockMovies));
    expect(result.current[0].title).toBe('A New Hope');
    expect(result.current[1].title).toBe('The Empire Strikes Back');
    expect(result.current[2].title).toBe('Return of the Jedi');
  });

  it('should sort movies by episode_id in descending order', () => {
    (useMovieState as jest.Mock).mockReturnValue({
      filter: '',
      sortBy: 'episode_id',
      sortOrder: 'desc',
    });

    const { result } = renderHook(() => useVisibleMovies(mockMovies));
    expect(result.current[0].title).toBe('Return of the Jedi');
    expect(result.current[1].title).toBe('The Empire Strikes Back');
    expect(result.current[2].title).toBe('A New Hope');
  });

  it('should filter and sort movies together', () => {
    (useMovieState as jest.Mock).mockReturnValue({
      filter: 'return',
      sortBy: 'release_year',
      sortOrder: 'asc',
    });

    const { result } = renderHook(() => useVisibleMovies(mockMovies));
    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe('Return of the Jedi');
  });
});
