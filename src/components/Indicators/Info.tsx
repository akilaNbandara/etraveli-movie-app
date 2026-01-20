import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface InfoProps {
  message: string;
}

function Info({ message }: InfoProps) {
  return (
    <Box className="info-container">
      <Box className="info-content">
        <InfoIcon className="info-icon" />
        <Typography variant="h6" className="info-text">
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default Info;
