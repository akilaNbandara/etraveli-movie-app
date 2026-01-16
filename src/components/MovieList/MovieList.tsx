import './MovieList.css';
import { fetchMovies } from '../../services/movies-api';
import { useQuery } from '@tanstack/react-query';
import {MovieListItem} from '../MovieListItem';
import { useSearchParams } from 'react-router-dom';

function MovieList() {
	const { data, isPending, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  })

	const [searchParams] = useSearchParams();
	const searchString = searchParams.get('search_str');
	const sortBy = searchParams.get('sort_by');
	const sortOrder = searchParams.get('sort_order');

	const filteredData = data?.filter(movie =>
		movie.title.toLowerCase().includes(searchString ? searchString.toLowerCase() : '')
	);

	const sortedData = filteredData?.sort((a, b) => {
		if (!sortBy) return 0;
		const aValue = a[sortBy as keyof typeof a];
		const bValue = b[sortBy as keyof typeof b];

		if (aValue < bValue) return sortOrder === 'desc' ? 1 : -1;
		if (aValue > bValue) return sortOrder === 'desc' ? -1 : 1;
		return 0;
	});

	if (isPending) {
		return <div className="loading">Loading...</div>;
	}
	if (error) {
		return <div className='error'> {error.message}</div>;
	}
	if (data) {
		return (
			<div>
				{sortedData?.map((movie) => (
					<MovieListItem movie={movie} key={movie.episode_id}/>
				))}
			</div>
		);		
	}
}

export default MovieList;