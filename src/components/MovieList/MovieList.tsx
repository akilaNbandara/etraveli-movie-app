import './MovieList.css';
import { MovieListItem } from '../MovieListItem';
import type { Movie } from '../../domain/Movie';
interface MovieListProps {
  movies: Movie[];
  isLoading?: boolean;
  error?: Error | null;
}

function MovieList({ movies, isLoading, error }: MovieListProps) {
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error"> {error.message}</div>;
  }
  if (movies) {
    return (
      <div className="movie-list-container">
        {movies?.map((movie) => (
          <MovieListItem movie={movie} key={movie.episode_id} />
        ))}
      </div>
    );
  }
}

export default MovieList;
