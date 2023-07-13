import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CursorsType } from '../../../configs/constant';

type CameraStateType = {
  cameras: any[];
  cursors: CursorsType;
  limit: number;
};

const initialState: CameraStateType = { cameras: [], cursors: {}, limit: 10 };

const slice = createSlice({
  name: 'cameraState',
  initialState: initialState,
  reducers: {
    setCameras: (state, { payload: { cameras, cursors } }: PayloadAction<{ cameras: any[]; cursors: CursorsType }>) => {
      state.cameras = cameras;
      state.cursors = cursors;
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
export const selectCursors = (state: RootState) => state.cameraState.cursors;
