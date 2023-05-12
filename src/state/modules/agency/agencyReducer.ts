import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { IAgency } from '../../../services/agencies.service';
import { CursorsType } from '../../../configs/constant';

type AgenciesState = {
  agencies: IAgency[];
  cursors: CursorsType;
};

const initialState: AgenciesState = { agencies: [], cursors: {} };

const slice = createSlice({
  name: 'agencyState',
  initialState: initialState,
  reducers: {
    setAgencies: (state, { payload: { agencies } }: PayloadAction<{ agencies: IAgency[] }>) => {
      state.agencies = agencies;
    },
    setCursors: (state, { payload: { cursors } }: PayloadAction<{ cursors: CursorsType }>) => {
      state.cursors = cursors;
    },
  },
});

export const { setAgencies, setCursors } = slice.actions;

export default slice.reducer;

export const selectAgencies = (state: RootState) => state.agencyState.agencies;
export const selectCursors = (state: RootState) => state.agencyState.cursors;
