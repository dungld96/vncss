import React, { useMemo, useState } from 'react';
import { IntegratedSelection, SelectionState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  TableSelectionProps,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  Button as ButtonBase,
} from '@mui/material';
import {
  getTableCell,
  TableHeaderCell,
  TableHeaderContent,
  TableSelectionCell,
  TableSelectionHeaderCell,
} from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import { Input } from 'common';
import Button from 'common/button/Button';
import ModalAttention from 'common/modal/ModalAttention';
import AddIcon from '../../assets/icons/add-circle.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import KeyIcon from '../../assets/icons/key-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { users } from './mockData';
import ModalAddEditUser from './ModalAddEditUser';
import ModalChangePassword from './ModalChangePassword';
import { IUser } from 'services/auth.service';
import { useDeletelUserMutation, useGetAllUsersQuery } from 'services/users.service';
import { defaultAttention, defaultValueUser } from './constants';

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
        <MenuItem onClick={() => onActionClick('change-pass', rowId)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={KeyIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Thay đổi mật khẩu</ListItemText>
        </MenuItem>
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
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>
            Xoá nhân viên
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const UsersTable = () => {
  const [deleteUser] = useDeletelUserMutation();
  const [selection, setSelection] = useState<Array<number | string>>([]);
  const [modalUser, setModalUser] = useState({
    show: false,
    type: 'create',
    initialValues: defaultValueUser,
  });
  const [modalChangePass, setModalChangePass] = useState({ show: false });

  const [modalAttention, setModalAttention] = useState(defaultAttention);

  const { data } = useGetAllUsersQuery(null) as any;
  const users = data?.data?.users;

  const [columns] = useState([
    { name: 'name', title: 'Họ tên' },
    { name: 'email', title: 'Email' },
    { name: 'phone', title: 'Số điện thoại' },
    { name: 'username', title: 'Tài khoản' },
    // { name: 'password', title: 'Mật khẩu' },
    { name: 'confirmed', title: 'Chức vụ' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 200 },
    { columnName: 'phone', align: 'center' },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const handleClick = (type: string, id: string | any) => {
    if (type === 'edit') {
      setModalUser({
        show: true,
        type: 'update',
        initialValues: id,
      });
    } else if (type === 'change-pass') {
      setModalChangePass({ show: true });
    } else if (type === 'delete') {
      setModalAttention({
        show: true,
        type: 'warning',
        title: 'Xoá nhân viên',
        content: 'Bạn có chắc chắn muốn xoá nhân viên này không?',
        textConfirm: 'Xoá nhân viên',
        onSuccess: async () => await deleteUser({ id }).unwrap(),
      });
    }
  };

  const closeModalAttention = () => {
    setModalAttention({
      ...modalAttention,
      show: false,
    });
  };

  const onCancelSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelection([]);
  };

  const handleSelectionChange = (selectedRowIndices: (number | string)[]) => {
    const selectedRowIds = selectedRowIndices.map((index) => users[Number(index)]?.id);
    setSelection(selectedRowIds);
  };

  const handleDeleteMultilUsers = () => {
    setModalAttention({
      show: true,
      type: 'warning',
      title: 'Xoá nhân viên',
      content: 'Bạn có chắc chắn muốn xoá nhân viên này không?',
      textConfirm: 'Xoá nhân viên',
      onSuccess: async () => {
        await deleteUser({ id: selection.join(',') }).unwrap();
        setSelection([]);
      },
    });
  };

  return (
    <>
      <ModalAttention {...modalAttention} onClose={closeModalAttention} onCancel={closeModalAttention} />
      <ModalAddEditUser {...modalUser} onClose={() => setModalUser({ ...modalUser, show: false })} />
      <ModalChangePassword {...modalChangePass} onClose={() => setModalChangePass({ show: false })} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input
          style={{ width: 311, background: '#FFFFFF' }}
          placeholder="Tìm kiếm tên nhân viên"
          iconStartAdorment={<ImageIcon image={SearchIcon} />}
        />
        <Button
          variant="contained"
          onClick={() => setModalUser({ show: true, type: 'create', initialValues: defaultValueUser })}
        >
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm mới nhân viên</Box>
        </Button>
      </Box>
      <Paper sx={{ boxShadow: 'none', position: 'relative' }}>
        <Grid rows={users || []} columns={columns}>
          <SelectionState
            selection={selection.map((id) => users.findIndex((r: IUser) => r.id === id))}
            onSelectionChange={handleSelectionChange}
          />
          <IntegratedSelection />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={(props) =>
              getTableCell(props, <ActionCellContent cellProps={props} onActionClick={handleClick} />)
            }
          />
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
          <TableSelection
            highlightRow
            showSelectionColumn
            showSelectAll
            cellComponent={TableSelectionCell}
            headerCellComponent={TableSelectionHeaderCell}
          />

          {selection.length > 0 && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'absolute',
                width: '100%',
                height: '48px',
                backgroundColor: '#fff',
                zIndex: 2,
                padding: '0 12px',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" height="100%">
                <Checkbox
                  indeterminate
                  onClick={(e) => onCancelSelection(e)}
                  sx={{ svg: { color: '#8F0A0C', fontSize: '21px' } }}
                />
                <Typography variant="subtitle2">Đang chọn ({selection.length})</Typography>
              </Box>
              <ButtonBase
                sx={{ color: '#E5401C', marginRight: '32px' }}
                startIcon={<ImageIcon image={DeleteIcon} />}
                onClick={handleDeleteMultilUsers}
              >
                Xóa
              </ButtonBase>
            </Box>
          )}
        </Grid>
      </Paper>
    </>
  );
};
