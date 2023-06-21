import React from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { GatewayControl } from './GatewayControl';
import { CameraControl } from './CameraControl';
import { LocationType } from '../../../state/modules/location/locationReducer';

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
      {value === index && <Box pt={2}>{children}</Box>}
    </div>
  );
};

const TabLabel = styled(Typography)({ fontWeight: 700, fontSize: '14px', textTransform: 'none' });

export const LocationDevice = ({ location }: { location?: LocationType }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box pb={2}>
      <Tabs value={value} onChange={handleChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label={<TabLabel>Gateway</TabLabel>} value={0} />
        <Tab label={<TabLabel>Danh sách camera</TabLabel>} value={1} />
        {/* <Box display="flex" flexDirection="row" width="100%" justifyContent="flex-end" alignItems="center" p="12px">
          <AddCircleOutline color="primary" style={{ cursor: 'pointer' }} />
        </Box> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <GatewayControl location={location} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CameraControl />
      </TabPanel>
    </Box>
  );
};
