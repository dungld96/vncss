import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/control');
  }, []);
  return (
    <Box mt={2} ml={2} mr={'12px'}>
      DashboardScreen
    </Box>
  );
}
