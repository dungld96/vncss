import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Breakpoint, Dialog, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  show: boolean;
  title: string;
  size?: Breakpoint;
  close?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Title = styled(DialogTitle)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '16px',
  color: '#1E2323',
  padding: 0,
  paddingBottom: 16,
  borderBottom: '1px solid #d9d9d9',
  '& .MuiSvgIcon-root': {
    color: '#8B8C9B',
    cursor: 'pointer',
  },
});

const Modal: React.FC<Props> = (props) => {
  const { show, title, close, size = 'xs', children, style } = props;
  return (
    <Dialog
      open={show}
      fullWidth
      maxWidth={size}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '8px',
          padding: '20px 24px',
          ...style,
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
