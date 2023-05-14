import { DialogActions, DialogContent } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import Button from '../../common/button/Button';
import Modal from '../../common/modal/Modal';
import Select from '../../common/Select/Select';
import { useMoveGatewayMutation } from '../../services/gateway.service';

interface Props {
  type: 'gateway' | 'node';
  show: boolean;
  onClose?: () => void;
  ids?: (string | number)[];
}

const ModalChangeAgency: React.FC<Props> = ({ type, show, onClose, ids }) => {
  const [moveGateway] = useMoveGatewayMutation();

  const formik = useFormik({
    initialValues: {
      argency: 'all',
    },
    enableReinitialize: true,

    validationSchema: Yup.object().shape({}),
    onSubmit: async ({ argency }) => {
      if (type === 'gateway') {
        await moveGateway({ gateway_ids: ids, agency_id: argency }).unwrap();
      }
    },
  });
  const { handleSubmit, values, isValid, dirty, resetForm, setFieldValue } = formik;

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);
  return (
    <Modal size="sm" show={show} close={onClose} title="Chuyển xuống đại lý">
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              padding: 0,
              overflow: 'hidden',
              marginBottom: '32px',
            }}
          >
            <Select
              fullWidth
              topLable="Chọn đại lý bạn muốn chuyển xuống"
              data={[{ value: 'all', label: 'Chọn đại lý' }]}
              selected={values.argency}
              setSelected={(argency) => setFieldValue('argency', argency)}
            />
          </DialogContent>
          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty}>
              Chuyển
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default ModalChangeAgency;
