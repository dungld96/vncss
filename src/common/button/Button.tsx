import React from 'react';
import styled from '@emotion/styled';
import { Button as MuiButton, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  fullWidth?: boolean;
}

const Button = React.forwardRef((props: Props, ref: ButtonProps['ref']) => {
  const { children, ...rest } = props;

  return (
    <MuiButton ref={ref} sx={{ height: '44px', borderRadius: '8px', margin: 0 }} {...rest}>
      {children}
    </MuiButton>
  );
});

export default Button;
