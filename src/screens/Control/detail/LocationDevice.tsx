import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { GatewayControl } from './GatewayControl';
import { CameraControl } from './CameraControl';
import { LocationType } from '../../../state/modules/location/locationReducer';
import { useLazyGetControlLocationGatewaysQuery, ControlLocationGatewayType } from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { EmptyGateway } from './EmptyGateway';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box pt={1}>{children}</Box>}
    </div>
  );
};

const TabLabel = styled(Typography)({ fontWeight: 700, fontSize: '14px', textTransform: 'none' });

export const LocationDevice = ({ location }: { location?: LocationType }) => {
  const [value, setValue] = useState(0);
  const [gateways, setGateways] = useState<ControlLocationGatewayType[]>([]);
  const [getControlLocationGateways] = useLazyGetControlLocationGatewaysQuery();

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser && location) {
      getControlLocationGateways({ agencyId: currentUser.sub_id, locationId: location.id })
        .then(({ isSuccess, data }) => {
          if (isSuccess) {
            setGateways(data);
          }
        })
        .catch((err) => console.log('error', err));
    }
  }, [currentUser, getControlLocationGateways, location]);

  const refetchGateways = () => {
    if (currentUser && location) {
      getControlLocationGateways({ agencyId: currentUser.sub_id, locationId: location.id })
        .then(({ isSuccess, data }) => {
          if (isSuccess) {
            setGateways(data);
          }
        })
        .catch((err) => console.log('error', err));
    }
  };

  const gateway = gateways[0];
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box pb={2}>
      <Tabs value={value} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label={<TabLabel>Gateway: {gateway?.name}</TabLabel>} value={0} />
        <Tab label={<TabLabel>Quản lý camera</TabLabel>} value={1} />
        {/* <Box display="flex" flexDirection="row" width="100%" justifyContent="flex-end" alignItems="center" p="12px">
          <AddCircleOutline color="primary" style={{ cursor: 'pointer' }} />
        </Box> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        {gateway
          ? location && <GatewayControl location={location} refetchGateway={refetchGateways} gateway={gateway} />
          : location && <EmptyGateway location={location} refetch={refetchGateways} />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {location && <CameraControl location={location} />}
      </TabPanel>
    </Box>
  );
};
