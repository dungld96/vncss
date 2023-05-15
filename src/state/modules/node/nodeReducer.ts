import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

type NodeState = {
  nodes: any[];
  cursors: CursorsType;
  limit: number;
};

const initialState: NodeState = { nodes: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'nodeState',
  initialState: initialState,
  reducers: {
    setNodes: (state, { payload: { nodes, cursors } }: PayloadAction<{ nodes: any[]; cursors: CursorsType }>) => {
      state.nodes = nodes;
      state.cursors = cursors;
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
export const selectCursors = (state: RootState) => state.nodeState.cursors;
