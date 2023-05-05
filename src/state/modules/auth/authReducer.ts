import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../../services/auth.service';
import type { RootState } from '../../store';

type AuthState = {
  currentUser: IUser | null;
  accessToken: string | null;
};

const initialState: AuthState = { currentUser: null, accessToken: null };

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, { payload: { accessToken } }: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = accessToken;
    },
    setCurrentUser: (state, { payload: { currentUser } }: PayloadAction<{ currentUser: IUser }>) => {
      state.currentUser = currentUser;
    },
    logout: () => initialState,
  },
});

export const { setCurrentUser, setAccessToken, logout } = slice.actions;

export default slice.reducer;

export const selectAuth = (state: RootState) => state.auth;
