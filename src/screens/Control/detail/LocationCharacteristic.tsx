import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { LocationType } from '../../../state/modules/location/locationReducer';
import { useLazyGetControlLocationCharacteristicQuery } from '../../../services/control.service';
import { useAuth } from 'hooks/useAuth';

const InfoTitle = styled(Typography)({ fontSize: '14px', color: '#8B8C9B' });
const InfoValue = styled(Typography)({ fontSize: '14px', color: '#1E2323' });

export const LocationCharacteristic = ({ location }: { location?: LocationType }) => {
  const {
    auth: { currentUser },
  } = useAuth();

  const [getControlLocationCharacteristicQuery, { data }] = useLazyGetControlLocationCharacteristicQuery();

  useEffect(() => {
    if (currentUser && location) {
      getControlLocationCharacteristicQuery({ agencyId: currentUser.sub_id, locationId: location.id }).unwrap();
    }
  }, [currentUser, location]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Đặc thù kinh doanh:</InfoTitle>
        <Typography style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer', fontWeight: 500 }}>Sửa</Typography>
      </Box>
      <InfoValue>{data?.business_characteristic || '--'}</InfoValue>

      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Vị trí:</InfoTitle>
        <Typography style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer', fontWeight: 500 }}>Sửa</Typography>
      </Box>
      <InfoValue>{data?.position || '--'}</InfoValue>

      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Hướng tiếp giáp:</InfoTitle>
        <Typography style={{ fontSize: '14px', color: '#E13153', cursor: 'pointer', fontWeight: 500 }}>Sửa</Typography>
      </Box>
      <InfoValue>{data?.direction || '--'}</InfoValue>
    </Box>
  );
};
