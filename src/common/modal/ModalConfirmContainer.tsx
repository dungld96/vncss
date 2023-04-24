import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import ModalConfirm from './ModalConfirm';

const ModalConfirmContainer: React.FC = () => {
  const modalConfirm = useSelector((state: RootState) => state.modalConfirm);

  return <ModalConfirm {...modalConfirm} />;
};

export default ModalConfirmContainer;
