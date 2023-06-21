import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import DataEmpty from '../../../assets/img/data_empty.svg';
import { AddGatewayDialog } from './AddGatewayDialog';
import { LocationType } from '../../../state/modules/location/locationReducer';

export const GatewayControl = ({ location }: { location?: LocationType }) => {
  const [openAddGatewayDialog, setOpenAddGatewayDialog] = useState(false);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="500px">
        <Box>
          <img src={DataEmpty} alt="" style={{ width: '200px' }} />
          <Typography style={{ margin: '24px', color: '#C5C6D2' }}>Danh sách Gateway trống</Typography>
          <Button
            variant="outlined"
            style={{ width: '240px', borderRadius: '8px' }}
            startIcon={<AddCircleOutline />}
            onClick={() => setOpenAddGatewayDialog(true)}
          >
            Thêm Gateway
          </Button>
        </Box>
      </Box>
      <AddGatewayDialog
        location={location}
        show={openAddGatewayDialog}
        onClose={() => setOpenAddGatewayDialog(false)}
      />
    </Box>
  );
};
