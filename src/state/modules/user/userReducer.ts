import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../../services/auth.service';
import type { RootState } from '../../store';

type UsersState = {
  users: IUser[];
};

const initialState: UsersState = { users: [] };

const slice = createSlice({
  name: 'userState',
  initialState: initialState,
  reducers: {
    setUsers: (state, { payload: { users } }: PayloadAction<{ users: IUser[] }>) => {
      state.users = users;
    },
  },
});

export const { setUsers } = slice.actions;

export default slice.reducer;

export const selectUsers = (state: RootState) => state.userState.users;
