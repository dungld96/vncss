import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorType } from '../../../configs/constant';

type CameraStateType = {
  cameras: any[];
  cursor: CursorType;
  limit: number;
};

const initialState: CameraStateType = { cameras: [], cursor: {}, limit: 10 };

const slice = createSlice({
  name: 'cameraState',
  initialState: initialState,
  reducers: {
    setCameras: (state, { payload: { cameras, cursor } }: PayloadAction<{ cameras: any[]; cursor: CursorType }>) => {
      state.cameras = cameras;
      state.cursor = cursor;
    },
    setLimit: (state, { payload: { limit } }: PayloadAction<{ limit: number }>) => {
      state.limit = limit;
    },
  },
});

export const { setCameras, setLimit } = slice.actions;

export default slice.reducer;

export const selectCameraState = (state: RootState) => state.cameraState;
export const selectCameras = (state: RootState) => state.cameraState.cameras;
export const selectCursor = (state: RootState) => state.cameraState.cursor;
