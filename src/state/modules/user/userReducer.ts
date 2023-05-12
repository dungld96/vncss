import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../../services/auth.service';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

type UsersState = {
  users: IUser[];
  cursors: CursorsType;
};

const initialState: UsersState = { users: [], cursors: {} };

const slice = createSlice({
  name: 'userState',
  initialState: initialState,
  reducers: {
    setUsers: (state, { payload: { users } }: PayloadAction<{ users: IUser[] }>) => {
      state.users = users;
    },
    setCursors: (state, { payload: { cursors } }: PayloadAction<{ cursors: CursorsType }>) => {
      state.cursors = cursors;
    },
  },
});

export const { setUsers, setCursors } = slice.actions;

export default slice.reducer;

export const selectUsers = (state: RootState) => state.userState.users;
export const selectCursors = (state: RootState) => state.userState.cursors;
