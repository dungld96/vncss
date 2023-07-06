import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { useSnackbar } from '../../hooks/useSnackbar';

export const GlobalSnackbar = ({
  open,
  message,
  severity,
}: {
  open: boolean;
  message: string;
  severity: AlertColor;
}) => {
  const { setSnackbar } = useSnackbar();
  const handleClose = (event?: any, reason?: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, message: '', severity: 'info' });
  };

  if (!open) return null;
  console.log('alert');
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
