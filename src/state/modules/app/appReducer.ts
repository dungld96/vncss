import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { SnackbarOrigin } from '@mui/material';

type ObjectType = { [key: string]: any };
export type SnackbarType = {
  severity: 'error' | 'success' | 'warning' | 'info';
  message: string;
  open: boolean;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
};

type AppState = {
  area: ObjectType[];
  snackbar: SnackbarType;
};

const initialState: AppState = {
  area: [],
  snackbar: { severity: 'info', message: '', open: false },
};

const slice = createSlice({
  name: 'appState',
  initialState: initialState,
  reducers: {
    setArea: (state, { payload: { area } }: PayloadAction<{ area: ObjectType[] }>) => {
      state.area = area;
    },
    setSnackbar: (state, { payload }: PayloadAction<SnackbarType>) => {
      state.snackbar = payload;
    },
  },
});

export const { setArea, setSnackbar } = slice.actions;

export default slice.reducer;

export const selectArea = (state: RootState) => state.appState.area;
export const selectSnackbar = (state: RootState) => state.appState.snackbar;
