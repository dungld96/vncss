import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../../services/auth.service';
import type { RootState } from '../../store';

type AuthState = {
  currentUser: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = { currentUser: null, accessToken: null, refreshToken: null };

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, { payload: { currentUser } }: PayloadAction<{ currentUser: IUser }>) => {
      state.currentUser = currentUser;
    },
    logout: () => initialState,
  },
});

export const { setCurrentUser, logout } = slice.actions;

export default slice.reducer;

export const selectAuth = (state: RootState) => state.auth;
