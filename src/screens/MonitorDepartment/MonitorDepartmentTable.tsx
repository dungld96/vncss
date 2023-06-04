import { CustomTreeData, TreeDataState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import {
  CustomFieldType,
  ExpandButtonTableTree,
  getTableCell,
  TableHeaderCell,
  TableHeaderContent,
  TableTreeCell,
} from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import GroupIcon from '../../assets/icons/group-icon.svg';
import KeyIcon from '../../assets/icons/key-icon.svg';

import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import AddIcon from '../../assets/icons/add-circle.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import useModalConfirm from '../../hooks/useModalConfirm';
import ModalChangePassword from '../../screens/Users/ModalChangePassword';
import { IOrganization, useDeleteOrganizationMutation } from '../../services/organizations.service';
import { selectOrganization } from '../../state/modules/organization/organizationReducer';
import ModalAddEdit from './ModalAddEdit';
import { defaultInitialValue } from './constants';
import { useAuth } from 'hooks/useAuth';

const getChildRows = (row: IOrganization, rootRows: IOrganization[]) => {
  const childRows = rootRows.filter((r) => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

const ActionCellContent = ({
  cellProps,
  onActionClick,
}: {
  cellProps: Table.DataCellProps;
  onActionClick: (type: string, row: IOrganization) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const row = useMemo(() => cellProps.row, [cellProps]);

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
        <MenuItem onClick={() => onActionClick('change-pass', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={KeyIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Thay đổi mật khẩu</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('edit', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={EditIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Chỉnh sửa thông tin</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('delete', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={DeleteIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>
            Xoá đơn vị
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const MonitorDepartmentTable = () => {
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [modalChangePass, setModalChangePass] = useState({ show: false, id: '' });
  const [modalAddEdit, setModalAddEdit] = useState({
    show: false,
    type: 'create',
    initialValues: defaultInitialValue,
  });

  const organizations = useSelector(selectOrganization);
  const {
    auth: { currentUser },
  } = useAuth();

  const [columns] = useState([
    { name: 'name', title: 'Tên đơn vị' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'username', title: 'Tài khoản' },
    { name: 'tag', title: 'Thẻ Tag' },
    { name: 'count_locations', title: 'Vị trí triển khai' },
    { name: 'count_devices', title: 'Số thiết bị' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 250 },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const handleClick = (type: string, row: IOrganization) => {
    if (type === 'change-pass') {
      setModalChangePass({ show: true, id: row.id || '' });
    } else if (type === 'edit') {
      setModalAddEdit({ show: true, type: 'update', initialValues: row });
    } else if (type === 'delete') {
      showModalConfirm({
        type: 'warning',
        title: 'Xoá đơn vị',
        content: `Bạn có chắc chắn muốn xoá đơn vị giám sát ${row.name} không?`,
        confirm: {
          text: 'Xoá đơn vị',
          action: async () => {
            await deleteOrganization({ id: row.id || '', parent_uuid: currentUser?.sub_id });
            hideModalConfirm();
          },
        },
        cancel: {
          action: hideModalConfirm,
        },
      });
    }
  };

  const customField: CustomFieldType = {
    count_locations: {
      renderContent: ({ row }) => {
        return (
          <>
            {row?.number_location ? (
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-20px' }}>
                <Typography sx={{ textAlign: 'right', width: '60px' }}>
                  {row?.number_location?.toLocaleString('en-US')}
                </Typography>
                <IconButton>
                  <ImageIcon image={GroupIcon} />
                </IconButton>
              </Box>
            ) : (
              '--'
            )}
          </>
        );
      },
    },
    count_devices: {
      renderContent: ({ row }) => {
        return (
          <>
            {row?.number_device ? (
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '-20px' }}>
                <Typography sx={{ textAlign: 'right', width: '60px' }}>
                  {row?.number_device?.toLocaleString('en-US')}
                </Typography>
                <IconButton>
                  <ImageIcon image={GroupIcon} />
                </IconButton>
              </Box>
            ) : (
              '--'
            )}
          </>
        );
      },
    },
  };

  return (
    <>
      <ModalAddEdit {...modalAddEdit} onClose={() => setModalAddEdit({ ...modalAddEdit, show: false })} />
      <ModalChangePassword
        {...modalChangePass}
        onClose={() => setModalChangePass({ ...modalChangePass, show: false })}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input
          style={{ width: 311, background: '#FFFFFF' }}
          placeholder="Tìm kiếm tên nhân viên"
          iconStartAdorment={<ImageIcon image={SearchIcon} />}
        />
        <Button
          variant="contained"
          onClick={() => setModalAddEdit({ show: true, type: 'create', initialValues: defaultInitialValue })}
        >
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm đơn vị mới</Box>
        </Button>
      </Box>
      <Paper sx={{ boxShadow: 'none' }}>
        <Grid rows={organizations} columns={columns}>
          <TreeDataState />
          <CustomTreeData getChildRows={getChildRows} />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={(props) =>
              getTableCell(props, <ActionCellContent cellProps={props} onActionClick={handleClick} />, customField)
            }
          />
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
          <TableTreeColumn for="name" cellComponent={TableTreeCell} expandButtonComponent={ExpandButtonTableTree} />
        </Grid>
      </Paper>
    </>
  );
};
