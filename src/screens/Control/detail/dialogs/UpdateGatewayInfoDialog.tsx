import React from 'react';
import { Box, Button, DialogActions, Switch, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import FormikWrappedField from '../../../../common/input/Field';
import Modal from '../../../../common/modal/Modal';
import { ControlLocationGatewayType, useUpdateGatewayControlMutation } from '../../../../services/control.service';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';

interface Props {
  locationId: string;
  gateway: ControlLocationGatewayType;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const validationSchema = {
  name: Yup.string().required('Tên gw không được để trông'),
};

export const UpdateGatewayInfoDialog: React.FC<Props> = ({ locationId, gateway, open, onClose, onSuccess }) => {
  const [updateGatewayControl] = useUpdateGatewayControlMutation();
  const {
    auth: { currentUser },
  } = useAuth();

  const { setSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: gateway.name || '',
      sim: gateway.sim || '',
      enableCallCenter: !!gateway.enable_callcenter,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validationSchema,
    }),
    onSubmit: (values) => {
      if (currentUser && locationId && gateway) {
        updateGatewayControl({
          agencyId: currentUser.sub_id,
          locationId: locationId,
          gatewayId: gateway.id,
          data: values,
        }).then((res) => {
          onSuccess();
          setSnackbar({ open: true, message: 'Lưu gateway thành công', severity: 'success' });
        });
        onClose?.();
      }
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty, setFieldValue, values } = formik;

  return (
    <Modal size="sm" show={open} close={onClose} title={'Chỉnh sửa thông tin gateway'}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box mb={3}>
            <FormikWrappedField
              fullWidth
              placeholder="Nhập tên gateway"
              topLable="Tên gateway"
              {...getFieldProps('name')}
            />
            <FormikWrappedField fullWidth placeholder="Nhập sim" topLable="Sim" {...getFieldProps('sim')} />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '400', lineHeight: '22px' }}>
                  Nhận tổng đài cảnh báo
                </Typography>
                <Switch
                  sx={{ m: 1 }}
                  checked={values.enableCallCenter}
                  onChange={(e) => setFieldValue('enableCallCenter', e.target.checked)}
                />
              </Box>
            </Box>
          </Box>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Lưu
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
