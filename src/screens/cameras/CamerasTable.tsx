import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import { Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { CustomFieldType, getTableCell, TableHeaderCell, TableHeaderContent } from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import AddIcon from '../../assets/icons/add-circle.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import LocationIcon from '../../assets/icons/location-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';

import ExportIcon from '../../assets/icons/export-red-icon.svg';
import useModalConfirm from '../../hooks/useModalConfirm';
import { IUser } from '../../services/auth.service';
import { dataSim } from './mockData';
import ModalAddSim from './ModalAddSim';
import ModalEditSim from './ModalEditSim';
import { defaultValuesSim } from './constants';

const ActionCellContent = ({
  cellProps,
  onActionClick,
}: {
  cellProps: Table.DataCellProps;
  onActionClick: (type: string, id: string | IUser) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const rowId = useMemo(() => cellProps.row?.id, [cellProps]);

  return (
    <div>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('edit', cellProps.row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={EditIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Chỉnh sửa thông tin</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('delete', rowId)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={DeleteIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>Xoá sim</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

const CamerasTable = () => {
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [modalEditSim, setModalEditSim] = useState({
    show: false,
    initialValues: defaultValuesSim,
  });
  const [showModalAdd, setShowModalAdd] = useState(false);

  const [columns] = useState([
    { name: 'number', title: 'STT' },
    { name: 'phoneNumber', title: 'Số điện thoại' },
    { name: 'imei', title: 'Imei sim' },
    { name: 'startDate', title: 'Ngày kích hoạt' },
    { name: 'status', title: 'Trạng thái' },
    { name: 'serial', title: 'Serial Gateway' },
    { name: 'createdDate', title: 'Ngày tạo' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'number', width: 80, align: 'center' },
    { columnName: 'name', width: 200 },
    { columnName: 'phone', align: 'center' },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const customField: CustomFieldType = {
    status: {
      renderContent: ({ row }) => {
        return (
          <Typography sx={{ color: row?.status ? '#27AE60' : '#8B8C9B', fontSize: '14px' }}>
            {row?.status ? 'Online' : 'Offline'}
          </Typography>
        );
      },
    },
    serial: {
      renderContent: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '14px' }}>{row?.serial}</Typography>
            <IconButton>
              <ImageIcon image={LocationIcon} />
            </IconButton>
          </Box>
        );
      },
    },
  };

  const handleClick = (type: string, row: string | any) => {
    if (type === 'delete') {
      showModalConfirm({
        type: 'warning',
        title: 'Xoá sim',
        content: 'Bạn có chắc chắn muốn xoá sim này không?',
        confirm: {
          action: hideModalConfirm,
          text: 'Xoá sim',
        },
        cancel: {
          action: hideModalConfirm,
        },
      });
    } else if (type === 'edit') {
      setModalEditSim({
        show: true,
        initialValues: { ...row, status: row.status ? 1 : 0 },
      });
    }
  };

  const dataTable = dataSim.map((item, index) => ({ ...item, number: index + 1 }));

  return (
    <>
      <ModalAddSim show={showModalAdd} onClose={() => setShowModalAdd(false)} />
      <ModalEditSim {...modalEditSim} onClose={() => setModalEditSim({ ...modalEditSim, show: false })} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input
          style={{ width: 311, background: '#FFFFFF' }}
          placeholder="Tìm kiếm tên nhân viên"
          iconStartAdorment={<ImageIcon image={SearchIcon} />}
        />
        <Box sx={{ display: 'flex' }}>
          <Button onClick={() => {}}>
            <ImageIcon image={ExportIcon} />
            <Typography sx={{ marginLeft: '8px', fontWeight: '700', fontSize: '14px' }}>Xuất excel</Typography>
          </Button>
          <Button style={{ marginLeft: 16 }} variant="contained" onClick={() => setShowModalAdd(true)}>
            <ImageIcon image={AddIcon} />
            <Typography sx={{ marginLeft: '8px', fontWeight: '700', fontSize: '14px' }}>Thêm Sim</Typography>
          </Button>
        </Box>
      </Box>
      <Paper sx={{ boxShadow: 'none' }}>
        <Grid rows={dataTable} columns={columns}>
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={(props) =>
              getTableCell(props, <ActionCellContent cellProps={props} onActionClick={handleClick} />, customField)
            }
          />
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
        </Grid>
      </Paper>
    </>
  );
};

export default CamerasTable;
