import React from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab, Box, Typography, Grid } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { EventReceiveType } from '../../../state/modules/location/locationReducer';

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

export const LocationManager = ({ eventReceivers }: { eventReceivers: EventReceiveType[] }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box pt={1} pb={2}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        centered
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label={<TabLabel>DS nhận thông báo</TabLabel>} value={0} />
        <Tab label={<TabLabel>DS người quản lý</TabLabel>} value={1} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box style={{ borderRadius: '6px' }}>
          <Grid
            container
            style={{
              backgroundColor: '#EEF2FA',
              border: '1px solid #C5C6D2',
              height: '48px',
              borderRadius: '6px 6px 0 0',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            <Grid item xs={6} style={{ borderRight: '1px solid #C5C6D2' }}>
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                Họ Tên
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
              >{`SMS & Call`}</Box>
            </Grid>
          </Grid>

          <Grid container style={{ fontSize: '14px' }}>
            {eventReceivers.map((item) => (
              <>
                <Grid
                  item
                  xs={6}
                  height="40px"
                  style={{
                    borderLeft: '1px solid #C5C6D2',
                    borderRight: '1px solid #C5C6D2',
                    borderBottom: '1px solid #C5C6D2',
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      fontWeight: 500,
                      color: '#8F0A0C',
                    }}
                  >
                    {item.name}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}
                  height="40px"
                  style={{
                    borderRight: '1px solid #C5C6D2',
                    borderBottom: '1px solid #C5C6D2',
                  }}
                >
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {`SMS & Call`}
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
          <Grid
            container
            style={{
              backgroundColor: '#EEF2FA',
              borderLeft: '1px solid #C5C6D2',
              borderRight: '1px solid #C5C6D2',
              borderBottom: '1px solid #C5C6D2',
              height: '48px',
              borderRadius: '0 0 6px 6px',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            <Grid item xs={12}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  color: '#0075FF',
                  cursor: 'pointer',
                }}
              >
                Thêm số điện thoại
              </Box>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box style={{ borderRadius: '6px' }}>
          <Grid
            container
            style={{
              backgroundColor: '#EEF2FA',
              height: '48px',
              border: '1px solid #C5C6D2',
              borderRadius: '6px 6px 0 0',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            <Grid item xs={5}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  borderRight: '1px solid #C5C6D2',
                }}
              >
                Tên Tài khoản
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Số điện thoại
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  borderLeft: '1px solid #C5C6D2',
                }}
              ></Box>
            </Grid>
          </Grid>

          <Grid container style={{ fontSize: '14px' }}>
            <Grid
              item
              xs={5}
              height="48px"
              style={{
                borderLeft: '1px solid #C5C6D2',
                borderRight: '1px solid #C5C6D2',
                borderBottom: '1px solid #C5C6D2',
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  fontWeight: 500,
                  color: '#8F0A0C',
                }}
              >
                Hoàng Ngọc Anh
              </Box>
            </Grid>
            <Grid
              item
              xs={5}
              height="48px"
              style={{
                borderRight: '1px solid #C5C6D2',
                borderBottom: '1px solid #C5C6D2',
              }}
            >
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                0999888999
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              height="48px"
              style={{
                borderRight: '1px solid #C5C6D2',
                borderBottom: '1px solid #C5C6D2',
              }}
            >
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <DeleteOutline style={{ color: '#8B8C9B', cursor: 'pointer' }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
    </Box>
  );
};
