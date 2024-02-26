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
    setOrganizationChilds: (state, { payload: { organizations } }: PayloadAction<{ organizations: any[] }>) => {
      const filters = organizations.filter((item) => !state.organizations.find((sr) => sr.id === item.id));
      state.organizations = filters.concat(...state.organizations);
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setOrganizations, setLimit, setOrganizationChilds } = slice.actions;

export default slice.reducer;

export const selectOrganizationState = (state: RootState) => state.organizationsState;
export const selectOrganization = (state: RootState) => state.organizationsState.organizations;
export const selectCursor = (state: RootState) => state.organizationsState.cursor;
