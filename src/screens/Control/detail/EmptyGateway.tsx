import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import DataEmpty from '../../../assets/img/data_empty.svg';
import { LocationType } from '../../../state/modules/location/locationReducer';
import { AddGatewayDialog } from './AddGatewayDialog';

export const EmptyGateway = ({ location, refetch }: { location: LocationType; refetch: () => void }) => {
  const [openAddGatewayDialog, setOpenAddGatewayDialog] = useState(false);

  return (
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
      <AddGatewayDialog
        location={location}
        show={openAddGatewayDialog}
        onClose={() => setOpenAddGatewayDialog(false)}
        onSuccess={refetch}
      />
    </Box>
  );
};
