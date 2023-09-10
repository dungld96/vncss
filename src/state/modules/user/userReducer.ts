import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../../services/auth.service';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';

type UsersState = {
  users: IUser[];
  cursor: CursorType;
  limit: number;
};

const initialState: UsersState = { users: [], cursor: {}, limit: 10 };

const slice = createSlice({
  name: 'userState',
  initialState: initialState,
  reducers: {
    setUsers: (state, { payload: { users, cursor } }: PayloadAction<{ users: IUser[]; cursor: CursorType }>) => {
      state.users = users;
      state.cursor = cursor;
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
export const selectCursor = (state: RootState) => state.userState.cursor;
