import { Box } from '@mui/material';

export const BusinessIcon = ({ image, color = '#2C2C2C' }: { image: string; color: string }) => {
  return (
    <Box
      style={{
        width: '19px',
        height: '19px',
        backgroundColor: color,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        style={{
          width: '12px',
          height: '12px',
        }}
        src={image}
        alt=""
      />
    </Box>
  );
};
