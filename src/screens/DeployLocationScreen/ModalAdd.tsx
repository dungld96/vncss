import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Form, FormikProvider, useFormik } from 'formik';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Button from '../../common/button/Button';
import SelectPosition from '../../common/SelectPosition/SelectPosition';
import { useAuth } from '../../hooks/useAuth';
import useModalConfirm from '../../hooks/useModalConfirm';
import { useCreateLocationMutation } from '../../services/location.service';
import ConfirmInfo from './ConfirmInfo';
import { defaultInitialValues } from './constant';
import LocationInfo from './LocationInfo';
import { useSnackbar } from '../../hooks/useSnackbar';

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
  const { setSnackbar } = useSnackbar();
  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues: defaultInitialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (activeStep === 2) {
        const body = {
          name: values.name,
          contact_name: values.contact_name,
          contact_number: values.contact_number,
          event_receivers:
            values.event_receivers?.map((item) => ({
              name: item.name,
              position: item.position,
              phone: item.phone,
              enabled: true,
            })) || [],
          province: values.province,
          district: values.district,
          commune: values.commune,
          address: values.address,
          lat: Number(selectedPosition?.lat),
          lng: Number(selectedPosition?.lng),
          tags: values.tags,
          contract_date: dayjs(values.contract_date).unix(),
        };
        await addLocation({ location: body, parent_uuid: currentUser?.sub_id })
          .then((res) => {
            setSnackbar({ open: true, message: 'Thêm vị trí thành công', severity: 'success' });
          })
          .catch(() => setSnackbar({ open: true, message: 'Có lỗi khi thêm ví trí', severity: 'error' }));
        onClose();
      }
    },
  });

  const { submitForm, values, errors, resetForm, dirty, setFieldValue, isSubmitting } = formik;

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
        return (
          <ConfirmInfo
            values={{ ...values, ...selectedPosition }}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting}
          />
        );
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
    <Dialog
      open={show}
      fullWidth
      maxWidth={'lg'}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '8px',
          height: 'calc(100vh - 150px)',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DialogTitle>
        <Box pb={1} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #d9d9d9">
          <Typography style={{ fontWeight: '700', fontSize: '18px', lineHeight: '16px', color: '#1E2323' }}>
            {'Thêm mới vị trí triển khai'}
          </Typography>
          <IconButton>
            <Close onClick={onClose} style={{ color: '#8B8C9B' }} />
          </IconButton>
        </Box>
        <Box mt={3}>
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
                      fontSize: '16px !important',
                      fontWeight: '600 !important',
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
      </DialogTitle>
      <DialogContent dividers style={{ padding: 0 }}>
        <FormikProvider value={formik}>
          <Form style={{ width: '100%', height: '100%' }}>{RenderStep(activeStep)}</Form>
        </FormikProvider>
      </DialogContent>
      <DialogActions style={{ padding: '16px' }}>
        {activeStep !== 0 && (
          <Button variant="outlined" onClick={() => setActiveStep(activeStep - 1)}>
            Trước đó
          </Button>
        )}
        <Button variant="contained" onClick={() => handelClickNext(activeStep)}>
          Tiếp theo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAdd;
