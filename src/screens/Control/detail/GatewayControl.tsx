import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Grid, IconButton, Tooltip } from '@mui/material';
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
} from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { AddNodeDialog } from './dialogs/AddNodeDialog';
import { NodeCard } from '../../../common/card/NodeCard';

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
  const [getControlLocationGatewayNodes, { data }] = useLazyGetControlLocationGatewayNodesQuery();
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

  const nodes = (data || []) as ControlLocationNodeType[];

  return (
    <Box px={1}>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={8} style={{ borderRight: '2px solid #EEF2FA', paddingRight: '16px', minHeight: '60%' }}>
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
                          <NodeCard data={item} nodeTypes={[]} onClickCard={() => {}} />
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
                    <Typography style={{ color: '#8B8C9B' }}>98%</Typography>
                    <img src={PinIcon} alt="" style={{ width: '24px', height: '24px', marginLeft: '4px' }} />
                  </Box>
                  <Box ml={1} display="flex" alignItems="flex-end">
                    <img src={WaveIcon} alt="" style={{ width: '24px', height: '24px' }} />
                  </Box>

                  <Box ml={1} display="flex" alignItems="flex-end">
                    <Tooltip title="Cài đặt gateway">
                      <IconButton aria-label="refresh">
                        <img src={SettingIcon} alt="" style={{ width: '20px', height: '20px' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Loại:</InfoTitle>
                  <InfoValue>{gateway.gateway_type_id || '--'}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Serial::</InfoTitle>
                  <InfoValue>{gateway.serial || '--'}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Phiên bản:</InfoTitle>
                  <InfoValue>{gateway.hardware_version}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Số sim:</InfoTitle>
                  <InfoValue>{gateway.sim || '--'}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Ngày kích hoạt:</InfoTitle>
                  <InfoValue>05/12/2022 07:57</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Số ngày còn lại:</InfoTitle>
                  <InfoValue>238 Ngày</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Trạng thái:</InfoTitle>
                  <InfoValue>Đang hoạt động</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Cập nhật lần cuối:</InfoTitle>
                  <InfoValue>25/02/2023 15:01</InfoValue>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} style={{ borderTop: '2px solid #EEF2FA' }}>
            <Box py={2} mb={2}>
              <Typography style={{ fontSize: '18px', fontWeight: 700 }}>Nhật ký hoạt động</Typography>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="180px">
              <Box>
                <img src={DataEmpty} alt="" style={{ width: '120px' }} />
                <Typography style={{ margin: '20px', color: '#C5C6D2' }}>Danh sách trống</Typography>
              </Box>
            </Box>
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
    </Box>
  );
};
