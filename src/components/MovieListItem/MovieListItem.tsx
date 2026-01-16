import { ListItemButton, ListItemText } from '@mui/material';
import type { Movie } from '../../services/movies-api';
import './MovieListItem.css';

function MovieListItem({ movie }: { movie: Movie }) {
	return (
		<ListItemButton component="a" href={`/movie?episode_id=${movie.episode_id}`}>
			<ListItemText
				primary={movie.title}
				secondary={
					<>
						<strong>Director:</strong> {movie.director} <br />
						<strong>Release Date:</strong> {movie.release_date}
					</>
				}
			/>
		</ListItemButton>
	);
}

export default MovieListItem;