import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Collapse,
  IconButton,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Error.css';

interface ErrorProps {
  message: string;
  error?: Error;
}

function Error({ message, error }: ErrorProps) {
  const [expanded, setExpanded] = useState(false);

  const errorMessage = error?.message;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="error-container" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box className="error-content">
          <ErrorIcon className="error-icon" />
          <Typography variant="h6" className="error-message">
            {message}
          </Typography>
        </Box>

        {errorMessage && (
          <>
            <Box
              className="error-details"
              sx={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Typography variant="caption" className="error-label">
                Error details
              </Typography>
              <IconButton
                onClick={handleExpandClick}
                className={`expand-button ${expanded ? 'expanded' : ''}`}
                size="small"
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography variant="body2" className="error-details-text">
                {error.name}: {errorMessage}
              </Typography>
            </Collapse>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Error;
