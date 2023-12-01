import React, { useState, useEffect, useMemo } from 'react';
import { Button, Typography, Box, Grid, IconButton, Tooltip, Popover, Switch } from '@mui/material';
import styled from '@emotion/styled';
import { AddCircleOutline } from '@mui/icons-material';
import SettingIcon from '../../../assets/icons/setting-grey-icon.svg';
import WaveIcon0 from '../../../assets/icons/wave-icon-0.svg';
import WaveIcon1 from '../../../assets/icons/wave-icon-1.svg';
import WaveIcon2 from '../../../assets/icons/wave-icon-2.svg';
import WaveIcon3 from '../../../assets/icons/wave-icon-3.svg';
import WaveIcon4 from '../../../assets/icons/wave-icon-4.svg';
import PinIcon from '../../../assets/icons/pin-icon.svg';
import DataEmpty from '../../../assets/img/data_empty.svg';
import TakeCamera from '../../../assets/icons/take-camera.svg';
import OnButton from '../../../assets/icons/on-button.svg';
import OffButton from '../../../assets/icons/off-button.svg';
import { LocationType } from '../../../state/modules/location/locationReducer';
import {
  useLazyGetControlLocationGatewayNodesQuery,
  ControlLocationGatewayType,
  ControlLocationNodeType,
  useLazyGetControlLocationLogsQuery,
  ControlLocationLogType,
  useHandleAlertControlMutation,
  useGetControlLocationEventImageQuery,
  useUpdateLocationControlMutation,
} from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { AddNodeDialog } from './dialogs/AddNodeDialog';
import { NodeCard } from '../../../common/card/NodeCard';
import { UpdateGatewayInfoDialog } from './dialogs/UpdateGatewayInfoDialog';
import { NodeInfoDialog } from './dialogs/NodeInfoDialog';
import dayjs from 'dayjs';
import { INodeType, useGetNodeTypesQuery } from '../../../services/node.service';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { LocationImages } from './LocationImages';

const InfoTitle = styled(Typography)({ fontSize: '14px', color: '#8B8C9B' });
const InfoValue = styled(Typography)({ fontSize: '14px', color: '#1E2323' });

const waveList = [WaveIcon0, WaveIcon1, WaveIcon2, WaveIcon3, WaveIcon4];

