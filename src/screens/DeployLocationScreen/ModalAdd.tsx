import { Box, DialogActions, Divider, Step, StepLabel, Stepper } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import SelectPosition from '../../common/SelectPosition/SelectPosition';
import { useAuth } from '../../hooks/useAuth';
import useModalConfirm from '../../hooks/useModalConfirm';
import { useCreateLocationMutation } from '../../services/location.service';
import ConfirmInfo from './ConfirmInfo';
import { defaultInitialValues } from './constant';
import LocationInfo from './LocationInfo';

const steps = ['Chọn vị trí triển khai trên bản đồ', 'Thông tin vị trí triển khai', 'Xác nhận thông tin'];

interface Props {
  show: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên vị trí triển khai không được để trống'),
  contact_name: Yup.string().required('Người liên hệ không được để trống'),
  contact_number: Yup.string().required('Số điện thoại người liên hệ không được để trống'),
  contract_date: Yup.string().required(),
  address: Yup.string().required('Địa chỉ không được để trống'),
  commune: Yup.string().required(),
  district: Yup.string().required(),
  province: Yup.string().required(),
});

const ModalAdd: React.FC<Props> = ({ show, onClose }) => {
  const [addLocation] = useCreateLocationMutation();
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [activeStep, setActiveStep] = useState(0);

  const [selectedPosition, setSelectedPosition] = useState<any>(null);

  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues: defaultInitialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (activeStep === 2) {
        const position = selectedPosition
          ? {
              lat: Number(selectedPosition?.lat),
              lng: Number(selectedPosition?.lng),
            }
          : {};
        const body = {
          ...values,
          ...position,
          tags: values.tags.map((i) => i.tagName),
          contract_date: values.contract_date.replaceAll('/', '-'),
        };
        delete body.dataCity;
        delete body.dataDistrict;
        delete body.usersReceive;
        delete body.business_id;

        await addLocation({ location: body, parent_uuid: currentUser?.sub_id }).unwrap();
        onClose()
      }
    },
  });

  const { submitForm, values, errors, resetForm, dirty, setFieldValue,isSubmitting } = formik;

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
        return <LocationInfo formik={formik} />;
      case 2:
        return <ConfirmInfo values={{ ...values, ...selectedPosition }} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />;
      default:
        return 'Unknown step';
    }
  };

  const handelClickNext = (step: number) => {
    switch (step) {
      case 0:
        if (!selectedPosition) {
          showModalConfirm({
            title: 'Thông báo',
            content: 'Bạn phải chọn vị trí trên bản đồ',
            confirm: {
              text: 'Đã hiểu',
              action: hideModalConfirm,
            },
          });
          return;
        }
        handleNext(activeStep);
        break;
      case 1:
        submitForm();
        if (dirty && isEmpty(errors) && values.tags.length > 0) {
          setTimeout(() => {
            handleNext(activeStep);
          }, 200);
        }
        break;
      case 2:
        submitForm();
        break;
    }
  };

  useEffect(() => {
    if (!show) return;
    resetForm();
    setActiveStep(0);
    setSelectedPosition(null);
  }, [show]);

  return (
    <Modal
      style={{
        height: 'calc(100vh - 150px)',
        maxHeight: '756px',
        maxWidth: '1136px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
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

      <FormikProvider value={formik}>
        <Form style={{ width: '100%', height: '100%' }}>{RenderStep(activeStep)}</Form>
      </FormikProvider>
      <DialogActions sx={{ padding: 0 }}>
        {activeStep !== 0 && (
          <Button style={{ width: 131 }} variant="outlined" onClick={() => setActiveStep(activeStep - 1)}>
            Trước đó
          </Button>
        )}
        <Button style={{ width: 131 }} variant="contained" onClick={() => handelClickNext(activeStep)}>
          Tiếp theo
        </Button>
      </DialogActions>
    </Modal>
  );
};

export default ModalAdd;
