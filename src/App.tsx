import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from 'screens/Auth/LoginScreen';
import AppBar from 'common/Header/AppBar';
import Drawer from 'common/Sidebar/Drawer';

function App() {
  return (
    <Box sx={{ backgroundColor: '#F6F9FC', height: '100vh' }}>
      <AppBar />
      <Drawer />
      <Routes>
        <Route path="login" element={<LoginScreen />} />
      </Routes>
    </Box>
  );
}

export default App;
