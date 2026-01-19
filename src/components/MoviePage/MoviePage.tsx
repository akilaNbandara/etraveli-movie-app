import { useSearchParams } from 'react-router-dom';
import './MoviePage.css';
import ListHeader from '../ListHeader/ListHeader';
import { useNavigate } from 'react-router-dom';
import { useMovieState } from '../../state';
import { lazy, Suspense, useEffect } from 'react';
import { useVisibleMovies } from './useVisibleMovies';
import Loading from '../Indicators/Loading';

const MovieDetails = lazy(() => import('../MovieDetails/MovieDetails'));
const NotAvailable = lazy(() => import('../Indicators/NotAvailable'));
const Info = lazy(() => import('../Indicators/Info'));
const MovieList = lazy(() => import('../MovieList/MovieList'));

function MoviePage() {
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get('episode_id');
  const navigate = useNavigate();
  const { movies, isLoading = true, error, fetchMovies } = useMovieState();

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
          <Suspense fallback={<Loading message="Loading Movie List..." />}>
            <MovieList {...{ movies: visibleMovies, isLoading, error }} />
          </Suspense>
        </div>
        <div className="movie-details">
          <Suspense fallback={<Loading message="Loading Movie Details..." />}>
            {!episodeId ? (
              <Info message="Please select a movie to show details" />
            ) : !selectedMovie ? (
              <NotAvailable message="No available movie for given id" />
            ) : (
              <MovieDetails movie={selectedMovie} />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
