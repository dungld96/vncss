import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/auth/LoginScreen';
import UsersScreen from './screens/users/UsersScreen';
import Profile from './screens/profile/Profile';
import RequireUser from './screens/auth/RequireUser';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import AgenciesScreen from './screens/agencies/AgenciesScreen';
import RegulatoryAgenciesScreen from './screens/regulatory-agencies/RegulatoryAgenciesScreen';
import Layout from './common/Layout/Layout';
import ReportsScreen from './screens/reports/ReportsScreen';
import WarehouseSimScreen from './screens/warehouse-sim/WarehouseSimScreen';
import VitalVehicle from './screens/vital-vehicle/VitalVehicle';
import VehicleProtect from './screens/vehicle-protect/VehicleProtect';
import MonitorDepartmentScreen from './screens/monitor-department/MonitorDepartmentScreen';
import ModalConfirmContainer from './common/modal/ModalConfirmContainer';
import DeployLocationScreen from './screens/deploy-location/DeployLocationScreen';
import WarehouseNodeScreen from './screens/warehouse-node/WarehouseNodeScreen';
import WarehouseGatewayScreen from './screens/warehouse-gateway/WarehouseGatewayScreen';
import { ControlScreen } from './screens/control/ControlScreen';

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
            <Route path="control" element={<ControlScreen />} />
            {/* <Route path="unauthorized" element={<UnauthorizePage />} /> */}
          </Route>
        </Route>

        <Route path="login" element={<LoginScreen />} />
      </Routes>
    </Box>
  );
}

export default App;
