import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';

export interface LocationType {
  active: boolean;
  address: string;
  agency_id: string;
  business: string;
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
  state?: string;
  alert_at?: string;
  active_alert: boolean;
}

export type EventReceiveType = {
  enabled_sms: boolean;
  enabled_call: boolean;
  name: string;
  phone: string;
  position: string;
};

type LocationState = {
  locations: LocationType[];
  cursor: CursorType;
  limit: number;
  total: number;
};

const initialState: LocationState = { locations: [], cursor: {}, limit: 10, total: 0 };

const slice = createSlice({
  name: 'locationState',
  initialState: initialState,
  reducers: {
    setLocations: (
      state,
      { payload: { locations, cursor, total } }: PayloadAction<{ locations: any[]; cursor: CursorType; total: number }>
    ) => {
      state.locations = locations;
      state.cursor = cursor;
      state.total = state.total || (total && state.total === total) ? state.total : total;
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
export const selectCursor = (state: RootState) => state.locationState.cursor;
