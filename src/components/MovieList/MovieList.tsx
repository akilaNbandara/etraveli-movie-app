import './MovieList.css';
import { fetchMovies } from '../../services/movies-api';
import { useQuery } from '@tanstack/react-query';
import {MovieListItem} from '../MovieListItem';

function MovieList() {
	const { data, isPending, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  })

	if (isPending) {
		return <div className="loading">Loading...</div>;
	}
	if (error) {
		return <div className='error'> {error.message}</div>;
	}
	if (data) {
		return (
			<ul className='movie-list'>
				{data.map((movie) => (
					<MovieListItem movie={movie} key={movie.episode_id}/>
				))}
			</ul>
		);		
	}
}

export default MovieList;