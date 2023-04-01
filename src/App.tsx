import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from 'screens/Auth/LoginScreen';
import RequireUser from 'screens/Auth/RequireUser';
import DashboardScreen from 'screens/Dashboard/DashboardScreen';
import Layout from 'common/Layout/Layout';

function App() {
  return (
    <Box sx={{ backgroundColor: '#F6F9FC', height: '100vh' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<RequireUser allowedRoles={['user']} />}>
            <Route index element={<DashboardScreen />} />
            {/* <Route path="unauthorized" element={<UnauthorizePage />} /> */}
          </Route>
        </Route>

        <Route path="login" element={<LoginScreen />} />
      </Routes>
    </Box>
  );
}

export default App;
