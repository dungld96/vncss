import React from 'react';
import { Box, Typography, TextField, TextFieldProps } from '@mui/material';

export const NormalInput = ({ topLable, ...rest }: { topLable?: string } & TextFieldProps) => {
  return (
    <Box>
      {topLable && (
        <Typography
          style={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            padding: 0,
            marginBottom: 8,
            cursor: 'pointer !important',
          }}
        >
          {topLable}
        </Typography>
      )}
      <TextField
        {...rest}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #d9d9d9',
          },
          '& .MuiInputBase-root': {
            borderRadius: '8px',
            height: '44px',
            color: '#1E2323',
            fontWeight: '500',
            fontSize: '14px',
          },
          '& .MuiFormHelperText-root': {
            color: '#ec0e0e',
          },
          input: {
            '&::placeholder': {
              color: '#777777',
            },
            '&:-webkit-autofill': {
              transition: ' background-color 5000s ease-in-out 0s',
            },
          },
        }}
      />
    </Box>
  );
};
