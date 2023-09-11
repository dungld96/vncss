import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../../services/auth.service';
import type { RootState } from '../../store';
import { IAgency } from '../../../services/agencies.service';

type AuthState = {
  currentUser: IUser | null;
  currentAgency: IAgency | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = { currentUser: null, accessToken: null, refreshToken: null, currentAgency: null };

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, { payload: { currentUser } }: PayloadAction<{ currentUser: IUser }>) => {
      state.currentUser = currentUser;
    },
    setCurrentAgency: (state, { payload: { currentAgency } }: PayloadAction<{ currentAgency: IAgency }>) => {
      state.currentAgency = currentAgency;
    },
    logout: () => initialState,
  },
});

export const { setCurrentUser, setCurrentAgency, logout } = slice.actions;

export default slice.reducer;

export const selectAuth = (state: RootState) => state.auth;
