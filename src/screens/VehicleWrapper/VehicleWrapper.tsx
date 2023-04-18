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
  CustomFieldType,
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
import EditIcon2 from '../../assets/icons/edit-icon-2.svg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import { IUser } from 'services/auth.service';
import { defaultAttention } from 'screens/Users/constants';
import { data } from './mockData';

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
        <MenuItem onClick={() => onActionClick('edit', cellProps.row)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={EditIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px' } }}>Chỉnh sửa</ListItemText>
        </MenuItem>
        <Divider sx={{ margin: '0 16px !important' }} />
        <MenuItem onClick={() => onActionClick('delete', rowId)} sx={{ padding: '16px' }}>
          <ListItemIcon>
            <ImageIcon image={DeleteIcon} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ sx: { fontSize: '14px', color: '#E5401C' } }}>
            Xoá phương tiện
          </ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const VehicleWrapper = () => {
  const [modalAttention, setModalAttention] = useState(defaultAttention);

  const [columns] = useState([
    { name: 'name', title: 'Tên phương tiện' },
    { name: 'address', title: 'Địa chỉ' },
    { name: 'license_plate', title: 'Biển số' },
    { name: 'regulatory_agency', title: 'Đơn vị quản lý' },
    { name: 'phone', title: 'SĐT liên hệ' },
    { name: 'type', title: 'Loại phương tiện' },
    { name: 'tag', title: 'Thẻ tag' },
    { name: 'action', title: 'Hành động' },
  ]);

  const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
    { columnName: 'name', width: 200 },
    { columnName: 'action', width: 200, align: 'center' },
  ]);

  const [customField] = useState<CustomFieldType>({
    tag: {
      renderContent: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '14px',
                color: '#1AA6EE',
              }}
            >
              {row.tag.join(', ')}
            </Typography>
            <IconButton>
              <ImageIcon image={EditIcon2} />
            </IconButton>
          </Box>
        );
      },
    },
  });

  const handleClick = (type: string, id: string | any) => {
    if (type === 'edit') {
    } else if (type === 'delete') {
      setModalAttention({
        show: true,
        type: 'warning',
        title: 'Xoá phương tiện trọng yếu',
        content: 'Bạn có chắc chắn muốn xoá phương tiện trọng yếu này không?',
        textConfirm: 'Xoá phương tiện',
        onSuccess: async () => {},
      });
    }
  };

  const closeModalAttention = () => {
    setModalAttention({
      ...modalAttention,
      show: false,
    });
  };

  return (
    <>
      <ModalAttention {...modalAttention} onClose={closeModalAttention} onCancel={closeModalAttention} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Input
          style={{ width: 311, background: '#FFFFFF' }}
          placeholder="Tìm kiếm tên hoặc biển số"
          iconStartAdorment={<ImageIcon image={SearchIcon} />}
        />
        <Button variant="contained" onClick={() => {}}>
          <ImageIcon image={AddIcon} />
          <Box sx={{ marginLeft: '8px' }}>Thêm mới phương tiện</Box>
        </Button>
      </Box>
      <Paper sx={{ boxShadow: 'none', position: 'relative' }}>
        <Grid rows={data} columns={columns}>
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
