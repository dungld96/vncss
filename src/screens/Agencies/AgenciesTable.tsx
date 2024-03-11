import { CustomTreeData, TreeDataState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ExpandButtonTableTree,
  getTableCell,
  TableHeaderCell,
  TableHeaderContent,
  TableTreeCell,
} from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import { useSelector } from 'react-redux';
import {
  useChangePasswordAgencyMutation,
  useDeleteAgencyMutation,
  useLazyGetAgencyChildsQuery,
} from '../../services/agencies.service';
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
import ModalChangePassword from 'screens/Users/ModalChangePassword';
import { useSnackbar } from 'hooks/useSnackbar';
import ExpandIcon from '../../assets/icons/expand.svg';
import ExpandedIcon from '../../assets/icons/expanded.svg';

const getChildRows = (row: IAgency, rootRows: IAgency[]) => {
  const childRows = rootRows.filter((r) => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : [];
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

const ExpandButton = ({ expanded, visible, onToggle }: { expanded: any; visible: any; onToggle: any }) => {
  return visible ? (
    <IconButton
      style={{ marginRight: '12px' }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      {expanded ? (
        <ImageIcon image={ExpandedIcon} style={{ width: '16px', height: '16px' }} />
      ) : (
        <ImageIcon image={ExpandIcon} style={{ width: '16px', height: '16px' }} />
      )}
    </IconButton>
  ) : (
    <IconButton style={{ marginRight: '32px' }} />
  );
};

const getRowId = (row: any) => row.id;
export const AgenciesTable = () => {
  const [expandedRowIds, setExpandedRowIds] = useState<Array<string | number>>([]);
  const agencies = useSelector(selectAgencies);
  const [deleteAgency] = useDeleteAgencyMutation();
  const [getAgencyChilds] = useLazyGetAgencyChildsQuery();
  const [changePassword, { isLoading }] = useChangePasswordAgencyMutation();
  const { showModalConfirm, hideModalConfirm } = useModalConfirm();
  const [modalAddEdit, setModalAddEdit] = useState({
    show: false,
    type: 'create',
    initialValues: defaultInitialValue,
  });
  const [modalChangePass, setModalChangePass] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<string>();
  const {
    auth: { currentUser },
  } = useAuth();
  const { setSnackbar } = useSnackbar();

  const agenciesParsed = React.useMemo(() => {
    return agencies.map((item) => ({
      ...item,
      parentId: item.parent_id === currentUser?.sub_id ? null : item.parent_id,
    }));
  }, [currentUser, agencies]);

  const columns = [
    { name: 'name', title: 'Tên' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'phone', title: 'Số điện thoại' },
    { name: 'username', title: 'Tài khoản' },
    { name: 'action', title: 'Hành động' },
  ];

  const tableColumnExtensions = [
    { columnName: 'name', width: 300 },
    { columnName: 'phone', align: 'center' },
    { columnName: 'action', width: 200, align: 'center' },
  ] as Table.ColumnExtension[];

  const handleClick = (type: string, row: AgencyType) => {
    if (type === 'change-pass') {
      setSelectedAgency(row.id);
      setModalChangePass(true);
      return;
    }
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

  const handleExpanded = (ids: Array<string | number>) => {
    const rowIdsWithNotLoadedChilds = [...ids].filter((rowId) => expandedRowIds.every((item) => item !== rowId));
    if (rowIdsWithNotLoadedChilds.length) {
      Promise.all(rowIdsWithNotLoadedChilds.map((rowId) => getAgencyChilds({ id: `${rowId}` })));
    }
    setExpandedRowIds(ids);
  };

  const handelChangePass = async (password: string, id: string) => {
    changePassword({ id, password })
      .then((res: any) => {
        if (res.error) {
          setSnackbar({ open: true, message: 'Có lỗi khi đổi mật khẩu', severity: 'error' });
          return;
        }
        setSnackbar({ open: true, message: 'Đổi mật khẩu thành công', severity: 'success' });
        setModalChangePass(false);
      })
      .catch(() => {
        setSnackbar({ open: true, message: 'Có lỗi khi đổi mật khẩu', severity: 'error' });
      });
  };

  return (
    <>
      {modalChangePass && selectedAgency && (
        <ModalChangePassword
          show
          id={selectedAgency}
          onClose={() => {
            setModalChangePass(false);
            setSelectedAgency(undefined);
          }}
          onSubmit={(pass, id) => handelChangePass(pass, id)}
          isLoading={isLoading}
        />
      )}

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
      <Paper sx={{ boxShadow: 'none', maxHeight: 'calc(100vh - 180px)', overflow: 'auto', marginBottom: '24px' }}>
        <Grid rows={agenciesParsed} columns={columns} getRowId={getRowId}>
          <TreeDataState expandedRowIds={expandedRowIds} onExpandedRowIdsChange={handleExpanded} />
          <CustomTreeData getChildRows={getChildRows} />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={(props) =>
              getTableCell(props, <ActionCellContent cellProps={props} onActionClick={handleClick} />)
            }
          />
          <TableHeaderRow cellComponent={TableHeaderCell} contentComponent={TableHeaderContent} />
          <TableTreeColumn for="name" cellComponent={TableTreeCell} expandButtonComponent={ExpandButton} />
        </Grid>
      </Paper>
    </>
  );
};
