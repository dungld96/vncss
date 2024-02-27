import React from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab, Box, Typography, Grid, Switch } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { EventReceiveType } from '../../../state/modules/location/locationReducer';
import useModalConfirm from '../../../hooks/useModalConfirm';
import {
  useGetControlLocationManagersQuery,
  useUpdateLocationControlMutation,
} from '../../../services/control.service';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { useAuth } from '../../../hooks/useAuth';
import { UpdatePhoneNotiDialog } from './dialogs/UpdatePhoneNotiDialog';
import { UpdateManagerDialog } from './dialogs/UpdateManagerDialog';

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

export const LocationManager = ({
  eventReceivers,
  refetch,
  locationId,
}: {
  eventReceivers: EventReceiveType[];
  locationId: string;
  refetch: () => void;
}) => {
  const {
    auth: { currentUser },
  } = useAuth();
  const [value, setValue] = React.useState(0);
  const [openAddPhoneDialog, setOpenAddPhoneDialog] = React.useState(false);
  const [openAddManagerDialog, setOpenAddManagerDialog] = React.useState(false);
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [updateLocationControl] = useUpdateLocationControlMutation();
  const { data: managers, refetch: refetchManager } = useGetControlLocationManagersQuery({
    agencyId: currentUser?.sub_id ?? '',
    locationId,
  });
  const { setSnackbar } = useSnackbar();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteEventReceiver = (indexSelected: number) => {
    const eventReceiver = eventReceivers[indexSelected];
    const newEventReceivers = eventReceivers.filter((item, index) => index !== indexSelected);

    showModalConfirm({
      type: 'warning',
      title: 'Xoá người nhận thông báo',
      content: `Bạn có chắc chắn muốn xoá người nhận thông báo ${eventReceiver.name} không?`,
      confirm: {
        text: 'Xoá',
        action: async () => {
          if (currentUser && locationId) {
            updateLocationControl({
              agencyId: currentUser.sub_id,
              locationId: locationId,
              data: { event_receivers: [...newEventReceivers] },
            }).then((res) => {
              refetch();
              setSnackbar({ open: true, message: 'Cập nhận dánh sách nhận cảnh báo thành công', severity: 'success' });
            });
          }
          hideModalConfirm();
        },
      },
      cancel: {
        action: hideModalConfirm,
      },
    });
  };

  const handleDeleteManager = (indexSelected: number) => {
    const eventReceiver = eventReceivers[indexSelected];
    const newEventReceivers = eventReceivers.filter((item, index) => index !== indexSelected);

    showModalConfirm({
      type: 'warning',
      title: 'Xoá người nhận thông báo',
      content: `Bạn có chắc chắn muốn xoá người nhận thông báo ${eventReceiver.name} không?`,
      confirm: {
        text: 'Xoá',
        action: async () => {
          if (currentUser && locationId) {
            updateLocationControl({
              agencyId: currentUser.sub_id,
              locationId: locationId,
              data: { event_receivers: [...newEventReceivers] },
            }).then((res) => {
              refetch();
              setSnackbar({ open: true, message: 'Cập nhận dánh sách nhận cảnh báo thành công', severity: 'success' });
            });
          }
          hideModalConfirm();
        },
      },
      cancel: {
        action: hideModalConfirm,
      },
    });
  };

  const handleSaveEnableEventNumber = (eventReceivers: EventReceiveType[]) => {
    if (currentUser && locationId) {
      updateLocationControl({
        agencyId: currentUser.sub_id,
        locationId: locationId,
        data: { event_receivers: [...eventReceivers] },
      }).then((res) => {
        refetch();
        setSnackbar({ open: true, message: 'Cập nhận dánh sách nhận cảnh báo thành công', severity: 'success' });
      });
    }
  };

  return (
    <Box pt={1}>
      {openAddPhoneDialog && (
        <UpdatePhoneNotiDialog
          open={openAddPhoneDialog}
          eventReceivers={eventReceivers}
          onClose={() => setOpenAddPhoneDialog(false)}
          onSuccess={refetch}
          locationId={locationId}
        />
      )}
      {openAddManagerDialog && (
        <UpdateManagerDialog
          open={openAddManagerDialog}
          eventReceivers={eventReceivers}
          onClose={() => setOpenAddManagerDialog(false)}
          onSuccess={refetchManager}
          locationId={locationId}
        />
      )}
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
              paddingRight: eventReceivers.length > 3 ? '15px' : 0,
            }}
          >
            <Grid item xs={5} style={{ borderRight: '1px solid #C5C6D2' }}>
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                Họ Tên
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box>{`SMS`}</Box>
                <Switch
                  size="small"
                  checked={eventReceivers.every((item) => item.enabled_sms)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newEventReceivers = checked
                      ? eventReceivers.map((item) => ({ ...item, enabled_sms: true }))
                      : eventReceivers.map((item) => ({ ...item, enabled_sms: false }));
                    handleSaveEnableEventNumber([...newEventReceivers]);
                  }}
                />
                <Box>{`Call`}</Box>
                <Switch
                  size="small"
                  checked={eventReceivers.every((item) => item.enabled_call)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newEventReceivers = checked
                      ? eventReceivers.map((item) => ({ ...item, enabled_call: true }))
                      : eventReceivers.map((item) => ({ ...item, enabled_call: false }));
                    handleSaveEnableEventNumber([...newEventReceivers]);
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container style={{ fontSize: '14px', maxHeight: '294px', overflow: 'auto' }}>
            {eventReceivers.map((item, index) => (
              <>
                <Grid
                  item
                  xs={5}
                  height="40px"
                  style={{
                    borderLeft: '1px solid #C5C6D2',
                    borderRight: '1px solid #C5C6D2',
                    borderBottom: '1px solid #C5C6D2',
                    backgroundColor: index % 2 === 0 ? 'unset' : '#F8F9FC',
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
                  xs={7}
                  height="40px"
                  style={{
                    borderRight: '1px solid #C5C6D2',
                    borderBottom: '1px solid #C5C6D2',
                    backgroundColor: index % 2 === 0 ? 'unset' : '#F8F9FC',
                  }}
                >
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {`SMS`}
                      <Switch
                        checked={item.enabled_sms}
                        size="small"
                        onChange={() => {
                          const newItem = { ...item, enabled_sms: !item.enabled_sms };
                          const newEventReceivers = [...eventReceivers];
                          newEventReceivers[index] = newItem;
                          handleSaveEnableEventNumber([...newEventReceivers]);
                        }}
                      />
                    </Box>

                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {`Call`}
                      <Switch
                        checked={item.enabled_call}
                        size="small"
                        onChange={() => {
                          const newItem = { ...item, enabled_call: !item.enabled_call };
                          const newEventReceivers = [...eventReceivers];
                          newEventReceivers[index] = newItem;
                          handleSaveEnableEventNumber([...newEventReceivers]);
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={5}
                  height="40px"
                  style={{
                    borderLeft: '1px solid #C5C6D2',
                    borderRight: '1px solid #C5C6D2',
                    borderBottom: '1px solid #C5C6D2',
                    backgroundColor: index % 2 === 0 ? 'unset' : '#F8F9FC',
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    {item.position || 'Người dùng'}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={7}
                  height="40px"
                  style={{
                    borderRight: '1px solid #C5C6D2',
                    borderBottom: '1px solid #C5C6D2',
                    backgroundColor: index % 2 === 0 ? 'unset' : '#F8F9FC',
                  }}
                >
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography style={{ marginRight: '16px' }}>{item.phone}</Typography>
                    <DeleteOutline
                      onClick={() => handleDeleteEventReceiver(index)}
                      style={{ color: '#8B8C9B', cursor: 'pointer' }}
                    />
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
                onClick={() => setOpenAddPhoneDialog(true)}
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
            {managers?.map((item: any) => (
              <>
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
                    {item.username}
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
                    {item.phone}
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
                  <Box
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                    // onClick={() => handleDeleteEventReceiver(index)}
                  >
                    <DeleteOutline style={{ color: '#8B8C9B', cursor: 'pointer' }} />
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
                onClick={() => setOpenAddManagerDialog(true)}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  color: '#0075FF',
                  cursor: 'pointer',
                }}
              >
                Thêm quản lý
              </Box>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
    </Box>
  );
};
