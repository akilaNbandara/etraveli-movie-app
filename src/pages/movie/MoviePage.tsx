import { useSearchParams } from 'react-router-dom'
import { MovieList } from '../../components/MovieList'
import { MovieDetails } from '../../components/MovieDetails'
import { fetchMovies } from '../../services/movies-api'
import { useQuery } from '@tanstack/react-query'
import './MoviePage.css'
import ListHeader from '../../components/ListHeader/ListHeader'
import { useNavigate } from 'react-router-dom'

function MoviePage() {
	const [searchParams] = useSearchParams()
	const episodeId = searchParams.get('episode_id')
	const navigate = useNavigate();

	const { data: movies } = useQuery({
		queryKey: ['movies'],
		queryFn: fetchMovies,
	})

	const selectedMovie = movies?.find(m => m.episode_id === Number(episodeId))

	return (
		<>
			<h1 onClick={() => navigate('/')}>Star Wars Movies</h1>
			<ListHeader />
			<div className='movie-layout'>
				<div className='movie-list'>
					<MovieList />
				</div>
				<div className='movie-details'>
					{!episodeId ? (
						<p>Please select a movie to show details</p>
					) : !selectedMovie ? (
						<p>No available movie for given id</p>
					) : (
						<MovieDetails movie={selectedMovie} />
					)}
				</div>
			</div>
		</>
	)
}

export default MoviePage
