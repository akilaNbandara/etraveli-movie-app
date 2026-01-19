import { Container, Typography, Box } from '@mui/material';
import type { Movie } from '../../domain/Movie';
import './MovieDetails.css';

interface MovieDetailsProps {
  movie: Movie;
}

function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <Container className="movie-details-container">
      <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
        {movie.title}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          sx={{ lineHeight: 1.75, textAlign: 'justify' }}
        >
          {movie.opening_crawl}
        </Typography>
      </Box>

      <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Box
          sx={{
            mb: 1,
            columnGap: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="overline" sx={{ fontWeight: 'bold' }}>
            Release Date:
          </Typography>
          <Typography variant="overline">
            {movie.release_date.toLocaleDateString()}
          </Typography>
        </Box>
        <Box
          sx={{
            mb: 1,
            columnGap: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="overline" sx={{ fontWeight: 'bold' }}>
            Director:
          </Typography>
          <Typography variant="overline">{movie.director}</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default MovieDetails;
