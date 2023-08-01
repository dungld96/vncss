import { CustomTreeData, TreeDataState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import { Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import {
  ExpandButtonTableTree,
  getTableCell,
  TableHeaderCell,
  TableHeaderContent,
  TableTreeCell,
} from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import { useSelector } from 'react-redux';
import { useDeleteAgencyMutation } from 'services/agencies.service';
import AddIcon from '../../assets/icons/add-circle.svg';
import DeleteIcon from '../../assets/icons/delete-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import KeyIcon from '../../assets/icons/key-icon.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { Input } from '../../common';
import Button from '../../common/button/Button';
import useModalConfirm from '../../hooks/useModalConfirm';
import { selectAgencies } from '../../state/modules/agency/agencyReducer';
import { AgencyType, defaultInitialValue } from './constants';
import { IAgency } from './mockData';
import ModalAddEdit from './ModalAddEdit';
import { useAuth } from '../../hooks/useAuth';

const getChildRows = (row: IAgency, rootRows: IAgency[]) => {
  const childRows = rootRows.filter((r) => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

const ActionCellContent = ({
  cellProps,
  onActionClick,
}: {
  cellProps: Table.DataCellProps;
  onActionClick: (type: string, row: AgencyType) => void;
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
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Đổi mật khẩu</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('edit', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={EditIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Sửa</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('delete', row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={DeleteIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>Xoá</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const AgenciesTable = () => {
  const agencies = useSelector(selectAgencies);

  const [deleteAgency] = useDeleteAgencyMutation();
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [modalAddEdit, setModalAddEdit] = useState({
    show: false,
    type: 'create',
    initialValues: defaultInitialValue,
  });
  const {
    auth: { currentUser },
  } = useAuth();

  const agenciesParsed = React.useMemo(() => {
    return agencies.map((item) => ({
      ...item,
      parentId: item.parent_id === currentUser?.sub_id ? null : item.parent_id,
    }));
  }, [currentUser, agencies]);

  const [columns] = useState([
    { name: 'name', title: 'Tên' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'phone', title: 'Số điện thoại' },
    { name: 'username', title: 'Tài khoản' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 300 },
    { columnName: 'phone', align: 'center' },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const handleClick = (type: string, row: AgencyType) => {
    if (type === 'edit') {
      setModalAddEdit({
        show: true,
        type: 'update',
        initialValues: row,
      });
    } else if (type === 'delete') {
      showModalConfirm({
        type: 'warning',
        title: 'Xoá đại lý',
        content: 'Bạn có chắc chắn muốn xoá đại lý này không?',
        confirm: {
          action: async () => {
            await deleteAgency({ id: row.id || '' }).unwrap();
            hideModalConfirm();
          },
          text: 'Xoá đại lý',
        },
        cancel: {
          action: hideModalConfirm,
        },
      });
    }
  };

  const handelAddAgency = () => {
    setModalAddEdit({
      type: 'create',
      initialValues: { ...defaultInitialValue, parent_id: currentUser?.sub_id },
      show: true,
    });
  };

  return (
    <>
      <ModalAddEdit {...modalAddEdit} onClose={() => setModalAddEdit({ ...modalAddEdit, show: false })} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input
          style={{ width: 311, background: '#FFFFFF' }}
          placeholder="Tìm kiếm tên đại lý"
          iconStartAdorment={<ImageIcon image={SearchIcon} />}
        />
        <Button variant="contained" onClick={handelAddAgency}>
          <ImageIcon image={AddIcon} />
          <Typography sx={{ marginLeft: '8px' }}>Thêm mới đại lý</Typography>
        </Button>
      </Box>
      <Paper sx={{ boxShadow: 'none', maxHeight: 'calc(100vh - 150px)', overflow: 'auto' }}>
        <Grid rows={agenciesParsed} columns={columns}>
          <TreeDataState />
          <CustomTreeData getChildRows={getChildRows} />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={(props) =>
              getTableCell(props, <ActionCellContent cellProps={props} onActionClick={handleClick} />)
            }
          />
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
          <TableTreeColumn for="name" cellComponent={TableTreeCell} expandButtonComponent={ExpandButtonTableTree} />
        </Grid>
      </Paper>
    </>
  );
};
