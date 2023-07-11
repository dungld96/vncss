import React from 'react';
import { Box } from '@mui/material';
import CamerasTable from './CamerasTable';

export const CamerasScreen = () => {
  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <CamerasTable />
    </Box>
  );
};
