import { Container, Typography, Box, Chip, Rating } from '@mui/material';
import type { MovieWithAdditionalData } from '../../domain/Movie';
import './MovieDetails.css';
import { useMemo } from 'react';

interface MovieDetailsProps {
  movie: MovieWithAdditionalData;
}

function MovieDetails({ movie }: MovieDetailsProps) {
	const ratingValue = useMemo(() => {
		return movie.average_rating_percent ? movie.average_rating_percent / 10 : 0;
	}, [movie]);

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

			<Box>
					{movie.ratings && movie.ratings.length > 0 ? (
						<Box sx={{ mt: 1, mb: 1, display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
							{movie.ratings.map((rating) => (
								<Chip
									key={rating.source}
									color="primary"
									variant="outlined"
									label={<><strong>{rating.source}:</strong> {rating.value_string}</>}
								/>
							))}
						</Box>
					) : (
						<Chip
							color="primary"
							variant="outlined"
							label="No ratings available."
						/>
					)}

					<Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
						<Typography variant="overline" sx={{ fontWeight: 'bold' }}>
							Average Rating:
						</Typography>

						<Rating
							value={ratingValue}
							readOnly max={10}
							precision={0.25}
						/>
					</Box>
			</Box>
    </Container>
  );
}

export default MovieDetails;
