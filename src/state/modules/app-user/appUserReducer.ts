import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';

export type AppUserType = {
  id: string;
  phone: string;
  username: string;
  dob: string;
  gender: string;
  email: string;
};

type AppUsersState = {
  appUsers: AppUserType[];
  cursor: CursorType;
  limit: number;
  total: number;
};

const initialState: AppUsersState = { appUsers: [], cursor: {}, limit: 10, total: 0 };

const slice = createSlice({
  name: 'appUserState',
  initialState: initialState,
  reducers: {
    setAppUsers: (state, { payload: { appUsers, cursor, total } }: PayloadAction<{ appUsers: AppUserType[]; cursor: CursorType; total: number }>) => {
      state.appUsers = appUsers;
      state.cursor = cursor;
      state.total = total;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setAppUsers, setLimit } = slice.actions;

export default slice.reducer;

export const selectAppUsersState = (state: RootState) => state.appUserState;
export const selectAppUsers = (state: RootState) => state.appUserState.appUsers;
export const selectCursor = (state: RootState) => state.appUserState.cursor;
