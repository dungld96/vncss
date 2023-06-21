import { CustomTreeData, TreeDataState } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import { MoreHoriz } from '@mui/icons-material';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography } from '@mui/material';
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

import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import GroupIcon from '../../assets/icons/group-icon.svg';
import KeyIcon from '../../assets/icons/key-icon.svg';
import Button from '../../common/button/Button';
import Select from '../../common/Select/Select';
import ModalChangePassword from '../Users/ModalChangePassword';
import { IRegulatory, useChangePasswordRegulatoryMutation } from '../../services/regulatory.service';
import { selectRegulatories } from '../../state/modules/regulatory/regulatoryReducer';

const getChildRows = (row: IRegulatory, rootRows: IRegulatory[]) => {
  const childRows = rootRows.filter((r) => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

const ActionCellContent = ({
  cellProps,
  onActionClick,
}: {
  cellProps: Table.DataCellProps;
  onActionClick: (type: string, id: string) => void;
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
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Đổi mật khẩu</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const RegulatoryAgenciesTable = () => {
  const [changePassword] = useChangePasswordRegulatoryMutation();
  const [modalChangePass, setModalChangePass] = useState({ show: false, id: '' });
  const regulatoryAgencies = useSelector(selectRegulatories);

  const [columns] = useState([
    { name: 'name', title: 'Tên cơ quan' },
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

  const handleClick = (type: string, id: string) => {
    if (type === 'change-pass') {
      setModalChangePass({ show: true, id });
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

  const handelChangePass = async (password: string, id: string) => {
    await changePassword({ id, password }).unwrap();
    setModalChangePass({ ...modalChangePass, show: false });
  };

  return (
    <>
      <ModalChangePassword
        {...modalChangePass}
        onClose={() => setModalChangePass({ ...modalChangePass, show: false })}
        onSuccess={(pass, id) => handelChangePass(pass, id)}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: '20px',
          '& > *': {
            marginRight: '16px',
          },
        }}
      >
        <Select noMarginTop topLable="Tỉnh thành" data={[{ value: 'all', label: 'Tất cả' }]} selected="all" />
        <Select noMarginTop topLable="Quận, huyện" data={[{ value: 'all', label: 'Tất cả' }]} selected="all" />
        <Box>
          <Button variant="contained" style={{ width: '140px', marginRight: '8px' }}>
            Lọc
          </Button>
          <Button variant="outlined" style={{ width: '140px' }}>
            Huỷ bộ lọc
          </Button>
        </Box>
      </Box>
      <Paper sx={{ boxShadow: 'none' }}>
        <Grid rows={regulatoryAgencies} columns={columns}>
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
