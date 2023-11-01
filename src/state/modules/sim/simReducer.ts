import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';

type SimState = {
  sims: any[];
  cursor: CursorType;
  limit: number;
  total: number;
};

const initialState: SimState = { sims: [], cursor: {}, limit: 10, total: 0 };

const slice = createSlice({
  name: 'simState',
  initialState: initialState,
  reducers: {
    setSims: (
      state,
      { payload: { sims, cursor, total } }: PayloadAction<{ sims: any[]; cursor: CursorType; total: number }>
    ) => {
      state.sims = sims;
      state.cursor = cursor;
      state.total = state.total || (total && state.total === total) ? state.total : total;
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
export const selectCursor = (state: RootState) => state.simState.cursor;
