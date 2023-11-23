import React, { useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import { MyLocation as MyLocationIcon } from '@mui/icons-material';
import _ from 'lodash';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import BankIcon from '../../assets/icons/b-bank.svg';
import OtherIcon from '../../assets/icons/b-home.svg';
import ElectronicIcon from '../../assets/icons/b-electronic.svg';
import GoldIcon from '../../assets/icons/b-gold.svg';
import StarIcon from '../../assets/icons/b-star.svg';
import MedicalIcon from '../../assets/icons/b-medical.svg';
import ATMIcon from '../../assets/icons/b-atm.svg';

import { ControlLocationType } from '../../state/modules/control/controlReducer';
import { BusinessIcon } from 'common/Icons/BusinessIcon';

export const MarkerContainer = styled(Box)({
  width: '32px',
  height: '32px',
  borderRadius: '50% 50% 50% 0',
  background: '#00cae9',
  position: 'absolute',
  transform: 'rotate(-45deg)',
  left: '50%',
  top: '50%',
  margin: '-20px 0 0 -20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animationName: 'bounce',
  animationFillMode: 'both',
  animationDuration: '1s',
  cursor: 'pointer',
});

const pulsate = keyframes`
    0% {
      transform: scale(0.1, 0.1);
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      transform: scale(1.2, 1.2);
      opacity: 0;
    }
`;

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

const MarkerPulseAlert = styled(Box)({
  background: '#FF451B',
  borderRadius: '50%',
  height: '14px',
  width: '14px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  margin: '11px 0px 0px -12px',
  transform: 'rotateX(55deg)',
  zIndex: '-2',
  '&:after': {
    content: '""',
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    position: 'absolute',
    margin: '-13px 0 0 -13px',
    animation: `${pulsate} 1s ease-out`,
    animationIterationCount: 'infinite',
    opacity: 0,
    boxShadow: '0 0 1px 4px #FF451B',
    animationDelay: '1.1s',
  },
});

const TypographyItem = styled(Typography)({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '5px',
  fontSize: '14px',
  'span:first-child': {
    minWidth: '120px',
  },
  'span:last-child': {
    color: '#08477c',
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const MyLocation = ({ message = '' }: { message: string; lat: number; lng: number }) => {
  const [hovering, setHovering] = React.useState(false);
  const hanleMouseEnter = () => {
    setHovering(true);
  };
  const hanleMouseLeave = () => {
    setHovering(false);
  };
  return (
    <div style={{ transform: 'translate(-50%, -50%)' }}>
      {hovering && (
        <div
          style={{
            width: '120px',
            height: 'auto',
            border: '1px solid #dadde9',
            left: '20px',
            top: '-20px',
            backgroundColor: '#555',
            color: '#fff',
            textAlign: 'left',
            borderRadius: '6px',
            padding: '6px 8px',
            position: 'absolute',
          }}
        >
          <Typography style={{ fontSize: '12px' }}>{message}</Typography>
        </div>
      )}
      <MyLocationIcon
        style={{ color: '#3a77c7', cursor: 'pointer' }}
        onMouseEnter={hanleMouseEnter}
        onMouseLeave={hanleMouseLeave}
      />
    </div>
  );
};

export const ClusterMarker = ({ pointCount }: { pointCount: number; lat: number; lng: number }) => {
  return (
    <MarkerContainer>
      <Box
        sx={{
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transform: 'rotate(45deg)',
          backgroundColor: '#e6e6e6',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        {pointCount}
      </Box>
    </MarkerContainer>
  );
};

interface Props {
  color: string;
  onMarkerClick: (location: ControlLocationType) => void;
  location: ControlLocationType;
  lat: number;
  lng: number;
  text: string;
  name: string;
  id: string;
}

export const Marker = (props: Props) => {
  const { color, onMarkerClick = _.noop, location } = props;
  const { business } = location;
  const [hovering, setHovering] = React.useState(false);
  const hanleMouseEnter = () => {
    setHovering(true);
  };
  const hanleMouseLeave = () => {
    setHovering(false);
  };

  const icon = useMemo(() => {
    if (business) {
      switch (business) {
        case 'Ngân hàng':
          return BankIcon;

        case 'Tiệm vàng':
          return GoldIcon;

        case 'Văn phòng, cơ quan hành chính':
          return StarIcon;

        case 'Trạm điện':
          return ElectronicIcon;

        case 'Bệnh viện':
          return MedicalIcon;

        case 'ATM':
          return ATMIcon;

        default:
          return OtherIcon;
      }
    }
    return OtherIcon;
  }, [business]);

  return (
    <>
      {hovering && (
        <div
          style={{
            width: '120px',
            height: 'auto',
            border: '1px solid #dadde9',
            left: '20px',
            top: '-20px',
            backgroundColor: '#fff',
            textAlign: 'left',
            borderRadius: '6px',
            padding: '6px 8px',
            position: 'absolute',
            zIndex: 1,
          }}
        >
          <Typography style={{ fontSize: '12px', fontWeight: 600 }}>{location.name}</Typography>
        </div>
      )}
      <MarkerContainer
        style={{
          backgroundColor: color,
        }}
        onClick={() => onMarkerClick(location)}
        onMouseEnter={hanleMouseEnter}
        onMouseLeave={hanleMouseLeave}
      >
        <Box
          style={{
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transform: 'rotate(45deg)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <BusinessIcon image={icon} color={color} />
        </Box>
      </MarkerContainer>
      {location && location.state === 'alert' ? <MarkerPulseAlert /> : <MarkerPulse />}
    </>
  );
};
