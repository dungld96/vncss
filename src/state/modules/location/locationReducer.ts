import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

export interface LocationType {
  active: boolean;
  address: string;
  agency_id: string;
  business_id: string;
  commune: string;
  contact_name: string;
  contact_number: string;
  contract_date: string;
  district: string;
  event_receivers: EventReceiveType[];
  id: string;
  lat: number;
  lng: number;
  maintaint_date: string | null;
  name: string;
  plan_building: string;
  province: string;
  tags: string[];
}

export type EventReceiveType = {
  enabled: boolean;
  name: string;
  phone: string;
  position: string;
};

type LocationState = {
  locations: LocationType[];
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
