import React from 'react';
import { Box, Button, DialogActions, Typography, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import FormikWrappedField from '../../../../common/input/Field';
import Modal from '../../../../common/modal/Modal';
import {
  ControlLocationNodeType,
  useUpdateNodeControlMutation,
  useRemoveNodeMutation,
} from '../../../../services/control.service';
import { useAuth } from '../../../../hooks/useAuth';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import { INodeType, useGetNodeTypesQuery } from '../../../../services/node.service';

const InfoTitle = styled(Typography)({ fontSize: '14px', color: '#8B8C9B' });
const InfoValue = styled(Typography)({ fontSize: '14px', color: '#1E2323' });

interface Props {
  locationId: string;
  gatewayId: string;
  node: ControlLocationNodeType;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const validationSchema = {
  name: Yup.string().required('Tên gw không được để trông'),
};

export const NodeInfoDialog: React.FC<Props> = ({ locationId, gatewayId, node, open, onClose, onSuccess }) => {
  const [edit, setEdit] = React.useState(false);

  const [updateNodeControl, { isLoading: isLoadingUpdate }] = useUpdateNodeControlMutation();
  const [removeNode, { isLoading }] = useRemoveNodeMutation();
  const { data: nodeTypes } = useGetNodeTypesQuery<{ data: INodeType[] }>(null);

  const {
    auth: { currentUser },
  } = useAuth();

  const { setSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: node.name || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      ...validationSchema,
    }),
    onSubmit: (values) => {
      if (currentUser && locationId && gatewayId) {
        updateNodeControl({
          agencyId: currentUser.sub_id,
          locationId: locationId,
          gatewayId: gatewayId,
          nodeId: node.id,
          data: values,
        }).then((res) => {
          onSuccess();
          setSnackbar({ open: true, message: 'Lưu node thành công', severity: 'success' });
        });
        onClose?.();
      }
    },
  });

  const onRemoveNode = () => {
    if (currentUser && locationId && gatewayId) {
      removeNode({
        agencyId: currentUser.sub_id,
        locationId: locationId,
        gatewayId: gatewayId,
        nodeId: node.id,
      })
        .then(() => {
          setSnackbar({ open: true, message: 'Gỡ node thành công', severity: 'success' });
          onClose?.();
        })
        .catch(() => {
          setSnackbar({ open: true, message: 'Có lỗi khi gỡ node', severity: 'error' });
        });
    }
  };
  const { handleSubmit, getFieldProps, isValid, dirty } = formik;

  return (
    <Modal
      size="sm"
      show={open}
      close={onClose}
      title={edit ? 'Chỉnh sửa thông tin node' : 'Thông tin node'}
      extendActions={
        edit ? (
          <ArrowBack style={{ cursor: 'pointer', marginRight: '12px' }} onClick={() => setEdit(false)} />
        ) : (
          <Box mr="12px" style={{ cursor: 'pointer' }} onClick={() => setEdit(true)}>
            <img src={EditIcon} alt="" style={{ width: '20px', height: '20px' }} />
          </Box>
        )
      }
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {edit ? (
            <Box mb={3}>
              <FormikWrappedField
                fullWidth
                placeholder="Nhập tên node"
                topLable="Tên node"
                {...getFieldProps('name')}
              />
            </Box>
          ) : (
            <Grid container style={{ padding: '16px 0' }} spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Tên node:</InfoTitle>
                  <InfoValue>{node.name || '--'}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Loại cảm biên:</InfoTitle>
                  <InfoValue>{nodeTypes?.find((item) => item.id === node.node_type_id)?.name || '--'}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Serial:</InfoTitle>
                  <InfoValue>{node.serial}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Mã thiết bị:</InfoTitle>
                  <InfoValue>{node.state?.nType || '--'}</InfoValue>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Phiên bản:</InfoTitle>
                  <InfoValue>{node.version || '--'}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Dung lượng pin:</InfoTitle>
                  <InfoValue>{node.state?.battery || '--'}%</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Trạng thái kết nối</InfoTitle>
                  <InfoValue>{node.status === 'activated' ? 'Online' : 'Offline'}</InfoValue>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
                  <InfoTitle>Lần cập nhật cuối:</InfoTitle>
                  <InfoValue>{dayjs(node.updated_at).format('HH:mm:ss DD/MM/YYYY') || '--'}</InfoValue>
                </Box>
              </Grid>
            </Grid>
          )}
          <DialogActions sx={{ padding: 0 }}>
            {!edit && (
              <Button
                disabled={isLoadingUpdate || isLoading}
                style={{ width: 131 }}
                variant="outlined"
                onClick={onRemoveNode}
              >
                Gỡ Node
              </Button>
            )}
            <Button disabled={isLoadingUpdate || isLoading} style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Đóng
            </Button>
            {edit && (
              <Button
                type="submit"
                style={{ width: 131 }}
                variant="contained"
                disabled={!isValid || !dirty || isLoadingUpdate || isLoading}
              >
                Lưu
              </Button>
            )}
          </DialogActions>
        </Form>
      </FormikProvider>
    </Modal>
  );
};
