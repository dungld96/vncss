import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from '../../hooks/useSnackbar';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import DragDropFile from '../../common/DragDropFile/DragDropFile';
import { useCreateSimMutation } from '../../services/sims.service';
import { useAuth } from '../../hooks/useAuth';
import DatePickers from 'common/datePicker/DatePicker';
import dayjs from 'dayjs';

const MAX_FILE_SIZE = 5242880;

interface Props {
  show: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Title = styled(DialogTitle)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  lineHeight: '32px',
  color: '#1E2323',
  padding: 0,
  '& .MuiSvgIcon-root': {
    color: '#8B8C9B',
    cursor: 'pointer',
  },
});

const ModalAddSim: React.FC<Props> = ({ show, onClose }) => {
  const [value, setValue] = useState(0);
  const [createSim, { isLoading }] = useCreateSimMutation();
  const { setSnackbar } = useSnackbar();
  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues: {
      phone: '',
      imei: '',
      activated_at: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      phone: Yup.string().required('Số điện thoại không được để trống'),
      imei: Yup.string().required('Imei không được để trống'),
      activated_at: Yup.string().required('Ngày kích hoạt không được để trống'),
    }),
    onSubmit: async (values) => {
      if (currentUser) {
        try {
          await createSim({
            data: { ...values, activated_at: dayjs(values.activated_at, 'DD/MM/YYYY').unix() },
            agencyId: currentUser.sub_id,
          }).unwrap();
          setSnackbar({ open: true, message: 'Thêm sim thành công', severity: 'success' });
          onClose();
        } catch (error) {
          setSnackbar({ open: true, message: 'Có lỗi khi thêm sim', severity: 'error' });
        }
      }
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty, resetForm, setFieldValue, values, touched, isSubmitting } =
    formik;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleUploadFile = useCallback((e: any) => {
    const file = e[0];
    if (!file || file.size > MAX_FILE_SIZE) {
      return;
    }

    console.log(file);
  }, []);

  useEffect(() => {
    if (!show) return;
    resetForm();
  }, [show]);

  return (
    <Dialog
      open={show}
      fullWidth
      maxWidth="sm"
      sx={{
        '.MuiPaper-root': {
          borderRadius: '12px',
          padding: '20px 32px 32px',
        },
      }}
    >
      <Title>
        {'Thêm mới Sim'}
        <CloseIcon onClick={() => onClose?.()} />
      </Title>
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>
          <Box sx={{ borderBottom: 1, borderColor: '#EEF2FA', marginBottom: '18px' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab
                sx={{
                  textTransform: 'initial',
                  fontSize: '16px',
                  fontWeight: '700',
                }}
                label="Thêm thủ công"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  textTransform: 'initial',
                  fontSize: '16px',
                  fontWeight: '700',
                }}
                label="Thêm từ file"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <DialogContent
              sx={{
                padding: 0,
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                overflow: 'hidden',
                marginBottom: '66px',
              }}
            >
              <Input
                style={{ width: 286 }}
                topLable="Số điện thoại"
                placeholder="Nhập số điện thoại"
                {...getFieldProps('phone')}
              />
              <Input style={{ width: 286 }} topLable="Imei sim" placeholder="Nhập imei" {...getFieldProps('imei')} />
              <Box style={{ width: 286 }}>
                <DatePickers
                  {...getFieldProps('startDate')}
                  date={values.activated_at}
                  fullWidth
                  topLable="Ngày kích hoạt"
                  onChange={(date) => setFieldValue('activated_at', date)}
                  showError={touched.activated_at || isSubmitting}
                  error={values.activated_at ? '' : 'Ngày kích hoạt không được để trống'}
                />
              </Box>
            </DialogContent>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ marginBottom: '32px' }}>
              <DragDropFile
                multiple={true}
                fileTypes={['xls', 'xlsx', 'csv']}
                onChange={handleUploadFile}
                title="Chọn file chứa danh sách của bạn"
              />
            </Box>
          </TabPanel>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" style={{ width: 131 }} variant="contained" disabled={!isValid || !dirty || isLoading}>
              Thêm mới
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};

export default ModalAddSim;
