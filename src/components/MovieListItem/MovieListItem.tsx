import { ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../services/movies-api';
import './MovieListItem.css';

function MovieListItem({ movie }: { movie: Movie }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`?episode_id=${movie.episode_id}`);
	};

	return (
		<ListItemButton onClick={handleClick}>
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