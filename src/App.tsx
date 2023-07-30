import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import get from 'lodash/get';
import { v4 as uuidv4 } from 'uuid';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { useSubNotificationMutation } from './services/notifications.service';
import { addNotificationsAlertQueue } from './state/modules/notification/notificationReducer';
import { unRegisterServiceWorker, registerServiceWorker } from './serviceWorker';
import { GatewayAlert } from './common/gateway-alert/GatewayAlert';

function App() {
  const { snackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fcmToken, setFcmToken] = React.useState<string>();
  const [targetLocationId, setTargetLocationId] = React.useState<string>();
  const [subNotification] = useSubNotificationMutation();

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
      console.log(data);
      const messageBody = get(data, 'firebase-messaging-msg-data', {});
      const notificationCM = get(messageBody, 'notification', {});
      const locationId = get(messageBody, 'data.location_id', '');
      const locationName = get(messageBody, 'data.location_name', '');
      const toastType = get(messageBody, 'data.type', 'success');
      const timestamp = get(messageBody, 'data.timestamp');
      const agencyId = get(currentUser, 'sub_id', 1);

      const onclick = (e: any) => {
        setTargetLocationId(locationId);
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
      dispatch(
        addNotificationsAlertQueue({
          id: uuidv4(),
          locationId: locationId || 'citd2v9g1oa4iuj7tc10',
          locationName,
          type: toastType,
          notificationText: notificationCM.body,
          timestamp,
        })
      );
      // }
      // addNotification(agencyId, messageBody);
    });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }, []);

  useEffect(() => {
    if (fcmToken && currentUser) {
      const body = { data: { token: fcmToken }, agencyId: currentUser.sub_id };
      const effect = async () => {
        await registerServiceWorker();
        await subNotification(body);
      };
      effect();
    }
  }, [fcmToken, currentUser]);

  return (
    <Box sx={{ backgroundColor: '#F6F9FC', height: '100vh', fontFamily: 'Roboto' }}>
      <ModalConfirmContainer />
      <GatewayAlert />
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
