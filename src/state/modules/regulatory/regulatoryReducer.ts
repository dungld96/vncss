import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

type RegulatoriesState = {
  regulatories: any[];
  cursors: CursorsType;
  limit: number;
};

const initialState: RegulatoriesState = { regulatories: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'regulatoryState',
  initialState: initialState,
  reducers: {
    setRegulatories: (state, { payload: { regulatories, cursors } }: PayloadAction<{ regulatories: any[]; cursors: CursorsType }>) => {
      state.regulatories = regulatories;
      state.cursors = cursors;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setRegulatories, setLimit } = slice.actions;

export default slice.reducer;

export const selectRegulatoryState = (state: RootState) => state.regulatoryState;
export const selectRegulatories = (state: RootState) => state.regulatoryState.regulatories;
export const selectCursors = (state: RootState) => state.regulatoryState.cursors;
