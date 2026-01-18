import { Card, CardContent, Typography, Box } from '@mui/material';
import type { Movie } from '../../domain/Movie';

interface MovieDetailsProps {
  movie: Movie;
}

function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 2 }}>
          {movie.title}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            component="p"
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            Director:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.director}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            component="p"
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            Release Date:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.release_date.toDateString()}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            component="p"
            sx={{ fontWeight: 'bold', mb: 1 }}
          >
            Opening Crawl:
          </Typography>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
          >
            {movie.opening_crawl}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieDetails;
