import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBar from 'common/Header/AppBar';
import Drawer from 'common/Sidebar/Drawer';

function Layout({ fcmToken }: { fcmToken?: string }) {
  return (
    <Box sx={{ backgroundColor: '#F6F9FC', height: '100vh' }}>
      <AppBar fcmToken={fcmToken} />
      <Drawer />
      <Box ml={7}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