export const GatewayControl = ({
  location,
  gateway,
  gatewayTypeCode,
  gatewayTypeName,
  refetchGateway,
}: {
  location: LocationType;
  gateway: ControlLocationGatewayType;
  gatewayTypeCode: string;
  gatewayTypeName: string;
  refetchGateway: () => void;
}) => {
  return (
    <Box px={1}>
      <Box>
        <Grid container spacing={1}>
          {gatewayTypeCode !== 'GW-CTL4G' && (
            <Grid item xs={8} style={{ borderRight: '2px solid #EEF2FA', paddingRight: '16px' }}>
              {gatewayTypeCode === 'GW-ATM4G' ? (
                <ATMNode gateway={gateway} locationId={location.id} />
              ) : (
                <GatewayNodes location={location} gateway={gateway} refetchGateway={refetchGateway} />
              )}
            </Grid>
          )}

          <Grid item xs={gatewayTypeCode === 'GW-CTL4G' ? 12 : 4}>
            <GatewayInfo
              location={location}
              gateway={gateway}
              gatewayTypeName={gatewayTypeName}
              gatewayTypeCode={gatewayTypeCode}
              refetchGateway={refetchGateway}
            />
          </Grid>

          <Grid item xs={12} style={{ borderTop: '2px solid #EEF2FA' }}>
            <LocationLogs location={location} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const GatewayInfo = ({
  gateway,
  gatewayTypeName,
  gatewayTypeCode,
  location,
  refetchGateway,
}: {
  gateway: ControlLocationGatewayType;
  gatewayTypeName: string;
  gatewayTypeCode: string;
  location: LocationType;
  refetchGateway: () => void;
}) => {
  const [gwSettingAnchorEl, setGwSettingAnchorEl] = useState<any>();
  const [openUpdateGatewayDialog, setOpenUpdateGatewayDialog] = useState(false);

  const [updateLocationControl] = useUpdateLocationControlMutation();
  const { setSnackbar } = useSnackbar();
  const {
    auth: { currentUser },
  } = useAuth();
  const diffDay = dayjs(gateway.subscription_end_at).diff(dayjs(gateway.active_at), 'day');
  const onClickGwSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGwSettingAnchorEl(event.currentTarget);
  };

  const handleClickOnOff = () => {
    if (currentUser && location.id) {
      updateLocationControl({
        agencyId: currentUser.sub_id,
        locationId: location.id,
        data: { active_alert: !location.active_alert },
      }).then((res) => {
        setSnackbar({ open: true, message: 'Cập nhận cảnh báo thành công', severity: 'success' });
        refetchGateway();
      });
    }
  };

  return (
    <Box p={1}>
      <Box
        pb={1}
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ borderBottom: '1px solid #EEF2FA' }}
      >
        <Typography style={{ fontSize: '18px', fontWeight: 700 }}>Thông tin Gateway</Typography>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="flex-end">
            <Typography style={{ color: '#8B8C9B' }}>{gateway.state?.battery || 0}%</Typography>
            <img src={PinIcon} alt="" style={{ width: '24px', height: '24px', marginLeft: '4px' }} />
          </Box>
          <Box ml={1} display="flex" alignItems="flex-end">
            <img src={waveList[gateway.state?.gsmLevel || 0]} alt="" style={{ width: '24px', height: '24px' }} />
          </Box>

          <Box ml={1} display="flex" alignItems="flex-end">
            <Tooltip title="Cài đặt gateway">
              <IconButton aria-label="refresh" onClick={onClickGwSetting}>
                <img src={SettingIcon} alt="" style={{ width: '20px', height: '20px' }} />
              </IconButton>
            </Tooltip>
            <Popover
              open={!!gwSettingAnchorEl}
              anchorEl={gwSettingAnchorEl}
              onClose={() => setGwSettingAnchorEl(undefined)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box py={2}>
                <Typography style={{ fontSize: '16px', fontWeight: 'bold', padding: ' 0 16px 16px' }}>
                  Cài đặt Gateway
                </Typography>
                <Box
                  p={2}
                  style={{ fontSize: '14px', cursor: 'pointer', backgroundColor: '#F8F9FC', fontWeight: 500 }}
                  onClick={() => {
                    setOpenUpdateGatewayDialog(true);
                    setGwSettingAnchorEl(undefined);
                  }}
                >
                  Chỉnh sửa thông tin Gateway
                </Box>
              </Box>
            </Popover>
          </Box>
        </Box>
      </Box>
      {gatewayTypeCode !== 'GW-CTL4G' && (
        <Box mt={1} py={1} style={{ borderBottom: '1px solid #EEF2FA' }}>
          <Box p={1} display="flex" justifyContent="space-around" alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{
                color: location.active_alert ? '#08C727' : '#8B8C9B',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onClick={handleClickOnOff}
            >
              <img src={location.active_alert ? OnButton : OffButton} alt="" />
              <Typography style={{ marginTop: '16px', fontWeight: 500 }}>
                Cảnh báo {location.active_alert ? 'ON' : 'OFF'}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Box pt={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Loại:</InfoTitle>
          <InfoValue>{gatewayTypeName || '--'}</InfoValue>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Serial:</InfoTitle>
          <InfoValue>{gateway.serial || '--'}</InfoValue>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Phiên bản:</InfoTitle>
          <InfoValue>{gateway.version || '--'}</InfoValue>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Số sim:</InfoTitle>
          <InfoValue>{gateway.sim || '--'}</InfoValue>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Ngày kích hoạt:</InfoTitle>
          <InfoValue>{dayjs(gateway.active_at).format('DD/MM/YYYY HH:mm')}</InfoValue>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Số ngày còn lại:</InfoTitle>
          <InfoValue>{diffDay} Ngày</InfoValue>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Trạng thái:</InfoTitle>
          <InfoValue>{gateway.status === 'activated' ? 'Đang hoạt động' : 'Lưu kho'}</InfoValue>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <InfoTitle>Cập nhật lần cuối:</InfoTitle>
          <InfoValue>
            {gateway.state ? dayjs(gateway.state.timestamp * 1000).format('DD/MM/YYYY HH:mm') : '--'}
          </InfoValue>
        </Box>
      </Box>
      {gatewayTypeCode === 'GW-ATM4G' && (
        <Box mt={1} py={2} style={{ borderTop: '1px solid #EEF2FA' }}>
          <Typography style={{ fontWeight: 600, fontSize: 18 }}>Thiết bị chống cướp</Typography>
          <Box mt={2} p={2} display="flex" justifyContent="space-around" alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{ color: '#8B8C9B', fontSize: '12px', fontWeight: 500 }}
            >
              <img src={TakeCamera} alt="" />
              <Typography style={{ marginTop: '16px' }}>Chụp ảnh nhanh</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{ color: '#08C727', fontSize: '12px', fontWeight: 500 }}
            >
              <img src={OnButton} alt="" />
              <Typography style={{ marginTop: '16px' }}>Máy phun khói</Typography>
            </Box>
          </Box>
        </Box>
      )}

      {location && gateway && openUpdateGatewayDialog && (
        <UpdateGatewayInfoDialog
          gateway={gateway}
          locationId={location.id}
          open={openUpdateGatewayDialog}
          onClose={() => setOpenUpdateGatewayDialog(false)}
          onSuccess={refetchGateway}
        />
      )}
    </Box>
  );
};

const LocationLogs = ({ location }: { location: LocationType }) => {
  const [getControlLocationLogs, { data: logsData }] = useLazyGetControlLocationLogsQuery();
  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser && location) {
      getControlLocationLogs({
        agencyId: currentUser.sub_id,
        locationId: location.id,
      }).unwrap();
    }
  }, [currentUser, location]);

  const logs = (logsData || []) as ControlLocationLogType[];

  return (
    <>
      <Box py={2} mb={2}>
        <Typography style={{ fontSize: '18px', fontWeight: 700 }}>Nhật ký hoạt động</Typography>
      </Box>
      {logs.length > 0 ? (
        <Box>
          <Grid
            container
            style={{
              borderTop: '1px solid #F6F9FC',
              borderBottom: '1px solid #F6F9FC',
              height: '48px',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            <Grid item xs={2}>
              <Box
                style={{
                  color: '#8B8C9B',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Thời gian
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                style={{
                  color: '#8B8C9B',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Loại nhật ký
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box
                style={{
                  color: '#8B8C9B',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Chi tiết nhật ký
              </Box>
            </Grid>
          </Grid>

          <Grid container style={{ fontSize: '14px', maxHeight: '294px', overflow: 'auto' }}>
            {logs.map((item, index) => (
              <>
                <Grid
                  item
                  xs={2}
                  height="40px"
                  style={{
                    borderBottom: '1px solid #F8F9FC',
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
                    {dayjs(item.timestamp * 1000).format('HH:mm:ss DD-MM-YYYY')}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={3}
                  height="40px"
                  style={{
                    borderBottom: '1px solid #F8F9FC',
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
                    {item.kind === 'event' ? 'Cảnh Báo' : 'Thông báo'}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={7}
                  height="40px"
                  style={{
                    borderBottom: '1px solid #F8F9FC',
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    {item.message}
                  </Box>
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="180px">
          <Box>
            <img src={DataEmpty} alt="" style={{ width: '120px' }} />
            <Typography style={{ margin: '20px', color: '#C5C6D2' }}>Danh sách trống</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

const GatewayNodes = ({
  location,
  gateway,
  refetchGateway,
}: {
  location: LocationType;
  gateway: ControlLocationGatewayType;
  refetchGateway: () => void;
}) => {
  const [openAddNodeDialog, setOpenAddNodeDialog] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ControlLocationNodeType>();
  const [getControlLocationGatewayNodes, { data }] = useLazyGetControlLocationGatewayNodesQuery();
  const { data: nodeTypes } = useGetNodeTypesQuery<{ data: INodeType[] }>(null);
  const [handleAlert] = useHandleAlertControlMutation();
  const { setSnackbar } = useSnackbar();

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser && location && gateway) {
      getControlLocationGatewayNodesFetch();
    }
  }, [currentUser, location, gateway]);

  const getControlLocationGatewayNodesFetch = async () => {
    if (currentUser && location && gateway) {
      await getControlLocationGatewayNodes(
        {
          agencyId: currentUser.sub_id,
          locationId: location.id,
          gatewayId: gateway.id,
        },
        false
      ).unwrap();
    }
  };

  const handleProcessed = () => {
    if (currentUser && location) {
      handleAlert({ agencyId: currentUser.sub_id, locationId: location.id })
        .then((res) => {
          refetchGateway();
          setSnackbar({ open: true, message: 'Xử lý cảnh báo thành công', severity: 'success' });
        })
        .catch(() => setSnackbar({ open: true, message: 'Có lỗi khi xử lý cảnh báo', severity: 'error' }));
    }
  };

  const nodes = (data || []) as ControlLocationNodeType[];
  return (
    <>
      {nodes.length > 0 ? (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box flex={1}>
              <Typography style={{ fontSize: '18px', fontWeight: 700 }}>Danh sách Node</Typography>
            </Box>
            <Box mt={1} mr={2}>
              <Button
                variant="contained"
                style={{ padding: '4px 16px', borderRadius: '8px', height: '36px' }}
                onClick={handleProcessed}
                disabled={location.state !== 'alert'}
              >
                Đã xử lý
              </Button>
            </Box>
            <Box mt={1}>
              <Button
                variant="outlined"
                style={{ padding: '4px 12px', borderRadius: '8px', height: '36px' }}
                startIcon={<AddCircleOutline />}
                onClick={() => setOpenAddNodeDialog(true)}
              >
                Thêm Node
              </Button>
            </Box>
          </Box>
          <Box mt={3} mb={2} maxHeight={'440px'} style={{ overflow: 'auto' }}>
            <Grid container spacing={2}>
              {nodes.map((item) => {
                return (
                  <Grid key={item.id} item md={4} lg={3}>
                    <NodeCard
                      data={item}
                      nodeTypes={nodeTypes || []}
                      onClickCard={() => {
                        setSelectedNode(item);
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="500px">
          <Box>
            <img src={DataEmpty} alt="" style={{ width: '200px' }} />
            <Typography style={{ margin: '24px', color: '#C5C6D2' }}>Danh sách Node trống</Typography>
            <Button
              variant="outlined"
              style={{ width: '240px', height: '36px', borderRadius: '8px' }}
              startIcon={<AddCircleOutline />}
              onClick={() => setOpenAddNodeDialog(true)}
            >
              Thêm Node
            </Button>
          </Box>
        </Box>
      )}
      {location && gateway && openAddNodeDialog && (
        <AddNodeDialog
          locationId={location.id}
          gatewayId={gateway.id}
          open={openAddNodeDialog}
          onClose={() => setOpenAddNodeDialog(false)}
          onSuccess={getControlLocationGatewayNodesFetch}
        />
      )}
      {location && gateway && selectedNode && (
        <NodeInfoDialog
          gatewayId={gateway.id}
          locationId={location.id}
          node={selectedNode}
          open={!!selectedNode}
          onClose={() => setSelectedNode(undefined)}
          onSuccess={getControlLocationGatewayNodesFetch}
        />
      )}
    </>
  );
};

const ATMNode = ({ locationId, gateway }: { locationId: string; gateway: ControlLocationGatewayType }) => {
  const {
    auth: { currentUser },
  } = useAuth();

  const { data: imagesData } = useGetControlLocationEventImageQuery({
    locationId,
    agencyId: currentUser?.sub_id || '',
  });
  const { data: nodeTypes } = useGetNodeTypesQuery<{ data: INodeType[] }>(null);
  const nodesCode = [
    { code: 'NB-SMOKE', name: 'Cảm biến khói' },
    { code: 'NB-DOOR', name: 'Cảm biến cửa' },
    { code: 'NB-VIBRATE', name: 'Cảm biến rung' },
    { code: 'SNH-ARB', name: 'Phát hiện mất điện' },
  ];
  const nodes = useMemo(() => {
    if (!nodeTypes) return [];

    return nodesCode.map((item) => {
      const nodeType = nodeTypes.find((nt) => nt.code === item.code);
      return {
        id: '',
        agency_id: '',
        node_type_id: nodeType?.id || '',
        name: item.name,
        serial: '',
        version: '',
        mfg: '',
        alert: 0,
        state: null,
        status: 'activated',
        created_at: '',
        updated_at: '',
      };
    });
  }, [nodeTypes]);

  const imageUrls = imagesData || [];

  const sensors = gateway.state?.sensors;

  const tempSensor = sensors?.find((item) => item.type === 'SR-A100');

  const temps = tempSensor?.temp;

  return (
    <Box>
      <Box maxHeight={'340px'}>
        <LocationImages showFullscreenButton={false} imageUrls={imageUrls} originalHeight={300} />
      </Box>
      <Box mt={10} mb={2}>
        <Grid container spacing={2}>
          {nodes.map((item) => {
            return (
              <Grid key={item.id} item md={4} lg={3}>
                <NodeCard showPin={false} data={item} nodeTypes={nodeTypes || []} onClickCard={() => {}} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box my={2}>
        <Typography style={{ fontWeight: 600, fontSize: 18 }}>Nhiệt độ hiện tại</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
              <Box style={{ color: '#8B8C9B' }}>Cảm biến 1</Box>
              <Box style={{ color: '#E13153', fontWeight: 500 }}>{temps?.[0] || '--'}&#8451;</Box>
            </Box>
            <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
              <Box style={{ color: '#8B8C9B' }}>Cảm biến 2</Box>
              <Box style={{ color: '#E13153', fontWeight: 500 }}>{temps?.[1] || '--'}&#8451;</Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
              <Box style={{ color: '#8B8C9B' }}>Cảm biến 3</Box>
              <Box style={{ color: '#E13153', fontWeight: 500 }}>{temps?.[2] || '--'}&#8451;</Box>
            </Box>
            <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
              <Box style={{ color: '#8B8C9B' }}>Cảnh báo nhiệt độ</Box>
              <Box display="flex">
                <Typography style={{ color: '#E13153', fontWeight: 500, marginRight: '16px' }}>60&#8451;</Typography>
                <Switch checked size="small" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
