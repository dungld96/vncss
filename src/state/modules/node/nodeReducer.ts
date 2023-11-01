import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';

type NodeState = {
  nodes: any[];
  cursor: CursorType;
  limit: number;
  total: number;
};

const initialState: NodeState = { nodes: [], cursor: {}, limit: 10, total: 0 };

const slice = createSlice({
  name: 'nodeState',
  initialState: initialState,
  reducers: {
    setNodes: (
      state,
      { payload: { nodes, cursor, total } }: PayloadAction<{ nodes: any[]; cursor: CursorType; total: number }>
    ) => {
      state.nodes = nodes;
      state.cursor = cursor;
      state.total = state.total || (total && state.total === total) ? state.total : total;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setNodes, setLimit } = slice.actions;

export default slice.reducer;

export const selectNodeState = (state: RootState) => state.nodeState;
export const selectNode = (state: RootState) => state.nodeState.nodes;
export const selectCursor = (state: RootState) => state.nodeState.cursor;
