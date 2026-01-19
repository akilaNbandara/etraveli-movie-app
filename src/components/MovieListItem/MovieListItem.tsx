import { ListItemButton, ListItemText } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import type { Movie } from '../../domain/Movie';
import './MovieListItem.css';

function MovieListItem({ movie }: { movie: Movie }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    searchParams.set('episode_id', movie.episode_id.toString());
    setSearchParams(searchParams);
  };

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
              <strong>Director:</strong> {movie.director}
              {' | '}
              <strong>Released:</strong> {movie.release_year}
            </span>
          </>
        }
      />
    </ListItemButton>
  );
}

export default MovieListItem;
