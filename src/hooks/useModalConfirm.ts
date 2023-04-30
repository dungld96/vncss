import { useMemo } from 'react';
import { useAppDispatch } from '../state/store';
import { hideModalConfirm, ModalConfirmState, showModalConfirm } from '../state/modules/modalConfirm/reducer';

export default function useModalConfirm() {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      showModalConfirm: (payload: ModalConfirmState) => dispatch(showModalConfirm(payload)),
      hideModalConfirm: () => dispatch(hideModalConfirm()),
    }),
    [dispatch]
  );
}
