import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';

type RegulatoriesState = {
  regulatories: any[];
  cursor: CursorType;
  limit: number;
};

const initialState: RegulatoriesState = { regulatories: [], cursor: {}, limit: 10 };

const slice = createSlice({
  name: 'regulatoryState',
  initialState: initialState,
  reducers: {
    setRegulatories: (
      state,
      { payload: { regulatories, cursor } }: PayloadAction<{ regulatories: any[]; cursor: CursorType }>
    ) => {
      state.regulatories = regulatories;
      state.cursor = cursor;
    },
    setRegulatoriesChilds: (state, { payload: { regulatories } }: PayloadAction<{ regulatories: any[] }>) => {
      const filterRegs = regulatories.filter((item) => !state.regulatories.find((sr) => sr.id === item.id));
      state.regulatories = filterRegs.concat(...state.regulatories);
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setRegulatories, setLimit, setRegulatoriesChilds } = slice.actions;

export default slice.reducer;

export const selectRegulatoryState = (state: RootState) => state.regulatoryState;
export const selectRegulatories = (state: RootState) => state.regulatoryState.regulatories;
export const selectCursor = (state: RootState) => state.regulatoryState.cursor;
