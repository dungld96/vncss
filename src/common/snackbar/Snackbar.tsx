import React from 'react';
import { Snackbar, Alert, AlertColor, SnackbarOrigin } from '@mui/material';
import { useSnackbar } from '../../hooks/useSnackbar';

export const GlobalSnackbar = ({
  open,
  message,
  severity,
  autoHideDuration,
  anchorOrigin,
}: {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
}) => {
  const { setSnackbar } = useSnackbar();
  const handleClose = (event?: any, reason?: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, message: '', severity: 'info' });
  };

  if (!open) return null;

  return (
    <Snackbar
      anchorOrigin={
        anchorOrigin || {
          vertical: 'bottom',
          horizontal: 'left',
        }
      }
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration || 3000}
    >
      <Alert variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
