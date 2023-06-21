import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

export interface ControlLocationType {
  id: string;
  name: string;
  lat: number;
  lng: number;
  state: string;
}

type ControlState = {
  locations: ControlLocationType[];
};

const initialState: ControlState = { locations: [] };

const slice = createSlice({
  name: 'controlState',
  initialState: initialState,
  reducers: {
    setControlLocations: (state, { payload: { locations } }: PayloadAction<{ locations: any[] }>) => {
      state.locations = locations;
    },
  },
});

export const { setControlLocations } = slice.actions;

export default slice.reducer;

export const selectLocationState = (state: RootState) => state.controlState;
export const selectLocation = (state: RootState) => state.controlState.locations;
