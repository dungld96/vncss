import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../../services/auth.service';
import type { RootState } from '../../store';
import { IAgency } from '../../../services/agencies.service';

type AgenciesState = {
  agencies: IAgency[];
};

const initialState: AgenciesState = { agencies: [] };

const slice = createSlice({
  name: 'agencyState',
  initialState: initialState,
  reducers: {
    setAgencies: (state, { payload: { agencies } }: PayloadAction<{ agencies: IAgency[] }>) => {
      state.agencies = agencies;
    },
  },
});

export const { setAgencies } = slice.actions;

export default slice.reducer;

export const selectAgencies = (state: RootState) => state.agencyState.agencies;
