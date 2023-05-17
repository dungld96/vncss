import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type ModalConfirmState = {
  show?: boolean;
  type?: string | 'warning' | 'success' | 'failed';
  title: string;
  content: string;
  confirm?: { text?: string; action: () => void };
  cancel?: { text?: string; action: () => void };
  close?: () => void;
};

const initialState: ModalConfirmState = { show: false, title: '', content: '' };

const slice = createSlice({
  name: 'modalConfirm',
  initialState,
  reducers: {
    showModalConfirm: (state, { payload }: PayloadAction<ModalConfirmState>) => {
      return { ...payload, show: true };
    },
    hideModalConfirm: (state) => {
      return { ...initialState };
    },
  },
});

export const { showModalConfirm, hideModalConfirm } = slice.actions;

export default slice.reducer;

export const selectModalConfirm = (state: RootState) => state.modalConfirm;
