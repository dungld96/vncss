import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { agenciesApi } from 'services/agencies.service';
import { authApi } from '../services/auth.service';
import { gatewaysApi } from '../services/gateway.service';
import { loactionsApi } from '../services/location.service';
import { nodesApi } from '../services/node.service';
import { organizationsApi } from '../services/organizations.service';
import { regulatoryApi } from '../services/regulatory.service';
import { usersApi } from '../services/users.service';
import agencyReducer from './modules/agency/agencyReducer';
import appState from './modules/app/appReducer';
import { controlApi } from '../services/control.service';
import { camerasApi } from '../services/cameras.service';
import authReducer from './modules/auth/authReducer';
import gatewayReducer from './modules/gateway/gatewayReducer';
import locationReducer from './modules/location/locationReducer';
import modalConfirmReducer from './modules/modalConfirm/reducer';
import nodeReducer from './modules/node/nodeReducer';
import organizationReducer from './modules/organization/organizationReducer';
import regulatoryReducer from './modules/regulatory/regulatoryReducer';
import userReducer from './modules/user/userReducer';
import controlReducer from './modules/control/controlReducer';
import cameraReducer from './modules/camera/cameraReducer';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [agenciesApi.reducerPath]: agenciesApi.reducer,
    [gatewaysApi.reducerPath]: gatewaysApi.reducer,
    [nodesApi.reducerPath]: nodesApi.reducer,
    [loactionsApi.reducerPath]: loactionsApi.reducer,
    [regulatoryApi.reducerPath]: regulatoryApi.reducer,
    [organizationsApi.reducerPath]: organizationsApi.reducer,
    [controlApi.reducerPath]: controlApi.reducer,
    [camerasApi.reducerPath]: camerasApi.reducer,
    auth: authReducer,
    modalConfirm: modalConfirmReducer,
    userState: userReducer,
    agencyState: agencyReducer,
    gatewayState: gatewayReducer,
    nodeState: nodeReducer,
    locationState: locationReducer,
    regulatoryState: regulatoryReducer,
    organizationsState: organizationReducer,
    appState: appState,
    controlState: controlReducer,
    cameraState: cameraReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      usersApi.middleware,
      agenciesApi.middleware,
      gatewaysApi.middleware,
      nodesApi.middleware,
      loactionsApi.middleware,
      regulatoryApi.middleware,
      controlApi.middleware,
      organizationsApi.middleware,
      camerasApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
