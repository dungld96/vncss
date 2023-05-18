import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import Button from '../../common/button/Button';
import DatePickers from '../../common/datePicker/DatePicker';
import DragDropFile from '../../common/DragDropFile/DragDropFile';
import FormikWrappedField from '../../common/input/Field';
import Select from '../../common/Select/Select';
import { MAX_FILE_SIZE } from '../../configs/constant';
import { useAuth } from '../../hooks/useAuth';
import { useCreateNodeMutation, useImportNodeMutation } from '../../services/node.service';

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

const validationSchema = Yup.object().shape({
  serial: Yup.string().required('Serial không được để trống'),
  version: Yup.string().required('Phiên bản không được để trống'),
  startDate: Yup.string().required('Ngày xuất xưởng không được để trống'),
});

const ModalAddNode: React.FC<Props> = ({ show, onClose }) => {
  const [addNode] = useCreateNodeMutation();
  const [importNode] = useImportNodeMutation();

  const [tab, setTab] = useState(0);
  const [file, setFile] = useState<any>(null);

  const {
    auth: { currentUser },
  } = useAuth();

  const formik = useFormik({
    initialValues: {
      id: '',
      type: 'none',
      description: '',
      serial: '',
      version: '',
      startDate: '',
      status: 'none',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const body = {
        id: values.id,
        node_type_id: values.type,
        serial: values.serial,
        version: values.version,
        mfg: values.startDate,
        description: values.description,
      };
      if (tab === 0) {
        await addNode({
          parent_uuid: currentUser?.sub_id,
          node: body,
        }).unwrap();
        onClose?.();
      }
    },
  });
  const { handleSubmit, getFieldProps, isValid, dirty, resetForm, setFieldValue, values, touched, isSubmitting } =
    formik;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleUploadFile = useCallback((e: any) => {
    const file = e[0];
    if (!file || file.size > MAX_FILE_SIZE) {
      return;
    }

    setFile(file);
  }, []);

  let disable = false;
  switch (tab) {
    case 0:
      disable = !isValid || !dirty || values.type === 'none';
      break;
    case 1:
      disable = !file;
  }

  const handleImport = async () => {
    if (tab === 0) return;
    await importNode({ file }).unwrap();
  };

  useEffect(() => {
    if (!show) return;
    resetForm();
    setTab(0);
    setFile(null);
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
            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
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
          <TabPanel value={tab} index={0}>
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
                data={[
                  { value: 'none', label: 'Chọn loại sản phẩm' },
                  { value: 'snh-srb', label: 'Node Sample' },
                ]}
                selected={values.type}
                setSelected={(type) => setFieldValue('type', type)}
                error={values.type === 'none' ? 'Vui lòng chọn loại sản phẩm' : ''}
              />
              <FormikWrappedField
                style={{ width: 286 }}
                topLable="Mô tả"
                placeholder="Nhập mô tả"
                {...getFieldProps('description')}
              />
              <FormikWrappedField
                style={{ width: 286 }}
                topLable="Serial"
                placeholder="Nhập serial"
                {...getFieldProps('serial')}
              />
              <FormikWrappedField
                style={{ width: 286 }}
                topLable="Phiên bản"
                placeholder="Nhập phiên bản"
                {...getFieldProps('version')}
              />
              <DatePickers
                {...getFieldProps('startDate')}
                date={values.startDate}
                style={{ width: 286 }}
                topLable="Ngày xuất xưởng"
                onChange={(date) => setFieldValue('startDate', date)}
                showError={touched.startDate || isSubmitting}
                error={values.startDate ? '' : 'Ngày xuất xưởng không được để trống'}
              />
              {/* <Select
                style={{ width: 286 }}
                fullWidth
                topLable="Trạng thái"
                data={[{ value: 'none', label: 'Chọn trạng thái' }, ...listStatusNodeLess]}
                selected={values.status}
                setSelected={(status) => setFieldValue('status', status)}
              /> */}
            </DialogContent>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Box sx={{ marginBottom: '32px' }}>
              {!file ? (
                <DragDropFile
                  multiple={true}
                  fileTypes={['xls', 'xlsx', 'csv']}
                  onChange={handleUploadFile}
                  title="Chọn file chứa danh sách của bạn"
                  dropzoneHeigth={274}
                />
              ) : (
                <Box height={'276px'}>
                  <Chip label={file?.name} onDelete={() => setFile(null)} />
                </Box>
              )}
            </Box>
          </TabPanel>

          <DialogActions sx={{ padding: 0 }}>
            <Button style={{ width: 131 }} variant="outlined" onClick={onClose}>
              Quay lại
            </Button>
            <Button
              type="submit"
              style={{ width: 131 }}
              variant="contained"
              disabled={disable}
              onClick={() => handleImport()}
            >
              Thêm mới
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </Dialog>
  );
};

export default ModalAddNode;
