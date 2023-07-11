import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import DataEmpty from '../../../assets/img/data_empty.svg';

import { LocationType } from '../../../state/modules/location/locationReducer';
import {
  useLazyGetControlLocationGatewayNodesQuery,
  ControlLocationGatewayType,
  ControlLocationNodeType,
} from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { AddNodeDialog } from './AddNodeDialog';
import { NodeCard } from '../../../common/card/NodeCard';

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
      {nodes.length > 0 ? (
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={8} style={{ borderRight: '2px solid #EEF2FA', paddingRight: '16px' }}>
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
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Box>
                  <Typography style={{ fontSize: '18px', fontWeight: 700 }}>Thông tin Gateway</Typography>
                </Box>
                <Box>
                  {/* <Button
                    variant="outlined"
                    style={{ padding: '4px 12px', borderRadius: '8px', height: '36px' }}
                    startIcon={<AddCircleOutline />}
                    onClick={() => setOpenAddNodeDialog(true)}
                  >
                    Thêm Node
                  </Button> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
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
      {location && gateway && (
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
