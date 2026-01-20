import { Box, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import './NotAvailable.css';

interface NotAvailableProps {
  message?: string;
}

function NotAvailable({ message = 'Not Available' }: NotAvailableProps) {
  return (
    <Box className="not-available-container">
      <Box className="not-available-content">
        <WarningAmberIcon className="not-available-icon" />
        <Typography variant="h6" className="not-available-text">
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default NotAvailable;
