import { useSearchParams } from 'react-router-dom';
import { MovieList } from '../MovieList';
import { MovieDetails } from '../MovieDetails';
import './MoviePage.css';
import ListHeader from '../ListHeader/ListHeader';
import { useNavigate } from 'react-router-dom';
import { useMovieState } from '../../state';
import { useEffect } from 'react';
import { useVisibleMovies } from './useVisibleMovies';

function MoviePage() {
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get('episode_id');
  const navigate = useNavigate();
  const { movies, isLoading, error, fetchMovies } = useMovieState();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const selectedMovie = movies?.find((m) => m.episode_id === Number(episodeId));
  const visibleMovies = useVisibleMovies(movies || []);

  return (
    <div className="movie-page">
			<div className="movie-page-header">
      	<h1 onClick={() => navigate('/')}>Star Wars Movies</h1>
			</div>
      <div className="movie-layout">
        <div className="movie-list">
		      <ListHeader />
          <MovieList {...{ movies: visibleMovies, isLoading, error }} />
        </div>
        <div className="movie-details">
          {!episodeId ? (
            <p>Please select a movie to show details</p>
          ) : !selectedMovie ? (
            <p>No available movie for given id</p>
          ) : (
            <MovieDetails movie={selectedMovie} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
