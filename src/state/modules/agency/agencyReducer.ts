import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { IAgency } from '../../../services/agencies.service';
import { CursorsType } from '../../../configs/constant';

type AgenciesState = {
  agencies: IAgency[];
  cursors: CursorsType;
  limit: number;
};

const initialState: AgenciesState = { agencies: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'agencyState',
  initialState: initialState,
  reducers: {
    setAgencies: (
      state,
      { payload: { agencies, cursors } }: PayloadAction<{ agencies: IAgency[]; cursors: CursorsType }>
    ) => {
      state.agencies = agencies;
      state.cursors = cursors;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setAgencies, setLimit } = slice.actions;

export default slice.reducer;

export const selectAgenciesState = (state: RootState) => state.agencyState;
export const selectAgencies = (state: RootState) => state.agencyState.agencies;
export const selectCursors = (state: RootState) => state.agencyState.cursors;
