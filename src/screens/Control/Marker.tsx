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
import { MakerHover } from './MakerHover';
import { IGatewayType } from 'services/gateway.service';

export const MarkerContainer = styled(Box)({
  width: '32px',
  height: '45px',
  background: '#00cae9',
  margin: '-26px 0 0 -21px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  animationName: 'bounce',
  animationFillMode: 'both',
  animationDuration: '1s',
  cursor: 'pointer',
  clipPath:
    'polygon( 50.427% 100%,9.763% 56.933%,9.763% 56.933%,8.15% 55.134%,6.681% 53.264%,5.364% 51.326%,4.203% 49.324%,3.204% 47.263%,2.374% 45.147%,1.718% 42.98%,1.242% 40.767%,0.953% 38.511%,0.855% 36.217%,0.855% 36.217%,1.504% 30.343%,3.382% 24.77%,6.388% 19.573%,10.419% 14.828%,15.374% 10.608%,21.15% 6.988%,27.646% 4.043%,34.759% 1.846%,42.386% 0.474%,50.427% 0%,50.427% 0%,58.468% 0.474%,66.096% 1.846%,73.209% 4.043%,79.704% 6.988%,85.48% 10.608%,90.435% 14.828%,94.467% 19.573%,97.473% 24.77%,99.351% 30.343%,100% 36.217%,100% 36.217%,99.902% 38.511%,99.612% 40.767%,99.137% 42.98%,98.481% 45.147%,97.651% 47.263%,96.652% 49.324%,95.491% 51.326%,94.173% 53.264%,92.705% 55.134%,91.091% 56.933%,50.427% 100%)',
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
          backgroundColor: '#e6e6e6',
          fontSize: '14px',
          fontWeight: 600,
          marginTop: '4px',
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
  gatewayTypes: IGatewayType[];
  lat: number;
  lng: number;
  text: string;
  name: string;
  id: string;
  agencyId?: string;
}

export const Marker = (props: Props) => {
  const { color, onMarkerClick = _.noop, location, agencyId, gatewayTypes } = props;
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
      {hovering && agencyId && <MakerHover gatewayTypes={gatewayTypes} location={location} agencyId={agencyId} />}
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
            backgroundColor: '#FFFFFF',
            marginTop: '3px',
          }}
        >
          <BusinessIcon image={icon} color={color} />
        </Box>
      </MarkerContainer>
      {location && location.state === 'alert' ? <MarkerPulseAlert /> : <MarkerPulse />}
    </>
  );
};
