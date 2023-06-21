import { Box } from '@mui/material';
import { VehicleWrapper } from 'screens/vehicle-wrapper/VehicleWrapper';

const VehicleProtect = () => {
  return (
    <Box mt={2} ml={2} mr={'12px'}>
      <VehicleWrapper type="protect" />
    </Box>
  );
};

export default VehicleProtect;
