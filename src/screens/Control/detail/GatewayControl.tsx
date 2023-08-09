import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Grid, IconButton, Tooltip, Popover } from '@mui/material';
import styled from '@emotion/styled';
import { AddCircleOutline } from '@mui/icons-material';
import SettingIcon from '../../../assets/icons/setting-grey-icon.svg';
import WaveIcon from '../../../assets/icons/wave-icon.svg';
import PinIcon from '../../../assets/icons/pin-icon.svg';
import DataEmpty from '../../../assets/img/data_empty.svg';
import { LocationType } from '../../../state/modules/location/locationReducer';
import {
  useLazyGetControlLocationGatewayNodesQuery,
  ControlLocationGatewayType,
  ControlLocationNodeType,
  useLazyGetControlLocationLogsQuery,
  ControlLocationLogType,
} from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { AddNodeDialog } from './dialogs/AddNodeDialog';
import { NodeCard } from '../../../common/card/NodeCard';
import { UpdateGatewayInfoDialog } from './dialogs/UpdateGatewayInfoDialog';
import { NodeInfoDialog } from './dialogs/NodeInfoDialog';
import dayjs from 'dayjs';
import { useGetGatewayTypesQuery, IGatewayType } from '../../../services/gateway.service';
import { INodeType, useGetNodeTypesQuery } from '../../../services/node.service';

const InfoTitle = styled(Typography)({ fontSize: '14px', color: '#8B8C9B' });
const InfoValue = styled(Typography)({ fontSize: '14px', color: '#1E2323' });

export const GatewayControl = ({
  location,
  gateway,
  refetchGateway,
}: {
  location: LocationType;
  gateway: ControlLocationGatewayType;
  refetchGateway: () => void;
}) => {
  const [openAddNodeDialog, setOpenAddNodeDialog] = useState(false);
  const [openUpdateGatewayDialog, setOpenUpdateGatewayDialog] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ControlLocationNodeType>();
  const [gwSettingAnchorEl, setGwSettingAnchorEl] = useState<any>();
  const [getControlLocationGatewayNodes, { data }] = useLazyGetControlLocationGatewayNodesQuery();
  const [getControlLocationLogs, { data: logsData }] = useLazyGetControlLocationLogsQuery();
  const { data: gatewayTypes } = useGetGatewayTypesQuery<{ data: IGatewayType[] }>(null);
  const { data: nodeTypes } = useGetNodeTypesQuery<{ data: INodeType[] }>(null);

  const {
    auth: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser && location && gateway) {
      getControlLocationGatewayNodesFetch();
    }
  }, [currentUser, location, gateway]);

  useEffect(() => {
    if (currentUser && location) {
      getControlLocationLogs({
        agencyId: currentUser.sub_id,
        locationId: location.id,
      }).unwrap();
    }
  }, [currentUser, location]);

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
  const onClickGwSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGwSettingAnchorEl(event.currentTarget);
  };

  const nodes = (data || []) as ControlLocationNodeType[];
  const logs = (logsData || []) as ControlLocationLogType[];
  const gatewayType = (gatewayTypes || []).find((item) => item.id === gateway.gateway_type_id)?.name;
  const diffDay = dayjs(gateway.subscription_end_at).diff(dayjs(gateway.active_at), 'day');

  return (
    <Box px={1}>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={8} style={{ borderRight: '2px solid #EEF2FA', paddingRight: '16px' }}>
            {nodes.length > 0 ? (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography style={{ fontSize: '18px', fontWeight: 700 }}>Danh sách Node</Typography>
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
                <Box mt={3}>
                  <Grid container spacing={2}>
                    {nodes.map((item) => {
                      // const typeId = _.get(item, 'product_type_id', 1);
                      // const ComponentType = getComponentType(typeId);
                      // const Card = NodeCard[ComponentType] ? NodeCard[ComponentType] : NodeCard.DefaultCard;
                      return (
                        <Grid key={item.id} item xs={4} lg={3}>
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
          </Grid>
          <Grid item xs={4}>
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
                    <img src={WaveIcon} alt="" style={{ width: '24px', height: '24px' }} />
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
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Loại:</InfoTitle>
                  <InfoValue>{gatewayType || '--'}</InfoValue>
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
            </Box>
          </Grid>

          <Grid item xs={12} style={{ borderTop: '2px solid #EEF2FA' }}>
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
                            justifyContent: 'center',
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
          </Grid>
        </Grid>
      </Box>

      {location && gateway && openAddNodeDialog && (
        <AddNodeDialog
          locationId={location.id}
          gatewayId={gateway.id}
          open={openAddNodeDialog}
          onClose={() => setOpenAddNodeDialog(false)}
          onSuccess={getControlLocationGatewayNodesFetch}
        />
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
    </Box>
  );
};
