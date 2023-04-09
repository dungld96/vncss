import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from '../services/auth.service';
import { usersApi } from '../services/users.service';
import authReducer from './modules/auth/reducer';
import agenciesReducer from './modules/agencies/reducer';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
    agencies:agenciesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([authApi.middleware, usersApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
