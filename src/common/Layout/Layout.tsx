import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBar from 'common/Header/AppBar';
import Drawer from 'common/Sidebar/Drawer';

function App() {
  return (
    <Box sx={{ backgroundColor: '#F6F9FC', height: '100vh' }}>
      <AppBar />
      <Drawer />
      <Box mt={2} ml={9}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
