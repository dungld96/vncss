import React from 'react';
import { Typography, Box } from '@mui/material';
import { MyLocation as MyLocationIcon } from '@mui/icons-material';
import _ from 'lodash';
import styled from '@emotion/styled';
import HomeIcon from '../../assets/icons/home-icon.svg';
import HomeMIcon from '../../assets/icons/home-m-icon.svg';
import BuildingIcon from '../../assets/icons/building.svg';
import CarIcon from '../../assets/icons/car.svg';
import DollarsIcon from '../../assets/icons/dollars.svg';
import MotoIcon from '../../assets/icons/moto.svg';
import PvnIcon from '../../assets/icons/pvn-icon.svg';
import AtmIcon from '../../assets/icons/atm.svg';
import { ControlLocationType } from '../../state/modules/control/controlReducer';

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
  //   .pulse-wave:after {
  //     content: '';
  //     border-radius: 50%;
  //     height: 40px;
  //     width: 40px;
  //     position: absolute;
  //     margin: -13px 0 0 -13px;
  //     animation: pulsate 1s ease-out;
  //     animation-iteration-count: infinite;
  //     opacity: 0;
  //     box-shadow: 0 0 1px 4px #dc3545;
  //     animation-delay: 1.1s;
  //   }
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
    <MarkerContainer style={{ cursor: 'pointer' }}>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1,
          transform: 'rotate(45deg)',
          top: '9px',
          right: '9px',
          width: '16px',
          display: 'flex',
          justifyContent: 'center',
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
  const { state, name } = location;

  // const getActiveMode = () => {
  //   const mode = _.get(location_config, 'mode', 1);
  //   const code = _.get(locationType, [0, 'code'], '');
  //   const modeState = _.get(JSON.parse(state), 'mode', 0);

  //   if (mode === 1) {
  //     return 'Tắt cảnh báo';
  //   } else {
  //     if (code === 'SGW-AC6') {
  //       if (modeState === 1) {
  //         return 'Bật cảnh báo';
  //       } else {
  //         return 'Tắt cảnh báo';
  //       }
  //     } else {
  //       if (mode === 2) {
  //         return 'Đang ở nhà';
  //       } else {
  //         return 'Rời khỏi nhà';
  //       }
  //     }
  //   }
  // };

  const getIcon = () => {
    const code = '';
    if (code) {
      switch (code) {
        case 'SGPS-MT1':
          return MotoIcon;

        case 'SGPS-CT0':
          return CarIcon;

        case 'SGPS-RB2':
          return DollarsIcon;

        case 'SGW-A01':
          return BuildingIcon;

        case 'SGW-AC6':
          return BuildingIcon;

        case 'SGW-PM1':
          return PvnIcon;

        case 'SGW-GM2':
          return HomeMIcon;

        case 'SGW-A4E':
          return AtmIcon;

        default:
          return HomeIcon;
      }
    }
    return HomeIcon;
  };

  return (
    <>
      <MarkerContainer
        style={{
          backgroundColor: color,
          cursor: 'pointer',
        }}
        onClick={() => onMarkerClick(location)}
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
          <img
            src={getIcon()}
            alt=""
            style={{
              width: '100%',
            }}
          />
        </Box>
      </MarkerContainer>
      <MarkerPulse />
      <Box position="relative" zIndex={1}>
        <Typography
          style={{
            position: 'absolute',
            width: '90px',
            left: '16px',
            bottom: 0,
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '16px',
          }}
        >
          {name}
        </Typography>
      </Box>
    </>
  );
};
