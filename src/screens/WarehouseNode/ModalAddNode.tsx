import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import DragDropFile from '../../common/DragDropFile/DragDropFile';
import Select from '../../common/Select/Select';
import { MAX_FILE_SIZE } from '../../configs/constant';
import { listStatusNodeLess } from './constants';

interface Props {
  show: boolean;
  onClose?: () => void;
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

const ModalAddNode: React.FC<Props> = ({ show, onClose }) => {
  const [value, setValue] = useState(0);

  const formik = useFormik({
    initialValues: {
      type: 'none',
      description: '',
      serial: '',
      version: '',
      startDate: '17/03/2023',
      status: 'none',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty, resetForm, setFieldValue } = formik;

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
        {'Thêm mới Node'}
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
                marginBottom: '32px',
              }}
            >
              <Select
                style={{ width: 286 }}
                fullWidth
                topLable="Loại sản phẩm"
                data={[{ value: 'none', label: 'Chọn loại sản phẩm' }, ...listStatusNodeLess]}
                selected={0}
                setSelected={(type) => setFieldValue('type', type)}
              />
              <Input
                style={{ width: 286 }}
                topLable="Mô tả"
                placeholder="Nhập mô tả"
                {...getFieldProps('description')}
              />
              <Input style={{ width: 286 }} topLable="Serial" placeholder="Nhập serial" {...getFieldProps('serial')} />
              <Input
                style={{ width: 286 }}
                topLable="Phiên bản"
                placeholder="Nhập phiên bản"
                {...getFieldProps('version')}
              />
              <Input style={{ width: 286 }} topLable="Ngày xuất xưởng" {...getFieldProps('startDate')} />
              <Select
                style={{ width: 286 }}
                fullWidth
                topLable="Trạng thái"
                data={[{ value: 'none', label: 'Chọn trạng thái' }, ...listStatusNodeLess]}
                selected={0}
                setSelected={(status) => setFieldValue('status', status)}
              />
            </DialogContent>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ marginBottom: '32px' }}>
              <DragDropFile
                multiple={true}
                fileTypes={['xls', 'xlsx', 'csv']}
                onChange={handleUploadFile}
                title="Chọn file chứa danh sách của bạn"
                dropzoneHeigth={274}
              />
            </Box>
          </TabPanel>

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
    </Dialog>
  );
};

export default ModalAddNode;
