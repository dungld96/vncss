import React from 'react';
import styled from '@emotion/styled';
import { Button, DialogActions, DialogContent, Box, Typography, Switch } from '@mui/material';
import FormikWrappedField from '../../../common/input/Field';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../../common/modal/Modal';
import { useAddGatewayMutation } from '../../../services/control.service';
import { useAuth } from '../../../hooks/useAuth';
import { LocationType } from '../../../state/modules/location/locationReducer';

interface Props {
  location?: LocationType;
  show: boolean;
  onClose: () => void;
}

const ContentWrapper = styled(DialogContent)({
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  overflow: 'hidden',
  marginBottom: 32,
});

const validationSchema = {
  serial: Yup.string().required('Serial không được để trông'),
  name: Yup.string().required('Tên không được để trống'),
  sim: Yup.string().required('Sim không được để trống'),
};

export const AddGatewayDialog: React.FC<Props> = ({ location, show, onClose }) => {
  const [addGatewayControl] = useAddGatewayMutation();
  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues: {
      serial: '',
      name: '',
      sim: '',
      enableCallCenter: true,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validationSchema,
    }),
    onSubmit: async (values) => {
      if (currentUser && location) {
        await addGatewayControl({
          agencyId: currentUser.sub_id,
          locationId: location.id,
          data: values,
        }).unwrap();
        onClose?.();
      }
    },
  });
  const { handleSubmit, getFieldProps, values, isValid, dirty, resetForm, setFieldValue } = formik;

  return (
    <Modal size="sm" show={show} close={onClose} title={'Thêm gateway'}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <ContentWrapper>
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Serial"
              topLable="Nhập Serial"
              {...getFieldProps('serial')}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập tên gateway"
              topLable="Tên gateway"
              {...getFieldProps('name')}
            />
            <FormikWrappedField
              style={{ width: 286 }}
              placeholder="Nhập số sim"
              topLable="Số sim"
              {...getFieldProps('sim')}
            />
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
          </ContentWrapper>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Thêm mới
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
