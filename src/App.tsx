import React from 'react';
import { Box, Button } from '@mui/material';
import get from 'lodash/get';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { onMessage } from 'firebase/messaging';
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
import WarehouseNodeScreen from './screens/WarehouseNode/WarehouseNodeScreen';
import WarehouseGatewayScreen from './screens/WarehouseGateway/WarehouseGatewayScreen';
import { ControlScreen } from './screens/Control/ControlScreen';
import { GlobalSnackbar } from './common/snackbar/Snackbar';
import { useSnackbar } from './hooks/useSnackbar';
import { CamerasScreen } from './screens/cameras/CamerasScreen';
import { useAuth } from './hooks/useAuth';
import { messaging, getTokenFcm } from './firebase';
import { ROUTE_CONTROL } from './utils/routesMap';

function App() {
  const { snackbar } = useSnackbar();
  const navigate = useNavigate();

  const [fcmToken, setFcmToken] = React.useState<string>();
  const [targetLocationId, setTargetLocationId] = React.useState<string>();

  const {
    auth: { currentUser },
  } = useAuth();

  React.useEffect(() => {
    if (currentUser) {
      getTokenFcm().then((data) => {
        if (data) {
          setFcmToken(data);
        }
      });
    }
  }, [currentUser]);

  React.useEffect(() => {
    navigator.serviceWorker.addEventListener('message', ({ data }) => {
      const messageBody = get(data, 'firebase-messaging-msg-data', {});
      const notificationCM = get(messageBody, 'notification', {});
      const gatewaySerial = get(messageBody, 'data.gateway_serial', '');
      const toastType = get(messageBody, 'data.type', 'success');
      const timestamp = get(messageBody, 'data.timestamp');
      const agencyId = get(currentUser, 'sub_id', 1);
      console.log(messageBody);
      console.log(notificationCM);
      console.log(gatewaySerial);

      const onclick = (e: any) => {
        setTargetLocationId(gatewaySerial);
        e.preventDefault();
        navigate(ROUTE_CONTROL);
      };
      const remove = (key: string) => () => {
        // closeSnackbar(key);
        // readNotification(agencyId, timestamp);
      };
      const action = (key: string) => (
        <>
          <Button style={{ color: 'white' }} onClick={onclick}>
            Chi tiết
          </Button>
          <Button style={{ color: 'white' }} onClick={remove(key)}>
            Xoá
          </Button>
        </>
      );
      // if (toastType === 'success') {
      //   enqueueSnackbar(notificationCM.body, {
      //     variant: toastType,
      //     autoHideDuration: 10000,
      //     action,
      //     anchorOrigin: {
      //       vertical: 'top',
      //       horizontal: 'center',
      //     },
      //   });
      // } else {
      //   addNotificationToQueue({
      //     id: guid(),
      //     messageBody,
      //     notificationText: notificationCM.body,
      //     timestamp,
      //     gatewaySerial,
      //   });
      // }
      // addNotification(agencyId, messageBody);
    });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }, []);

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
            <Route path="organizations" element={<MonitorDepartmentScreen />} />
            <Route path="depoy-location" element={<DeployLocationScreen />} />
            <Route path="warehouse-node" element={<WarehouseNodeScreen />} />
            <Route path="warehouse-gateway" element={<WarehouseGatewayScreen />} />
            <Route path="warehouse-cameras" element={<CamerasScreen />} />
            <Route path="control" element={<ControlScreen />} />
            {/* <Route path="unauthorized" element={<UnauthorizePage />} /> */}
          </Route>
        </Route>

        <Route path="login" element={<LoginScreen />} />
      </Routes>
      <GlobalSnackbar {...snackbar} />
    </Box>
  );
}

export default App;
