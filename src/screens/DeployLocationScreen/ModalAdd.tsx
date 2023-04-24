import { Box, DialogActions, Divider, Step, StepLabel, Stepper } from '@mui/material';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import SelectPosition from '../../common/SelectPosition/SelectPosition';
import React, { useState } from 'react';
import LocationInfo from './LocationInfo';
import ConfirmInfo from './ConfirmInfo';

const steps = ['Chọn vị trí triển khai trên bản đồ', 'Thông tin vị trí triển khai', 'Xác nhận thông tin'];

interface Props {
  show: boolean;
  onClose: () => void;
}

const ModalAdd: React.FC<Props> = ({ show, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleNext = (step: number) => {
    setActiveStep(step + 1);
  };

  const handleSelectedPosition = (position: any) => {
    setSelectedPosition(position);
  };

  const RenderStep = (step: number) => {
    switch (step) {
      case 0:
        return <SelectPosition selectedPosition={selectedPosition} handleSelectedPosition={handleSelectedPosition} />;
      case 1:
        return <LocationInfo maxHeight="calc(100vh - 364px)" />;
      case 2:
        return <ConfirmInfo maxHeight="calc(100vh - 364px)" />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Modal
      style={{
        height: 'calc(100vh - 150px)',
        maxHeight: '756px',
        maxWidth: '1136px',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'visible',
      }}
      size="xl"
      show={show}
      close={onClose}
      title="Thêm mới vị trí triển khai"
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
      <DialogActions sx={{ padding: 0 }}>
        {activeStep !== 0 && (
          <Button style={{ width: 131 }} variant="outlined" onClick={() => setActiveStep(activeStep - 1)}>
            Trước đó
          </Button>
        )}
        <Button style={{ width: 131 }} variant="contained" onClick={() => handleNext(activeStep)}>
          Tiếp theo
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ModalAdd;
