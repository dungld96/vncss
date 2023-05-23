import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

type LocationState = {
  locations: any[];
  cursors: CursorsType;
  limit: number;
};

const initialState: LocationState = { locations: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'locationState',
  initialState: initialState,
  reducers: {
    setLocations: (state, { payload: { locations } }: PayloadAction<{ locations: any[] }>) => {
      state.locations = locations;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setLocations, setLimit } = slice.actions;

export default slice.reducer;

export const selectLocationState = (state: RootState) => state.locationState;
export const selectLocation = (state: RootState) => state.locationState.locations;
export const selectCursors = (state: RootState) => state.locationState.cursors;
