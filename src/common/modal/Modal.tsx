import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Breakpoint, Dialog, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  show: boolean;
  title: string;
  size?: Breakpoint;
  close?: () => void;
  children: JSX.Element | any;
}

const Title = styled(DialogTitle)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '32px',
  color: '#1E2323',
  padding: 0,
  paddingBottom: 20,
  borderBottom: '2px solid #EEF2FA',
  '& .MuiSvgIcon-root': {
    color: '#8B8C9B',
    cursor: 'pointer',
  },
});

const Modal: React.FC<Props> = (props) => {
  const { show, title, close, size = 'xs', children } = props;
  return (
    <Dialog
      open={show}
      fullWidth
      maxWidth={size}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '12px',
          padding: '20px 32px 32px',
        },
      }}
    >
      <Title>
        {title}
        {!!close && <CloseIcon onClick={() => close?.()} />}
      </Title>
      {children}
    </Dialog>
  );
};

export default Modal;
