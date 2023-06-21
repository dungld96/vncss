import { Box } from '@mui/material';
import styled from '@emotion/styled';
import MapIcon from '../../assets/icons/map-active-icon.svg';

const MarkerContainer = styled(Box)({
  width: '32px',
  height: '32px',
  borderRadius: '50% 50% 50% 0',
  background: '#00cae9',
  position: 'absolute',
  transform: 'rotate(-45deg)',
  left: '50%',
  top: '50%',
  margin: '-20px 0 0 -20px',
  '&:after': {
    content: '""',
    width: '24px',
    height: '24px',
    margin: '4px 0 0 4px',
    background: '#e6e6e6',
    color: '#00cae9',
    position: 'absolute',
    borderRadius: '50%',
  },
  animationName: 'bounce',
  animationFillMode: 'both',
  animationDuration: '1s',
});

const MarkerPulse = styled(Box)({
  background: '#d6d4d4',
  borderRadius: '50%',
  height: '14px',
  width: '14px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  margin: '11px 0px 0px -12px',
  transform: 'rotateX(55deg)',
  zIndex: '-2',
});

interface Props {
  lat: number;
  lng: number;
}

export const MakerSelected = (props: Props) => {
  return (
    <>
      <MarkerContainer
        style={{
          backgroundColor: '#8F0A0C',
          cursor: 'pointer',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            zIndex: 1,
            top: '7px',
            right: '9px',
            width: '16px',
            minWidth: '16px',
            transform: 'rotate(45deg)',
          }}
        >
          <img style={{ width: '100%' }} src={MapIcon} alt="" />
        </Box>
      </MarkerContainer>
      <MarkerPulse />
    </>
  );
};
