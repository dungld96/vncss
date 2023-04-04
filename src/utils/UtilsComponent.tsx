import { Icon } from '@mui/material';

export const ImageIcon = ({ image }: { image: string }) => {
  return (
    <Icon sx={{ width: '0.85em', height: '0.85em', display: 'flex', alignItems: 'center' }}>
      <img style={{ width: '100%' }} src={image} alt="" />
    </Icon>
  );
};
