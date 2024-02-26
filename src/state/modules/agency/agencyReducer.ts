import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { IAgency } from '../../../services/agencies.service';
import { CursorType } from '../../../configs/constant';

type AgenciesState = {
  agencies: IAgency[];
  cursor: CursorType;
};

const initialState: AgenciesState = { agencies: [], cursor: {} };

const slice = createSlice({
  name: 'agencyState',
  initialState: initialState,
  reducers: {
    setAgencies: (state, { payload: { agencies } }: PayloadAction<{ agencies: IAgency[] }>) => {
      state.agencies = agencies;
    },
    setAgencyChilds: (state, { payload: { agencies } }: PayloadAction<{ agencies: IAgency[] }>) => {
      const filters = agencies.filter((item) => !state.agencies.find((sr) => sr.id === item.id));
      state.agencies = filters.concat(...state.agencies);
    },
  },
});

export const { setAgencies, setAgencyChilds } = slice.actions;

export default slice.reducer;

export const selectAgencies = (state: RootState) => state.agencyState.agencies;
