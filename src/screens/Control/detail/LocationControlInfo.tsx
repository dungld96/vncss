import React from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { LocationType } from '../../../state/modules/location/locationReducer';

const InfoTitle = styled(Typography)({ fontSize: '14px', color: '#8B8C9B' });
const InfoValue = styled(Typography)({ fontSize: '14px', color: '#1E2323' });

const LocationBaseInfo = ({ location }: { location?: LocationType }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Tên:</InfoTitle>
        <InfoValue>{location?.name || '--'}</InfoValue>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Địa chỉ:</InfoTitle>
        <InfoValue>{location?.address || '--'}</InfoValue>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Loại hình KD:</InfoTitle>
        <InfoValue>Ngân hàng</InfoValue>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Người liên hệ:</InfoTitle>
        <InfoValue>{location?.contact_name || '--'}</InfoValue>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Chức vụ:</InfoTitle>
        <InfoValue>Giám đốc</InfoValue>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>SĐT người liên hệ:</InfoTitle>
        <InfoValue>{location?.contact_number || '--'}</InfoValue>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Ngày ký hợp đồng:</InfoTitle>
        <InfoValue>{location?.contract_date ? dayjs(location?.contract_date).format('DD/MM/YYYY') : '--'}</InfoValue>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
        <InfoTitle>Ngày bảo trì tiếp theo:</InfoTitle>
        <InfoValue>
          {location?.contract_date ? dayjs(location?.contract_date).add(6, 'month').format('DD/MM/YYYY') : '--'}
        </InfoValue>
      </Box>
    </Box>
  );
};

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

export const LocationInfo = ({ location }: { location?: LocationType }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box pb={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        centered
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label={<TabLabel>Thông tin cơ sở</TabLabel>} value={0} />
        <Tab label={<TabLabel>Đặc điểm cơ sở</TabLabel>} value={1} />
        <Tab label={<TabLabel>Tag</TabLabel>} value={2} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <LocationBaseInfo location={location} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};
