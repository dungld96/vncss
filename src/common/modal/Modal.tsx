import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Breakpoint, Box, Dialog, DialogTitle } from '@mui/material';
import React from 'react';

interface Props {
  show: boolean;
  title: string;
  size?: Breakpoint;
  close?: () => void;
  children: React.ReactNode;
  extendActions?: React.ReactNode;
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
  const { show, title, close, size = 'xs', children, style, extendActions } = props;
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
        <Box display="flex" alignItems="center">
          {extendActions}
          {!!close && <CloseIcon onClick={() => close?.()} />}
        </Box>
      </Title>
      {children}
    </Dialog>
  );
};

export default Modal;
