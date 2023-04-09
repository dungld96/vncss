import { IAgency } from './../../../screens/Agencies/mockData';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type AgencyState = {
  currentAgency: IAgency | null;
};

const initialState: AgencyState = { currentAgency: null };

const slice = createSlice({
  name: 'agencies',
  initialState,
  reducers: {
    setCurrentAgency: (state, { payload: { currentAgency } }: PayloadAction<{ currentAgency: IAgency }>) => {
      state.currentAgency = currentAgency;
    },
  },
});

export const { setCurrentAgency } = slice.actions;

export default slice.reducer;

export const selectAgencies = (state: RootState) => state.agencies;
