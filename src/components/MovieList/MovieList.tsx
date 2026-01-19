import './MovieList.css';
import { MovieListItem } from '../MovieListItem';
import type { Movie } from '../../domain/Movie';
import Error from '../Indicators/Error';
import Loading from '../Indicators/Loading';
interface MovieListProps {
  movies: Movie[];
  isLoading?: boolean;
  error?: Error | null;
}

function MovieList({ movies, isLoading, error }: MovieListProps) {
  if (isLoading) {
    return <Loading message="Movies are loading..." />;
  }
  if (error) {
    return <Error message="Something went wrong. Could not load movies." error={error} />;
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
