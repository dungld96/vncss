import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px" width="100%">
      <CircularProgress color="inherit" />
    </Box>
  );
}
