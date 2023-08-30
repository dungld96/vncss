import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

type SimState = {
  sims: any[];
  cursors: CursorsType;
  limit: number;
};

const initialState: SimState = { sims: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'simState',
  initialState: initialState,
  reducers: {
    setSims: (state, { payload: { sims, cursors } }: PayloadAction<{ sims: any[]; cursors: CursorsType }>) => {
      state.sims = sims;
      state.cursors = cursors;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setSims, setLimit } = slice.actions;

export default slice.reducer;

export const selectSimState = (state: RootState) => state.simState;
export const selectSims = (state: RootState) => state.simState.sims;
export const selectCursors = (state: RootState) => state.simState.cursors;
