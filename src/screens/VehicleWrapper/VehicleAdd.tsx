import { Box, DialogActions, Divider, Step, StepLabel, Stepper } from '@mui/material';
import { Input } from 'common';
import Button from 'common/button/Button';
import Modal from 'common/modal/Modal';
import SelectPosition from 'common/SelectPosition/SelectPosition';
import React, { useState } from 'react';
import VehicleInfo from './VehicleInfo';

const steps = ['Thông tin kích hoạt', 'Chọn vị trí trên bản đồ', 'Thông tin chi tiết'];

const VehicleAdd = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleNext = (step: number) => {
    setActiveStep(step + 1);
  };

  const handleSelectedPosition = (position: any) => {
    setSelectedPosition(position);
  };

  console.log(selectedPosition);

  const RenderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box width={'440px'}>
              <Input fullWidth topLable="Serial" placeholder="Nhập serial" />
              <Input fullWidth topLable="Tên phương tiện tuần tra" placeholder="Nhập tên phương tiện" />
              <Button
                fullWidth
                variant="contained"
                style={{ marginTop: '40px' }}
                onClick={() => handleNext(activeStep)}
              >
                Tiếp theo
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return <SelectPosition selectedPosition={selectedPosition} handleSelectedPosition={handleSelectedPosition} />;
      case 2:
        return <VehicleInfo />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Modal
      style={{ height: '756px', minHeight: '756px', maxWidth: '1136px', display: 'flex', flexDirection: 'column' }}
      size="xl"
      show={true}
      title="Thêm mới phương tiện tuần tra"
    >
      <Box sx={{ marginTop: '16px', marginBottom: '16px' }}>
        <Stepper
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& .MuiStepConnector-root': {
              '& .MuiStepConnector-line': {
                width: '91px',
                margin: '0 auto',
                borderTopWidth: '2px',
              },
              '&.Mui-active, &.Mui-completed': {
                '& .MuiStepConnector-line': {
                  borderColor: '#8F0A0C',
                },
              },
            },
            '& .MuiSvgIcon-root': {
              fontSize: '31px !important',
              paddingRight: '4px !important',
            },
          }}
          activeStep={activeStep}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    fontSize: '18px !important',
                    fontWeight: '700 !important',
                    color: '#8B8C9B',
                    '&.Mui-active, &.Mui-completed': {
                      color: '#8F0A0C',
                    },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Divider />
      <Box
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        {RenderStep(activeStep)}
      </Box>
      {activeStep !== 0 && (
        <DialogActions sx={{ padding: 0 }}>
          <Button style={{ width: 131 }} variant="contained" onClick={() => setActiveStep(activeStep - 1)}>
            back
          </Button>
          <Button style={{ width: 131 }} variant="contained" onClick={() => handleNext(activeStep)}>
            Tiếp theo
          </Button>
        </DialogActions>
      )}
    </Modal>
  );
};

export default VehicleAdd;
