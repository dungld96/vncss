import { DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useExtendGatewayMutation } from '../../services/gateway.service';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import { selectGateway } from '../../state/modules/gateway/gatewayReducer';
import { useSnackbar } from 'hooks/useSnackbar';
import { useAuth } from 'hooks/useAuth';

interface Props {
  show: boolean;
  gatewayIds: (number | string)[];
  onClose?: () => void;
}

const ModalExtendGateway: React.FC<Props> = ({ show, gatewayIds, onClose }) => {
  const gateways = useSelector(selectGateway);
  const selectedGateways = gateways.filter((item) => item.id && gatewayIds.includes(item.id));
  const selectedGatewaysName = selectedGateways.map((item) => item.name).join('; ');
  const [extendGateway] = useExtendGatewayMutation();
  const { setSnackbar } = useSnackbar();

  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: selectedGatewaysName,
      days: '',
    },
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      days: Yup.number().min(0, 'Vui lòng nhập số').required('Đây là trường bắt buộc'),
    }),
    onSubmit: (values) => {
      if (!currentUser) return;
      extendGateway({ data: { days: values.days, gateway_ids: gatewayIds }, agencyId: currentUser.sub_id })
        .then(() => {
          setSnackbar({ open: true, message: 'Gia hạn gateway thành công', severity: 'success' });
        })
        .catch(() => {
          setSnackbar({ open: true, message: 'Có lỗi khi gia hạn gateway', severity: 'error' });
        });
      onClose?.();
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty, resetForm, errors } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);

  return (
    <Modal size="sm" show={show} close={onClose} title="Gia hạn Gateway">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              padding: 0,
              overflow: 'hidden',
              marginBottom: '32px',
            }}
          >
            <Input fullWidth topLable="Tên Gateway" {...getFieldProps('name')} placeholder="Nhập tên Getway" disabled />
            <Input
              fullWidth
              type="number"
              topLable="Số ngày gia hạn thêm"
              {...getFieldProps('days')}
              placeholder="Nhập số ngày"
              error={errors.days}
            />
          </DialogContent>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Gia hạn thêm
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalExtendGateway;
