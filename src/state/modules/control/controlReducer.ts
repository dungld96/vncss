import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';

export interface ControlLocationType {
  id: string;
  agency_id: string;
  name: string;
  province: string;
  district: string;
  commune: string;
  address: string;
  business: string;
  contact_name: string;
  contact_number: string;
  event_receivers: [];
  tags: string[];
  lat: number;
  lng: number;
  plan_building: string;
  maintaint_date: string | null;
  contract_date: string;
  state: string;
  active: boolean;
  alert_at: string;
}

export interface ControlLocationDetailStatusType {
  business: string;
  gateway: {
    id: string;
    type_id: string;
    serial: string;
    state: {
      battery: number;
      charge: number;
      gsmLevel: number;
      hum: number;
      mode: number;
      temp: number;
      timestamp: number;
    };
  };
  id: string;
  lat: number;
  lng: number;
  name: string;
  state: string;
}

export type ControlState = {
  locations: ControlLocationType[];
  filterLocations: ControlLocationType[];
  filterLocationsCursor: CursorType;
  filterLocationslimit: number;
};

const initialState: ControlState = {
  locations: [],
  filterLocations: [],
  filterLocationsCursor: { after: undefined, before: undefined },
  filterLocationslimit: 10,
};

const slice = createSlice({
  name: 'controlState',
  initialState: initialState,
  reducers: {
    setControlLocations: (state, { payload: { locations } }: PayloadAction<{ locations: any[] }>) => {
      state.locations = locations;
    },
    setControlFilterLocations: (
      state,
      { payload: { locations, cursor } }: PayloadAction<{ locations: any[]; cursor: CursorType }>
    ) => {
      state.filterLocations = locations;
      state.filterLocationsCursor = cursor || { after: undefined, before: undefined };
    },
    setControlFilterLocationsLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.filterLocationslimit = limit;
    },
  },
});

export const { setControlLocations, setControlFilterLocations, setControlFilterLocationsLimit } = slice.actions;

export default slice.reducer;

export const selectLocationState = (state: RootState) => state.controlState;
export const selectFilterLocationState = (state: RootState) => state.controlState.filterLocations;
export const selectLocation = (state: RootState) => state.controlState.locations;
