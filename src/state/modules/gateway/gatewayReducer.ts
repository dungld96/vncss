import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';
import { IGateway } from '../../../services/gateway.service';

type GatewayState = {
  gateways: IGateway[];
  cursor: CursorType;
  limit: number;
  total: number;
};

const initialState: GatewayState = { gateways: [], cursor: {}, limit: 10, total: 0 };

const slice = createSlice({
  name: 'gatewayState',
  initialState: initialState,
  reducers: {
    setGateways: (
      state,
      {
        payload: { gateways, cursor, total },
      }: PayloadAction<{ gateways: IGateway[]; cursor: CursorType; total: number }>
    ) => {
      state.gateways = gateways;
      state.cursor = cursor;
      state.total = state.total || (total && state.total === total) ? state.total : total;
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
export const selectCursor = (state: RootState) => state.gatewayState.cursor;
