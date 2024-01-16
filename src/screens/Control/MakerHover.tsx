import { Typography, Box, Skeleton } from '@mui/material';
import React from 'react';
import { useGetControlLocationStatusQuery } from 'services/control.service';
import { IGatewayType } from 'services/gateway.service';
import { ControlLocationDetailStatusType, ControlLocationType } from 'state/modules/control/controlReducer';
import PinIcon from '../../assets/icons/pin-icon.svg';
import WaveIcon0 from '../../assets/icons/wave-icon-0.svg';
import WaveIcon1 from '../../assets/icons/wave-icon-1.svg';
import WaveIcon2 from '../../assets/icons/wave-icon-2.svg';
import WaveIcon3 from '../../assets/icons/wave-icon-3.svg';
import WaveIcon4 from '../../assets/icons/wave-icon-4.svg';

const waveList = [WaveIcon0, WaveIcon1, WaveIcon2, WaveIcon3, WaveIcon4];

export const MakerHover = ({
  gatewayTypes,
  location,
  agencyId,
}: {
  gatewayTypes: IGatewayType[];
  location: ControlLocationType;
  agencyId: string;
}) => {
  const { data, isLoading } = useGetControlLocationStatusQuery<{
    data?: ControlLocationDetailStatusType;
    isLoading: boolean;
  }>({
    agencyId,
    locationId: location.id,
  });
  const gatewayType = gatewayTypes ? gatewayTypes.find((item: any) => item.id === data?.gateway.type_id) : null;

  return (
    <Box
      style={{
        width: '220px',
        height: 'auto',
        border: '1px solid #dadde9',
        left: '20px',
        top: '-20px',
        backgroundColor: '#fff',
        textAlign: 'left',
        borderRadius: '8px',
        padding: '12px 16px',
        position: 'absolute',
        zIndex: 1,
      }}
    >
      <Typography style={{ fontSize: '16px', fontWeight: 600, color: '#1E2323' }}>{location.name}</Typography>
      {isLoading ? (
        <>
          <Box display="flex" alignItems="center" py={'4px'}>
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
          </Box>
          <Box display="flex" alignItems="center" py={'4px'}>
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
          </Box>
          <Box display="flex" alignItems="center" pt={'4px'}>
            <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" alignItems="center" py={'4px'}>
            <Typography style={{ fontSize: '13px', color: '#8B8C9B', marginRight: '4px' }}>Loại:</Typography>
            <Typography style={{ fontSize: '13px', color: '#52535C' }}>{gatewayType?.name || '--'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" py={'4px'}>
            <Typography style={{ fontSize: '13px', color: '#8B8C9B', marginRight: '4px' }}>Serial:</Typography>
            <Typography style={{ fontSize: '13px', color: '#52535C' }}>{data?.gateway.serial || '--'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" pt={'4px'}>
            <Box display="flex" alignItems="flex-end">
              <img src={PinIcon} alt="" style={{ width: '24px', height: '24px', marginRight: '4px' }} />
              <Typography style={{ color: '#52535C', fontSize: '13px', paddingBottom: '2px' }}>
                {data?.gateway.state?.battery || 0}%
              </Typography>
            </Box>
            <Box ml={2} display="flex" alignItems="flex-end">
              <img
                src={waveList[data?.gateway.state?.gsmLevel || 0]}
                alt=""
                style={{ width: '24px', height: '24px' }}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
