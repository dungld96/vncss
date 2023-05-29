import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type ObjectType = { [key: string]: any };

type AppState = {
  area: ObjectType[];
};

const initialState: AppState = { area: [] };

const slice = createSlice({
  name: 'appState',
  initialState: initialState,
  reducers: {
    setArea: (state, { payload: { area } }: PayloadAction<{ area: ObjectType[] }>) => {
      state.area = area;
    },
  },
});

export const { setArea } = slice.actions;

export default slice.reducer;

export const selectArea = (state: RootState) => state.appState.area;
