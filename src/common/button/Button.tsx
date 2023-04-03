import styled from '@emotion/styled';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import React, { MutableRefObject } from 'react';

interface Props extends ButtonProps {
  innerRef?: MutableRefObject<any>;
  fullWidth?: boolean;
}

const Button: React.FC<Props> = (props) => {
  const { innerRef, children, disabled, fullWidth, ...rest } = props;

  const Button = styled(MuiButton)({
    width: fullWidth ? '100%' : undefined,
    height: '44px',
    borderRadius: '8px',
    margin: 0,
    '&.MuiButton-textPrimary': {
      color: '#8F0A0C !important',
    },
    '&.Mui-disabled': {
      backgroundColor: '#EDCCCC !important',
    },

    '&.Mui-disabled.MuiButton-containedPrimary': {
      color: 'white !important',
    },
  });

  return (
    <Button ref={innerRef} disabled={disabled} {...rest}>
      {children}
    </Button>
  );
};

export default Button;
