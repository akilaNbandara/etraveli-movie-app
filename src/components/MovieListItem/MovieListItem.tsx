import { ListItemButton, ListItemText, Rating } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import type { MovieWithAdditionalData } from '../../domain/Movie';
import './MovieListItem.css';
import { useMemo } from 'react';

function MovieListItem({ movie }: { movie: MovieWithAdditionalData }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    searchParams.set('episode_id', movie.episode_id.toString());
    setSearchParams(searchParams);
  };

	const ratingValue = useMemo(() => {
		return movie.average_rating_percent ? movie.average_rating_percent / 20 : 0;
	}, [movie]);

  return (
    <ListItemButton
      onClick={handleClick}
      selected={searchParams.get('episode_id') === movie.episode_id.toString()}
    >
      <ListItemText
        primary={<strong>{movie.title}</strong>}
        secondary={
          <>
            <span>EPISODE {movie.episode_id}</span> <br />
            <span>
              <strong>Released:</strong> {movie.release_year}
            </span>
          </>
        }
      />
			<Rating
				value={ratingValue}
				readOnly max={5}
				precision={0.25}
				size="small"
			/>
    </ListItemButton>
  );
}

export default MovieListItem;
