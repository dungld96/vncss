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
import ReportsScreen from './screens/Reports/ReportsScreen';
import WarehouseSimScreen from './screens/WarehouseSim/WarehouseSimScreen';
import VitalVehicle from './screens/VitalVehicle/VitalVehicle';
import VehicleProtect from './screens/VehicleProtect/VehicleProtect';
import MonitorDepartmentScreen from './screens/MonitorDepartment/MonitorDepartmentScreen';
import ModalConfirmContainer from './common/modal/ModalConfirmContainer';
import DeployLocationScreen from './screens/DeployLocationScreen/DeployLocationScreen';
import WarehouseNodeScreen from 'screens/WarehouseNode/WarehouseNodeScreen';
import WarehouseGatewayScreen from 'screens/WarehouseGateway/WarehouseGatewayScreen';

function App() {
  return (
    <Box sx={{ backgroundColor: '#F6F9FC', height: '100vh', fontFamily: 'Roboto' }}>
      <ModalConfirmContainer />
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
            <Route path="vehicle-protect" element={<VehicleProtect />} />
            <Route path="vehicle-vital" element={<VitalVehicle />} />
            <Route path="monitor-department" element={<MonitorDepartmentScreen />} />
            <Route path="depoy-location" element={<DeployLocationScreen />} />
            <Route path="warehouse-node" element={<WarehouseNodeScreen />} />
            <Route path="warehouse-gateway" element={<WarehouseGatewayScreen />} />
            {/* <Route path="unauthorized" element={<UnauthorizePage />} /> */}
          </Route>
        </Route>

        <Route path="login" element={<LoginScreen />} />
      </Routes>
    </Box>
  );
}

export default App;
