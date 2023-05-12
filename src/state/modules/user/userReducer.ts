import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../../services/auth.service';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

type UsersState = {
  users: IUser[];
  cursors: CursorsType;
  limit: number;
};

const initialState: UsersState = { users: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'userState',
  initialState: initialState,
  reducers: {
    setUsers: (state, { payload: { users, cursors } }: PayloadAction<{ users: IUser[]; cursors: CursorsType }>) => {
      state.users = users;
      state.cursors = cursors;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setUsers, setLimit } = slice.actions;

export default slice.reducer;

export const selectUsersState = (state: RootState) => state.userState;
export const selectUsers = (state: RootState) => state.userState.users;
export const selectCursors = (state: RootState) => state.userState.cursors;
