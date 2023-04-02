import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from 'screens/Auth/LoginScreen';
import UsersScreen from 'screens/Users/UsersScreen';
import Profile from 'screens/Profile/Profile';
import RequireUser from 'screens/Auth/RequireUser';
import DashboardScreen from 'screens/Dashboard/DashboardScreen';
import RegulatoryAgenciesScreen from 'screens/RegulatoryAgencies/RegulatoryAgenciesScreen';
import Layout from 'common/Layout/Layout';

function App() {
  return (
    <Box sx={{ backgroundColor: '#E5E5E5', height: '100vh' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<RequireUser allowedRoles={['user']} />}>
            <Route index element={<DashboardScreen />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<UsersScreen />} />
            <Route path="regulatory-agency" element={<RegulatoryAgenciesScreen />} />
            {/* <Route path="unauthorized" element={<UnauthorizePage />} /> */}
          </Route>
        </Route>

        <Route path="login" element={<LoginScreen />} />
      </Routes>
    </Box>
  );
}

export default App;
