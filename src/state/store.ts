import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { agenciesApi } from 'services/agencies.service';
import { authApi } from '../services/auth.service';
import { usersApi } from '../services/users.service';
import { gatewaysApi } from '../services/gateway.service';
import { nodesApi } from '../services/node.service';
import { loactionsApi } from '../services/location.service';
import { regulatoryApi } from '../services/regulatory.service';
import { controlApi } from '../services/control.service';
import authReducer from './modules/auth/authReducer';
import modalConfirmReducer from './modules/modalConfirm/reducer';
import userReducer from './modules/user/userReducer';
import agencyReducer from './modules/agency/agencyReducer';
import gatewayReducer from './modules/gateway/gatewayReducer';
import nodeReducer from './modules/node/nodeReducer';
import locationReducer from './modules/location/locationReducer';
import regulatoryReducer from './modules/regulatory/regulatoryReducer';
import appState from './modules/app/appReducer';
import controlReducer from './modules/control/controlReducer';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [agenciesApi.reducerPath]: agenciesApi.reducer,
    [gatewaysApi.reducerPath]: gatewaysApi.reducer,
    [nodesApi.reducerPath]: nodesApi.reducer,
    [loactionsApi.reducerPath]: loactionsApi.reducer,
    [regulatoryApi.reducerPath]: regulatoryApi.reducer,
    [controlApi.reducerPath]: controlApi.reducer,
    auth: authReducer,
    modalConfirm: modalConfirmReducer,
    userState: userReducer,
    agencyState: agencyReducer,
    gatewayState: gatewayReducer,
    nodeState: nodeReducer,
    locationState: locationReducer,
    regulatoryState: regulatoryReducer,
    appState: appState,
    controlState: controlReducer,
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
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
