import React, { useState, useMemo } from 'react';
import { Paper, IconButton, ListItemIcon, Menu, MenuItem, ListItemText, Divider } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '@devexpress/dx-react-grid-material-ui';
import {
  TableTreeCell,
  getTableCell,
  TableHeaderContent,
  TableHeaderCell,
  ExpandButtonTableTree,
} from '../../common/DxTable/DxTableCommon';
import { ImageIcon } from '../../utils/UtilsComponent';

import KeyIcon from '../../assets/icons/key-icon.svg';
import { Regulatory, regulatoryAgencies } from './mockData';

const getChildRows = (row: Regulatory, rootRows: Regulatory[]) => {
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
  const [columns] = useState([
    { name: 'name', title: 'Tên cơ quan' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'account', title: 'Tài khoản' },
    { name: 'tag', title: 'Thẻ Tag' },
    { name: 'number_location', title: 'Vị trí triển khai' },
    { name: 'number_device', title: 'Số thiết bị' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 250 },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const handleClick = (type: string, id: string) => {
    console.log(type, id);
  };

  return (
    <Paper sx={{ boxShadow: 'none' }}>
      <Grid rows={regulatoryAgencies} columns={columns}>
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
  );
};
