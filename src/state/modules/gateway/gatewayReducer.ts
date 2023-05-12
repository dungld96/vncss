import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

type GatewayState = {
  gateways: any[];
  cursors: CursorsType;
};

const initialState: GatewayState = { gateways: [], cursors: {} };

const slice = createSlice({
  name: 'gatewayState',
  initialState: initialState,
  reducers: {
    setGateways: (state, { payload: { gateways } }: PayloadAction<{ gateways: any[] }>) => {
      state.gateways = gateways;
    },
    setCursors: (state, { payload: { cursors } }: PayloadAction<{ cursors: CursorsType }>) => {
      state.cursors = cursors;
    },
  },
});

export const { setGateways, setCursors } = slice.actions;

export default slice.reducer;

export const selectAgencies = (state: RootState) => state.gatewayState.gateways;
export const selectCursors = (state: RootState) => state.gatewayState.cursors;
