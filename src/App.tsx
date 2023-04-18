import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/Auth/LoginScreen';
import UsersScreen from './screens/Users/UsersScreen';
import Profile from './screens/Profile/Profile';
import RequireUser from './screens/Auth/RequireUser';
import DashboardScreen from './screens/Dashboard/DashboardScreen';
import AgenciesScreen from './screens/Agencies/AgenciesScreen';
import RegulatoryAgenciesScreen from './screens/RegulatoryAgencies/RegulatoryAgenciesScreen';
import Layout from './common/Layout/Layout';
import ReportsScreen from 'screens/Reports/ReportsScreen';
import WarehouseSimScreen from 'screens/WarehouseSim/WarehouseSimScreen';
import VitalVehicle from 'screens/VitalVehicle/VitalVehicle';
import VehicleProtect from 'screens/VehicleProtect/VehicleProtect';

function App() {
  return (
    <Box sx={{ backgroundColor: '#F6F9FC', height: '100vh', fontFamily: 'Roboto' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<RequireUser allowedRoles={['user']} />}>
            <Route index element={<DashboardScreen />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<UsersScreen />} />
            <Route path="regulatory-agency" element={<RegulatoryAgenciesScreen />} />
            <Route path="agencies" element={<AgenciesScreen />} />
            <Route path="warehouse-sim" element={<WarehouseSimScreen />} />
            <Route path="reports" element={<ReportsScreen />} />
            <Route path="vehicel-protect" element={<VehicleProtect />} />
            <Route path="vehicel-vital" element={<VitalVehicle />} />
            {/* <Route path="unauthorized" element={<UnauthorizePage />} /> */}
          </Route>
        </Route>

        <Route path="login" element={<LoginScreen />} />
      </Routes>
    </Box>
  );
}

export default App;
