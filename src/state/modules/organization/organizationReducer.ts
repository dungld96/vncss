import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';
import { IOrganization } from '../../../services/organizations.service';

type OrganizationState = {
  organizations: IOrganization[];
  cursors: CursorsType;
  limit: number;
};

const initialState: OrganizationState = { organizations: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'organizationsState',
  initialState: initialState,
  reducers: {
    setOrganizations: (state, { payload: { organizations, cursors } }: PayloadAction<{ organizations: any[]; cursors: CursorsType }>) => {
      state.organizations = organizations;
      state.cursors = cursors;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setOrganizations, setLimit } = slice.actions;

export default slice.reducer;

export const selectOrganizationState = (state: RootState) => state.organizationsState;
export const selectOrganization = (state: RootState) => state.organizationsState.organizations;
export const selectCursors = (state: RootState) => state.organizationsState.cursors;
