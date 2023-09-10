import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';
import { IOrganization } from '../../../services/organizations.service';

type OrganizationState = {
  organizations: IOrganization[];
  cursor: CursorType;
  limit: number;
};

const initialState: OrganizationState = { organizations: [], cursor: {}, limit: 10 };

const slice = createSlice({
  name: 'organizationsState',
  initialState: initialState,
  reducers: {
    setOrganizations: (
      state,
      { payload: { organizations, cursor } }: PayloadAction<{ organizations: any[]; cursor: CursorType }>
    ) => {
      state.organizations = organizations;
      state.cursor = cursor;
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
export const selectCursor = (state: RootState) => state.organizationsState.cursor;
