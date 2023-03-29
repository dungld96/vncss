import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../../services/auth.service'
import type { RootState } from '../../store';

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, accessToken: null } as AuthState,
  reducers: {
    setCurrentUser: (state, { payload: { user, accessToken } }: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = user;
      state.accessToken = accessToken;
    },
  },
});

export const { setCurrentUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
