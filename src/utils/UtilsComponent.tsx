import { Icon } from '@mui/material';
import { CSSProperties } from 'react';

export const ImageIcon = ({ image, style }: { image: string; style?: CSSProperties }) => {
  return (
    <Icon sx={{ width: '0.85em', height: '0.85em', display: 'flex', alignItems: 'center' }} style={style}>
      <img style={{ width: '100%' }} src={image} alt="" />
    </Icon>
  );
};
