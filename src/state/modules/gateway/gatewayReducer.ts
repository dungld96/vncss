import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';
import { IGateway } from '../../../services/gateway.service';

type GatewayState = {
  gateways: IGateway[];
  cursors: CursorsType;
  limit: number;
};

const initialState: GatewayState = { gateways: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'gatewayState',
  initialState: initialState,
  reducers: {
    setGateways: (
      state,
      { payload: { gateways, cursors } }: PayloadAction<{ gateways: IGateway[]; cursors: CursorsType }>
    ) => {
      state.gateways = gateways;
      state.cursors = cursors;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setGateways, setLimit } = slice.actions;

export default slice.reducer;

export const selectGatewayState = (state: RootState) => state.gatewayState;
export const selectGateway = (state: RootState) => state.gatewayState.gateways;
export const selectCursors = (state: RootState) => state.gatewayState.cursors;
