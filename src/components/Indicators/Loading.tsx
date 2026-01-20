import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './Loading.css';

interface LoadingProps {
  message?: string;
}

function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <Box className="loading-container">
      <Box className="loading-content">
        <CircularProgress size={50} sx={{ color: '#FFE81F' }} />
        <Typography variant="h6" className="loading-text">
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default Loading;
